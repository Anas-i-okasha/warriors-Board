export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'queue',
    is_deleted: boolean;
    user_id: number
}
