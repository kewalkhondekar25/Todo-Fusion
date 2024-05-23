import React from 'react'
import EditTodoCard from './EditTodoCard'

interface Payload {
  id: string,
  todo: string
}
const EditTodo = () => {
  return (
    <section className='absolute top-20 left-40'>
      <EditTodoCard/>
    </section>
  )
}

export default EditTodo