import { NextResponse } from 'next/server';
import Rating from '../models/Rating';
import Roadmap from '../models/Roadmap';
import User from '../models/User';

export const addOrUpdateRating = async (req: any) => {
  const { roadmapEntryId, userEntryId, rating } = req.body;

  try {
   
    const roadmap = await Roadmap.findOne({ entryId: roadmapEntryId });
    const user = await User.findOne({ entryId: userEntryId });

    if (!roadmap || !user) {
      return NextResponse.json({ message: 'Roadmap or User not found' }, { status: 404 });
    }

    const existingRating = await Rating.findOne({ roadmapId: roadmap._id, userId: user._id });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      await existingRating.save();
      return NextResponse.json({ message: 'Rating updated successfully' }, { status: 200 });
    } else {
      // Add new rating
      const newRating = new Rating({ roadmapId: roadmap._id, userId: user._id, rating });
      await newRating.save();
      return NextResponse.json({ message: 'Rating added successfully' }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error adding/updating rating', error }, { status: 500 });
  }
};

export const getRoadmapRating = async (roadmapEntryId: string) => {
  try {
   
    const roadmap = await Roadmap.findOne({ entryId: roadmapEntryId });

    if (!roadmap) {
      return NextResponse.json({ message: 'Roadmap not found' }, { status: 404 });
    }

    const result = await Rating.aggregate([
      { $match: { roadmapId: roadmap._id } },
      {
        $group: {
          _id: '$roadmapId',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    if (result.length > 0) {
      return NextResponse.json({
        averageRating: result[0].averageRating,
        totalRatings: result[0].totalRatings,
      }, { status: 200 });
    } else {
      return NextResponse.json({ averageRating: 0, totalRatings: 0 }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching roadmap ratings', error }, { status: 500 });
  }
};
