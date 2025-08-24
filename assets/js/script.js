'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}


// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
} else {
  // console.error("Select element not found");
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
        selectValue.innerText = this.innerText;
    } else {
        console.error("Select value display element not found");
    }
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link [With Research]
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    console.log("Nav link clicked:", this.innerHTML);  // Check which link is clicked

    for (let j = 0; j < pages.length; j++) {
      console.log("Comparing to page:", pages[j].dataset.page);  // Log comparison values

      if (this.innerHTML.toLowerCase() === pages[j].dataset.page.toLowerCase()) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
        console.log("Match found and activated:", pages[j].dataset.page);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// // // add event to all nav link [Without Research]
// for (let i = 0; i < navigationLinks.length; i++) {
//   navigationLinks[i].addEventListener("click", function () {
//     const targetPage = this.textContent.trim().toLowerCase();

//     pages.forEach(page => {
//       page.classList.toggle("active", page.dataset.page === targetPage);
//     });

//     navigationLinks.forEach(link => {
//       link.classList.toggle("active", link === this);
//     });

//     window.scrollTo(0, 0);
//   });
// }


// Modal for project items

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector(`.overlay[data-overlay-for="${modalId}"]`);
    if (modal && overlay) {
      modal.classList.remove("active");
      overlay.classList.remove("active");
    }
  };

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector(`.overlay[data-overlay-for="${modalId}"]`);

    if (modal && overlay) {
      modal.classList.add("active");
      overlay.classList.add("active");
    } else {
      console.log('Modal or overlay not found');
    }
  };

  document.querySelectorAll(".openModal").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();  // This is crucial to stop the link from navigating to "#"
      const modalId = link.getAttribute("data-modal-target");
      openModal(modalId);
    });
  });

  document.querySelectorAll(".modal-close-btn").forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-close-modal");
      closeModal(modalId);
    });
  });

  window.addEventListener("click", (event) => {
    document.querySelectorAll(".overlay.active").forEach(overlay => {
      if (event.target === overlay) {
        const modalId = overlay.getAttribute("data-overlay-for");
        closeModal(modalId);
      }
    });
  });
});





// carousel
// Function to initialize a carousel
function initializeCarousel(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);
  if (!containers.length) return;

  containers.forEach(container => {
    const slides = container.querySelectorAll('.carousel-image');
    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
      slides[currentSlide].style.display = 'none'; // Hide current slide
      currentSlide = (index + slides.length) % slides.length; // Calculate new index
      slides[currentSlide].style.display = 'block'; // Show new slide
    }

    // Function to move to the next or previous slide
    function moveSlide(direction) {
      showSlide(currentSlide + direction);
    }

    // Initialize the carousel to show the first image
    slides.forEach(slide => {
      slide.style.display = 'none'; // Hide all slides initially
    });
    showSlide(currentSlide); // Show the first slide

    // Add event listeners for navigation buttons
    const nextButton = container.querySelector('.next');
    const prevButton = container.querySelector('.prev');

    if (nextButton) {
      nextButton.addEventListener('click', () => moveSlide(1));
    }
    if (prevButton) {
      prevButton.addEventListener('click', () => moveSlide(-1));
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeCarousel('.carousel-container');
  initializeCarousel('.carousel-container2');
  // Add more selectors if you have more carousels
});
