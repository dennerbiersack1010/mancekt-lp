document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Counter animation for the stats-section
  const statsSection = document.querySelector(".stats-section");
  const counterElement = document.querySelector(".counter-num");
  
  if (counterElement && statsSection) {
    const target = parseInt(counterElement.getAttribute("data-target"), 10);
    let hasAnimated = false;
    
    const startCounter = () => {
      let current = 0;
      const duration = 1500; // 1.5 seconds
      const intervalTime = Math.floor(duration / target);
      
      const timer = setInterval(() => {
        current += 1;
        counterElement.textContent = current + "%";
        if (current >= target) {
          clearInterval(timer);
        }
      }, intervalTime);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          startCounter();
          hasAnimated = true;
        }
      });
    }, { threshold: 0.15 });
    
    statsObserver.observe(statsSection);
  }

  // 2. Reveal on scroll animation
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // Animates only once
        }
      });
    }, { threshold: 0.10 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 3. Animated Funnel Bars Observer
  const animateBars = document.querySelectorAll(".animate-bar");
  const funnelSection = document.querySelector(".porq-section");
  
  if (animateBars.length > 0 && funnelSection) {
    let funnelAnimated = false;
    
    const startFunnelAnimation = () => {
      animateBars.forEach(bar => {
        const targetWidth = bar.getAttribute("data-width");
        bar.style.width = targetWidth;
      });
    };

    const funnelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !funnelAnimated) {
          startFunnelAnimation();
          funnelAnimated = true;
        }
      });
    }, { threshold: 0.15 });

    funnelObserver.observe(funnelSection);
  }

  // 4. FAQ Accordion toggle
  const faqQuestions = document.querySelectorAll(".faq-q");
  faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains("open");
      
      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      
      // Toggle the clicked one
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // 5. Dashboard count-up animation for Dobra 4
  const dashboardVals = document.querySelectorAll(".ld-val");
  const solucaoSection = document.querySelector(".solucao-section");
  
  if (dashboardVals.length > 0 && solucaoSection) {
    let dashAnimated = false;
    
    const startDashCounters = () => {
      dashboardVals.forEach(val => {
        const target = parseInt(val.getAttribute("data-target"), 10);
        let current = 0;
        const duration = 1200; // 1.2 seconds
        const steps = duration / 16;
        const step = target / steps;
        
        const countTimer = setInterval(() => {
          current += step;
          if (current >= target) {
            val.textContent = target;
            clearInterval(countTimer);
          } else {
            val.textContent = Math.floor(current);
          }
        }, 16);
      });
    };
    
    const solObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !dashAnimated) {
          startDashCounters();
          dashAnimated = true;
        }
      });
    }, { threshold: 0.15 });
    
    solObserver.observe(solucaoSection);
  }

});

