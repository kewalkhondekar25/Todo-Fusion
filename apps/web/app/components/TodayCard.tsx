import React from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { ListBulletIcon } from '@radix-ui/react-icons'


const TodayCard = () => {
  return (
    <section>
      <Card className="w-[350px] bg-[#292929] border-[#525252]">
      <CardHeader>
        <CardTitle>Today</CardTitle>
        <CardDescription>
          <div className='flex place-items-center gap-2'>
            <ListBulletIcon/>
            <p>5 todos</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </section>
  )
}

export default TodayCard