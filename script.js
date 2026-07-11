document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  const counterElement = document.querySelector(".counter-num");
  
  if (!counterElement) return;
  
  const target = parseInt(counterElement.getAttribute("data-target"), 10);
  let hasAnimated = false;
  
  const startCounter = () => {
    let current = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = Math.floor(duration / target);
    
    const timer = setInterval(() => {
      current += 1;
      counterElement.textContent = current + "%";
      if (current >= target) {
        clearInterval(timer);
      }
    }, intervalTime);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        startCounter();
        hasAnimated = true;
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(statsSection);
});
