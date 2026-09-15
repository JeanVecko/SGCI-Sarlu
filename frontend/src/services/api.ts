export interface ApiClient {
  get<T>(resource: string): Promise<T>
  post<T>(resource: string, payload: unknown): Promise<T>
}

export const demoApi: ApiClient = {
  async get<T>(_resource: string) { return [] as T },
  async post<T>(_resource: string, payload: unknown) { return payload as T },
}
