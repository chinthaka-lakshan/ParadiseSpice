import api from './api';

export interface CreateUserData {
  name: string;
  email: string;
  nic: string;
  mobile?: string;
  address?: string;
  commission_rate?: string;
  commission_amount?: string;
  password: string;
  role: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  nic: string;
  mobile?: string;
  address?: string;
  commission_rate: string;
  commission_amount: string;
  status: string;
  roles: Array<{ id: number; name: string }>;
}

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(data: CreateUserData): Promise<User> {
    const response = await api.post('/users', data);
    return response.data.user;
  },

  async updateUser(id: number, data: Partial<CreateUserData>): Promise<User> {
    const response = await api.put(`/users/${id}`, data);
    return response.data.user;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
