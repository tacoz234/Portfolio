document.addEventListener("DOMContentLoaded", function () {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const projectDetails = {
        "isopod": {
            title: "Isopod Minecraft Server",
            tools: ["Docker", "Python", "REST APIs"],
            description: "Developing a Minecraft server management application using Docker for containerization and a Python backend for server control. Features include automated server startup/shutdown, resource monitoring, and a REST API for interaction.",
            image: "assets/isopod.png",
            github: "https://github.com/Isopod-Project/Isopod",
            live: "https://isopod-project.github.io/Isopod-Website/#tech"
        },
        "xact-training": {
            title: "Xact Training iOS App",
            tools: ["SwiftUI", "Firebase"],
            description: "Developing a fitness tracking iOS application using SwiftUI, Core Data, and Firebase. Features include user authentication, workout logging, and progress visualization. Currently in the testing phase with a small user base.",
            image: "assets/noxcusesios.png",
            video: "assets/noxcuses.mp4",
        },
        "superman": {
            title: "Superman Video Game",
            tools: ["Unreal Engine", "C++"],
            description: "Developing a Superman-themed video game using Unreal Engine, implementing animation-driven locomotion and special effects with vector math.",
            image: "assets/superman.png",
            video: "assets/superman_game_demo.mp4",
        },
        "nox-web": {
            title: "NoXcuses Web App",
            tools: ["JavaScript", "Node.js"],
            description: "Developing a full-stack workout tracking web application using HTML, CSS, and JavaScript, hosted on a personal server.",
            iframe: "https://noxcuses.me",
            github: "https://github.com/tacoz234/NoXcuses-WebApp",
            live: "https://noxcuses.me"
        },
        "brave-icon-changer": {
            title: "Brave Icon Changer",
            tools: ["Python", "Tkinter", "Batch"],
            description: "Developing a desktop application to change the icon of the Brave browser on Windows and MacOS. Features include selecting a custom icon, automatically updating the Brave shortcut, and preserving all browser settings and bookmarks.",
            image: "assets/brave_icon_changer.png",
            github: "https://github.com/tacoz234/Custom-Brave-Icons",
        },
        "tech-help": {
            title: "Determan Tech Help Website",
            tools: ["Node.js", "CloudFlare"],
            description: "Developed a website for my tech support company, Determan Tech Help.",
            iframe: "https://determantechhelp.com",
            github: "https://github.com/tacoz234/DetermanTechHelp",
            live: "https://determantechhelp.com"
        }
    };

    const toolInfo = {
        python: { name: "Python", details: "Extensive experience in algorithm design (CS452), data science (DATA200), and internship work at Noblis." },
        java: { name: "Java", details: "Core language for academic projects (CS159, CS240, CS345) including data structures and software engineering." },
        javascript: { name: "JavaScript", details: "Full-stack development for personal projects and CS343, including React and Node.js." },
        rust: { name: "Rust", details: "Focused on systems programming and memory safety explored in Programming Languages (CS430)." },
        c: { name: "C", details: "Low-level systems programming and hardware interaction (CS261, CS361)." },
        docker: { name: "Docker", details: "Containerization for consistent deployments, heavily used during Noblis internship." },
        git: { name: "Git", details: "Standard version control for all team and personal projects, including advanced branching and CI/CD." },
        kafka: { name: "Kafka", details: "Distributed streaming platform experience for high-throughput data handled at Noblis." },
        sql: { name: "SQL", details: "Database design and complex querying explored in Database Systems (CS374)." },
        numpy: { name: "NumPy", details: "Mathematical computing for machine learning and data analysis projects." },
        swift: { name: "Swift", details: "Primary language for iOS development, specifically the NoXcuses app." },
        ruby: { name: "Ruby", details: "Used for scripting and building the Terminal Spreadsheet project." },
        latex: { name: "LaTeX", details: "Professional document preparation for technical reports and academic papers." }
    };

    // ======= Theme Toggle =======
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        themeIcon.setAttribute('data-lucide', theme === 'light' ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // ======= Custom Cursor =======
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const interactiveElements = document.querySelectorAll('a, .btn, .project-minimal-card, .marquee-item, .theme-toggle, .course-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(166, 255, 0, 0.1)';
            cursorOutline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
    });

    // ======= Scroll Reveals =======
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ======= Navigation Pill Active State =======
    const navLinks = document.querySelectorAll('.nav-pill a');
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    // ======= Project Modal & Filtering =======
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalActions = document.getElementById('modal-actions');
    const closeBtn = document.querySelector('.project-modal-close');
    const projectCards = document.querySelectorAll('.project-minimal-card');

    const closeModal = () => {
        modal.classList.remove('active', 'tool-modal');
        document.body.style.overflow = "";
        modalImage.innerHTML = "";
        if (modalActions) modalActions.innerHTML = "";
    };

    const GITHUB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

    // ======= Populate Card Hover Quick-Links Dynamically =======
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project');
        const data = projectDetails[projectId];
        if (!data) return;

        const hoverIconsContainer = card.querySelector('.project-hover-icons');
        if (hoverIconsContainer) {
            hoverIconsContainer.innerHTML = ""; // Clear static placeholders

            if (data.github) {
                const link = document.createElement('a');
                link.href = data.github;
                link.target = "_blank";
                link.title = "View GitHub Repository";
                link.innerHTML = GITHUB_SVG;
                link.addEventListener('click', (e) => e.stopPropagation());
                hoverIconsContainer.appendChild(link);
            }

            if (data.live) {
                const link = document.createElement('a');
                link.href = data.live;
                link.target = "_blank";
                link.title = "Visit Live Website";
                link.innerHTML = `<i data-lucide="external-link"></i>`;
                link.addEventListener('click', (e) => e.stopPropagation());
                hoverIconsContainer.appendChild(link);
            }
        }
    });

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectDetails[projectId];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDescription.innerHTML = data.description;
            modalImage.innerHTML = "";

            if (data.iframe) {
                const iframe = document.createElement('iframe');
                iframe.src = data.iframe;
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.style.border = "none";
                modalImage.appendChild(iframe);
            } else if (data.video) {
                const video = document.createElement('video');
                video.src = data.video;
                video.controls = true;
                video.autoplay = true;
                video.style.width = "100%";
                modalImage.appendChild(video);
            } else if (data.image) {
                const img = document.createElement('img');
                img.src = data.image;
                img.style.width = "100%";
                img.style.objectFit = "contain";
                modalImage.appendChild(img);
            }

            // Populate modal actions container
            if (modalActions) {
                modalActions.innerHTML = "";

                if (data.github) {
                    const githubBtn = document.createElement('a');
                    githubBtn.href = data.github;
                    githubBtn.target = "_blank";
                    githubBtn.className = "btn modal-btn github-btn";
                    githubBtn.innerHTML = `${GITHUB_SVG} GitHub`;
                    modalActions.appendChild(githubBtn);
                }

                if (data.live) {
                    const liveBtn = document.createElement('a');
                    liveBtn.href = data.live;
                    liveBtn.target = "_blank";
                    liveBtn.className = "btn modal-btn live-btn";
                    liveBtn.innerHTML = `<i data-lucide="external-link"></i> Visit Site`;
                    modalActions.appendChild(liveBtn);
                }
            }

            // Recreate icons inside dynamically added components
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            modal.classList.add('active');
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });

    // ======= Tool & Filter Interactivity =======
    const marqueeItems = document.querySelectorAll('.marquee-item[data-tool]');
    marqueeItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const toolId = item.getAttribute('data-tool');

            // Highlight projects with this tool
            const toolName = toolInfo[toolId]?.name.toLowerCase();
            projectCards.forEach(card => {
                const cardTools = projectDetails[card.getAttribute('data-project')]?.tools || [];
                const matches = cardTools.some(t => t.toLowerCase().includes(toolName));

                if (matches) {
                    card.style.transform = "scale(1.05)";
                    card.style.borderColor = "var(--accent-color)";
                    card.style.zIndex = "10";
                } else {
                    card.style.opacity = "0.3";
                    card.style.filter = "grayscale(1)";
                }
            });

            // Show Tool Info Modal
            const data = toolInfo[toolId];
            if (data) {
                setTimeout(() => {
                    modal.classList.add('tool-modal');
                    modalTitle.textContent = data.name;
                    modalDescription.textContent = data.details;
                    modalImage.innerHTML = "";
                    modal.classList.add('active');
                    document.body.style.overflow = "hidden";
                }, 300);
            }

            // Reset after delay
            setTimeout(() => {
                projectCards.forEach(card => {
                    card.style.transform = "";
                    card.style.borderColor = "";
                    card.style.opacity = "";
                    card.style.filter = "";
                    card.style.zIndex = "";
                });
            }, 3000);
        });
    });
});