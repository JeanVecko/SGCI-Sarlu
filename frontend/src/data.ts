import type { NavigationItem } from './types'

export const navigation: { label: string; items: NavigationItem[] }[] = [
  { label: 'Logistique', items: [
    { label: 'Vue générale', key: 'logistics', icon: 'warehouse' },
    { label: 'Entrepôt principal', key: 'warehouse', icon: 'boxes' },
    { label: 'Dépôts', key: 'depots', icon: 'warehouse' },
    { label: 'Articles', key: 'articles', icon: 'boxes' },
    { label: 'Mouvements', key: 'movements', icon: 'arrow-left-right' },
    { label: 'Inventaires', key: 'inventory', icon: 'clipboard-list' },
    { label: 'Demandes', key: 'requests', icon: 'clipboard-list' },
    { label: 'Fournisseurs', key: 'suppliers', icon: 'truck' },
    { label: 'Commandes', key: 'orders', icon: 'shopping-cart' },
    { label: 'Réceptions', key: 'receipts', icon: 'truck' },
  ]},
  { label: 'Espace événementiel', items: [
    { label: 'Vue générale', key: 'events', icon: 'party-popper' },
    { label: 'Événements', key: 'event-calendar', icon: 'calendar-range' },
    { label: 'Réservations', key: 'event-reservations', icon: 'calendar-check-2' },
    { label: "Types d'événement", key: 'event-types', icon: 'ticket' },
    { label: 'Espaces & lieux', key: 'event-venues', icon: 'map-pinned' },
  ]},
]

export const eventSpaces = [
  { name: 'Salle de conférence', shortName: 'Conférence', revenue: '$ 4 850', reservations: 8, occupancy: '67%', tone: 'blue' },
  { name: 'Rooftop SGCI', shortName: 'Rooftop', revenue: '$ 6 240', reservations: 11, occupancy: '82%', tone: 'gold' },
]

export const eventReservations = [
  { date: '18 sept. 2026', day: 'Ven.', title: 'Conférence — Tech & avenir', space: 'Salle de conférence', client: 'Nadia Bernard', amount: '$ 1 200', paid: '$ 1 200', status: 'Payée', tone: 'blue' },
  { date: '20 sept. 2026', day: 'Dim.', title: 'Anniversaire privé', space: 'Rooftop SGCI', client: 'Thomas Leroy', amount: '$ 850', paid: '$ 500', status: 'Acompte', tone: 'gold' },
  { date: '24 sept. 2026', day: 'Jeu.', title: 'Mariage civil', space: 'Rooftop SGCI', client: 'Sarah & Marc', amount: '$ 2 400', paid: '$ 2 400', status: 'Payée', tone: 'green' },
  { date: '28 sept. 2026', day: 'Lun.', title: 'Réunion direction', space: 'Salle de conférence', client: 'Groupe Horizon', amount: '$ 600', paid: '$ 0', status: 'En attente', tone: 'red' },
]

export const eventCalendar = [
  { day: 1, status: 'past' }, { day: 2, status: 'past' }, { day: 3, status: 'past' }, { day: 4, status: 'past' }, { day: 5, status: 'past' }, { day: 6, status: 'past' }, { day: 7, status: 'past' },
  { day: 8, status: 'past' }, { day: 9, status: 'past' }, { day: 10, status: 'past' }, { day: 11, status: 'past' }, { day: 12, status: 'past' }, { day: 13, status: 'past' }, { day: 14, status: 'past' },
  { day: 15, status: 'today' }, { day: 16, status: 'available' }, { day: 17, status: 'partial' }, { day: 18, status: 'booked' }, { day: 19, status: 'available' }, { day: 20, status: 'booked' }, { day: 21, status: 'available' },
  { day: 22, status: 'available' }, { day: 23, status: 'partial' }, { day: 24, status: 'booked' }, { day: 25, status: 'available' }, { day: 26, status: 'available' }, { day: 27, status: 'partial' }, { day: 28, status: 'booked' },
  { day: 29, status: 'available' }, { day: 30, status: 'available' },
]

export const moduleMeta: Record<string, { eyebrow: string; title: string; description: string }> = {
  logistics: { eyebrow: 'Logistique', title: 'Vue générale logistique', description: 'Pilotez vos stocks par dépôt et surveillez les flux.' },
  warehouse: { eyebrow: 'Logistique', title: 'Entrepôt principal', description: 'Gérez le stock central, ses emplacements et ses mouvements.' },
  depots: { eyebrow: 'Logistique', title: 'Dépôts', description: 'Chaque dépôt reste une unité de gestion avec son stock et ses règles.' },
  articles: { eyebrow: 'Logistique', title: 'Articles & catégories', description: 'Référencez les articles, familles et niveaux de stock.' },
  movements: { eyebrow: 'Logistique', title: 'Mouvements de stock', description: 'Consultez les entrées, sorties et transferts entre dépôts.' },
  inventory: { eyebrow: 'Logistique', title: 'Inventaires', description: 'Préparez et suivez vos inventaires par dépôt.' },
  requests: { eyebrow: 'Achats', title: "Demandes d'achat", description: 'Structurez les besoins avant leur validation.' },
  suppliers: { eyebrow: 'Achats', title: 'Fournisseurs', description: 'Conservez vos partenaires et leurs informations essentielles.' },
  orders: { eyebrow: 'Achats', title: 'Bons de commande', description: 'Suivez les commandes de la demande à la réception.' },
  receipts: { eyebrow: 'Achats', title: 'Réceptions', description: 'Validez les réceptions et contrôlez les écarts.' },
  events: { eyebrow: 'Espace événementiel', title: 'Vue générale événementielle', description: 'Pilotez les événements, réservations et disponibilités de vos espaces.' },
  'event-reservations': { eyebrow: 'Espace événementiel', title: 'Réservations', description: 'Gérez les demandes, disponibilités et confirmations de réservation.' },
  'event-types': { eyebrow: 'Espace événementiel', title: "Types d'événement", description: 'Configurez les catégories : anniversaire, mariage civil, concert ou conférence.' },
  'event-calendar': { eyebrow: 'Espace événementiel', title: 'Calendrier événementiel', description: 'Visualisez les événements et réservations dans le temps.' },
  'event-venues': { eyebrow: 'Espace événementiel', title: 'Espaces & lieux', description: 'Référencez les salles, lieux, capacités et équipements disponibles.' },
}
