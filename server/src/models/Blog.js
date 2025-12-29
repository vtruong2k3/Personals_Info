import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: [true, 'Blog content is required'],
        },
        excerpt: {
            type: String,
            default: '',
        },
        coverImage: {
            type: String,
            default: '',
        },
        tags: {
            type: [String],
            default: [],
        },
        published: {
            type: Boolean,
            default: false,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Auto-generate slug from title before saving
blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

// Index for faster searches
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ published: 1, createdAt: -1 });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
