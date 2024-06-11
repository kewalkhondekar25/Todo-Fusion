import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  Cross1Icon,
  CheckCircledIcon,
  ActivityLogIcon,
  Link2Icon,
  MagicWandIcon
} from '@radix-ui/react-icons'
import { Label } from "../../ui/label2"
import { RadioGroup, RadioGroupItem } from "../../ui/radio"
import { useAppDispatch } from '../../../../lib/store/hooks/hooks'
import { toggleCardOption } from '../../../../lib/store/features/todos/todoSlice'



const OptionCard = () => {
  const items = [
    { text: 'Mark All', icon: <CheckCircledIcon /> },
    { text: 'Priority Sort', icon: <ActivityLogIcon /> },
    { text: 'Share', icon: <Link2Icon /> },
  ];
  const handleValueChange = (value: string) => {
    alert(`Selected value: ${value}`);
  };
  const dispatch = useAppDispatch();
  return (
    <section>
      <Card className="relative w-48 bg-[#383838] border-[#525252]">
        <CardHeader>
          <div onClick={() => dispatch(toggleCardOption())}>
            <Cross1Icon className='absolute top-2 right-2 cursor-pointer' />
          </div>
        </CardHeader>
        <CardContent className='text-sm cursor-pointer'>
          {items.map((item, index) => (
            <div className='flex justify-between place-items-center mb-2' key={index}>
              <div>{item.text}</div>
              {item.icon}
            </div>
          ))}
        </CardContent>
        <CardFooter className='flex justify-between place-items-center'>
          <RadioGroup
            className='flex'
            defaultValue="default"
            onValueChange={handleValueChange}>
            <RadioGroupItem value="default" id="default" />
            <RadioGroupItem value="blue" id="blue" className='bg-[#D0DAFA] text-black' />
            <RadioGroupItem value="pink" id="pink" className='bg-[#E2AA96] text-black' />
            <RadioGroupItem value="yellow" id="yellow" className='bg-[#ECDFAB] text-black' />
          </RadioGroup>
          <MagicWandIcon />
        </CardFooter>
      </Card>
    </section>
  )
}

export default OptionCard