import { useEffect, useState, type FormEvent } from 'react'
import * as Icons from 'lucide-react'
import { eventCalendar, eventReservations, eventSpaces, moduleMeta, navigation } from './data'
import { demoAuth } from './services/auth'
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

function Sidebar({ active, onNavigate, expandedGroups, onToggleGroup, open, onClose }: { active: ModuleKey; onNavigate: (key: ModuleKey) => void; expandedGroups: Record<string, boolean>; onToggleGroup: (label: string) => void; open: boolean; onClose: () => void }) {
  return <>
    <div className={`sidebar-overlay ${open ? 'visible' : ''}`} onClick={onClose} />
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-top"><Brand /><button className="icon-button sidebar-close" onClick={onClose} aria-label="Fermer le menu"><Icons.X size={18} /></button></div>
      <div className="workspace-switcher"><div className="workspace-mark">S</div><div><strong>SGCI SARLU</strong><span>Organisation principale</span></div><Icons.ChevronsUpDown size={15} /></div>
      <nav className="nav-scroll">
        {navigation.map((group) => { const groupExpanded = expandedGroups[group.label] ?? true; return <div className="nav-group" key={group.label}><button type="button" className={`nav-label nav-group-toggle ${groupExpanded ? 'expanded' : ''}`} onClick={() => onToggleGroup(group.label)}><span>{group.label}</span><Icons.ChevronDown size={13} /></button>{groupExpanded && group.items.map((item) => { const Icon = iconMap[item.icon]; return <button className={`nav-item ${active === item.key ? 'active' : ''}`} key={item.key} onClick={() => { onNavigate(item.key); onClose() }}><Icon size={17} strokeWidth={active === item.key ? 2.3 : 1.8} /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button> })}</div> })}
      </nav>
      <div className="sidebar-footer"><div className="support-card"><span className="support-icon"><Icons.LifeBuoy size={16} /></span><div><strong>Besoin d'aide ?</strong><span>Consulter le centre d'aide</span></div><Icons.ArrowUpRight size={15} /></div><div className="sidebar-version">SGCI Pilot <span>v0.1.0</span></div></div>
    </aside>
  </>
}

function Header({ onMenu, onSignOut, sidebarOpen, darkMode, onToggleTheme }: { onMenu: () => void; onSignOut: () => void; sidebarOpen: boolean; darkMode: boolean; onToggleTheme: () => void }) {
  return <header className="topbar"><button className="icon-button menu-button" onClick={onMenu} aria-label={sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>{sidebarOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}</button><div className="breadcrumb"><span>SGCI Pilot</span><Icons.ChevronRight size={14} /><strong>Espace événementiel</strong></div><div className="topbar-actions"><label className="search"><Icons.Search size={17} /><input placeholder="Rechercher..." /><kbd>⌘ K</kbd></label><button className="theme-toggle" onClick={onToggleTheme} aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode nuit'} title={darkMode ? 'Mode clair' : 'Mode nuit'}>{darkMode ? <Icons.Sun size={17} /> : <Icons.Moon size={17} />}</button><button className="icon-button notification" aria-label="Notifications"><Icons.Bell size={19} /><i /></button><div className="profile"><div className="avatar">JV</div><div className="profile-text"><strong>Jean Vecko</strong><span>Super administrateur</span></div><Icons.ChevronDown size={15} /></div><button className="sign-out-button" onClick={onSignOut} aria-label="Se déconnecter" title="Se déconnecter"><Icons.LogOut size={16} /><span>Déconnexion</span></button></div></header>
}

function ModulePage({ module, onNavigate }: { module: ModuleKey; onNavigate: (key: ModuleKey) => void }) {
  const meta = moduleMeta[module] ?? { eyebrow: 'SGCI Pilot', title: 'Module', description: 'Ce module est en cours de configuration.' }
  const Icon = iconMap[navigation.flatMap((group) => group.items).find((item) => item.key === module)?.icon ?? 'layout-dashboard']
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Tous les statuts')
  const [statusOpen, setStatusOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const statuses = ['Tous les statuts', 'Actif', 'En attente', 'Archivé']

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

  return <div className="page-content module-page"><section className="page-heading"><div><p className="eyebrow">{meta.eyebrow}</p><h1>{meta.title}</h1><p className="heading-copy">{meta.description}</p></div><button type="button" className="primary-button" onClick={() => { setNotice(`La création d'une entrée « ${meta.title} » sera reliée à l'API.`); window.setTimeout(() => setNotice(''), 4000) }}><Icons.Plus size={17} /> Nouvelle entrée</button></section><div className="module-toolbar"><label className="table-search"><Icons.Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Rechercher dans ${meta.title.toLowerCase()}...`} /></label><div className="status-filter"><button type="button" className="filter-button" onClick={() => setStatusOpen((value) => !value)} aria-expanded={statusOpen}><Icons.SlidersHorizontal size={16} /> Filtres <span>{activeFilters}</span></button>{statusOpen && <div className="status-menu"><p className="status-menu-title">Statut</p>{statuses.map((item) => <button type="button" key={item} className={item === status ? 'selected' : ''} onClick={() => { setStatus(item); setStatusOpen(false) }}>{item === status && <Icons.Check size={13} />}{item}</button>)}</div>}</div><button type="button" className="filter-button" onClick={exportCsv}><Icons.Download size={16} /> Exporter</button>{criteria.length > 0 && <button type="button" className="filter-button" onClick={resetFilters}><Icons.X size={14} /> Réinitialiser</button>}</div>{notice && <p className="module-notice"><Icons.Info size={14} /> {notice}</p>}{criteria.length > 0 && <p className="module-criteria"><Icons.Filter size={13} /> Critères actifs : {criteria.join(' · ')}</p>}<section className="module-empty panel"><div className="empty-icon"><Icon size={25} /></div><h2>Votre espace {meta.title.toLowerCase()}</h2><p>Cette vue est prête à accueillir vos données et vos workflows. La structure est en place pour connecter votre API et enrichir ce module progressivement.</p><button className="secondary-button" onClick={() => onNavigate('events')}><Icons.ArrowLeft size={16} /> Retour aux événements</button></section></div>
}

function parseAmount(str: string): number {
  return Number(str.replace(/[^0-9]/g, ''))
}

function formatAmount(amount: number): string {
  return `$ ${new Intl.NumberFormat('fr-FR').format(Math.round(amount))}`
}

function EventDashboard({ onNavigate }: { onNavigate: (key: ModuleKey) => void }) {
  const totalSpaceRevenue = eventSpaces.reduce((sum, space) => sum + parseAmount(space.revenue), 0)
  const totalSpaceReservations = eventSpaces.reduce((sum, space) => sum + space.reservations, 0)
  const totalCollected = eventReservations.reduce((sum, r) => sum + parseAmount(r.paid), 0)
  const totalBilled = eventReservations.reduce((sum, r) => sum + parseAmount(r.amount), 0)
  const collectionRate = totalBilled ? Math.round((totalCollected / totalBilled) * 100) : 0

  return <div className="page-content event-dashboard"><section className="page-heading"><div><p className="eyebrow">Espace événementiel · Septembre 2026</p><h1>Tableau de bord événementiel</h1><p className="heading-copy">Suivez l'activité, les revenus et les disponibilités de vos deux espaces.</p></div><button className="primary-button" onClick={() => onNavigate('event-reservations')}><Icons.Plus size={17} /> Nouvelle réservation</button></section>
    <section className="event-kpis"><article className="event-kpi panel"><span className="kpi-icon gold"><Icons.CircleDollarSign size={18} /></span><div><small>Revenus du mois</small><strong>{formatAmount(totalSpaceRevenue)}</strong><em><Icons.TrendingUp size={12} /> {totalSpaceReservations} réservations</em></div></article><article className="event-kpi panel"><span className="kpi-icon blue"><Icons.CalendarCheck2 size={18} /></span><div><small>Réservations confirmées</small><strong>{totalSpaceReservations}</strong><em><Icons.CheckCircle2 size={12} /> {eventReservations.length} à venir</em></div></article><article className="event-kpi panel"><span className="kpi-icon green"><Icons.BadgeDollarSign size={18} /></span><div><small>Montants encaissés</small><strong>{formatAmount(totalCollected)}</strong><em><Icons.TrendingUp size={12} /> {collectionRate}% du facturé</em></div></article><article className="event-kpi panel"><span className="kpi-icon purple"><Icons.CalendarClock size={18} /></span><div><small>Prochaine disponibilité</small><strong>16 sept.</strong><em className="muted-kpi">Les deux espaces libres</em></div></article></section>
    <section className="event-main-grid"><article className="panel space-revenue-panel"><div className="panel-heading"><div><p className="eyebrow">Performance par espace</p><h2>Revenus mensuels</h2></div><button className="select-button">Septembre 2026 <Icons.ChevronDown size={14} /></button></div><div className="space-revenue-list">{eventSpaces.map((space) => <div className="space-revenue-row" key={space.name}><div className={`space-mark ${space.tone}`}><Icons.Building2 size={18} /></div><div className="space-revenue-info"><div><strong>{space.name}</strong><span>{space.reservations} réservations · {space.occupancy} occupé</span></div><b>{space.revenue}</b><div className="revenue-track"><i className={space.tone} style={{ width: space.tone === 'gold' ? '82%' : '67%' }} /></div></div></div>)}</div><div className="space-revenue-total"><span>Total des espaces</span><strong>{formatAmount(totalSpaceRevenue)}</strong></div></article><article className="panel availability-panel"><div className="panel-heading"><div><p className="eyebrow">Planning</p><h2>Disponibilités</h2></div><button className="more-button" aria-label="Options du calendrier"><Icons.MoreHorizontal size={18} /></button></div><div className="calendar-nav"><button className="icon-button" aria-label="Mois précédent"><Icons.ChevronLeft size={16} /></button><strong>Septembre 2026</strong><button className="icon-button" aria-label="Mois suivant"><Icons.ChevronRight size={16} /></button></div><div className="calendar-grid"><div className="calendar-weekdays">{['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-days">{eventCalendar.map((item) => <span className={`calendar-day ${item.status}`} key={item.day}>{item.day}</span>)}</div></div><div className="calendar-legend"><span><i className="available-dot" /> Disponible</span><span><i className="partial-dot" /> Partiel</span><span><i className="booked-dot" /> Réservé</span></div></article></section>
    <section className="panel reservations-panel"><div className="panel-heading"><div><p className="eyebrow">Suivi des encaissements</p><h2>Réservations à venir</h2></div><button className="text-button" onClick={() => onNavigate('event-reservations')}>Voir toutes les réservations <Icons.ArrowUpRight size={15} /></button></div><div className="reservation-table-wrap"><table className="reservation-table"><thead><tr><th>Date</th><th>Événement</th><th>Espace</th><th>Client</th><th>Montant</th><th>Payé</th><th>Statut</th></tr></thead><tbody>{eventReservations.map((reservation) => <tr key={reservation.date + reservation.title}><td><strong>{reservation.date}</strong><span>{reservation.day}</span></td><td><strong>{reservation.title}</strong></td><td><span className="space-tag"><i className={reservation.tone} />{reservation.space}</span></td><td>{reservation.client}</td><td>{reservation.amount}</td><td className={reservation.paid === '$ 0' ? 'unpaid' : ''}>{reservation.paid}</td><td><span className={`status-pill ${reservation.tone}`}>{reservation.status}</span></td></tr>)}</tbody></table></div></section>
  </div>
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => sessionStorage.getItem('sgci-intro-seen') !== 'true')
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('sgci-authenticated') === 'true')
  const [active, setActive] = useState<ModuleKey>('events')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => Object.fromEntries(navigation.map((group) => [group.label, group.label === 'Logistique'])))
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sgci-theme') !== 'light')

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

  return <div className="app-shell"><Sidebar active={active} onNavigate={(key) => { setActive(key) }} expandedGroups={expandedGroups} onToggleGroup={(label) => setExpandedGroups((groups) => ({ ...groups, [label]: !groups[label] }))} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="main-area"><Header onMenu={() => setSidebarOpen((value) => !value)} onSignOut={() => { demoAuth.signOut(); localStorage.removeItem('sgci-authenticated'); setAuthenticated(false) }} sidebarOpen={sidebarOpen} darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />{active === 'events' ? <EventDashboard onNavigate={setActive} /> : <ModulePage module={active} onNavigate={setActive} />}</main></div>
}
