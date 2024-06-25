import prisma from '@/libs/db';
import { recommendations } from '@/prisma/data/recommendations';
import { users } from '@/prisma/data/users';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


export async function GET() {
  let recommendationList = recommendations

  try {
    await prisma.recommendation.deleteMany();
    await prisma.user.deleteMany();
    for (const user of users) {
      const userFound = await prisma.user.findUnique({
        where: {
          email: user.email
        }
      });
      if (userFound) {
        return NextResponse.json('El usuario ya existe');
      }
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword
        }
      });

      const randomRecommendationCount = Math.floor(Math.random() * recommendationList.length);
      // console.log(randomRecommendationCount);
      for (let i = 0; i < randomRecommendationCount; i++) {
        const randomRecommendationIndex = Math.floor(Math.random() * recommendationList.length);
        const recommendation = recommendationList[randomRecommendationIndex];
        const reccomendationResponse = await fetch(`http://localhost:3000/api/recommendations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...recommendation,
            userId: newUser.id
          })
        });
        if (reccomendationResponse.status !== 200) {
          return new NextResponse('Error creating recommendation: ' + reccomendationResponse.statusText, { status: 500 });
        }
        recommendationList = recommendationList.filter((_, index) => index !== randomRecommendationIndex);
      }
    }
    return NextResponse.json('Seed data created');
  } catch (error: any) {
    return new NextResponse('Error creating seed data: ' + error.message, { status: 500 });
  }


}