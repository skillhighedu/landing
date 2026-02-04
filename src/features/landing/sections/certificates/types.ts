export interface Certificate {
  id: string;
  name: string;
  logo: string;
  alt: string;
}

export interface CertificatesProps {
  certificates: Certificate[];
}
