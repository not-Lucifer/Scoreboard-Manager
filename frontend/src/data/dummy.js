// temp data till backend is ready
export const leagues = [
  { id: 1, name: 'La Liga', sport: 'football' },
  { id: 2, name: 'Premier League', sport: 'football' },
  { id: 3, name: 'ICC T20 World Cup', sport: 'cricket' },
]

export const teams = [
  { id: 1, name: 'FC Barcelona', shortName: 'FCB', sport: 'football', leagueId: 1, players: ['Robert Lewandowski', 'Pedri', 'Lamine Yamal'] },
  { id: 2, name: 'Real Madrid', shortName: 'RMA', sport: 'football', leagueId: 1, players: ['Kylian Mbappe', 'Vinicius Jr', 'Jude Bellingham'] },
  { id: 3, name: 'Atletico Madrid', shortName: 'ATM', sport: 'football', leagueId: 1, players: ['Julian Alvarez', 'Jan Oblak', 'Koke'] },
  { id: 4, name: 'Manchester United', shortName: 'MUN', sport: 'football', leagueId: 2, players: ['Bruno Fernandes', 'Kobbie Mainoo', 'Amad Diallo'] },
  { id: 5, name: 'Manchester City', shortName: 'MCI', sport: 'football', leagueId: 2, players: ['Erling Haaland', 'Phil Foden', 'Rodri'] },
  { id: 6, name: 'Liverpool', shortName: 'LIV', sport: 'football', leagueId: 2, players: ['Mohamed Salah', 'Virgil van Dijk', 'Alisson'] },
  { id: 7, name: 'Arsenal', shortName: 'ARS', sport: 'football', leagueId: 2, players: ['Bukayo Saka', 'Martin Odegaard', 'Declan Rice'] },
  { id: 8, name: 'India', shortName: 'IND', sport: 'cricket', leagueId: 3, players: ['Rohit Sharma', 'Virat Kohli', 'Jasprit Bumrah'] },
  { id: 9, name: 'Australia', shortName: 'AUS', sport: 'cricket', leagueId: 3, players: ['Pat Cummins', 'Steve Smith', 'Travis Head'] },
  { id: 10, name: 'New Zealand', shortName: 'NZ', sport: 'cricket', leagueId: 3, players: ['Kane Williamson', 'Rachin Ravindra', 'Mitchell Santner'] },
  { id: 11, name: 'England', shortName: 'ENG', sport: 'cricket', leagueId: 3, players: ['Joe Root', 'Ben Stokes', 'Jos Buttler'] },
]

export const matches = [
  { id: 1, sport: 'football', leagueId: 1, teamA: 1, teamB: 2, scoreA: 3, scoreB: 2, status: 'finished', date: '2026-11-08' },
  { id: 2, sport: 'football', leagueId: 2, teamA: 4, teamB: 6, scoreA: 1, scoreB: 1, status: 'finished', date: '2026-11-09' },
  { id: 3, sport: 'football', leagueId: 2, teamA: 7, teamB: 5, scoreA: 2, scoreB: 0, status: 'finished', date: '2026-11-22' },
  { id: 4, sport: 'football', leagueId: 1, teamA: 2, teamB: 3, scoreA: 1, scoreB: 0, status: 'live', date: '2026-11-27' },
  { id: 5, sport: 'football', leagueId: 2, teamA: 5, teamB: 4, scoreA: 0, scoreB: 0, status: 'upcoming', date: '2026-11-30' },
  // cricket score = runs, wickets, balls
  { id: 6, sport: 'cricket', leagueId: 3, teamA: 8, teamB: 9, scoreA: { runs: 186, wickets: 5, balls: 120 }, scoreB: { runs: 172, wickets: 9, balls: 120 }, status: 'finished', date: '2026-11-15' },
  { id: 7, sport: 'cricket', leagueId: 3, teamA: 10, teamB: 11, scoreA: { runs: 160, wickets: 8, balls: 120 }, scoreB: { runs: 161, wickets: 6, balls: 113 }, status: 'finished', date: '2026-11-18' },
  { id: 8, sport: 'cricket', leagueId: 3, teamA: 8, teamB: 10, scoreA: { runs: 92, wickets: 2, balls: 62 }, scoreB: { runs: 0, wickets: 0, balls: 0 }, status: 'live', date: '2026-11-27' },
  { id: 9, sport: 'cricket', leagueId: 3, teamA: 9, teamB: 11, scoreA: { runs: 0, wickets: 0, balls: 0 }, scoreB: { runs: 0, wickets: 0, balls: 0 }, status: 'upcoming', date: '2026-12-01' },
]
