# Portfolio Backend API

Professional Node.js/Express backend for personal portfolio website with MongoDB, JWT authentication, and file uploads.

## Features

✅ **Authentication System**
- JWT-based authentication
- Bcrypt password hashing
- Protected routes with middleware
- Rate limiting on auth endpoints

✅ **User Profile Management**
- Get/Update profile information
- Avatar upload with Multer
- Social links management

✅ **Projects Portfolio**
- Full CRUD operations
- Pagination support
- Featured projects filtering
- Thumbnail image uploads

✅ **Blog System**
- Markdown content support
- Auto-generated slugs
- Tag-based filtering
- Full-text search
- Draft/Published status
- Cover image uploads
- View counter

✅ **Security**
- Helmet for security headers
- CORS enabled
- Input validation
- File type/size validation
- Rate limiting

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. **Start MongoDB:**
Make sure MongoDB is running on your system.

4. **Run the server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify JWT token (Protected)

### Profile
- `GET /api/profile` - Get profile (Public)
- `PUT /api/profile` - Update profile (Protected)
- `POST /api/profile/avatar` - Upload avatar (Protected)

### Projects
- `GET /api/projects` - Get all projects with pagination
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)
- `POST /api/projects/:id/thumbnail` - Upload thumbnail (Protected)

### Blogs
- `GET /api/blogs` - Get published blogs with pagination & search
- `GET /api/blogs/:slug` - Get blog by slug
- `GET /api/blogs/admin/all` - Get all blogs including drafts (Protected)
- `POST /api/blogs` - Create blog (Protected)
- `PUT /api/blogs/:id` - Update blog (Protected)
- `DELETE /api/blogs/:id` - Delete blog (Protected)
- `POST /api/blogs/:id/cover` - Upload cover image (Protected)

## Query Parameters

### Pagination
```
?page=1&limit=10
```

### Search (Blogs)
```
?search=react
```

### Filter by Tag (Blogs)
```
?tag=javascript
```

### Filter Featured (Projects)
```
?featured=true
```

## Request Examples

### 1. Register Admin User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Vinh Truong",
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

### 2. Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Vinh Truong",
    "email": "admin@example.com"
  }
}
```

### 3. Create Project (Protected)
```bash
POST /api/projects
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce with React and Node.js",
  "techStack": ["React", "Node.js", "MongoDB"],
  "liveDemoUrl": "https://demo.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": true
}
```

### 4. Upload Project Thumbnail
```bash
POST /api/projects/:id/thumbnail
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

thumbnail: [image file]
```

### 5. Create Blog Post
```bash
POST /api/blogs
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Getting Started with React",
  "content": "# Introduction\n\nReact is...",
  "excerpt": "Learn React basics",
  "tags": ["react", "javascript"],
  "published": true
}
```

## File Uploads

Supported image formats: jpg, jpeg, png, gif, webp
Max file size: 5MB

Files are stored in `/uploads/` directory and served statically at `/uploads/filename`

## Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Details..."]
}
```

## Development Notes

- The server uses ES modules (`"type": "module"` in package.json)
- MongoDB connection is handled automatically on server start
- Passswords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 7 days (configurable)
- Rate limiting: 5 login attempts per 15 minutes

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Blog.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── projectController.js
│   │   └── blogController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── projectRoutes.js
│   │   └── blogRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   └── server.js
├── uploads/
├── .env
├── .gitignore
└── package.json
```

## License

MIT
