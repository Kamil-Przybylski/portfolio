'use strict';

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

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////APLICATIONS//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

//Memory Test - VueJS

(function () {

    new Vue({
        el: "#app",
        data: {
            number: 8,
            cardId: [],
            cards: [],
            correct: [],
            checked: {},
            score: 0,
            counter: 0,
            lock: false,
            oneVisible: false,
            end: false,
            start: false
        },
        methods: {

            createCards: function() {
                var j, x;

                this.cardId = [];
                this.cards = [];
                this.correct = [];
                this.checked = {};
                this.score = 0;
                this.counter = 0;
                this.lock = false,
                this.oneVisible = false,
                this.end = false;
                this.start = true;

                for (var i = 1; i < (this.number / 2) + 1; i++) {
                    this.cardId.push(i);
                    this.cardId.push(i);
                    this.correct.push(false)
                }
                for (var i = this.cardId.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = this.cardId[i];
                    this.cardId[i] = this.cardId[j];
                    this.cardId[j] = x;
                }
                for (var i = 0; i < this.cardId.length; i++) {
                    var crd = {
                        id: i,
                        rotated: false,
                    }
                    this.cards.push(crd);
                }
            },

            success: function() {
                this.end = true;
                this.start = false;
            },

            hit: function(id) {
                setTimeout(function(){
                    this.correct[id] = true;
                    this.lock = false;
                    this.score++;
                    this.$forceUpdate();
                    if (this.score == this.number/2) {
                        this.success();
                    }
                }.bind(this), 1500);
            },

            miss: function(i) {
                setTimeout(function(){
                    this.cards[this.checked.i].rotated = false;
                    this.cards[i].rotated = false;
                    this.lock = false;
                    this.$forceUpdate();
                }.bind(this), 1500);
            },

            showCard: function(id, i) {
                
                if(!this.cards[i].rotated && !this.lock) {
                    this.cards[i].rotated = true;

                    if(this.oneVisible) {
                        //second card
                        this.counter++
                        this.oneVisible = false;
                        this.lock = true;

                        if(this.checked.id == id) {
                            this.hit(id);      
                        } else {
                            this.miss(i);
                        }
    
                    } else {
                        //first card
                        this.oneVisible = true;
                        this.checked.id = id;
                        this.checked.i = i;
    
                    }
                }

            }
        },
    })

})();