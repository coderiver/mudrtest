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
        var popup,
            body = $('body');

        if ( typeof(popupId) == "object") {
            popup = $(popupId);
        } else {
            popup = $('#' + popupId);
        }

        var popupInner   = popup.find('.popup__inner'),
            visibleClass = 'is-visible';


        if ( !popup.is(':visible') ) {

            body.css({
                position : 'fixed',
                top      : -body.scrollTop()
            });

            popup.fadeIn(200);
            setTimeout(function() {
                popupInner.addClass(visibleClass);
            }, 200);

        } else {

            body.css({
                position : '',
                top      : ''
            });

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

    // (function() {
    //     var path = document.querySelectorAll('#labirint path');

    //     if ( path.length ) {

    //         for (var i = 0; i < path.length; i++) {
    //             var length = Math.ceil(path[i].getTotalLength());

    //             console.log(length);

    //             // // Clear any previous transition
    //             // path[i].style.transition = path[i].style.WebkitTransition = 'none';
    //             // // Set up the starting positions
    //             // path[i].style.strokeDasharray = length + ' ' + length;
    //             // path[i].style.strokeDashoffset = length;
    //             // // Trigger a layout so styles are calculated & the browser
    //             // // picks up the starting position before animating
    //             // path[i].getBoundingClientRect();
    //             // // Define our transition
    //             // path[i].style.transition = path[i].style.WebkitTransition = 'stroke-dashoffset 5s linear';
    //             // // Go!
    //             // path[i].style.strokeDashoffset = '0';
    //         }

    //     }
    // })();

    (function(){
        var labirint    = $('#pacman-labirint'),
            initClass   = 'pacman-load',
            activeClass = 'show-pacman';

        var showPacman = function() {
            labirint
                .addClass(initClass)
                .addClass(activeClass);

            setTimeout(function() {
                labirint.removeClass(activeClass);
            }, 23000);
        };

        var calculatePosition = function() {
            return $(window).scrollTop() + $(window).height() / 2;
        };

        $(window).on('scroll', function(){
            if ( calculatePosition() >= labirint.offset().top && !labirint.hasClass(initClass)) {

                showPacman();
                setInterval(function() {
                    showPacman();
                }, 28000);

            }
        });
    })();

    (function() {
        var wrapper = $('.photos');

        if ( wrapper.length ) {

            var photo  = wrapper.find('.photo'),
                inner  = wrapper.find('.photos__inner'),
                copy   = inner.html(),
                dur    = 60000,
                images = [],
                cloned;

            photo.each(function(index, el) {
                var img = $(this).find('img');
                images[index] = {'src': img.attr('src'), 'alt': img.attr('alt')};
            });

            var shuffle = function(array) {
                var m = array.length, t, i;
                // While there remain elements to shuffle…
                while (m) {
                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);
                    // And swap it with the current element.
                    t = array[m];
                    array[m] = array[i];
                    array[i] = t;
                }
                return array;
            };

            var shufflePhoto = function(container) {
                shuffle(images);
                container.find('.photo').each(function(index) {
                    var img = $(this).find('img');
                    img.attr('src', images[index].src);
                    img.attr('alt', images[index].alt);
                });
            };

            wrapper.append('<div class="photos__inner cloned"></div>');
            cloned = wrapper.find('.cloned');

            cloned.html(copy);

            shuffle(images);

            shufflePhoto(cloned);

            wrapper.addClass('is-redy');

            setInterval(function() {
                shufflePhoto(cloned);
                shufflePhoto(inner);
            }, dur/2);

        }

    })();

});