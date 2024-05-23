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
    const singleUser = await prisma.users.findUnique({
      where: { email }
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
    const { firstName, lastName, email, password } = params
    const user = await prisma.users.create({
      data: { firstName, lastName, email, password }
    })
    console.log("created user", user);

    return user;
  } catch (error) {
    return error
  }
}

//todos crud

//all todos of single user
export const getUserTodos = async () => {
  //send email to get id
  //use id to connect to user
}

export const getAllTodos = async (userId: string) => {
  try {
    return await prisma.todos.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        usersId: userId
      }
    })
  } catch (error) {
    console.log(error);
  }
};


interface ReqBodyType {
  todo: string,
  payload: string
}
export const createTodos = async (reqBody: ReqBodyType) => {
  const { todo, payload } = reqBody;
  try {
    const specificUser = await getSingleUser(payload)
    const todos = await prisma.todos.create({
      data: {
        todo: todo,
        user: {
          connect: { email: payload }
        }
      }
    })
    return todos
  } catch (error) {
    return error
  }
}

//UPDATE_TODOs

export const updateCompleteTodo = async (todoId: string) => {
  try {
    const updatedTodo = await prisma.todos.update({
      where: {
        id: todoId
      },
      data: {
        isCompleted: true
      }
    });
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
}

interface UpdateParamsType {
  id: string,
  todo: string
}

export const updateTodo = async (updatePayload: UpdateParamsType) => {
  try {
    const {id, todo} = updatePayload
    const updatedTodo = await prisma.todos.update({
      data: {
        todo: todo
      },
      where: {
        id : id
      }
    });
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
}