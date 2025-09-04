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
    // ======= Enhanced Scroll Animation with Fade Effects =======
    const observerOptions = {
      root: null,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-10px 0px -10px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate fade based on position in viewport
        let opacity = 1;
        let translateY = 0;
        
        if (entry.isIntersecting) {
          // Element is in viewport - calculate fade based on position
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
          const maxDistance = windowHeight / 2;
          
          // Fade out as element moves away from center
          opacity = Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7);
          
          // Add active class for main animation
          element.classList.add('active');
          
          // Apply dynamic opacity
          element.style.opacity = opacity;
          element.style.transform = `translateY(${translateY}px)`;
        } else {
          // Element is outside viewport - fade out completely
          if (rect.bottom < 0) {
            // Element is above viewport
            opacity = 0.2;
            translateY = -20;
          } else if (rect.top > windowHeight) {
            // Element is below viewport
            opacity = 0.2;
            translateY = 20;
          }
          
          element.style.opacity = opacity;
          element.style.transform = `translateY(${translateY}px)`;
        }
      });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(element => observer.observe(element));
    
    // Enhanced scroll listener for continuous fade effects
    let ticking = false;
    
    function updateElementsOnScroll() {
      revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only apply fade effects to elements that are somewhat visible
        if (rect.bottom > -100 && rect.top < windowHeight + 100) {
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
          const maxDistance = windowHeight / 2;
          
          // Calculate opacity based on distance from viewport center
          let opacity = Math.max(0.2, 1 - (distanceFromCenter / maxDistance) * 0.8);
          
          // Boost opacity when element is well within viewport
          if (rect.top > 0 && rect.bottom < windowHeight) {
            opacity = Math.max(opacity, 0.9);
          }
          
          // Apply smooth transitions
          element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
          element.style.opacity = opacity;
        }
      });
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateElementsOnScroll);
        ticking = true;
      }
    });
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
        document.body.style.overflow = 'hidden';
        if (supermanLogoBg) supermanLogoBg.style.display = "block";
      });
    });
  
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (supermanLogoBg) supermanLogoBg.style.display = "none";
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (supermanLogoBg) supermanLogoBg.style.display = "none";
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (supermanLogoBg) supermanLogoBg.style.display = "none";
      }
    });
  
    // ======= Tool Modal =======
    const toolInfo = {
      python: { name: "Python", details: `<ul><li>CS452: Algorithm Design</li><li>CS149: Intro to Programming</li><li>DATA200: Introduction to Data Science</li><li>Experience: Noblis</li></ul>` },
      java: { name: "Java", details: `<ul><li>CS159: Intro to Programming</li><li>CS240: Data Structures and Algorithms</li><li>CS345: Software Engineering</li><li>CS327: Discrete Structures II</li></ul>` },
      docker: { name: "Docker", details: `<ul><li>Experience: Noblis</li><li>Personal: Containerized Tech Support Website</li></ul>` },
      html: { name: "HTML", details: "<ul><li>CS343: Application Development</li><li>Project: Personal Tech Support Website</li><li>Project: Personal Portfolio</li></ul>" },
      css: { name: "CSS", details: "<ul><li>CS343: Application Development</li><li>Project: Personal Tech Support Website</li><li>Project: Personal Portfolio</li></ul>" },
      javascript: { name: "JavaScript", details: "<ul><li>CS343: Application Development</li><li>Project: Personal Tech Support Website</li><li>Project: Personal Portfolio</li></ul>" },
      c: { name: "C", details: "<ul><li>CS261: Systems</li><li>CS361: Systems</li></ul>" },
      rust: { name: "Rust", details: "<ul><li>CS430: Programming Languages</li></ul>" },
      git: {name: "Git", details: "<ul><li>Experience: Noblis</li><li>CS345: Software Engineering</li><li>CS430: Programming Languages</li></ul>"},
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
        }
      });
    });
  
    if (toolModalClose) {
      toolModalClose.onclick = function() {
        toolModalOverlay.classList.remove('active');
      };
    }
  
    if (toolModalOverlay) {
      toolModalOverlay.onclick = function(e) {
        if (e.target === this) this.classList.remove('active');
      };
    }
  });
  