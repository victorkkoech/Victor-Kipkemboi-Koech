document.addEventListener('DOMContentLoaded', function() {
  // Enable smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.getElementById(targetId.substring(1));
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Typing animation
  const texts = [
    'Full-Stack Developer 👨‍💻',
    'Blockchain Engineer ⛓️',
    'Cybersecurity Specialist 🛡️',
    'SDLC Expert 🔄',
    'AI Automation Expert 🤖'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function type() {
    if (!typingElement) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of word
      isDeleting = true;
      setTimeout(type, 2500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      // Pause before typing new word
      setTimeout(type, 700);
    } else {
      setTimeout(type, Math.random() * 50 + typingSpeed);
    }
  }

  // Start the typing animation
  type();

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  }

  function closeMenuOnClickOutside(e) {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      toggleMenu();
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking links
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        toggleMenu();
      });
    });
  }

  // Add click event to document to close menu when clicking outside
  document.addEventListener('click', closeMenuOnClickOutside);

  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });

  // Change navbar style on scroll
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      
      // Show success message
      if (toast) {
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }
      
      // Reset form
      contactForm.reset();
    });
  }

  // Initialize skill bars animation
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.style.width;
          skillBar.style.width = '0';
          
          setTimeout(() => {
            skillBar.style.width = width;
          }, 100);
          
          observer.unobserve(skillBar);
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe skill bars
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }
  
  // Initialize skill bars animation
  initSkillBars();

  // 3D Cube Animation
  const cube = document.querySelector('.cube');
  const sections = ['home', 'about', 'projects', 'services', 'testimonials', 'contact'];
  
  // Update the cube rotation based on scroll position
  function updateCube() {
    if (!cube) return;
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate the scroll percentage
    const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
    
    // Determine which section is currently in view
    sections.forEach((section, index) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        
        if (scrollPosition >= sectionTop - 300 && scrollPosition < sectionTop + sectionHeight - 300) {
          // Rotate the cube to show the current section
          switch (index) {
            case 0: // Home
              cube.style.transform = 'translateZ(-40px) rotateX(0deg) rotateY(0deg)';
              break;
            case 1: // About
              cube.style.transform = 'translateZ(-40px) rotateY(180deg)';
              break;
            case 2: // Projects
              cube.style.transform = 'translateZ(-40px) rotateY(90deg)';
              break;
            case 3: // Services
              cube.style.transform = 'translateZ(-40px) rotateY(-90deg)';
              break;
            case 4: // Testimonials
              cube.style.transform = 'translateZ(-40px) rotateX(90deg)';
              break;
            case 5: // Contact
              cube.style.transform = 'translateZ(-40px) rotateX(-90deg)';
              break;
          }
        }
      }
    });
  }
  
  // Check if we should show the cube based on screen width
  function checkCubeVisibility() {
    const cubeContainer = document.getElementById('cube-container');
    if (cubeContainer) {
      if (window.innerWidth >= 992) {
        cubeContainer.style.display = 'block';
      } else {
        cubeContainer.style.display = 'none';
      }
    }
  }
  
  // Initialize cube
  checkCubeVisibility();
  window.addEventListener('scroll', updateCube);
  window.addEventListener('resize', checkCubeVisibility);
  
  // Click on cube faces to navigate
  const cubeFaces = document.querySelectorAll('.cube-face');
  cubeFaces.forEach(face => {
    face.addEventListener('click', () => {
      const sectionId = face.getAttribute('data-section');
      if (sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add scroll to top button functionality
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', function() {
    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    }
  });
  
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Make all buttons interactive with ripple effect
  const buttons = document.querySelectorAll('.btn, .case-study-button, .submit-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '1px';
      ripple.style.height = '1px';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.animation = 'ripple 0.6s linear';
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  });
  
  // Add ripple animation to the CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(100);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
  
  // Make case study cards interactive
  const caseStudyButtons = document.querySelectorAll('.case-study-button');
  
  caseStudyButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Display alert for now, in a real project this would navigate to a detailed case study page
      alert('Case study details would open here. This is a placeholder for demonstration purposes.');
    });
  });
  
  // Add an initial animation to the hero section
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButtons = document.querySelector('.hero-buttons');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroTitle) heroTitle.style.animation = 'fadeInDown 1s forwards';
  if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 1s 0.3s forwards';
  if (heroButtons) heroButtons.style.animation = 'fadeInUp 1s 0.6s forwards';
  if (heroImage) heroImage.style.animation = 'fadeIn 1s 0.9s forwards';
  
  // Add the animations to the CSS
  const animationStyle = document.createElement('style');
  animationStyle.textContent = `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .hero-title, .hero-subtitle, .hero-buttons, .hero-image {
      opacity: 0;
    }
  `;
  document.head.appendChild(animationStyle);
});
