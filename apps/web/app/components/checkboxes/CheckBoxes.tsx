"use client"
import { Checkbox } from "../ui/checkbox"
import { useAppDispatch } from "../../../lib/store/hooks/hooks";
import {check} from "../../../lib/store/features/checked/checkedSlice"

interface TodaysTodoCheckBoxProps {
  value: string;
}; 

export const TodaysTodoCheckBox: React.FC<TodaysTodoCheckBoxProps> = ({value}) => {
  const dispatch = useAppDispatch();
  const handleCheckboxChange = () => {
    console.log(value);
    dispatch(check());
  };

  return <Checkbox onCheckedChange={handleCheckboxChange}/>
}