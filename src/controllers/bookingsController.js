import { query } from '../db.js';
import { isVip } from '../vip-check.js';

export async function createBooking(req, res) {
  const { roomId, clientId, start, end } = req.body;
  if (!roomId || !clientId || !start || !end) {
    return res.status(400).json({ error: 'roomId, clientId, start, end required' });
  }
  const vip = await isVip(clientId);
  // check overlapping
  const { rows: conflicts } = await query(
    `SELECT 1 FROM bookings WHERE room_id = $1 AND start_date <= $3 AND end_date >= $2`,
    [roomId, start, end]
  );
  if (conflicts.length) {
    return res.status(409).json({ error: 'room already booked for period' });
  }
  const { rows } = await query(
    `INSERT INTO bookings (room_id, client_id, start_date, end_date, is_vip)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [roomId, clientId, start, end, vip]
  );
  res.status(201).json(rows[0]);
}

export async function cancelBooking(req, res) {
  const { id } = req.params;
  const { rowCount } = await query('DELETE FROM bookings WHERE id=$1', [id]);
  if (!rowCount) {
    return res.status(404).json({ error: 'not found' });
  }
  res.status(204).end();
}
