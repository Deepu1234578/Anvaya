import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

export async function loginUser(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/api/auth/login`,
    data
  );

  return response.data;
}

export async function getCurrentUser(
  token: string
): Promise<User> {
  const response = await axios.get<User>(
    `${API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}