import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-gradient">About Me</h2>

                    <div className="about-content">
                        <div>
                            <p className="about-text" style={{ marginBottom: '1.5rem' }}>
                                I am a passionate Android developer focused on building modern and reliable mobile applications.
                                My journey in mobile development emphasizes clean architecture, performance, and user experience.
                            </p>
                            <p className="about-text">
                                I specialize in developing high-quality Android apps using Kotlin and Jetpack Compose,
                                with a strong focus on scalable architecture, smooth UI, and real-world product requirements.
                            </p>

                        </div>

                        <div className="glass-card skills-card">
                            <h3 className="skills-title">Core Skills</h3>
                            <ul className="skills-grid">
                                <li className="skill-item">React / Next.js</li>
                                <li className="skill-item">TypeScript</li>
                                <li className="skill-item">Three.js / WebGL</li>
                                <li className="skill-item">Framer Motion</li>
                                <li className="skill-item">Node.js / Express</li>
                                <li className="skill-item">GraphQL / REST</li>
                                <li className="skill-item">GLSL Shaders</li>
                                <li className="skill-item">CI/CD / DevOps</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
