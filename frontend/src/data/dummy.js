// temp data till backend is ready
export const leagues = [
  { id: 1, name: 'La Liga', sport: 'football' },
  { id: 2, name: 'Premier League', sport: 'football' },
]

export const teams = [
  { id: 1, name: 'FC Barcelona', shortName: 'FCB', sport: 'football', leagueId: 1, players: ['Robert Lewandowski', 'Pedri', 'Lamine Yamal'] },
  { id: 2, name: 'Real Madrid', shortName: 'RMA', sport: 'football', leagueId: 1, players: ['Kylian Mbappe', 'Vinicius Jr', 'Jude Bellingham'] },
  { id: 3, name: 'Atletico Madrid', shortName: 'ATM', sport: 'football', leagueId: 1, players: ['Julian Alvarez', 'Jan Oblak', 'Koke'] },
  { id: 4, name: 'Manchester United', shortName: 'MUN', sport: 'football', leagueId: 2, players: ['Bruno Fernandes', 'Kobbie Mainoo', 'Amad Diallo'] },
  { id: 5, name: 'Manchester City', shortName: 'MCI', sport: 'football', leagueId: 2, players: ['Erling Haaland', 'Phil Foden', 'Rodri'] },
  { id: 6, name: 'Liverpool', shortName: 'LIV', sport: 'football', leagueId: 2, players: ['Mohamed Salah', 'Virgil van Dijk', 'Alisson'] },
  { id: 7, name: 'Arsenal', shortName: 'ARS', sport: 'football', leagueId: 2, players: ['Bukayo Saka', 'Martin Odegaard', 'Declan Rice'] },
]

export const matches = [
  { id: 1, sport: 'football', leagueId: 1, teamA: 1, teamB: 2, scoreA: 3, scoreB: 2, status: 'finished', date: '2026-11-08' },
  { id: 2, sport: 'football', leagueId: 2, teamA: 4, teamB: 6, scoreA: 1, scoreB: 1, status: 'finished', date: '2026-11-09' },
  { id: 3, sport: 'football', leagueId: 2, teamA: 7, teamB: 5, scoreA: 2, scoreB: 0, status: 'finished', date: '2026-11-22' },
  { id: 4, sport: 'football', leagueId: 1, teamA: 2, teamB: 3, scoreA: 1, scoreB: 0, status: 'live', date: '2026-11-27' },
  { id: 5, sport: 'football', leagueId: 2, teamA: 5, teamB: 4, scoreA: 0, scoreB: 0, status: 'upcoming', date: '2026-11-30' },
]
