import { NextResponse } from 'next/server';
import prisma from '../../../../libs/db';
import bcryptjs from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userFound = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (userFound) {
      return NextResponse.json('El usuario ya existe');
    }

    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword
      }
    });



    const { password, ...user } = newUser;
    // console.log(newUser);

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse('Error creating user: ' + error.message, { status: 500 });
  }
}