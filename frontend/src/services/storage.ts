const CLIENTS_KEY = 'sgci-clients'
const CATEGORIES_KEY = 'sgci-categories'
const BUILDINGS_KEY = 'sgci-buildings'

export type StoredContractFile = { name: string; size: number; type: string }

export type StoredClient = {
  id: string
  buildingId: string
  categoryId: string
  name: string
  apartmentNumber: string
  monthlyAmount: number
  guaranteePaid: number
  dueDate: string
  contract?: StoredContractFile
}

export type StoredCategory = {
  id: string
  label: string
  bedrooms: number
  monthlyAmount: number
  guaranteeAmount: number
  total: number
  occupied: number
  tone: 'gold' | 'blue' | 'green' | 'purple'
}

export type StoredBuilding = {
  id: string
  name: string
  address: string
  city: string
  units: number
  occupied: number
  monthlyRevenue: string
  status: 'Actif' | 'Maintenance'
  updatedAt: string
  tone: 'gold' | 'blue' | 'green' | 'purple' | string
}

interface StorageEntry<T> {
  load(): T | null
  save(value: T): void
  clear(): void
}

function createStorage<T>(key: string): StorageEntry<T> {
  return {
    load(): T | null {
      try {
        const raw = localStorage.getItem(key)
        if (!raw) return null
        return JSON.parse(raw) as T
      } catch {
        return null
      }
    },
    save(value: T): void {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // ignore quota errors
      }
    },
    clear(): void {
      localStorage.removeItem(key)
    },
  }
}

export const clientStorage = createStorage<StoredClient[]>(CLIENTS_KEY)
export const categoryStorage = createStorage<Record<string, StoredCategory[]>>(CATEGORIES_KEY)
export const buildingStorage = createStorage<StoredBuilding[]>(BUILDINGS_KEY)

export function clearAllRealEstateData(): void {
  clientStorage.clear()
  categoryStorage.clear()
  buildingStorage.clear()
}
