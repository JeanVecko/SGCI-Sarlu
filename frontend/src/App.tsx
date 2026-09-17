import { useEffect, useState, type FormEvent } from 'react'
import * as Icons from 'lucide-react'
import { activities, buildingDetails, buildings, categoryTones, eventCalendar, eventReservations, eventSpaces, initialCategories, moduleMeta, navigation, serviceSync, stats, type ApartmentCategory } from './data'
import { demoAuth } from './services/auth'
import { buildingStorage, categoryStorage, clientStorage, clearAllRealEstateData, type StoredBuilding, type StoredClient } from './services/storage'
import type { IconName, ModuleKey } from './types'

const iconMap: Record<IconName, Icons.LucideIcon> = {
  'layout-dashboard': Icons.LayoutDashboard, 'building-2': Icons.Building2, 'door-open': Icons.DoorOpen, users: Icons.Users,
  'file-text': Icons.FileText, 'credit-card': Icons.CreditCard, wrench: Icons.Wrench, warehouse: Icons.Warehouse,
  boxes: Icons.Boxes, 'arrow-left-right': Icons.ArrowLeftRight, 'clipboard-list': Icons.ClipboardList, truck: Icons.Truck,
  'shopping-cart': Icons.ShoppingCart, landmark: Icons.Landmark, 'book-open': Icons.BookOpen, 'bar-chart-3': Icons.BarChart3,
  'user-cog': Icons.UserCog, 'shield-check': Icons.ShieldCheck, settings: Icons.Settings, 'scroll-text': Icons.ScrollText,
  'calendar-days': Icons.CalendarDays, 'calendar-check-2': Icons.CalendarCheck2, mail: Icons.Mail, 'folder-open': Icons.FolderOpen,
  contact: Icons.Contact, 'party-popper': Icons.PartyPopper, 'calendar-range': Icons.CalendarRange, 'map-pinned': Icons.MapPinned, ticket: Icons.Ticket,
  'briefcase-business': Icons.BriefcaseBusiness, 'user-round-check': Icons.UserRoundCheck, 'clock-3': Icons.Clock3, 'calendar-off': Icons.CalendarOff,
  'wallet-cards': Icons.WalletCards, 'graduation-cap': Icons.GraduationCap, 'clipboard-check': Icons.ClipboardCheck,
}

function IntroScreen() {
  return <main className="intro-screen"><div className="intro-glow" /><div className="intro-orbit intro-orbit-one" /><div className="intro-orbit intro-orbit-two" /><div className="intro-logo"><img src="/LOGO.jpeg" alt="Logo SGCI" /><span /><strong>PILOT</strong></div><div className="intro-wordmark"><span>SGCI</span><b>Piloté tout-en-un</b></div><div className="intro-loader"><i /><span>Initialisation de votre espace</span></div></main>
}

function LoginScreen({ onLogin }: { onLogin: () => Promise<void> }) {
  const [email, setEmail] = useState('superadmin@demo.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    window.setTimeout(async () => {
      try {
        await demoAuth.signIn(email, password)
        await onLogin()
      } catch (loginError) {
        setError(loginError instanceof Error ? loginError.message : 'Impossible de se connecter.')
        setIsSubmitting(false)
      }
    }, 900)
  }

  return <main className="login-screen"><section className="login-visual"><div className="login-visual-top"><div className="login-mini-brand"><img src="/LOGO.jpeg" alt="SGCI SARLU" /><span /> <strong>PILOT</strong></div><span className="login-secure"><Icons.ShieldCheck size={14} /> Accès sécurisé</span></div><div className="login-orbit-scene"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-dot dot-one" /><div className="orbit-dot dot-two" /><div className="login-logo-card"><img src="/LOGO.jpeg" alt="Logo SGCI" /><div className="logo-card-line" /><strong>PILOT</strong></div><div className="login-rings" /></div><div className="login-message"><p className="eyebrow">Votre centre de pilotage</p><h1>Piloté<br /><em>tout-en-un.</em></h1><p>Une vision claire de vos activités, de vos équipes et de votre croissance.</p><div className="login-progress"><i /><span>SGCI Pilot · Gestion intégrée</span></div></div><div className="login-visual-footer"><span>© 2026 SGCI SARLU</span><span>Gestion intégrée, simplement.</span></div></section><section className="login-form-panel"><div className="login-form-wrap"><div className="mobile-login-brand"><img src="/LOGO.jpeg" alt="SGCI SARLU" /><strong>PILOT</strong></div><div className="login-heading"><span className="login-kicker">Bienvenue dans votre espace</span><h2>Connectez-vous.</h2><p>Accédez à votre environnement de pilotage SGCI.</p></div><form className="login-form" onSubmit={handleSubmit}><label>Adresse email<div className="login-input"><Icons.Mail size={17} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="vous@entreprise.com" required /></div></label><label>Mot de passe<div className="login-input"><Icons.LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Saisissez votre mot de passe" required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>{showPassword ? <Icons.EyeOff size={16} /> : <Icons.Eye size={16} />}</button></div></label>{error && <p className="login-error"><Icons.CircleAlert size={14} /> {error}</p>}<div className="login-options"><label className="remember"><input type="checkbox" /> <span>Se souvenir de moi</span></label><button type="button" className="forgot-password">Mot de passe oublié ?</button></div><button className={`login-submit ${isSubmitting ? 'loading' : ''}`} type="submit" disabled={isSubmitting}>{isSubmitting ? <><span className="login-spinner" /> Connexion en cours...</> : <>Se connecter <Icons.ArrowRight size={17} /></>}</button></form><div className="login-footer-note"><Icons.LockKeyhole size={13} /> Vos données sont protégées et chiffrées.</div></div><div className="login-help">Besoin d'aide ? <button type="button">Contacter le support</button></div></section></main>
}

function Brand() {
  return <div className="brand"><img src="/LOGO.jpeg" alt="SGCI SARLU" /><span className="brand-divider" /><span className="brand-product">PILOT</span></div>
}

function Sidebar({ active, onNavigate, onBuildingSelect, selectedBuilding, buildingsExpanded, onToggleBuildings, expandedGroups, onToggleGroup, open, onClose, buildingsList, categories }: { active: ModuleKey; onNavigate: (key: ModuleKey) => void; onBuildingSelect: (id: string) => void; selectedBuilding: string | null; buildingsExpanded: boolean; onToggleBuildings: () => void; expandedGroups: Record<string, boolean>; onToggleGroup: (label: string) => void; open: boolean; onClose: () => void; buildingsList: BuildingRecord[]; categories: Record<string, ApartmentCategory[]> }) {
  return <>
    <div className={`sidebar-overlay ${open ? 'visible' : ''}`} onClick={onClose} />
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-top"><Brand /><button className="icon-button sidebar-close" onClick={onClose} aria-label="Fermer le menu"><Icons.X size={18} /></button></div>
      <div className="workspace-switcher"><div className="workspace-mark">S</div><div><strong>SGCI SARLU</strong><span>Organisation principale</span></div><Icons.ChevronsUpDown size={15} /></div>
      <nav className="nav-scroll">
        {navigation.map((group) => { const groupExpanded = expandedGroups[group.label] ?? true; return <div className="nav-group" key={group.label}><button type="button" className={`nav-label nav-group-toggle ${groupExpanded ? 'expanded' : ''}`} onClick={() => onToggleGroup(group.label)}><span>{group.label}</span><Icons.ChevronDown size={13} /></button>{groupExpanded && group.items.map((item) => { const Icon = iconMap[item.icon]; const isBuildings = item.key === 'buildings'; return <div key={item.key} className={isBuildings ? 'nav-tree' : ''}><div className={isBuildings ? 'nav-item-row' : ''}>{isBuildings ? <button type="button" className={`nav-item ${active === item.key ? 'active' : ''}`} onClick={() => { onNavigate(item.key); onClose() }}><Icon size={17} strokeWidth={active === item.key ? 2.3 : 1.8} /><span>{item.label}</span></button> : <button className={`nav-item ${active === item.key ? 'active' : ''}`} key={item.key} onClick={() => { onNavigate(item.key); onClose() }}><Icon size={17} strokeWidth={active === item.key ? 2.3 : 1.8} /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button>}{isBuildings && <button type="button" className={`nav-chevron-button ${buildingsExpanded ? 'expanded' : ''}`} onClick={onToggleBuildings} aria-label={buildingsExpanded ? 'Fermer la liste des immeubles' : 'Ouvrir la liste des immeubles'}><Icons.ChevronDown size={14} /></button>}</div>{isBuildings && buildingsExpanded && <div className="building-subnav">{buildingsList.map((building) => <button key={building.id} className={selectedBuilding === building.id ? 'selected' : ''} onClick={() => onBuildingSelect(building.id)}><span className={`subnav-dot ${building.tone}`} />{building.name}<em className="subnav-count">{categories[building.id]?.reduce((sum, category) => sum + category.total, 0) ?? 0}</em></button>)}</div>}</div> })}</div> })}
      </nav>
      <div className="sidebar-footer"><div className="support-card"><span className="support-icon"><Icons.LifeBuoy size={16} /></span><div><strong>Besoin d'aide ?</strong><span>Consulter le centre d'aide</span></div><Icons.ArrowUpRight size={15} /></div><div className="sidebar-version">SGCI Pilot <span>v0.1.0</span></div></div>
    </aside>
  </>
}

function Header({ onMenu, onSignOut, sidebarOpen, darkMode, onToggleTheme }: { onMenu: () => void; onSignOut: () => void; sidebarOpen: boolean; darkMode: boolean; onToggleTheme: () => void }) {
  return <header className="topbar"><button className="icon-button menu-button" onClick={onMenu} aria-label={sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>{sidebarOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}</button><div className="breadcrumb"><span>SGCI Pilot</span><Icons.ChevronRight size={14} /><strong>Tableau de bord</strong></div><div className="topbar-actions"><label className="search"><Icons.Search size={17} /><input placeholder="Rechercher..." /><kbd>⌘ K</kbd></label><button className="theme-toggle" onClick={onToggleTheme} aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode nuit'} title={darkMode ? 'Mode clair' : 'Mode nuit'}>{darkMode ? <Icons.Sun size={17} /> : <Icons.Moon size={17} />}</button><button className="icon-button notification" aria-label="Notifications"><Icons.Bell size={19} /><i /></button><div className="profile"><div className="avatar">JV</div><div className="profile-text"><strong>Jean Vecko</strong><span>Super administrateur</span></div><Icons.ChevronDown size={15} /></div><button className="sign-out-button" onClick={onSignOut} aria-label="Se déconnecter" title="Se déconnecter"><Icons.LogOut size={16} /><span>Déconnexion</span></button></div></header>
}

function StatCard({ stat }: { stat: typeof stats[number] }) {
  const icons = { gold: Icons.Building2, blue: Icons.DoorOpen, green: Icons.Users, red: Icons.FileWarning }
  const Icon = icons[stat.tone]
  return <article className="stat-card"><div className={`stat-icon ${stat.tone}`}><Icon size={19} /></div><div className="stat-copy"><span>{stat.label}</span><strong>{stat.value}</strong><small className={stat.trend === 'down' ? 'negative' : stat.trend === 'neutral' ? 'neutral' : ''}>{stat.trend === 'up' && <Icons.TrendingUp size={13} />}{stat.trend === 'neutral' && <Icons.Clock3 size={13} />}{stat.change}</small></div><button className="more-button" aria-label={`Options ${stat.label}`}><Icons.MoreHorizontal size={18} /></button></article>
}

function Dashboard({ onNavigate, onReset, buildingsList, clients, categories }: { onNavigate: (key: ModuleKey) => void; onReset: () => void; buildingsList: BuildingRecord[]; clients: RealEstateClient[]; categories: Record<string, ApartmentCategory[]> }) {
  const syncIconMap = { 'building-2': Icons.Building2, boxes: Icons.Boxes, 'calendar-check-2': Icons.CalendarCheck2, 'folder-open': Icons.FolderOpen }

  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(timer) }, [])

  const totalUnits = Object.values(categories).reduce((sum, cats) => sum + cats.reduce((s, cat) => s + cat.total, 0), 0)
  const totalOccupied = clients.length
  const totalAvailable = totalUnits - totalOccupied
  const occupancyRate = totalUnits ? Math.round((totalOccupied / totalUnits) * 100) : 0
  const availableRate = totalUnits ? Math.round((totalAvailable / totalUnits) * 100) : 0
  const totalMonthly = clients.reduce((sum, client) => sum + client.monthlyAmount, 0)
  const totalGuarantee = clients.reduce((sum, client) => sum + client.guaranteePaid, 0)
  const totalPotentialMonthly = Object.values(categories).reduce(
    (sum, cats) => sum + cats.reduce((s, cat) => s + cat.monthlyAmount * cat.occupied, 0), 0
  )

  const dynamicStats: typeof stats[number][] = [
    { label: 'Immeubles enregistrés', value: String(buildingsList.length), change: `${totalUnits} unités au total`, trend: 'up', tone: 'blue' },
    { label: 'Taux d’occupation', value: `${occupancyRate}%`, change: `${totalOccupied} / ${totalUnits} occupés`, trend: totalOccupied > 0 ? 'up' : 'neutral', tone: 'green' },
    { label: 'Loyer mensuel perçu', value: formatAmount(totalMonthly), change: `${clients.length} client${clients.length > 1 ? 's' : ''}`, trend: 'up', tone: 'gold' },
    { label: 'Garanties versées', value: formatAmount(totalGuarantee), change: `${clients.length} client${clients.length > 1 ? 's' : ''}`, trend: 'up', tone: 'blue' },
  ]

  const formattedDate = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(now)
  return <div className="page-content dashboard-page"><section className="page-heading"><div><p className="eyebrow">Pilotage global · {formattedDate}</p><h1>Bonjour Jean</h1><p className="heading-copy">Voici la situation consolidée de tous vos services aujourd'hui.</p></div><button className="primary-button" onClick={() => onNavigate('reports')}><Icons.BarChart3 size={17} /> Voir les rapports</button><button type="button" className="filter-button" onClick={onReset}><Icons.RotateCcw size={16} /> Réinitialiser les données</button></section>
    <section className="stats-grid">{dynamicStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>
    <section className="dashboard-grid"><article className="panel performance-panel"><div className="panel-heading"><div><p className="eyebrow">Vue financière</p><h2>Trésorerie & activité</h2></div><button className="select-button">Cette année <Icons.ChevronDown size={14} /></button></div><div className="finance-summary"><div><span>Trésorerie locative</span><strong>{formatAmount(totalMonthly + totalGuarantee)}</strong><p className="positive"><Icons.TrendingUp size={14} /> {formatAmount(totalMonthly)} loyers + {formatAmount(totalGuarantee)} garanties <span>{clients.length} client{clients.length > 1 ? 's' : ''}</span></p></div><div className="legend"><span><i className="legend-dot revenue" /> Lloyers</span><span><i className="legend-dot expense" /> Garanties</span></div><div className="finance-rebreak"><div><span>Loyer mensuel perçu</span><strong>{formatAmount(totalMonthly)}</strong></div><div><span>Garanties versées</span><strong>{formatAmount(totalGuarantee)}</strong></div><div><span>Revenus locatifs potentiels</span><strong>{formatAmount(totalPotentialMonthly)}</strong></div></div></div><div className="chart"><div className="chart-y"><span>10M</span><span>7,5M</span><span>5M</span><span>2,5M</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-label="Graphique des revenus et dépenses"><defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b26b0b" stopOpacity=".18" /><stop offset="1" stopColor="#b26b0b" stopOpacity="0" /></linearGradient></defs><path d="M0 145 C35 125 65 132 98 108 S157 92 192 105 S252 70 291 87 S355 70 386 64 S445 77 484 50 S535 60 576 39 S634 52 700 20 L700 190 L0 190 Z" fill="url(#revenue-fill)" /><path d="M0 145 C35 125 65 132 98 108 S157 92 192 105 S252 70 291 87 S355 70 386 64 S445 77 484 50 S535 60 576 39 S634 52 700 20" fill="none" stroke="#b26b0b" strokeWidth="3" strokeLinecap="round" /><path d="M0 167 C48 151 72 155 112 145 S165 132 202 147 S260 119 298 130 S345 113 390 122 S448 106 484 115 S535 98 572 108 S628 86 700 96" fill="none" stroke="#96a3aa" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" /></svg><div className="chart-x"><span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span><span>Juil</span><span>Aoû</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Déc</span></div></div></div></article>
      <article className="panel alerts-panel"><div className="panel-heading"><div><p className="eyebrow">À surveiller</p><h2>Alertes</h2></div><button className="text-button">Tout voir <Icons.ArrowUpRight size={15} /></button></div><div className="alert-list"><div className="alert-row"><span className="alert-symbol warning"><Icons.AlertTriangle size={17} /></span><div><strong>3 contrats arrivent à échéance</strong><span>Dans les 30 prochains jours</span></div><Icons.ChevronRight size={16} /></div><div className="alert-row"><span className="alert-symbol danger"><Icons.PackageX size={17} /></span><div><strong>Stock faible au Dépôt B</strong><span>8 articles sous le seuil minimum</span></div><Icons.ChevronRight size={16} /></div><div className="alert-row"><span className="alert-symbol info"><Icons.Wrench size={17} /></span><div><strong>2 interventions en attente</strong><span>Résidence Les Jardins</span></div><Icons.ChevronRight size={16} /></div></div><div className="alert-footer"><span>Dernière mise à jour</span><strong>Il y a 4 min</strong></div></article>
    </section>
    <section className="lower-grid"><article className="panel sync-panel"><div className="panel-heading"><div><p className="eyebrow">Vue interservices</p><h2>Synchronisation majeure</h2></div><button className="text-button" onClick={() => onNavigate('activity')}>Voir le journal <Icons.ArrowUpRight size={15} /></button></div><div className="sync-list">{serviceSync.map((item) => { const SyncIcon = syncIconMap[item.icon as keyof typeof syncIconMap]; return <div className="sync-row" key={item.title}><span className={`sync-icon ${item.tone}`}><SyncIcon size={16} /></span><div className="sync-info"><div><strong>{item.title}</strong><span>{item.service} · {item.detail}</span></div><small>{item.time}</small></div><span className={`sync-status ${item.status === 'Synchronisé' ? 'done' : 'pending'}`}><Icons.CheckCircle2 size={12} /> {item.status}</span></div> })}</div></article><article className="panel occupancy-panel"><div className="panel-heading"><div><p className="eyebrow">Immobilier · {buildingsList.length} immeuble{buildingsList.length > 1 ? 's' : ''}</p><h2>Occupation</h2></div><button className="more-button" aria-label="Options occupation"><Icons.MoreHorizontal size={18} /></button></div><div className="occupancy-body"><div className="donut"><div><strong>{totalUnits}</strong><span>unités</span></div></div><div className="occupancy-legend"><div><span><i className="dot occupied" /> Occupés</span><strong>{totalOccupied} <small>{occupancyRate}%</small></strong></div><div><span><i className="dot available" /> Disponibles</span><strong>{totalAvailable} <small>{availableRate}%</small></strong></div><div><span><i className="dot maintenance" /> Maintenance</span><strong>0 <small>0%</small></strong></div></div><div className="occupancy-revenue"><span><Icons.CircleDollarSign size={14} /> Loyer mensuel <strong>{formatAmount(totalMonthly)}</strong></span></div></div></article></section>
  </div>
}

function ModulePage({ module, onNavigate }: { module: ModuleKey; onNavigate: (key: ModuleKey) => void }) {
  const meta = moduleMeta[module] ?? moduleMeta.dashboard
  const Icon = iconMap[navigation.flatMap((group) => group.items).find((item) => item.key === module)?.icon ?? 'layout-dashboard']
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Tous les statuts')
  const [statusOpen, setStatusOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const statuses = ['Tous les statuts', 'Actif', 'En attente', 'Archivé']

  // Le module n'a pas encore de donnees : la recherche et les filtres
  // pilotent un etat local qui servira de contrat a l'API future.
  const criteria = [search.trim() && `recherche « ${search.trim()} »`, status !== 'Tous les statuts' && `statut ${status}`].filter(Boolean)
  const activeFilters = status !== 'Tous les statuts' ? 1 : 0
  const exportCsv = () => {
    const rows = [['module', 'critere', 'valeur'], ...criteria.map((criterion) => [meta.title, 'filtre', criterion])]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${module}-export.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setNotice(`Export CSV de « ${meta.title} » généré.`)
    window.setTimeout(() => setNotice(''), 4000)
  }

  const resetFilters = () => { setSearch(''); setStatus('Tous les statuts'); setStatusOpen(false) }

  return <div className="page-content module-page"><section className="page-heading"><div><p className="eyebrow">{meta.eyebrow}</p><h1>{meta.title}</h1><p className="heading-copy">{meta.description}</p></div><button type="button" className="primary-button" onClick={() => { setNotice(`La création d’une entrée « ${meta.title} » sera reliée à l’API.`); window.setTimeout(() => setNotice(''), 4000) }}><Icons.Plus size={17} /> Nouvelle entrée</button></section><div className="module-toolbar"><label className="table-search"><Icons.Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Rechercher dans ${meta.title.toLowerCase()}...`} /></label><div className="status-filter"><button type="button" className="filter-button" onClick={() => setStatusOpen((value) => !value)} aria-expanded={statusOpen}><Icons.SlidersHorizontal size={16} /> Filtres <span>{activeFilters}</span></button>{statusOpen && <div className="status-menu"><p className="status-menu-title">Statut</p>{statuses.map((item) => <button type="button" key={item} className={item === status ? 'selected' : ''} onClick={() => { setStatus(item); setStatusOpen(false) }}>{item === status && <Icons.Check size={13} />}{item}</button>)}</div>}</div><button type="button" className="filter-button" onClick={exportCsv}><Icons.Download size={16} /> Exporter</button>{criteria.length > 0 && <button type="button" className="filter-button" onClick={resetFilters}><Icons.X size={14} /> Réinitialiser</button>}</div>{notice && <p className="module-notice"><Icons.Info size={14} /> {notice}</p>}{criteria.length > 0 && <p className="module-criteria"><Icons.Filter size={13} /> Critères actifs : {criteria.join(' · ')}</p>}<section className="module-empty panel"><div className="empty-icon"><Icon size={25} /></div><h2>Votre espace {meta.title.toLowerCase()}</h2><p>Cette vue est prête à accueillir vos données et vos workflows. La structure est en place pour connecter votre API et enrichir ce module progressivement.</p><button className="secondary-button" onClick={() => onNavigate('dashboard')}><Icons.ArrowLeft size={16} /> Retour au tableau de bord</button></section></div>
}

type ContractFile = { name: string; size: number; type: string }

type RealEstateClient = {
  id: string
  buildingId: string
  /** Categorie de logement : studio, 2 chambres, 3 chambres… */
  categoryId: string
  name: string
  apartmentNumber: string
  monthlyAmount: number
  guaranteePaid: number
  dueDate: string
  contract?: ContractFile
}

type ClientDraft = {
  categoryId: string
  name: string
  apartmentNumber: string
  monthlyAmount: string
  guaranteePaid: string
  dueDate: string
  contract: ContractFile | null
}

const emptyClientDraft: ClientDraft = { categoryId: '', name: '', apartmentNumber: '', monthlyAmount: '', guaranteePaid: '', dueDate: '', contract: null }

const seedContract: ContractFile = { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' }

// Modeles de reference proposes lors de la creation d'un immeuble.
const allCategoryTemplates: { id: string; label: string }[] = [
  { id: 'studio', label: 'Studio' },
  { id: 'deux-chambres', label: '2 chambres' },
  { id: 'trois-chambres', label: '3 chambres' },
  { id: 'quatre-chambres', label: '4 chambres' },
]

const initialRealEstateClients: RealEstateClient[] = [
  { id: 'CLI-001', buildingId: 'IMM-001', categoryId: 'deux-chambres', name: 'Nadia Bernard', apartmentNumber: 'A-204', monthlyAmount: 1200, guaranteePaid: 2400, dueDate: '2026-10-05', contract: seedContract },
  { id: 'CLI-002', buildingId: 'IMM-002', categoryId: 'deux-chambres', name: 'Thomas Leroy', apartmentNumber: 'B-107', monthlyAmount: 950, guaranteePaid: 1900, dueDate: '2026-10-08' },
  { id: 'CLI-003', buildingId: 'IMM-001', categoryId: 'trois-chambres', name: 'Marie Kabeya', apartmentNumber: 'C-312', monthlyAmount: 1800, guaranteePaid: 3600, dueDate: '2026-09-30' },
  { id: 'CLI-004', buildingId: 'IMM-003', categoryId: 'studio', name: 'Joseph Ilunga', apartmentNumber: 'A-101', monthlyAmount: 500, guaranteePaid: 1000, dueDate: '2026-10-12' },
  { id: 'CLI-005', buildingId: 'IMM-004', categoryId: 'studio', name: 'Sarah Nkulu', apartmentNumber: 'D-204', monthlyAmount: 400, guaranteePaid: 800, dueDate: '2026-09-28' },
]

function formatAmount(amount: number) {
  return `$ ${new Intl.NumberFormat('fr-FR').format(amount)}`
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join('')
}

function nextClientId(clients: RealEstateClient[]) {
  const highest = clients.reduce((max, client) => {
    const parsed = Number(client.id.replace(/\D/g, ''))
    return Number.isFinite(parsed) ? Math.max(max, parsed) : max
  }, 0)
  return `CLI-${String(highest + 1).padStart(3, '0')}`
}

function formatDate(value: string) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

function dueState(dueDate: string): { label: string; tone: 'late' | 'soon' | 'ok' } {
  if (!dueDate) return { label: 'Non définie', tone: 'ok' }
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate); due.setHours(0, 0, 0, 0)
  const days = Math.round((due.getTime() - today.getTime()) / 86400000)
  if (days < 0) return { label: `En retard de ${Math.abs(days)} j`, tone: 'late' }
  if (days <= 7) return { label: `Dans ${days} j`, tone: 'soon' }
  return { label: 'À jour', tone: 'ok' }
}

function ClientFormFields({ value, onChange, categories }: { value: ClientDraft; onChange: (next: ClientDraft) => void; categories: ApartmentCategory[] }) {
  const selected = categories.find((category) => category.id === value.categoryId)
  // Le loyer et la garantie decoulent de la categorie choisie.
  const applyCategory = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId)
    onChange({
      ...value,
      categoryId,
      monthlyAmount: category ? String(category.monthlyAmount) : value.monthlyAmount,
      guaranteePaid: category ? String(category.guaranteeAmount) : value.guaranteePaid,
    })
  }
  return <>
    <label>Catégorie d’appartement<select value={value.categoryId} onChange={(event) => applyCategory(event.target.value)} required><option value="">Sélectionner une catégorie</option>{categories.map((category) => { const full = category.occupied >= category.total; return <option key={category.id} value={category.id} disabled={full}>{category.label} · {formatAmount(category.monthlyAmount)} / mois{full ? ' — complet' : ` (${category.total - category.occupied} libre)`}</option> })}</select>{selected && <span className="field-hint">Garantie {formatAmount(selected.guaranteeAmount)} · {selected.occupied}/{selected.total} occupés</span>}</label>
    <label>Nom du client<input value={value.name} onChange={(event) => onChange({ ...value, name: event.target.value })} placeholder="Ex. Marie Kabeya" required /></label>
    <label>Numéro de l’appartement<input value={value.apartmentNumber} onChange={(event) => onChange({ ...value, apartmentNumber: event.target.value })} placeholder="Ex. B-102" required /></label>
    <label>Prix du loyer ($)<input type="number" min="0" step="any" value={value.monthlyAmount} onChange={(event) => onChange({ ...value, monthlyAmount: event.target.value })} placeholder="Ex. 1200" required />{selected && <span className="field-hint">Tarif de la catégorie {selected.label}</span>}</label>
    <label>Garantie payée ($)<input type="number" min="0" step="any" value={value.guaranteePaid} onChange={(event) => onChange({ ...value, guaranteePaid: event.target.value })} placeholder="Ex. 2400" required />{selected && <span className="field-hint">Selon la catégorie {selected.label}</span>}</label>
    <label>Date d’échéance du paiement<input type="date" value={value.dueDate} onChange={(event) => onChange({ ...value, dueDate: event.target.value })} required /></label>
    <label className="contract-field">Contrat du client<input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(event) => { const file = event.target.files?.[0]; onChange({ ...value, contract: file ? { name: file.name, size: file.size, type: file.type } : null }) }} />{value.contract ? <span className="contract-chip"><Icons.FileCheck2 size={13} /> {value.contract.name} · {formatFileSize(value.contract.size)}</span> : <span className="contract-hint">PDF, Word ou image · 10 Mo max</span>}</label>
 </>
}

type CategoryDraft = {
  id: string | null
  label: string
  bedrooms: string
  monthlyAmount: string
  guaranteeAmount: string
  total: string
  tone: ApartmentCategory['tone']
}

const emptyCategoryDraft: CategoryDraft = { id: null, label: '', bedrooms: '2', monthlyAmount: '', guaranteeAmount: '', total: '', tone: 'blue' }

function CategoryFormFields({ value, onChange }: { value: CategoryDraft; onChange: (next: CategoryDraft) => void }) {
  return <>
    <label>Nom de la catégorie<input value={value.label} onChange={(event) => onChange({ ...value, label: event.target.value })} placeholder="Ex. 4 chambres" required /></label>
    <label>Nombre de chambres<input type="number" min="0" step="1" value={value.bedrooms} onChange={(event) => onChange({ ...value, bedrooms: event.target.value })} placeholder="0 pour un studio" required /></label>
    <label>Loyer mensuel ($)<input type="number" min="0" step="any" value={value.monthlyAmount} onChange={(event) => onChange({ ...value, monthlyAmount: event.target.value })} placeholder="Ex. 1800" required /></label>
    <label>Garantie ($)<input type="number" min="0" step="any" value={value.guaranteeAmount} onChange={(event) => onChange({ ...value, guaranteeAmount: event.target.value })} placeholder="Ex. 3600" required /></label>
    <label>Nombre d’appartements<input type="number" min="0" step="1" value={value.total} onChange={(event) => onChange({ ...value, total: event.target.value })} placeholder="Ex. 6" required /></label>
    <label>Couleur<select value={value.tone} onChange={(event) => onChange({ ...value, tone: event.target.value as ApartmentCategory['tone'] })}>{categoryTones.map((tone) => <option key={tone} value={tone}>{tone}</option>)}</select></label>
 </>
}

function CategoryManager({ buildingName, categories, clients, onCategoriesChange, onClose }: { buildingName: string; categories: ApartmentCategory[]; clients: RealEstateClient[]; onCategoriesChange: (next: ApartmentCategory[]) => void; onClose: () => void }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<CategoryDraft>(() => ({ ...emptyCategoryDraft }))
  const [error, setError] = useState('')

  const occupantCount = (categoryId: string) => clients.filter((client) => client.categoryId === categoryId).length
  const openCreateForm = () => { setEditingId(null); setError(''); setDraft({ ...emptyCategoryDraft }); setIsFormOpen(true) }
  const openEditForm = (category: ApartmentCategory) => {
    setEditingId(category.id); setError('')
    setDraft({ id: category.id, label: category.label, bedrooms: String(category.bedrooms), monthlyAmount: String(category.monthlyAmount), guaranteeAmount: String(category.guaranteeAmount), total: String(category.total), tone: category.tone })
    setIsFormOpen(true)
  }

  const removeCategory = (category: ApartmentCategory) => {
    const occupants = occupantCount(category.id)
    if (occupants > 0) {
      window.setTimeout(() => setError(`Impossible de supprimer « ${category.label} » : ${occupants} client(s) y sont rattachés.`), 0)
      return
    }
    onCategoriesChange(categories.filter((item) => item.id !== category.id))
  }

  const submitCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const label = draft.label.trim()
    const bedrooms = Number(draft.bedrooms)
    const monthlyAmount = Number(draft.monthlyAmount)
    const guaranteeAmount = Number(draft.guaranteeAmount)
    const total = Number(draft.total)
    if (!label || !Number.isFinite(bedrooms) || !Number.isFinite(monthlyAmount) || !Number.isFinite(guaranteeAmount) || !Number.isFinite(total)) return
    // Le stock d'appartements ne peut pas descendre sous le nombre de clients deja rattaches.
    if (editingId) {
      const occupants = occupantCount(editingId)
      if (total < occupants) {
        setError(`« ${label} » compte ${occupants} client(s) rattachés : le nombre d’appartements ne peut pas être inférieur à ${occupants}.`)
        return
      }
    }
    const record: ApartmentCategory = { id: editingId ?? `cat-${Date.now()}`, label, bedrooms, monthlyAmount, guaranteeAmount, total, occupied: editingId ? occupantCount(editingId) : 0, tone: draft.tone }
    onCategoriesChange(editingId ? categories.map((item) => (item.id === editingId ? record : item)) : [...categories, record])
    setIsFormOpen(false); setEditingId(null); setDraft({ ...emptyCategoryDraft }); setError('')
  }

  return <section className="panel category-manager">
    <div className="panel-heading"><div><p className="eyebrow">{buildingName}</p><h2>Gérer les catégories d’appartement</h2></div><div className="category-manager-actions"><button type="button" className="primary-button" onClick={openCreateForm}><Icons.Plus size={16} /> Nouvelle catégorie</button><button type="button" className="icon-button" onClick={onClose} aria-label="Fermer"><Icons.X size={17} /></button></div></div>
    {error && <p className="category-error"><Icons.AlertTriangle size={14} /> {error}</p>}
    {isFormOpen && <form className="client-form category-form" onSubmit={submitCategory}><CategoryFormFields value={draft} onChange={setDraft} /><div className="client-form-actions"><button type="button" className="secondary-button" onClick={() => { setIsFormOpen(false); setError('') }}>Annuler</button><button type="button" className="primary-button" onClick={submitCategory as unknown as () => void}><Icons.Check size={16} /> {editingId ? 'Enregistrer' : 'Créer la catégorie'}</button></div></form>}
    <div className="category-table-wrap"><table className="category-table"><thead><tr><th>Catégorie</th><th>Loyer / mois</th><th>Garantie</th><th>Appartements</th><th>Clients rattachés</th><th /></tr></thead><tbody>{categories.map((category) => <tr key={category.id}><td><span className={`category-pill ${category.tone}`}><Icons.DoorOpen size={13} /> {category.label}</span></td><td><strong>{formatAmount(category.monthlyAmount)}</strong></td><td>{formatAmount(category.guaranteeAmount)}</td><td><strong>{category.total}</strong><span className="category-cell-note">{category.total - occupantCount(category.id)} libre(s)</span></td><td><strong>{occupantCount(category.id)}</strong></td><td><div className="client-row-actions"><button type="button" onClick={() => openEditForm(category)} aria-label={`Modifier ${category.label}`} title="Modifier"><Icons.Pencil size={14} /></button><button type="button" className="danger-action" onClick={() => removeCategory(category)} aria-label={`Supprimer ${category.label}`} title="Supprimer"><Icons.Trash2 size={14} /></button></div></td></tr>)}</tbody></table></div>
 </section>
}

type BuildingClientsProps = {
  buildingId: string
  buildingName: string
  categories: ApartmentCategory[]
  clients: RealEstateClient[]
  onChange: (next: RealEstateClient[]) => void
}

function BuildingClientsPanel({ buildingId, buildingName, categories, clients, onChange }: BuildingClientsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<ClientDraft>(() => ({ ...emptyClientDraft }))
  const [error, setError] = useState('')

  // Nombre de clients deja rattaches a une categorie.
  const occupantsOf = (categoryId: string, ignoreClientId: string | null = null) =>
    clients.filter((client) => client.categoryId === categoryId && client.id !== ignoreClientId).length
  const openCreateForm = () => { setEditingId(null); setError(''); setDraft({ ...emptyClientDraft }); setIsFormOpen(true) }
  const closeForm = () => { setIsFormOpen(false); setEditingId(null); setError(''); setDraft({ ...emptyClientDraft }) }
  const openEditForm = (client: RealEstateClient) => {
    setEditingId(client.id)
    setDraft({ categoryId: client.categoryId, name: client.name, apartmentNumber: client.apartmentNumber, monthlyAmount: String(client.monthlyAmount), guaranteePaid: String(client.guaranteePaid), dueDate: client.dueDate, contract: client.contract ?? null })
    setIsFormOpen(true)
  }
  const removeClient = (client: RealEstateClient) => onChange(clients.filter((item) => item.id !== client.id))

  const submitClient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const monthly = Number(draft.monthlyAmount)
    const guarantee = Number(draft.guaranteePaid)
    const name = draft.name.trim()
    const apartmentNumber = draft.apartmentNumber.trim()
    if (!name || !apartmentNumber || !draft.categoryId || !draft.dueDate || !Number.isFinite(monthly) || !Number.isFinite(guarantee)) return
    // Refuser l'attribution si la categorie est deja pleine.
    const category = categories.find((item) => item.id === draft.categoryId)
    if (category) {
      const occupants = occupantsOf(category.id, editingId)
      if (occupants >= category.total) {
        setError(`La catégorie « ${category.label} » est complète : ${category.total}/${category.total} appartements occupés.`)
        return
      }
    }
    const record: RealEstateClient = { id: editingId ?? nextClientId(clients), buildingId, categoryId: draft.categoryId, name, apartmentNumber, monthlyAmount: monthly, guaranteePaid: guarantee, dueDate: draft.dueDate, contract: draft.contract ?? undefined }
    onChange(editingId ? clients.map((item) => (item.id === editingId ? record : item)) : [...clients, record])
    closeForm()
  }

  const totalMonthly = clients.reduce((sum, client) => sum + client.monthlyAmount, 0)
  const totalGuarantee = clients.reduce((sum, client) => sum + client.guaranteePaid, 0)

  return <section className="building-clients">
    <div className="building-clients-head">
      <div><p className="eyebrow">Occupation de {buildingName}</p><h2>{clients.length} client{clients.length > 1 ? 's' : ''} rattaché{clients.length > 1 ? 's' : ''}</h2></div>
      <button type="button" className="primary-button" onClick={openCreateForm}><Icons.UserPlus size={17} /> Ajouter un client</button>
    </div>
    {clients.length > 0 && <div className="building-clients-summary">
      <span><Icons.CircleDollarSign size={14} /> Loyers mensuels <strong>{formatAmount(totalMonthly)}</strong></span>
      <span><Icons.ShieldCheck size={14} /> Garanties <strong>{formatAmount(totalGuarantee)}</strong></span>
    </div>}
    {isFormOpen && <section className="panel client-form-panel"><div className="panel-heading"><div><p className="eyebrow">{editingId ? 'Mise à jour' : 'Nouveau dossier'}</p><h2>{editingId ? `Modifier ${editingId}` : `Ajouter un client à ${buildingName}`}</h2></div><button type="button" className="icon-button" onClick={closeForm} aria-label="Fermer le formulaire"><Icons.X size={17} /></button></div>{error && <p className="category-error"><Icons.AlertTriangle size={14} /> {error}</p>}
    <form className="client-form" onSubmit={submitClient}><ClientFormFields value={draft} onChange={setDraft} categories={categories} /><div className="client-form-actions"><button type="button" className="secondary-button" onClick={closeForm}>Annuler</button><button className="primary-button" type="submit"><Icons.Check size={16} /> {editingId ? 'Enregistrer les modifications' : 'Enregistrer le client'}</button></div></form></section>}
    {clients.length === 0 ? <div className="panel client-empty"><Icons.UsersRound size={22} /><strong>Aucun client pour cet immeuble</strong><span>Ajoutez le premier locataire pour suivre son appartement, son loyer et sa garantie.</span></div> : <div className="building-clients-grid">{clients.map((client) => { const state = dueState(client.dueDate); return <article className="panel client-card" key={client.id}>
      <div className="client-card-top">
        <div className="client-profile"><div className="client-avatar">{initialsOf(client.name)}</div><div><strong>{client.name}</strong><span>{client.id} · Appartement {client.apartmentNumber}</span><span className="client-category"><Icons.DoorOpen size={11} /> {categories.find((c) => c.id === client.categoryId)?.label ?? 'Catégorie non définie'}</span></div></div>
        <div className="client-row-actions"><button type="button" onClick={() => openEditForm(client)} aria-label={`Modifier ${client.name}`} title="Modifier"><Icons.Pencil size={14} /></button><button type="button" className="danger-action" onClick={() => removeClient(client)} aria-label={`Supprimer ${client.name}`} title="Supprimer"><Icons.Trash2 size={14} /></button></div>
      </div>
      <div className="client-fields">
        <div><span>Prix du loyer</span><strong className="monthly-amount">{formatAmount(client.monthlyAmount)}</strong></div>
        <div><span>Garantie payée</span><strong>{formatAmount(client.guaranteePaid)}</strong></div>
        <div><span>Date d’échéance</span><strong>{formatDate(client.dueDate)}</strong></div>
        <div><span>Contrat</span>{client.contract ? <button type="button" className="contract-file"><Icons.FileCheck2 size={13} /> {client.contract.name}</button> : <strong className="contract-missing">Non fourni</strong>}</div>
      </div>
      <span className={`due-pill ${state.tone}`}><Icons.CalendarClock size={12} /> {state.label}</span>
    </article> })}</div>}
 </section>
}

function BuildingDetail({ buildingId, onBack, clients, onClientsChange, categories: allCategories, onCategoriesChange, buildingsList }: { buildingId: string; onBack: () => void; clients: RealEstateClient[]; onClientsChange: (next: RealEstateClient[]) => void; categories: Record<string, ApartmentCategory[]>; onCategoriesChange: (next: Record<string, ApartmentCategory[]>) => void; buildingsList: BuildingRecord[] }) {
  const record = buildingsList.find((item) => item.id === buildingId)
  // Un immeuble cree depuis l'interface n'a pas encore de fiche detaillee :
  // on retombe sur son enregistrement de liste plutot que sur un immeuble par defaut.
  const building = buildingDetails[buildingId as keyof typeof buildingDetails] ?? {
    name: record?.name ?? 'Immeuble',
    address: record ? `${record.address}, ${record.city}` : 'Adresse non renseignée',
    occupied: 0,
    available: 0,
    tone: record?.tone ?? 'green',
    categories: [],
  }
  const buildingClients = clients.filter((client) => client.buildingId === buildingId)
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  // L'occupation reelle d'une categorie decoule des clients rattaches.
  const categories = (allCategories[buildingId] ?? []).map((category) => ({
    ...category,
    occupied: buildingClients.filter((client) => client.categoryId === category.id).length,
  }))
  const totalApartments = categories.reduce((sum, category) => sum + category.total, 0)
  const occupiedApartments = categories.reduce((sum, category) => sum + category.occupied, 0)
  const availableApartments = totalApartments - occupiedApartments
  const occupancyRate = totalApartments ? Math.round((occupiedApartments / totalApartments) * 100) : 0
  const monthlyPotential = categories.reduce((sum, category) => sum + category.monthlyAmount * category.occupied, 0)
  const guaranteeRange = categories.length
    ? { min: Math.min(...categories.map((c) => c.guaranteeAmount)), max: Math.max(...categories.map((c) => c.guaranteeAmount)) }
    : { min: 0, max: 0 }
  const rentRange = categories.length
    ? { min: Math.min(...categories.map((c) => c.monthlyAmount)), max: Math.max(...categories.map((c) => c.monthlyAmount)) }
    : { min: 0, max: 0 }
  return <div className="page-content building-detail-page"><button className="back-link" onClick={onBack}><Icons.ArrowLeft size={15} /> Tous les immeubles</button><section className="detail-heading"><div><p className="eyebrow">Immobilier · Immeuble</p><h1>{building.name}</h1><p className="heading-copy"><Icons.MapPin size={14} /> {building.address}</p></div><button type="button" className="primary-button" disabled={buildingClients.length === 0} title={buildingClients.length === 0 ? 'Aucun contrat à télécharger' : 'Télécharger les contrats'}><Icons.Download size={16} /> Télécharger le contrat PDF</button></section><section className="building-detail-kpis"><article className="panel detail-kpi"><span className="detail-kpi-icon blue"><Icons.Building2 size={18} /></span><div><small>Nombre d’appartements</small><strong>{totalApartments}</strong></div></article><article className="panel detail-kpi"><span className="detail-kpi-icon green"><Icons.Users size={18} /></span><div><small>Appartements occupés</small><strong>{occupiedApartments}<em> / {totalApartments}</em></strong></div></article><article className="panel detail-kpi"><span className="detail-kpi-icon gold"><Icons.CircleDollarSign size={18} /></span><div><small>Garantie</small><strong>{guaranteeRange.min === guaranteeRange.max ? formatAmount(guaranteeRange.min) : `${formatAmount(guaranteeRange.min)} – ${formatAmount(guaranteeRange.max)}`}</strong><em className="kpi-hint">Selon la catégorie</em></div></article><article className="panel detail-kpi"><span className="detail-kpi-icon purple"><Icons.CalendarClock size={18} /></span><div><small>Paiement mensuel</small><strong>{rentRange.min === rentRange.max ? formatAmount(rentRange.min) : `${formatAmount(rentRange.min)} – ${formatAmount(rentRange.max)}`}</strong><em className="kpi-hint">{formatAmount(monthlyPotential)} / mois occupés</em></div></article></section><section className="building-detail-grid"><BuildingClientsPanel buildingId={buildingId} buildingName={building.name} categories={categories} clients={buildingClients} onChange={(next) => onClientsChange([...clients.filter((client) => client.buildingId !== buildingId), ...next])} /><article className="panel availability-detail-panel"><div className="panel-heading"><div><p className="eyebrow">État de l’immeuble</p><h2>Occupation</h2></div><button className="more-button" aria-label="Options de l'immeuble"><Icons.MoreHorizontal size={18} /></button></div><div className="detail-occupancy"><div className="detail-donut"><strong>{occupancyRate}%</strong><span>occupé</span></div><div className="detail-legend"><div><span><i className="dot occupied" /> Occupés</span><strong>{occupiedApartments}</strong></div><div><span><i className="dot available" /> Disponibles</span><strong>{availableApartments}</strong></div></div></div><div className="category-breakdown">{categories.map((category) => <div className="category-row" key={category.id}><div className="category-head"><span className={`category-mark ${category.tone}`}><Icons.DoorOpen size={14} /></span><div><strong>{category.label}</strong><span>{category.occupied}/{category.total} occupés · {formatAmount(category.monthlyAmount)} / mois · garantie {formatAmount(category.guaranteeAmount)}</span></div></div><div className="mini-track"><i className={category.tone} style={{ width: `${category.total ? (category.occupied / category.total) * 100 : 0}%` }} /></div></div>)}</div><button type="button" className="secondary-button category-manage-button" onClick={() => setIsCategoryManagerOpen(true)}><Icons.Settings2 size={15} /> Gérer les catégories</button></article>{isCategoryManagerOpen && <CategoryManager buildingName={building.name} categories={categories} clients={buildingClients} onCategoriesChange={(next) => onCategoriesChange({ ...allCategories, [buildingId]: next })} onClose={() => setIsCategoryManagerOpen(false)} />}</section></div>
}

type BuildingRecord = (typeof buildings)[number]

type BuildingDraft = { name: string; address: string; city: string; status: string; categories: string[] }

const emptyBuildingDraft: BuildingDraft = { name: '', address: '', city: '', status: 'Actif', categories: ['studio', 'deux-chambres', 'trois-chambres'] }

function BuildingsPage({ onNavigate, selectedBuilding, onBuildingSelect, clients, onClientsChange, categories, onCategoriesChange, buildingsList, onBuildingsChange }: { onNavigate: (key: ModuleKey) => void; selectedBuilding: string | null; onBuildingSelect: (id: string) => void; clients: RealEstateClient[]; onClientsChange: (next: RealEstateClient[]) => void; categories: Record<string, ApartmentCategory[]>; onCategoriesChange: (next: Record<string, ApartmentCategory[]>) => void; buildingsList: BuildingRecord[]; onBuildingsChange: (next: BuildingRecord[]) => void }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tous les statuts')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [draft, setDraft] = useState<BuildingDraft>(() => ({ ...emptyBuildingDraft }))
  const [statusOpen, setStatusOpen] = useState(false)

  const buildingStatuses = ['Tous les statuts', 'Actif', 'Maintenance']

  const term = search.trim().toLowerCase()
  const visibleBuildings = buildingsList.filter((building) => {
    const matchesTerm = !term || [building.name, building.id, building.city, building.address].some((field) => field.toLowerCase().includes(term))
    const matchesStatus = statusFilter === 'Tous les statuts' || building.status === statusFilter
    return matchesTerm && matchesStatus
  })

  const totalUnits = buildingsList.reduce((sum, building) => sum + building.units, 0)
  const totalOccupied = buildingsList.reduce((sum, building) => sum + building.occupied, 0)
  const occupancyRate = totalUnits ? Math.round((totalOccupied / totalUnits) * 100) : 0
  const activeCount = buildingsList.filter((building) => building.status === 'Actif').length
  const activeFilters = statusFilter === 'Tous les statuts' ? 0 : 1
  const closeForm = () => { setIsFormOpen(false); setDraft({ ...emptyBuildingDraft }) }

  const submitBuilding = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = draft.name.trim()
    const address = draft.address.trim()
    const city = draft.city.trim()
    if (!name || !address || !city || !draft.categories.length) return
    const highest = buildingsList.reduce((max, building) => {
      const parsed = Number(building.id.replace(/\D/g, ''))
      return Number.isFinite(parsed) ? Math.max(max, parsed) : max
    }, 0)
    const id = `IMM-${String(highest + 1).padStart(3, '0')}`
    const newBuilding: BuildingRecord = { id, name, address, city, units: 0, occupied: 0, monthlyRevenue: '$ 0', status: draft.status, updatedAt: '15 sept. 2026', tone: draft.status === 'Actif' ? 'green' : 'gold' } as BuildingRecord
    // L'immeuble demarre sans appartement : ses categories sont a definir ensuite.
    onBuildingsChange([...buildingsList, newBuilding])
    onCategoriesChange({ ...categories, [id]: [] })
    closeForm()
  }

  const toggleDraftCategory = (categoryId: string) => {
    setDraft((current) => ({
      ...current,
      categories: current.categories.includes(categoryId)
        ? current.categories.filter((item) => item !== categoryId)
        : [...current.categories, categoryId],
    }))
  }

  if (selectedBuilding) return <BuildingDetail buildingId={selectedBuilding} onBack={() => onBuildingSelect('')} clients={clients} onClientsChange={onClientsChange} categories={categories} onCategoriesChange={onCategoriesChange} buildingsList={buildingsList} />
  return <div className="page-content buildings-page"><section className="page-heading"><div><p className="eyebrow">Immobilier</p><h1>Immeubles</h1><p className="heading-copy">Sélectionnez un immeuble dans la liste pour consulter son détail.</p></div><button type="button" className="primary-button" onClick={() => setIsFormOpen(true)}><Icons.Plus size={17} /> Ajouter un immeuble</button></section>
    <section className="building-kpis"><article className="building-kpi panel"><span className="building-kpi-icon gold"><Icons.Building2 size={18} /></span><div><small>Immeubles enregistrés</small><strong>{buildingsList.length}</strong><em className="neutral-kpi">{activeCount} actif{activeCount > 1 ? 's' : ''}</em></div></article><article className="building-kpi panel"><span className="building-kpi-icon blue"><Icons.LayoutGrid size={18} /></span><div><small>Appartements au total</small><strong>{totalUnits}</strong><em className="neutral-kpi">{totalOccupied} occupés</em></div></article><article className="building-kpi panel"><span className="building-kpi-icon green"><Icons.Percent size={18} /></span><div><small>Taux d’occupation</small><strong>{occupancyRate}%</strong><em className="neutral-kpi">Sur {buildingsList.length} immeuble{buildingsList.length > 1 ? 's' : ''}</em></div></article><article className="building-kpi panel"><span className="building-kpi-icon purple"><Icons.CircleDollarSign size={18} /></span><div><small>Clients rattachés</small><strong>{clients.length}</strong><em className="neutral-kpi">Toutes résidences</em></div></article></section>
    {isFormOpen && <section className="panel building-form-panel"><div className="panel-heading"><div><p className="eyebrow">Nouveau bien</p><h2>Ajouter un immeuble</h2></div><button type="button" className="icon-button" onClick={closeForm} aria-label="Fermer le formulaire"><Icons.X size={17} /></button></div><form className="client-form" onSubmit={submitBuilding}><label>Nom de l’immeuble<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Ex. Résidence Les Palmiers" required /></label><label>Adresse<input value={draft.address} onChange={(event) => setDraft({ ...draft, address: event.target.value })} placeholder="Ex. 12, avenue du Commerce" required /></label><label>Ville<input value={draft.city} onChange={(event) => setDraft({ ...draft, city: event.target.value })} placeholder="Ex. Kinshasa" required /></label><label>Statut<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option value="Actif">Actif</option><option value="Maintenance">Maintenance</option></select></label><label className="building-category-field">Catégories prévues<span className="building-category-choices">{allCategoryTemplates.map((template) => <button type="button" key={template.id} className={`category-choice ${draft.categories.includes(template.id) ? 'selected' : ''}`} onClick={() => toggleDraftCategory(template.id)}><Icons.Check size={12} /> {template.label}</button>)}</span></label><div className="client-form-actions"><button type="button" className="secondary-button" onClick={closeForm}>Annuler</button><button className="primary-button" type="submit"><Icons.Check size={16} /> Créer l’immeuble</button></div></form></section>}
    <section className="panel buildings-list-panel"><div className="panel-heading"><div><p className="eyebrow">Parc immobilier</p><h2>{visibleBuildings.length} immeuble{visibleBuildings.length > 1 ? 's' : ''}</h2></div><span className="filter-button"><Icons.SlidersHorizontal size={15} /> Filtres <span>{activeFilters}</span></span></div><div className="buildings-toolbar"><label className="table-search"><Icons.Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un immeuble..." /></label><div className="status-filter"><button type="button" className="filter-button" onClick={() => setStatusOpen((value) => !value)} aria-expanded={statusOpen}><Icons.ListFilter size={15} /> {statusFilter} <Icons.ChevronDown size={13} /></button>{statusOpen && <div className="status-menu">{buildingStatuses.map((status) => <button type="button" key={status} className={status === statusFilter ? 'selected' : ''} onClick={() => { setStatusFilter(status); setStatusOpen(false) }}>{status === statusFilter && <Icons.Check size={13} />}{status}</button>)}</div>}</div></div><div className="building-table-wrap"><table className="building-table"><thead><tr><th>Immeuble</th><th>Localisation</th><th>Occupation</th><th>Revenus / mois</th><th>Statut</th><th>Mise à jour</th><th /></tr></thead><tbody>{visibleBuildings.map((building) => <tr key={building.id} onClick={() => onBuildingSelect(building.id)}><td><div className="building-name"><span className={`building-avatar ${building.tone}`}><Icons.Building2 size={17} /></span><div><strong>{building.name}</strong><small>{building.id}</small></div></div></td><td><strong>{building.city}</strong><small>{building.address}</small></td><td><div className="occupancy-cell"><div className="occupancy-label"><strong>{building.occupied}/{building.units}</strong><span>{Math.round((building.occupied / building.units) * 100)}%</span></div><div className="mini-track"><i style={{ width: `${(building.occupied / building.units) * 100}%` }} /></div></div></td><td><strong className="building-revenue">{building.monthlyRevenue}</strong></td><td><span className={`building-status ${building.tone}`}>{building.status}</span></td><td>{building.updatedAt}</td><td><button className="more-button" aria-label={`Options ${building.name}`}><Icons.MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div></section><div className="building-note"><Icons.Info size={15} /><span>La liste est aussi disponible sous le menu Immeubles pour un accès direct.</span><button className="text-button" onClick={() => onNavigate('dashboard')}>Retour au tableau de bord <Icons.ArrowUpRight size={14} /></button></div>
  </div>
}

function EventDashboard({ onNavigate }: { onNavigate: (key: ModuleKey) => void }) {
  return <div className="page-content event-dashboard"><section className="page-heading"><div><p className="eyebrow">Espace événementiel · Septembre 2026</p><h1>Tableau de bord événementiel</h1><p className="heading-copy">Suivez l’activité, les revenus et les disponibilités de vos deux espaces.</p></div><button className="primary-button" onClick={() => onNavigate('event-reservations')}><Icons.Plus size={17} /> Nouvelle réservation</button></section>
    <section className="event-kpis"><article className="event-kpi panel"><span className="kpi-icon gold"><Icons.CircleDollarSign size={18} /></span><div><small>Revenus du mois</small><strong>$ 11 090</strong><em><Icons.TrendingUp size={12} /> 18,4% vs août</em></div></article><article className="event-kpi panel"><span className="kpi-icon blue"><Icons.CalendarCheck2 size={18} /></span><div><small>Réservations confirmées</small><strong>19</strong><em><Icons.CheckCircle2 size={12} /> 4 cette semaine</em></div></article><article className="event-kpi panel"><span className="kpi-icon green"><Icons.BadgeDollarSign size={18} /></span><div><small>Montants encaissés</small><strong>$ 8 740</strong><em><Icons.TrendingUp size={12} /> 79% du facturé</em></div></article><article className="event-kpi panel"><span className="kpi-icon purple"><Icons.CalendarClock size={18} /></span><div><small>Prochaine disponibilité</small><strong>16 sept.</strong><em className="muted-kpi">Les deux espaces libres</em></div></article></section>
    <section className="event-main-grid"><article className="panel space-revenue-panel"><div className="panel-heading"><div><p className="eyebrow">Performance par espace</p><h2>Revenus mensuels</h2></div><button className="select-button">Septembre 2026 <Icons.ChevronDown size={14} /></button></div><div className="space-revenue-list">{eventSpaces.map((space) => <div className="space-revenue-row" key={space.name}><div className={`space-mark ${space.tone}`}><Icons.Building2 size={18} /></div><div className="space-revenue-info"><div><strong>{space.name}</strong><span>{space.reservations} réservations · {space.occupancy} occupé</span></div><b>{space.revenue}</b><div className="revenue-track"><i className={space.tone} style={{ width: space.tone === 'gold' ? '82%' : '67%' }} /></div></div></div>)}</div><div className="space-revenue-total"><span>Total des espaces</span><strong>$ 11 090</strong></div></article><article className="panel availability-panel"><div className="panel-heading"><div><p className="eyebrow">Planning</p><h2>Disponibilités</h2></div><button className="more-button" aria-label="Options du calendrier"><Icons.MoreHorizontal size={18} /></button></div><div className="calendar-nav"><button className="icon-button" aria-label="Mois précédent"><Icons.ChevronLeft size={16} /></button><strong>Septembre 2026</strong><button className="icon-button" aria-label="Mois suivant"><Icons.ChevronRight size={16} /></button></div><div className="calendar-grid"><div className="calendar-weekdays">{['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-days">{eventCalendar.map((item) => <span className={`calendar-day ${item.status}`} key={item.day}>{item.day}</span>)}</div></div><div className="calendar-legend"><span><i className="available-dot" /> Disponible</span><span><i className="partial-dot" /> Partiel</span><span><i className="booked-dot" /> Réservé</span></div></article></section>
    <section className="panel reservations-panel"><div className="panel-heading"><div><p className="eyebrow">Suivi des encaissements</p><h2>Réservations à venir</h2></div><button className="text-button" onClick={() => onNavigate('event-reservations')}>Voir toutes les réservations <Icons.ArrowUpRight size={15} /></button></div><div className="reservation-table-wrap"><table className="reservation-table"><thead><tr><th>Date</th><th>Événement</th><th>Espace</th><th>Client</th><th>Montant</th><th>Payé</th><th>Statut</th></tr></thead><tbody>{eventReservations.map((reservation) => <tr key={reservation.date + reservation.title}><td><strong>{reservation.date}</strong><span>{reservation.day}</span></td><td><strong>{reservation.title}</strong></td><td><span className="space-tag"><i className={reservation.tone} />{reservation.space}</span></td><td>{reservation.client}</td><td>{reservation.amount}</td><td className={reservation.paid === '$ 0' ? 'unpaid' : ''}>{reservation.paid}</td><td><span className={`status-pill ${reservation.tone}`}>{reservation.status}</span></td></tr>)}</tbody></table></div></section>
  </div>
}

export default function App() {
  // L'introduction est une animation d'accueil : elle ne doit jamais
  // empecher l'acces a l'application si le minuteur est etouffe par le navigateur.
  const [showIntro, setShowIntro] = useState(() => sessionStorage.getItem('sgci-intro-seen') !== 'true')
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('sgci-authenticated') === 'true')
  const [active, setActive] = useState<ModuleKey>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
  const [buildingsExpanded, setBuildingsExpanded] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => Object.fromEntries(navigation.map((group) => [group.label, group.label === 'Pilotage'])))
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sgci-theme') !== 'light')
  const [clients, setClients] = useState<RealEstateClient[]>(() => clientStorage.load() as RealEstateClient[] | null ?? initialRealEstateClients)
  const [categories, setCategories] = useState<Record<string, ApartmentCategory[]>>(() => categoryStorage.load() ?? JSON.parse(JSON.stringify(initialCategories)))
  const [buildingsList, setBuildingsList] = useState<BuildingRecord[]>(() => buildingStorage.load() as BuildingRecord[] | null ?? [...buildings])

  useEffect(() => { clientStorage.save(clients as unknown as StoredClient[]) }, [clients])
  useEffect(() => { categoryStorage.save(categories) }, [categories])
  useEffect(() => { buildingStorage.save(buildingsList as unknown as StoredBuilding[]) }, [buildingsList])

  useEffect(() => {
    setBuildingsList((prev) => {
      const next = prev.map((building) => {
        const cats = categories[building.id] ?? []
        const units = cats.reduce((sum, cat) => sum + cat.total, 0)
        const occupied = clients.filter((client) => client.buildingId === building.id).length
        return building.units === units && building.occupied === occupied ? building : { ...building, units, occupied }
      })
      return prev.every((building, index) => building === next[index]) ? prev : next
    })
  }, [categories, clients])

  const resetToDemoData = () => {
    if (!window.confirm('Réinitialiser toutes les données à leurs valeurs d’origine ? Cette action est irréversible.')) return
    clearAllRealEstateData()
    setClients(initialRealEstateClients)
    setCategories(JSON.parse(JSON.stringify(initialCategories)))
    setBuildingsList([...buildings])
    setSelectedBuilding(null)
  }

  useEffect(() => {
    const introTimer = window.setTimeout(() => { sessionStorage.setItem('sgci-intro-seen', 'true'); setShowIntro(false) }, 3000)
    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('sgci-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  if (showIntro) return <IntroScreen />
  if (!authenticated) return <LoginScreen onLogin={async () => { localStorage.setItem('sgci-authenticated', 'true'); setAuthenticated(true) }} />

  return <div className="app-shell"><Sidebar active={active} onNavigate={(key) => { setActive(key); if (key !== 'buildings') { setSelectedBuilding(null); setBuildingsExpanded(false) } }} onBuildingSelect={(id) => { setActive('buildings'); setSelectedBuilding(id || null) }} selectedBuilding={selectedBuilding} buildingsExpanded={buildingsExpanded} onToggleBuildings={() => setBuildingsExpanded((value) => !value)} expandedGroups={expandedGroups} onToggleGroup={(label) => setExpandedGroups((groups) => ({ ...groups, [label]: !groups[label] }))} open={sidebarOpen} onClose={() => setSidebarOpen(false)} buildingsList={buildingsList} categories={categories} /><main className="main-area"><Header onMenu={() => setSidebarOpen((value) => !value)} onSignOut={() => { demoAuth.signOut(); localStorage.removeItem('sgci-authenticated'); setAuthenticated(false) }} sidebarOpen={sidebarOpen} darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />{active === 'dashboard' ? <Dashboard onNavigate={setActive} onReset={resetToDemoData} buildingsList={buildingsList} clients={clients} categories={categories} /> : active === 'buildings' ? <BuildingsPage onNavigate={setActive} selectedBuilding={selectedBuilding} onBuildingSelect={(id) => setSelectedBuilding(id || null)} clients={clients} onClientsChange={setClients} categories={categories} onCategoriesChange={setCategories} buildingsList={buildingsList} onBuildingsChange={setBuildingsList} /> : active === 'events' ? <EventDashboard onNavigate={setActive} /> : <ModulePage module={active} onNavigate={setActive} />}</main></div>
}
