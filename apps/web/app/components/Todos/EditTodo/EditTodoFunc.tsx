import React from 'react'
import { Input } from '../../ui/input2'
import { ClockIcon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import TimePicker from '../../TimePicker/EditTodoTimePicker'
import { Label } from '../../ui/label2'
import EditTodoPrioritySelect from '../../priority/EditTodoPrioritySelect'
import { setEditValues, } from '../../../../lib/store/features/todos/todoSlice';
import EditTodoTimePicker from '../../TimePicker/EditTodoTimePicker';


const EditTodoFunc = () => {

  const { editPayload, editValues } = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className='flex flex-col gap-2'>
          <Label>Enter Your Edited Todo</Label>
          <Input
            autoFocus
            className='border-white '
            placeholder='Edit your todo'
            name='editTodo'
            type='text'
            defaultValue={`${editPayload?.todo}`}
            onChange={(e) => dispatch(setEditValues({...editValues, todo: e.target.value}))}
          />
          <div className='flex justify-center place-items-center gap-1'>
            <div>
              <Label>Edit Priority</Label>
              <EditTodoPrioritySelect/>
            </div>
            <div>
              <Label className='flex gap-1 mt-1'>
                <div>Reminder</div>
                <ClockIcon />
              </Label>
              <div className='mt-1'>
                <EditTodoTimePicker/>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default EditTodoFunc