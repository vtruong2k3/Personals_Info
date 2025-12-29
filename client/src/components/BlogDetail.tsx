import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../services/api';
import { Calendar, Tag, ArrowLeft, Eye } from 'lucide-react';

interface BlogDetail {
    _id: string;
    title: string;
    slug: string;
    content: string;
    coverImage: string;
    tags: string[];
    createdAt: string;
    views: number;
    author?: {
        name: string;
        avatar: string;
    };
}

const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<BlogDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (slug) {
            fetchBlog();
        }
    }, [slug]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await blogService.getBlogBySlug(slug!);
            if (response.success) {
                setBlog(response.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load blog');
            console.error('Error fetching blog:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <section className="section blog-detail-section">
                <div className="container">
                    <div className="loading-state">
                        <div className="loader"></div>
                        <p>Loading blog...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !blog) {
        return (
            <section className="section blog-detail-section">
                <div className="container">
                    <div className="error-state">
                        <p className="error-message">{error || 'Blog not found'}</p>
                        <Link to="/blogs" className="back-link">
                            <ArrowLeft size={20} />
                            Back to Blogs
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section blog-detail-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link to="/blogs" className="back-link">
                        <ArrowLeft size={20} />
                        Back to Blogs
                    </Link>

                    <article className="blog-article">
                        {blog.coverImage && (
                            <motion.div
                                className="blog-detail-cover"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <img
                                    src={`http://localhost:5000${blog.coverImage}`}
                                    alt={blog.title}
                                    className="blog-detail-cover-image"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </motion.div>
                        )}

                        <motion.h1
                            className="blog-detail-title text-gradient"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {blog.title}
                        </motion.h1>

                        <motion.div
                            className="blog-detail-meta"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <span className="meta-item">
                                <Calendar size={18} />
                                {formatDate(blog.createdAt)}
                            </span>
                            <span className="meta-item">
                                <Eye size={18} />
                                {blog.views} views
                            </span>
                            {blog.author && (
                                <span className="meta-item">
                                    By {blog.author.name}
                                </span>
                            )}
                        </motion.div>

                        {blog.tags && blog.tags.length > 0 && (
                            <motion.div
                                className="blog-detail-tags"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <Tag size={18} />
                                {blog.tags.map((tag) => (
                                    <span key={tag} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                        )}

                        <motion.div
                            className="blog-detail-content glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            dangerouslySetInnerHTML={{ __html: formatMarkdown(blog.content) }}
                        />
                    </article>
                </motion.div>
            </div>
        </section>
    );
};

// Simple markdown to HTML converter (you can use a library like marked or react-markdown for better support)
const formatMarkdown = (content: string) => {
    return content
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^/g, '<p>')
        .replace(/$/g, '</p>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
};

export default BlogDetail;
