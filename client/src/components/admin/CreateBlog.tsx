import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { Save } from 'lucide-react';

interface BlogFormData {
    title: string;
    content: string;
    excerpt: string;
    tags: string;
    published: boolean;
}

const CreateBlog = () => {
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        published: false,
    });
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Create blog
            const blogData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            };

            const response = await api.post('/blogs', blogData);

            if (response.data.success) {
                const blogId = response.data.data._id;

                // Upload cover image if provided
                if (coverImage) {
                    const imageForm = new FormData();
                    imageForm.append('cover', coverImage);
                    await api.post(`/blogs/${blogId}/cover`, imageForm, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                }

                setMessage('✅ Blog created successfully!');
                // Reset form
                setFormData({
                    title: '',
                    content: '',
                    excerpt: '',
                    tags: '',
                    published: false,
                });
                setCoverImage(null);
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
            <h3 className="form-title">Create New Blog Post</h3>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Enter blog title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="excerpt">Excerpt *</label>
                    <textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        required
                        rows={2}
                        placeholder="Short description..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content (Markdown) *</label>
                    <textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={12}
                        placeholder="# Heading&#10;&#10;Your content here..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Tags (comma separated)</label>
                    <input
                        type="text"
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="react, nodejs, tutorial"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="coverImage">Cover Image</label>
                    <input
                        type="file"
                        id="coverImage"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        />
                        <span>Publish immediately</span>
                    </label>
                </div>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                    <Save size={20} />
                    {loading ? 'Creating...' : 'Create Blog'}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateBlog;
