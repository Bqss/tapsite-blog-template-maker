 
import { Response, Request } from "../../type"; 
import { view } from "../services/View";
import * as fs from 'fs';
import * as path from 'path';
import * as Sqrl from 'squirrelly' 

class Controller {



  public async thumbnail(request: Request, response: Response) {
    const { template_id, filename } = request.params;
    const screenshotPath = path.join(process.cwd(), 'resources', 'templates', template_id, filename);

    try {
      if (!fs.existsSync(screenshotPath)) {
        return response.status(404).send('Bukti transfer not found');
      }
 
      response.sendFile(screenshotPath);
    } catch (error) {
      console.error('Error serving bukti transfer:', error);
      response.status(500).send('Error serving bukti transfer');
    }
  }

  public async home(request: Request, response: Response) {
  
    let list_templates = fs.readdirSync(path.join(process.cwd(), 'resources', 'templates')).filter(item => item !== '.DS_Store');;
 
  
 

    const templates = list_templates.map((template) => {
      const templateJsonPath = path.join(process.cwd(), 'resources', 'templates', template, 'template.json');
      const templateData = JSON.parse(fs.readFileSync(templateJsonPath, 'utf8'));

      return {
        ...templateData,
        template_id: template
      }
    })
 
    return response.type("html").send(view("index.html", {
      templates,
    }))

  }

  public async preview(request: Request, response: Response) {
    const id = request.params.id;

    const page = request.params.page;

    const pagePath = path.join(process.cwd(), 'resources', 'templates', id, 'pages', page + '.html');

    const pageHTML = fs.readFileSync(pagePath, 'utf8');

    return response.type("html").send(view("content.html",{
      content: pageHTML,
      title: "Preview Page",
      head_script : ""
    }));

  }

  public async builder(request: Request, response: Response) {
    
    const id = request.params.id;

    const page = request.params.page;

   response.cookie("template_id", id,60000*60);
 

    switch(page)
    {
      case "home":
        { 
          return response.redirect("/blog")
        }
      case "post":
        return response.redirect("/post/slug_id")
       case "posts":
        return response.redirect("/posts")
       case "tag":
        return response.redirect("/tag/javascript")
      case "category":
      return response.redirect("/category/Programming")
        case "search":
        return response.redirect("/search/TypeScript")
      default:
        return response.send("404 Not Found");
    }

  }

  
  public async blogTag(request: Request, response: Response)
  { 
    // change with the id of the template
    const id = request.cookies.template_id || "bloghub";

    const page = "tag";

    return await RenderBuilder(id, page, response);
  }



  public async blogCategory(request: Request, response: Response)
  { 
    // change with the id of the template
    const id = request.cookies.template_id || "bloghub";

    const page = "category";

    return await RenderBuilder(id, page, response);
  }

  public async blogSearch(request: Request, response: Response)
  { 
    // change with the id of the template
    const id = request.cookies.template_id || "bloghub";

    const page = "search";

    return await RenderBuilder(id, page, response);
  }

  public async blogPost(request: Request, response: Response)
  { 
    // change with the id of the template
    const id = request.cookies.template_id || "bloghub";

    const page = "post";

    return await RenderBuilder(id, page, response);
  }

    public async blogPosts(request: Request, response: Response) {

       // change with the id of the template
    const id = request.cookies.template_id ||  "bloghub";

    const page = "posts";

    return await RenderBuilder(id, page, response);

    
  }
 

  public async blogHome(request: Request, response: Response) {

    // change with the id of the template

    const id = request.cookies.template_id ||  "bloghub";

    const page = "home";

    return await RenderBuilder(id, page, response);

    
  }
 
}

export default new Controller()


async function RenderBuilder(id, page, response)
{

   try {

      const pageJsonPath = path.join(process.cwd(), 'resources', 'templates', id, 'pages', page+'.json');
      const pageData = JSON.parse(fs.readFileSync(pageJsonPath, 'utf8'));

      const templateJsonPath = path.join(process.cwd(), 'resources', 'templates', id, 'template.json');
      const templateData = JSON.parse(fs.readFileSync(templateJsonPath, 'utf8'));


      let content = "";

      const dataJSON = path.join(process.cwd(), 'resources', 'templates', id, 'data.json');
      const sectionData = JSON.parse(fs.readFileSync(dataJSON, 'utf8'));


      for await (const section of pageData.sections) {


        const section_path = path.join(process.cwd(), 'resources', 'templates', id, 'sections', section.id + ".html");
        const section_html = fs.readFileSync(section_path, 'utf8');

        if (section.type == "html") {

          content += section_html;
        }

        if (section.type == "template") {

     

          content += Sqrl.render(section_html, {
            ...section,
            ...sectionData
          });


        }

      }
 


      return response.type("html").send(view("content.html", {
        content,
        title: templateData.title,
      }))

    } catch (error) {
      return response.send("404 Not Found");
    }
}