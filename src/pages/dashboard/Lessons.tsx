import { useLessons } from '@/hooks/tanstack/useCourses'

import { useParams } from 'react-router-dom';

export default function Lessons() {
      const { slug } = useParams<{ slug: string }>();
if (slug) {
 const {data} = useLessons(slug)
 console.log("hey",data?.topics)
}
  return (
    <div>Lessons</div>
  )
}
