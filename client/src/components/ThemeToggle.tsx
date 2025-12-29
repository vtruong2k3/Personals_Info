import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check localStorage for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.add('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);

        if (isDark) {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
        >
            {isDark ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
        </button>
    );
};

export default ThemeToggle;
