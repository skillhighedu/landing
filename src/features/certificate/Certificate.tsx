
import DashboardLayout from '../dashboard/layout/DashboardLayout'
import CertficateGenerator from './components/CertificateGenerator'

export default function Certificate() {
  return (
    <DashboardLayout title='Certificates'>
      <CertficateGenerator/>
    </DashboardLayout>
  )
}
