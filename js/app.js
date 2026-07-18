/*=========================================================
 ARAMANE SWEETS
 app.js
 Part 1
=========================================================*/

"use strict";

/*=========================================================
SELECTORS
=========================================================*/

const body = document.body;

const header = document.getElementById("header");

const loader = document.getElementById("loader");

const mobileToggle = document.querySelector(".mobile-toggle");

const menu = document.querySelector(".menu");

const navLinks = document.querySelectorAll(".menu a");

const backTop = document.createElement("button");

backTop.className = "back-to-top";

backTop.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(backTop);


/*=========================================================
HELPERS
=========================================================*/

const select = (element) =>
document.querySelector(element);

const selectAll = (element) =>
document.querySelectorAll(element);

const on = (event, element, callback) => {

const item = select(element);

if(item){

item.addEventListener(event, callback);

}

};

const onAll = (event, elements, callback)=>{

document.querySelectorAll(elements)
.forEach(item=>{

item.addEventListener(event,callback);

});

};


/*=========================================================
WINDOW LOAD
=========================================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

loader.style.pointerEvents="none";

},900);

});


/*=========================================================
STICKY HEADER
=========================================================*/

function stickyHeader(){

if(window.scrollY>80){

header.classList.add("sticky");

}else{

header.classList.remove("sticky");

}

}

window.addEventListener("scroll",stickyHeader);


/*=========================================================
MOBILE MENU
=========================================================*/

mobileToggle?.addEventListener("click",()=>{

menu.classList.toggle("show");

mobileToggle.classList.toggle("active");

});

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

menu.classList.remove("show");

mobileToggle.classList.remove("active");

});

});


/*=========================================================
SMOOTH SCROLL
=========================================================*/

navLinks.forEach(link=>{

link.addEventListener("click",function(e){

const href=this.getAttribute("href");

if(!href.startsWith("#")) return;

const target=document.querySelector(href);

if(!target) return;

e.preventDefault();

window.scrollTo({

top:target.offsetTop-90,

behavior:"smooth"

});

});

});


/*=========================================================
ACTIVE MENU
=========================================================*/

const sections=document.querySelectorAll("section");

function activeMenu(){

let current="";

sections.forEach(section=>{

const top=section.offsetTop-140;

const height=section.offsetHeight;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

const href=link.getAttribute("href");

if(href==="#"+current){

link.classList.add("active");

}

});

}

window.addEventListener("scroll",activeMenu);


/*=========================================================
SCROLL PROGRESS
=========================================================*/

const progress=document.createElement("div");

progress.className="scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const total=

document.documentElement.scrollHeight-

window.innerHeight;

const current=

(window.scrollY/total)*100;

progress.style.width=current+"%";

});


/*=========================================================
BACK TO TOP
=========================================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});


/*=========================================================
HEADER SHADOW
=========================================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>10){

header.style.boxShadow="0 20px 50px rgba(0,0,0,.08)";

}else{

header.style.boxShadow="none";

}

});


/*=========================================================
PREVENT IMAGE DRAG
=========================================================*/

document.querySelectorAll("img").forEach(img=>{

img.setAttribute("draggable","false");

});


/*=========================================================
KEYBOARD ACCESSIBILITY
=========================================================*/

document.addEventListener("keyup",(e)=>{

if(e.key==="Escape"){

menu.classList.remove("show");

mobileToggle.classList.remove("active");

}

});


/*=========================================================
WINDOW RESIZE
=========================================================*/

window.addEventListener("resize",()=>{

if(window.innerWidth>992){

menu.classList.remove("show");

}

});


/*=========================================================
CONSOLE BRAND
=========================================================*/

console.log("%cARAMANE SWEETS",

"color:#C8A74A;font-size:24px;font-weight:bold;");

console.log("%cLuxury Website Loaded",

"color:#0F5B46;font-size:14px;");
/*=========================================================
 HERO SLIDER ENGINE
 Part 2A.1
=========================================================*/

const hero = document.querySelector(".hero");

const heroImage = document.querySelector(".hero-image img");

const heroTitle = document.querySelector(".hero h1");

const heroText = document.querySelector(".hero p");

const heroTag = document.querySelector(".hero-tag");

const heroButton = document.querySelector(".hero-buttons");

const sliderDots = document.querySelectorAll(".hero-slider span");


/*=========================================================
SLIDES
=========================================================*/

const heroSlides=[

{

title:"Inspired by Royalty,<br><span>Made for Celebrations.</span>",

text:"From Karnataka's royal kitchens to your celebrations. Every sweet is handcrafted with timeless tradition and premium ingredients.",

image:"assets/images/hero.jpg"

},

{

title:"Luxury Gift Boxes<br><span>For Every Occasion.</span>",

text:"Elegant gifting hampers crafted for festivals, weddings and corporate celebrations.",

image:"assets/images/luxury-box.jpg"

},

{

title:"The Royal Sweet Heritage<br><span>Of Karnataka.</span>",

text:"Experience authentic flavours inspired by the heritage of Mysore and Karnataka.",

image:"assets/images/heritage.jpg"

}

];



let heroIndex=0;

let heroTimer;



/*=========================================================
CHANGE SLIDE
=========================================================*/

function changeHero(index){

heroIndex=index;

hero.classList.add("changing");

setTimeout(()=>{

heroTitle.innerHTML=

heroSlides[index].title;

heroText.innerHTML=

heroSlides[index].text;

heroImage.src=

heroSlides[index].image;

sliderDots.forEach(dot=>dot.classList.remove("active"));

sliderDots[index].classList.add("active");

hero.classList.remove("changing");

animateHero();

},250);

}



/*=========================================================
NEXT
=========================================================*/

function nextHero(){

heroIndex++;

if(heroIndex>=heroSlides.length){

heroIndex=0;

}

changeHero(heroIndex);

}



/*=========================================================
PREVIOUS
=========================================================*/

function prevHero(){

heroIndex--;

if(heroIndex<0){

heroIndex=heroSlides.length-1;

}

changeHero(heroIndex);

}



/*=========================================================
AUTOPLAY
=========================================================*/

function startHero(){

heroTimer=setInterval(()=>{

nextHero();

},6000);

}

function stopHero(){

clearInterval(heroTimer);

}



/*=========================================================
DOT EVENTS
=========================================================*/

sliderDots.forEach((dot,index)=>{

dot.addEventListener("click",()=>{

stopHero();

changeHero(index);

startHero();

});

});



/*=========================================================
PAUSE ON HOVER
=========================================================*/

hero.addEventListener("mouseenter",stopHero);

hero.addEventListener("mouseleave",startHero);



/*=========================================================
HERO ENTRANCE
=========================================================*/

function animateHero(){

const elements=[

heroTag,

heroTitle,

heroText,

heroButton,

heroImage

];

elements.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(35px)";

});

requestAnimationFrame(()=>{

elements.forEach((el,index)=>{

setTimeout(()=>{

el.style.transition=

"all .7s cubic-bezier(.22,.61,.36,1)";

el.style.opacity="1";

el.style.transform="translateY(0)";

},index*120);

});

});

}



/*=========================================================
KEYBOARD SUPPORT
=========================================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="ArrowRight"){

stopHero();

nextHero();

startHero();

}

if(e.key==="ArrowLeft"){

stopHero();

prevHero();

startHero();

}

});



/*=========================================================
TOUCH SUPPORT
=========================================================*/

let touchStart=0;

let touchEnd=0;

hero.addEventListener("touchstart",(e)=>{

touchStart=e.changedTouches[0].screenX;

});

hero.addEventListener("touchend",(e)=>{

touchEnd=e.changedTouches[0].screenX;

if(touchEnd-touchStart>70){

stopHero();

prevHero();

startHero();

}

if(touchStart-touchEnd>70){

stopHero();

nextHero();

startHero();

}

});



/*=========================================================
IMAGE PRELOAD
=========================================================*/

heroSlides.forEach(slide=>{

const img=new Image();

img.src=slide.image;

});



/*=========================================================
INITIALIZE
=========================================================*/

changeHero(0);

startHero();
/*=========================================================
 SCROLL REVEAL ENGINE
 Part 2A.2.1
=========================================================*/

/*
=====================================
Elements
=====================================
*/

const revealElements = document.querySelectorAll(
`
.hero-content,
.hero-image,
.collection-card,
.heritage-image,
.heritage-content,
.why-card,
.step,
.corporate-content,
.corporate-image,
.festival-card,
.testimonial-card,
.store-card,
.banner-wrapper,
.newsletter,
footer
`
);



/*
=====================================
Prepare Elements
=====================================
*/

revealElements.forEach(el=>{

el.classList.add("reveal");

});



/*
=====================================
Observer Options
=====================================
*/

const revealOptions={

root:null,

rootMargin:"0px 0px -100px 0px",

threshold:.15

};



/*
=====================================
Observer
=====================================
*/

const revealObserver=

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting){

return;

}

entry.target.classList.add("revealed");

revealObserver.unobserve(entry.target);

});

},

revealOptions

);



/*
=====================================
Observe
=====================================
*/

revealElements.forEach(item=>{

revealObserver.observe(item);

});



/*
=====================================
Stagger Cards
=====================================
*/

function stagger(selector){

const items=document.querySelectorAll(selector);

items.forEach((item,index)=>{

item.style.transitionDelay=

(index*120)+"ms";

});

}



stagger(".collection-card");

stagger(".why-card");

stagger(".step");

stagger(".festival-card");

stagger(".testimonial-card");

stagger(".store-card");



/*
=====================================
Fade Hero After Load
=====================================
*/

window.addEventListener("load",()=>{

setTimeout(()=>{

document.querySelector(".hero-content")

?.classList.add("revealed");

document.querySelector(".hero-image")

?.classList.add("revealed");

},600);

});



/*
=====================================
Section Highlight
=====================================
*/

const allSections=

document.querySelectorAll("section[id]");

const navItems=

document.querySelectorAll(".menu a");

const sectionObserver=

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const id=

entry.target.getAttribute("id");

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+id){

link.classList.add("active");

}

});

});

},

{

threshold:.45

}

);



allSections.forEach(section=>{

sectionObserver.observe(section);

});



/*
=====================================
Reveal Utility
=====================================
*/

function revealNow(selector){

document.querySelectorAll(selector)

.forEach(item=>{

item.classList.add("revealed");

});

}



/*
=====================================
Public API
=====================================
*/

window.Aramane={

reveal:revealNow

};
