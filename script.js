document.addEventListener("DOMContentLoaded", function () {
    const projectDetails = [
        {
            title: "Superman Video Game",
            description: "Developing a Superman-themed video game using Unreal Engine, implementing animation-driven locomotion and special effects with vector math.",
            video: "assets/Superman Game Demo.mp4"
        },
        {
            title: "Determan Tech Help Website",
            description: "Developed a website for my tech support company, Determan Tech Help.<br><a href=\"https://determantechhelp.com\" target=\"_blank\">Visit Site</a>",
            iframe: "https://determantechhelp.com"
        },
        {
            title: "Terminal Spreadsheet",
            description: "Designed and implemented a terminal-based spreadsheet in Ruby.",
            video: "assets/terminal-spreadsheet-demo.mp4"
        },
        {
            title: "Max Clique NP-Complete Problem",
            description: "Developed and analyzed exact and approximate Python algorithms to solve the NP-hard Max Clique problem using backtracking and greedy heuristics.<br><a href=\"https://docs.google.com/presentation/d/19n8e7ejFToUpYZB0LnyTBF18ssKIEcX4g2cajdv9efE/edit?usp=sharing\" target=\"_blank\">View Full Presentation</a>",
            iframe: "https://docs.google.com/presentation/d/19n8e7ejFToUpYZB0LnyTBF18ssKIEcX4g2cajdv9efE/embed?start=false&loop=false&delayms=3000"
        },
        {
            title: "Today in History Calendar",
            description: "Designed and developed a responsive, interactive web calendar that integrates Canvas tasks with historical events.<br><a href=\"https://w3stu.cs.jmu.edu/determsc/cs343/project\" target=\"_blank\">Visit Site</a>",
            iframe: "https://w3stu.cs.jmu.edu/determsc/cs343/project"
        },
        {
          title: "McIntosh Powerwash Website",
          description: "Contracted to develop a website for a power washing company, McIntosh Powerwash.<br><a href=\"https://mcintoshpowerwash.com\" target=\"_blank\">Visit Site</a>",
          iframe: "https://mcintoshpowerwash.com"
      },
    ];

    // ======= Mobile Navigation Toggle =======
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
  
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
      burger.classList.toggle('active');
  
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    });
  
    // ======= Scroll Animation =======
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(element => observer.observe(element));
    
    // ======= Smooth Scroll for Navigation Links =======
    function smoothScrollTo(targetPosition, duration = 800) {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;
    
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
    
      // Easing function for smooth animation
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
    
      requestAnimationFrame(animation);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.remove('active');
        burger.classList.remove('active');
    
        const targetId = this.getAttribute('href');
        
        // Special case for About - scroll to top
        if (targetId === '#about') {
          smoothScrollTo(0);
          return;
        }
    
        const target = document.querySelector(targetId);
        if (target) {
          // Calculate navbar height for proper offset
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight - 20; // 20px extra padding
          
          smoothScrollTo(targetPosition);
        }
      });
    });
  
    // ======= Form Submission =======
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  
    // ======= Parallax Scroll Effect =======
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const home = document.querySelector('#home');
      if (!home) return;
      const limit = home.offsetTop + home.offsetHeight;
      if (scrolled <= limit) {
        home.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    });
  
    // ======= Project Modal =======
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.project-modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    const supermanLogoBg = document.getElementById('superman-logo-bg');
  
    projectCards.forEach((card, idx) => {
      card.style.cursor = "pointer";
      card.addEventListener('click', () => {
        const data = projectDetails[idx];
        modalTitle.textContent = data.title;
        modalDescription.innerHTML = data.description;
        modalImage.innerHTML = "";
  
        if (data.iframe) {
          modalImage.style.backgroundImage = "none";
          const iframe = document.createElement('iframe');
          iframe.src = data.iframe;
          iframe.width = "100%";
          iframe.height = "100%";
          iframe.style.border = "1px solid #222";
          iframe.style.borderRadius = "10px";
          iframe.allow = "fullscreen";
          modalImage.appendChild(iframe);
        } else if (data.video) {
          modalImage.style.backgroundImage = "none";
          const video = document.createElement('video');
          video.src = data.video;
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.controls = false;
          modalImage.appendChild(video);
        } else if (data.image) {
          modalImage.style.backgroundImage = `url('${data.image}')`;
        } else {
          modalImage.style.backgroundImage = "none";
        }
  
        modal.classList.add('active');
        document.documentElement.classList.add('no-scroll');
        if (supermanLogoBg) supermanLogoBg.style.display = "block";
      });
    });
  
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.documentElement.classList.remove('no-scroll');
      if (supermanLogoBg) supermanLogoBg.style.display = "none";
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
        if (supermanLogoBg) supermanLogoBg.style.display = "none";
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
        if (supermanLogoBg) supermanLogoBg.style.display = "none";
      }
    });
  
    // ======= Tool Modal =======
    const toolInfo = {
        python: { 
            name: "Python", 
            details: `<ul>
                <li>CS452: Design and Analysis of Algorithms</li>
                <li>CS149: Introduction to Programming</li>
                <li>DATA200: Introduction to Data Science</li>
                <li>CS445: Machine Learning</li>
                <li>Experience: Noblis</li>
            </ul>` 
        },
        java: { 
            name: "Java", 
            details: `<ul>
                <li>CS159: Advanced Programming</li>
                <li>CS240: Algorithms and Data Structures</li>
                <li>CS345: Software Engineering</li>
                <li>CS327: Discrete Structures II</li>
            </ul>` 
        },
        docker: { 
            name: "Docker", 
            details: `<ul>
                <li>Experience: Noblis</li>
            </ul>` 
        },
        html: { 
            name: "HTML", 
            details: `<ul>
                <li>CS343: Application Development</li>
                <li>Project: Personal Tech Support Website</li>
                <li>Project: Personal Portfolio</li>
                <li>Project: NoXcuses Web Application</li>
                <li>Project: Today in History Calendar</li>
            </ul>` 
        },
        css: { 
            name: "CSS", 
            details: `<ul>
                <li>CS343: Application Development</li>
                <li>Project: Personal Tech Support Website</li>
                <li>Project: Personal Portfolio</li>
                <li>Project: NoXcuses Web Application</li>
                <li>Project: Today in History Calendar</li>
            </ul>` 
        },
        javascript: { 
            name: "JavaScript", 
            details: `<ul>
                <li>CS343: Application Development</li>
                <li>Project: Personal Tech Support Website</li>
                <li>Project: Personal Portfolio</li>
                <li>Project: NoXcuses Web Application</li>
                <li>Project: Today in History Calendar</li>
            </ul>` 
        },
        c: { 
            name: "C", 
            details: `<ul>
                <li>CS261: Computer Systems I</li>
                <li>CS361: Computer Systems II</li>
            </ul>` 
        },
        rust: { 
            name: "Rust", 
            details: `<ul>
                <li>CS430: Programming Languages</li>
            </ul>` 
        },
        git: {
            name: "Git", 
            details: `<ul>
                <li>Experience: Noblis</li>
                <li>CS345: Software Engineering</li>
                <li>CS430: Programming Languages</li>
                <li>CS343: Application Development</li>
                <li>CS361: Computer Systems II</li>
                <li>CS374: Database Systems</li>
                <li>Project: NoXcuses Web Application</li>
                <li>Project: Personal Portfolio</li>
                <li>Project: Personal Tech Support Website</li>
            </ul>`
        },
        matplotlib: { 
            name: "Matplotlib", 
            details: `<ul>
                <li>DATA200: Introduction to Data Science</li>
                <li>CS452: Algorithm Design</li>
                <li>Project: Max Clique NP-Complete Problem</li>
            </ul>` 
        },
        latex: { 
            name: "LaTeX", 
            details: `<ul>
                <li>DATA200: Introduction to Data Science</li>
            </ul>` 
        },
        kafka: { 
            name: "Apache Kafka", 
            details: `<ul>
                <li>Experience: Noblis</li>
            </ul>` 
        },
        ruby: { 
            name: "Ruby", 
            details: `<ul>
                <li>Project: Terminal Spreadsheet Project</li>
                <li>CS430: Application Development</li>
            </ul>` 
        }
    };
  
    const techItems = document.querySelectorAll('.tech-item[data-tool]');
    const toolModalOverlay = document.getElementById('tool-modal-overlay');
    const toolModalClose = document.getElementById('tool-modal-close');
  
    techItems.forEach(item => {
      item.style.cursor = "pointer";
      item.addEventListener('click', function() {
        const tool = this.getAttribute('data-tool');
        if (toolInfo[tool]) {
          document.getElementById('tool-modal-title').innerText = toolInfo[tool].name;
          document.getElementById('tool-modal-body').innerHTML = toolInfo[tool].details;
          toolModalOverlay.classList.add('active');
          document.documentElement.classList.add('no-scroll');
        }
      });
    });
  
    if (toolModalClose) {
      toolModalClose.onclick = function() {
        toolModalOverlay.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
      };
    }
  
    if (toolModalOverlay) {
      toolModalOverlay.onclick = function(e) {
        if (e.target === this) {
          this.classList.remove('active');
          document.documentElement.classList.remove('no-scroll');
        }
      };
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && toolModalOverlay && toolModalOverlay.classList.contains('active')) {
        toolModalOverlay.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
      }
    });
});
  