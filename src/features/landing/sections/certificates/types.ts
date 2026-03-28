export interface Certificate {
  id: string;
  name: string;
  logo: string;
  alt: string;
  label?: string;
  description?: string;
}

export interface CertificatesProps {
  certificates: Certificate[];
}
