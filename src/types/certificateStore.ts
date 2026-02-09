export interface CertificateIds {
  internshipId?: string;
  industrialTrainingId?: string;
  participationId?: string;
}

export interface CertificateDetails {
  name: string;
  courseName: string;
  fromDate: string;
  toDate: string;
  qrCode?: string;
  certificateIds?: CertificateIds;
}


export interface CertificateStoreState {
  certificateDetails: CertificateDetails | null;

  setCertificateDetails: (data: CertificateDetails | null) => void;

  resetCertificate: () => void;
}
