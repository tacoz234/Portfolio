document.addEventListener("DOMContentLoaded", function () {
    const projectDetails = {
        "nox-ios": {
            title: "NoXcuses iOS App",
            description: "Developing a fitness tracking iOS application using SwiftUI, Core Data, and Firebase. Features include user authentication, workout logging, and progress visualization. Currently in the testing phase with a small user base.",
            image: "assets/noxcusesios.png",
            video: "assets/noxcuses.mp4",
        },
        "superman": {
            title: "Superman Video Game",
            description: "Developing a Superman-themed video game using Unreal Engine, implementing animation-driven locomotion and special effects with vector math.",
            image: "assets/superman.png",
            video: "assets/superman_game_demo.mp4",
        },
        "nox-web": {
            title: "NoXcuses Web App",
            description: "Developing a full-stack workout tracking web application using HTML, CSS, and JavaScript, hosted on a personal server.<br><a href=\"https://noxcuses.me\" target=\"_blank\">Visit Site</a>",
            iframe: "https://noxcuses.me"
        },
        "tech-help": {
            title: "Determan Tech Help Website",
            description: "Developed a website for my tech support company, Determan Tech Help.<br><a href=\"https://determantechhelp.com\" target=\"_blank\">Visit Site</a>",
            iframe: "https://determantechhelp.com"
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

    // ======= Navigation Pill Active State =======
    const navLinks = document.querySelectorAll('.nav-pill a');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        threshold: 0.3,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ======= Project Modal =======
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.project-modal-close');
    const projectCards = document.querySelectorAll('.project-minimal-card');

    const closeModal = () => {
        modal.classList.remove('active');
        modal.classList.remove('tool-modal');
        document.body.style.overflow = "";
        modalImage.innerHTML = ""; 
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectDetails[projectId];
            if (!data) return;

            modal.classList.remove('tool-modal');
            modalTitle.textContent = data.title;
            modalDescription.innerHTML = data.description;
            modalImage.innerHTML = "";

            if (data.iframe) {
                const iframe = document.createElement('iframe');
                iframe.src = data.iframe;
                iframe.width = "100%";
                iframe.height = "100%";
                iframe.style.border = "none";
                iframe.allow = "fullscreen";
                modalImage.appendChild(iframe);
            } else if (data.video) {
                const video = document.createElement('video');
                video.src = data.video;
                video.controls = true;
                video.autoplay = true;
                video.style.width = "100%";
                video.style.height = "100%";
                modalImage.appendChild(video);
            } else if (data.image) {
                const img = document.createElement('img');
                img.src = data.image;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "contain";
                modalImage.appendChild(img);
            }

            modal.classList.add('active');
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });

    // ======= Tool Interactivity =======
    const marqueeItems = document.querySelectorAll('.marquee-item[data-tool]');
    marqueeItems.forEach(item => {
        item.style.cursor = "pointer";
        item.addEventListener('click', () => {
            const toolId = item.getAttribute('data-tool');
            const data = toolInfo[toolId];
            if (!data) return;

            modal.classList.add('tool-modal');
            modalTitle.textContent = data.name;
            modalDescription.textContent = data.details;
            modalImage.innerHTML = "";
            modal.classList.add('active');
            document.body.style.overflow = "hidden";
        });
    });
});