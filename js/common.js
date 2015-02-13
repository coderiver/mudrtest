head.ready(function() {

    (function() {
        var slider = $('.js-slick');

        if ( slider.length ) {

            slider.slick({
                autoplay: true,
                autoplaySpeed: 6000,
                dots: true,
                slide: '.slider__slide',
                prevArrow: '.slider__prev',
                nextArrow: '.slider__next',
                mobileFirst: true
            });
        }
    })();


    (function() {
        var header       = $('.header'),
            wrapper      = header.parent(),
            toparea      = $('.toparea'),
            fixed        = 'is-fixed',
            topPoint     = toparea.height() - 10,
            headerHeight;

        function calcHeaderHeight() {
            var height = header.height();
            if ( height < 60 ) {
                headerHeight = 60;
            } else {
                headerHeight = height;
            }
        }

        calcHeaderHeight();

        $(window).on('resize', function(event) {
            topPoint = toparea.height();
            calcHeaderHeight();
        });

        $(window).on('scroll', function(event) {
            if ( $(window).scrollTop() >= topPoint ) {
                wrapper.css('height', headerHeight);
                header.addClass(fixed);
            } else {
                wrapper.css('height', '');
                header.removeClass(fixed);
            }
        });
    })();


    // smooth scrolling to anchor link
    $(function() {
        $('a[href*=#]:not([href=#])').on('click', function(event) {
            event.preventDefault();

            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                }
            }
        });
    });


    var togglePopup = function(popupId) {
        var popup;

        if ( typeof(popupId) == "object") {
            popup = $(popupId);
        } else {
            popup = $('#' + popupId);
        }

        var popupInner   = popup.find('.popup__inner'),
            visibleClass = 'is-visible';


        if ( !popup.is(':visible') ) {

            popup.fadeIn(200);
            setTimeout(function() {
                popupInner.addClass(visibleClass);
            }, 200);

        } else {

            popupInner.removeClass(visibleClass);
            setTimeout(function() {
                popup.fadeOut(200);
            }, 200);

        }
    };

    $('[data-popup]').on('click', function(event) {
        event.preventDefault();
        togglePopup($(this).data('popup'));
    });

    $('.popup').on('click', function(event) {
        event.preventDefault();
        togglePopup(this);
    });

    $('.popup__close').on('click', function(event) {
        event.preventDefault();
        togglePopup($(this).parents('.popup'));
    });

    $('.popup__inner').on('click', function(event) {
        event.stopPropagation();
    });

    $('.toparea').on('scroll', function(event) {
        event.preventDefault();

    });

    // change arrows top position in slider
    (function() {
        $('.slider').each(function(index) {
            var slider    = $(this),
                arrows    = slider.find('.slider__prev, .slider__next'),
                targetEl  = slider.find('.person');

            var calcHeight = function() {
                targetEl.each(function() {
                    $(this).css('height', '');
                });
                arrows.each(function() {
                    $(this).css('top', '');
                });

                var heightArr = [],
                    maxHeight,
                    targetPos;

                targetEl.each(function() {
                    heightArr.push( $(this).height() );
                });

                maxHeight = Math.max.apply(null, heightArr);

                targetEl.each(function() {
                    $(this).css('height', maxHeight);
                });

                arrows.each(function() {
                    $(this).css('top', maxHeight + 15);
                });
            };

            calcHeight();

            $(window).on('resize', function() {
                calcHeight();
            });
        });
    })();

});