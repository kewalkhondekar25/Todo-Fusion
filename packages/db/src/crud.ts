import prisma from "./client";

//GET
export const getUsers = async () => {
  try {
    const users = await prisma.users.findMany({});
    return users;
  } catch (error) {
    return error
  }
};

export const getSingleUser = async (email: string) => {
  try {
    console.log("func: ", email);
    
    const singleUser = await prisma.users.findUnique({
      where: {email}
    })
    return singleUser;
  } catch (error) {
    return error
  }
}

interface InputTypes {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export const createUser = async (params: InputTypes) => {
  try {
    const {firstName, lastName, email, password} = params
    const user = await prisma.users.create({
      data: {firstName, lastName, email, password}
    })
    console.log("created user", user);
    
    return user;
  } catch (error) {
    return error
  }
}

export const createTodos = async () => {
  try {
    const harry = await getUsers()
    const todos = await prisma.todos.create({
      data: {
        todo: "kill voldemort",
        user: {
          connect: {id: harry[0].id}
        }
      }
    })
    return todos
  } catch (error) {
    return error
  }
}