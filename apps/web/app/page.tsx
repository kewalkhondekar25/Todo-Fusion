import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import { createUser, createTodos } from "@repo/db";
import { MESSAGE } from "@repo/validation-schema";
import Authenticate from "./components/Authenticate";

export default function Page() {

  console.log(MESSAGE)
  return (
    <main>
      {/* className="bg-slate-800 text-white h-screen" */}
      <Button appName="web">
        Click me!
      </Button>      
      <Authenticate/>
    </main>
  );
}
