import { getServerSession } from "next-auth"

const page = async () => {
  const session = await getServerSession()
  return (
    <div>
      <h3>dashboard 2</h3>
      <p>{JSON.stringify(session)}</p>
    </div>
  )
}

export default page