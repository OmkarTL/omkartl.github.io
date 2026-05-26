// =========================
// PORTFOLIO LOADED
// =========================

console.log("Portfolio Loaded");

// =========================
// TYPING EFFECT
// =========================

const roles = [

    "VLSI Design Enthusiast",
    "Embedded Systems Engineer",
    "FPGA & RTL Developer",
    "Hardware Systems Builder"

];

let roleIndex = 0;
let charIndex = 0;

const typingElement =
document.querySelector(".typing-text");

function typeEffect(){

    if(charIndex < roles[roleIndex].length){

        typingElement.textContent +=
        roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 100);

    }

    else{

        setTimeout(eraseEffect, 1800);

    }
}

function eraseEffect(){

    if(charIndex > 0){

        typingElement.textContent =
        roles[roleIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(eraseEffect, 50);

    }

    else{

        roleIndex++;

        if(roleIndex >= roles.length){

            roleIndex = 0;

        }

        setTimeout(typeEffect, 300);

    }
}

// =========================
// CUSTOM CURSOR
// =========================

const isDesktop =
window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if(isDesktop){

    const cursorDot =
    document.querySelector(".cursor-dot");

    const cursorOutline =
    document.querySelector(".cursor-outline");

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

    });

    function animateCursor(){

        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // =========================
    // CURSOR HOVER EFFECT
    // =========================

    const hoverElements =
    document.querySelectorAll("a, button");

    hoverElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursorOutline.style.width = "70px";
            cursorOutline.style.height = "70px";

            cursorOutline.style.borderColor =
            "#00ffff";

        });

        element.addEventListener("mouseleave", () => {

            cursorOutline.style.width = "40px";
            cursorOutline.style.height = "40px";

        });

    });

}

// =========================
// TOUCH RIPPLE EFFECT
// =========================

window.addEventListener("touchstart", (e) => {

    const touch = e.touches[0];

    const ripple =
    document.createElement("div");

    ripple.className = "touch-ripple";

    ripple.style.left = `${touch.clientX}px`;
    ripple.style.top = `${touch.clientY}px`;

    document.body.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 600);

});

// =========================
// START ANIMATIONS
// =========================

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(typeEffect, 500);

});

// =============================
// SCROLL REVEAL ANIMATION
// =============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});


// =============================
// SELECT ALL HIDDEN ELEMENTS
// =============================

const hiddenElements =
document.querySelectorAll(".hidden");


// =============================
// OBSERVE ELEMENTS
// =============================

hiddenElements.forEach((el) => {

    observer.observe(el);

});

// =========================
// WAIT FOR PAGE LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================

    const modal =
    document.querySelector(".project-modal");

    const openButtons =
    document.querySelectorAll(".open-modal");

    const closeButton =
    document.querySelector(".close-modal");


    // =========================
    // OPEN MODAL
    // =========================

    openButtons.forEach((button) => {

        button.addEventListener("click", () => {

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    // =========================
    // CLOSE BUTTON
    // =========================

    closeButton.addEventListener("click", () => {

        modal.classList.remove("active");

        document.body.style.overflow = "auto";

    });


    // =========================
    // OUTSIDE CLICK CLOSE
    // =========================

    modal.addEventListener("click", (e) => {

        if(e.target === modal){

            modal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    });


    // =========================
    // ESC KEY CLOSE
    // =========================

    document.addEventListener("keydown", (e) => {

        if(e.key === "Escape"){

            modal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    });

});