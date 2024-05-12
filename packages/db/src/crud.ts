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

export const getSingleUser = async ({email}: {email: any}) => {
  try {
    await prisma.users.findUnique({
      where: {email}
    })
  } catch (error) {
    return error
  }
}

export const createUser = async () => {
  try {
    const user = await prisma.users.create({
      data: {
        firstName: "harry",
        lastName: "potter",
        email: "harry@potter.com",
        password: "lumosmaxima"
      }
    })
    return user
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