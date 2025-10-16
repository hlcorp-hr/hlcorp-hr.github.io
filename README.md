# HLCorp HR - Recruitment & HR Services Website

A modern, responsive website for HR and recruitment services in Thailand, designed for GitHub Pages.

![HLCorp HR](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

- **Modern Design**: Clean, professional UI with smooth animations and transitions
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Job Listings**: Browse and filter job opportunities by location, type, experience level, and salary
- **Search Functionality**: Powerful search feature to find the perfect job
- **Interactive Forms**: Contact form with validation
- **Multiple Pages**: Home, Jobs, About Us, and Contact pages
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Fast Loading**: Lightweight code with no external dependencies (except Google Fonts)

## 📁 Project Structure

```
hlcorp-hr.github.io/
├── index.html          # Homepage
├── jobs.html           # Jobs listing page
├── about.html          # About us page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/hlcorp-hr.github.io.git
cd hlcorp-hr.github.io
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📦 Deployment to GitHub Pages

### Method 1: Deploy from Main Branch

1. Create a new repository on GitHub named `YOUR_USERNAME.github.io` or `hlcorp-hr.github.io`

2. Initialize git and push your code:
```bash
git init
git add .
git commit -m "Initial commit: HR recruitment website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hlcorp-hr.github.io.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**

4. Your site will be published at: `https://YOUR_USERNAME.github.io/hlcorp-hr.github.io/`

### Method 2: Using GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Create a new repository and select your project folder
3. Publish the repository to GitHub
4. Follow step 3 from Method 1 to enable GitHub Pages

## 📊 Google Analytics Setup

**Important:** Before going live, set up Google Analytics 4:

1. Create a GA4 property at [Google Analytics](https://analytics.google.com/)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Replace `G-XXXXXXXXXX` in all HTML files with your actual ID
4. See `SEO-SETUP-GUIDE.md` for detailed instructions

## 🛠️ Customization

### Update Content

**Company Information:**
- Edit the footer section in all HTML files to update contact details
- Modify the About page (`about.html`) to reflect your company's story

**Job Listings:**
- Update the `sampleJobs` array in `script.js` to add/modify job listings
- Each job object contains: title, company, location, type, experience, salary, tags, etc.

**Colors & Branding:**
- Modify CSS variables in `styles.css` (`:root` section) to change the color scheme:
```css
:root {
    --primary-color: #10b981;    /* Main brand color - Green */
    --secondary-color: #34d399;  /* Secondary accent - Light green */
    --accent-color: #6ee7b7;     /* Accent highlights - Mint */
}
```

**Navigation & Pages:**
- Edit the navigation menu in each HTML file's `<nav>` section
- Add new pages by creating new HTML files and linking them in the navigation

### Add Custom Domain

1. Purchase a domain from a domain registrar
2. In your repository, create a file named `CNAME` (no extension)
3. Add your domain name to the file (e.g., `www.hlcorp-hr.com`)
4. Configure your domain's DNS settings:
   - Add an A record pointing to: `185.199.108.153`
   - Add another A record: `185.199.109.153`
   - Add another A record: `185.199.110.153`
   - Add another A record: `185.199.111.153`
   - Or add a CNAME record pointing to: `YOUR_USERNAME.github.io`

## 🎨 Design Features

- **Color Scheme**: Fresh green gradient theme with natural, professional tones
- **Typography**: Inter font family for modern, readable text
- **Animations**: Smooth transitions and fade-in effects on scroll
- **Icons**: Emoji icons for visual appeal (can be replaced with icon fonts)
- **Layout**: CSS Grid and Flexbox for responsive layouts

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- **HTML5**: Semantic markup with structured data (Schema.org)
- **CSS3**: Modern styling with Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality
- **Google Fonts**: Inter font family
- **Font Awesome 6**: Modern icon library
- **Google Analytics 4**: Website analytics and tracking
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, Sitemap

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

For support, email info@hlcorp-hr.com or create an issue in this repository.

## 🎯 Future Enhancements

- [ ] Add user authentication system
- [ ] Integrate with a backend API for real job data
- [ ] Implement resume upload functionality
- [ ] Add email notifications for job applications
- [ ] Create employer dashboard for posting jobs
- [ ] Add Thai language support (i18n)
- [ ] Integrate payment gateway for premium listings
- [ ] Add live chat support
- [ ] Implement advanced search filters
- [ ] Add blog section for career advice

## 👨‍💻 Author

**HLCorp HR Team**

---

Made with ❤️ in Thailand 🇹🇭

For more information, visit our website or contact us through the contact page.

