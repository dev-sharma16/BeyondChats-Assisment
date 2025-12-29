import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
    references: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Article', articleSchema);
