import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['frontend', 'backend', 'database', 'tools', 'other'],
        required: true
    },
    proficiency: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },
    icon: {
        type: String,
        default: ''
    }
});

export default mongoose.model('Skill', skillSchema);
