# Blog API Documentation

This document provides comprehensive documentation for all blog-related API endpoints in the TapSite application.

## Base URL

```
GET /api/blog/*
```

## Authentication

All endpoints are public and do not require authentication.

## Common Response Format

Most endpoints return data in the following format:

```json
{
  "posts": [...],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_posts": 25,
    "per_page": 6
  }
}
```

## Endpoints

### 1. Get All Blog Posts

**Endpoint:** `GET /api/blog/posts`

**Description:** Retrieves a paginated list of published blog posts.

**Query Parameters:**
- `limit` (optional, default: 6, max: 100) - Number of posts per page
- `page` (optional, default: 1) - Page number for pagination

**Response:**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Sample Blog Post",
      "slug": "sample-blog-post",
      "excerpt": "This is a sample excerpt...",
      "category": "Technology",
      "author": "John Doe",
      "read_time": 5,
      "featured_image": "image.jpg",
      "published_at": 1640995200000
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_posts": 25,
    "per_page": 6
  }
}
```

### 2. Get Single Blog Post

**Endpoint:** `GET /api/blog/posts/:slug`

**Description:** Retrieves a single blog post by its slug. Increments the view count.

**Parameters:**
- `slug` (required) - The unique slug identifier for the blog post

**Response:**
```json
{
  "id": 1,
  "title": "Sample Blog Post",
  "slug": "sample-blog-post",
  "content": "Full blog post content...",
  "excerpt": "This is a sample excerpt...",
  "category": "Technology",
  "author": "John Doe",
  "read_time": 5,
  "featured_image": "image.jpg",
  "tags": "tech,programming,web",
  "views": 150,
  "published_at": 1640995200000,
  "created_at": 1640995200000,
  "updated_at": 1640995200000
}
```

**Error Response (404):**
```json
{
  "error": "Post not found"
}
```

### 3. Get Posts by Category

**Endpoint:** `GET /api/blog/posts/category/:name`

**Description:** Retrieves paginated blog posts filtered by category.

**Parameters:**
- `name` (required) - The category name

**Query Parameters:**
- `limit` (optional, default: 10, max: 100) - Number of posts per page
- `page` (optional, default: 1) - Page number for pagination

**Response:** Same format as "Get All Blog Posts"

### 4. Get Posts by Tag

**Endpoint:** `GET /api/blog/posts/tag/:name`

**Description:** Retrieves paginated blog posts filtered by tag.

**Parameters:**
- `name` (required) - The tag name

**Query Parameters:**
- `limit` (optional, default: 10) - Number of posts per page
- `page` (optional, default: 1) - Page number for pagination


**Response:**
```json
[
  {
    "id": "0197befd-a58b-7-a4af-76163759406aa5d1",
    "title": "Mendidik Anak Tanpa Gadget: Mengembalikan Masa Kecil yang Sesungguhnya",
    "slug": "mendidik-anak-tanpa-gadget-mengembalikan-masa-kecil-yang-sesungguhnya",
    "excerpt": "Pelajari cara mendidik anak tanpa ketergantungan gadget. Temukan alternatif kegiatan seru dan edukatif untuk mendukung perkembangan anak secara holistik.",
    "category": "Parenting",
    "author": "Maulana Shalihin",
    "read_time": 8,
    "featured_image": "",
    "published_at": 1751349682012
  }
]
```

### 5. Search Blog Posts

**Endpoint:** `GET /api/blog/posts/search/:query`

**Description:** Searches blog posts by title, content, or excerpt.

**Parameters:**
- `query` (required) - The search query string

**Query Parameters:**
- `limit` (optional, default: 10) - Number of posts per page
- `page` (optional, default: 1) - Page number for pagination

**Response:**
```json
{
  "posts": [...],
  "query": "search term",
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_posts": 15,
    "per_page": 10
  }
}
```

### 6. Get Related Posts

**Endpoint:** `GET /api/blog/posts/related/:slug`

**Description:** Retrieves related blog posts based on the same category as the specified post.

**Parameters:**
- `slug` (required) - The slug of the reference post

**Query Parameters:**
- `limit` (optional, default: 5, max: 100) - Number of related posts to return

**Response:**
```json
[
  {
    "id": 2,
    "title": "Related Post 1",
    "slug": "related-post-1",
    "excerpt": "This is a related post...",
    "category": "Technology",
    "author": "Jane Smith",
    "read_time": 3,
    "featured_image": "related-image.jpg",
    "published_at": 1640995200000
  }
]
```

**Error Response (404):**
```json
{
  "error": "Post not found"
}
```

### 7. Get Trending Posts

**Endpoint:** `GET /api/blog/posts/trending`

**Description:** Retrieves trending blog posts based on views within a specified time period.

**Query Parameters:**
- `limit` (optional, default: 10, max: 100) - Number of trending posts to return
- `days` (optional, default: 7) - Number of days to look back for trending calculation

**Response:**
```json
[
  {
    "id": 1,
    "title": "Trending Post",
    "slug": "trending-post",
    "excerpt": "This post is trending...",
    "category": "Technology",
    "author": "John Doe",
    "read_time": 5,
    "featured_image": "trending-image.jpg",
    "published_at": 1640995200000,
    "views": 500
  }
]
```

### 8. Get Recent Posts

**Endpoint:** `GET /api/blog/posts/recent`

**Description:** Retrieves the most recently published blog posts.

**Query Parameters:**
- `limit` (optional, default: 5, max: 100) - Number of recent posts to return

**Response:**
```json
[
  {
    "id": 1,
    "title": "Recent Post",
    "slug": "recent-post",
    "excerpt": "This is a recent post...",
    "category": "Technology",
    "author": "John Doe",
    "read_time": 5,
    "featured_image": "recent-image.jpg",
    "published_at": 1640995200000
  }
]
```

### 9. Get Popular Posts

**Endpoint:** `GET /api/blog/posts/popular`

**Description:** Retrieves the most popular blog posts based on view count.

**Query Parameters:**
- `limit` (optional, default: 5, max: 100) - Number of popular posts to return

**Response:**
```json
[
  {
    "id": 1,
    "title": "Popular Post",
    "slug": "popular-post",
    "excerpt": "This is a popular post...",
    "category": "Technology",
    "author": "John Doe",
    "read_time": 5,
    "featured_image": "popular-image.jpg",
    "published_at": 1640995200000,
    "views": 1000
  }
]
```

### 10. Get All Categories

**Endpoint:** `GET /api/blog/categories`

**Description:** Retrieves all blog categories with post counts.

**Response:**
```json
[
  {
    "category": "Technology",
    "post_count": 15
  },
  {
    "category": "Business",
    "post_count": 8
  },
  {
    "category": "Design",
    "post_count": 5
  }
]
```

### 11. Get All Tags

**Endpoint:** `GET /api/blog/tags`

**Description:** Retrieves all blog tags.

**Response:**
```json
["AI",
"Anak",
"Ayah",
"Bisnis",
"Digitalisasi",
"Ekonomi",
"Indonesia",
"Kasih Sayang",
"Kebahagiaan",
"Keluarga",
"Parenting",
"Teknologi",
"UMKM",
"Waktu Berkualitas"]
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `404` - Resource not found
- `500` - Internal server error

## Notes

1. All timestamps are in Unix timestamp format (milliseconds)
2. The API automatically detects the workspace based on the request hostname
3. In development mode, the first workspace in the database is used
4. All endpoints only return published blog posts
5. View counts are automatically incremented when accessing individual posts
6. Pagination is available for most list endpoints
7. Search functionality covers title, content, and excerpt fields
8. Related posts are determined by matching category
9. Trending posts are calculated based on views within the specified time period
10. **Rate Limiting**: All `limit` parameters are capped at a maximum of 100 to prevent excessive resource usage

## Example Usage

### Get first page of blog posts
```bash
curl "https://yourdomain.com/api/blog/posts?limit=10&page=1"
```

### Search for posts about "javascript"
```bash
curl "https://yourdomain.com/api/blog/posts/search/javascript?limit=5"
```

### Get posts in "Technology" category
```bash
curl "https://yourdomain.com/api/blog/posts/category/Technology?page=1&limit=10"
```

### Get trending posts from last 30 days
```bash
curl "https://yourdomain.com/api/blog/posts/trending?days=30&limit=5"
```