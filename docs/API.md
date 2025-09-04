# API Documentation

This document provides comprehensive documentation for all public APIs in the tanyanxi.github.io project.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [API Endpoints](#api-endpoints)
- [JavaScript API](#javascript-api)
- [Examples](#examples)
- [SDK](#sdk)

## 🔍 Overview

Currently, this project is a static website and doesn't expose any REST APIs. This documentation serves as a template for future API implementations.

As the project evolves to include dynamic features, APIs will be documented here following industry best practices.

## 🔐 Authentication

*Future implementation*

When authentication is implemented, it will likely use one of these methods:

### API Key Authentication
```http
Authorization: Bearer YOUR_API_KEY
```

### OAuth 2.0
```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 🌐 Base URL

```
Production: https://api.tanyanxi.github.io/v1
Development: http://localhost:3000/api/v1
```

## 📄 Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## ⚠️ Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid request parameters |
| 401  | Unauthorized - Authentication required |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource not found |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error - Server error |

### Common Error Codes

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `INVALID_REQUEST` | Request format is invalid | Check request format and required fields |
| `UNAUTHORIZED` | Authentication failed | Verify API key or access token |
| `RATE_LIMIT_EXCEEDED` | Too many requests | Wait before making more requests |
| `RESOURCE_NOT_FOUND` | Requested resource doesn't exist | Check resource ID or path |

## 🚦 Rate Limiting

*Future implementation*

API rate limits will be implemented to ensure fair usage:

- **Free tier**: 100 requests per hour
- **Premium tier**: 1000 requests per hour

Rate limit headers will be included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
```

## 🛠 API Endpoints

### User Management

#### Get User Profile
```http
GET /users/{userId}
```

**Parameters:**
- `userId` (string, required): Unique user identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update User Profile
```http
PUT /users/{userId}
```

**Parameters:**
- `userId` (string, required): Unique user identifier

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Software developer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Software developer",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Content Management

#### Get Posts
```http
GET /posts
```

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 10, max: 100)
- `category` (string, optional): Filter by category
- `sort` (string, optional): Sort order (`created_desc`, `created_asc`, `title_asc`, `title_desc`)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post123",
        "title": "Sample Post",
        "content": "Post content...",
        "category": "technology",
        "createdAt": "2024-01-15T10:30:00Z",
        "author": {
          "id": "user123",
          "name": "John Doe"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### Create Post
```http
POST /posts
```

**Request Body:**
```json
{
  "title": "New Post Title",
  "content": "Post content here...",
  "category": "technology",
  "tags": ["javascript", "web-development"],
  "published": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "post456",
    "title": "New Post Title",
    "content": "Post content here...",
    "category": "technology",
    "tags": ["javascript", "web-development"],
    "published": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "author": {
      "id": "user123",
      "name": "John Doe"
    }
  }
}
```

## 💻 JavaScript API

For client-side applications, a JavaScript SDK will be available:

### Installation
```bash
npm install @tanyanxi/api-client
```

### Basic Usage
```javascript
import { ApiClient } from '@tanyanxi/api-client';

const client = new ApiClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.tanyanxi.github.io/v1'
});

// Get user profile
try {
  const user = await client.users.get('user123');
  console.log(user.data);
} catch (error) {
  console.error('Error:', error.message);
}

// Create a post
try {
  const post = await client.posts.create({
    title: 'My New Post',
    content: 'This is the content of my post.',
    category: 'technology'
  });
  console.log('Post created:', post.data.id);
} catch (error) {
  console.error('Error creating post:', error.message);
}
```

### Advanced Usage
```javascript
// Using pagination
const posts = await client.posts.list({
  page: 1,
  limit: 20,
  category: 'technology',
  sort: 'created_desc'
});

// Error handling with detailed information
try {
  await client.users.update('user123', { name: 'New Name' });
} catch (error) {
  if (error.code === 'UNAUTHORIZED') {
    // Handle authentication error
    console.log('Please log in again');
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Handle rate limiting
    console.log('Too many requests, please wait');
  } else {
    console.error('Unexpected error:', error.message);
  }
}

// Using callbacks (alternative to promises)
client.users.get('user123', (error, user) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('User:', user.data);
});
```

## 📚 Examples

### Complete Example: Blog Integration

```html
<!DOCTYPE html>
<html>
<head>
    <title>Blog Integration Example</title>
    <script src="https://cdn.jsdelivr.net/npm/@tanyanxi/api-client@1.0.0/dist/api-client.min.js"></script>
</head>
<body>
    <div id="posts-container"></div>
    
    <script>
        const client = new TanyaAPI.ApiClient({
            apiKey: 'your-api-key'
        });
        
        async function loadPosts() {
            try {
                const response = await client.posts.list({
                    limit: 5,
                    sort: 'created_desc'
                });
                
                const container = document.getElementById('posts-container');
                container.innerHTML = response.data.posts.map(post => `
                    <article>
                        <h2>${post.title}</h2>
                        <p>${post.content.substring(0, 200)}...</p>
                        <small>By ${post.author.name} on ${new Date(post.createdAt).toLocaleDateString()}</small>
                    </article>
                `).join('');
            } catch (error) {
                console.error('Failed to load posts:', error);
                document.getElementById('posts-container').innerHTML = 
                    '<p>Failed to load posts. Please try again later.</p>';
            }
        }
        
        // Load posts when page loads
        document.addEventListener('DOMContentLoaded', loadPosts);
    </script>
</body>
</html>
```

### Node.js Server Example

```javascript
const express = require('express');
const { ApiClient } = require('@tanyanxi/api-client');

const app = express();
const client = new ApiClient({
    apiKey: process.env.API_KEY
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await client.posts.list({
            page: req.query.page || 1,
            limit: req.query.limit || 10
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch posts',
            message: error.message
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## 🛠 SDK

### JavaScript/TypeScript SDK

The official SDK provides type-safe access to all API endpoints:

```typescript
import { ApiClient, User, Post, CreatePostRequest } from '@tanyanxi/api-client';

const client = new ApiClient({
    apiKey: 'your-api-key'
});

// TypeScript support with full type checking
const user: User = await client.users.get('user123');
const posts: Post[] = await client.posts.list();

const newPost: CreatePostRequest = {
    title: 'My Post',
    content: 'Content here',
    category: 'technology'
};

const createdPost: Post = await client.posts.create(newPost);
```

### Python SDK (Future)

```python
from tanya_api import ApiClient

client = ApiClient(api_key='your-api-key')

# Get user
user = client.users.get('user123')
print(f"User: {user.name}")

# Create post
post = client.posts.create({
    'title': 'My Python Post',
    'content': 'Content from Python',
    'category': 'python'
})
print(f"Created post: {post.id}")
```

## 🔄 Webhooks (Future Implementation)

Webhooks will allow you to receive real-time notifications:

### Available Events
- `user.created`
- `user.updated`
- `post.created`
- `post.updated`
- `post.deleted`

### Webhook Payload Example
```json
{
  "event": "post.created",
  "data": {
    "id": "post123",
    "title": "New Post",
    "author": {
      "id": "user123",
      "name": "John Doe"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 📝 Changelog

### Version 1.0.0 (Future)
- Initial API release
- User management endpoints
- Post management endpoints
- Authentication system
- Rate limiting

---

*This API documentation is automatically updated with each release. For questions or support, please open an issue on GitHub.*