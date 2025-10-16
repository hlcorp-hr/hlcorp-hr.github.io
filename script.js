// ===== Navigation Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===== Sample Job Data =====
const sampleJobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Innovations Co.",
        logo: "💻",
        location: "Bangkok",
        type: "Full-time",
        experience: "Senior Level",
        salary: "80,000 - 120,000 THB",
        salaryMin: 80000,
        tags: ["JavaScript", "React", "Node.js"],
        badge: "featured",
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Marketing Manager",
        company: "Digital Marketing Hub",
        logo: "📱",
        location: "Bangkok",
        type: "Full-time",
        experience: "Mid Level",
        salary: "50,000 - 70,000 THB",
        salaryMin: 50000,
        tags: ["SEO", "Social Media", "Content"],
        badge: "urgent",
        posted: "1 day ago"
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "Analytics Pro Ltd.",
        logo: "📊",
        location: "Chiang Mai",
        type: "Full-time",
        experience: "Mid Level",
        salary: "45,000 - 60,000 THB",
        salaryMin: 45000,
        tags: ["Python", "SQL", "Power BI"],
        badge: null,
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "UX/UI Designer",
        company: "Creative Studio",
        logo: "🎨",
        location: "Bangkok",
        type: "Full-time",
        experience: "Mid Level",
        salary: "40,000 - 55,000 THB",
        salaryMin: 40000,
        tags: ["Figma", "Adobe XD", "Prototyping"],
        badge: "featured",
        posted: "4 days ago"
    },
    {
        id: 5,
        title: "Sales Executive",
        company: "Global Trade Partners",
        logo: "💼",
        location: "Phuket",
        type: "Full-time",
        experience: "Entry Level",
        salary: "25,000 - 40,000 THB",
        salaryMin: 25000,
        tags: ["B2B", "Customer Relations", "CRM"],
        badge: null,
        posted: "5 days ago"
    },
    {
        id: 6,
        title: "DevOps Engineer",
        company: "Cloud Solutions Inc.",
        logo: "☁️",
        location: "Remote",
        type: "Full-time",
        experience: "Senior Level",
        salary: "70,000 - 100,000 THB",
        salaryMin: 70000,
        tags: ["AWS", "Docker", "Kubernetes"],
        badge: "featured",
        posted: "1 week ago"
    },
    {
        id: 7,
        title: "Content Writer",
        company: "Media Group Thailand",
        logo: "✍️",
        location: "Bangkok",
        type: "Part-time",
        experience: "Entry Level",
        salary: "20,000 - 30,000 THB",
        salaryMin: 20000,
        tags: ["SEO Writing", "Copywriting", "Research"],
        badge: null,
        posted: "3 days ago"
    },
    {
        id: 8,
        title: "HR Manager",
        company: "People Solutions Co.",
        logo: "👥",
        location: "Bangkok",
        type: "Full-time",
        experience: "Senior Level",
        salary: "60,000 - 80,000 THB",
        salaryMin: 60000,
        tags: ["Recruitment", "Training", "Compliance"],
        badge: "urgent",
        posted: "2 days ago"
    },
    {
        id: 9,
        title: "Financial Analyst",
        company: "Finance Pro Ltd.",
        logo: "💰",
        location: "Bangkok",
        type: "Full-time",
        experience: "Mid Level",
        salary: "45,000 - 65,000 THB",
        salaryMin: 45000,
        tags: ["Excel", "Financial Modeling", "SAP"],
        badge: null,
        posted: "1 week ago"
    },
    {
        id: 10,
        title: "Customer Support Specialist",
        company: "Service Excellence Co.",
        logo: "📞",
        location: "Chiang Mai",
        type: "Full-time",
        experience: "Entry Level",
        salary: "18,000 - 25,000 THB",
        salaryMin: 18000,
        tags: ["Communication", "Problem Solving", "CRM"],
        badge: null,
        posted: "4 days ago"
    },
    {
        id: 11,
        title: "Project Manager",
        company: "Construction Leaders",
        logo: "🏗️",
        location: "Pattaya",
        type: "Full-time",
        experience: "Senior Level",
        salary: "70,000 - 95,000 THB",
        salaryMin: 70000,
        tags: ["PMP", "Agile", "Risk Management"],
        badge: "featured",
        posted: "2 days ago"
    },
    {
        id: 12,
        title: "Graphic Designer",
        company: "Creative Agency Bangkok",
        logo: "🖌️",
        location: "Bangkok",
        type: "Contract",
        experience: "Mid Level",
        salary: "35,000 - 50,000 THB",
        salaryMin: 35000,
        tags: ["Photoshop", "Illustrator", "Branding"],
        badge: null,
        posted: "5 days ago"
    }
];

// ===== Job Card Creation =====
function createJobCard(job) {
    const badgeHTML = job.badge ? 
        `<span class="job-badge badge-${job.badge}">${job.badge === 'featured' ? '⭐ Featured' : '🔥 Urgent'}</span>` : '';
    
    return `
        <div class="job-card" data-job-id="${job.id}">
            <div class="job-header">
                <div class="company-logo">${job.logo}</div>
                ${badgeHTML}
            </div>
            <h3 class="job-title">${job.title}</h3>
            <p class="company-name">${job.company}</p>
            <div class="job-meta">
                <span class="meta-item">📍 ${job.location}</span>
                <span class="meta-item">💼 ${job.type}</span>
                <span class="meta-item">📈 ${job.experience}</span>
                <span class="meta-item">🕒 ${job.posted}</span>
            </div>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="job-footer">
                <span class="job-salary">${job.salary}</span>
                <button class="job-apply-btn" onclick="applyJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `;
}

// ===== Featured Jobs on Homepage =====
const featuredJobsContainer = document.getElementById('featured-jobs-container');
if (featuredJobsContainer) {
    const featuredJobs = sampleJobs.slice(0, 6);
    featuredJobsContainer.innerHTML = featuredJobs.map(job => createJobCard(job)).join('');
}

// ===== Jobs Page Functionality =====
let currentPage = 1;
const jobsPerPage = 6;
let filteredJobs = [...sampleJobs];

function renderJobs() {
    const jobsList = document.getElementById('jobs-list');
    if (!jobsList) return;

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToShow = filteredJobs.slice(startIndex, endIndex);

    jobsList.innerHTML = jobsToShow.map(job => createJobCard(job)).join('');
    
    updateResultsCount();
    updatePagination();
}

function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredJobs.length} jobs`;
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const pageNumbers = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (!pageNumbers) return;

    // Update page numbers
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-number';
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderJobs();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pageNumbers.appendChild(pageBtn);
    }

    // Update prev/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderJobs();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderJobs();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    }
}

// ===== Filtering =====
function applyFilters() {
    const searchInput = document.getElementById('filter-search');
    const locationCheckboxes = document.querySelectorAll('input[name="location"]:checked');
    const typeCheckboxes = document.querySelectorAll('input[name="type"]:checked');
    const experienceCheckboxes = document.querySelectorAll('input[name="experience"]:checked');
    const salaryCheckboxes = document.querySelectorAll('input[name="salary"]:checked');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedLocations = Array.from(locationCheckboxes).map(cb => cb.value);
    const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);
    const selectedExperience = Array.from(experienceCheckboxes).map(cb => cb.value);
    const selectedSalaryRanges = Array.from(salaryCheckboxes).map(cb => cb.value);

    filteredJobs = sampleJobs.filter(job => {
        // Search filter
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm));

        // Location filter
        const matchesLocation = selectedLocations.length === 0 || 
            selectedLocations.includes(job.location);

        // Type filter
        const matchesType = selectedTypes.length === 0 || 
            selectedTypes.includes(job.type);

        // Experience filter
        const matchesExperience = selectedExperience.length === 0 || 
            selectedExperience.includes(job.experience);

        // Salary filter
        const matchesSalary = selectedSalaryRanges.length === 0 || 
            selectedSalaryRanges.some(range => {
                if (range === '15-25') return job.salaryMin >= 15000 && job.salaryMin < 25000;
                if (range === '25-40') return job.salaryMin >= 25000 && job.salaryMin < 40000;
                if (range === '40-60') return job.salaryMin >= 40000 && job.salaryMin < 60000;
                if (range === '60-100') return job.salaryMin >= 60000 && job.salaryMin < 100000;
                if (range === '100+') return job.salaryMin >= 100000;
                return false;
            });

        return matchesSearch && matchesLocation && matchesType && matchesExperience && matchesSalary;
    });

    currentPage = 1;
    renderJobs();
}

// Add event listeners for filters
if (document.getElementById('filter-search')) {
    document.getElementById('filter-search').addEventListener('input', applyFilters);
    
    const filterCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Reset filters
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('filter-search').value = '';
            filterCheckboxes.forEach(cb => cb.checked = false);
            filteredJobs = [...sampleJobs];
            currentPage = 1;
            renderJobs();
        });
    }

    // Initial render
    renderJobs();
}

// ===== Sorting =====
const sortSelect = document.getElementById('sort-select');
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        
        switch(sortBy) {
            case 'recent':
                // Keep original order
                filteredJobs = [...filteredJobs];
                break;
            case 'salary-high':
                filteredJobs.sort((a, b) => b.salaryMin - a.salaryMin);
                break;
            case 'salary-low':
                filteredJobs.sort((a, b) => a.salaryMin - b.salaryMin);
                break;
            case 'company':
                filteredJobs.sort((a, b) => a.company.localeCompare(b.company));
                break;
        }
        
        currentPage = 1;
        renderJobs();
    });
}

// ===== Search Box on Homepage =====
const heroSearchBtn = document.querySelector('.btn-search');
if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
        const jobSearch = document.getElementById('job-search').value;
        const locationSearch = document.getElementById('location-search').value;
        
        // Redirect to jobs page with search params
        let url = 'jobs.html';
        const params = new URLSearchParams();
        if (jobSearch) params.append('q', jobSearch);
        if (locationSearch) params.append('location', locationSearch);
        
        if (params.toString()) {
            url += '?' + params.toString();
        }
        
        window.location.href = url;
    });

    // Also trigger on Enter key
    document.getElementById('job-search')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            heroSearchBtn.click();
        }
    });

    document.getElementById('location-search')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            heroSearchBtn.click();
        }
    });
}

// ===== URL Search Parameters =====
if (window.location.pathname.includes('jobs.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const locationQuery = urlParams.get('location');

    if (searchQuery && document.getElementById('filter-search')) {
        document.getElementById('filter-search').value = searchQuery;
        applyFilters();
    }

    if (locationQuery) {
        const locationCheckboxes = document.querySelectorAll('input[name="location"]');
        locationCheckboxes.forEach(cb => {
            if (cb.value.toLowerCase() === locationQuery.toLowerCase()) {
                cb.checked = true;
            }
        });
        applyFilters();
    }
}

// ===== Apply Job Function =====
function applyJob(jobId) {
    const job = sampleJobs.find(j => j.id === jobId);
    if (job) {
        alert(`Thank you for your interest in the ${job.title} position at ${job.company}!\n\nIn a real application, this would redirect to an application form or open an application modal.`);
    }
}

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Form submitted:', data);
        
        const formMessage = document.getElementById('form-message');
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Category Card Click =====
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent;
        window.location.href = `jobs.html?q=${encodeURIComponent(categoryName)}`;
    });
});

// ===== Animation on Scroll (Simple) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.job-card, .category-card, .stat-card, .step-card, .feature-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

console.log('HLCorp HR Website Loaded Successfully!');

// ===== i18n (EN/TH) =====
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.jobs': 'Jobs',
        'nav.about': 'About Us',
        'nav.contact': 'Contact',
        'nav.postJob': 'Post a Job',
        'hero.title': 'Find Your Dream Career in Thailand',
        'hero.subtitle': 'Connect with top employers across Bangkok, Chiang Mai, Phuket and beyond. Your next opportunity awaits.',
        'hero.searchJob': 'Job title or keyword',
        'hero.searchLocation': 'Location (e.g., Bangkok, Chiang Mai)',
        'hero.searchBtn': 'Search Jobs',
        'hero.popular': 'Popular:',
        'featured.title': 'Featured Jobs',
        'featured.viewAll': 'View All Jobs →',
        'categories.title': 'Browse by Category',
        'categories.subtitle': 'Explore opportunities in various industries',
        'how.title': 'How It Works',
        'how.subtitle': 'Find your perfect job in three simple steps',
        'how.step1.title': 'Create Your Profile',
        'how.step1.desc': 'Sign up and build your professional profile with your skills, experience, and preferences.',
        'how.step2.title': 'Search & Apply',
        'how.step2.desc': 'Browse thousands of job listings and apply to positions that match your qualifications.',
        'how.step3.title': 'Get Hired',
        'how.step3.desc': 'Connect with employers, attend interviews, and land your dream job in Thailand.',
        'cta.title': 'Ready to Find Your Next Opportunity?',
        'cta.subtitle': 'Join thousands of job seekers who found their dream careers through HLCorp HR',
        'cta.browse': 'Browse Jobs',
        'cta.contact': 'Contact Us',
        'footer.seekers.title': 'For Job Seekers',
        'footer.seekers.browse': 'Browse Jobs',
        'footer.seekers.career': 'Career Advice',
        'footer.seekers.resume': 'Resume Tips',
        'footer.seekers.salary': 'Salary Guide',
        'footer.employers.title': 'For Employers',
        'footer.employers.post': 'Post a Job',
        'footer.employers.search': 'Search Candidates',
        'footer.employers.pricing': 'Pricing',
        'footer.employers.solutions': 'HR Solutions',
        'footer.company.title': 'Company',
        'footer.company.about': 'About Us',
        'footer.company.contact': 'Contact',
        'footer.company.privacy': 'Privacy Policy',
        'footer.company.terms': 'Terms of Service'
    },
    th: {
        'nav.home': 'หน้าแรก',
        'nav.jobs': 'งาน',
        'nav.about': 'เกี่ยวกับเรา',
        'nav.contact': 'ติดต่อเรา',
        'nav.postJob': 'ประกาศงาน',
        'hero.title': 'ค้นหาอาชีพในฝันของคุณในประเทศไทย',
        'hero.subtitle': 'เชื่อมต่อกับนายจ้างชั้นนำทั่วกรุงเทพฯ เชียงใหม่ ภูเก็ต และอีกมากมาย โอกาสต่อไปของคุณรออยู่',
        'hero.searchJob': 'ชื่องานหรือคำค้นหา',
        'hero.searchLocation': 'สถานที่ (เช่น กรุงเทพฯ, เชียงใหม่)',
        'hero.searchBtn': 'ค้นหางาน',
        'hero.popular': 'ยอดนิยม:',
        'featured.title': 'งานเด่น',
        'featured.viewAll': 'ดูงานทั้งหมด →',
        'categories.title': 'ค้นหาตามหมวดหมู่',
        'categories.subtitle': 'สำรวจโอกาสในอุตสาหกรรมต่าง ๆ',
        'how.title': 'วิธีการทำงาน',
        'how.subtitle': 'หางานที่ใช่ใน 3 ขั้นตอน',
        'how.step1.title': 'สร้างโปรไฟล์ของคุณ',
        'how.step1.desc': 'สมัครและสร้างโปรไฟล์อาชีพพร้อมทักษะและประสบการณ์ของคุณ',
        'how.step2.title': 'ค้นหาและสมัคร',
        'how.step2.desc': 'เรียกดูตำแหน่งงานนับพันและสมัครงานที่ตรงกับคุณสมบัติ',
        'how.step3.title': 'ได้งาน',
        'how.step3.desc': 'เชื่อมต่อนายจ้าง นัดสัมภาษณ์ และเริ่มงานในฝันของคุณในประเทศไทย',
        'cta.title': 'พร้อมค้นหาโอกาสครั้งต่อไปหรือยัง?',
        'cta.subtitle': 'เข้าร่วมกับผู้หางานนับพันที่พบอาชีพในฝันกับ HLCorp HR',
        'cta.browse': 'ดูงาน',
        'cta.contact': 'ติดต่อเรา',
        'footer.seekers.title': 'สำหรับผู้หางาน',
        'footer.seekers.browse': 'ดูงาน',
        'footer.seekers.career': 'คำแนะนำด้านอาชีพ',
        'footer.seekers.resume': 'เทคนิคเขียนเรซูเม่',
        'footer.seekers.salary': 'ฐานเงินเดือน',
        'footer.employers.title': 'สำหรับนายจ้าง',
        'footer.employers.post': 'ประกาศงาน',
        'footer.employers.search': 'ค้นหาผู้สมัคร',
        'footer.employers.pricing': 'ราคา',
        'footer.employers.solutions': 'โซลูชันด้าน HR',
        'footer.company.title': 'บริษัท',
        'footer.company.about': 'เกี่ยวกับเรา',
        'footer.company.contact': 'ติดต่อเรา',
        'footer.company.privacy': 'นโยบายความเป็นส่วนตัว',
        'footer.company.terms': 'เงื่อนไขการให้บริการ'
    }
};

function setLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('hl_i18n_lang', lang);

    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    // Toggle active state on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Initialize language from URL or localStorage
const urlLang = new URLSearchParams(window.location.search).get('lang');
const savedLang = localStorage.getItem('hl_i18n_lang');
const initialLang = (urlLang || savedLang || 'en').toLowerCase();

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(initialLang);
    const switcher = document.getElementById('lang-switcher');
    if (switcher) {
        switcher.addEventListener('click', (e) => {
            if (e.target.matches('.lang-btn')) {
                const lang = e.target.getAttribute('data-lang');
                setLanguage(lang);
            }
        });
    }
});

