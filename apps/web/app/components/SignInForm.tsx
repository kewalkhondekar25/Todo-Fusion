"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn, useSession } from "next-auth/react"
import { NextURL } from "next/dist/server/web/next-url";
import { useSearchParams } from 'next/navigation'
import { toast } from "sonner";


const signinSchema = yup.object({
  email: yup.string().email("Whoops! Looks like the e-mail is Invalid.").required("Whoops! Looks like the e-mail is Required."),
  password: yup.string().required("Whoops! Looks like the Password is Required."),
});



export function SignupFormDemo() {
  
  const searchParams = useSearchParams();
  console.log(searchParams.get("error"));
  
  const [signInError, setSignInError] = useState<string | null>(null);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: signinSchema,
    onSubmit: async (value, { setSubmitting }) => {
      try {
        const result = await signIn("credentials", {
          email: value.email,
          password: value.password,
          redirect: false
        })
        if (result?.error === "CredentialsSignin") {
          toast("Oops! 🚫", {
            description: "Invalid credentials. Please try again."
          })
          setPasswordIncorrect(true);
          setSignInError(null);
        } else {
          setPasswordIncorrect(false);
          setSignInError(null);
          toast(`Welcome to Fusion! 📌`, {
            description: "Stay organized, stay productive. Let's conquer those tasks together!"
          })
        }
      } catch (error: any) {
        console.log(error);
      }finally {
        setSubmitting(false); // Set submitting to false after form submission
      }
    }
  })

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Sign In to Fusion
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
      Elevate your productivity effortlessly with Fusion
      {/* Unlock Your Productivity Potential: Seamlessly Elevate with Fusion */}
      </p>

      <form className="my-8" onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        formik.handleSubmit(); // Call custom submit handler
      }}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="Your supa&apos; fancy Email" type="email" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.email} />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-xs text-red-500">{formik.errors.email}</div>
          ) : null}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-xs text-red-500">{formik.errors.password}</div>
          ) : null}
          {passwordIncorrect && (
            <div className="text-xs text-red-500">Whoops! Looks like the e-mail or password is invalid.</div>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>
        
        {signInError && (
          <div className="text-red-500 mt-2">{signInError}</div>
        )}  

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
      <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={ async() => {
              await signIn("github")
            }}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={async () => {
              await signIn("google")
            } }
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
