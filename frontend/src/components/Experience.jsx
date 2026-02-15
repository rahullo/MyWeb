import { useState, useEffect } from 'react';
import axios from 'axios';
import './Experience.css';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await axios.get('/api/experience');
                setExperiences(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching experience:', err);
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    if (loading) {
        return (
            <section id="experience" className="section experience">
                <div className="container">
                    <div className="section-title">
                        <h2>Work Experience</h2>
                    </div>
                    <div className="loading">Loading experience...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="section experience">
            <div className="container">
                <div className="section-title">
                    <h2>Work Experience</h2>
                    <p className="section-subtitle">My professional journey</p>
                </div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <div key={exp._id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content glass-card">
                                <div className="timeline-header">
                                    <h3>{exp.position}</h3>
                                    <span className="company">{exp.company}</span>
                                    <span className="duration">{exp.duration}</span>
                                    {exp.current && <span className="current-badge">Current</span>}
                                </div>
                                <p className="timeline-description">{exp.description}</p>
                                <div className="timeline-tech">
                                    {exp.technologies && exp.technologies.length > 0 ? (
                                        exp.technologies.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">{tech}</span>
                                        ))
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
