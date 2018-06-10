(function() {
    var scrolled,
        parallax,
        el = document.querySelectorAll('.parallax-animate');

    window.addEventListener("scroll", function(e) {
        scrolled = this.pageYOffset;

        if (scrolled < 900) {
            el.forEach(function(ele) {
                parallax = scrolled * ele.dataset.speed;
                ele.style.transform = 'translateY(' + parallax + 'px)';
            })
        }

    });

})();