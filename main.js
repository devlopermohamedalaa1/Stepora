// Show links
const menuToggle = document.querySelector(".menu-toggle");
const links = document.getElementById("links");

menuToggle.addEventListener("click", () => {
  links.classList.toggle("show");
});

document.querySelectorAll("#links a").forEach((link) => {
  link.addEventListener("click", () => {
    links.classList.remove("show");
  });
});

// Counter The Values
const counters = document.querySelectorAll(".count");
const duration = 2000;

counters.forEach((counter) => {
  const target = +counter.dataset.target;
  const startTime = performance.now();

  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    counter.textContent = value + "+";

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
});

const header = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

const slides = document.querySelectorAll(".images img");
let current = 0;

// Switch Photo
function createSlider(slider, interval, startDelay) {
  const slides = slider.querySelectorAll("img");
  let current = 0;

  function nextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  setTimeout(() => {
    setInterval(nextSlide, interval);
  }, startDelay);
}

document.querySelectorAll(".slider").forEach((slider, index) => {
  createSlider(slider, 3000, index * 1500);
});

// change The Color Heart
/* ===== Wishlist ===== */
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".card").forEach((card) => {
  const id = card.dataset.id;
  const btn = card.querySelector(".wishlist");
  const icon = btn.querySelector("i");

  if (wishlist.includes(id)) {
    btn.classList.add("active");
    icon.classList.replace("fa-regular", "fa-solid");
  }

  btn.addEventListener("click", () => {
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((itemId) => itemId !== id);
      btn.classList.remove("active");
      icon.classList.replace("fa-solid", "fa-regular");
    } else {
      wishlist.push(id);
      btn.classList.add("active");
      icon.classList.replace("fa-regular", "fa-solid");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });
});

// Show The All Produts By arrow
const cards = document.querySelector(".cards");

function step() {
  const card = cards.querySelector(".card");
  const gap = parseFloat(getComputedStyle(cards).columnGap);
  return (card.offsetWidth + gap) * (innerWidth <= 768 ? 2 : 1);
}

document.querySelector(".next").onclick = () =>
  cards.scrollBy({ left: step(), behavior: "smooth" });

document.querySelector(".prev").onclick = () =>
  cards.scrollBy({ left: -step(), behavior: "smooth" });

// Order on WhatsApp
const PHONE = "201207013873";

document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const name = card.dataset.name;
    const price = card.dataset.price;

    const message =
      `Hello Stepora 👋\n` +
      `I want to order:\n` +
      `Product: ${name}\n` +
      `Price: $${price}\n` +
      `Product link: ${window.location.href}`;

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
});

// Testimonials

(function () {
  // Select slider elements
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsContainer = document.querySelector(".dots");

  // Index of the currently visible testimonial
  let current = 0;

  // Create one dot for each testimonial
  testimonials.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    // Jump to the matching slide when a dot is clicked
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  // Show the slide at the given index (loops at both ends)
  function showSlide(index) {
    // Hide the current slide and deactivate its dot
    testimonials[current].classList.remove("active");
    dots[current].classList.remove("active");

    // Wrap around: last -> first, first -> last
    current = (index + testimonials.length) % testimonials.length;

    // Show the new slide and activate its dot
    testimonials[current].classList.add("active");
    dots[current].classList.add("active");
  }

  // Arrow buttons
  nextBtn.addEventListener("click", () => showSlide(current + 1));
  prevBtn.addEventListener("click", () => showSlide(current - 1));
})();

// About
(function () {
  // Select all counter elements
  const counters = document.querySelectorAll(".counter");

  // Animate a number from 0 to its target value
  function animateCounter(el) {
    const target = Number(el.dataset.target);
    const duration = 1500; // Animation time in milliseconds
    const stepTime = 20;
    const increment = target / (duration / stepTime);
    let value = 0;

    const timer = setInterval(() => {
      value += increment;

      if (value >= target) {
        value = target;
        clearInterval(timer);
      }

      el.textContent = Math.floor(value) + "+";
    }, stepTime);
  }

  // Start counting when the stats enter the screen
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Run only once
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
})();

// Footer

(function () {
  // Insert the current year automatically
  document.getElementById("year").textContent = new Date().getFullYear();

  const backToTop = document.getElementById("backToTop");

  // Show the button only after scrolling down 400px
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  // Scroll smoothly back to the top
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
