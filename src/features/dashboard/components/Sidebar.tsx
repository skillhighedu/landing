
import MiniSidebar from './sidebar/MiniSidebar'
import { useParams } from 'react-router-dom'

export default function Sidebar() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <MiniSidebar slug={slug!}/>
  )
}
