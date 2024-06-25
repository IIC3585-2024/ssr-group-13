// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
// import prisma from '../db';

// prisma.$extends({
//   model: {
//     user: {
//       async currentUser() {
//         const session = await getServerSession()
//         if (!session) return null
//         const user = await prisma.user.findUnique({
//           where: {
//             email: session.user?.email ?? undefined
//           },
//           ...authOptions
//         })
//         return user
//       }
//     }
//   }
// });

// export default prisma;
