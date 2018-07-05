'use strict';

// Preloader

(function () {
    var preloader = document.querySelector("#preloader"),
        animation = preloader.dataset.animation;

    window.addEventListener("load", function () {
        preloader.classList.add(animation);
        preloader.addEventListener("animationend", function () {
            preloader.classList.remove(animation);
            preloader.classList.add("d-none");
        });
    })

})();

// NAVIGATION MENU

(function () {

    var btn = document.querySelector(".nav-btn"),
        navbar = document.querySelector("#navbar"),
        clsBtn = "nav-btn-active",
        dNone = "d-none",
        clsIn = "tdFadeInRight",
        clsOut = "tdFadeOutLeft",
        leverIn = true,
        leverOut = false;

    navbar.addEventListener("animationend", function () {
        if (this.classList.contains(clsIn)) {
            this.classList.remove(clsIn);
            leverOut = true;
        } else if (this.classList.contains(clsOut)) {
            this.classList.remove(clsOut);
            this.classList.add(dNone);
            leverIn = true;
        }
    });

    btn.addEventListener("click", function () {
        if (leverIn) {
            leverIn = false;
            leverOut = false
            btn.classList.add(clsBtn);
            navbar.classList.remove(dNone)
            navbar.classList.add(clsIn);
        } else if (leverOut) {
            leverOut = false;
            leverIn = false;
            btn.classList.remove(clsBtn);
            navbar.classList.add(clsOut);
        }
    });

})();

// form

(function () {

    var form = document.querySelector("#contactForm"),
        inputs = [form.querySelector("#field-email"), form.querySelector("#field-message")];

    form.setAttribute("novalidate", true);

    var displayFieldError = function (elem) {
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

    var hideFieldError = function (elem) {
        var fieldRow = elem.closest(".form-group"),
            fieldError = fieldRow.querySelector(".input-error");

        if (fieldError !== null) {
            fieldError.remove();
        }
    };

    inputs.forEach(function (elem) {
        elem.addEventListener("input", function () {
            if (!elem.checkValidity()) {
                elem.classList.add("fieldError");
            } else {
                elem.classList.remove("fieldError");
                hideFieldError(elem);
            }
        });
    });

    var checkFieldsErrors = function (inputs) {
        var fieldsAreValid = true;

        inputs.forEach(function (elem) {
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

    form.addEventListener("submit", function (e) {
        e.preventDefault();


        if (checkFieldsErrors(inputs)) {

            form.submit();

            var btn = document.querySelector("button[type='submit']");
            btn.setAttribute("disabled", true);

            var info = document.querySelector(".fromServer");
            info.classList.remove("d-none");

        }
    });

})();

/*
var btn = document.querySelector("#app1"),
    xhr = new XMLHttpRequest(),
    appWindow = document.querySelector(".portfolio-window"),
    app1,
    error;

btn.addEventListener("click", function() {

    xhr.open("GET", "app1.html");
    xhr.send();

    xhr.onreadystatechange = function() {

        if(document.querySelector("#error")) {
            document.querySelector("#error").remove(); 
        }

        if (this.readyState == 4 && this.status == 200) {

            app1 = document.createElement('div');
            app1.id = "app1"
            app1.innerHTML = xhr.response;
            appWindow.appendChild(app1);   

        } else if (this.readyState == 4) {

            if (!appWindow.firstElementChild) {
                error = document.createElement('div');
                error.id = error;
                error.innerHTML = "<h1>Wystąpił błąd serwera...</h1>"
                error.classList.add("text-center");
                appWindow.appendChild(error);
            }

        }
    }

});
*/

///////////////////////////// PORTFOLIO APPS ///////////////////////////

(function() {

    function makeMonth(monData) {
        var month = new Array(42).fill(0),
            day = 1;

        month.forEach(function(v, i) {
            if(i >= monData.firstDay - 1 && day <= monData.days) {
                month[i] = day++;
            }
        });

        return month;
    }

    function MakeMonth (monData) {
        this.name = monData.name;
        this.days = makeMonth(monData);
    }


    function makeCalendar(calData) {
        var myCalendar = {};
        for(var val in calData) {
            myCalendar[val] = new MakeMonth(calData[val])
        }
        return myCalendar;
    }

    function getData() {
        var xhr = new XMLHttpRequest(),
            calData;
    
        xhr.open("GET", "calendar.txt");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                calData = JSON.parse(xhr.response);
                return makeCalendar(calData);
            }
        }
    };

    var cal = getData();

})();

new Vue({
    el: "#app",
    data: {
        heading: "Hello World!",
        text: "Witaj w świecie Vue.js!"
    }
});