export type IconName =
  | 'layout-dashboard' | 'building-2' | 'door-open' | 'users' | 'file-text' | 'credit-card'
  | 'wrench' | 'warehouse' | 'boxes' | 'arrow-left-right' | 'clipboard-list' | 'truck'
  | 'shopping-cart' | 'landmark' | 'book-open' | 'bar-chart-3' | 'user-cog' | 'shield-check'
  | 'settings' | 'scroll-text' | 'calendar-days' | 'calendar-check-2' | 'mail' | 'folder-open'
  | 'contact' | 'party-popper' | 'calendar-range' | 'map-pinned' | 'ticket' | 'briefcase-business'
  | 'user-round-check' | 'clock-3' | 'calendar-off' | 'wallet-cards' | 'graduation-cap' | 'clipboard-check'

export type ModuleKey = 'dashboard' | 'buildings' | 'units' | 'clients' | 'contracts' | 'payments' | 'maintenance' | 'logistics' | 'warehouse' | 'depots' | 'articles' | 'movements' | 'inventory' | 'purchases' | 'requests' | 'suppliers' | 'orders' | 'receipts' | 'cash' | 'accounting' | 'reports' | 'secretariat' | 'secretariat-documents' | 'secretariat-correspondence' | 'secretariat-meetings' | 'events' | 'event-reservations' | 'event-types' | 'event-calendar' | 'event-venues' | 'hr' | 'hr-employees' | 'hr-attendance' | 'hr-leave' | 'hr-payroll' | 'hr-recruitment' | 'hr-evaluations' | 'users' | 'roles' | 'settings' | 'activity'

export interface NavigationItem { label: string; key: ModuleKey; icon: IconName; badge?: string }
export interface StatCard { label: string; value: string; change: string; trend: 'up' | 'down' | 'neutral'; tone: 'gold' | 'blue' | 'green' | 'red' }
export interface RecentActivity { title: string; detail: string; time: string; initials: string; tone: string }
