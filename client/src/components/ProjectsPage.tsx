import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { projectService } from '../services/api';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    thumbnail: string;
    liveDemoUrl: string;
    githubUrl: string;
    featured: boolean;
}

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, [page, showFeaturedOnly]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            let response;
            if (showFeaturedOnly) {
                response = await projectService.getFeaturedProjects();
            } else {
                response = await projectService.getProjects(page, 9);
            }

            if (response.success) {
                setProjects(response.data);
                if (response.pagination) {
                    setTotalPages(response.pagination.pages);
                }
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load projects');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section projects-page-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-gradient">Projects</h2>

                    {/* Filter Toggle */}
                    <div className="filter-controls">
                        <button
                            className={`filter-btn ${!showFeaturedOnly ? 'active' : ''}`}
                            onClick={() => setShowFeaturedOnly(false)}
                        >
                            All Projects
                        </button>
                        <button
                            className={`filter-btn ${showFeaturedOnly ? 'active' : ''}`}
                            onClick={() => setShowFeaturedOnly(true)}
                        >
                            Featured
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="loader"></div>
                            <p>Loading projects...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p className="error-message">{error}</p>
                        </div>
                    ) : (
                        <>
                            <div className="projects-grid">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project._id}
                                        className="project-card glass-card"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {project.thumbnail && (
                                            <div className="project-thumbnail">
                                                <img
                                                    src={`http://localhost:5000${project.thumbnail}`}
                                                    alt={project.title}
                                                    className="project-thumbnail-image"
                                                />
                                            </div>
                                        )}

                                        <div className="project-content">
                                            <div className="project-header">
                                                <h3 className="project-title">{project.title}</h3>
                                                {project.featured && (
                                                    <span className="featured-badge">Featured</span>
                                                )}
                                            </div>

                                            <p className="project-description">{project.description}</p>

                                            {project.techStack && project.techStack.length > 0 && (
                                                <div className="tech-tags">
                                                    {project.techStack.map((tech) => (
                                                        <span key={tech} className="tech-tag">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="project-links">
                                                {project.liveDemoUrl && (
                                                    <a
                                                        href={project.liveDemoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="project-link"
                                                    >
                                                        <ExternalLink size={18} />
                                                        Live Demo
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="project-link"
                                                    >
                                                        <Github size={18} />
                                                        GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {!showFeaturedOnly && totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                    <span className="pagination-info">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsPage;
