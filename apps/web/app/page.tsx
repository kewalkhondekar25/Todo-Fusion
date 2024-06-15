import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import { createUser, createTodos } from "@repo/db";
import { MESSAGE } from "@repo/validation-schema";
import Authenticate from "./components/Authenticate";
import { GridBackgroundDemo } from "./components/BackgroundGrid";
import { SparklesPreview } from "./components/Sparkel";
import HeaderTop from "./components/Home/HeaderTop";
import HeroSection from "./components/Home/HeroSection";
import HomeCards from "./components/Home/HomeCards";

export default function Page() {

  console.log(MESSAGE)
  return (
    <main>
      {/* className="bg-slate-800 text-white h-screen" */}
      {/* <Button appName="web">
        Click me!
      </Button>      
      */}
      {/* <Authenticate/>  */}
      {/* <GridBackgroundDemo/> */}
      <HeaderTop/>
      <HeroSection/>
      <HomeCards/>
    </main>
  );
}
