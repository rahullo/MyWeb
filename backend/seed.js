import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';

dotenv.config();

// Sample data
const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration. Features include real-time inventory updates, order tracking, and admin dashboard.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redux'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        liveUrl: 'https://example-ecommerce.com',
        githubUrl: 'https://github.com/yourusername/ecommerce',
        category: 'fullstack',
        projectType: 'freelance',
        featured: true
    },
    {
        title: 'AI Image Generator',
        description: 'An AI-powered image generation application using DALL-E API. Users can generate unique images from text prompts with various style options and download high-resolution outputs.',
        technologies: ['React', 'OpenAI API', 'Node.js', 'Express', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        liveUrl: 'https://example-ai-generator.com',
        githubUrl: 'https://github.com/yourusername/ai-generator',
        category: 'ai-ml',
        projectType: 'personal',
        featured: true
    },
    {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration features, project boards, and deadline tracking. Includes drag-and-drop functionality and notifications.',
        technologies: ['React', 'Firebase', 'Material-UI', 'React DnD'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        liveUrl: 'https://example-taskapp.com',
        githubUrl: 'https://github.com/yourusername/taskapp',
        category: 'web',
        projectType: 'personal',
        featured: false
    },
    {
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard that displays current weather, 7-day forecasts, and weather maps. Features location-based weather, search functionality, and beautiful data visualizations.',
        technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
        liveUrl: 'https://example-weather.com',
        githubUrl: 'https://github.com/yourusername/weather',
        category: 'web',
        projectType: 'personal',
        featured: false
    },
    {
        title: 'Social Media Dashboard',
        description: 'A comprehensive social media analytics dashboard with data visualization, engagement metrics, and performance tracking across multiple platforms.',
        technologies: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        liveUrl: 'https://example-social.com',
        githubUrl: 'https://github.com/yourusername/social-dashboard',
        category: 'fullstack',
        projectType: 'freelance',
        featured: false
    },
    {
        title: 'Fitness Tracker Mobile App',
        description: 'A React Native mobile application for tracking workouts, nutrition, and fitness goals. Includes progress charts, workout plans, and social sharing features.',
        technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
        liveUrl: '',
        githubUrl: 'https://github.com/yourusername/fitness-tracker',
        category: 'mobile',
        projectType: 'personal',
        featured: false
    }
];

const skills = [
    // Frontend
    { name: 'React', category: 'frontend', proficiency: 90, icon: '⚛️' },
    { name: 'JavaScript', category: 'frontend', proficiency: 95, icon: '🟨' },
    { name: 'TypeScript', category: 'frontend', proficiency: 85, icon: '🔷' },
    { name: 'HTML5', category: 'frontend', proficiency: 95, icon: '🌐' },
    { name: 'CSS3', category: 'frontend', proficiency: 90, icon: '🎨' },
    { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, icon: '💨' },
    { name: 'Vue.js', category: 'frontend', proficiency: 75, icon: '💚' },

    // Backend
    { name: 'Node.js', category: 'backend', proficiency: 90, icon: '🟢' },
    { name: 'Express', category: 'backend', proficiency: 88, icon: '🚂' },
    { name: 'Python', category: 'backend', proficiency: 80, icon: '🐍' },
    { name: 'Django', category: 'backend', proficiency: 75, icon: '🎸' },
    { name: 'REST API', category: 'backend', proficiency: 92, icon: '🔌' },

    // Database
    { name: 'MongoDB', category: 'database', proficiency: 88, icon: '🍃' },
    { name: 'PostgreSQL', category: 'database', proficiency: 82, icon: '🐘' },
    { name: 'MySQL', category: 'database', proficiency: 80, icon: '🐬' },
    { name: 'Firebase', category: 'database', proficiency: 85, icon: '🔥' },

    // Tools
    { name: 'Git', category: 'tools', proficiency: 90, icon: '📦' },
    { name: 'Docker', category: 'tools', proficiency: 78, icon: '🐳' },
    { name: 'AWS', category: 'tools', proficiency: 75, icon: '☁️' },
    { name: 'Webpack', category: 'tools', proficiency: 80, icon: '📦' },
    { name: 'Vite', category: 'tools', proficiency: 85, icon: '⚡' }
];

const experiences = [
    {
        company: 'Tech Innovations Inc.',
        position: 'Senior Full Stack Developer',
        duration: 'Jan 2022 - Present',
        description: 'Leading development of enterprise-level web applications using MERN stack. Architecting scalable solutions, mentoring junior developers, and implementing CI/CD pipelines. Improved application performance by 40% through optimization techniques.',
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'TypeScript'],
        current: true,
        startDate: new Date('2022-01-01'),
        endDate: null
    },
    {
        company: 'Digital Solutions Ltd.',
        position: 'Full Stack Developer',
        duration: 'Jun 2020 - Dec 2021',
        description: 'Developed and maintained multiple client-facing web applications. Collaborated with cross-functional teams to deliver high-quality software solutions. Implemented responsive designs and RESTful APIs.',
        technologies: ['React', 'Express', 'PostgreSQL', 'Redux', 'Material-UI'],
        current: false,
        startDate: new Date('2020-06-01'),
        endDate: new Date('2021-12-31')
    },
    {
        company: 'StartUp Ventures',
        position: 'Junior Web Developer',
        duration: 'Jan 2019 - May 2020',
        description: 'Built responsive web interfaces and integrated third-party APIs. Participated in agile development processes and code reviews. Contributed to the development of the company\'s main product platform.',
        technologies: ['JavaScript', 'HTML', 'CSS', 'Vue.js', 'Firebase'],
        current: false,
        startDate: new Date('2019-01-01'),
        endDate: new Date('2020-05-31')
    }
];

// Seed function
async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Insert new data
        await Project.insertMany(projects);
        console.log('✅ Projects seeded');

        await Skill.insertMany(skills);
        console.log('✅ Skills seeded');

        await Experience.insertMany(experiences);
        console.log('✅ Experience seeded');

        console.log('🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
