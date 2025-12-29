import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/api';
import { Calendar, Clock, Tag } from 'lucide-react';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    createdAt: string;
    views: number;
}

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBlogs();
    }, [page]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await blogService.getBlogs(page, 6);
            if (response.success) {
                setBlogs(response.data);
                setTotalPages(response.pagination.pages);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load blogs');
            console.error('Error fetching blogs:', err);
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

    return (
        <section className="section blogs-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-gradient">Blog</h2>

                    {loading ? (
                        <div className="loading-state">
                            <div className="loader"></div>
                            <p>Loading blogs...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p className="error-message">{error}</p>
                        </div>
                    ) : (
                        <>
                            <div className="blogs-grid">
                                {blogs.map((blog, index) => (
                                    <motion.div
                                        key={blog._id}
                                        className="blog-card glass-card"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link to={`/blog/${blog.slug}`} className="blog-link">
                                            <div className="blog-cover">
                                                {blog.coverImage ? (
                                                    <img
                                                        src={`http://localhost:5000${blog.coverImage}`}
                                                        alt={blog.title}
                                                        className="blog-cover-image"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            e.currentTarget.parentElement!.classList.add('no-image');
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="blog-cover-placeholder">
                                                        <span>{blog.title.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="blog-content">
                                                <h3 className="blog-title">{blog.title}</h3>

                                                <p className="blog-excerpt">{blog.excerpt}</p>

                                                <div className="blog-meta">
                                                    <span className="meta-item">
                                                        <Calendar size={16} />
                                                        {formatDate(blog.createdAt)}
                                                    </span>
                                                    <span className="meta-item">
                                                        <Clock size={16} />
                                                        {blog.views} views
                                                    </span>
                                                </div>

                                                {blog.tags && blog.tags.length > 0 && (
                                                    <div className="blog-tags">
                                                        <Tag size={14} />
                                                        {blog.tags.slice(0, 3).map((tag) => (
                                                            <span key={tag} className="tag">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                    <span className="pagination-info">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Blogs;
