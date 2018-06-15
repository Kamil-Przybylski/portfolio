// Preloader

(function() {
    var preloader = document.querySelector("#preloader");

    window.onload = function () {
        preloader.classList.add("fadeOut");
        preloader.addEventListener("animationend", function() {
            preloader.classList.add("d-none");
        });
    };

})();

// PARALLAX

(function() {

    var scrolled,
        parallax,
        el = document.querySelectorAll('.parallax-animate');

    window.addEventListener("scroll", function() {
        scrolled = this.pageYOffset;

        if (scrolled < 900) {
            el.forEach(function(ele) {
                parallax = scrolled * ele.dataset.speed;
                ele.style.transform = 'translateY(' + parallax + 'px)';
            })
        }

    });

})();

// NAVIGATION MENU

(function() {

    var btn = document.querySelector(".nav-btn"),
        navbar = document.querySelector("#navbar"),
        clsBtn = "nav-btn-active",
        dNone = "d-none",
        clsIn = "fadeInLeft",
        clsOut = "fadeOutLeft",
        leverIn = true;
        leverOut = false;

    navbar.addEventListener("animationend", function() {
        if(this.classList.contains(clsIn)) {
            this.classList.remove(clsIn);
            leverOut = true;
        } else if(this.classList.contains(clsOut)) {
            this.classList.remove(clsOut);
            this.classList.add(dNone);
            leverIn = true;
        }
    }); 
    
    btn.addEventListener("click", function() {
        if(leverIn) {
            leverIn = false;
            leverOut = false
            btn.classList.add(clsBtn);
            navbar.classList.remove(dNone)
            navbar.classList.add(clsIn);
        } else if(leverOut) {
            leverOut = false;
            leverIn = false;
            btn.classList.remove(clsBtn);
            navbar.classList.add(clsOut);
        }
    });
 
})();

// SCROLL REVEAL

(function() {
  
})();