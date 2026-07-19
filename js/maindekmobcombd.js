/*=========================================
ARAMANE
MAIN.JS
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
    ELEMENTS
    ==============================*/

    const header = document.querySelector(".header");

    const mobileToggle = document.querySelector(".mobile-toggle");

    const mobileMenu = document.querySelector(".mobile-menu");

    const mobileClose = document.querySelector(".mobile-close");

    const scrollTop = document.querySelector(".scroll-top");

    const menuLinks = document.querySelectorAll(".mobile-menu a");

    const newsletterForm = document.querySelector(".newsletter form");



    /*==============================
    MOBILE MENU
    ==============================*/

    if (mobileToggle && mobileMenu) {

        mobileToggle.addEventListener("click", () => {

            mobileMenu.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    }

    if (mobileClose && mobileMenu) {

        mobileClose.addEventListener("click", closeMenu);

    }

    menuLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    function closeMenu() {

        mobileMenu.classList.remove("active");

        document.body.style.overflow = "";

    }



    /*==============================
    CLOSE MENU ON ESC
    ==============================*/

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeMenu();

        }

    });



    /*==============================
    CLOSE MENU OUTSIDE CLICK
    ==============================*/

    document.addEventListener("click", (e) => {

        if (
            mobileMenu &&
            mobileMenu.classList.contains("active") &&
            !mobileMenu.contains(e.target) &&
            !mobileToggle.contains(e.target)
        ) {

            closeMenu();

        }

    });



    /*==============================
    STICKY HEADER
    ==============================*/

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });



    /*==============================
    SCROLL TO TOP
    ==============================*/

    if (scrollTop) {

        scrollTop.style.opacity = "0";

        scrollTop.style.visibility = "hidden";

    }

    window.addEventListener("scroll", () => {

        if (!scrollTop) return;

        if (window.scrollY > 500) {

            scrollTop.style.opacity = "1";

            scrollTop.style.visibility = "visible";

        } else {

            scrollTop.style.opacity = "0";

            scrollTop.style.visibility = "hidden";

        }

    });

    if (scrollTop) {

        scrollTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }



    /*==============================
    SMOOTH SCROLL
    ==============================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });



    /*==============================
    NEWSLETTER
    ==============================*/

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = this.querySelector("input").value.trim();

            if (!email) {

                alert("Please enter your email.");

                return;

            }

            alert("Thank you for subscribing!");

            this.reset();

        });

    }



    /*==============================
    INTERSECTION ANIMATION
    ==============================*/

    const animatedItems = document.querySelectorAll(

        ".feature, .product, .category, .testimonial, .about__stats div"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    animatedItems.forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });



    /*==============================
    CURRENT YEAR
    ==============================*/

    const year = new Date().getFullYear();

    const footerText = document.querySelector(".footer__bottom p");

    if (footerText) {

        footerText.innerHTML = `© ${year} Aramane. All Rights Reserved.`;

    }

});