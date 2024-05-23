import React, { useState } from 'react'
import { Input } from '../../ui/input2'
import { Select } from '../../ui/select'
import PrioritySelect from '../../priority/PrioritySelect'
import { TimePickerDemo } from '../../TimePicker'
import { Button } from '../../ui/button'
import { ClockIcon } from "@radix-ui/react-icons";
import { useAppSelector } from '../../../../lib/store/hooks/hooks'


const EditTodoFunc = () => {
  
  // const [date, setDate] = useState<Date | undefined>(new Date());
  const {editPayload} = useAppSelector(state => state.todo);
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <Input
          className='border-white '
          placeholder='Edit your todo'
          name='edittodo'
          type='text'
          defaultValue={`${editPayload?.todo}`}/>
        <div className='flex place-items-center gap-1'>
          <div>
            <PrioritySelect/>
          </div>
          <Button 
            className='flex justify-between gap-1'
            onClick={() => alert("remind me")}>
            <div>
              <span>Reminder </span>
            </div>
            <div>
              <ClockIcon/>
            </div>
          </Button>
        </div> 
      </div>
    </div>
  )
}

export default EditTodoFunc