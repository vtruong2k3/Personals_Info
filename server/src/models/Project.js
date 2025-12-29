import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
        },
        techStack: {
            type: [String],
            default: [],
        },
        thumbnail: {
            type: String,
            default: '',
        },
        liveDemoUrl: {
            type: String,
            default: '',
        },
        githubUrl: {
            type: String,
            default: '',
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
projectSchema.index({ featured: 1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
