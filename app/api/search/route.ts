import connectDB from '@/lib/db';
import { Category, Listing } from '@/lib/models';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const filters = searchParams.get('filters') ? JSON.parse(searchParams.get('filters')!) : {};

    // Build match stage
    const matchStage: any = {};
    if (q) {
      // Use $or with regex for case-insensitive search
      matchStage.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) matchStage.categoryId = cat._id;
    }
    
    // Add attribute filters
    Object.entries(filters).forEach(([key, value]) => {
      matchStage[`attributes.${key}`] = value;
    });

    // Get facets
    const facetStage = {
      $facet: {
        results: [
          { $match: matchStage },
          { $sort: { createdAt: -1 } },
          { $limit: 20 }
        ],
        facets: [
          { $match: matchStage },
          { $unwind: '$attributes' },
          {
            $group: {
              _id: { key: '$attributes.k', value: '$attributes.v' },
              count: { $sum: 1 }
            }
          },
          {
            $group: {
              _id: '$_id.key',
              values: {
                $push: { value: '$_id.value', count: '$count' }
              }
            }
          }
        ]
      }
    };

    const [result] = await Listing.aggregate([facetStage]);
    
    return NextResponse.json({
      results: result.results,
      facets: Object.fromEntries(
        result.facets.map((f: any) => [f._id, f.values])
      )
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
} 