// const users: {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   avatar: string;
//   isPremium: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }[]

import {z} from "zod"

const MESSAGE = "hello from zod validations"

const signupSchema = z.object({
  firstName: z.string().min(3, {message: "First name must be at least 3 characters long"}),
  lastName: z.string().min(3, {message: "First name must be at least 3 characters long"}),
  email: z.string().email({message: "Invalid email format"}),
  password: z.string()
})


export {
  signupSchema,
  MESSAGE
}