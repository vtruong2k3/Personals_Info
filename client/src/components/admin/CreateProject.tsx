import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { Save } from 'lucide-react';

interface ProjectFormData {
    title: string;
    description: string;
    techStack: string;
    liveDemoUrl: string;
    githubUrl: string;
    featured: boolean;
}

const CreateProject = () => {
    const [formData, setFormData] = useState<ProjectFormData>({
        title: '',
        description: '',
        techStack: '',
        liveDemoUrl: '',
        githubUrl: '',
        featured: false,
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Create project
            const projectData = {
                ...formData,
                techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech),
            };

            const response = await api.post('/projects', projectData);

            if (response.data.success) {
                const projectId = response.data.data._id;

                // Upload thumbnail if provided
                if (thumbnail) {
                    const imageForm = new FormData();
                    imageForm.append('thumbnail', thumbnail);
                    await api.post(`/projects/${projectId}/thumbnail`, imageForm, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                }

                setMessage('✅ Project created successfully!');
                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    techStack: '',
                    liveDemoUrl: '',
                    githubUrl: '',
                    featured: false,
                });
                setThumbnail(null);
            }
        } catch (error: any) {
            setMessage('❌ Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="admin-form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="form-title">Create New Project</h3>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Enter project title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={4}
                        placeholder="Describe your project..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="techStack">Tech Stack (comma separated) *</label>
                    <input
                        type="text"
                        id="techStack"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        required
                        placeholder="React, Node.js, MongoDB"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="liveDemoUrl">Live Demo URL</label>
                    <input
                        type="url"
                        id="liveDemoUrl"
                        value={formData.liveDemoUrl}
                        onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                        placeholder="https://demo.example.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="githubUrl">GitHub URL</label>
                    <input
                        type="url"
                        id="githubUrl"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/user/repo"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail Image</label>
                    <input
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        />
                        <span>Mark as featured</span>
                    </label>
                </div>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                    <Save size={20} />
                    {loading ? 'Creating...' : 'Create Project'}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateProject;
