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
  MagicWandIcon,
  CursorArrowIcon
} from '@radix-ui/react-icons'
import { Label } from "../../ui/label2"
import { RadioGroup, RadioGroupItem } from "../../ui/radio"
import { useAppDispatch, useAppSelector } from '../../../../lib/store/hooks/hooks'
import {
  setAddedTodoStatus, 
  setPrioritySort, 
  setTodayCardColor, 
  setTodayPrioritySort, 
  setUpcomingCardColor, 
  toggleCardOption
} from '../../../../lib/store/features/todos/todoSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'

const OptionCard = () => {
  
  const pathName = usePathname()
  console.log(pathName);
  
  const items = [
    { text: 'Mark All', icon: <CheckCircledIcon /> },
    { text: 'Priority Sort', icon: <ActivityLogIcon /> },
    { text: 'Share', icon: <Link2Icon /> },
  ];

  const dispatch = useAppDispatch();
  const {
    todayCardColor, 
    UpcomingCardColor, 
    todos,
    UpcomingAllCmpltTodo,
    isPrioritySorted,
    isTodayPrioritySorted
  } = useAppSelector(state => state.todo);

  const yetToComplete = todos.filter(item => !item.isCompleted ).map(item => item.id);
  const yetToCmpltUpcomingTodos = UpcomingAllCmpltTodo.filter(item => !item.isCompleted).map(item => item.id);
  console.log(yetToCmpltUpcomingTodos);
  
  
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
  const handleOptions = async (menu: string) => {
    try {
      const todoIds = pathName === "/today" ? yetToComplete : yetToCmpltUpcomingTodos;
      if (menu === "Mark All") {
        const response = await axios.post("/api/completealltodos", { payload: todoIds });
        const result = response.data;
        if (result) {
          dispatch(setAddedTodoStatus(`${yetToCmpltUpcomingTodos}`));
          dispatch(toggleCardOption());
          toast("Mission accomplished⛳! All todos completed!", {
            description: "You’ve finished all your tasks. Well done!🎉"
          });
        }
      }
      else if(pathName === "/upcoming" && menu === "Priority Sort"){
        console.log("sort");
        dispatch(setPrioritySort());
        dispatch(toggleCardOption());
        isPrioritySorted ? toast("Todos sorted 🃏") : toast("Todos sorted", {
          description: "High Priority🔝"
        })
      }else if(pathName === "/today" && menu === "Priority Sort"){
        console.log("today sort");
        dispatch(setTodayPrioritySort());
        dispatch(toggleCardOption());
        isTodayPrioritySorted ? toast("Todos sorted 🃏") : toast("Todos sorted", {
          description: "High Priority🔝"
        })
      }
    } catch (error) {
      console.error('Error updating todos:', error);
    }
  };
  
  
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
              className='flex justify-between place-items-center mb-2 group' 
              onClick={() => handleOptions(item.text)}>
              <div>{item.text}</div>
              <div className="group-hover:text-yellow-500">{item.icon}</div>
            </div>
          ))}
        </CardContent>
        <CardFooter className='flex justify-between place-items-center'>
          <RadioGroup
            className='flex'
            defaultValue={todayCardColor}
            onValueChange={handleValueChange}>
            <RadioGroupItem value="C2D5C3" id="green" className='bg-[#6E29AE] text-black'  />
            <RadioGroupItem value="D0DAFA" id="blue" className='bg-[#356E42] text-black' />
            <RadioGroupItem value="E2AA96" id="pink" className='bg-[#2A48B2] text-black' />
            <RadioGroupItem value="ECDFAB" id="yellow" className='bg-[#885A1F] text-black' />
            {/* <RadioGroupItem value="ECDFAB" checked={false} id="yellow" className='bg-[#984220] text-black' /> */}
            {/* <RadioGroupItem value="C2D5C3" id="green" className='bg-[#C2D5C3] text-black'  />
            <RadioGroupItem value="D0DAFA" id="blue" className='bg-[#D0DAFA] text-black' />
            <RadioGroupItem value="E2AA96" id="pink" className='bg-[#E2AA96] text-black' />
            <RadioGroupItem value="ECDFAB" id="yellow" className='bg-[#ECDFAB] text-black' /> */}
          </RadioGroup>
          <MagicWandIcon />
        </CardFooter>
      </Card>
    </section>
  )
}

export default OptionCard