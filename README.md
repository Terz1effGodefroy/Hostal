# Hostal API

Simple hotel room booking API built with Node.js and PostgreSQL.

## Setup
1. Install dependencies: `npm install`
2. Create PostgreSQL database and run `db/schema.sql` then `db/test_data.sql`.
3. Set environment variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
4. Optionally set `VIP_API_URL` to check VIP status.
5. Start server: `npm start`

## API
- `GET /rooms` – list all rooms
- `GET /rooms/available?start=YYYY-MM-DD&end=YYYY-MM-DD` – list free rooms
- `POST /bookings` – body `{roomId, clientId, start, end}`
- `DELETE /bookings/:id` – cancel booking
