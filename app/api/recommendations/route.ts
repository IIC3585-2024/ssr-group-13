import { NextResponse } from 'next/server'
import prisma from '../../../libs/db'

export async function GET() {
  try {
    const recommendations = await prisma.recommendation.findMany({
      include: {
        user: true
      }
    })
    return NextResponse.json(recommendations);
  } catch (error: any) {
    console.error(error);
    return new NextResponse('Error fetching recommendations: ' + error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    // console.log(data);
    const newRecommendation = await prisma.recommendation.create({
      data: {
        userId: data.userId,
        title: data.title,
        service: data.service,
        description: data.description,
        category: data.category,
        numberOfSeasons: data.numberOfSeasons,
        episodesPerSeason: data.episodesPerSeason,
        rating: data.rating,
        numberOfRatings: data.numberOfRatings,
      }
    });

    return NextResponse.json(newRecommendation);
  } catch (error: any) {
    console.error(error);
    return new NextResponse('Error creating recommendation: ' + error.message, { status: 500 });
  }
}