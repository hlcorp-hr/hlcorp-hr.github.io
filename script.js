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

// ===== Job Data Source (JSON) =====
let sampleJobs = [];
async function loadJobs() {
    try {
        const res = await fetch('data/jobs.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load jobs.json');
        const data = await res.json();
        if (Array.isArray(data)) {
            sampleJobs = data;
        }
    } catch (e) {
        console.warn('Falling back to built-in sample jobs. Reason:', e.message);
        sampleJobs = [
            { id: 1, title: 'Senior Software Engineer', company: 'Tech Innovations Co.', logo: '💻', location: 'Bangkok', type: 'Full-time', experience: 'Senior Level', salary: '80,000 - 120,000 THB', salaryMin: 80000, tags: ['JavaScript','React','Node.js'], badge: 'featured', posted: '2 days ago' },
            { id: 2, title: 'Marketing Manager', company: 'Digital Marketing Hub', logo: '📱', location: 'Bangkok', type: 'Full-time', experience: 'Mid Level', salary: '50,000 - 70,000 THB', salaryMin: 50000, tags: ['SEO','Social Media','Content'], badge: 'urgent', posted: '1 day ago' },
            { id: 3, title: 'Data Analyst', company: 'Analytics Pro Ltd.', logo: '📊', location: 'Chiang Mai', type: 'Full-time', experience: 'Mid Level', salary: '45,000 - 60,000 THB', salaryMin: 45000, tags: ['Python','SQL','Power BI'], badge: null, posted: '3 days ago' }
        ];
    }
}

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
async function renderFeatured() {
    if (!featuredJobsContainer) return;
    if (!sampleJobs.length) await loadJobs();
    const featuredJobs = sampleJobs.slice(0, 6);
    featuredJobsContainer.innerHTML = featuredJobs.map(job => createJobCard(job)).join('');
}
renderFeatured();

// ===== Jobs Page Functionality =====
let currentPage = 1;
const jobsPerPage = 6;
let filteredJobs = [];

async function renderJobs() {
    const jobsList = document.getElementById('jobs-list');
    if (!jobsList) return;
    if (!sampleJobs.length) await loadJobs();
    if (!filteredJobs.length) filteredJobs = [...sampleJobs];

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

    // Initial render after loading data
    loadJobs().then(() => {
        filteredJobs = [...sampleJobs];
        renderJobs();
    });
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
    const modal = document.getElementById('apply-modal');
    if (!modal) return;
    modal.classList.add('active');

    const jobcodeInput = document.getElementById('apply-jobcode');
    if (job && jobcodeInput) {
        jobcodeInput.value = job.id.toString();
    }
}

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Get form values
        const firstName = data.firstName || '';
        const lastName = data.lastName || '';
        const email = data.email || '';
        const phone = data.phone || '';
        const subject = data.subject || '';
        const message = data.message || '';
        const newsletter = data.newsletter ? 'Yes' : 'No';
        
        // Map subject values to readable text
        const subjectMap = {
            'job-seeker': 'I\'m Looking for a Job',
            'employer': 'I\'m Looking to Hire',
            'partnership': 'Partnership Inquiry',
            'general': 'General Inquiry',
            'support': 'Support'
        };
        
        const readableSubject = subjectMap[subject] || subject;
        
        // Create email content
        const emailSubject = encodeURIComponent(`HLCorp HR Contact Form: ${readableSubject}`);
        const emailBody = encodeURIComponent(`
Contact Form Submission from HLCorp HR Website

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${readableSubject}

Message:
${message}

Newsletter Subscription: ${newsletter}

---
This message was sent from the HLCorp HR website contact form.
        `.trim());
        
        const formMessage = document.getElementById('form-message');
        
        // Show loading message first
        formMessage.className = 'form-message';
        formMessage.textContent = 'Preparing your email...';
        formMessage.style.display = 'block';
        
        // Small delay to show loading message, then open email client
        setTimeout(() => {
            // Open email client with pre-filled email
            window.location.href = `mailto:hlcorphr.th@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            
            // Update message after opening email client
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Your email client should now open with a pre-filled message. Please send the email to complete your inquiry.';
            
            // Hide message after 12 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                // Reset form after user has time to send email
                contactForm.reset();
            }, 12000);
        }, 500);
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

    // Apply modal handlers
    const applyClose = document.getElementById('apply-close');
    const applyCancel = document.getElementById('apply-cancel');
    const applyModal = document.getElementById('apply-modal');
    const applyForm = document.getElementById('apply-form');

    function closeApply() {
        if (applyModal) applyModal.classList.remove('active');
    }
    applyClose?.addEventListener('click', closeApply);
    applyCancel?.addEventListener('click', closeApply);
    applyModal?.addEventListener('click', (e) => {
        if (e.target === applyModal) closeApply();
    });

    // Build mailto with optional attachment instruction (note: mailto can't attach files)
    applyForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('apply-name') || {}).value || '';
        const email = (document.getElementById('apply-email') || {}).value || '';
        const phone = (document.getElementById('apply-phone') || {}).value || '';
        const jobcode = (document.getElementById('apply-jobcode') || {}).value || '';
        const message = (document.getElementById('apply-message') || {}).value || '';

        const subject = encodeURIComponent(`Job Application - ${jobcode}`);
        const bodyLines = [
            `Job Code: ${jobcode}`,
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            '',
            'Message:',
            message,
            '',
            'Note: Please attach your CV to this email before sending.'
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));
        window.location.href = `mailto:hlcorphr.th@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => closeApply(), 400);
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
        'nav.pricing': 'Pricing',
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
        'footer.company.terms': 'Terms of Service',
        'footer.description': 'Leading recruitment and HR services in Thailand, connecting talented individuals with exceptional opportunities.',
        'pricing.mainTitle': 'Transparent HR Recruitment Pricing in Thailand',
        'pricing.mainSubtitle': 'Flexible plans for growing teams and enterprises. Start from ฿990/month for job posting and recruitment services.',
        'pricing.monthlyBilling': 'Monthly Billing',
        'pricing.yearlyBilling': 'Yearly Billing',
        'pricing.save20': 'Save 20%',
        'pricing.starterPlan.title': 'Starter Plan',
        'pricing.starterPlan.subtitle': 'For small teams hiring occasionally in Thailand',
        'pricing.starterPlan.feature1': '3 active job posts',
        'pricing.starterPlan.feature2': 'Basic candidate search',
        'pricing.starterPlan.feature3': 'Email support',
        'pricing.starterPlan.chooseBtn': 'Choose Starter',
        'pricing.professionalPlan.title': 'Professional Plan',
        'pricing.professionalPlan.subtitle': 'For growing companies hiring regularly in Thailand',
        'pricing.professionalPlan.popular': 'Most Popular',
        'pricing.professionalPlan.feature1': '15 active job posts',
        'pricing.professionalPlan.feature2': 'Advanced candidate search',
        'pricing.professionalPlan.feature3': 'Priority support',
        'pricing.professionalPlan.feature4': 'Company branding',
        'pricing.professionalPlan.chooseBtn': 'Choose Professional',
        'pricing.enterprisePlan.title': 'Enterprise Plan',
        'pricing.enterprisePlan.subtitle': 'Customized HR solutions for large teams in Thailand',
        'pricing.enterprisePlan.feature1': 'Unlimited job posts',
        'pricing.enterprisePlan.feature2': 'Dedicated account manager',
        'pricing.enterprisePlan.feature3': 'API access',
        'pricing.enterprisePlan.feature4': 'SLA & custom contracts',
        'pricing.enterprisePlan.contactBtn': 'Contact Sales',
        'pricing.packages.title': 'Individual Job Posting Packages in Thailand',
        'pricing.packages.subtitle': 'Additional options for enhanced visibility and features. Perfect for occasional hiring needs.',
        'pricing.basicJob.title': 'Basic Job Post',
        'pricing.basicJob.perJob': 'per job',
        'pricing.basicJob.feature1': '30 days listing',
        'pricing.basicJob.feature2': 'Basic search visibility',
        'pricing.basicJob.feature3': 'Standard application form',
        'pricing.basicJob.feature4': 'Email notifications',
        'pricing.featuredJob.title': 'Featured Job Post',
        'pricing.featuredJob.perJob': 'per job',
        'pricing.featuredJob.bestValue': 'Best Value',
        'pricing.featuredJob.feature1': '60 days listing',
        'pricing.featuredJob.feature2': 'Top placement in search',
        'pricing.featuredJob.feature3': 'Featured badge',
        'pricing.featuredJob.feature4': 'Enhanced company profile',
        'pricing.featuredJob.feature5': 'Priority customer support',
        'pricing.premiumJob.title': 'Premium Job Post',
        'pricing.premiumJob.perJob': 'per job',
        'pricing.premiumJob.feature1': '90 days listing',
        'pricing.premiumJob.feature2': 'Homepage banner placement',
        'pricing.premiumJob.feature3': 'Email marketing to candidates',
        'pricing.premiumJob.feature4': 'Social media promotion',
        'pricing.premiumJob.feature5': 'Dedicated account manager',
        'pricing.premiumJob.feature6': 'Performance analytics',
        'pricing.advertising.title': 'HR Advertising & Marketing Services Thailand',
        'pricing.advertising.subtitle': 'Boost your brand visibility and reach more candidates across Thailand. Professional recruitment marketing solutions.',
        'pricing.banner.title': 'Banner Advertising',
        'pricing.banner.homepage': 'Homepage Banner',
        'pricing.banner.jobsPage': 'Jobs Page Banner',
        'pricing.banner.categoryPage': 'Category Page Banner',
        'pricing.banner.perMonth': '/month',
        'pricing.banner.feature1': 'High visibility placement',
        'pricing.banner.feature2': 'Click tracking & analytics',
        'pricing.banner.feature3': 'Custom banner design',
        'pricing.email.title': 'Email Marketing',
        'pricing.email.newsletter': 'Newsletter Promotion',
        'pricing.email.targeted': 'Targeted Campaign',
        'pricing.email.alert': 'Job Alert Sponsorship',
        'pricing.email.perEmail': '/email',
        'pricing.email.perRecipients': '/1k recipients',
        'pricing.email.perAlert': '/alert',
        'pricing.email.feature1': 'Reach 50,000+ subscribers',
        'pricing.email.feature2': 'Targeted by location & skills',
        'pricing.email.feature3': 'Performance tracking',
        'pricing.social.title': 'Social Media',
        'pricing.social.facebook': 'Facebook Promotion',
        'pricing.social.linkedin': 'LinkedIn Campaign',
        'pricing.social.instagram': 'Instagram Stories',
        'pricing.social.perPost': '/post',
        'pricing.social.perCampaign': '/campaign',
        'pricing.social.perStory': '/story',
        'pricing.social.feature1': 'Professional content creation',
        'pricing.social.feature2': 'Multi-platform distribution',
        'pricing.social.feature3': 'Engagement analytics',
        'pricing.event.title': 'Event Sponsorship',
        'pricing.event.jobFair': 'Job Fair Booth',
        'pricing.event.workshop': 'Career Workshop',
        'pricing.event.webinar': 'Webinar Sponsorship',
        'pricing.event.perEvent': '/event',
        'pricing.event.perSession': '/session',
        'pricing.event.perWebinar': '/webinar',
        'pricing.event.feature1': 'Direct candidate interaction',
        'pricing.event.feature2': 'Brand visibility at events',
        'pricing.event.feature3': 'Lead generation',
        'pricing.faq.title': 'HR Recruitment Pricing FAQ',
        'pricing.faq.subtitle': 'Common questions about our HR services and pricing plans in Thailand',
        'pricing.faq.question1': 'Can I change my HR recruitment plan later?',
        'pricing.faq.answer1': 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your current billing cycle.',
        'pricing.faq.question2': 'Do you offer discounts for HR services in Thailand?',
        'pricing.faq.answer2': 'Yes, annual billing provides a 20% discount compared to monthly billing. Perfect for long-term recruitment needs.',
        'pricing.faq.question3': 'Is there a free trial for job posting?',
        'pricing.faq.answer3': 'We offer a 14-day free trial on the Professional plan. Test our recruitment platform without any credit card required.',
        'pricing.faq.question4': 'What payment methods are accepted for HR services?',
        'pricing.faq.answer4': 'We accept major credit cards, bank transfer, and issue tax invoices for Thai companies and international clients.',
        'pricing.faq.question5': 'How much does it cost to post a job in Thailand?',
        'pricing.faq.answer5': 'Individual job posts start from ฿299 for basic listing, ฿599 for featured posts, and ฿1,299 for premium placement.',
        'pricing.faq.question6': 'What\'s included in HR advertising packages?',
        'pricing.faq.answer6': 'Our advertising packages include banner placement, email marketing campaigns, social media promotion, and event sponsorship options.'
    },
    th: {
        'nav.home': 'หน้าแรก',
        'nav.jobs': 'งาน',
        'nav.about': 'เกี่ยวกับเรา',
        'nav.contact': 'ติดต่อเรา',
        'nav.pricing': 'ราคา',
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
        'footer.company.terms': 'เงื่อนไขการให้บริการ',
        'footer.description': 'บริการสรรหาและจัดการ HR ชั้นนำในประเทศไทย เชื่อมต่อคนเก่งกับโอกาสพิเศษ',
        'pricing.mainTitle': 'ราคาบริการสรรหาและจัดการ HR ที่โปร่งใสในประเทศไทย',
        'pricing.mainSubtitle': 'แผนที่ยืดหยุ่นสำหรับทีมที่เติบโตและองค์กร เริ่มต้นจาก ฿990/เดือน สำหรับการประกาศงานและบริการสรรหาบุคลากร',
        'pricing.monthlyBilling': 'เรียกเก็บรายเดือน',
        'pricing.yearlyBilling': 'เรียกเก็บรายปี',
        'pricing.save20': 'ประหยัด 20%',
        'pricing.starterPlan.title': 'แผนเริ่มต้น',
        'pricing.starterPlan.subtitle': 'สำหรับทีมเล็กที่จ้างงานเป็นครั้งคราวในประเทศไทย',
        'pricing.starterPlan.feature1': 'ประกาศงาน 3 ตำแหน่ง',
        'pricing.starterPlan.feature2': 'ค้นหาผู้สมัครพื้นฐาน',
        'pricing.starterPlan.feature3': 'สนับสนุนทางอีเมล',
        'pricing.starterPlan.chooseBtn': 'เลือกแผนเริ่มต้น',
        'pricing.professionalPlan.title': 'แผนมืออาชีพ',
        'pricing.professionalPlan.subtitle': 'สำหรับบริษัทที่เติบโตและจ้างงานเป็นประจำในประเทศไทย',
        'pricing.professionalPlan.popular': 'ยอดนิยม',
        'pricing.professionalPlan.feature1': 'ประกาศงาน 15 ตำแหน่ง',
        'pricing.professionalPlan.feature2': 'ค้นหาผู้สมัครขั้นสูง',
        'pricing.professionalPlan.feature3': 'สนับสนุนแบบเร่งด่วน',
        'pricing.professionalPlan.feature4': 'สร้างแบรนด์บริษัท',
        'pricing.professionalPlan.chooseBtn': 'เลือกแผนมืออาชีพ',
        'pricing.enterprisePlan.title': 'แผนองค์กร',
        'pricing.enterprisePlan.subtitle': 'โซลูชัน HR ที่ปรับแต่งสำหรับทีมใหญ่ในประเทศไทย',
        'pricing.enterprisePlan.feature1': 'ประกาศงานไม่จำกัด',
        'pricing.enterprisePlan.feature2': 'จัดการบัญชีเฉพาะ',
        'pricing.enterprisePlan.feature3': 'เข้าถึง API',
        'pricing.enterprisePlan.feature4': 'SLA และสัญญาแบบกำหนดเอง',
        'pricing.enterprisePlan.contactBtn': 'ติดต่อฝ่ายขาย',
        'pricing.packages.title': 'แพ็กเกจประกาศงานแต่ละตำแหน่งในประเทศไทย',
        'pricing.packages.subtitle': 'ตัวเลือกเพิ่มเติมเพื่อความโดดเด่นและฟีเจอร์ที่สมบูรณ์ เหมาะสำหรับความต้องการจ้างงานเป็นครั้งคราว',
        'pricing.basicJob.title': 'ประกาศงานพื้นฐาน',
        'pricing.basicJob.perJob': 'ต่องาน',
        'pricing.basicJob.feature1': 'แสดงผล 30 วัน',
        'pricing.basicJob.feature2': 'ความโดดเด่นในการค้นหาพื้นฐาน',
        'pricing.basicJob.feature3': 'ฟอร์มสมัครงานมาตรฐาน',
        'pricing.basicJob.feature4': 'แจ้งเตือนทางอีเมล',
        'pricing.featuredJob.title': 'ประกาศงานเด่น',
        'pricing.featuredJob.perJob': 'ต่องาน',
        'pricing.featuredJob.bestValue': 'คุ้มค่าที่สุด',
        'pricing.featuredJob.feature1': 'แสดงผล 60 วัน',
        'pricing.featuredJob.feature2': 'ตำแหน่งยอดนิยมในการค้นหา',
        'pricing.featuredJob.feature3': 'ป้ายเด่น',
        'pricing.featuredJob.feature4': 'โปรไฟล์บริษัทที่ปรับปรุง',
        'pricing.featuredJob.feature5': 'สนับสนุนลูกค้าแบบเร่งด่วน',
        'pricing.premiumJob.title': 'ประกาศงานพรีเมียม',
        'pricing.premiumJob.perJob': 'ต่องาน',
        'pricing.premiumJob.feature1': 'แสดงผล 90 วัน',
        'pricing.premiumJob.feature2': 'ตำแหน่งแบนเนอร์หน้าแรก',
        'pricing.premiumJob.feature3': 'การตลาดอีเมลถึงผู้สมัคร',
        'pricing.premiumJob.feature4': 'การโปรโมตลงสื่อสังคม',
        'pricing.premiumJob.feature5': 'จัดการบัญชีเฉพาะ',
        'pricing.premiumJob.feature6': 'การวิเคราะห์ประสิทธิภาพ',
        'pricing.advertising.title': 'บริการโฆษณาและการตลาด HR ประเทศไทย',
        'pricing.advertising.subtitle': 'เพิ่มความโดดเด่นให้แบรนด์และเข้าถึงผู้สมัครมากขึ้นทั่วประเทศไทย โซลูชันการตลาดสรรหาบุคลากรแบบมืออาชีพ',
        'pricing.banner.title': 'โฆษณาแบนเนอร์',
        'pricing.banner.homepage': 'แบนเนอร์หน้าแรก',
        'pricing.banner.jobsPage': 'แบนเนอร์หน้าหางาน',
        'pricing.banner.categoryPage': 'แบนเนอร์หน้าหมวดหมู่',
        'pricing.banner.perMonth': '/เดือน',
        'pricing.banner.feature1': 'ตำแหน่งที่มีความโดดเด่นสูง',
        'pricing.banner.feature2': 'ติดตามคลิกและการวิเคราะห์',
        'pricing.banner.feature3': 'ออกแบบแบนเนอร์ตามต้องการ',
        'pricing.email.title': 'การตลาดทางอีเมล',
        'pricing.email.newsletter': 'โปรโมชั่นจดหมายข่าว',
        'pricing.email.targeted': 'แคมเปญแบบกำหนดเป้าหมาย',
        'pricing.email.alert': 'การสนับสนุนแจ้งเตือนงาน',
        'pricing.email.perEmail': '/อีเมล',
        'pricing.email.perRecipients': '/1k ผู้รับ',
        'pricing.email.perAlert': '/การแจ้งเตือน',
        'pricing.email.feature1': 'เข้าถึงผู้สมัครสมาชิก 50,000+ คน',
        'pricing.email.feature2': 'กำหนดเป้าหมายตามสถานที่และทักษะ',
        'pricing.email.feature3': 'ติดตามประสิทธิภาพ',
        'pricing.social.title': 'สื่อสังคมออนไลน์',
        'pricing.social.facebook': 'โปรโมชั่น Facebook',
        'pricing.social.linkedin': 'แคมเปญ LinkedIn',
        'pricing.social.instagram': 'Stories Instagram',
        'pricing.social.perPost': '/โพสต์',
        'pricing.social.perCampaign': '/แคมเปญ',
        'pricing.social.perStory': '/เรื่อง',
        'pricing.social.feature1': 'สร้างเนื้อหามืออาชีพ',
        'pricing.social.feature2': 'การกระจายข้ามแพลตฟอร์ม',
        'pricing.social.feature3': 'การวิเคราะห์การมีส่วนร่วม',
        'pricing.event.title': 'การสนับสนุนงานกิจกรรม',
        'pricing.event.jobFair': 'บูธงานหางาน',
        'pricing.event.workshop': 'เวิร์กช็อปอาชีพ',
        'pricing.event.webinar': 'การสนับสนุน Webinar',
        'pricing.event.perEvent': '/งาน',
        'pricing.event.perSession': '/เซสชัน',
        'pricing.event.perWebinar': '/webinar',
        'pricing.event.feature1': 'การโต้ตอบผู้สมัครโดยตรง',
        'pricing.event.feature2': 'ความโดดเด่นของแบรนด์ในงาน',
        'pricing.event.feature3': 'การสร้างลีด',
        'pricing.faq.title': 'คำถามที่พบบ่อยเกี่ยวกับราคาบริการสรรหา HR',
        'pricing.faq.subtitle': 'คำถามทั่วไปเกี่ยวกับบริการ HR และแผนราคาของเราในประเทศไทย',
        'pricing.faq.question1': 'สามารถเปลี่ยนแผน HR ของฉันได้ในภายหลังหรือไม่?',
        'pricing.faq.answer1': 'ได้ คุณสามารถอัพเกรดหรือดาวน์เกรดแผนของคุณได้ตลอดเวลา การเปลี่ยนแปลงจะคำนวณตามวงจรการเรียกเก็บเงินปัจจุบันของคุณ',
        'pricing.faq.question2': 'คุณมีส่วนลดสำหรับบริการ HR ในประเทศไทยหรือไม่?',
        'pricing.faq.answer2': 'ได้ การเรียกเก็บรายปีมีส่วนลด 20% เมื่อเทียบกับการเรียกเก็บรายเดือน เหมาะสำหรับความต้องการสรรหาบุคลากรระยะยาว',
        'pricing.faq.question3': 'มีทดลองใช้ฟรีสำหรับการประกาศงานหรือไม่?',
        'pricing.faq.answer3': 'เรามีทดลองใช้ฟรี 14 วันบนแผนมืออาชีพ ทดสอบแพลตฟอร์มสรรหาของเราโดยไม่ต้องใช้บัตรเครดิต',
        'pricing.faq.question4': 'รับวิธีการชำระเงินใดบ้างสำหรับบริการ HR?',
        'pricing.faq.answer4': 'เรารับบัตรเครดิตหลัก การโอนเงินผ่านธนาคาร และออกใบแจ้งหนี้ภาษีสำหรับบริษัทไทยและลูกค้านานาชาติ',
        'pricing.faq.question5': 'การประกาศงานในประเทศไทยใช้ค่าใช้จ่ายเท่าไร?',
        'pricing.faq.answer5': 'การประกาศงานแต่ละตำแหน่งเริ่มต้นจาก ฿299 สำหรับรายการพื้นฐาน ฿599 สำหรับโพสต์เด่น และ ฿1,299 สำหรับตำแหน่งพรีเมียม',
        'pricing.faq.question6': 'แพ็กเกจโฆษณา HR ประกอบด้วยอะไรบ้าง?',
        'pricing.faq.answer6': 'แพ็กเกจโฆษณาของเราประกอบด้วยการวางแบนเนอร์ การตลาดอีเมล การโปรโมทสื่อสังคม และตัวเลือกการสนับสนุนงานกิจกรรม'
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

    // Update pricing page period text if on pricing page
    if (window.location.pathname.includes('pricing.html')) {
        setTimeout(() => {
            const billingToggle = document.getElementById('billing-toggle');
            const periodEls = document.querySelectorAll('.plan-price .period');
            if (billingToggle && periodEls.length > 0) {
                const yearly = billingToggle.checked;
                const isThai = lang === 'th';
                periodEls.forEach(p => {
                    if (yearly) {
                        p.textContent = isThai ? '/เดือน (เรียกเก็บรายปี)' : '/mo (billed yearly)';
                    } else {
                        p.textContent = isThai ? '/เดือน' : '/mo';
                    }
                });
            }
        }, 50);
    }
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

