import prisma from "./client";

//users crud
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

//todos crud

export const getAllTodos = async () => {
  return await prisma.todos.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })
};
interface ReqBodyType {
  todo: string,
  payload: string
}
export const createTodos = async (reqBody: ReqBodyType) => {
  const {todo, payload} = reqBody;
  try {
    const specificUser = await getSingleUser(payload)
    const todos = await prisma.todos.create({
      data: {
        todo: todo,
        user: {
          connect: {email: payload}
        }
      }
    })
    return todos
  } catch (error) {
    return error
  }
}