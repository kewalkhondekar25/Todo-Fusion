import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dailog"
import { Button } from '../ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Inputs from '../input/Inputs'
import PrioritySelect from '../prioritySelect/PrioritySelect'


const DrawerComp = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className='flex place-items-center gap-2'>
        <Button className='w-[120px]'>
          <PlusIcon/>
          <div>New Todo</div>
        </Button>
        </DialogTrigger>
        <DialogContent className='bg-[#292929] border-[#525252]'>
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
            <DialogDescription asChild>
              <div className='flex flex-col gap-1'>
                <Inputs/>
                <PrioritySelect/>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DrawerComp