'use strict';
// Preloader

(function() {
    var preloader = document.querySelector("#preloader"),
        animation = preloader.dataset.animation;

    window.addEventListener("load", function() {
        preloader.classList.add(animation);
        preloader.addEventListener("animationend", function() {
            preloader.classList.remove(animation);
            preloader.classList.add("d-none");
        });
    })

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
        clsIn = "tdFadeInRight",
        clsOut = "tdFadeOutLeft",
        leverIn = true,
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

    var items = document.querySelectorAll("[data-animation]");

    function revealOnScroll() {
        var scrolled = window.scrollY,
            win_height_padded = window.innerHeight;

        items.forEach(function(i){
            var offsetTop = i.offsetTop,
                animation = i.dataset.animation,
                repeat = i.dataset.repeat,
                itemHeight = i.clientHeight;

            if ((scrolled + win_height_padded >= offsetTop)
            &&
            (scrolled <= offsetTop + itemHeight)) {
                i.classList.add(animation);
            }else if(repeat) {
                i.classList.remove(animation);
            }

        })

    }
  
    window.addEventListener("load", function() {
        window.addEventListener("scroll", revealOnScroll)
    });

})();

// anchors

(function() {

    var anchors = document.querySelectorAll("a[href*='section']");

    window.addEventListener("animationend", function(e) {

    });

    anchors.forEach(function(item) {
        item.addEventListener("click", function(e){
            e.preventDefault();

            var target = item.hash,
                obj = document.querySelector(target),
                posObj = obj.offsetTop;

            window.scroll({
                top: posObj,
                left: 0,
                behavior: "smooth"
            });

            obj.setAttribute("tabindex", -1);
            obj.focus({preventScroll: true});

        })
    })

})();