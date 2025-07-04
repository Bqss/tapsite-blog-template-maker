  
import HyperExpress from 'hyper-express';
import TemplateBlogController from '../app/controllers/TemplateBlogController';  
import BlogPostApiController from '../app/controllers/BlogPostApiController';
const Route = new HyperExpress.Router();
 

// Route.get("/", HomeController.index); 
Route.get("/",TemplateBlogController.home)
Route.get("/templates/:template_id/:filename",TemplateBlogController.thumbnail)
Route.get("/blog",TemplateBlogController.blogHome) 
Route.get("/posts",TemplateBlogController.blogPosts)
Route.get("/post/:slug",TemplateBlogController.blogPost)
Route.get("/tag/:name",TemplateBlogController.blogTag)
Route.get("/category/:name",TemplateBlogController.blogCategory)
Route.get("/search/:query",TemplateBlogController.blogSearch)

Route.get("/preview/:id/:page",TemplateBlogController.preview) 
Route.get("/builder/:id/:page",TemplateBlogController.builder) 

Route.get("/api/blog/posts",BlogPostApiController.index);
Route.get("/api/blog/posts/:slug",BlogPostApiController.show);
Route.get("/api/blog/posts/category/:name",BlogPostApiController.category);
Route.get("/api/blog/posts/tag/:name",BlogPostApiController.tag);
Route.get("/api/blog/posts/search/:query",BlogPostApiController.search);
Route.get("/api/blog/posts/related/:slug",BlogPostApiController.related);
Route.get("/api/blog/posts/trending",BlogPostApiController.trending);
Route.get("/api/blog/posts/recent",BlogPostApiController.recent);
Route.get("/api/blog/posts/popular",BlogPostApiController.popular);
Route.get("/api/blog/categories",BlogPostApiController.categories);
Route.get("/api/blog/categories/:name",BlogPostApiController.getCategory);
Route.get("/api/blog/tags",BlogPostApiController.tags);
Route.get("/api/blog/tags/related/:name",BlogPostApiController.relatedTags);

Route.get("/blog-documentation", BlogPostApiController.documentation ); 
Route.get("/BLOG_API_DOCUMENTATION.md", BlogPostApiController.documentationFile);


export default Route;