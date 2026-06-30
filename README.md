# eQuran Journey — Premium Website (Revamp)

A fully redesigned, animated, professional static website for **eQuran Journey** (online Quran academy). Built with hand-crafted HTML, CSS and vanilla JavaScript — no build step required.

## ▶ How to run
Just open `index.html` in any browser. For correct routing/SEO, host the folder on any static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).

A quick local preview:
```
# from this folder
python -m http.server 8080
# then open http://localhost:8080
```

## 📁 Structure
```
index.html            Home
about.html            About Us
courses.html          All courses overview
noorani-qaida.html    Course: Noorani Qaida
quran-recitation.html Course: Quran Recitation (Nazra)
quran-translation.html Course: Translation & Tafseer
quran-memorization.html Course: Hifz / Memorization
advance-tajweed.html  Course: Advanced Tajweed
fee.html              Monthly fee / pricing plans
free-books.html       Free Islamic books & resources
blog.html             Blog
contact.html          Contact + free-trial form
faqs.html             Frequently asked questions
privacy-policy.html   Privacy policy
refund-policy.html    Refund / money-back policy
sitemap.xml, robots.txt
assets/
  css/style.css       Full design system + animations
  js/main.js          Interactions (nav, scroll reveal, counters, slider, FAQ, forms)
  js/partials.js      Shared header + footer (auto-injected on every page)
  images/             All images & the official logo (downloaded from the original site)
```

## ✏️ Things to update before going live
All in one place — edit `assets/js/partials.js`, the `CFG` object at the top:
- **phone / phoneRaw** — real phone number
- **whatsapp** — real WhatsApp number (also appears in a few page CTAs: search `wa.me/18000000000`)
- **email** — currently `info@equranjourney.com`
- **fb / tw / yt / ln / ig** — real social media URLs

### Google Ads / Analytics
Every page has a Google tag placeholder. Replace `G-XXXXXXXXXX` with your real Google Analytics / Google Ads conversion ID (one find-and-replace across all `.html` files). The site is already structured (semantic headings, meta descriptions, canonical tags, schema.org, fast static load) to score well for Google Ads quality and SEO.

## 🎨 Design
- Brand palette derived from the official logo: sky-blue + teal + navy, with a gold accent.
- Premium animations: scroll-reveal, animated counters, floating hero cards, testimonial slider, marquee, hover micro-interactions — all GPU-friendly and respect `prefers-reduced-motion`.
- Fully responsive (desktop / tablet / mobile) with an animated mobile menu.
