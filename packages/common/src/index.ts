import { z } from "zod"

export const NAME = "kewal"

//db schemas
const usersSchame = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
  avatar: z.string().optional(),
  isPremium: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  Todos: z.array(
    z.object({
      id: z.string().uuid(),
      todo: z.string(),
      isCompleted: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
      userId: z.string().uuid()//flag
    })
  )
});

const todosSchema = z.object({
  id: z.string().uuid(),
  todo: z.string(),
  isCompleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().uuid()//flag
})

//input schemas
const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
})

export {usersSchame, todosSchema, signupSchema, signInSchema}