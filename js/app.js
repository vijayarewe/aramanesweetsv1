/*==========================================================
Aramane Website
app.js - Part 1
Core Framework
==========================================================*/

"use strict";

/*==========================================================
DOM Ready
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    Loader.init();

    Navigation.init();

    SmoothScroll.init();

    ScrollReveal.init();

    BackToTop.init();

});


/*==========================================================
Loader
==========================================================*/

const Loader = {

    init() {

        const loader = document.querySelector(".loader");

        if (!loader) return;

        window.addEventListener("load", () => {

            loader.classList.add("hidden");

            setTimeout(() => {

                loader.remove();

            }, 700);

        });

    }

};


/*==========================================================
Sticky Navigation
==========================================================*/

const Navigation = {

    init() {

        this.header = document.querySelector("#header");

        this.mobileBtn = document.querySelector(".mobile-toggle");

        this.menu = document.querySelector(".menu");

        this.bindEvents();

    },

    bindEvents() {

        window.addEventListener("scroll", () => {

            this.stickyHeader();

            this.highlightMenu();

        });

        if (this.mobileBtn) {

            this.mobileBtn.addEventListener("click", () => {

                this.toggleMenu();

            });

        }

    },

    stickyHeader() {

        if (!this.header) return;

        if (window.scrollY > 80) {

            this.header.classList.add("sticky");

        } else {

            this.header.classList.remove("sticky");

        }

    },

    toggleMenu() {

        this.menu.classList.toggle("active");

        this.mobileBtn.classList.toggle("active");

    },

    highlightMenu() {

        const links = document.querySelectorAll(".menu a");

        const sections = document.querySelectorAll("section");

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (pageYOffset >= top && pageYOffset < top + height) {

                current = section.getAttribute("id");

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

};


/*==========================================================
Smooth Scroll
==========================================================*/

const SmoothScroll = {

    init() {

        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {

            link.addEventListener("click", e => {

                const targetID = link.getAttribute("href");

                if (targetID === "#") return;

                const target = document.querySelector(targetID);

                if (!target) return;

                e.preventDefault();

                window.scrollTo({

                    top: target.offsetTop - 80,

                    behavior: "smooth"

                });

            });

        });

    }

};


/*==========================================================
Scroll Reveal
==========================================================*/

const ScrollReveal = {

    init() {

        this.items = document.querySelectorAll(".reveal");

        if (!this.items.length) return;

        this.reveal();

        window.addEventListener("scroll", () => this.reveal());

    },

    reveal() {

        const trigger = window.innerHeight - 120;

        this.items.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < trigger) {

                item.classList.add("active");

            }

        });

    }

};


/*==========================================================
Back To Top
==========================================================*/

const BackToTop = {

    init() {

        this.button = document.querySelector(".back-top");

        if (!this.button) return;

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                this.button.classList.add("show");

            } else {

                this.button.classList.remove("show");

            }

        });

        this.button.addEventListener("click", e => {

            e.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

};


/*==========================================================
Utilities
==========================================================*/

const Utils = {

    debounce(func, delay = 150) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => func(...args), delay);

        };

    },

    throttle(func, limit = 100) {

        let waiting = false;

        return (...args) => {

            if (!waiting) {

                func(...args);

                waiting = true;

                setTimeout(() => waiting = false, limit);

            }

        };

    }

};
/*==========================================================
app.js - Part 2
Animations & Interactive Effects
==========================================================*/


/*==========================================================
Animated Counters
==========================================================*/

const Counter = {

    init() {

        this.items = document.querySelectorAll("[data-counter]");

        if (!this.items.length) return;

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    this.animate(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.5
        });

        this.items.forEach(item => observer.observe(item));

    },

    animate(element) {

        const target = Number(element.dataset.counter);

        const duration = 1800;

        const start = performance.now();

        const update = (time) => {

            const progress = Math.min((time - start) / duration, 1);

            element.textContent = Math.floor(progress * target);

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent = target;

            }

        };

        requestAnimationFrame(update);

    }

};


/*==========================================================
Hero Parallax
==========================================================*/

const HeroParallax = {

    init() {

        this.hero = document.querySelector(".hero-bg img");

        if (!this.hero) return;

        window.addEventListener("scroll",

            Utils.throttle(() => {

                this.move();

            }, 10)

        );

    },

    move() {

        const y = window.scrollY;

        this.hero.style.transform = `translateY(${y * 0.3}px) scale(1.08)`;

    }

};


/*==========================================================
Premium Card Hover
==========================================================*/

const CardEffects = {

    init() {

        const cards = document.querySelectorAll(

            ".collection-card,.festival-card,.why-card,.testimonial-card"

        );

        cards.forEach(card => {

            card.addEventListener("mousemove", e => {

                this.rotate(card, e);

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    },

    rotate(card, e) {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rx = -(y - rect.height / 2) / 18;

        const ry = (x - rect.width / 2) / 18;

        card.style.transform =
            `perspective(900px)
             rotateX(${rx}deg)
             rotateY(${ry}deg)
             translateY(-8px)`;

    }

};


/*==========================================================
Lazy Images
==========================================================*/

const LazyImages = {

    init() {

        const images = document.querySelectorAll("img[data-src]");

        if (!images.length) return;

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const img = entry.target;

                img.src = img.dataset.src;

                img.onload = () => img.classList.add("loaded");

                observer.unobserve(img);

            });

        });

        images.forEach(img => observer.observe(img));

    }

};


/*==========================================================
Floating Elements
==========================================================*/

const Floating = {

    init() {

        this.items = document.querySelectorAll("[data-float]");

        if (!this.items.length) return;

        window.addEventListener("mousemove", e => {

            this.move(e);

        });

    },

    move(e) {

        const x = e.clientX / window.innerWidth;

        const y = e.clientY / window.innerHeight;

        this.items.forEach(item => {

            const speed = Number(item.dataset.float) || 20;

            item.style.transform =
                `translate(${x * speed}px,${y * speed}px)`;

        });

    }

};


/*==========================================================
Fade Sequence
==========================================================*/

const FadeSequence = {

    init() {

        const groups = document.querySelectorAll(".fade-sequence");

        groups.forEach(group => {

            const children = group.children;

            [...children].forEach((child, index) => {

                child.style.opacity = 0;

                child.style.transform = "translateY(40px)";

                child.style.transition =
                    `all .7s ease ${index * 0.12}s`;

            });

            const observer = new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    [...children].forEach(child => {

                        child.style.opacity = 1;

                        child.style.transform = "translateY(0)";

                    });

                });

            });

            observer.observe(group);

        });

    }

};


/*==========================================================
Image Zoom on Scroll
==========================================================*/

const ZoomImages = {

    init() {

        this.images = document.querySelectorAll(".zoom-scroll img");

        if (!this.images.length) return;

        window.addEventListener("scroll",

            Utils.throttle(() => this.zoom(), 10)

        );

    },

    zoom() {

        this.images.forEach(img => {

            const rect = img.getBoundingClientRect();

            const visible = 1 - rect.top / window.innerHeight;

            const scale = 1 + visible * 0.08;

            img.style.transform = `scale(${scale})`;

        });

    }

};


/*==========================================================
Initialize Part 2
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    Counter.init();

    HeroParallax.init();

    CardEffects.init();

    LazyImages.init();

    Floating.init();

    FadeSequence.init();

    ZoomImages.init();

});
/*==========================================================
app.js - Part 3
Sliders • Forms • UI Components
==========================================================*/


/*==========================================================
Testimonials Slider
==========================================================*/

const Testimonials = {

    init() {

        this.container = document.querySelector(".testimonial-grid");

        if (!this.container) return;

        this.cards = [...this.container.children];

        if (this.cards.length <= 1) return;

        this.current = 0;

        this.start();

    },

    start() {

        setInterval(() => {

            this.next();

        }, 5000);

    },

    next() {

        this.cards[this.current].classList.remove("active");

        this.current++;

        if (this.current >= this.cards.length) {

            this.current = 0;

        }

        this.cards[this.current].classList.add("active");

        this.scroll();

    },

    scroll() {

        const card = this.cards[this.current];

        this.container.scrollTo({

            left: card.offsetLeft,

            behavior: "smooth"

        });

    }

};


/*==========================================================
Festival Slider
==========================================================*/

const FestivalSlider = {

    init() {

        this.track = document.querySelector(".festival-grid");

        if (!this.track) return;

        this.cards = [...this.track.children];

        this.index = 0;

        //this.start();

    },

    auto() {

        setInterval(() => {

            this.index++;

            if (this.index >= this.cards.length) {

                this.index = 0;

            }

            this.track.scrollTo({

            left: this.cards[this.index].offsetLeft,

            behavior: "smooth"

            });

        }, 6000);

    }

};


/*==========================================================
Newsletter Validation
==========================================================*/

const Newsletter = {

    init() {

        this.form = document.querySelector(".newsletter form");

        if (!this.form) return;

        this.input = this.form.querySelector("input");

        this.form.addEventListener("submit",

            e => this.submit(e));

    },

    submit(e) {

        e.preventDefault();

        const value = this.input.value.trim();

        if (!this.valid(value)) {

            alert("Please enter a valid email.");

            this.input.focus();

            return;

        }

        alert("Thank you for subscribing!");

        this.form.reset();

    },

    valid(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

};


/*==========================================================
Contact Form Validation
==========================================================*/

const ContactForm = {

    init() {

        this.form = document.querySelector(".contact-form");

        if (!this.form) return;

        this.form.addEventListener("submit",

            e => this.submit(e));

    },

    submit(e) {

        e.preventDefault();

        const required =

            this.form.querySelectorAll("[required]");

        let ok = true;

        required.forEach(field => {

            if (!field.value.trim()) {

                ok = false;

                field.classList.add("error");

            } else {

                field.classList.remove("error");

            }

        });

        if (!ok) {

            alert("Please complete all required fields.");

            return;

        }

        alert("Message sent successfully.");

        this.form.reset();

    }

};


/*==========================================================
Search Filter
==========================================================*/

const SearchFilter = {

    init() {

        this.input = document.querySelector("#collectionSearch");

        if (!this.input) return;

        this.cards =

            document.querySelectorAll(".collection-card");

        this.input.addEventListener("keyup",

            () => this.filter());

    },

    filter() {

        const value =

            this.input.value.toLowerCase();

        this.cards.forEach(card => {

            const title =

                card.innerText.toLowerCase();

            card.style.display =

                title.includes(value)

                    ? ""

                    : "none";

        });

    }

};


/*==========================================================
Keyboard Accessibility
==========================================================*/

const Accessibility = {

    init() {

        document.addEventListener("keydown",

            e => {

                if (e.key === "Escape") {

                    document

                        .querySelectorAll(".menu.active")

                        .forEach(menu =>

                            menu.classList.remove("active")

                        );

                }

            });

    }

};


/*==========================================================
Ripple Button Effect
==========================================================*/

const Ripple = {

    init() {

        document

            .querySelectorAll(".btn-primary")

            .forEach(btn => {

                btn.addEventListener(

                    "click",

                    e => this.create(e)

                );

            });

    },

    create(e) {

        const button = e.currentTarget;

        const ripple =

            document.createElement("span");

        ripple.className = "ripple";

        const rect =

            button.getBoundingClientRect();

        ripple.style.left =

            (e.clientX - rect.left) + "px";

        ripple.style.top =

            (e.clientY - rect.top) + "px";

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 700);

    }

};


/*==========================================================
Performance Monitor
==========================================================*/

const PerformanceHelper = {

    init() {

        window.addEventListener(

            "resize",

            Utils.debounce(() => {

                console.log("Layout updated");

            }, 200)

        );

    }

};


/*==========================================================
Initialize Part 3
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    Testimonials.init();

    FestivalSlider.init();

    Newsletter.init();

    ContactForm.init();

    SearchFilter.init();

    Accessibility.init();

    Ripple.init();

    PerformanceHelper.init();

});
/*==========================================================
app.js - Part 4
Production Enhancements
==========================================================*/


/*==========================================================
Image Preloader
==========================================================*/

const ImagePreloader = {

    init() {

        const images = document.querySelectorAll("img");

        images.forEach(img => {

            if (img.complete) return;

            img.addEventListener("load", () => {

                img.classList.add("loaded");

            });

        });

    }

};


/*==========================================================
Navigation Progress Bar
==========================================================*/

const ProgressBar = {

    init() {

        this.bar = document.querySelector(".progress-bar");

        if (!this.bar) return;

        window.addEventListener("scroll",

            Utils.throttle(() => this.update(), 10)

        );

    },

    update() {

        const scroll = window.scrollY;

        const height = document.body.scrollHeight - window.innerHeight;

        const percent = (scroll / height) * 100;

        this.bar.style.width = percent + "%";

    }

};


/*==========================================================
Page Visibility
==========================================================*/

const Visibility = {

    init() {

        document.addEventListener("visibilitychange", () => {

            if (document.hidden) {

                console.log("Page hidden");

            } else {

                console.log("Page active");

            }

        });

    }

};


/*==========================================================
Scroll Direction
==========================================================*/

const ScrollDirection = {

    last: 0,

    init() {

        window.addEventListener("scroll",

            Utils.throttle(() => this.detect(), 10)

        );

    },

    detect() {

        const current = window.pageYOffset;

        document.body.dataset.scroll =

            current > this.last ? "down" : "up";

        this.last = current;

    }

};


/*==========================================================
Keyboard Navigation
==========================================================*/

const KeyboardNavigation = {

    init() {

        document.addEventListener("keydown", e => {

            if (e.key === "Home") {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

            if (e.key === "End") {

                window.scrollTo({

                    top:document.body.scrollHeight,

                    behavior:"smooth"

                });

            }

        });

    }

};


/*==========================================================
Hover Glow
==========================================================*/

const HoverGlow = {

    init() {

        document.querySelectorAll(

            ".collection-card,.festival-card,.why-card"

        ).forEach(card=>{

            card.addEventListener("mousemove",

                e=>this.move(card,e));

            card.addEventListener("mouseleave",

                ()=>card.style.removeProperty("--x"));

        });

    },

    move(card,e){

        const rect=card.getBoundingClientRect();

        card.style.setProperty(

            "--x",

            (e.clientX-rect.left)+"px"

        );

        card.style.setProperty(

            "--y",

            (e.clientY-rect.top)+"px"

        );

    }

};


/*==========================================================
Analytics Stub
==========================================================*/

const Analytics = {

    track(eventName){

        console.log(

            "[Analytics]",

            eventName

        );

    }

};


/*==========================================================
Performance Optimizer
==========================================================*/

const Performance = {

    init(){

        document.querySelectorAll("video")

            .forEach(v=>{

                v.setAttribute("preload","metadata");

            });

    }

};


/*==========================================================
Console Branding
==========================================================*/

const Branding = {

    init(){

        console.log(

`%c
╔══════════════════════════════════════╗
║        ARAMANE SWEETS               ║
║   The Royal Sweet Heritage          ║
╚══════════════════════════════════════╝`,
"color:#C9A227;font-size:14px;font-weight:bold;"

        );

    }

};


/*==========================================================
Error Handler
==========================================================*/

window.addEventListener("error",e=>{

    console.error(

        "Application Error:",

        e.message

    );

});


window.addEventListener(

    "unhandledrejection",

    e=>{

        console.error(

            "Promise Error:",

            e.reason

        );

    }

);


/*==========================================================
Application
==========================================================*/

const App={

    init(){

        ImagePreloader.init();

        ProgressBar.init();

        Visibility.init();

        ScrollDirection.init();

        KeyboardNavigation.init();

        HoverGlow.init();

        Performance.init();

        Branding.init();

    }

};


/*==========================================================
Start Application
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);