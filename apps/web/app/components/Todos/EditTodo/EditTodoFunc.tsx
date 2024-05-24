import React, { useState } from 'react'
import { Input } from '../../ui/input2'
import { Select } from '../../ui/select'
import PrioritySelect from '../../priority/PrioritySelect'
import { TimePickerDemo } from '../../TimePicker'
import { Button } from '../../ui/button'
import { ClockIcon } from "@radix-ui/react-icons";
import { useAppSelector } from '../../../../lib/store/hooks/hooks'
import TimePicker from '../../TimePicker/TimePicker'
import { Label } from '../../ui/label2'


const EditTodoFunc = () => {

  // const [date, setDate] = useState<Date | undefined>(new Date());
  const { editPayload } = useAppSelector(state => state.todo);
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <Label>Enter Your Edited Todo</Label>
        <Input
          autoFocus
          className='border-white '
          placeholder='Edit your todo'
          name='edittodo'
          type='text'
          defaultValue={`${editPayload?.todo}`}
        />
        <div className='flex justify-center place-items-center gap-1'>
          <div>
            <Label>Edit Priority</Label>
            <PrioritySelect />
          </div>
          <div>
            <Label className='flex gap-1 mt-1'> 
              <div>Reminder</div>
              <ClockIcon />
            </Label>
            <div className='mt-1'>
            <TimePicker />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTodoFunc