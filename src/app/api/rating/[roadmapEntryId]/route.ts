import dbConnect from '@/utils/dbConnect';
import { getRoadmapRating } from '@/controllers/ratingController';

export async function GET(request: Request, { params }: { params: { roadmapEntryId: string } }) {
  await dbConnect();

  const { roadmapEntryId } = params;

  const response = await getRoadmapRating(roadmapEntryId);

  return response;
}
