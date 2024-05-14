// import { getServerSession } from "next-auth"
// import { NEXT_AUTH } from "../../lib/auth"
// import { redirect } from "next/navigation";

// const page = async () => {
//   const session = await getServerSession(NEXT_AUTH);
//   if(session?.user){
//     redirect("/")
//   }
//   return (
//     <div>
//       <h3>dashboard 2</h3>
//       {JSON.stringify(session)}
//     </div>
//   )
// }

// export default page