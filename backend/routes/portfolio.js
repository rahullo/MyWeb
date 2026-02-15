import express from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Contact from '../models/Contact.js';

const router = express.Router();

// Get all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
});

// Get single project by ID
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
});

// Get all skills
router.get('/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skills', error: error.message });
    }
});

// Get all experience
router.get('/experience', async (req, res) => {
    try {
        const experience = await Experience.find().sort({ startDate: -1 });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching experience', error: error.message });
    }
});

// Submit contact form
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();
        res.status(201).json({ message: 'Message sent successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting contact form', error: error.message });
    }
});

// Get all contact messages (for admin)
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ timestamp: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
});

// ===== RESUME ROUTES =====

// Get the active resume PDF
router.get('/resume', async (req, res) => {
    try {
        const Resume = (await import('../models/Resume.js')).default;
        const resume = await Resume.findOne({ isActive: true });

        if (!resume) {
            return res.status(404).json({ message: 'No resume found' });
        }

        res.set({
            'Content-Type': resume.contentType,
            'Content-Disposition': `attachment; filename="${resume.filename}"`,
            'Content-Length': resume.size
        });

        res.send(resume.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resume', error: error.message });
    }
});

// Get resume metadata
router.get('/resume/info', async (req, res) => {
    try {
        const Resume = (await import('../models/Resume.js')).default;
        const resume = await Resume.findOne({ isActive: true }).select('-data');

        if (!resume) {
            return res.status(404).json({ message: 'No resume found' });
        }

        res.json({
            filename: resume.filename,
            size: resume.size,
            uploadedAt: resume.uploadedAt,
            contentType: resume.contentType
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resume info', error: error.message });
    }
});

// Upload/Update resume
router.post('/resume/upload', async (req, res) => {
    try {
        // Get upload middleware from app
        const upload = req.app.get('upload');

        // Use multer middleware
        upload.single('resume')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const Resume = (await import('../models/Resume.js')).default;

            // Create new resume document
            const resume = new Resume({
                filename: req.file.originalname,
                contentType: req.file.mimetype,
                data: req.file.buffer,
                size: req.file.size,
                isActive: true
            });

            await resume.save();

            res.status(201).json({
                message: 'Resume uploaded successfully',
                resume: {
                    filename: resume.filename,
                    size: resume.size,
                    uploadedAt: resume.uploadedAt
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading resume', error: error.message });
    }
});

// Delete active resume
router.delete('/resume', async (req, res) => {
    try {
        const Resume = (await import('../models/Resume.js')).default;
        const resume = await Resume.findOneAndDelete({ isActive: true });

        if (!resume) {
            return res.status(404).json({ message: 'No resume found to delete' });
        }

        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resume', error: error.message });
    }
});

export default router;
