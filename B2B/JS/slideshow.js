let slideIndex = 0;
  const slides = document.querySelectorAll('.slideshow img');
  const slideTexts = document.querySelectorAll('.slide-text');
  let timer;

  function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
      slideTexts[i].classList.remove('active');
    }

    slides[slideIndex].classList.add('active');
    slideTexts[slideIndex].classList.add('active');
  }

  function changeSlide(n) {
    clearInterval(timer); 
    showSlide(slideIndex + n);
    timer = setInterval(autoCycle, 3000);
  }

  function autoCycle() {
    changeSlide(1);
  }

  timer = setInterval(autoCycle, 3000); 
