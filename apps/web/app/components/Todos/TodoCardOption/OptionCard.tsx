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
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import {setTodayCardColor, setUpcomingCardColor, toggleCardOption } from '../../../../lib/store/features/todos/todoSlice'



const OptionCard = () => {
  const items = [
    { text: 'Mark All', icon: <CheckCircledIcon /> },
    { text: 'Priority Sort', icon: <ActivityLogIcon /> },
    { text: 'Share', icon: <Link2Icon /> },
  ];
  const getDate = (value: string): {
    date: string | undefined,
    color: string
  } => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthNumber = months[new Date().getMonth()];
    let monthDate = new Date().getDate().toString();
    return {
      date: `${monthNumber} ${monthDate}`,
      color:value
    }
  }
  const handleValueChange = (value: string) => {
    const upcomingColorData = getDate(value);
    const colorPayload = [upcomingColorData, ...UpcomingCardColor];
    dispatch(setTodayCardColor(`${value}`));
    dispatch(setUpcomingCardColor(colorPayload));
    dispatch(toggleCardOption());
    
  };
  const dispatch = useAppDispatch();
  const {todayCardColor, UpcomingCardColor, todos} = useAppSelector(state => state.todo);
  
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
            <div 
              key={index}
              className='flex justify-between place-items-center mb-2' 
              onClick={() => handleOptions(item.text)}>
              <div>{item.text}</div>
              {item.icon}
            </div>
          ))}
        </CardContent>
        <CardFooter className='flex justify-between place-items-center'>
          <RadioGroup
            className='flex'
            defaultValue={todayCardColor}
            onValueChange={handleValueChange}>
            <RadioGroupItem value="C2D5C3" id="green" className='bg-[#C2D5C3] text-black'  />
            <RadioGroupItem value="D0DAFA" id="blue" className='bg-[#D0DAFA] text-black' />
            <RadioGroupItem value="E2AA96" id="pink" className='bg-[#E2AA96] text-black' />
            <RadioGroupItem value="ECDFAB" id="yellow" className='bg-[#ECDFAB] text-black' />
          </RadioGroup>
          <MagicWandIcon />
        </CardFooter>
      </Card>
    </section>
  )
}

export default OptionCard