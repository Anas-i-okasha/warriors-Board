export interface User {
  id?: number,
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export interface Login {
  email: string;
  password: string
}

export interface Task {
  title: string;
  description?: string;
  status: 'queue',
  is_deleted: boolean;
  userId: number
}

export interface SessionInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  is_deleted: boolean;
  created_at: string;
}

export interface JwtObject {
  userId: string
}
