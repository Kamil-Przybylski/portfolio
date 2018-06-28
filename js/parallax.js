(function () {
    
    /*
        var scrolled,
            maxScrollItem = document.querySelector("#section1"),
            maxScroll,
            parallax,
            el = document.querySelectorAll('.parallax-animate');
    
        var boxElement = document.querySelector(".container-max"),
            steps = function() {
                var arr = [];
                for(var i = 0; i <= 200; i++) arr.push(i/200);
                return arr;
            },
            options = {
                threshold: steps()
            };
    
        function  moveParallax() {     
            scrolled = window.pageYOffset;
            maxScroll = maxScrollItem.offsetTop;
    
            if (scrolled < maxScroll) {
                for(var i = 0 ; i < el.length; i++) {
                    parallax = scrolled * el[i].dataset.speed;
                    el[i].style.transform = 'translate3d(0px, ' + parallax + 'px, 0px)';    
                }
            }
        };
    
        var observer = new IntersectionObserver(moveParallax, options);
        observer.observe(boxElement);
    */

    var scrolled,
        maxScrollItem = document.querySelector("#section1"),
        maxScroll,
        parallax,
        el = document.querySelectorAll('.parallax-animate'),
        scroll = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60) },
        lastPos = 0;

    function moveParallax() {
        scrolled = window.pageYOffset;
        maxScroll = maxScrollItem.offsetTop;

        if (scrolled < maxScroll) {
            for (var i = 0; i < el.length; i++) {
                parallax = scrolled * el[i].dataset.speed;
                el[i].style.transform = 'translate3d(0px, ' + parallax + 'px, 0px)';
            }
        }
    };

    function loop() {
        var top = window.pageYOffset;
        scroll(loop);

        if (top == lastPos) {
            return
        } else {
            moveParallax();
            lastPos = top;
        }

    };

    loop();

    /*
        var scrolled,
            maxScrollItem = document.querySelector("#section1"),
            maxScroll,
            parallax,
            el = document.querySelectorAll('.parallax-animate');
    
        window.addEventListener("scroll", function() {
            scrolled = window.pageYOffset;
            maxScroll = maxScrollItem.offsetTop;
    
            if (scrolled < maxScroll) {
                el.forEach(function (ele) {
                    parallax = scrolled * ele.dataset.speed;
                    ele.style.transform = 'translate3d(0px, ' + parallax + 'px, 0px)';
                })
            }
    
        });
    */

})();