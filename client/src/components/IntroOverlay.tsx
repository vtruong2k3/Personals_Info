import { motion } from 'framer-motion';

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <motion.div
            className="intro-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="intro-content"
            >
                <h1 className="intro-title">WELCOME</h1>
                <div className="intro-line" />
            </motion.div>
        </motion.div>
    );
};

export default IntroOverlay;
