
import Certificates from './components/Certificates.container'
import { certificates } from './data'

export default function certifcates() {
  return (
    <Certificates certificates={certificates}/>
  )
}
