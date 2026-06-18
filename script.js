/* ========================================
   PORTFOLIO JAVASCRIPT
======================================== */

(() => {
    "use strict";

    /* ========================================
       ROTATING ROLE DATA
    ======================================== */
    const roles = [
        "VLSI Design Enthusiast",
        "PALS Campus Ambassador",
        "Embedded Systems Engineer",
        "FPGA & RTL Developer",
        "Hardware Systems Builder"
    ];

    /* ========================================
       GLOBAL STATE
    ======================================== */
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const typingElement = document.querySelector(".typing-text");

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer = null;

    /* ========================================
       TYPING EFFECT
    ======================================== */
    function updateTypingText() {
        if (!typingElement) return;

        if (prefersReducedMotion) {
            typingElement.textContent = roles[0];
            return;
        }

        const currentRole = roles[roleIndex];
        typingElement.textContent = currentRole.slice(0, charIndex);

        if (!isDeleting && charIndex < currentRole.length) {
            charIndex += 1;
            typingTimer = window.setTimeout(updateTypingText, 70);
            return;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingTimer = window.setTimeout(updateTypingText, 1600);
            return;
        }

        if (isDeleting && charIndex > 0) {
            charIndex -= 1;
            typingTimer = window.setTimeout(updateTypingText, 34);
            return;
        }

        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingTimer = window.setTimeout(updateTypingText, 320);
    }

    /* ========================================
       MOBILE NAVIGATION
    ======================================== */
    function initNavigation() {
        const toggle = document.querySelector(".nav-toggle");
        const navLinks = document.querySelector(".nav-links");
        const links = document.querySelectorAll(".nav-links a");

        if (!toggle || !navLinks) return;

        function closeMenu() {
            navLinks.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        }

        function toggleMenu() {
            const isOpen = navLinks.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        }

        toggle.addEventListener("click", toggleMenu);

        links.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            const isClickInsideNav = event.target.closest(".navbar");

            if (!isClickInsideNav) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    /* ========================================
       ACTIVE NAVIGATION ON SCROLL
    ======================================== */
    function initActiveNavigation() {
        const sections = document.querySelectorAll("section[id]");
        const links = document.querySelectorAll(".nav-links a");

        if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                links.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("is-active", isActive);
                });
            });
        }, {
            rootMargin: "-45% 0px -48% 0px",
            threshold: 0
        });

        sections.forEach((section) => observer.observe(section));
    }

    /* ========================================
       TIMELINE REVEAL
    ======================================== */
    function initTimelineReveal() {
        const cards = document.querySelectorAll(".timeline-card");

        if (!cards.length) return;

        if (!("IntersectionObserver" in window) || prefersReducedMotion) {
            cards.forEach((card) => card.classList.add("show"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.15
        });

        cards.forEach((card) => observer.observe(card));
    }

    /* ========================================
       FOCUSABLE ELEMENT HELPER
    ======================================== */
    function getFocusableElements(container) {
        return Array.from(
            container.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
    }

    /* ========================================
       MODAL SYSTEM
    ======================================== */
    function initModalSystem() {
        const triggers = document.querySelectorAll("[data-modal-target]");
        const closeButtons = document.querySelectorAll("[data-modal-close]");

        let activeModal = null;
        let lastFocusedElement = null;

        function openModal(modal, trigger) {
            if (!modal) return;

            if (activeModal) {
                closeModal(false);
            }

            activeModal = modal;
            lastFocusedElement = trigger || document.activeElement;

            modal.hidden = false;
            document.body.classList.add("modal-open");

            window.requestAnimationFrame(() => {
                activeModal.classList.add("is-open");

                const focusableElements = getFocusableElements(activeModal);
                const closeButton = activeModal.querySelector("[data-modal-close]");

                if (closeButton) {
                    closeButton.focus();
                } else if (focusableElements.length) {
                    focusableElements[0].focus();
                }
            });
        }

        function closeModal(restoreFocus = true) {
            if (!activeModal) return;

            const modalToClose = activeModal;
            activeModal = null;

            modalToClose.classList.remove("is-open");
            document.body.classList.remove("modal-open");

            window.setTimeout(() => {
                modalToClose.hidden = true;

                if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                    lastFocusedElement.focus();
                }

                lastFocusedElement = null;
            }, 180);
        }

        function handleTriggerActivation(trigger) {
            const modalId = trigger.getAttribute("data-modal-target");
            const modal = document.getElementById(modalId);

            if (!modal) return;

            openModal(modal, trigger);
        }

        triggers.forEach((trigger) => {
            trigger.addEventListener("click", () => handleTriggerActivation(trigger));

            trigger.addEventListener("keydown", (event) => {
                const isActivationKey = event.key === "Enter" || event.key === " ";

                if (!isActivationKey) return;

                event.preventDefault();
                handleTriggerActivation(trigger);
            });
        });

        closeButtons.forEach((button) => {
            button.addEventListener("click", () => closeModal());
        });

        document.addEventListener("click", (event) => {
            if (activeModal && event.target === activeModal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (!activeModal) return;

            if (event.key === "Escape") {
                closeModal();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableElements = getFocusableElements(activeModal);

            if (!focusableElements.length) {
                event.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        });
    }

    /* ========================================
       INITIALIZATION
    ======================================== */
    function init() {
        updateTypingText();
        initNavigation();
        initActiveNavigation();
        initTimelineReveal();
        initModalSystem();
    }

    document.addEventListener("DOMContentLoaded", init);

    /* ========================================
       CLEANUP
    ======================================== */
    window.addEventListener("pagehide", () => {
        if (typingTimer) {
            window.clearTimeout(typingTimer);
        }
    });
})();