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
        el = document.querySelectorAll('.parallax-animate'),
        scroll = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(callback){ window.setTimeout(callback, 1000/60) },
        lastPos = 0;
        
    function  moveParallax() {     
        scrolled = window.pageYOffset;

        if (scrolled < 900) {
            for(var i = 0 ; i < el.length; i++) {
                parallax = scrolled * el[i].dataset.speed;
                el[i].style.transform = 'translateY(' + parallax + 'px)';    
            }
        }
    };

    function loop() {
        var top = window.pageYOffset;
        scroll(loop);

        if(top == lastPos) {
            return
        } else {
            moveParallax();
            lastPos = top;
        }

    };

    loop(); 

/*
    var scrolled,
        parallax,
        el = document.querySelectorAll('.parallax-animate');

    window.addEventListener("scroll", function(e) {
        scrolled = this.pageYOffset;

        if (scrolled < 900) {
            el.forEach(function (ele) {
                parallax = scrolled * ele.dataset.speed;
                ele.style.top = parallax + 'px';
            })
        }

    });
*/ 

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
            } else if(repeat) {
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

// form

(function() {

    var form = document.querySelector("#contactForm"),
        inputs = [form.querySelector("#field-email"),form.querySelector("#field-message")];

    form.setAttribute("novalidate", true);

    var displayFieldError = function(elem) {
        var fieldRow = elem.closest(".form-group"),
            fieldError = fieldRow.querySelector(".input-error");

        if (fieldError === null) {
            var errorText = elem.dataset.error,
                divError = document.createElement('div');
            divError.classList.add("input-error");
            divError.innerText = errorText;
            fieldRow.appendChild(divError);
        }
    };

    var hideFieldError = function(elem) {
        var fieldRow = elem.closest(".form-group"),
            fieldError = fieldRow.querySelector(".input-error");

        if (fieldError !== null) {
            fieldError.remove();
        }
    };

    inputs.forEach(function(elem) {
        elem.addEventListener("input", function() {
            if (!elem.checkValidity()) {
                elem.classList.add("fieldError");
            } else {
                elem.classList.remove("fieldError");
                hideFieldError(elem);
            }
        });
    });

    var checkFieldsErrors = function(inputs) {
        var fieldsAreValid = true;

        inputs.forEach(function(elem) {
            if (elem.checkValidity()) {
                hideFieldError(elem);
                elem.classList.remove("error");
            } else {
                displayFieldError(elem);
                elem.classList.add("error");
                fieldsAreValid = false;
            }
        });

        return fieldsAreValid;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        

        if (checkFieldsErrors(inputs)) {

            /*
            var elements = [form.querySelector("input:not(:disabled)"), form.querySelector("textarea:not(:disabled)")];

            var dataToSend = {};
            elements.forEach(function(elem) {
                dataToSend[elem.name] = elem.value;
            }); 

            var data = JSON.stringify(dataToSend);
            
            var xhr = new XMLHttpRequest(),
            method = form.getAttribute("method");
            
            xhr.open(method, "https://formspree.io/kminus13@onet.eu", true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            */

            form.submit();

            var btn = document.querySelector("button[type='submit']");
            btn.setAttribute("disabled", true);

            var info = document.querySelector(".fromServer");
            info.classList.remove("d-none");

        }
    });

})();
