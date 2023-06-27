"use client"
import Todos from '@/src/components/Todos';
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams()
  const { id } = params;

  return (
    <div>
      <h1><span>categoria</span> {id}</h1>
      <Todos attribute={"category"} value={id} title={id} limit={"3"} addBtn={false} />
    </div>
  )
}

export default page