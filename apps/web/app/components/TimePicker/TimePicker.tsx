import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Label } from '../ui/label2';


const TimePicker = () => {
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
          <Select>
            <SelectTrigger className="border-white">
              <SelectValue placeholder="00" />
            </SelectTrigger>
            <SelectContent className="bg-[#525252]">
              {
                hours.map((item, i) => {
                  return (
                    <SelectItem className='' key={i} value={`${item}`}>{item}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
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

export default TimePicker