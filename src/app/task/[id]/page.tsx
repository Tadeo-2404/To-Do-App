"use client"
import Todos from '@/src/components/Todos';
import { useParams } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const { id } = params;
  const valor = searchParams.get('value');
  console.log(valor)
  console.log(id)

  return (
    <div>
      <h1><span></span> {id}</h1>
      <Todos attribute={id} value={valor} title={"Mis tareas"} limit={null} addBtn={false} />
    </div>
  )
}

export default Page
