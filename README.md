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
Every team has 11 players (example squads).

- La Liga - FC Barcelona, Real Madrid, Atletico Madrid
- Premier League - Manchester United, Manchester City, Liverpool, Arsenal
- ICC T20 World Cup - India, Australia, New Zealand, England

## Pages
- Home - live matches
- Teams - teams by league, add / delete, team details with players
- Matches - create match (league -> teams), for cricket also overs + who bats first
- Scoreboard
  - football: add events with minute, team, player (goal, penalty goal, penalty missed, yellow card, red card), goals update score, delete event
  - cricket: pick batter + bowler, runs (0,1,2,4,6), wide, wicket, ball by ball log, innings ends on all out / overs done / target chased
- Leaderboard - per league (football: win 3 draw 1, cricket: win 2 tie 1)
- Login / Register - forms only for now
