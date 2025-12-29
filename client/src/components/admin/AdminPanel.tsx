import { useState } from 'react';
import { motion } from 'framer-motion';
import CreateBlog from './CreateBlog';
import CreateProject from './CreateProject';
import { FileText, FolderGit, LogIn } from 'lucide-react';
import api from '../../services/api';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState<'blogs' | 'projects'>('blogs');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [authError, setAuthError] = useState('');
    const [authSuccess, setAuthSuccess] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');

        try {
            const response = await api.post('/auth/login', loginData);

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            }
        } catch (error: any) {
            setAuthError(error.response?.data?.message || 'Login failed');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        setAuthSuccess('');

        if (registerData.password !== registerData.confirmPassword) {
            setAuthError('Passwords do not match');
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
            });

            if (response.data.success) {
                setAuthSuccess('✅ Account created! You can now login.');
                setAuthMode('login');
                setLoginData({ email: registerData.email, password: '' });
                setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
            }
        } catch (error: any) {
            setAuthError(error.response?.data?.message || 'Registration failed');
        }
    };

    if (!isAuthenticated) {
        return (
            <section className="section admin-login-section">
                <div className="container">
                    <motion.div
                        className="login-container"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="section-title text-gradient">
                            {authMode === 'login' ? 'Admin Login' : 'Create Admin Account'}
                        </h2>

                        {/* Auth Mode Toggle */}
                        <div className="auth-mode-toggle">
                            <button
                                className={`mode-btn ${authMode === 'login' ? 'active' : ''}`}
                                onClick={() => {
                                    setAuthMode('login');
                                    setAuthError('');
                                    setAuthSuccess('');
                                }}
                            >
                                Login
                            </button>
                            <button
                                className={`mode-btn ${authMode === 'register' ? 'active' : ''}`}
                                onClick={() => {
                                    setAuthMode('register');
                                    setAuthError('');
                                    setAuthSuccess('');
                                }}
                            >
                                Register
                            </button>
                        </div>

                        {authMode === 'login' ? (
                            <form onSubmit={handleLogin} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        required
                                        placeholder="admin@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>

                                {authError && <div className="message error">{authError}</div>}
                                {authSuccess && <div className="message success">{authSuccess}</div>}

                                <button type="submit" className="submit-btn">
                                    <LogIn size={20} />
                                    Login
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="register-name">Full Name</label>
                                    <input
                                        type="text"
                                        id="register-name"
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                        required
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-email">Email</label>
                                    <input
                                        type="email"
                                        id="register-email"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                        required
                                        placeholder="admin@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="register-password">Password</label>
                                    <input
                                        type="password"
                                        id="register-password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        required
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        value={registerData.confirmPassword}
                                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                        required
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>

                                {authError && <div className="message error">{authError}</div>}
                                {authSuccess && <div className="message success">{authSuccess}</div>}

                                <button type="submit" className="submit-btn">
                                    <LogIn size={20} />
                                    Create Account
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="section admin-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title text-gradient">Admin Panel</h2>

                    <div className="admin-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('blogs')}
                        >
                            <FileText size={20} />
                            <span>Create Blog</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <FolderGit size={20} />
                            <span>Create Project</span>
                        </button>
                    </div>

                    <div className="admin-content">
                        {activeTab === 'blogs' && <CreateBlog />}
                        {activeTab === 'projects' && <CreateProject />}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AdminPanel;
