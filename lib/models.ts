import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  attributeSchema: { type: Map, of: String, default: new Map() }
});

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  attributes: { type: Map, of: mongoose.Schema.Types.Mixed, default: new Map() }
}, { timestamps: true });

// Create text index with weights
listingSchema.index(
  { title: 'text', description: 'text' },
  { 
    weights: {
      title: 1,
      description: 1
    },
    name: 'title_text_description_text',
    background: true
  }
);
listingSchema.index({ categoryId: 1 });

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema); 