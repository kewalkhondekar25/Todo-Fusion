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
// export const getUserTodos = async () => {
//   //send email to get id
//   //use id to connect to user
// }

//READ
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

//CREATE
interface ReqBodyType {
  todo: string;
  priority?: string;
  minutes?: string;
  hours?: string;
  date?: Date;
  isUpcoming?: boolean;
  payload: string;
}
export const createTodos = async (reqBody: ReqBodyType, isFuture: boolean | undefined) => {
  try {
    const { todo, priority, minutes, hours, date,  payload } = reqBody;
    const todos = await prisma.todos.create({
      data: {
        todo: todo,
        priority: priority,
        date: date,
        hours: hours,
        minutes: minutes,
        isUpcoming: isFuture ? true : false,
        user: {
          connect: { email: payload }
        }
      }
    });
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
};

export const updateAllCompleteTodo = async (todoIds: string[]) => {
  // console.log(todoIds);
  try {
    const allCompletedTodos = await prisma.todos.updateMany({
      where: {
        id: {
          in: todoIds,
        }
      },
      data: {
        isCompleted: true
      }
    })
    return allCompletedTodos;
  } catch (error) {
    const errorMsg = error instanceof Error;
    console.log(errorMsg);
  }
};

interface UpdateParamsType {
  id: string,
  todo: string,
  priority: string,
  hours: string,
  minutes: string
}

export const updateTodo = async (updatePayload: UpdateParamsType) => {
  try {
    const {id, todo, priority, hours, minutes} = updatePayload
    const updatedTodo = await prisma.todos.update({
      data: {
        todo: todo,
        priority: priority,
        hours: hours,
        minutes: minutes
      },
      where: {
        id : id
      }
    });
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
};

//delete todo
interface deleteType {
  id: string
}
export const deleteTodo = async (payload: deleteType) => {
  const {id} = payload
  try {
    const deletedTodo = await prisma.todos.delete({
      where: {
        id: id
      }
    })
  return deletedTodo;
  } catch (error) {
    const errorMessage = error instanceof Error
    console.log(errorMessage);
  }
} 