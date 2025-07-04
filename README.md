# TapSite.ai Template Maker

Template maker untuk TapSite.ai yang memungkinkan developer membuat template blog yang dapat dikustomisasi dengan mudah.

## 📁 Struktur Project

### Folder Penting

1. **`resources/templates/`** - Berisi semua template yang tersedia
2. **`routes/web.ts`** - Definisi route aplikasi
3. **`app/controllers/`** - Controller untuk menangani logika aplikasi
4. **`/blog-documentation`** - Dokumentasi API blog untuk integrasi template

## 🎨 Struktur Template

Setiap template memiliki struktur yang baku dan harus mengikuti konvensi berikut:

```
resources/templates/[template_id]/
├── template.json          # Metadata template
├── data.json             # Data seeder (fake data)
├── thumbnail.webp        # Preview thumbnail
├── pages/                # Halaman template
│   ├── home.html        # Preview halaman home
│   ├── home.json        # Struktur sections halaman home
│   ├── posts.html       # Preview halaman daftar post
│   ├── posts.json       # Struktur sections halaman posts
│   ├── post.html        # Preview halaman detail post
│   ├── post.json        # Struktur sections halaman post
│   ├── category.html    # Preview halaman kategori
│   ├── category.json    # Struktur sections halaman kategori
│   ├── tag.html         # Preview halaman tag
│   ├── tag.json         # Struktur sections halaman tag
│   ├── search.html      # Preview halaman pencarian
│   └── search.json      # Struktur sections halaman search
└── sections/            # Komponen HTML sections
    ├── navigation.html  # Section navigasi
    ├── hero.html        # Section hero
    ├── footer.html      # Section footer
    └── ...              # Section lainnya
```

## 📄 File Konfigurasi Template

### 1. template.json

File metadata yang berisi informasi dasar template:

```json
{
    "title": "Nama Template",
    "description": "Deskripsi template",
    "template_id": "template_id_unik",
    "creator_name": "Nama Pembuat",
    "creator_website": "https://website.com",
    "version": "1.0.0",
    "thumbnail": "/templates/template_id/thumbnail.webp"
}
```

### 2. data.json

File yang berisi data seeder untuk template. Contoh:

```json
{
    "blog_logo": "https://example.com/logo.png",
    "blog_title": "Blog Title",
    "navigation": [
        {
            "name": "Home",
            "url": "/"
        },
        {
            "name": "Blog",
            "url": "/blog"
        }
    ],
    "post": {
        "title": "Sample Post Title",
        "excerpt": "Sample excerpt...",
        "content": "<p>Full post content...</p>",
        "category": "Technology",
        "featured_image": "https://example.com/image.jpg",
        "author": "Author Name",
        "read_time": 5,
        "published_at": 1640995200000
    }
}
```

## 📑 Struktur Pages

Setiap halaman memiliki 2 file:

### 1. File HTML (.html)
File preview statis untuk menampilkan tampilan template.

### 2. File JSON (.json)
File konfigurasi yang mendefinisikan sections yang digunakan dalam halaman:

```json
{
  "sections": [
    {
      "title": "navigation",
      "id": "navigation",
      "type": "template",
      "resetable": true,
      "data": [
        "blog_title",
        "blog_logo",
        "navigation"
      ]
    },
    {
      "title": "hero",
      "id": "hero",
      "type": "html",
      "resetable": true
    }
  ]
}
```

### Properties Section:
- **`title`**: Nama section untuk display
- **`id`**: ID unik yang mengarah ke file HTML di folder sections (contoh: `navigation` → `sections/navigation.html`)
- **`type`**: 
  - `"html"` - Section statis tanpa templating
  - `"template"` - Section dengan templating menggunakan Squirrelly
- **`resetable`**: Boolean untuk menentukan apakah section bisa direset
- **`data`**: Array key dari data.json yang akan digunakan dalam templating (hanya untuk type "template")

## 🧩 Sections

Setiap section adalah file HTML yang dapat berupa:

### 1. Section Statis (type: "html")
HTML biasa tanpa templating:

```html
<section class="hero">
    <h1>Welcome to Our Blog</h1>
    <p>Static content here</p>
</section>
```

### 2. Section Template (type: "template")
HTML dengan Squirrelly templating syntax:

```html
<nav class="navigation">
    <a href="/blog" class="logo">
        {{@if(it.blog_logo)}}
        <img src="{{it.blog_logo}}" alt="{{it.blog_title}}">
        {{/if}}
        {{@if(it.blog_title)}}
        <span>{{it.blog_title}}</span>
        {{/if}}
    </a>
    <div class="nav-links">
        {{@each (it.navigation) => item}}
        <a href="{{item.url}}">{{item.name}}</a>
        {{/each}}
    </div>
</nav>
```

## 🔗 API Blog Integration

Template dapat mengintegrasikan data blog melalui API endpoints yang tersedia:

### Endpoints Utama:
- `GET /api/blog/posts` - Daftar semua post
- `GET /api/blog/posts/:slug` - Detail post
- `GET /api/blog/posts/category/:name` - Post berdasarkan kategori
- `GET /api/blog/posts/tag/:name` - Post berdasarkan tag
- `GET /api/blog/posts/search/:query` - Pencarian post
- `GET /api/blog/posts/trending` - Post trending
- `GET /api/blog/posts/recent` - Post terbaru
- `GET /api/blog/categories` - Daftar kategori
- `GET /api/blog/tags` - Daftar tag

Lihat dokumentasi lengkap di `/blog-documentation` atau `BLOG_API_DOCUMENTATION.md`

## 🚀 Cara Membuat Template Baru

### 1. Buat Folder Template
```bash
mkdir resources/templates/template_baru
```

### 2. Buat File Konfigurasi

**template.json:**
```json
{
    "title": "Template Baru",
    "description": "Deskripsi template baru",
    "template_id": "template_baru",
    "creator_name": "Nama Anda",
    "creator_website": "https://website-anda.com",
    "version": "1.0.0",
    "thumbnail": "/templates/template_baru/thumbnail.webp"
}
```

**data.json:**
```json
{
    "blog_title": "My Blog",
    "blog_logo": "https://example.com/logo.png",
    "navigation": [
        {"name": "Home", "url": "/"},
        {"name": "Blog", "url": "/blog"}
    ]
}
```

### 3. Buat Folder dan File Pages
```bash
mkdir resources/templates/template_baru/pages
mkdir resources/templates/template_baru/sections
```

Buat 6 halaman wajib:
- `home.html` & `home.json`
- `posts.html` & `posts.json`
- `post.html` & `post.json`
- `category.html` & `category.json`
- `tag.html` & `tag.json`
- `search.html` & `search.json`

### 4. Buat Sections
Buat file HTML untuk setiap section yang didefinisikan dalam file JSON pages.

### 5. Tambahkan Thumbnail
Tambahkan file `thumbnail.webp` untuk preview template.

## 🛠️ Development

### Menjalankan Server
```bash
npm run dev
```

### Testing Template
1. Akses `/` untuk melihat daftar template
2. Klik template untuk preview
3. Gunakan `/builder/:template_id/:page` untuk testing builder mode

### Preview URLs:
- Home: `/preview/:template_id/home`
- Posts: `/preview/:template_id/posts`
- Post: `/preview/:template_id/post`
- Category: `/preview/:template_id/category`
- Tag: `/preview/:template_id/tag`
- Search: `/preview/:template_id/search`

### Builder URLs:
- Home: `/builder/:template_id/home`
- Posts: `/builder/:template_id/posts`
- Post: `/builder/:template_id/post`
- Category: `/builder/:template_id/category`
- Tag: `/builder/:template_id/tag`
- Search: `/builder/:template_id/search`

## 📝 Best Practices

1. **Naming Convention**: Gunakan snake_case untuk ID template dan section
2. **Responsive Design**: Pastikan template responsive di semua device
3. **Performance**: Optimasi gambar dan CSS untuk loading yang cepat
4. **Accessibility**: Gunakan semantic HTML dan ARIA labels
5. **SEO Friendly**: Implementasikan meta tags dan structured data
6. **Consistent Styling**: Gunakan design system yang konsisten
7. **Error Handling**: Handle kasus ketika data tidak tersedia

## 🔧 Templating Engine

Project ini menggunakan **Squirrelly** sebagai templating engine. Syntax yang sering digunakan:

```html
<!-- Conditional -->
{{@if(it.variable)}}
    Content jika variable ada
{{/if}}

<!-- Loop -->
{{@each (it.array) => item}}
    <div>{{item.property}}</div>
{{/each}}

<!-- Variable -->
{{it.variable}}

<!-- Escaped HTML -->
{{it.html_content}}
```

## 📚 Resources

- [Squirrelly Documentation](https://squirrelly.js.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Blog API Documentation](/blog-documentation)

## 🤝 Contributing

1. Fork repository
2. Buat branch feature (`git checkout -b feature/template-baru`)
3. Commit changes (`git commit -am 'Add template baru'`)
4. Push ke branch (`git push origin feature/template-baru`)
5. Buat Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail.

---

**Happy templating! 🎨**