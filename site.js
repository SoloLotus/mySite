document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownBtn.addEventListener("click", function () {
    if (dropdownContent.classList.contains("show")) {
      dropdownContent.classList.remove("show");
    } else {
      dropdownContent.classList.add("show");
    }
  });
});

const downloadLinks = document.querySelectorAll(".download-link");

downloadLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default link behavior (remove if you want navigation)

    // Remove 'selected' from all links
    downloadLinks.forEach((l) => l.classList.remove("selected"));

    // Add 'selected' to clicked one
    link.classList.add("selected");
  });
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".accordian-final-header")) {
    const header = e.target.closest(".accordian-final-header");
    const item = header.closest(".accordian-final-item");
    item.classList.toggle("open");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".resource-tab");
  const boxes = document.querySelectorAll(".resource-box");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Hide all boxes
      boxes.forEach((b) => b.classList.remove("show"));

      // Activate clicked tab
      tab.classList.add("active");

      // Show target box
      const targetId = tab.getAttribute("data-target");
      document.getElementById(targetId).classList.add("show");
    });
  });
});

// ////////////

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonial-track");
  const dots = document.querySelectorAll(".dot");

  let cards = Array.from(track.children);
  const total = cards.length;

  // Clone first and last
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[total - 1].cloneNode(true);
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  // Insert clones
  track.insertBefore(lastClone, cards[0]);
  track.appendChild(firstClone);

  // Re-get cards including clones
  cards = Array.from(track.children);

  let current = 1; // start at real first

  function centerCard(index, animate = true) {
    const card = cards[index];
    const cardWidth = card.offsetWidth + 32; // card + gap
    const offset = card.offsetLeft + cardWidth / 2;
    const center = window.innerWidth / 2;
    const translateX = center - offset;

    if (!animate) track.style.transition = "none";
    else track.style.transition = "transform 0.4s ease";

    track.style.transform = `translateX(${translateX}px)`;

    // Set dot
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[(index - 1 + total) % total].classList.add("active");
  }

  // Jump without animation
  function jumpTo(index) {
    centerCard(index, false);
    current = index;
  }

  // With animation
  function moveTo(index) {
    centerCard(index, true);
    current = index;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      moveTo(Number(dot.dataset.index) + 1);
    });
  });

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (index !== current) moveTo(index);
    });
  });

  track.addEventListener("transitionend", () => {
    if (cards[current].classList.contains("clone")) {
      if (current === 0) jumpTo(total); // jump to real last
      if (current === cards.length - 1) jumpTo(1); // jump to real first
    }
  });

  window.addEventListener("resize", () => centerCard(current));
  window.addEventListener("load", () => {
    setTimeout(() => centerCard(current, false), 50);
  });
});
