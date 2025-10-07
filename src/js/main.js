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
gsap.registerPlugin(ScrollTrigger);

const borderLeft = document.querySelector('.border-lft-animation');
const borderBottom = document.querySelector('.border-btm');
const borderTop = document.querySelector('.border-top-animation');
const borderRt = document.querySelector('.border-rt-animation');
const line = document.querySelector('.line');
const lineBottom = document.querySelector('.line-bottom');
const lineTop = document.querySelector('.line-top');
const lineRt = document.querySelector('.line-rt');

function animateCycle() {
    const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5,
        scrollTrigger: {
            trigger: ".your-section",   // 👈 replace with your section/class
            start: "top 80%",           // when section top hits 80% viewport
            toggleActions: "play none none reverse"
        }
    });

    // 1. Borders fade out
    tl.to([borderLeft, borderBottom, borderTop, borderRt], { opacity: 0, duration: 0.8 });

    // 2. Forward animation
    tl.to(line, { opacity: 1, top: "100%", duration: 3, ease: "power1.inOut" }, ">");
    tl.to(lineBottom, { opacity: 1, left: "100%", duration: 3, ease: "power1.inOut" }, "<");
    tl.to(lineTop, { opacity: 1, top: "100%", duration: 3, ease: "power1.inOut" }, "<");
    tl.to(lineRt, { opacity: 1, top: "100%", duration: 3, ease: "power1.inOut" }, "<");

    // 3. Hide lines
    tl.to([line, lineBottom, lineTop, lineRt], { opacity: 0, duration: 0.5 }, "+=0.2");

    // 4. Borders fade in briefly
    tl.to([borderLeft, borderBottom, borderTop, borderRt], { opacity: 1, duration: 0.8 });
    tl.to({}, { duration: 1 });

    // 5. Borders fade out
    tl.to([borderLeft, borderBottom, borderTop, borderRt], { opacity: 0, duration: 0.5 });

    // 6. Reverse animation
    tl.to(line, { opacity: 1, top: "0px", duration: 2, ease: "power1.inOut" }, ">");
    tl.to(lineBottom, { opacity: 1, left: "0%", duration: 2, ease: "power1.inOut" }, "<");
    tl.to(lineTop, { opacity: 1, top: "0px", duration: 2, ease: "power1.inOut" }, "<");
    tl.to(lineRt, { opacity: 1, top: "0%", duration: 2, ease: "power1.inOut" }, "<");

    // 7. Hide lines
    tl.to([line, lineBottom, lineTop, lineRt], { opacity: 0, duration: 0.5 }, "+=0.2");

    // 8. Borders fade in ready for next cycle
    tl.to([borderLeft, borderBottom, borderTop, borderRt], { opacity: 1, duration: 0.8 });
}

animateCycle();
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
(function () {
    const header = document.getElementById('header');
    if (!header) return;

    function updateHeader() {
        const hb = header.getBoundingClientRect();
        // 1px below the header, centered horizontally
        const x = Math.floor(window.innerWidth / 2);
        const y = Math.min(window.innerHeight - 1, hb.bottom + 1);

        const el = document.elementFromPoint(x, y);
        const inContent = el && el.closest('.content'); // is the area under header inside .content?

        header.classList.toggle('white-header', !!inContent);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    document.addEventListener('DOMContentLoaded', updateHeader);
})();


//slider
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3.1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
