export type LeadCategory = "EXISTING" | "NEWSTUDENT";

export interface ContactUsDetails {
  name: string;
  email: string;
  phone: string;
  message: string;
  category: LeadCategory;
}

export interface ContactLead extends ContactUsDetails {
  id: string;
  read: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}
