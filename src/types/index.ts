export interface User {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatar: string;
  role: string;
}

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
