# Scoreboard Manager

Full stack app to manage teams, matches and live scores for multiple sports.
Right now: **football** and **cricket**.

## Login credentials
| Role | Username | Password | Can do |
|------|----------|----------|--------|
| Admin | `admin` | `admin123` | everything - add / edit / delete teams and matches, update live scores |
| Student | `student` | `student123` | view only - live scores, matches, teams, leaderboard |

You can log in with the username or the email (`admin@scoreboard.local`, `student@scoreboard.local`).
New accounts made from the Register page are students.

## Tech
- Frontend: React + Vite + Tailwind CSS (minimal theme, Archivo font)
- Backend: Node + Express + MongoDB (Mongoose) + JWT

## Run backend
Needs MongoDB (local or Atlas).
```
cd backend
npm install
cp .env.example .env   # set MONGO_URI and JWT_SECRET
npm run seed           # sample leagues, teams, matches (deletes old ones)
npm run seed:users     # admin + student logins (keeps other data)
npm run dev
```
Runs on http://localhost:5000

## Run frontend
```
cd frontend
npm install
cp .env.example .env   # VITE_API_URL, default http://localhost:5000/api
npm run dev
```

## Sample data
Every team has 11 players, football teams also have 7 subs (example squads).

- La Liga - FC Barcelona, Real Madrid, Atletico Madrid
- Premier League - Manchester United, Manchester City, Liverpool, Arsenal
- ICC T20 World Cup - India, Australia, New Zealand, England

## Pages
- Home - live matches
- Teams - teams by league, add / delete, team details with players
- Matches - create match (league -> teams), for cricket also format (T20 = 20 overs, ODI = 50 overs, custom 1-50) + who bats first
- Scoreboard
  - football: add events with minute, team, player (goal, penalty goal, own goal, penalty missed, yellow card, red card, substitution), goals update score, delete event, only players on pitch can be picked, max 5 subs
  - cricket: striker / non striker / bowler, strike changes on odd runs and end of over, new bowler every over, runs (0,1,2,3,4,6), wide, no ball (+ free hit), bye, leg bye, wicket, run out, max overs per bowler (overs / 5), undo last ball, scorecard (batting + bowling stats), ball by ball log, innings ends on all out / overs done / target chased
- Data is saved in MongoDB through the backend
- Leaderboard - per league (football: win 3 draw 1, cricket: win 2 tie 1)
- Login / Register - JWT login with username or email, only admin can add / edit / delete, students can only view

## API
| Method | Endpoint | Notes |
|--------|----------|-------|
| POST | /api/auth/register | returns token |
| POST | /api/auth/login | returns token |
| GET | /api/auth/me | needs token |
| GET / POST | /api/leagues | |
| GET / POST | /api/teams | ?leagueId= |
| GET / PUT / DELETE | /api/teams/:id | can't delete a team that has matches |
| GET / POST | /api/matches | ?leagueId= &status= |
| GET / PUT / DELETE | /api/matches/:id | update score / status / events / ball log |
| GET | /api/leaderboard/:leagueId | from finished matches |

POST / PUT / DELETE need `Authorization: Bearer <token>` of an admin user.

## Deploy on Render
`render.yaml` makes one web service: it builds the frontend and the backend serves it together with the api.

1. Render dashboard -> New -> Blueprint -> pick this repo
2. Paste your MongoDB Atlas connection string in `MONGO_URI` (`JWT_SECRET` is generated)
3. In Atlas -> Network Access allow `0.0.0.0/0` (Render free plan has no fixed IP)
4. After the first deploy run `npm run seed` and `npm run seed:users` once (locally with the same `MONGO_URI`)

Free plan sleeps after some idle time, first request can take up to a minute.
