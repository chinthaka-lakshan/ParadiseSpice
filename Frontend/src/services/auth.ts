import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  nic: string;
  mobile?: string;
  address?: string;
  status: string;
  roles: Array<{ name: string }>;
}

export interface LoginResponse {
  user: User;
  token: string;
  roles: string[];
}

export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await api.post('/login', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.roles.some((r: { name: string }) => r.name === role);
  },

  // Optional: Get user roles as array
  getUserRoles(): string[] {
    const user = this.getCurrentUser();
    if (!user) return [];
    return user.roles.map((r: { name: string }) => r.name);
  },
};
