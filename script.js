const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const currentYear = document.querySelector("#current-year");

function closeNavigation() {
    if (!navToggle || !navMenu) {
        return;
    }

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
}

function openNavigation() {
    if (!navToggle || !navMenu) {
        return;
    }

    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
    navMenu.classList.add("is-open");
    document.body.classList.add("nav-open");
}

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeNavigation();
        } else {
            openNavigation();
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";

        if (event.key === "Escape" && isOpen) {
            closeNavigation();
            navToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeNavigation();
        }
    });
}

if (currentYear) {
    currentYear.textContent = new Intl.DateTimeFormat("en", {
        year: "numeric",
    }).format(new Date());
}

const projectDialogButtons = document.querySelectorAll("[data-dialog-target]");

projectDialogButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialogId = button.getAttribute("data-dialog-target");
        const dialog = dialogId ? document.getElementById(dialogId) : null;

        if (!dialog) {
            return;
        }

        dialog.classList.remove("is-scrolled");
        dialog.showModal();
        document.body.classList.add("dialog-open");

        const dialogBody = dialog.querySelector(".project-dialog-body");
        if (dialogBody) {
            dialogBody.scrollTop = 0;
        }
    });
});

document.querySelectorAll(".project-dialog").forEach((dialog) => {
    const dialogBody = dialog.querySelector(".project-dialog-body");
    const closeButton = dialog.querySelector(".dialog-close");

    closeButton?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
        document.body.classList.remove("dialog-open");
    });

    dialogBody?.addEventListener("scroll", () => {
        dialog.classList.toggle("is-scrolled", dialogBody.scrollTop > 24);
    });

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
