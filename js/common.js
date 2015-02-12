head.ready(function() {

    $('.js-slick').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        slide: '.slider__slide',
        prevArrow: '.slider__prev',
        nextArrow: '.slider__next'
    });

    var changeHeader = function(scroll) {
        var header       = $('.header'),
            toparea      = $('.toparea'),
            topPoint     = toparea.height(),
            fixed        = 'is-fixed';

        $(window).on('resize', function(event) {
            topPoint = toparea.height();
        });

        $(window).on('scroll', function(event) {
            if ( $(window).scrollTop() >= topPoint ) {
                header.addClass(fixed);
            } else {
                header.removeClass(fixed);
            }
        });
    };

    changeHeader();

});