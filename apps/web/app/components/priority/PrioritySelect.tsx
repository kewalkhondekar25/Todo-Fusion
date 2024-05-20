import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {ExclamationTriangleIcon} from "@radix-ui/react-icons"

const PrioritySelect = () => {
  return (
    <Select>
      <SelectTrigger className=" border-white gap-2">
        <ExclamationTriangleIcon/>
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent className="bg-[#525252]">
        <SelectItem value="light">Priority 1</SelectItem>
        <SelectItem value="dark">Priority 2</SelectItem>
        <SelectItem value="system">Priority 3</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default PrioritySelect