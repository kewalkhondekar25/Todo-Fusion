
import React from 'react'
import TodaysTodos from '../../components/Todos/TodaysTodos/TodaysTodos';
import UpcomingTodos from '../../components/Todos/UpcomingTodos/UpcomingTodos';

const page = async () => {
  return (
    <div>
      <UpcomingTodos/>
    </div>
  )
}

export default page