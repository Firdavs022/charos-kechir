export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  date?: string;
  badge?: string;
  image?: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  claimed: boolean;
}

export interface CustomSettings {
  partnerName: string;
  senderName: string;
  customLetter?: string;
  anniversaryDate?: string;
}
