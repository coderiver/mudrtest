head.ready(function() {

    var canScrollToparea;

    var checkAbilityScrollToparea = function() {
        if ( $(window).width() > 1024 ) {
            canScrollToparea = true;
        } else {
            canScrollToparea = false;
        }
    };

    var toggleAbilityScrollToparea = function(timeout) {
        if ( canScrollToparea ) {
            var delay = timeout ? timeout : 1000;
            canScrollToparea = false;
            setTimeout(function() {
                canScrollToparea = true;
            }, delay);
        }
    };

    checkAbilityScrollToparea();

    (function() {
        var header        = $('.header'),
            wrapper       = header.parent(),
            toparea       = $('.toparea'),
            body          = $('body'),
            fixed         = 'is-fixed',
            visible       = 'is-visible',
            topareaHeight = toparea.height(),
            secondPoint   = topareaHeight - 10,
            firstPoint    = secondPoint / 2,
            win           = $(window),
            winWidth      = win.width(),
            scroll        = win.scrollTop(),
            prevScroll    = scroll,
            headerHeight;

        function calcHeaderHeight() {
            var height = header.height();
            if ( height < 60 ) {
                headerHeight = 60;
            } else {
                headerHeight = height;
            }
        }

        win.on('resize', function(event) {
            topareaHeight = toparea.height();
            secondPoint   = topareaHeight - 10;
            firstPoint    = secondPoint / 2;
            winWidth      = win.width();
            calcHeaderHeight();
            checkAbilityScrollToparea();
        });

        function scrollToparea(direction) {
            disableScroll();
            if ( direction == 'top' ) {
                body.animate({
                    scrollTop: 0
                }, 800, function(){
                      enableScroll();
                });
            } else {
                body.animate({
                    scrollTop: topareaHeight
                }, 800, function(){
                      enableScroll();
                });
            }
            toggleAbilityScrollToparea(800);
        }

        calcHeaderHeight();

        if ( win.scrollTop() >= firstPoint && !header.hasClass(fixed) ) {
            wrapper.css('height', headerHeight);
            header.addClass(fixed).addClass(visible);
        }

        win.on('scroll', function(event) {
            var scroll = win.scrollTop();

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
            // if now you are on toparea and scroll to bottom
            if ( canScrollToparea && scroll < topareaHeight && scroll > prevScroll ) {
                scrollToparea();
            }
            // if now you are on toparea and scroll to top
            if ( canScrollToparea && scroll < topareaHeight && scroll < prevScroll ) {
                scrollToparea('top');
            }

            prevScroll = scroll;
        });
    })();

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
                toggleAbilityScrollToparea(1200);

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
                loadVideo(el.data('video-id'));

                if ( $('html').hasClass('desktop') ) {
                    playVideo();
                }
            }, 200);
        });
    });

    // function toggleVideo(context, state) {
    //     // if state == 'hide', hide. Else: show video
    //     // var div = document.getElementById("popupVid");
    //     // var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    //     var iframe = context.find('iframe')[0].contentWindow;
    //     // div.style.display = state == 'hide' ? 'none' : '';
    //     func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    //     iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
    // }


    var toggleBodyScroll = function(body) {

        body.toggleClass('no-scroll');

        if (body.hasClass('no-scroll')) {
            disableScroll();
            // var posTop = -$(window).scrollTop();
            // body.css({
            //     position : 'fixed',
            //     top      : posTop
            // });
            // body.bind('touchmove', function(event) {
            //     event.preventDefault();
            // });
        } else {
             enableScroll();
            // var scrollPos = -body.offset().top;
            // body.css({
            //     position : '',
            //     top      : ''
            // });
            // $(window).scrollTop(scrollPos);
            // body.unbind('touchmove');
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

            // if (popup.hasClass('js-yt')) {
            //     setTimeout(toggleVideo(popup), 200);
            // }

        } else {

            toggleBodyScroll(body);

            popupInner.removeClass(visibleClass);
            setTimeout(function() {
                popup.fadeOut(200);
            }, 200);

            if (popup.hasClass('js-yt')) {
                pauseVideo();
                // toggleVideo(popup, 'hide');
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

    $('.popup__close').on('click touchend', function(event) {
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
                    elShowPoint = calcShowPoint(el),
                    fadeDelay   = el.find('.js-fade-delay');

                //hide elements
                el.css({
                    opacity : '0'
                });

                if ( fadeDelay.length ) {
                    var delayStep = 500;

                    fadeDelay.each(function(index) {
                        $(this).css({
                            opacity               : '0',
                            webkitTransitionDelay : delayStep * index / 1000 + 's',
                            transitionDelay       : delayStep * index / 1000 + 's'
                        });
                    });
                }

                function showElWithDelay() {
                    fadeDelay.each(function() {
                        $(this).css({
                            opacity               : ''
                        });
                    });
                    setTimeout(function() {
                        fadeDelay.each(function() {
                            $(this).css({
                                webkitTransitionDelay : '',
                                transitionDelay       : ''
                            });
                        });
                    }, delayStep * fadeDelay.length);
                }

                function showEl() {
                   if ( scrollPosition >= elShowPoint ) {
                        el.css({
                            opacity : ''
                        });

                        if ( fadeDelay.length ) {
                            showElWithDelay();
                        }
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

    (function() {
        var form         = $('.form'),
            name         = form.find('input[name="name"]'),
            email        = form.find('input[name="email"]'),
            btn          = form.find('[type=submit]'),
            nameField    = name.parents('.field'),
            emailField   = email.parents('.field'),
            field        = '.field',
            errorClass   = 'is-error',
            visibleClass = 'is-visible',
            successClass = 'is-success',
            alertClass   = 'is-alert',
            sendingClass = 'is-sending',
            error        = [false, false];
            blackList    = [
                'sharklasers.com',
                'guerrillamailblock.com',
                'guerrillamail.com',
                'guerrillamail.net',
                'guerrillamail.biz',
                'guerrillamail.org',
                'guerrillamail.de',
                'spam4.me',
                'mailspeed.ru',
                'mqkr.net',
                '12minutemail.com',
                'mytempemail.com',
                'spamobox.com',
                'vipmail.pw',
                'shitmail.me',
                'disposableinbox.com',
                'filzmail.com',
                'freemail.msuroid.com',
                'anonymbox.com',
                'yopmail.com',
                'TempEMail.net',
                'spambog.com',
                'spambog.de',
                'mfsa.ru',
                'spam.su',
                'nospam.ws',
                'mailinator.com',
                'safetymail.info',
                'trashcanmail.com',
                'mintemail.com',
                'jetable.org',
                'dispostable.com',
                'spamgourmet.com'
            ];

        function validateEmail(email) {
            var check;
            var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            if (re.test(email)) {
                check = true;
            } else {
                check = false;
            }
            return check;
        }

        function checkBlackList(email) {
            var check = false,
                i     = 0,
                max   = blackList.length - 1;
            while( check === false ){
                var domain = new RegExp(blackList[i]);
                if ( domain.test(email) ) {
                    console.log(email, domain);
                    check = true;
                    return check;
                } else if ( i < max ) {
                    i++;
                } else {
                    check = false;
                    return check;
                }
            }
        }

        function checkStatus() {
           if ( error.indexOf(true) === -1 ) {
                return true;
            } else {
                return false;
            }
        }

        function isFormError() {
            if ( !form.hasClass(errorClass) ) {
                form.addClass(errorClass);
                btn.attr('disabled', 'disabled');
            }
            shakeForm();
        }

        function removeFormError() {
            if ( checkStatus() ) {
                form.removeClass(errorClass);
                btn.removeAttr('disabled');
            }
        }

        function shakeForm() {
            form.addClass('is-shake');
            setTimeout(function() {
                form.removeClass('is-shake');
            }, 500);
        }

        function showErrorMsg(context) {
            var errorMsg = context.siblings('.error');
            context.parents(field).addClass(errorClass);
            errorMsg.addClass(visibleClass);
            setTimeout(function() {
                errorMsg.removeClass(visibleClass);
            }, 3000);
        }

        function hideErrorMsg(context) {
            var errorMsg = context.siblings('.error');
            context.parents(field).removeClass(errorClass);
            errorMsg.removeClass(visibleClass);
        }

        function checkIfValue(field, indexInErrorStatus) {
            if ( field.val() === '' ) {
                showErrorMsg(field);
                isFormError();
                error[indexInErrorStatus] = true;
            } else {
                error[indexInErrorStatus] = false;
                removeFormError();
            }
        }

        function checkName() {
            var value = name.val();
            if ( value === '' && error[1] ) {
                error[1] = false;
                hideErrorMsg(name);
                removeFormError();
            }
            if ( value !== '' && error[1] ) {
                error[1] = false;
                hideErrorMsg(name);
                removeFormError();
            }
        }

        function checkEmail() {
            var emailStr = email.val();
            // console.log(emailStr === '');
            if ( emailStr !== '' ) {
                if ( validateEmail(emailStr) ) {
                    if ( checkBlackList(emailStr) ) {
                        showErrorMsg(email);
                        isFormError();
                        error[2] = true;
                    } else {
                        error[2] = false;
                        hideErrorMsg(email);
                        removeFormError();
                    }
                } else {
                    showErrorMsg(email);
                    isFormError();
                    error[2] = true;
                }
            }
            if ( emailStr === '' && error[2] ) {
                error[2] = false;
                hideErrorMsg(email);
                removeFormError();
            }
        }


        email.on('blur', function() {
            checkEmail();
        });

        form.submit(function(event) {
            event.preventDefault();
            // checkName();
            // checkEmail();
            checkIfValue(name, 1);
            checkIfValue(email, 2);
            name.on('blur', function(event) {
                checkName();
            });

            if ( checkStatus() ) {
                var url = "/send.php"; // the script where you handle the form input.

                form.addClass(sendingClass);

                setTimeout(function() {
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: form.serialize(), // serializes the form's elements.
                        success: function(data) {
                            form.parent().addClass(successClass);
                            setTimeout(function() {
                                form.removeClass(sendingClass);
                                form.find('input, textarea').val('');
                                if ( form.hasClass(alertClass) ) {
                                    form.removeClass(alertClass);
                                }
                            }, 500);
                            console.log(data);
                            setTimeout(function() {
                                form.parent().removeClass(successClass);
                            }, 10000);
                        },
                        error: function(data) {
                            console.log(data.statusText);
                            form.removeClass(sendingClass).addClass(alertClass);
                            setTimeout(function() {
                                form.removeClass(alertClass);
                            }, 2000);
                        }
                    });
                }, 600);
            }
        });
    })();


    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [37, 38, 39, 40];

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function wheel(e) {
      preventDefault(e);
    }

    function disableScroll() {
      if (window.addEventListener) {
          window.addEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = window.ontouchmove = document.ontouchmove = wheel;
      document.onkeydown = keydown;
    }

    function enableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = window.ontouchmove = document.ontouchmove = document.onkeydown = null;
    }

});
    // var path = document.querySelector('#main-line');
    // var length = path.getTotalLength();
    // console.log(length);
