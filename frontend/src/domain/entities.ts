export interface Permission { id: string; resource: string; action: 'view' | 'create' | 'edit' | 'delete' | 'validate' }
export interface Role { id: string; name: string; permissions: Permission[] }
export interface User { id: string; name: string; email: string; roleId: string; depotIds: string[]; status: 'active' | 'inactive' }
export interface Immeuble { id: string; name: string; address: string; unitsCount: number; occupiedUnits: number; status: 'active' | 'maintenance' }
export interface Appartement { id: string; reference: string; immeubleId: string; status: 'occupied' | 'available' | 'maintenance'; clientId?: string }
export interface Client { id: string; name: string; phone: string; email: string; status: 'active' | 'inactive' }
export interface Contrat { id: string; clientId: string; appartementId: string; startDate: string; endDate: string; amount: number; status: 'active' | 'pending' | 'expired' }
export interface Paiement { id: string; contractId: string; amount: number; date: string; status: 'received' | 'pending' }
export interface Maintenance { id: string; title: string; immeubleId?: string; appartementId?: string; depotId?: string; status: 'requested' | 'in_progress' | 'completed' }
export interface Depense { id: string; label: string; amount: number; date: string; status: 'pending' | 'validated' }
export interface Depot { id: string; name: string; location: string; managerId?: string; status: 'active' | 'inactive' }
export interface Article { id: string; name: string; categoryId: string; sku: string; unit: string; minimumStock: number }
export interface Categorie { id: string; name: string }
export interface Emplacement { id: string; depotId: string; name: string }
export interface MouvementStock { id: string; depotId: string; articleId: string; type: 'entry' | 'exit' | 'transfer'; quantity: number; date: string }
export interface Fournisseur { id: string; name: string; phone: string; email: string }
export interface DemandeAchat { id: string; requesterId: string; status: 'draft' | 'submitted' | 'approved' | 'rejected' }
export interface BonCommande { id: string; supplierId: string; status: 'draft' | 'sent' | 'received' }
export interface Reception { id: string; orderId: string; depotId: string; date: string }
export interface Caisse { id: string; name: string; balance: number; currency: string }
export interface OperationCaisse { id: string; cashId: string; type: 'entry' | 'exit'; amount: number; validated: boolean; source: string; date: string }
export interface OperationComptable { id: string; sourceOperationId: string; type: 'revenue' | 'expense'; amount: number; validatedAt: string; activity: string }
export interface SecretariatDocument { id: string; title: string; category: string; ownerId: string; status: 'draft' | 'active' | 'archived'; updatedAt: string }
export interface Correspondance { id: string; reference: string; subject: string; direction: 'incoming' | 'outgoing'; contact: string; status: 'received' | 'processing' | 'closed'; date: string }
export interface Reunion { id: string; title: string; date: string; location: string; participantIds: string[]; status: 'planned' | 'completed' | 'cancelled' }
export type EventType = 'anniversary' | 'civil-wedding' | 'concert' | 'conference' | 'other'
export interface EventTypeDefinition { id: string; name: string; code: EventType; color: string; description?: string }
export interface EventVenue { id: string; name: string; address: string; capacity: number; amenities: string[]; status: 'available' | 'maintenance' }
export interface Evenement { id: string; title: string; typeId: string; venueId: string; organizer: string; startAt: string; endAt: string; status: 'draft' | 'confirmed' | 'completed' | 'cancelled' }
export interface ReservationEvenement { id: string; eventId: string; venueId: string; requester: string; startAt: string; endAt: string; status: 'pending' | 'confirmed' | 'rejected' }
