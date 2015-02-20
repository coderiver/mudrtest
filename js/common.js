head.ready(function() {

    (function() {
        var slider = $('.js-slick');

        if ( slider.length ) {

            slider.slick({
                autoplay: true,
                autoplaySpeed: 5000,
                dots: true,
                slide: '.slider__slide',
                prevArrow: '.slider__prev',
                nextArrow: '.slider__next',
                mobileFirst: true
            });
        }
    })();


    (function() {
        var header      = $('.header'),
            wrapper     = header.parent(),
            toparea     = $('.toparea'),
            fixed       = 'is-fixed',
            visible     = 'is-visible',
            secondPoint = toparea.height() - 10,
            firstPoint  = secondPoint / 2,
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
            secondPoint = toparea.height() - 10;
            firstPoint  = secondPoint / 2;
            calcHeaderHeight();
        });

        if ( $(window).scrollTop() >= firstPoint && !header.hasClass(fixed) ) {
            wrapper.css('height', headerHeight);
            header.addClass(fixed);
        }

        $(window).on('scroll', function(event) {
            var scroll = $(window).scrollTop();

            if ( scroll >= firstPoint && !header.hasClass(fixed) ) {
                wrapper.css('height', headerHeight);
                header.addClass(fixed);
            }

            if ( scroll >= secondPoint && !header.hasClass(visible) ) {
                header.addClass(visible);
            }

            if ( scroll < secondPoint && header.hasClass(visible) ) {
                header.removeClass(visible);
            }

            if ( scroll < firstPoint && header.hasClass(fixed) ) {
                wrapper.css('height', '');
                header.removeClass(fixed);
            }
        });
    })();


    // smooth scrolling to anchor link
    $(function() {
        var links          = $('a[href*=#]:not([href=#])'),
            section        = $('.section[name]'),
            activeClass    = 'is-active',
            activeSectionName;

        // console.log(section);

        $(window).on('scroll', function() {
            scrollPosition = $(window).scrollTop();
            if ( scrollPosition <= 0 ) {
                links.removeClass(activeClass);
            }
        });

        section.each(function() {
            var el = $(this);

            var offset = el.offset().top;

            $(window).on('resize', function() {
                offset = el.offset().top;
            });

            $(window).on('scroll', function() {
                if ( scrollPosition >= offset - 10 ) {

                    var thisSectionName = el.attr('name');
                    var targetLink = $('a[href=#' + thisSectionName + ']');

                    if ( !targetLink.hasClass(activeClass) ) {

                        if ( activeSectionName ) {
                            $('a[href=#' + activeSectionName + ']')
                                .removeClass(activeClass);
                        }

                        targetLink.addClass(activeClass);
                        activeSectionName = thisSectionName;
                    }

                }
            });

        });

        links.each(function() {

            $(this).on('click', function(event) {
                event.preventDefault();

                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if ( target.length ) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                    }
                }
            });

        });
    });


    $('[data-video-id]').each(function() {
        var el = $(this);
        el.on('click', function() {
            setTimeout(function(){
                playVideo(el.data('video-id'));
            }, 100);
        });
    });


    var toggleBodyScroll = function(body) {

        body.toggleClass('no-scroll');

        if (body.hasClass('no-scroll')) {
            // var posTop = -$(window).scrollTop();
            // body.css({
            //     position : 'fixed',
            //     top      : posTop
            // });
            body.bind('touchmove', function(event) {
                event.preventDefault();
            });
        } else {
            // var scrollPos = -body.offset().top;
            // body.css({
            //     position : '',
            //     top      : ''
            // });
            // $(window).scrollTop(scrollPos);
            body.unbind('touchmove');
        }
    };



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

            toggleBodyScroll(body);

            popup.fadeIn(200);
            setTimeout(function() {
                popupInner.addClass(visibleClass);
            }, 200);

        } else {

            toggleBodyScroll(body);

            popupInner.removeClass(visibleClass);
            setTimeout(function() {
                popup.fadeOut(200);
            }, 200);

            if (popup.hasClass('js-yt')) {
                pauseVideo();
            }

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

    (function(){
        var labirint    = $('#pacman-labirint'),
            initClass   = 'pacman-load',
            activeClass = 'show-pacman',
            chageClass  = 'change-labirint';

        var changeLabirint = function() {
            labirint.addClass(chageClass);
            setTimeout(function() {
                labirint.removeClass(chageClass);
            }, 2000);
        };

        var showPacman = function() {
            labirint
                .addClass(initClass)
                .addClass(activeClass);

            setTimeout(function() {
                labirint.removeClass(activeClass);
                changeLabirint();
            }, 31000);
        };


        var calculatePosition = function() {
            return $(window).scrollTop() + $(window).height() / 2;
        };

        $(window).on('scroll', function(){
            if ( calculatePosition() >= labirint.offset().top && !labirint.hasClass(initClass)) {

                showPacman();
                setInterval(function() {
                    showPacman();
                }, 33000);

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

            // setInterval(function() {
            //     shufflePhoto(cloned);
            //     shufflePhoto(inner);
            // }, dur);

        }

    })();


    (function(){

        var fadeElement = $('.js-fade');

        if ( fadeElement.length && $(window).width() > 1024 && $(window).scrollTop() === 0) {
            var  scrollPosition;


            $(window).on('scroll', function() {
                scrollPosition = $(window).scrollTop() + $(window).height();
            });


            var calcShowPoint = function(element) {
                return element.offset().top + 100;
            };

            fadeElement.each(function() {
                var el          = $(this),
                    elShowPoint = calcShowPoint(el);

                el.css({
                    opacity : '0'
                });

                function showEl() {
                   if ( scrollPosition >= elShowPoint ) {
                        el.css({
                            opacity : '1'
                        });
                    }
                }

                showEl();

                $(window).on('scroll', function() {
                    showEl();
                });

                $(window).on('resize', function() {
                    elShowPoint = calcShowPoint(el);
                });
            });

        }

    })();

});
    // var path = document.querySelector('#main-line');
    // var length = path.getTotalLength();
    // console.log(length);
