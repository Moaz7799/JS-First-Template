const colorsLi = Array.from(document.querySelectorAll(".colors-list li"));
const randomBackEl = Array.from(
  document.querySelectorAll(".random-backgrounds span")
);
let landingPage = document.querySelector(".landing-page");

let backgroundOption = true;
let backgroundInterval;

// check if there is a color option in the local storage
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  colorsLi.forEach((li) => {
    li.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${mainColors}"]`)
    .classList.add("active");
}

// check if there is random background option in the local storage

/*
when you save a boolean value in local storage and then you try to get it,
it will come back as a string and not boolean so take care of that plzzzzzzzz.
*/

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  randomBackEl.forEach((el) => {
    el.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// settings popup and spin
document.querySelector(".toggle-settings i").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    let color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);

    localStorage.setItem("color_option", color);

    handleActive(e);
  });
});

// switch random background option
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      // the true stored in background_option is not a boolean in type it is a string take care!
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      // the false stored in background_option is not a boolean in type it is a string take care!
      localStorage.setItem("background_option", false);
    }
  });
});

function randomizeImgs() {
  if (backgroundOption) {
    // picture shuffling
    let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}

randomizeImgs();

// console.log(randomNumber);

// scroll to skills animation

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;

  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== "") {
      let imgHeading = document.createElement("h3");
      imgHeading.textContent = img.alt;

      popupBox.appendChild(imgHeading);
    }

    let popupImg = document.createElement("img");
    popupImg.src = img.src;

    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    closeButton.textContent = "X";
    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

// Close the popup

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Right Bullets Function

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });
  });
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

scrollTo(allBullets);
scrollTo(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  ev.target.classList.add("active");
}

// Reset Button

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
};

//
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("active");

  tLinks.classList.toggle("open");
};

tLinks.onclick = function (e) {
  e.stopPropagation();
};

document.body.addEventListener("click", (e) => {
  if (e.target !== toggleBtn || e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      tLinks.classList.remove("open");
      toggleBtn.classList.remove("active");
    }
  }
});
