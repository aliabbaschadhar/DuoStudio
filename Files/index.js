function init() {
  // Register the ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Initialize LocomotiveScroll for smooth scrolling
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"), // Target the main element
    smooth: true, // Enable smooth scrolling
  });

  // Update ScrollTrigger on LocomotiveScroll scroll events
  locoScroll.on("scroll", ScrollTrigger.update);

  // Set up ScrollTrigger scroller proxy for LocomotiveScroll
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      // Override scrollTop method for ScrollTrigger
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0) // Scroll to the specified value
        : locoScroll.scroll.instance.scroll.y; // Get current scroll position
    },
    getBoundingClientRect() {
      // Define bounding rectangle for the scroller
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // Determine pin type based on transform support
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // Update LocomotiveScroll on ScrollTrigger refresh
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // Refresh ScrollTrigger to apply changes
  ScrollTrigger.refresh();
}

init();

// ------------------------------------------ //
// Gsap using the timelines and scrolltrigger //
let mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {
  return () => gsap.killTweensOf(".page1 h1,h2");
});

mm.add("(min-width: 769px)", () => {
  gsap.from(".page1 h1,h2", {
    opacity: 0,
    y: 100,
    duration: 2.7,
    delay: 0.5,
    stagger: 0.2,
    ease: "power4.out",
  });
});

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers: true,
    start: "top 30%",
    end: "top 0%",
    scrub: 3,
  },
});

timeline.to(
  ".page1 h1",
  {
    x: -100,
  },
  "one"
);

timeline.to(
  ".page1 h2",
  {
    x: 100,
  },
  "one"
);

timeline.to(
  ".page1 video",
  {
    // scale: 1.4
    width: "100%",
  },
  "one"
);

const timeline2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers: true,
    start: "top -100%",
    end: "top -120%",
    scrub: 3,
  },
});

timeline2.to(".main", {
  backgroundColor: "#fff",
});

const timeline3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers: true,
    start: "top -380%",
    end: "top -400%",
    scrub: 3,
  },
});

timeline3.to(".main", {
  backgroundColor: "#0f0d0d",
});

// ------------------------------- //
// Curosr moving circle hovering effect //

var cursor = document.querySelector(".cursor");
var main = document.querySelector(".main");
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Add transition to cursor in CSS
cursor.style.transition = "background-image 0.3s ease";

document.addEventListener("mousemove", (dets) => {
  mouseX = dets.clientX;
  mouseY = dets.clientY;
});

// Use requestAnimationFrame for smoother cursor movement
function animateCursor() {
  // Add easing effect with interpolation
  const ease = 0.1;
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;

  cursor.style.left = cursorX + 7 + "px";
  cursor.style.top = cursorY + 7 + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

// ------------------------------- //
// Clients reviews hovering effect //

var boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  box.addEventListener("mouseenter", () => {
    var imageAddress = box.getAttribute("data-image");
    cursor.style.width = "25vw";
    cursor.style.height = "30vh";
    cursor.style.borderRadius = "0";
    cursor.style.backgroundImage = `url(${imageAddress})`;
    for (let i = 0; i < 3; i++) {
      box.getElementsByTagName("h4")[i].style.color = "white";
      box.getElementsByTagName("h4")[i].style.fontWeight = "600";
    }
  });
  box.addEventListener("mouseleave", () => {
    cursor.style.width = "2vw";
    cursor.style.height = "2vw";
    cursor.style.borderRadius = "100%";
    cursor.style.backgroundImage = ``;
    for (let i = 0; i < 3; i++) {
      box.getElementsByTagName("h4")[i].style.color = "rgb(77, 75, 75)";
      box.getElementsByTagName("h4")[i].style.fontWeight = "400";
    }
  });
});

// Navbar hovering effect //

var navbar = document.querySelector(".nav-part2");
var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");
h4.forEach((ele) => {
  ele.addEventListener("mouseenter", () => {
    purple.style.display = "block";
    purple.style.opacity = "1";
    cursor.style.width = "3vw";
    cursor.style.height = "3vw";
    cursor.style.zIndex = "500";
    cursor.style.backgroundColor = "green";
  });

  navbar.addEventListener("mouseleave", () => {
    purple.style.display = "none";
    purple.style.opacity = "0";
    cursor.style.backgroundColor = "#edbfff";
    cursor.style.width = "1vw";
    cursor.style.height = "1vw";
  });
});

// Making logic first then making it concise and optimized //

// const navItems = document.querySelectorAll(".nav-part2 h4");
// const marquee = document.querySelector(".marquee");

// const var0 = navItems[0];
// const var1 = navItems[1];
// const var2 = navItems[2];
// const var3 = navItems[3];

// console.log(var0.innerHTML);
// console.log(var1.innerHTML);
// console.log(var2.innerHTML);
// console.log(var3.innerHTML);

// var0.addEventListener("mouseenter", () => {
//   marquee.textContent = var0.innerHTML;
//   marquee.style.display = "block";
// });
// var1.addEventListener("mouseenter", () => {
//   marquee.textContent = var1.innerHTML;
//   marquee.style.display = "block";
// });
// var2.addEventListener("mouseenter", () => {
//   marquee.textContent = var2.innerHTML;
//   marquee.style.display = "block";
// });
// var3.addEventListener("mouseenter", () => {
//   marquee.textContent = var3.innerHTML;
//   marquee.style.display = "block";
// });

const navItems = document.querySelectorAll(".nav-part2 h4");
const marquee = document.querySelector(".marquee");

navItems.forEach((item, index) => {
  if (index !== 3) {
    item.innerHTML += " , &nbsp;";
  }
});

const barValue = ["Home", "Work", "Studio", "Contact"];

navItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    marquee.textContent = `${" " + barValue[index] + " "}`.repeat(50); // this will repeat the text for the given number times
    marquee.style.fontWeight = "900";
    marquee.style.display = "block";
  });
});
