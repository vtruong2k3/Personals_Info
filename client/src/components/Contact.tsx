import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section className="section contact-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-gradient">Let's Connect</h2>

                    <p className="contact-description">
                        Interested in collaboration or have a project in mind?
                        I'm always open to discussing new opportunities and creative ideas.
                    </p>

                    <div className="social-links">
                        <motion.a
                            href="#"
                            className="social-link"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail className="social-icon" />
                        </motion.a>

                        <motion.a
                            href="#"
                            className="social-link"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="social-icon" />
                        </motion.a>

                        <motion.a
                            href="#"
                            className="social-link"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Linkedin className="social-icon" />
                        </motion.a>

                        <motion.a
                            href="#"
                            className="social-link"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Twitter className="social-icon" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
