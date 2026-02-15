import { useState, useEffect } from 'react';
import axios from 'axios';
import './Skills.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('/api/skills');
                setSkills(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load skills');
                setLoading(false);
                console.error('Error fetching skills:', err);
            }
        };

        fetchSkills();
    }, []);

    const groupedSkills = skills
        .filter(skill => skill.category && skill.category !== 'undefined' && skill.category !== 'null')
        .reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});

    // Function to format category names nicely
    const formatCategoryTitle = (category) => {
        // Handle undefined, null, or empty categories
        if (!category || category === 'undefined' || category === 'null') {
            return 'Other';
        }

        // Check if we have a predefined title
        const categoryTitles = {
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Database',
            tools: 'Tools & Others',
            ai_ml: 'AI/ML',
            'ai-ml': 'AI/ML',
            aiml: 'AI/ML'
        };

        if (categoryTitles[category.toLowerCase()]) {
            return categoryTitles[category.toLowerCase()];
        }

        // Otherwise, format it nicely (capitalize first letter, replace underscores/hyphens with spaces)
        return category
            .replace(/[_-]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    if (loading) {
        return (
            <section id="skills" className="section skills">
                <div className="container">
                    <div className="section-title">
                        <h2>Skills & Technologies</h2>
                    </div>
                    <div className="loading">Loading skills...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="skills" className="section skills">
                <div className="container">
                    <div className="section-title">
                        <h2>Skills & Technologies</h2>
                    </div>
                    <div className="error">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <div className="section-title">
                    <h2>Skills & Technologies</h2>
                    <p className="section-subtitle">Technologies I work with</p>
                </div>

                <div className="skills-grid">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div key={category} className="skill-category">
                            <h3 className="category-title">{formatCategoryTitle(category)}</h3>
                            <div className="skills-list">
                                {categorySkills.map((skill) => (
                                    <div key={skill._id} className="skill-item glass-card">
                                        <div className="skill-header">
                                            <span className="skill-icon">{skill.icon}</span>
                                            <span className="skill-name">{skill.name}</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{ width: `${skill.proficiency || 0}%` }}
                                            >
                                                <span className="skill-percentage">{skill.proficiency || 0}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
