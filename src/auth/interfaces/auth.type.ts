export interface UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  disabledAt: Date | undefined;
}
