$( function () {
    var scrolled;
    var $window = $(window);
    var el = $('.parallax-animate');

    $window.on('scroll', function () {
        scrolled = $(window).scrollTop();

        if (scrolled < 900) {
            
            el.each(function () {
                var parallax = scrolled * $(this).data('speed');
    
                $(this).css({
                    'transform': 'translateY(' + parallax + 'px)'
                });
    
            });  
        }

    });
});

