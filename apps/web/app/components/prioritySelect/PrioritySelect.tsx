import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"


const PrioritySelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Priority 1">Priority 1</SelectItem>
        <SelectItem value="Priority 2">Priority 2</SelectItem>
        <SelectItem value="Priority 3">Priority 3</SelectItem>
        <SelectItem value="Priority 3">Priority 4</SelectItem>
      </SelectContent>
</Select>

  )
}

export default PrioritySelect