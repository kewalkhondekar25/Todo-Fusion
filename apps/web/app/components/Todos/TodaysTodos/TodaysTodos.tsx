import React from 'react'
import { getAllTodos } from '@repo/db'
import { TodaysTodoCheckBox } from '../../checkboxes/CheckBoxes';

const TodaysTodos = async () => {
  const todos = await getAllTodos();
  return (
    <>
      {/* <div id="todo-count" data-count={todos.length}></div> */}
      {
        todos.map(item => {
          return (
            <div key={item.id}>
              {/* <TodaysTodoCheckBox value={item.todo}/> */}
              <span>{item.todo}</span>
            </div>
          )
        })
      }
    </>
  )
}

export default TodaysTodos