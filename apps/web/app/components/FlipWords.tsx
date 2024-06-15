import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["designers", "developers", "professionals"];

  return (
    <div className="flex justify-center items-center px-4">
      <div className="mx-auto">
        for
        <FlipWords 
        className="-ml-1" words={words} />
      </div>
    </div>
  );
}
// className=' '