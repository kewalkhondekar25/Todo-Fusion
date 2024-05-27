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
import { setEditValues } from "../../../lib/store/features/todos/todoSlice"
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks/hooks"

const EditTodoPrioritySelect = () => {
  const {editValues, editPayload} = useAppSelector(state => state.todo)
  const dispatch = useAppDispatch()
  return (
    <Select name="priority" 
      onValueChange={e => dispatch(setEditValues({...editValues, priority: e}))}
      defaultValue={`${editPayload?.priority}`}>
      <SelectTrigger className=" border-white gap-2">
        <ExclamationTriangleIcon/>
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent className="bg-[#525252]">
        <SelectItem value="priority1">Priority 1</SelectItem>
        <SelectItem value="priority2">Priority 2</SelectItem>
        <SelectItem value="priority3">Priority 3</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default EditTodoPrioritySelect