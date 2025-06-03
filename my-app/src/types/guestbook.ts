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

export interface GuestbookEntry {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface GuestbookResponse {
  success: boolean;
  data?: GuestbookEntry[];
  error?: string;
}

export interface GuestbookStatus {
  total: number;
  lastUpdated: string;
} 