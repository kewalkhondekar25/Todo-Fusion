
import React from 'react'
import { fetchTodos } from '../../../lib/server/todos/action'
import TodaysTodos from '../../components/Todos/TodaysTodos/TodaysTodos';

const page = async () => {
  const todos = await fetchTodos();
  return (
    <div className='flex justify-center place-items-center'>
      <TodaysTodos/>
    </div>
  )
}

export default page