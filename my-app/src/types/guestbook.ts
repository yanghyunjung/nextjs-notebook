export interface GuestbookMessage {
  _id?: string;
  id: string;
  name: string;
  message: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface GuestbookFormData {
  name: string;
  message: string;
} 