import React from 'react'
import EditTodoCard from './EditTodoCard'

interface Payload {
  id: string,
  todo: string
}
const EditTodo = () => {
  return (
    <section>
      <EditTodoCard/>
    </section>
  )
}

export default EditTodo