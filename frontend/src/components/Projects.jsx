import { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                setProjects(response.data);
                setFilteredProjects(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filterProjects = (filterId) => {
        setActiveFilter(filterId);
        if (filterId === 'all') {
            setFilteredProjects(projects);
        } else if (filterId === 'personal' || filterId === 'freelance') {
            // Filter by project type
            setFilteredProjects(projects.filter(p => p.projectType === filterId));
        } else {
            // Filter by category
            setFilteredProjects(projects.filter(p => p.category === filterId));
        }
    };

    // Dynamically generate categories from project data
    const getUniqueCategories = () => {
        const categories = [{ id: 'all', label: 'All Projects' }];

        // Get unique project types
        const projectTypes = [...new Set(projects.map(p => p.projectType).filter(Boolean))];
        projectTypes.forEach(type => {
            categories.push({
                id: type,
                label: type.charAt(0).toUpperCase() + type.slice(1),
                type: 'projectType'
            });
        });

        // Get unique project categories
        const projectCategories = [...new Set(projects.map(p => p.category).filter(Boolean))];
        projectCategories.forEach(cat => {
            // Format category label (e.g., 'ai-ml' -> 'AI/ML', 'fullstack' -> 'Full Stack')
            let label = cat;
            if (cat === 'ai-ml' || cat === 'ai_ml') {
                label = 'AI/ML';
            } else if (cat === 'fullstack') {
                label = 'Full Stack';
            } else {
                label = cat.charAt(0).toUpperCase() + cat.slice(1);
            }

            categories.push({
                id: cat,
                label: label,
                type: 'category'
            });
        });

        return categories;
    };

    const categories = getUniqueCategories();

    if (loading) {
        return (
            <section id="projects" className="section projects">
                <div className="container">
                    <div className="section-title">
                        <h2>Featured Projects</h2>
                    </div>
                    <div className="loading">Loading projects...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Projects</h2>
                    <p className="section-subtitle">Some of my recent work</p>
                </div>

                <div className="project-filters">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                            onClick={() => filterProjects(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <div key={project._id} className="project-card glass-card">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-type-badge">
                                    {project.projectType === 'personal' ? '👤 Personal' : '💼 Freelance'}
                                </div>
                                <h3>{project.title}</h3>
                                <p className="project-description">
                                    {project.description ? project.description.substring(0, 100) + '...' : 'No description available'}
                                </p>
                                <div className="project-tech">
                                    {project.technologies && project.technologies.length > 0 ? (
                                        <>
                                            {project.technologies.slice(0, 3).map((tech, index) => (
                                                <span key={index} className="tech-tag">{tech}</span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="tech-tag">+{project.technologies.length - 3}</span>
                                            )}
                                        </>
                                    ) : null}
                                </div>
                                <div className="project-links">
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                            </svg>
                                            Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
                        <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
                        <div className="project-type-badge">
                            {selectedProject.projectType === 'personal' ? '👤 Personal Project' : '💼 Freelance Project'}
                        </div>
                        <h2>{selectedProject.title}</h2>
                        <p className="modal-description">{selectedProject.description}</p>
                        <div className="modal-tech">
                            <h4>Technologies Used:</h4>
                            <div className="tech-list">
                                {selectedProject.technologies && selectedProject.technologies.length > 0 ? (
                                    selectedProject.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))
                                ) : (
                                    <p>No technologies listed</p>
                                )}
                            </div>
                        </div>
                        <div className="modal-actions">
                            {selectedProject.liveUrl && (
                                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    View Live Demo
                                </a>
                            )}
                            {selectedProject.githubUrl && (
                                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                    View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
