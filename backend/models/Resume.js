import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true
    },
    contentType: {
        type: String,
        required: true,
        default: 'application/pdf'
    },
    data: {
        type: Buffer,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure only one resume is active at a time
resumeSchema.pre('save', async function (next) {
    if (this.isActive) {
        await mongoose.model('Resume').updateMany(
            { _id: { $ne: this._id } },
            { isActive: false }
        );
    }
    next();
});

export default mongoose.model('Resume', resumeSchema);
