---
phase: 03-seo
plan: 01
type: execute
wave: 1
depends_on: [03-02]
files_modified: [index.html]
files_created: [robots.txt, sitemap.xml, favicon.svg]
autonomous: true
requirements: [SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08]

must_haves:
  truths:
    - "<title> is specific and differentiating, not just 'QR Code Generator'"
    - "<meta name='description'> is present and under 160 characters"
    - "<link rel='canonical'> points to https://no-bs-qr-codes.pages.dev"
    - "Open Graph tags og:title, og:description, og:url, og:type are present"
    - "JSON-LD script tag marks the page as a WebApplication schema"
    - "robots.txt exists at the root and allows all crawlers"
    - "sitemap.xml exists at the root and lists the canonical URL"
    - "favicon.svg exists and is linked from <head>"
    - "All existing <head> content (FOUC script, stylesheet, fonts, CDN) is preserved"
  artifacts:
    - path: "index.html"
      provides: "Updated <head> with title, meta description, canonical, OG tags, JSON-LD, favicon link"
    - path: "robots.txt"
      provides: "Crawler instructions pointing to sitemap"
    - path: "sitemap.xml"
      provides: "Single-URL sitemap for the production page"
    - path: "favicon.svg"
      provides: "Indigo QR-themed SVG favicon for browser tabs and search results"

key-decisions:
  - "Title format: 'No BS QR Code Generator — Free, No Ads, No Sign-Up'"
  - "Description emphasizes the differentiator (no ads/sign-up) and key features"
  - "og:image is skipped for now — no PNG asset exists; add in v2 with a real screenshot"
  - "SVG favicon used (no ICO) — supported by all modern browsers and simpler to author"
  - "JSON-LD uses WebApplication schema with free Offer to signal a free tool to Google"
  - "Sitemap uses lastmod date of the most recent deploy"
---

<objective>
Add all on-page and file-level SEO signals so Google and other search engines can discover,
understand, and correctly represent the app in search results.

Purpose: Get the app to appear when people search for "QR code generator", "free QR code maker",
"WiFi QR code", etc.
Output: Updated index.html head, plus robots.txt, sitemap.xml, and favicon.svg.
</objective>

<context>
Production URL: https://no-bs-qr-codes.pages.dev
App name: No BS QR Code Generator
Tagline: No ads. No sign up. No limits. No BS.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create favicon.svg</name>
  <files>favicon.svg</files>
  <action>
Create `favicon.svg` in the project root with an indigo QR-themed icon:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#4f46e5"/>
  <!-- top-left finder -->
  <rect x="4" y="4" width="10" height="10" rx="2" fill="white"/>
  <rect x="6" y="6" width="6" height="6" rx="1" fill="#4f46e5"/>
  <!-- top-right finder -->
  <rect x="18" y="4" width="10" height="10" rx="2" fill="white"/>
  <rect x="20" y="6" width="6" height="6" rx="1" fill="#4f46e5"/>
  <!-- bottom-left finder -->
  <rect x="4" y="18" width="10" height="10" rx="2" fill="white"/>
  <rect x="6" y="20" width="6" height="6" rx="1" fill="#4f46e5"/>
  <!-- bottom-right data dots -->
  <rect x="18" y="18" width="4" height="4" rx="1" fill="white"/>
  <rect x="24" y="18" width="4" height="4" rx="1" fill="white"/>
  <rect x="18" y="24" width="4" height="4" rx="1" fill="white"/>
  <rect x="24" y="24" width="4" height="4" rx="1" fill="white"/>
</svg>
```
  </action>
  <acceptance_criteria>
    - favicon.svg exists in the project root
    - Uses indigo (#4f46e5) background with white QR finder pattern
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Create robots.txt</name>
  <files>robots.txt</files>
  <action>
Create `robots.txt` in the project root:

```
User-agent: *
Allow: /

Sitemap: https://no-bs-qr-codes.pages.dev/sitemap.xml
```
  </action>
  <acceptance_criteria>
    - robots.txt exists in the project root
    - Allows all crawlers
    - Points to the sitemap URL
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Create sitemap.xml</name>
  <files>sitemap.xml</files>
  <action>
Create `sitemap.xml` in the project root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://no-bs-qr-codes.pages.dev/</loc>
    <lastmod>2026-04-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```
  </action>
  <acceptance_criteria>
    - sitemap.xml exists in the project root
    - Contains the production URL with today's date as lastmod
    - Valid XML sitemap format
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Update index.html head — title, meta, canonical, OG, JSON-LD, favicon</name>
  <files>index.html</files>
  <read_first>index.html</read_first>
  <action>
Update the `<head>` section of index.html. Preserve ALL existing content. Only add or replace as specified.

1. Replace the `<title>`:
```html
<title>No BS QR Code Generator — Free, No Ads, No Sign-Up</title>
```

2. After `<meta name="viewport">`, add:
```html
  <meta name="description" content="Generate styled QR codes for URLs and WiFi networks in seconds. Customize dot shape, corners, colors, and logo. Download as PNG or SVG. No ads. No sign-up. No BS.">
  <link rel="canonical" href="https://no-bs-qr-codes.pages.dev/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://no-bs-qr-codes.pages.dev/">
  <meta property="og:title" content="No BS QR Code Generator — Free, No Ads, No Sign-Up">
  <meta property="og:description" content="Generate styled QR codes for URLs and WiFi networks in seconds. Customize dot shape, corners, colors, and logo. Download as PNG or SVG. No ads. No sign-up. No BS.">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- Structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "No BS QR Code Generator",
    "url": "https://no-bs-qr-codes.pages.dev/",
    "description": "Generate styled QR codes for URLs and WiFi networks in seconds. No ads. No sign-up. No BS.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
```
  </action>
  <acceptance_criteria>
    - <title> reads "No BS QR Code Generator — Free, No Ads, No Sign-Up"
    - <meta name="description"> is present and under 160 characters
    - <link rel="canonical"> points to the production URL
    - Four og: meta properties are present (og:type, og:url, og:title, og:description)
    - <link rel="icon"> references /favicon.svg
    - JSON-LD script tag is present with WebApplication type and free Offer
    - FOUC fix script, stylesheet, fonts, and CDN script are all unchanged
  </acceptance_criteria>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5: Verify SEO tags and files</name>
  <what-built>Meta description, canonical URL, Open Graph tags, JSON-LD, robots.txt, sitemap.xml, SVG favicon.</what-built>
  <how-to-verify>
    1. Open index.html in a browser — favicon should appear in the browser tab
    2. View page source — verify all new tags are in <head>
    3. Open https://no-bs-qr-codes.pages.dev/robots.txt after deploy — should return the robots.txt content
    4. Open https://no-bs-qr-codes.pages.dev/sitemap.xml after deploy — should return valid XML
    5. Optional: paste the URL into https://search.google.com/test/rich-results to validate JSON-LD
    6. Optional: paste the URL into https://opengraph.xyz to preview OG tags
  </how-to-verify>
  <resume-signal>Type "approved" or describe any issues</resume-signal>
</task>

</tasks>

<post-deploy-actions>
These are manual actions to take after deploying to Cloudflare Pages:

1. **Google Search Console** — Go to https://search.google.com/search-console
   - Add property: URL prefix → https://no-bs-qr-codes.pages.dev/
   - Verify ownership via HTML meta tag (add <meta name="google-site-verification" content="..."> to <head>)
   - Submit sitemap: https://no-bs-qr-codes.pages.dev/sitemap.xml
   - Request indexing: URL Inspection → enter URL → Request Indexing

2. **Bing Webmaster Tools** (optional) — https://www.bing.com/webmasters
   - Can import from Google Search Console directly

Note: First-time indexing typically takes 1–4 weeks. Search Console will show when Google first crawled the page.
</post-deploy-actions>

<success_criteria>
- All on-page SEO signals are present in index.html
- robots.txt and sitemap.xml are accessible at the root
- Favicon appears in browser tab
- Site is ready to submit to Google Search Console
</success_criteria>

<output>
After completion, create `.planning/phases/03-seo/03-seo-01-SUMMARY.md`
</output>
