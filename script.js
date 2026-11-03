// ==========================================================================
// COLE DETERMAN PORTFOLIO — CLIENT-SIDE ARCHITECTURE & INTERACTION SYSTEM
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // 1. KINETIC FLOATING CURSOR PREVIEW (DESKTOP)
    // ==========================================================================
    const preview = document.getElementById('kinetic-preview');
    const previewImg = document.getElementById('preview-img');
    const previewId = document.getElementById('preview-id');
    const previewCat = document.getElementById('preview-cat');
    const previewDesc = document.getElementById('preview-desc');
    const previewStack = document.getElementById('preview-stack');

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isPreviewVisible = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX + 24;
        mouseY = e.clientY - 90;

        // Viewport bounds detection
        if (mouseX + 340 > window.innerWidth) {
            mouseX = e.clientX - 350;
        }
        if (mouseY + 390 > window.innerHeight) {
            mouseY = window.innerHeight - 400;
        }
        if (mouseY < 20) {
            mouseY = 20;
        }
    });

    function renderPreviewFollow() {
        if (isPreviewVisible && preview) {
            currentX += (mouseX - currentX) * 0.18;
            currentY += (mouseY - currentY) * 0.18;
            preview.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
        requestAnimationFrame(renderPreviewFollow);
    }
    requestAnimationFrame(renderPreviewFollow);

    // ==========================================================================
    // 2. PROJECT DRAWER (SPECIFICATION DOSSIER)
    // ==========================================================================
    const drawer = document.getElementById('project-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const closeDrawerBtn = document.getElementById('close-drawer');

    const drawerIdNum = document.getElementById('drawer-id-num');
    const drawerCat = document.getElementById('drawer-cat');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerYear = document.getElementById('drawer-year');
    const drawerDesc = document.getElementById('drawer-desc');
    const drawerTags = document.getElementById('drawer-tags');
    const drawerMediaContainer = document.getElementById('drawer-media-container');

    const drawerSec = document.getElementById('drawer-sec');
    const drawerRel = document.getElementById('drawer-rel');
    const drawerPipe = document.getElementById('drawer-pipe');
    const drawerLic = document.getElementById('drawer-lic');

    const drawerRepoBtn = document.getElementById('drawer-repo-btn');
    const drawerLiveBtn = document.getElementById('drawer-live-btn');
    const drawerLiveBtnText = document.getElementById('drawer-live-btn-text');

    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach(row => {
        // --- Hover preview triggers ---
        row.addEventListener('mouseenter', () => {
            const id = row.getAttribute('data-id');
            const title = row.getAttribute('data-title');
            const domain = row.getAttribute('data-domain');
            const desc = row.getAttribute('data-desc');
            const img = row.getAttribute('data-img');
            const stack = (row.getAttribute('data-stack') || '').split(',');

            if (previewId) previewId.textContent = `${id} // ${title.toUpperCase()}`;
            if (previewCat) previewCat.textContent = domain;
            if (previewDesc) previewDesc.textContent = desc;
            if (previewImg && img) previewImg.src = img;

            if (previewStack) {
                previewStack.innerHTML = '';
                stack.forEach(tech => {
                    const badge = document.createElement('span');
                    badge.className = 'font-label-code text-caption px-1.5 py-0.5 bg-surface-container border border-hairline-border text-text-primary text-[10px]';
                    badge.textContent = tech.trim();
                    previewStack.appendChild(badge);
                });
            }

            if (preview) {
                preview.classList.remove('opacity-0');
                isPreviewVisible = true;
            }
        });

        row.addEventListener('mouseleave', () => {
            if (preview) {
                preview.classList.add('opacity-0');
                isPreviewVisible = false;
            }
        });

        // --- Click trigger: Open Specification Dossier ---
        row.addEventListener('click', () => {
            const id = row.getAttribute('data-id');
            const title = row.getAttribute('data-title');
            const domain = row.getAttribute('data-domain');
            const desc = row.getAttribute('data-desc');
            const year = row.getAttribute('data-year');
            const img = row.getAttribute('data-img');
            const iframe = row.getAttribute('data-iframe');
            const stack = (row.getAttribute('data-stack') || '').split(',');

            const sec = row.getAttribute('data-sec') || 'CONTAINER ISOLATION';
            const rel = row.getAttribute('data-rel') || 'HIGH AVAILABILITY';
            const pipe = row.getAttribute('data-pipe') || 'CI/CD PIPELINE';
            const lic = row.getAttribute('data-lic') || 'OPEN SOURCE';

            const github = row.getAttribute('data-github');
            const live = row.getAttribute('data-live');
            const liveText = row.getAttribute('data-live-text') || 'VISIT SITE';

            if (drawerIdNum) drawerIdNum.textContent = id;
            if (drawerCat) drawerCat.textContent = domain;
            if (drawerTitle) drawerTitle.textContent = title;
            if (drawerYear) drawerYear.textContent = `RELEASE CYCLE // ${year}`;
            if (drawerDesc) drawerDesc.textContent = desc;

            if (drawerSec) drawerSec.textContent = sec;
            if (drawerRel) drawerRel.textContent = rel;
            if (drawerPipe) drawerPipe.textContent = pipe;
            if (drawerLic) drawerLic.textContent = lic;

            // Render Stack badges
            if (drawerTags) {
                drawerTags.innerHTML = '';
                stack.forEach(tech => {
                    const badge = document.createElement('span');
                    badge.className = 'font-label-code text-caption px-3 py-1 bg-surface-container-high border border-hairline-border text-text-primary font-medium';
                    badge.textContent = tech.trim();
                    drawerTags.appendChild(badge);
                });
            }

            // Render Media (Video Iframe vs Image)
            if (drawerMediaContainer) {
                drawerMediaContainer.innerHTML = '';
                if (iframe) {
                    const embed = document.createElement('iframe');
                    embed.src = iframe;
                    embed.className = 'w-full h-full border-0';
                    embed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                    embed.allowFullscreen = true;
                    drawerMediaContainer.appendChild(embed);
                } else if (img) {
                    const imageEl = document.createElement('img');
                    imageEl.src = img;
                    imageEl.alt = title;
                    imageEl.className = 'w-full h-full object-contain bg-canvas-base p-2';
                    drawerMediaContainer.appendChild(imageEl);
                }
            }

            // Action Buttons
            if (drawerRepoBtn) {
                if (github) {
                    drawerRepoBtn.href = github;
                    drawerRepoBtn.classList.remove('hidden');
                } else {
                    drawerRepoBtn.classList.add('hidden');
                }
            }

            if (drawerLiveBtn) {
                if (live && live !== "") {
                    drawerLiveBtn.href = live;
                    if (drawerLiveBtnText) drawerLiveBtnText.textContent = liveText.toUpperCase();
                    drawerLiveBtn.classList.remove('hidden');
                } else {
                    drawerLiveBtn.classList.add('hidden');
                }
            }

            // Show drawer
            if (drawer) drawer.classList.remove('translate-x-full');
            if (drawerBackdrop) drawerBackdrop.classList.remove('hidden');
            if (preview) {
                preview.classList.add('opacity-0');
                isPreviewVisible = false;
            }
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Drawer Handler
    function closeDrawer() {
        if (drawer) drawer.classList.add('translate-x-full');
        if (drawerBackdrop) drawerBackdrop.classList.add('hidden');
        if (drawerMediaContainer) {
            // Stop any playing iframe videos
            const iframes = drawerMediaContainer.querySelectorAll('iframe');
            iframes.forEach(f => f.src = f.src);
        }
        document.body.style.overflow = '';
    }

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // ==========================================================================
    // 3. CATEGORY FILTER LOGIC
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-text-primary', 'text-canvas-base', 'active');
                b.classList.add('text-text-secondary');
            });
            btn.classList.add('bg-text-primary', 'text-canvas-base', 'active');
            btn.classList.remove('text-text-secondary');

            const filter = btn.getAttribute('data-filter');

            projectRows.forEach(row => {
                const cat = row.getAttribute('data-cat');
                if (filter === 'all' || cat === filter) {
                    row.style.display = 'flex';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // ==========================================================================
    // 4. SIDEBAR SCROLL SPY & NAVIGATION HIGHLIGHT
    // ==========================================================================
    const navItems = document.querySelectorAll('#sidebar-nav .nav-item');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            const targetSection = item.getAttribute('data-section');
            if (targetSection === currentSectionId) {
                item.classList.add('bg-text-primary', 'text-canvas-base', 'font-semibold');
                item.classList.remove('text-text-secondary');
            } else {
                item.classList.remove('bg-text-primary', 'text-canvas-base', 'font-semibold');
                item.classList.add('text-text-secondary');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
});