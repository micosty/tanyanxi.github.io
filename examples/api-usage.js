/**
 * API Usage Examples for tanyanxi.github.io
 * 
 * This file demonstrates how to use the project's APIs
 * when they are implemented in the future.
 */

// Example API Client Class
class ApiClient {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || 'https://api.tanyanxi.github.io/v1';
        this.apiKey = options.apiKey;
        this.timeout = options.timeout || 10000;
        
        // Initialize API endpoints
        this.users = new UserAPI(this);
        this.posts = new PostAPI(this);
        this.auth = new AuthAPI(this);
    }
    
    /**
     * Makes an HTTP request to the API
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Request options
     * @returns {Promise<Object>} API response
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
                ...options.headers
            },
            ...options
        };
        
        if (config.method !== 'GET' && options.data) {
            config.body = JSON.stringify(options.data);
        }
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);
            
            const response = await fetch(url, {
                ...config,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    await response.json().catch(() => null)
                );
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new ApiError('Request timeout', 408);
            }
            throw error;
        }
    }
}

// Custom Error Class for API errors
class ApiError extends Error {
    constructor(message, status, details = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

// User API endpoints
class UserAPI {
    constructor(client) {
        this.client = client;
    }
    
    /**
     * Get user profile by ID
     * @param {string} userId - User ID
     * @returns {Promise<Object>} User data
     */
    async get(userId) {
        return this.client.request(`/users/${userId}`);
    }
    
    /**
     * Update user profile
     * @param {string} userId - User ID
     * @param {Object} userData - User data to update
     * @returns {Promise<Object>} Updated user data
     */
    async update(userId, userData) {
        return this.client.request(`/users/${userId}`, {
            method: 'PUT',
            data: userData
        });
    }
    
    /**
     * Get current user profile
     * @returns {Promise<Object>} Current user data
     */
    async me() {
        return this.client.request('/users/me');
    }
    
    /**
     * Upload user avatar
     * @param {string} userId - User ID
     * @param {File} file - Avatar file
     * @returns {Promise<Object>} Upload response
     */
    async uploadAvatar(userId, file) {
        const formData = new FormData();
        formData.append('avatar', file);
        
        return this.client.request(`/users/${userId}/avatar`, {
            method: 'POST',
            headers: {}, // Let browser set Content-Type for FormData
            body: formData
        });
    }
}

// Post API endpoints
class PostAPI {
    constructor(client) {
        this.client = client;
    }
    
    /**
     * Get all posts with pagination
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} Posts with pagination info
     */
    async list(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/posts${queryString ? `?${queryString}` : ''}`;
        return this.client.request(endpoint);
    }
    
    /**
     * Get post by ID
     * @param {string} postId - Post ID
     * @returns {Promise<Object>} Post data
     */
    async get(postId) {
        return this.client.request(`/posts/${postId}`);
    }
    
    /**
     * Create new post
     * @param {Object} postData - Post data
     * @returns {Promise<Object>} Created post
     */
    async create(postData) {
        return this.client.request('/posts', {
            method: 'POST',
            data: postData
        });
    }
    
    /**
     * Update existing post
     * @param {string} postId - Post ID
     * @param {Object} postData - Post data to update
     * @returns {Promise<Object>} Updated post
     */
    async update(postId, postData) {
        return this.client.request(`/posts/${postId}`, {
            method: 'PUT',
            data: postData
        });
    }
    
    /**
     * Delete post
     * @param {string} postId - Post ID
     * @returns {Promise<Object>} Deletion response
     */
    async delete(postId) {
        return this.client.request(`/posts/${postId}`, {
            method: 'DELETE'
        });
    }
    
    /**
     * Search posts
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     * @returns {Promise<Object>} Search results
     */
    async search(query, filters = {}) {
        return this.client.request('/posts/search', {
            method: 'POST',
            data: { query, ...filters }
        });
    }
}

// Authentication API endpoints
class AuthAPI {
    constructor(client) {
        this.client = client;
    }
    
    /**
     * Login with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} Authentication response
     */
    async login(email, password) {
        const response = await this.client.request('/auth/login', {
            method: 'POST',
            data: { email, password }
        });
        
        // Store the token
        if (response.data.token) {
            this.client.apiKey = response.data.token;
            localStorage.setItem('api_token', response.data.token);
        }
        
        return response;
    }
    
    /**
     * Logout current user
     * @returns {Promise<Object>} Logout response
     */
    async logout() {
        const response = await this.client.request('/auth/logout', {
            method: 'POST'
        });
        
        // Clear stored token
        this.client.apiKey = null;
        localStorage.removeItem('api_token');
        
        return response;
    }
    
    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Registration response
     */
    async register(userData) {
        return this.client.request('/auth/register', {
            method: 'POST',
            data: userData
        });
    }
    
    /**
     * Refresh authentication token
     * @returns {Promise<Object>} New token response
     */
    async refresh() {
        const response = await this.client.request('/auth/refresh', {
            method: 'POST'
        });
        
        if (response.data.token) {
            this.client.apiKey = response.data.token;
            localStorage.setItem('api_token', response.data.token);
        }
        
        return response;
    }
}

// Usage Examples

/**
 * Example 1: Basic API Client Setup
 */
const setupApiClient = () => {
    // Initialize API client
    const client = new ApiClient({
        baseUrl: 'https://api.tanyanxi.github.io/v1',
        apiKey: localStorage.getItem('api_token'),
        timeout: 15000
    });
    
    return client;
};

/**
 * Example 2: User Management
 */
const userManagementExample = async () => {
    const client = setupApiClient();
    
    try {
        // Get current user
        const currentUser = await client.users.me();
        console.log('Current user:', currentUser.data);
        
        // Update user profile
        const updatedUser = await client.users.update(currentUser.data.id, {
            name: 'John Doe Updated',
            bio: 'Full-stack developer with 5+ years experience'
        });
        console.log('Updated user:', updatedUser.data);
        
        // Upload avatar
        const fileInput = document.getElementById('avatar-upload');
        if (fileInput.files[0]) {
            const avatarResponse = await client.users.uploadAvatar(
                currentUser.data.id,
                fileInput.files[0]
            );
            console.log('Avatar uploaded:', avatarResponse.data);
        }
        
    } catch (error) {
        console.error('User management error:', error);
        
        if (error instanceof ApiError) {
            if (error.status === 401) {
                // Handle unauthorized access
                console.log('User not authenticated, redirecting to login...');
                window.location.href = '/login';
            } else if (error.status === 429) {
                // Handle rate limiting
                console.log('Rate limit exceeded, please wait...');
            }
        }
    }
};

/**
 * Example 3: Blog Post Management
 */
const blogPostExample = async () => {
    const client = setupApiClient();
    
    try {
        // Get all posts with pagination
        const posts = await client.posts.list({
            page: 1,
            limit: 10,
            category: 'technology',
            sort: 'created_desc'
        });
        console.log('Posts:', posts.data);
        
        // Create new post
        const newPost = await client.posts.create({
            title: 'My New Blog Post',
            content: 'This is the content of my new blog post...',
            category: 'technology',
            tags: ['javascript', 'web-development', 'api'],
            published: true
        });
        console.log('Created post:', newPost.data);
        
        // Update the post
        const updatedPost = await client.posts.update(newPost.data.id, {
            title: 'My Updated Blog Post',
            content: 'This is the updated content...'
        });
        console.log('Updated post:', updatedPost.data);
        
        // Search posts
        const searchResults = await client.posts.search('javascript', {
            category: 'technology',
            dateRange: {
                from: '2024-01-01',
                to: '2024-12-31'
            }
        });
        console.log('Search results:', searchResults.data);
        
    } catch (error) {
        console.error('Blog post error:', error);
    }
};

/**
 * Example 4: Authentication Flow
 */
const authenticationExample = async () => {
    const client = setupApiClient();
    
    try {
        // Register new user
        const registration = await client.auth.register({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securePassword123',
            confirmPassword: 'securePassword123'
        });
        console.log('Registration successful:', registration.data);
        
        // Login
        const login = await client.auth.login('john@example.com', 'securePassword123');
        console.log('Login successful:', login.data);
        
        // The API key is automatically set after login
        console.log('API client now authenticated');
        
        // Refresh token (typically done automatically)
        const refreshed = await client.auth.refresh();
        console.log('Token refreshed:', refreshed.data);
        
        // Logout
        await client.auth.logout();
        console.log('Logout successful');
        
    } catch (error) {
        console.error('Authentication error:', error);
        
        if (error.details && error.details.validationErrors) {
            console.log('Validation errors:', error.details.validationErrors);
        }
    }
};

/**
 * Example 5: Error Handling and Retry Logic
 */
const errorHandlingExample = async () => {
    const client = setupApiClient();
    
    const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await requestFn();
            } catch (error) {
                console.log(`Attempt ${attempt} failed:`, error.message);
                
                if (attempt === maxRetries) {
                    throw error;
                }
                
                // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
    };
    
    try {
        const posts = await retryRequest(() => client.posts.list());
        console.log('Posts loaded successfully:', posts.data);
    } catch (error) {
        console.error('Failed to load posts after retries:', error);
    }
};

/**
 * Example 6: Real-time Updates with WebSocket (Future Implementation)
 */
class WebSocketClient {
    constructor(url, apiKey) {
        this.url = url;
        this.apiKey = apiKey;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.listeners = new Map();
    }
    
    connect() {
        try {
            this.ws = new WebSocket(`${this.url}?token=${this.apiKey}`);
            
            this.ws.onopen = () => {
                console.log('WebSocket connected');
                this.reconnectAttempts = 0;
            };
            
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleMessage(data);
            };
            
            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                this.attemptReconnect();
            };
            
            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
            
        } catch (error) {
            console.error('Failed to connect WebSocket:', error);
        }
    }
    
    handleMessage(data) {
        const { event, payload } = data;
        const listeners = this.listeners.get(event) || [];
        
        listeners.forEach(callback => {
            try {
                callback(payload);
            } catch (error) {
                console.error('Error in event listener:', error);
            }
        });
    }
    
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    off(event, callback) {
        const listeners = this.listeners.get(event);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
    
    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                console.log(`Reconnect attempt ${this.reconnectAttempts}`);
                this.connect();
            }, this.reconnectDelay * this.reconnectAttempts);
        }
    }
    
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

/**
 * Example 7: Complete Application Integration
 */
const applicationIntegrationExample = () => {
    // Initialize clients
    const apiClient = setupApiClient();
    const wsClient = new WebSocketClient(
        'wss://api.tanyanxi.github.io/ws',
        apiClient.apiKey
    );
    
    // Set up real-time event handlers
    wsClient.on('post.created', (post) => {
        console.log('New post created:', post);
        // Update UI with new post
        updatePostsList(post);
    });
    
    wsClient.on('post.updated', (post) => {
        console.log('Post updated:', post);
        // Update UI with updated post
        updatePostInList(post);
    });
    
    wsClient.on('user.online', (user) => {
        console.log('User came online:', user);
        // Update online users list
        updateOnlineUsers(user);
    });
    
    // Connect WebSocket
    wsClient.connect();
    
    // Example UI update functions
    function updatePostsList(post) {
        const postsContainer = document.getElementById('posts-container');
        if (postsContainer) {
            const postElement = createPostElement(post);
            postsContainer.insertBefore(postElement, postsContainer.firstChild);
        }
    }
    
    function updatePostInList(post) {
        const existingPost = document.querySelector(`[data-post-id="${post.id}"]`);
        if (existingPost) {
            const updatedElement = createPostElement(post);
            existingPost.replaceWith(updatedElement);
        }
    }
    
    function updateOnlineUsers(user) {
        const onlineList = document.getElementById('online-users');
        if (onlineList) {
            const userElement = document.createElement('li');
            userElement.textContent = user.name;
            userElement.dataset.userId = user.id;
            onlineList.appendChild(userElement);
        }
    }
    
    function createPostElement(post) {
        const article = document.createElement('article');
        article.dataset.postId = post.id;
        article.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 200)}...</p>
            <small>By ${post.author.name} on ${new Date(post.createdAt).toLocaleDateString()}</small>
        `;
        return article;
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        wsClient.disconnect();
    });
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ApiClient,
        ApiError,
        WebSocketClient,
        setupApiClient,
        userManagementExample,
        blogPostExample,
        authenticationExample,
        errorHandlingExample,
        applicationIntegrationExample
    };
}

// Initialize examples when DOM is ready
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('API usage examples loaded!');
        
        // You can uncomment these to test the examples
        // userManagementExample();
        // blogPostExample();
        // authenticationExample();
        // errorHandlingExample();
        // applicationIntegrationExample();
    });
}