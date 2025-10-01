import { query } from '../db.js';

export async function listRooms(req, res) {
  const { rows } = await query('SELECT * FROM rooms ORDER BY id');
  res.json(rows);
}

export async function listAvailable(req, res) {
  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(400).json({ error: 'start and end required' });
  }
  const { rows } = await query(
    `SELECT * FROM rooms r WHERE NOT EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.room_id = r.id
        AND b.start_date <= $2 AND b.end_date >= $1
    ) ORDER BY r.id`,
    [start, end]
  );
  res.json(rows);
}
