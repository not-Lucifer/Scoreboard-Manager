# Scoreboard Manager

Full stack app to manage teams, matches and live scores for multiple sports.
Right now: **football** and **cricket**.

## Tech
- Frontend: React + Vite
- Backend: coming soon

## Run frontend
```
cd frontend
npm install
npm run dev
```

## Sample data
- La Liga - FC Barcelona, Real Madrid, Atletico Madrid
- Premier League - Manchester United, Manchester City, Liverpool, Arsenal
- ICC T20 World Cup - India, Australia, New Zealand, England

## Pages
- Home - live matches
- Teams - teams by league, add / delete, team details with players
- Matches - create match (league -> teams), open scoreboard
- Scoreboard
  - football: +1 / -1 goals
  - cricket: runs (0,1,2,4,6), wide, wicket, overs
- Leaderboard - per league (football: win 3 draw 1, cricket: win 2 tie 1)
- Login / Register - forms only for now
