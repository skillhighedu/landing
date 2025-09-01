export type StudentCategory = "  EXISTING" | "NEWSTUDENT" ;

export interface ContactUsDetails {
  name: string;
  email: string;
  phone: string;
  interestedDomain?: string;
  message: string;
  category?: StudentCategory;
  
}
