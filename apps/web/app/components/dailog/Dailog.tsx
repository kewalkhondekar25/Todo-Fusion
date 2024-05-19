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


const DrawerComp = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className='flex place-items-center gap-2'>
        <Button>
          <PlusIcon/>
          <div>New Todo</div>
        </Button>
        </DialogTrigger>
        <DialogContent className='bg-[#292929] border-[#525252]'>
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
            <DialogDescription>
                <Inputs/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DrawerComp