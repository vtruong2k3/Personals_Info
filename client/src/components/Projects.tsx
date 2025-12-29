import { motion } from 'framer-motion';

const projects = [
    {
        title: "Quantum Dashboard",
        description: "Real-time analytics platform with 3D data visualization and AI-powered insights.",
        tech: ["React", "Three.js", "TensorFlow.js"],
    },
    {
        title: "Metaverse Gallery",
        description: "Immersive 3D art gallery experience with WebXR and spatial audio.",
        tech: ["WebXR", "React Three Fiber", "Web Audio API"],
    },
    {
        title: "Neural Network Visualizer",
        description: "Interactive tool for visualizing and training neural networks in the browser.",
        tech: ["TypeScript", "WebGL", "Python"],
    },
];

const Projects = () => {
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

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="glass-card project-card"
                        >
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="tech-tags">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="tech-tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
