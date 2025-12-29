import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { projectService } from '../services/api';

interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    thumbnail?: string;
    liveDemoUrl?: string;
    githubUrl?: string;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    const fetchFeaturedProjects = async () => {
        try {
            setLoading(true);
            const response = await projectService.getFeaturedProjects();
            if (response.success) {
                // Get only first 3 projects
                setProjects(response.data.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching featured projects:', error);
            // Keep empty array if error
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section projects-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="section-title text-gradient"
                >
                    Featured Projects
                </motion.h2>

                {loading ? (
                    <div className="loading-state">
                        <div className="loader"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <p className="no-projects-message">No featured projects yet. Check back soon!</p>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                className="glass-card project-card"
                            >
                                {project.thumbnail && (
                                    <div className="project-thumbnail-home">
                                        <img
                                            src={`http://localhost:5000${project.thumbnail}`}
                                            alt={project.title}
                                        />
                                    </div>
                                )}
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="tech-tags">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
