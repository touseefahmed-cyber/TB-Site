//smooth scroll
// Initialisiere Lenis für sanftes Scrollen
const lenis = new Lenis({
    lerp: 0.12, // Steuerung der Scroll-Glättung (je kleiner, desto langsamer)
    smooth: true // Aktiviert das sanfte Scrollen
});

// Verbinde Lenis mit GSAPs Ticker (optional, wenn ScrollTrigger verwendet wird)
lenis.on('scroll', ScrollTrigger.update);

// Aktualisiert die Lenis-Animation mit jedem Frame
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


//Animation statics section\
// make sure GSAP + ScrollTrigger are loaded on the page BEFORE this script runs
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.line-animation').forEach(section => {
    // find elements inside THIS section
    const borderLeft  = section.querySelector('.border-lft-animation');
    const borderBottom= section.querySelector('.border-btm');
    const borderTop   = section.querySelector('.border-top-animation');
    const borderRt    = section.querySelector('.border-rt-animation');

    const line        = section.querySelector('.line');
    const lineBottom  = section.querySelector('.line-bottom');
    const lineTop     = section.querySelector('.line-top');
    const lineRt      = section.querySelector('.line-rt');

    // arrays of existing elements (so we won't pass nulls to GSAP)
    const borders = [borderLeft, borderBottom, borderTop, borderRt].filter(Boolean);
    const lines = [line, lineBottom, lineTop, lineRt].filter(Boolean);

    // nothing to animate in this section? skip it.
    if (borders.length === 0 && lines.length === 0) return;

    function animateCycle() {
        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.5,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Borders fade out
        tl.to(borders, { opacity: 0, duration: 0.8 });

        // 2. Forward animation (only animate elements that exist)
        if (line)       tl.to(line,       { opacity: 1, top: "100%", duration: 3, ease: "power1.inOut" }, ">");
        if (lineBottom) tl.to(lineBottom, { opacity: 1, left: "100%", duration: 3, ease: "power1.inOut" }, "<");
        if (lineTop)    tl.to(lineTop,    { opacity: 1, top: "100%", duration: 3, ease: "power1.inOut" }, "<");
        if (lineRt)     tl.to(lineRt,     { opacity: 1, top: "100%", duration: 3, ease: "power1.inOut" }, "<");

        // 3. Hide lines
        tl.to(lines, { opacity: 0, duration: 0.5 }, "+=0.2");

        // 4. Borders fade in briefly
        tl.to(borders, { opacity: 1, duration: 0.8 });
        tl.to({}, { duration: 1 });

        // 5. Borders fade out
        tl.to(borders, { opacity: 0, duration: 0.5 });

        // 6. Reverse animation
        if (line)       tl.to(line,       { opacity: 1, top: "0px", duration: 2, ease: "power1.inOut" }, ">");
        if (lineBottom) tl.to(lineBottom, { opacity: 1, left: "0%", duration: 2, ease: "power1.inOut" }, "<");
        if (lineTop)    tl.to(lineTop,    { opacity: 1, top: "0px", duration: 2, ease: "power1.inOut" }, "<");
        if (lineRt)     tl.to(lineRt,     { opacity: 1, top: "0%", duration: 2, ease: "power1.inOut" }, "<");

        // 7. Hide lines
        tl.to(lines, { opacity: 0, duration: 0.5 }, "+=0.2");

        // 8. Borders fade in ready for next cycle
        tl.to(borders, { opacity: 1, duration: 0.8 });
    }

    animateCycle();
});

//paralex Effect
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".panel").forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false
    });
});


// ScrollTrigger.create({
//     snap: 1 / 4 // snap whole page to the closest section!
// });
//count js
const createOdometer = (el) => {
    const value = parseInt(el.getAttribute('data-value'));
    const odometer = new Odometer({
        el: el,
        value: 0,
    });

    let hasRun = false;

    const options = {
        root: null, // viewport
        threshold: 0.3, // kam se kam 30% visible ho tab chale
    };

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasRun) {
                odometer.update(value);
                hasRun = true;
                observer.unobserve(el); // dobara na chale
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
};

// Initialize all odometers
document.querySelectorAll('.odometer').forEach((odometerEl) => {
    createOdometer(odometerEl);
});
//header White
// (function () {
//     const header = document.getElementById('header');
//     if (!header) return;
//
//     function updateHeader() {
//         const hb = header.getBoundingClientRect();
//         // 1px below the header, centered horizontally
//         const x = Math.floor(window.innerWidth / 2);
//         const y = Math.min(window.innerHeight - 1, hb.bottom + 1);
//
//         const el = document.elementFromPoint(x, y);
//         const inContent = el && el.closest('.content'); // is the area under header inside .content?
//
//         header.classList.toggle('white-header', !!inContent);
//     }
//
//     window.addEventListener('scroll', updateHeader, { passive: true });
//     window.addEventListener('resize', updateHeader);
//     document.addEventListener('DOMContentLoaded', updateHeader);
// })();


//slider
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3.1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1.2,
            spaceBetween: 15,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 2.1,
            spaceBetween: 20,
        },
        1440: {
            slidesPerView: 3.1,
            spaceBetween: 20,
        },
    },
});

const backToTopButton = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
};

backToTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
//FAQ JS
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {
        // close other items
        faqItems.forEach(i => {
            if (i !== item) {
                i.classList.remove("faq-active");
                const iIcon = i.querySelector(".icon");
                if (iIcon) iIcon.textContent = "+";
            }
        });

        // toggle current item
        item.classList.toggle("faq-active");

        const icon = item.querySelector(".icon");
        if (icon) icon.textContent = item.classList.contains("faq-active") ? "–" : "+";
    });
});
//Faq slider
var swiper = new Swiper(".faq-slider", {
    slidesPerView: "auto",
    spaceBetween: 16,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
//slider
var cursor = document.querySelector("#cursor");
document.body.addEventListener("mousemove", function(e) {
    gsap.to(cursor, {
        x: e.x,
        y: e.y,
    });
});

const sliders = document.querySelectorAll(".slider");
const modelBoxes = document.querySelectorAll(".model-box");

modelBoxes.forEach((box) => {
    box.addEventListener("mouseenter", function () {
        box.style.cursor = "auto";
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.innerHTML = "";

        gsap.to(cursor, {
            duration: 0.2,
            scale: 1, // or change to 2 if you want to enlarge
        });
    });
    box.addEventListener("mouseleave", function () {
        box.style.cursor = "auto";
        cursor.style.width = "60px";
        cursor.style.height = "60px";
        cursor.innerHTML = "Drag";

        gsap.to(cursor, {
            scale: 1,
            duration: 0.2,
        });
    });
});


sliders.forEach(slider => {
    // When mouse enters sidebar (slider), scale up
    slider.addEventListener("mouseenter", function () {
        slider.style.cursor = "none";
        cursor.style.width = "60px";
        cursor.style.height = "60px";
        cursor.innerHTML = "Drag";

        gsap.to(cursor, {
            duration: 0.2,
            scale: 1 // or scale: 2
        });
    });

    // When mouse leaves sidebar (slider), scale back to normal
    slider.addEventListener("mouseleave", function () {
        slider.style.cursor = "auto";
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.innerHTML = "";

        gsap.to(cursor, {
            scale: 1,
            duration: 0.2,
        });
    });
});
//Header
let lastScrollTop = 0;
const body = document.body;

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0) {
        // When at the very top — remove both classes
        body.classList.remove("scroll-up", "scroll-down");
    } else if (scrollTop > lastScrollTop) {
        // Scrolling down
        body.classList.add("scroll-down");
        body.classList.remove("scroll-up");
    } else {
        // Scrolling up
        body.classList.add("scroll-up");
        body.classList.remove("scroll-down");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
}, false);

//TEATM SLIDER
var impactSlider = new Swiper(".impactSlider", {
    slidesPerView: 3.1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1.2,
            spaceBetween: 15,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 2.1,
            spaceBetween: 20,
        },
        1440: {
            slidesPerView: 3.4,
            spaceBetween: 20,
        },
    },
});
//TEAM Slider

var impactSlider = new Swiper("#team_slider", {
    slidesPerView: 3.1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1.2,
            spaceBetween: 15,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 2.1,
            spaceBetween: 20,
        },
        1440: {
            slidesPerView: 7.4,
            spaceBetween: 20,
        },
    },
});