import type { Permission, Role, User } from '../domain/entities'

export interface AuthSession { user: User; token: string }
export interface DemoAccount { email: string; password: string; user: User }

export interface AuthService {
  getSession(): Promise<AuthSession | null>
  signIn(email: string, password: string): Promise<AuthSession>
  signOut(): Promise<void>
}

export const demoAuth: AuthService = {
  async getSession() { return { user: demoUser, token: 'demo-session' } },
  async signIn(email: string, password: string) {
    if (email !== superAdminAccount.email || password !== superAdminAccount.password) throw new Error('Identifiants incorrects.')
    return { user: demoUser, token: 'demo-session' }
  },
  async signOut() { return Promise.resolve() },
}

const demoUser: User = {
  id: 'usr-001', name: 'Jean Vecko', email: 'superadmin@demo.com', roleId: 'role-super-admin', depotIds: ['depot-principal', 'depot-b'], status: 'active',
}

export const superAdminAccount: DemoAccount = {
  email: 'superadmin@demo.com', password: '11111111', user: demoUser,
}

export const superAdminRole: Role = {
  id: 'role-super-admin', name: 'Super administrateur', permissions: [
    'dashboard', 'immobilier', 'secretariat', 'logistique', 'achats', 'evenementiel', 'finances', 'administration',
  ].flatMap((resource): Permission[] => (['view', 'create', 'edit', 'delete', 'validate'] as Permission['action'][]).map((action) => ({ id: `${resource}-${action}`, resource, action }))),
}
