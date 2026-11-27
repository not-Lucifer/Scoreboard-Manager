# Scoreboard Manager

Full stack app to manage teams, matches and live scores for multiple sports.
Right now: **football** and **cricket**.

## Tech
- Frontend: React + Vite + Tailwind CSS (minimal theme, Archivo font)
- Backend: coming soon

## Run frontend
```
cd frontend
npm install
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
- Data is saved in localStorage
- Leaderboard - per league (football: win 3 draw 1, cricket: win 2 tie 1)
- Login / Register - forms only for now
