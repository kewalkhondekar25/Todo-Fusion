import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks/hooks"
import { setEditValues } from '../../../lib/store/features/todos/todoSlice'

const EditTodoTimePicker = () => {
  
  const {editValues, editPayload} = useAppSelector(state => state.todo)
  const dispatch = useAppDispatch()
  
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours[i] = String(i).padStart(2, '0');
  }
  console.log(hours);
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes[i] = String(i).padStart(2, '0');
  }
  console.log(minutes);

  return (
    <div className=' text-[#F8FAFC] group'>
      <div className='flex gap-1'>
        <div>
          <Select name='hours' 
          onValueChange={e => dispatch(setEditValues({...editValues, hours: e}))}
          defaultValue={`${editPayload?.hours}`}>
            <SelectTrigger className="border-white">
              <SelectValue placeholder="00" />
            </SelectTrigger>
            <SelectContent className="bg-[#525252]">
              {
                hours.map((item, i) => {
                  return (
                    <SelectItem key={i} value={`${item}`}>{item}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select name='minutes' 
          onValueChange={e => dispatch(setEditValues({...editValues, minutes: e}))}
          defaultValue={`${editPayload?.minutes}`}>
            <SelectTrigger className="border-white">
              <SelectValue placeholder="00" />
            </SelectTrigger>
            <SelectContent className="bg-[#525252]">
              {
                minutes.map((item, i) => {
                  return (
                    <SelectItem key={i} value={`${item}`}>{item}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <div className='hidden group-hover:block'>boo</div> */}
    </div>
  )
}

export default EditTodoTimePicker