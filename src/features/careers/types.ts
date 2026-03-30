export interface CareerJob {
  id: string;
  roleName: string;
  location: string;
  type: string;
  experience: string;
  jobDescription: string;
  responsibilities: string[];
  requirements: string[];
  applicationLink: string;
}

export interface BackendCareerJob {
  id: string;
  roleName?: string | null;
  location?: string | null;
  type?: string | null;
  experience?: string | null;
  jobDescription?: string | null;
  responsibilities?: string[] | string | null;
  requirements?: string[] | string | null;
  applicationLink?: string | null;
}
