# Travel_app

A small travel tracker. You type the name of a country, and it gets highlighted on an SVG world map along with a running count of countries visited.

## What it does
- Looks up the country name in an `allcountry` table to get its code
- Saves the code in a `visited_country` table
- Colours the matching countries on the map and shows the total
- Shows an error in the input box if the country does not exist or was already added

## Tech stack
Node.js (ES modules), Express, EJS, pg, PostgreSQL, CSS.

## Running it locally
You need Node and PostgreSQL.

1. Create a database (the code expects one called `World`) with two tables:
   - `allcountry(country_code, country_name)` filled with country names and their codes
   - `visited_country(country_code)` with a unique constraint on the code, which is what triggers the "already added" message
2. The connection settings are hard-coded near the top of `index.js` (user `postgres`, host `localhost`, port 5432). Change the database name and set your own password there, for example `your_password`.
3. Install and start:
   ```
   npm install
   node index.js
   ```
4. Open http://localhost:3000

## Routes
- `GET /`: map and count
- `POST /add`: add a country by name

## Notes
It is a practice project and the repo has no SQL file, so you have to create the tables yourself. Country names must be typed exactly as they appear in the table (the first letter is capitalised for you).
