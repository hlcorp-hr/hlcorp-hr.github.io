# SEO & Google Analytics 4 Setup Guide

## 📊 Google Analytics 4 (GA4) Setup

### Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Start measuring** or **Admin** (gear icon)
3. Create a new account:
   - Account name: `HLCorp HR`
   - Configure data sharing settings as needed

### Step 2: Create a Property

1. Property name: `HLCorp HR Website`
2. Select reporting time zone: `Thailand (GMT+7)`
3. Select currency: `Thai Baht (THB)`
4. Click **Next**

### Step 3: About Your Business

1. Industry category: `Jobs & Education > Human Resources`
2. Business size: Select your company size
3. How you plan to use Google Analytics: Check relevant options
4. Click **Create**

### Step 4: Set Up Data Stream

1. Select platform: **Web**
2. Website URL: `https://YOUR-USERNAME.github.io/hlcorp-hr.github.io/`
3. Stream name: `HLCorp HR Website`
4. Click **Create stream**

### Step 5: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

### Step 6: Update Your Website

Replace `G-XXXXXXXXXX` in ALL HTML files with your actual Measurement ID:

**Files to update:**
- `index.html`
- `jobs.html`
- `about.html`
- `contact.html`

**Find and replace:**
```html
<!-- Old -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- New (replace both instances of G-XXXXXXXXXX) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR-ACTUAL-ID');
</script>
```

### Step 7: Test Your Setup

1. Push changes to GitHub
2. Visit your website
3. In Google Analytics, go to **Reports** → **Realtime**
4. You should see your visit in real-time
5. Use Chrome extension "Google Analytics Debugger" for detailed testing

---

## 🔍 SEO Optimization Checklist

### ✅ Already Implemented

- [x] **Meta Tags**: Title, description, keywords on all pages
- [x] **Open Graph Tags**: For Facebook/LinkedIn sharing
- [x] **Twitter Cards**: For Twitter sharing
- [x] **Structured Data (JSON-LD)**: Organization, Website, AboutPage, ContactPage
- [x] **Canonical URLs**: Prevent duplicate content issues
- [x] **Robots.txt**: Allow search engines to crawl
- [x] **Sitemap.xml**: Help search engines find all pages
- [x] **Mobile Responsive**: Mobile-friendly design
- [x] **Font Awesome Icons**: Modern, professional icons
- [x] **Fast Loading**: Optimized CSS/JS

### 📝 Additional SEO Tasks

#### 1. Submit Sitemap to Search Engines

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://YOUR-USERNAME.github.io/hlcorp-hr.github.io/`
3. Verify ownership (via HTML file or meta tag)
4. Submit sitemap: `https://YOUR-USERNAME.github.io/hlcorp-hr.github.io/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Submit sitemap

#### 2. Create Favicon

Create favicon files and place them in the root directory:
- `favicon-32x32.png` (32x32 pixels)
- `favicon-16x16.png` (16x16 pixels)
- `apple-touch-icon.png` (180x180 pixels)

Use tools like [Favicon Generator](https://realfavicongenerator.net/)

#### 3. Create Social Media Images

Create images for social media sharing:
- **og-image.jpg**: 1200x630 pixels (for homepage)
- **og-jobs.jpg**: 1200x630 pixels (for jobs page)
- **og-about.jpg**: 1200x630 pixels (for about page)
- **og-contact.jpg**: 1200x630 pixels (for contact page)

Place images in an `images/` folder and update the meta tags.

#### 4. Update URLs

Once your site is live, update these URLs in all HTML files:
- Change `https://hlcorp-hr.github.io/` to your actual GitHub Pages URL
- Update social media URLs in footer
- Update email addresses to your actual company emails

#### 5. Performance Optimization

- Enable compression in GitHub Pages
- Consider using a CDN for Font Awesome (already using CDN)
- Optimize images if you add any
- Consider lazy loading for images

---

## 📈 Tracking & Analytics

### Events to Track (Optional Advanced Setup)

You can add custom event tracking for important actions:

```javascript
// Example: Track job application clicks
gtag('event', 'job_application', {
    'job_title': 'Senior Software Engineer',
    'job_id': '123',
    'company': 'Tech Company'
});

// Example: Track form submissions
gtag('event', 'form_submission', {
    'form_type': 'contact',
    'form_page': 'contact.html'
});

// Example: Track search queries
gtag('event', 'search', {
    'search_term': 'software engineer'
});
```

Add these to `script.js` where relevant actions occur.

### Goals to Set Up in GA4

1. **Page Views**: Track most visited pages
2. **Job Applications**: Track apply button clicks
3. **Contact Form Submissions**: Track form completions
4. **Search Queries**: Track what people search for
5. **Category Clicks**: Track which job categories are popular

---

## 🎯 SEO Best Practices

### Content Strategy

1. **Regular Updates**: Update job listings regularly
2. **Blog Section**: Consider adding a blog for career advice (future)
3. **Location Pages**: Create dedicated pages for each city (future)
4. **Job Detail Pages**: Individual pages for each job (future)

### Keywords to Target

**Primary Keywords:**
- Jobs in Thailand
- Recruitment Thailand
- HR Services Bangkok
- Job Search Thailand
- Careers Thailand

**Long-tail Keywords:**
- Software engineer jobs Bangkok
- Marketing manager Chiang Mai
- Finance jobs Phuket
- Remote work Thailand
- English teaching jobs Thailand

### Local SEO

1. **Google My Business**: Create profiles for each office location
2. **Local Citations**: List your business in Thai directories
3. **Local Content**: Create content about job market in Thai cities

---

## 📱 Social Media Integration

### Share Buttons

Consider adding social share buttons to job listings:

```html
<!-- Example Share Button -->
<a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank">
    <i class="fab fa-facebook-f"></i> Share
</a>
```

### Social Media Strategy

1. **Facebook**: Share job posts, company culture
2. **LinkedIn**: Professional networking, job listings
3. **Twitter**: Quick job alerts, industry news
4. **Line**: Popular in Thailand for direct messaging

---

## 🔒 Security & Privacy

### HTTPS

- GitHub Pages automatically provides HTTPS ✅

### Privacy Policy (To Add)

Create a `privacy.html` page with:
- Cookie policy
- Data collection practices
- Google Analytics disclosure
- User rights (PDPA compliance for Thailand)

### Terms of Service (To Add)

Create a `terms.html` page with:
- Website usage terms
- Job posting terms
- Liability disclaimers

---

## 📊 Monitoring & Maintenance

### Weekly Tasks

- Check Google Analytics for traffic trends
- Monitor search console for errors
- Update job listings

### Monthly Tasks

- Review SEO performance
- Update meta descriptions if needed
- Check for broken links
- Update sitemap if new pages added

### Quarterly Tasks

- Analyze keyword rankings
- Review competitor websites
- Update content strategy
- Refresh design elements

---

## 🆘 Troubleshooting

### GA4 Not Tracking

1. Check browser console for errors
2. Verify Measurement ID is correct
3. Ensure ad blockers are disabled during testing
4. Check GA4 real-time reports
5. Wait 24-48 hours for data to appear in standard reports

### Search Console Issues

1. Verify site ownership is confirmed
2. Check robots.txt is accessible
3. Submit sitemap manually if auto-discovery fails
4. Check for crawl errors in coverage report

### Social Media Previews Not Working

1. Use [Facebook Debugger](https://developers.facebook.com/tools/debug/)
2. Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. Clear cache on social platforms
4. Verify OG image URLs are absolute (not relative)

---

## 📞 Support Resources

- **Google Analytics Help**: https://support.google.com/analytics
- **Search Console Help**: https://support.google.com/webmasters
- **Schema.org Documentation**: https://schema.org/
- **SEO Guide**: https://moz.com/beginners-guide-to-seo

---

Made with ❤️ for HLCorp HR
Last Updated: October 16, 2025

