import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API Services
export const blogService = {
    // Get all published blogs with pagination
    getBlogs: async (page = 1, limit = 10, search = '') => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        if (search) params.append('search', search);
        const response = await api.get(`/blogs?${params}`);
        return response.data;
    },

    // Get blog by slug
    getBlogBySlug: async (slug: string) => {
        const response = await api.get(`/blogs/${slug}`);
        return response.data;
    },
};

export const projectService = {
    // Get all projects
    getProjects: async (page = 1, limit = 10) => {
        const response = await api.get(`/projects?page=${page}&limit=${limit}`);
        return response.data;
    },

    // Get featured projects
    getFeaturedProjects: async () => {
        const response = await api.get('/projects/featured');
        return response.data;
    },
};

export const profileService = {
    // Get profile
    getProfile: async () => {
        const response = await api.get('/profile');
        return response.data;
    },
};

export default api;
