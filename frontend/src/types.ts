export type IconName =
  | 'layout-dashboard' | 'building-2' | 'door-open' | 'users' | 'file-text' | 'credit-card'
  | 'wrench' | 'warehouse' | 'boxes' | 'arrow-left-right' | 'clipboard-list' | 'truck'
  | 'shopping-cart' | 'landmark' | 'book-open' | 'bar-chart-3' | 'user-cog' | 'shield-check'
  | 'settings' | 'scroll-text' | 'calendar-days' | 'calendar-check-2' | 'mail' | 'folder-open'
  | 'contact' | 'party-popper' | 'calendar-range' | 'map-pinned' | 'ticket' | 'briefcase-business'
  | 'user-round-check' | 'clock-3' | 'calendar-off' | 'wallet-cards' | 'graduation-cap' | 'clipboard-check'

export type ModuleKey = 'logistics' | 'warehouse' | 'depots' | 'articles' | 'movements' | 'inventory' | 'requests' | 'suppliers' | 'orders' | 'receipts' | 'events' | 'event-reservations' | 'event-types' | 'event-calendar' | 'event-venues'

export interface NavigationItem { label: string; key: ModuleKey; icon: IconName; badge?: string }
