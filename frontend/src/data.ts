import type { NavigationItem, RecentActivity, StatCard } from './types'

export const navigation: { label: string; items: NavigationItem[] }[] = [
  { label: 'Pilotage', items: [{ label: 'Tableau de bord', key: 'dashboard', icon: 'layout-dashboard' }] },
  { label: 'Immobilier', items: [
    { label: 'Immeubles', key: 'buildings', icon: 'building-2' },
  ]},
  { label: 'Secrétariat', items: [
    { label: 'Vue générale', key: 'secretariat', icon: 'contact' }, { label: 'Documents', key: 'secretariat-documents', icon: 'folder-open' },
    { label: 'Courriers & correspondances', key: 'secretariat-correspondence', icon: 'mail' }, { label: 'Réunions', key: 'secretariat-meetings', icon: 'calendar-days' },
  ]},
  { label: 'Logistique', items: [
    { label: 'Vue générale', key: 'logistics', icon: 'warehouse' }, { label: 'Entrepôt principal', key: 'warehouse', icon: 'boxes' },
    { label: 'Dépôts', key: 'depots', icon: 'warehouse' }, { label: 'Articles', key: 'articles', icon: 'boxes' },
    { label: 'Mouvements', key: 'movements', icon: 'arrow-left-right' }, { label: 'Inventaires', key: 'inventory', icon: 'clipboard-list' },
    { label: 'Demandes', key: 'requests', icon: 'clipboard-list' }, { label: 'Fournisseurs', key: 'suppliers', icon: 'truck' },
    { label: 'Commandes', key: 'orders', icon: 'shopping-cart' }, { label: 'Réceptions', key: 'receipts', icon: 'truck' },
  ]},
  { label: 'Finances', items: [
    { label: 'Caisse', key: 'cash', icon: 'landmark' }, { label: 'Comptabilité', key: 'accounting', icon: 'book-open' }, { label: 'Rapports', key: 'reports', icon: 'bar-chart-3' },
  ]},
  { label: 'Espace événementiel', items: [
    { label: 'Vue générale', key: 'events', icon: 'party-popper' }, { label: 'Événements', key: 'event-calendar', icon: 'calendar-range' },
    { label: 'Réservations', key: 'event-reservations', icon: 'calendar-check-2' }, { label: "Types d'événement", key: 'event-types', icon: 'ticket' },
    { label: 'Espaces & lieux', key: 'event-venues', icon: 'map-pinned' },
  ]},
  { label: 'Ressources humaines', items: [
    { label: 'Vue générale', key: 'hr', icon: 'briefcase-business' }, { label: 'Employés', key: 'hr-employees', icon: 'user-round-check' },
    { label: 'Présences & absences', key: 'hr-attendance', icon: 'clock-3' }, { label: 'Congés', key: 'hr-leave', icon: 'calendar-off' },
    { label: 'Paie', key: 'hr-payroll', icon: 'wallet-cards' }, { label: 'Recrutement', key: 'hr-recruitment', icon: 'graduation-cap' },
    { label: 'Évaluations', key: 'hr-evaluations', icon: 'clipboard-check' },
  ]},
  { label: 'Administration', items: [
    { label: 'Utilisateurs', key: 'users', icon: 'user-cog' }, { label: 'Rôles & permissions', key: 'roles', icon: 'shield-check' },
    { label: 'Paramètres', key: 'settings', icon: 'settings' }, { label: "Journal d'activité", key: 'activity', icon: 'scroll-text' },
  ]},
]

export const stats: StatCard[] = [
  { label: 'Trésorerie consolidée', value: '$ 8,4M', change: '+12,8% ce mois', trend: 'up', tone: 'gold' },
  { label: 'Revenus événementiels', value: '$ 11 090', change: '19 réservations', trend: 'up', tone: 'blue' },
  { label: 'Articles en stock', value: '1 248', change: '94% disponibles', trend: 'up', tone: 'green' },
  { label: 'Opérations à valider', value: '18', change: '6 prioritaires', trend: 'neutral', tone: 'red' },
]

export const serviceSync = [
  { service: 'Immobilier', title: 'Paiement reçu sur Horizon 6', detail: 'Contrat · $ 1 200', time: 'Il y a 12 min', icon: 'building-2', tone: 'gold', status: 'Synchronisé' },
  { service: 'Logistique', title: 'Transfert de stock validé', detail: 'Entrepôt principal → Dépôt B', time: 'Il y a 1 h', icon: 'boxes', tone: 'blue', status: 'Synchronisé' },
  { service: 'Événementiel', title: 'Réservation confirmée', detail: 'Rooftop SGCI · 20 sept.', time: 'Il y a 1 h 30', icon: 'calendar-check-2', tone: 'purple', status: 'Synchronisé' },
  { service: 'Secrétariat', title: 'Document transmis pour validation', detail: 'Procès-verbal · Direction', time: 'Il y a 2 h', icon: 'folder-open', tone: 'green', status: 'En traitement' },
]

export const activities: RecentActivity[] = [
  { title: 'Paiement reçu', detail: 'Appartement A-204 · $ 450 000', time: 'Il y a 12 min', initials: 'AM', tone: 'gold' },
  { title: 'Nouvelle demande de maintenance', detail: 'Résidence Les Jardins · Plomberie', time: 'Il y a 38 min', initials: 'MJ', tone: 'blue' },
  { title: 'Transfert de stock validé', detail: 'Entrepôt principal → Dépôt B', time: 'Il y a 1 h', initials: 'SK', tone: 'green' },
  { title: 'Contrat signé', detail: 'Client Camille Martin · Villa 3B', time: 'Il y a 2 h', initials: 'CM', tone: 'purple' },
]

export const buildings = [
  { id: 'IMM-001', name: 'Horizon 6', address: '12, avenue du Commerce, Gombe', city: 'Kinshasa', units: 32, occupied: 28, monthlyRevenue: '$ 18 400', status: 'Actif', updatedAt: '15 sept. 2026', tone: 'green' },
  { id: 'IMM-002', name: 'Horizon 4', address: '45, avenue de la Justice, Limete', city: 'Kinshasa', units: 24, occupied: 21, monthlyRevenue: '$ 13 750', status: 'Actif', updatedAt: '14 sept. 2026', tone: 'green' },
  { id: 'IMM-003', name: 'Villa des Acacias', address: '8, avenue de la Paix, Ngaliema', city: 'Kinshasa', units: 12, occupied: 9, monthlyRevenue: '$ 8 200', status: 'Actif', updatedAt: '12 sept. 2026', tone: 'green' },
  { id: 'IMM-004', name: 'Résidence Baobab', address: '7, avenue Kasa-Vubu', city: 'Lubumbashi', units: 18, occupied: 12, monthlyRevenue: '$ 6 900', status: 'Maintenance', updatedAt: '10 sept. 2026', tone: 'gold' },
]

export const buildingDetails = {
  'IMM-001': { name: 'Horizon 6', address: '12, avenue du Commerce, Gombe, Kinshasa', rooms: 32, occupied: 28, available: 4, client: 'Nadia Bernard', clientInitials: 'NB', clientPhone: '+243 81 000 00 00', guarantee: '$ 2 400', monthlyPayment: '$ 1 200', contractStart: '01 janv. 2026', contractEnd: '31 déc. 2026', tone: 'green' },
  'IMM-002': { name: 'Horizon 4', address: '45, avenue de la Justice, Limete, Kinshasa', rooms: 24, occupied: 21, available: 3, client: 'Thomas Leroy', clientInitials: 'TL', clientPhone: '+243 82 000 00 00', guarantee: '$ 1 800', monthlyPayment: '$ 950', contractStart: '01 févr. 2026', contractEnd: '31 janv. 2027', tone: 'blue' },
}

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
  buildings: { eyebrow: 'Immobilier', title: 'Immeubles', description: 'Gérez votre parc immobilier et suivez son occupation.' }, units: { eyebrow: 'Immobilier', title: 'Appartements & unités', description: 'Visualisez les unités, leur statut et leurs rattachements.' }, clients: { eyebrow: 'Immobilier', title: 'Clients', description: 'Centralisez les informations et la relation avec vos clients.' }, contracts: { eyebrow: 'Immobilier', title: 'Contrats', description: 'Suivez les contrats actifs, leurs échéances et renouvellements.' }, payments: { eyebrow: 'Immobilier', title: 'Paiements', description: 'Suivez les encaissements et les règlements en attente.' }, maintenance: { eyebrow: 'Immobilier', title: 'Maintenance', description: 'Coordonnez les interventions sur vos sites et équipements.' }, logistics: { eyebrow: 'Logistique', title: 'Vue générale logistique', description: 'Pilotez vos stocks par dépôt et surveillez les flux.' }, warehouse: { eyebrow: 'Logistique', title: 'Entrepôt principal', description: 'Gérez le stock central, ses emplacements et ses mouvements.' }, depots: { eyebrow: 'Logistique', title: 'Dépôts', description: 'Chaque dépôt reste une unité de gestion avec son stock et ses règles.' }, articles: { eyebrow: 'Logistique', title: 'Articles & catégories', description: 'Référencez les articles, familles et niveaux de stock.' }, movements: { eyebrow: 'Logistique', title: 'Mouvements de stock', description: 'Consultez les entrées, sorties et transferts entre dépôts.' }, inventory: { eyebrow: 'Logistique', title: 'Inventaires', description: 'Préparez et suivez vos inventaires par dépôt.' }, requests: { eyebrow: 'Achats', title: "Demandes d'achat", description: 'Structurez les besoins avant leur validation.' }, suppliers: { eyebrow: 'Achats', title: 'Fournisseurs', description: 'Conservez vos partenaires et leurs informations essentielles.' }, orders: { eyebrow: 'Achats', title: 'Bons de commande', description: 'Suivez les commandes de la demande à la réception.' }, receipts: { eyebrow: 'Achats', title: 'Réceptions', description: 'Rapprochez les réceptions avec vos commandes et votre stock.' }, cash: { eyebrow: 'Finances', title: 'Caisse', description: 'Centralisez les opérations à valider et le solde disponible.' }, accounting: { eyebrow: 'Finances', title: 'Comptabilité', description: 'Préparez la consolidation des opérations financières validées.' }, reports: { eyebrow: 'Finances', title: 'Rapports', description: 'Construisez une lecture synthétique de vos activités.' }, users: { eyebrow: 'Administration', title: 'Utilisateurs', description: 'Gérez les accès et les équipes de votre organisation.' }, roles: { eyebrow: 'Administration', title: 'Rôles & permissions', description: 'Préparez un contrôle d’accès adapté à chaque responsabilité.' }, settings: { eyebrow: 'Administration', title: 'Paramètres', description: 'Configurez les référentiels de la plateforme.' }, activity: { eyebrow: 'Administration', title: "Journal d'activité", description: 'Gardez une trace claire des actions importantes.' },
}

Object.assign(moduleMeta, {
  secretariat: { eyebrow: 'Secrétariat', title: 'Vue générale du secrétariat', description: 'Centralisez les documents, courriers, réunions et tâches administratives.' },
  'secretariat-documents': { eyebrow: 'Secrétariat', title: 'Documents', description: 'Classez, recherchez et suivez les documents de votre organisation.' },
  'secretariat-correspondence': { eyebrow: 'Secrétariat', title: 'Courriers & correspondances', description: 'Suivez les courriers entrants, sortants et leur traitement.' },
  'secretariat-meetings': { eyebrow: 'Secrétariat', title: 'Réunions', description: 'Préparez les réunions, participants, ordres du jour et comptes rendus.' },
  events: { eyebrow: 'Espace événementiel', title: 'Vue générale événementielle', description: 'Pilotez les événements, réservations et disponibilités de vos espaces.' },
  'event-reservations': { eyebrow: 'Espace événementiel', title: 'Réservations', description: 'Gérez les demandes, disponibilités et confirmations de réservation.' },
  'event-types': { eyebrow: 'Espace événementiel', title: "Types d'événement", description: 'Configurez les catégories : anniversaire, mariage civil, concert ou conférence.' },
  'event-calendar': { eyebrow: 'Espace événementiel', title: 'Calendrier événementiel', description: 'Visualisez les événements et réservations dans le temps.' },
  'event-venues': { eyebrow: 'Espace événementiel', title: 'Espaces & lieux', description: 'Référencez les salles, lieux, capacités et équipements disponibles.' },
  hr: { eyebrow: 'Ressources humaines', title: 'Vue générale RH', description: 'Pilotez les effectifs, présences, congés et indicateurs sociaux.' },
  'hr-employees': { eyebrow: 'Ressources humaines', title: 'Employés', description: 'Centralisez les profils, postes, équipes et documents des collaborateurs.' },
  'hr-attendance': { eyebrow: 'Ressources humaines', title: 'Présences & absences', description: 'Suivez les présences, retards et absences par équipe.' },
  'hr-leave': { eyebrow: 'Ressources humaines', title: 'Congés', description: 'Gérez les demandes, validations et soldes de congés.' },
  'hr-payroll': { eyebrow: 'Ressources humaines', title: 'Paie', description: 'Préparez les éléments variables et le suivi mensuel de la paie.' },
  'hr-recruitment': { eyebrow: 'Ressources humaines', title: 'Recrutement', description: 'Suivez les postes ouverts, candidatures et étapes de recrutement.' },
  'hr-evaluations': { eyebrow: 'Ressources humaines', title: 'Évaluations', description: 'Planifiez les entretiens et suivez les objectifs des collaborateurs.' },
})
