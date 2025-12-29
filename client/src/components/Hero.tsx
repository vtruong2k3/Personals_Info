import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [displayedSubtitle, setDisplayedSubtitle] = useState('');
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [showTitle, setShowTitle] = useState(false);

    const subtitle = "Creative Developer";
    const title = "VINH TRUONG";

    // Typewriter effect for subtitle first
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= subtitle.length) {
                setDisplayedSubtitle(subtitle.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                // Delay before showing title typewriter
                setTimeout(() => setShowTitle(true), 500);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);

    // Typewriter effect for title after subtitle completes
    useEffect(() => {
        if (!showTitle) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= title.length) {
                setDisplayedTitle(title.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [showTitle]);

    return (
        <section className="hero-section">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ position: 'relative', zIndex: 10 }}
            >
                <motion.h2
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    {displayedSubtitle}
                    {!showTitle && <span className="typewriter-cursor">|</span>}
                </motion.h2>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                >
                    {displayedTitle}
                    {showTitle && displayedTitle.length < title.length && (
                        <span className="typewriter-cursor">|</span>
                    )}
                </motion.h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.8 }}
                >
                    Crafting premium digital experiences with cutting-edge technologies.
                    Specialized in React, Three.js, and immersive web applications.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="scroll-indicator"
            >
                <ArrowDown className="scroll-icon" />
            </motion.div>
        </section>
    );
};

export default Hero;
