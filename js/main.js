/*==========================================================
ARAMANE SWEETS
main.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
    Mobile Menu
    ==============================================*/

    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeMenu = document.querySelector(".close-menu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden";
        });

    }

    if (closeMenu && mobileMenu) {

        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });

    }

    document.addEventListener("click", (e) => {

        if (
            mobileMenu &&
            mobileMenu.classList.contains("active") &&
            !mobileMenu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";

        }

    });


    /*==============================================
    Scroll To Top
    ==============================================*/

    const scrollBtn = document.querySelector(".scroll-top");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollBtn.classList.add("show");

        } else {

            scrollBtn.classList.remove("show");

        }

    });

    if (scrollBtn) {

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /*==============================================
    Smooth Anchor Scroll
    ==============================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });


    /*==============================================
    Reveal Animation
    ==============================================*/

    const revealItems = document.querySelectorAll(

        ".feature-item," +
        ".product-card," +
        ".category-card," +
        ".gift-banner," +
        ".about-section," +
        ".store-preview," +
        ".testimonial-card," +
        ".instagram-grid img"

    );

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-active");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    revealItems.forEach(item => {

        item.classList.add("reveal");

        revealObserver.observe(item);

    });


    /*==============================================
    Header Background
    ==============================================*/

    const header = document.querySelector(".main-header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("header-scrolled");

        } else {

            header.classList.remove("header-scrolled");

        }

    });


    /*==============================================
    Hero Parallax (Desktop Only)
    ==============================================*/

    const heroImage = document.querySelector(".hero-image");

    window.addEventListener("scroll", () => {

        if (window.innerWidth > 992 && heroImage) {

            const offset = window.scrollY * 0.18;

            heroImage.style.transform = `translateY(${offset}px)`;

        }

    });


    /*==============================================
    Product Hover Tilt
    ==============================================*/

    document.querySelectorAll(".product-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            if (window.innerWidth < 992) return;

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -6;

            const rotateY = ((x / rect.width) - 0.5) * 6;

            card.style.transform =

                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /*==============================================
    Newsletter
    ==============================================*/

    const newsletter = document.querySelector(".newsletter form");

    if (newsletter) {

        newsletter.addEventListener("submit", function (e) {

            e.preventDefault();

            const input = this.querySelector("input");

            if (input.value.trim() === "") {

                alert("Please enter your email.");

                return;

            }

            alert("Thank you for subscribing!");

            input.value = "";

        });

    }


    /*==============================================
    Lazy Images
    ==============================================*/

    const lazyImages = document.querySelectorAll("img[data-src]");

    if (lazyImages.length) {

        const lazyObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const img = entry.target;

                    img.src = img.dataset.src;

                    img.removeAttribute("data-src");

                    lazyObserver.unobserve(img);

                }

            });

        });

        lazyImages.forEach(img => {

            lazyObserver.observe(img);

        });

    }

});
