import dbConnect from '../../../utils/dbConnect';
import { addOrUpdateRating } from '../../../controllers/ratingController';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await dbConnect();
  
  const body = await req.json();
  
  const response = await addOrUpdateRating({ body });

  return response;
}
