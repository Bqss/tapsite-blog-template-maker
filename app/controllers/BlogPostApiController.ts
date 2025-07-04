
import { Response, Request } from "../../type"; 
import { view } from "../services/View";

class Controller {

  public async index(request: Request, response: Response) {
    let limit = parseInt(String(request.query.limit || 6));
    if (limit > 100) limit = 100;
    const page = parseInt(String(request.query.page || 1));

    // Fake data
    const fakePosts = [
      {
        id: 1,
        title: "Getting Started with TypeScript",
        slug: "getting-started-with-typescript",
        excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
        category: "Programming",
        author: "John Doe",
        read_time: 5,
        featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 86400000
      },
      {
        id: 2,
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        excerpt: "Explore advanced patterns and techniques for building scalable React applications.",
        category: "React",
        author: "Jane Smith",
        read_time: 8,
        featured_image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 172800000
      },
      {
        id: 3,
        title: "Database Design Best Practices",
        slug: "database-design-best-practices",
        excerpt: "Learn how to design efficient and scalable database schemas.",
        category: "Database",
        author: "Mike Johnson",
        read_time: 12,
        featured_image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 259200000
      }
    ];

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = fakePosts.slice(startIndex, endIndex);

    return response.status(200).json({
      posts: paginatedPosts,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(fakePosts.length / limit),
        total_posts: fakePosts.length,
        per_page: limit
      }
    });
  }

  public async category(request: Request, response: Response) {
     let { name } = request.params;
     let limit = parseInt(String(request.query.limit || 10));
     if (limit > 100) limit = 100;

     name = decodeURIComponent(name);

     // Fake data filtered by category
     const allPosts = [
       {
         id: 1,
         title: "Getting Started with TypeScript",
         slug: "getting-started-with-typescript",
         excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
         category: "Programming",
         author: "John Doe",
         read_time: 5,
         featured_image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
         published_at: Date.now() - 86400000
       },
       {
         id: 2,
         title: "Advanced React Patterns",
         slug: "advanced-react-patterns",
         excerpt: "Explore advanced patterns and techniques for building scalable React applications.",
         category: "React",
         author: "Jane Smith",
         read_time: 8,
         featured_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
         published_at: Date.now() - 172800000
       }
     ];

     const filteredPosts = allPosts.filter(post => post.category.toLowerCase() === name.toLowerCase()).slice(0, limit);

     return response.status(200).json(filteredPosts);
   }

  public async tag(request: Request, response: Response) {
     let { name } = request.params;
     let limit = parseInt(String(request.query.limit || 10));
     if (limit > 100) limit = 100;
     const page = parseInt(String(request.query.page || 1));

     name = decodeURIComponent(name);

     // Fake data for posts with tags
     const fakePosts = [
       {
         id: 1,
         title: "Getting Started with TypeScript",
         slug: "getting-started-with-typescript",
         excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
         category: "Programming",
         author: "John Doe",
         read_time: 5,
         featured_image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
         published_at: Date.now() - 86400000
       },
       {
         id: 2,
         title: "Advanced React Patterns",
         slug: "advanced-react-patterns",
         excerpt: "Explore advanced patterns and techniques for building scalable React applications.",
         category: "React",
         author: "Jane Smith",
         read_time: 8,
         featured_image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 172800000
      }
     ];

     const startIndex = (page - 1) * limit;
     const endIndex = startIndex + limit;
     const paginatedPosts = fakePosts.slice(startIndex, endIndex);

     return response.json(paginatedPosts);
   }

  public async show(request: Request, response: Response) {
    const { slug } = request.params;

    // Fake post data
    const fakePosts = {
      "getting-started-with-typescript": {
        id: 1,
        title: "Getting Started with TypeScript",
        slug: "getting-started-with-typescript",
        excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
        content: "<p>TypeScript is a powerful superset of JavaScript that adds static typing...</p>",
        category: "Programming",
        author: "John Doe",
        read_time: 5,
        featured_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 86400000,
        view_count: 150,
        status: "published"
      },
      "advanced-react-patterns": {
        id: 2,
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        excerpt: "Explore advanced patterns and techniques for building scalable React applications.",
        content: "<p>React has evolved significantly over the years...</p>",
        category: "React",
        author: "Jane Smith",
        read_time: 8,
        featured_image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 172800000,
        view_count: 230,
        status: "published"
      }
    };

    const post = fakePosts[slug];

    if (!post) {
      return response.status(404).json({ error: 'Post not found' });
    }

    // Simulate incrementing view count
    post.view_count += 1;

    return response.status(200).json(post);
  }

  public async search(request: Request, response: Response) {
     const { query } = request.params;
     let limit = parseInt(String(request.query.limit || 50));
     if (limit > 100) limit = 100;

     // Fake search results
     const allPosts = [
       {
         id: 1,
         title: "Getting Started with TypeScript",
         slug: "getting-started-with-typescript",
         excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
         category: "Programming",
         author: "John Doe",
         read_time: 5,
         featured_image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
         published_at: Date.now() - 172800000
       },
       {
         id: 2,
         title: "Advanced React Patterns",
         slug: "advanced-react-patterns",
         excerpt: "Explore advanced patterns and techniques for building scalable React applications.",
         category: "React",
         author: "Jane Smith",
         read_time: 8,
         featured_image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
         published_at: Date.now() - 172800000
       }
     ];

     // Simple search simulation
     const searchResults = allPosts.filter(post => 
       post.title.toLowerCase().includes(query.toLowerCase()) || 
       post.excerpt.toLowerCase().includes(query.toLowerCase())
     ).slice(0, limit);

     return response.status(200).json(searchResults);
   }

  public async related(request: Request, response: Response) {
    const { slug } = request.params;
    let limit = parseInt(String(request.query.limit || 5));
    if (limit > 100) limit = 100;

    // Fake related posts data
    const relatedPosts = [
      {
        id: 3,
        title: "Database Design Best Practices",
        slug: "database-design-best-practices",
        excerpt: "Learn how to design efficient and scalable database schemas.",
        category: "Database",
        author: "Mike Johnson",
        read_time: 12,
        featured_image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 259200000
      },
      {
        id: 4,
        title: "Node.js Performance Optimization",
        slug: "nodejs-performance-optimization",
        excerpt: "Tips and tricks to optimize your Node.js applications for better performance.",
        category: "Programming",
        author: "Sarah Wilson",
        read_time: 7,
        featured_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 345600000
      }
    ];

    return response.status(200).json(relatedPosts.slice(0, limit));
  }

  public async trending(request: Request, response: Response) {
    let limit = parseInt(String(request.query.limit || 10));
    if (limit > 100) limit = 100;
    const days = parseInt(String(request.query.days || 7));

    // Fake trending posts data
    const trendingPosts = [
      {
        id: 2,
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        excerpt: "Explore advanced patterns and techniques for building scalable React applications.",
        category: "React",
        author: "Jane Smith",
        read_time: 8,
        featured_image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 172800000,
        view_count: 450
      },
      {
        id: 1,
        title: "Getting Started with TypeScript",
        slug: "getting-started-with-typescript",
        excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
        category: "Programming",
        author: "John Doe",
        read_time: 5,
        featured_image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 86400000,
        view_count: 320
      }
    ];

    return response.status(200).json(trendingPosts.slice(0, limit));
  }

  public async categories(request: Request, response: Response) {
    // Fake categories data
    const categories = [
      {
        name: "Programming",
        posts: 15,
        description: "Articles about programming languages, frameworks, and development practices."
      },
      {
        name: "React",
        posts: 8,
        description: "Everything about React.js, hooks, patterns, and best practices."
      },
      {
        name: "Database",
        posts: 5,
        description: "Database design, optimization, and management techniques."
      }
    ];

    return response.status(200).json(categories);
  }

  public async getCategory(request: Request, response: Response)
  {
    const { name } = request.params;

    // Fake category data
    const categories = {
      "Programming": {
        name: "Programming",
        posts: 15,
        description: "Articles about programming languages, frameworks, and development practices."
      },
      "React": {
        name: "React",
        posts: 8,
        description: "Everything about React.js, hooks, patterns, and best practices."
      },
      "Database": {
        name: "Database",
        posts: 5,
        description: "Database design, optimization, and management techniques."
      }
    };

    const category = categories[name];

    return response.status(200).json(category || null);
  }

  public async tags(request: Request, response: Response) {
    // Fake tags data
    const tags = [
      "typescript",
      "javascript",
      "react",
      "nodejs",
      "database",
      "programming",
      "web-development",
      "frontend",
      "backend"
    ];

    return response.status(200).json(tags);
  }

  public async relatedTags(request: Request, response: Response)
  {
    const { slug } = request.params;
    
    // Fake related tags data
    const relatedTags = [
      "typescript",
      "javascript",
      "programming",
      "web-development",
      "frontend"
    ];

    return response.status(200).json(relatedTags);
  }

  public async recent(request: Request, response: Response) {
     let limit = parseInt(String(request.query.limit || 5));
     if (limit > 100) limit = 100;

    // Fake recent posts data
    const recentPosts = [
      {
        id: 1,
        title: "Getting Started with TypeScript",
        slug: "getting-started-with-typescript",
        excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
        category: "Programming",
        author: "John Doe",
        read_time: 5,
        featured_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 86400000
      },
      {
        id: 2,
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        excerpt: "Learn advanced React patterns for better code organization.",
        category: "React",
        author: "Jane Smith",
        read_time: 8,
        featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 172800000
      },
      {
        id: 3,
        title: "Database Design Best Practices",
        slug: "database-design-best-practices",
        excerpt: "Learn how to design efficient and scalable database schemas.",
        category: "Database",
        author: "Mike Johnson",
        read_time: 12,
        featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 259200000
      }
    ];

    return response.status(200).json(recentPosts.slice(0, limit));
  }

  public async popular(request: Request, response: Response) {
     let limit = parseInt(String(request.query.limit || 5));
     if (limit > 100) limit = 100;

    // Fake popular posts data
    const popularPosts = [
      {
        id: 2,
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        excerpt: "Explore advanced patterns and techniques for building scalable React applications.",
        category: "React",
        author: "Jane Smith",
        read_time: 8,
        featured_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 172800000,
        view_count: 450
      },
      {
        id: 1,
        title: "Getting Started with TypeScript",
        slug: "getting-started-with-typescript",
        excerpt: "Learn the basics of TypeScript and how to integrate it into your projects.",
        category: "Programming",
        author: "John Doe",
        read_time: 5,
        featured_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 86400000,
        view_count: 320
      },
      {
        id: 3,
        title: "Database Design Best Practices",
        slug: "database-design-best-practices",
        excerpt: "Learn how to design efficient and scalable database schemas.",
        category: "Database",
        author: "Mike Johnson",
        read_time: 12,
        featured_image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        published_at: Date.now() - 259200000,
        view_count: 280
      }
    ];

    return response.status(200).json(popularPosts.slice(0, limit));
  }

  public async documentation(request: Request, response: Response) {
    return response.send(view("blog-documentation.html"))
  }

  public async documentationFile(request: Request, response: Response) {
    return response.download("BLOG_API_DOCUMENTATION.md");
  }

}

export default new Controller()
