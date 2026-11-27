// temp data till backend is ready
export const leagues = [
  { id: 1, name: 'La Liga', sport: 'football' },
  { id: 2, name: 'Premier League', sport: 'football' },
  { id: 3, name: 'ICC T20 World Cup', sport: 'cricket' },
]

export const teams = [
  {
    id: 1, name: 'FC Barcelona', shortName: 'FCB', sport: 'football', leagueId: 1,
    players: ['Joan Garcia', 'Jules Kounde', 'Pau Cubarsi', 'Ronald Araujo', 'Alejandro Balde', 'Frenkie de Jong', 'Pedri', 'Gavi', 'Lamine Yamal', 'Raphinha', 'Robert Lewandowski'],
  },
  {
    id: 2, name: 'Real Madrid', shortName: 'RMA', sport: 'football', leagueId: 1,
    players: ['Thibaut Courtois', 'Trent Alexander-Arnold', 'Dean Huijsen', 'Antonio Rudiger', 'Ferland Mendy', 'Federico Valverde', 'Aurelien Tchouameni', 'Jude Bellingham', 'Arda Guler', 'Vinicius Jr', 'Kylian Mbappe'],
  },
  {
    id: 3, name: 'Atletico Madrid', shortName: 'ATM', sport: 'football', leagueId: 1,
    players: ['Jan Oblak', 'Nahuel Molina', 'Jose Gimenez', 'Robin Le Normand', 'David Hancko', 'Koke', 'Pablo Barrios', 'Conor Gallagher', 'Giuliano Simeone', 'Alexander Sorloth', 'Julian Alvarez'],
  },
  {
    id: 4, name: 'Manchester United', shortName: 'MUN', sport: 'football', leagueId: 2,
    players: ['Senne Lammens', 'Diogo Dalot', 'Matthijs de Ligt', 'Lisandro Martinez', 'Luke Shaw', 'Casemiro', 'Kobbie Mainoo', 'Bruno Fernandes', 'Bryan Mbeumo', 'Matheus Cunha', 'Benjamin Sesko'],
  },
  {
    id: 5, name: 'Manchester City', shortName: 'MCI', sport: 'football', leagueId: 2,
    players: ['Gianluigi Donnarumma', 'Rico Lewis', 'Ruben Dias', 'John Stones', 'Josko Gvardiol', 'Rodri', 'Bernardo Silva', 'Tijjani Reijnders', 'Phil Foden', 'Jeremy Doku', 'Erling Haaland'],
  },
  {
    id: 6, name: 'Liverpool', shortName: 'LIV', sport: 'football', leagueId: 2,
    players: ['Alisson', 'Jeremie Frimpong', 'Ibrahima Konate', 'Virgil van Dijk', 'Andy Robertson', 'Ryan Gravenberch', 'Alexis Mac Allister', 'Dominik Szoboszlai', 'Florian Wirtz', 'Mohamed Salah', 'Alexander Isak'],
  },
  {
    id: 7, name: 'Arsenal', shortName: 'ARS', sport: 'football', leagueId: 2,
    players: ['David Raya', 'Ben White', 'William Saliba', 'Gabriel', 'Riccardo Calafiori', 'Declan Rice', 'Martin Zubimendi', 'Martin Odegaard', 'Bukayo Saka', 'Gabriel Martinelli', 'Viktor Gyokeres'],
  },
  {
    id: 8, name: 'India', shortName: 'IND', sport: 'cricket', leagueId: 3,
    players: ['Abhishek Sharma', 'Shubman Gill', 'Suryakumar Yadav', 'Tilak Varma', 'Sanju Samson', 'Hardik Pandya', 'Axar Patel', 'Kuldeep Yadav', 'Varun Chakaravarthy', 'Jasprit Bumrah', 'Arshdeep Singh'],
  },
  {
    id: 9, name: 'Australia', shortName: 'AUS', sport: 'cricket', leagueId: 3,
    players: ['Travis Head', 'Mitchell Marsh', 'Josh Inglis', 'Glenn Maxwell', 'Tim David', 'Marcus Stoinis', 'Cameron Green', 'Pat Cummins', 'Nathan Ellis', 'Adam Zampa', 'Josh Hazlewood'],
  },
  {
    id: 10, name: 'New Zealand', shortName: 'NZ', sport: 'cricket', leagueId: 3,
    players: ['Tim Seifert', 'Devon Conway', 'Rachin Ravindra', 'Daryl Mitchell', 'Glenn Phillips', 'Mark Chapman', 'Mitchell Santner', 'Michael Bracewell', 'Matt Henry', 'Lockie Ferguson', 'Ish Sodhi'],
  },
  {
    id: 11, name: 'England', shortName: 'ENG', sport: 'cricket', leagueId: 3,
    players: ['Phil Salt', 'Jos Buttler', 'Jacob Bethell', 'Harry Brook', 'Ben Duckett', 'Will Jacks', 'Sam Curran', 'Brydon Carse', 'Jofra Archer', 'Adil Rashid', 'Mark Wood'],
  },
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
