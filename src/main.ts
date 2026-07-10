// Main Orchestrator for Roasted Bean Roastery SPA
import { menuData, testimonialsData, branchesData, socialsData } from './data';
import './style.css';

console.log('Roasted Bean Roastery SPA initializing...');

// Current state
let currentTestimonialIndex = 0;

// ==============================================
// 1. ROUTER & VIEW MANAGEMENT
// ==============================================
const views = {
    home: document.getElementById('view-home'),
    menu: document.getElementById('view-menu'),
    about: document.getElementById('view-about'),
    contact: document.getElementById('view-contact')
};

function handleRouting() {
    const hash = window.location.hash || '#/';
    console.log('handleRouting triggered! Hash:', hash);
        
        // Hide all views
        Object.values(views).forEach(view => {
            if (view) {
                view.classList.add('hidden');
                view.classList.remove('fade-in');
            }
        });

        let activeViewKey: keyof typeof views = 'home';
        if (hash.startsWith('#/menu')) {
            activeViewKey = 'menu';
        } else if (hash.startsWith('#/about')) {
            activeViewKey = 'about';
        } else if (hash.startsWith('#/contact')) {
            activeViewKey = 'contact';
        }

        // Show active view
        const activeView = views[activeViewKey];
        if (activeView) {
            activeView.classList.remove('hidden');
            setTimeout(() => {
                activeView.classList.add('fade-in');
            }, 10);
        }

        // Update nav link active states
        updateNavLinks(activeViewKey);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Trigger scroll reveals
        triggerScrollReveals();
    }

    function updateNavLinks(activeViewKey: string) {
        // Desktop links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isMatch = (activeViewKey === 'home' && href === '#/') || 
                            (href === `#/${activeViewKey}`);
            
            if (isMatch) {
                link.className = "nav-link font-body-md text-body-md text-primary border-b-2 border-primary font-bold pb-1";
            } else {
                link.className = "nav-link font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200";
            }
        });

        // Mobile links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isMatch = (activeViewKey === 'home' && href === '#/') || 
                            (href === `#/${activeViewKey}`);
            
            if (isMatch) {
                link.className = "mobile-nav-link font-body-md text-body-lg text-primary font-bold";
            } else {
                link.className = "mobile-nav-link font-body-md text-body-lg text-on-surface-variant hover:text-primary";
            }
        });
    }

    // ==============================================
    // 2. MOBILE NAVIGATION DRAWER
    // ==============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileMenuCloseBtn = document.querySelector('.mobile-nav-close-btn');

    if (mobileMenuBtn && mobileNavDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavDrawer.classList.remove('translate-x-full');
        });
    }

    if (mobileMenuCloseBtn && mobileNavDrawer) {
        mobileMenuCloseBtn.addEventListener('click', () => {
            mobileNavDrawer.classList.add('translate-x-full');
        });
    }

    // Close mobile nav drawer when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavDrawer) {
                mobileNavDrawer.classList.add('translate-x-full');
            }
        });
    });

    // ==============================================
    // 3. DYNAMIC RENDERING - MENU
    // ==============================================
    function renderMenu() {
        const categories = ['espresso', 'pour_over', 'pastries'];
        categories.forEach(category => {
            const listId = `${category.replace('_', '-')}-menu-list`;
            const listContainer = document.getElementById(listId);
            if (!listContainer) return;
            
            listContainer.innerHTML = '';
            const items = menuData[category] || [];
            
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = "bg-surface-container-low rounded-xl border border-primary/5 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group/item";
                
                let tagsHtml = '';
                if (item.tags && item.tags.length > 0) {
                    tagsHtml = `<div class="flex gap-xs mt-sm flex-wrap">` + 
                        item.tags.map(t => `<span class="bg-tertiary-container/10 text-on-tertiary-container px-sm py-xs rounded-full text-label-sm">${t}</span>`).join('') + 
                        `</div>`;
                }

                const imgUrl = item.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80';

                card.innerHTML = `
                    <div class="h-44 w-full overflow-hidden relative">
                        <img src="${imgUrl}" alt="${item.name}" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500" loading="lazy"/>
                    </div>
                    <div class="p-md flex flex-col justify-between flex-grow">
                        <div>
                            <div class="flex justify-between items-start gap-sm">
                                <h3 class="font-headline-md text-headline-md text-primary group-hover/item:text-primary-container transition-colors duration-200">${item.name}</h3>
                                <span class="font-label-md text-label-md text-primary font-bold mt-xs">$${item.price.toFixed(2)}</span>
                            </div>
                            <p class="font-body-sm text-body-sm text-on-surface-variant mt-sm">${item.description}</p>
                        </div>
                        ${tagsHtml}
                    </div>
                `;

                // Add simple hover displacement interaction
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-4px)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                });

                listContainer.appendChild(card);
            });
        });
    }

    renderMenu();

    // ==============================================
    // 4. DYNAMIC RENDERING - TESTIMONIALS SLIDER
    // ==============================================
    const testimonialCard = document.getElementById('testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    function renderTestimonial(index: number) {
        if (!testimonialCard) return;
        const testimonial = testimonialsData[index];
        if (!testimonial) return;

        testimonialCard.style.opacity = '0';
        testimonialCard.style.transform = 'translateY(8px)';
        testimonialCard.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        setTimeout(() => {
            // Build stars rating
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                const fill = i < testimonial.rating ? '1' : '0';
                starsHtml += `<span class="material-symbols-outlined text-amber-500" style="font-variation-settings: 'FILL' ${fill};">star</span>`;
            }

            testimonialCard.innerHTML = `
                <div class="flex flex-col items-center">
                    <div class="flex gap-xs mb-sm">
                        ${starsHtml}
                    </div>
                    <p class="font-body-lg text-body-lg md:text-xl text-primary font-serif italic max-w-xl mb-md">
                        "${testimonial.quote}"
                    </p>
                    <div class="flex flex-col items-center">
                        <span class="font-label-md text-primary font-bold">${testimonial.name}</span>
                        <span class="font-body-sm text-on-surface-variant text-sm">${testimonial.role}</span>
                    </div>
                </div>
            `;
            
            testimonialCard.style.opacity = '1';
            testimonialCard.style.transform = 'translateY(0)';
        }, 200);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialsData.length) % testimonialsData.length;
            renderTestimonial(currentTestimonialIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsData.length;
            renderTestimonial(currentTestimonialIndex);
        });
    }

    // Initial Testimonial Render
    renderTestimonial(currentTestimonialIndex);

    // ==============================================
    // 5. DYNAMIC RENDERING - INTERACTIVE BRANCHES SELECTOR & DETAILS
    // ==============================================
    let activeBranchId = branchesData[0]?.id || '';

    function renderActiveBranchDetails(branch: any) {
        const detailsContainer = document.getElementById('contact-active-details');
        if (!detailsContainer) return;

        detailsContainer.style.opacity = '0';
        detailsContainer.style.transform = 'translateY(8px)';
        
        setTimeout(() => {
            detailsContainer.innerHTML = `
                <div class="flex flex-col gap-md">
                    <div>
                        <span class="text-primary font-label-sm uppercase tracking-widest block mb-xs">Selected Location</span>
                        <h3 class="font-headline-lg text-headline-lg text-primary">${branch.name}</h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-md mt-xs">
                        <!-- Contact Info -->
                        <div class="flex flex-col gap-sm">
                            <h4 class="font-label-md text-primary uppercase">Contact Info</h4>
                            <div class="flex flex-col gap-xs text-on-surface-variant font-body-sm">
                                <p class="flex items-start gap-xs">
                                    <span class="material-symbols-outlined text-sm mt-xs">location_on</span>
                                    <span>${branch.address}</span>
                                </p>
                                <p class="flex items-center gap-xs">
                                    <span class="material-symbols-outlined text-sm">phone</span>
                                    <span>${branch.phone}</span>
                                </p>
                                <p class="flex items-center gap-xs">
                                    <span class="material-symbols-outlined text-sm">mail</span>
                                    <span>${branch.email}</span>
                                </p>
                            </div>
                        </div>

                        <!-- Operating Hours -->
                        <div class="flex flex-col gap-sm bg-surface-container/40 p-sm rounded-lg border border-outline-variant/20">
                            <h4 class="font-label-md text-primary uppercase">Opening Hours</h4>
                            <div class="flex flex-col gap-xs text-on-surface-variant font-body-sm">
                                <div class="flex justify-between border-b border-outline-variant/10 pb-xs">
                                    <span>Mon - Fri</span>
                                    <span class="font-medium text-on-surface">${branch.hours.weekday}</span>
                                </div>
                                <div class="flex justify-between border-b border-outline-variant/10 pb-xs">
                                    <span>Saturday</span>
                                    <span class="font-medium text-on-surface">${branch.hours.saturday}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Sunday</span>
                                    <span class="font-medium text-on-surface">${branch.hours.sunday}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="h-px bg-outline-variant/30 my-xs"></div>

                    <!-- Styled Map Container for this branch -->
                    <div>
                        <h4 class="font-label-md text-primary uppercase mb-sm">Location Map</h4>
                        <div class="w-full h-80 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/40 relative">
                            <iframe 
                                class="w-full h-full border-0" 
                                src="https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                                allowfullscreen 
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                </div>
            `;
            detailsContainer.style.opacity = '1';
            detailsContainer.style.transform = 'translateY(0)';
        }, 150);
    }

    function renderBranchSelector() {
        const selectorContainer = document.getElementById('contact-branches-selector');
        if (!selectorContainer) return;
        
        selectorContainer.innerHTML = '';
        branchesData.forEach(branch => {
            const isActive = branch.id === activeBranchId;
            const card = document.createElement('button');
            
            // Styled active vs inactive selection card
            card.className = isActive 
                ? "text-left w-full bg-surface-container-low rounded-xl p-md border-2 border-primary shadow-sm transition-all duration-200 flex items-start gap-md"
                : "text-left w-full bg-background hover:bg-surface-container-low/50 rounded-xl p-md border border-outline-variant/30 transition-all duration-200 flex items-start gap-md";
            
            const pinColor = isActive ? "text-primary font-bold" : "text-on-surface-variant";
            
            card.innerHTML = `
                <span class="material-symbols-outlined ${pinColor} text-2xl mt-xs" style="font-variation-settings: 'FILL' ${isActive ? '1' : '0'};">location_on</span>
                <div class="flex flex-col">
                    <span class="font-headline-md text-primary text-lg font-bold">${branch.name}</span>
                    <span class="font-body-sm text-on-surface-variant text-sm mt-xs line-clamp-1">${branch.address}</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                activeBranchId = branch.id;
                renderBranchSelector();
                renderActiveBranchDetails(branch);
            });
            
            selectorContainer.appendChild(card);
        });
    }

    // Initial branch rendering
    renderBranchSelector();
    if (branchesData.length > 0) {
        renderActiveBranchDetails(branchesData[0]);
    }

    // ==============================================
    // 6. DYNAMIC RENDERING - SOCIAL LINKS
    // ==============================================
    function renderSocials() {
        const containers = document.querySelectorAll('.footer-social-links');
        containers.forEach(container => {
            container.innerHTML = `
                <span class="font-label-md text-primary mb-xs">Social</span>
                <a class="font-body-sm text-on-surface-variant hover:text-primary transition-colors hover:underline" href="${socialsData.instagram}" target="_blank">Instagram</a>
                <a class="font-body-sm text-on-surface-variant hover:text-primary transition-colors hover:underline" href="${socialsData.facebook}" target="_blank">Facebook</a>
                <a class="font-body-sm text-on-surface-variant hover:text-primary transition-colors hover:underline" href="${socialsData.twitter}" target="_blank">Twitter</a>
                <a class="font-body-sm text-on-surface-variant hover:text-primary transition-colors hover:underline" href="mailto:${socialsData.email}">Email Us</a>
            `;
        });
    }

    renderSocials();

    // ==============================================
    // 7. SCROLL REVEAL UTILITIES
    // ==============================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    function triggerScrollReveals() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => {
            el.classList.remove('active'); // reset
            scrollObserver.observe(el);
        });
    }

    // ==============================================
    // 8. TAPS & CLICKS INTERACTIONS
    // ==============================================
    const buttons = document.querySelectorAll('button:not(.no-tap-effect), .tap-effect');
    buttons.forEach(btn => {
        if (btn instanceof HTMLElement) {
            btn.addEventListener('mousedown', () => {
                btn.classList.add('scale-95');
                btn.style.transition = 'transform 0.1s ease';
            });
            const removeScale = () => {
                btn.classList.remove('scale-95');
            };
            btn.addEventListener('mouseup', removeScale);
            btn.addEventListener('mouseleave', removeScale);
            btn.addEventListener('touchend', removeScale);
        }
    });

    // ==============================================
    // 9. APP INITIALIZATION & ROUTING TRIGGER
    // ==============================================
    // Listen to hash change
    window.addEventListener('hashchange', handleRouting);
    // Initial routing execution (all observers and elements are fully declared)
    handleRouting();

