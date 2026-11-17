// temp data till backend is ready
export const teams = [
  { id: 1, name: 'Red Warriors', shortName: 'RW', players: ['Rahul', 'Aman', 'Rohit'] },
  { id: 2, name: 'Blue Strikers', shortName: 'BS', players: ['Vikas', 'Sahil', 'Karan'] },
  { id: 3, name: 'Green Giants', shortName: 'GG', players: ['Arjun', 'Nikhil', 'Dev'] },
]

export const matches = [
  { id: 1, teamA: 1, teamB: 2, scoreA: 3, scoreB: 1, status: 'finished', date: '2026-11-10' },
  { id: 2, teamA: 2, teamB: 3, scoreA: 0, scoreB: 0, status: 'live', date: '2026-11-17' },
  { id: 3, teamA: 3, teamB: 1, scoreA: 0, scoreB: 0, status: 'upcoming', date: '2026-11-20' },
]
