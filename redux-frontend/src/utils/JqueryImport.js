import $ from 'jquery'
import jQuery from 'jquery'
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/slider';
import Swiper from 'swiper';

export const customAppear = () => {
    (function ($) {
        (function ($) {
            var selectors = [];
            var check_binded = false;
            var check_lock = false;
            var defaults = {
                interval: 250,
                force_process: false
            }
            var $window = $(window);
            var $prior_appeared;

            function process() {
                check_lock = false;
                for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
                    var $appeared = $(selectors[index]).filter(function () {
                        return $(this).is(':appeared');
                    });
                    $appeared.trigger('appear', [$appeared]);
                    if ($prior_appeared) {
                        var $disappeared = $prior_appeared.not($appeared);
                        $disappeared.trigger('disappear', [$disappeared]);
                    }
                    $prior_appeared = $appeared;
                }
            }
            // "appeared" custom filter
            $.expr[':']['appeared'] = function (element) {
                var $element = $(element);
                if (!$element.is(':visible')) {
                    return false;
                }
                var window_left = $window.scrollLeft();
                var window_top = $window.scrollTop();
                var offset = $element.offset();
                var left = offset.left;
                var top = offset.top;
                if (top + $element.height() >= window_top &&
                    top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
                    left + $element.width() >= window_left &&
                    left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
                    return true;
                } else {
                    return false;
                }
            }
            $.fn.extend({
                // watching for element's appearance in browser viewport
                appear: function (options) {
                    var opts = $.extend({}, defaults, options || {});
                    var selector = this.selector || this;
                    if (!check_binded) {
                        var on_check = function () {
                            if (check_lock) {
                                return;
                            }
                            check_lock = true;
                            setTimeout(process, opts.interval);
                        };
                        $(window).scroll(on_check).resize(on_check);
                        check_binded = true;
                    }
                    if (opts.force_process) {
                        setTimeout(process, opts.interval);
                    }
                    selectors.push(selector);
                    return $(selector);
                }
            });
            $.extend({
                // force elements's appearance check
                force_appear: function () {
                    if (check_binded) {
                        process();
                        return true;
                    };
                    return false;
                }
            });
        })(jQuery);
        var selectors = [];
        var check_binded = false;
        var check_lock = false;
        var defaults = {
            interval: 250,
            force_process: false
        }
        var $window = $(window);
        var $prior_appeared;

        function process() {
            check_lock = false;
            for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
                var $appeared = $(selectors[index]).filter(function () {
                    return $(this).is(':appeared');
                });
                $appeared.trigger('appear', [$appeared]);
                if ($prior_appeared) {
                    var $disappeared = $prior_appeared.not($appeared);
                    $disappeared.trigger('disappear', [$disappeared]);
                }
                $prior_appeared = $appeared;
            }
        }
        // "appeared" custom filter
        $.expr[':']['appeared'] = function (element) {
            var $element = $(element);
            if (!$element.is(':visible')) {
                return false;
            }
            var window_left = $window.scrollLeft();
            var window_top = $window.scrollTop();
            var offset = $element.offset();
            var left = offset.left;
            var top = offset.top;
            if (top + $element.height() >= window_top &&
                top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
                left + $element.width() >= window_left &&
                left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
                return true;
            } else {
                return false;
            }
        }
        $.fn.extend({
            // watching for element's appearance in browser viewport
            appear: function (options) {
                var opts = $.extend({}, defaults, options || {});
                var selector = this.selector || this;
                if (!check_binded) {
                    var on_check = function () {
                        if (check_lock) {
                            return;
                        }
                        check_lock = true;
                        setTimeout(process, opts.interval);
                    };
                    $(window).scroll(on_check).resize(on_check);
                    check_binded = true;
                }
                if (opts.force_process) {
                    setTimeout(process, opts.interval);
                }
                selectors.push(selector);
                return $(selector);
            }
        });
        $.extend({
            // force elements's appearance check
            force_appear: function () {
                if (check_binded) {
                    process();
                    return true;
                };
                return false;
            }
        });
    })(jQuery);
}

export const customSliderInit = () => {

    var $slideInit = function () {
        $('.mp-slider-lbl,.mp-slider-lbl-a,.mp-slider-lbl-b,.btn-a').css('opacity', '0');
        $('.mp-slider-lbl,.mp-slider-lbl-a,.mp-slider-lbl-b,.btn-a').css('top', '20px');
        var $slide = $('.swiper-slide-active');
        $slide.find('.mp-slider-lbl').animate({
            opacity: 1,
            top: '0'
        }, 360);
        $slide.find('.mp-slider-lbl-a').delay(110).animate({
            opacity: 1,
            top: '0'
        }, 360);
        $slide.find('.mp-slider-lbl-b').delay(150).animate({
            opacity: 1,
            top: '0'
        }, 360);
        $slide.find('.btn-a').delay(200).animate({
            opacity: 1,
            top: '0'
        }, 360);
    }

    var swiper = new Swiper('.swiper-container', {
        direction: "vertical",
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        speed: 1000,
        autoplay: 200,
        loop: true,
    });


    $(document).resize(function () {

        $slideInit();
    });
    $(document).focus(function () {

        $slideInit();
    });
}

export const customSelectInput = () => {
    (function (a) {

        a.fn.extend({
            customSelect: function (cx) {
                if (typeof document.body.style.maxHeight === "undefined") {
                    return this
                }
                var e = {
                    customClass: "customSelect",
                    mapClass: true,
                    mapStyle: true
                },
                    c = a.extend(e, cx),
                    d = c.customClass,
                    f = function (h, k) {
                        var g = h.find(":selected"),
                            j = k.children(":first"),
                            i = g.html() || "&nbsp;";
                        j.html(i);
                        if (g.attr("disabled")) {
                            k.addClass(b("DisabledOption"))
                        } else {
                            k.removeClass(b("DisabledOption"))
                        }
                        setTimeout(function () {
                            k.removeClass(b("Open"));
                            a(document).off("mouseup.customSelect")
                        }, 60)
                    },
                    b = function (g) {
                        return d + g
                    };
                return this.each(function () {
                    var g = a(this),
                        i = a("<span />").addClass(b("Inner")),
                        h = a("<span />");
                    g.after(h.append(i));
                    h.addClass(d);
                    if (c.mapClass) {
                        h.addClass(g.attr("class"))
                    }
                    if (c.mapStyle) {
                        h.attr("style", g.attr("style"))
                    }
                    g.addClass("hasCustomSelect").on("render.customSelect", function () {
                        f(g, h);
                        g.css("width", "");
                        var k = parseInt(g.outerWidth(), 10) - (parseInt(h.outerWidth(), 10) - parseInt(h.width(), 10));
                        h.css({
                            display: "inline-block"
                        });
                        var j = h.outerHeight();
                        if (g.attr("disabled")) {
                            h.addClass(b("Disabled"))
                        } else {
                            h.removeClass(b("Disabled"))
                        }
                        i.css({
                            width: k,
                            display: "inline-block"
                        });
                        g.css({
                            "-webkit-appearance": "menulist-button",
                            width: h.outerWidth(),
                            position: "absolute",
                            opacity: 0,
                            height: j,
                            fontSize: h.css("font-size")
                        })
                    }).on("change.customSelect", function () {
                        h.addClass(b("Changed"));
                        f(g, h)
                    }).on("keyup.customSelect", function (j) {
                        if (!h.hasClass(b("Open"))) {
                            g.trigger("blur.customSelect");
                            g.trigger("focus.customSelect")
                        } else {
                            if (j.which === 13 || j.which === 27) {
                                f(g, h)
                            }
                        }
                    }).on("mousedown.customSelect", function () {
                        h.removeClass(b("Changed"))
                    }).on("mouseup.customSelect", function (j) {
                        if (!h.hasClass(b("Open"))) {
                            if (a("." + b("Open")).not(h).length > 0 && typeof InstallTrigger !== "undefined") {
                                g.trigger("focus.customSelect")
                            } else {
                                h.addClass(b("Open"));
                                j.stopPropagation();
                                a(document).one("mouseup.customSelect", function (k) {
                                    if (k.target != g.get(0) && a.inArray(k.target, g.find("*").get()) < 0) {
                                        g.trigger("blur.customSelect")
                                    } else {
                                        f(g, h)
                                    }
                                })
                            }
                        }
                    }).on("focus.customSelect", function () {
                        h.removeClass(b("Changed")).addClass(b("Focus"))
                    }).on("blur.customSelect", function () {
                        h.removeClass(b("Focus") + " " + b("Open"))
                    }).on("mouseenter.customSelect", function () {
                        h.addClass(b("Hover"))
                    }).on("mouseleave.customSelect", function () {
                        h.removeClass(b("Hover"))
                    }).trigger("render.customSelect")
                })
            }
        })
    })(jQuery);


}

export const customOtherTags = () => {

    //Box Slider
    (function ($) {

        var defaults = {

            // GENERAL
            mode: 'horizontal',
            slideSelector: '',
            infiniteLoop: true,
            hideControlOnEnd: false,
            speed: 500,
            easing: null,
            slideMargin: 0,
            startSlide: 0,
            randomStart: false,
            captions: false,
            ticker: false,
            tickerHover: false,
            adaptiveHeight: false,
            adaptiveHeightSpeed: 500,
            video: false,
            useCSS: true,
            preloadImages: 'visible',
            responsive: true,
            slideZIndex: 50,
            wrapperClass: 'bx-wrapper',

            // TOUCH
            touchEnabled: true,
            swipeThreshold: 50,
            oneToOneTouch: true,
            preventDefaultSwipeX: true,
            preventDefaultSwipeY: false,

            // ACCESSIBILITY
            ariaLive: true,
            ariaHidden: true,

            // KEYBOARD
            keyboardEnabled: false,

            // PAGER
            pager: true,
            pagerType: 'full',
            pagerShortSeparator: ' / ',
            pagerSelector: null,
            buildPager: null,
            pagerCustom: null,

            // CONTROLS
            controls: true,
            nextText: 'Next',
            prevText: 'Prev',
            nextSelector: null,
            prevSelector: null,
            autoControls: false,
            startText: 'Start',
            stopText: 'Stop',
            autoControlsCombine: false,
            autoControlsSelector: null,

            // AUTO
            auto: false,
            pause: 4000,
            autoStart: true,
            autoDirection: 'next',
            stopAutoOnClick: false,
            autoHover: false,
            autoDelay: 0,
            autoSlideForOnePage: false,

            // CAROUSEL
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 0,
            slideWidth: 0,
            shrinkItems: false,

            // CALLBACKS
            onSliderLoad: function () { return true; },
            onSlideBefore: function () { return true; },
            onSlideAfter: function () { return true; },
            onSlideNext: function () { return true; },
            onSlidePrev: function () { return true; },
            onSliderResize: function () { return true; }
        };

        $.fn.bxSlider = function (options) {

            if (this.length === 0) {
                return this;
            }

            // support multiple elements
            if (this.length > 1) {
                this.each(function () {
                    $(this).bxSlider(options);
                });
                return this;
            }

            // create a namespace to be used throughout the plugin
            var slider = {},
                // set a reference to our slider element
                el = this,
                // get the original window dimens (thanks a lot IE)
                windowWidth = $(window).width(),
                windowHeight = $(window).height();

            // Return if slider is already initialized
            if ($(el).data('bxSlider')) { return; }

            /**
             * ===================================================================================
             * = PRIVATE FUNCTIONS
             * ===================================================================================
             */

            /**
             * Initializes namespace settings to be used throughout plugin
             */
            var init = function () {
                // Return if slider is already initialized
                if ($(el).data('bxSlider')) { return; }
                // merge user-supplied options with the defaults
                slider.settings = $.extend({}, defaults, options);
                // parse slideWidth setting
                slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
                // store the original children
                slider.children = el.children(slider.settings.slideSelector);
                // check if actual number of slides is less than minSlides / maxSlides
                if (slider.children.length < slider.settings.minSlides) { slider.settings.minSlides = slider.children.length; }
                if (slider.children.length < slider.settings.maxSlides) { slider.settings.maxSlides = slider.children.length; }
                // if random start, set the startSlide setting to random number
                if (slider.settings.randomStart) { slider.settings.startSlide = Math.floor(Math.random() * slider.children.length); }
                // store active slide information
                slider.active = { index: slider.settings.startSlide };
                // store if the slider is in carousel mode (displaying / moving multiple slides)
                slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1 ? true : false;
                // if carousel, force preloadImages = 'all'
                if (slider.carousel) { slider.settings.preloadImages = 'all'; }
                // calculate the min / max width thresholds based on min / max number of slides
                // used to setup and update carousel slides dimensions
                slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
                slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
                // store the current state of the slider (if currently animating, working is true)
                slider.working = false;
                // initialize the controls object
                slider.controls = {};
                // initialize an auto interval
                slider.interval = null;
                // determine which property to use for transitions
                slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
                // determine if hardware acceleration can be used
                slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function () {
                    // create our test div element
                    var div = document.createElement('div'),
                        // css transition properties
                        props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    // test for each property
                    for (var i = 0; i < props.length; i++) {
                        if (div.style[props[i]] !== undefined) {
                            slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
                            slider.animProp = '-' + slider.cssPrefix + '-transform';
                            return true;
                        }
                    }
                    return false;
                }());
                // if vertical mode always make maxSlides and minSlides equal
                if (slider.settings.mode === 'vertical') { slider.settings.maxSlides = slider.settings.minSlides; }
                // save original style data
                el.data('origStyle', el.attr('style'));
                el.children(slider.settings.slideSelector).each(function () {
                    $(this).data('origStyle', $(this).attr('style'));
                });

                // perform all DOM / CSS modifications
                setup();
            };

            /**
             * Performs all DOM and CSS modifications
             */
            var setup = function () {
                var preloadSelector = slider.children.eq(slider.settings.startSlide); // set the default preload selector (visible)

                // wrap el in a wrapper
                el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
                // store a namespace reference to .bx-viewport
                slider.viewport = el.parent();

                // add aria-live if the setting is enabled and ticker mode is disabled
                if (slider.settings.ariaLive && !slider.settings.ticker) {
                    slider.viewport.attr('aria-live', 'polite');
                }
                // add a loading div to display while images are loading
                slider.loader = $('<div class="bx-loading" />');
                slider.viewport.prepend(slider.loader);
                // set el to a massive width, to hold any needed slides
                // also strip any margin and padding from el
                el.css({
                    width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
                    position: 'relative'
                });
                // if using CSS, add the easing property
                if (slider.usingCSS && slider.settings.easing) {
                    el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
                    // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
                } else if (!slider.settings.easing) {
                    slider.settings.easing = 'swing';
                }
                // make modifications to the viewport (.bx-viewport)
                slider.viewport.css({
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative'
                });
                slider.viewport.parent().css({
                    maxWidth: getViewportMaxWidth()
                });
                // apply css to all slider children
                slider.children.css({
                    float: slider.settings.mode === 'horizontal' ? 'left' : 'none',
                    listStyle: 'none',
                    position: 'relative'
                });
                // apply the calculated width after the float is applied to prevent scrollbar interference
                slider.children.css('width', getSlideWidth());
                // if slideMargin is supplied, add the css
                if (slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0) { slider.children.css('marginRight', slider.settings.slideMargin); }
                if (slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0) { slider.children.css('marginBottom', slider.settings.slideMargin); }
                // if "fade" mode, add positioning and z-index CSS
                if (slider.settings.mode === 'fade') {
                    slider.children.css({
                        position: 'absolute',
                        zIndex: 0,
                        display: 'none'
                    });
                    // prepare the z-index on the showing element
                    slider.children.eq(slider.settings.startSlide).css({ zIndex: slider.settings.slideZIndex, display: 'block' });
                }
                // create an element to contain all slider controls (pager, start / stop, etc)
                slider.controls.el = $('<div class="bx-controls" />');
                // if captions are requested, add them
                if (slider.settings.captions) { appendCaptions(); }
                // check if startSlide is last slide
                slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
                // if video is true, set up the fitVids plugin
                if (slider.settings.video) { el.fitVids(); }
                if (slider.settings.preloadImages === 'all' || slider.settings.ticker) { preloadSelector = slider.children; }
                // only check for control addition if not in "ticker" mode
                if (!slider.settings.ticker) {
                    // if controls are requested, add them
                    if (slider.settings.controls) { appendControls(); }
                    // if auto is true, and auto controls are requested, add them
                    if (slider.settings.auto && slider.settings.autoControls) { appendControlsAuto(); }
                    // if pager is requested, add it
                    if (slider.settings.pager) { appendPager(); }
                    // if any control option is requested, add the controls wrapper
                    if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) { slider.viewport.after(slider.controls.el); }
                    // if ticker mode, do not allow a pager
                } else {
                    slider.settings.pager = false;
                }
                loadElements(preloadSelector, start);
            };

            var loadElements = function (selector, callback) {
                var total = selector.find('img:not([src=""]), iframe').length,
                    count = 0;
                if (total === 0) {
                    callback();
                    return;
                }
                selector.find('img:not([src=""]), iframe').each(function () {
                    $(this).one('load error', function () {
                        if (++count === total) { callback(); }
                    }).each(function () {
                        if (this.complete) { $(this).trigger('load'); }
                    });
                });
            };

            /**
             * Start the slider
             */
            var start = function () {
                // if infinite loop, prepare additional slides
                if (slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker) {
                    var slice = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides,
                        sliceAppend = slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
                        slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
                    if (slider.settings.ariaHidden) {
                        sliceAppend.attr('aria-hidden', true);
                        slicePrepend.attr('aria-hidden', true);
                    }
                    el.append(sliceAppend).prepend(slicePrepend);
                }
                // remove the loading DOM element
                slider.loader.remove();
                // set the left / top position of "el"
                setSlidePosition();
                // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
                if (slider.settings.mode === 'vertical') { slider.settings.adaptiveHeight = true; }
                // set the viewport height
                slider.viewport.height(getViewportHeight());
                // make sure everything is positioned just right (same as a window resize)
                el.redrawSlider();
                // onSliderLoad callback
                slider.settings.onSliderLoad.call(el, slider.active.index);
                // slider has been fully initialized
                slider.initialized = true;
                // bind the resize call to the window
                if (slider.settings.responsive) { $(window).bind('resize', resizeWindow); }
                // if auto is true and has more than 1 page, start the show
                if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) { initAuto(); }
                // if ticker is true, start the ticker
                if (slider.settings.ticker) { initTicker(); }
                // if pager is requested, make the appropriate pager link active
                if (slider.settings.pager) { updatePagerActive(slider.settings.startSlide); }
                // check for any updates to the controls (like hideControlOnEnd updates)
                if (slider.settings.controls) { updateDirectionControls(); }
                // if touchEnabled is true, setup the touch events
                if (slider.settings.touchEnabled && !slider.settings.ticker) { initTouch(); }
                // if keyboardEnabled is true, setup the keyboard events
                if (slider.settings.keyboardEnabled && !slider.settings.ticker) {
                    $(document).keydown(keyPress);
                }
            };

            /**
             * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
             */
            var getViewportHeight = function () {
                var height = 0;
                // first determine which children (slides) should be used in our height calculation
                var children = $();
                // if mode is not "vertical" and adaptiveHeight is false, include all children
                if (slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight) {
                    children = slider.children;
                } else {
                    // if not carousel, return the single active child
                    if (!slider.carousel) {
                        children = slider.children.eq(slider.active.index);
                        // if carousel, return a slice of children
                    } else {
                        // get the individual slide index
                        var currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
                        // add the current slide to the children
                        children = slider.children.eq(currentIndex);
                        // cycle through the remaining "showing" slides
                        for (var i = 1; i <= slider.settings.maxSlides - 1; i++) {
                            // if looped back to the start
                            if (currentIndex + i >= slider.children.length) {
                                children = children.add(slider.children.eq(i - 1));
                            } else {
                                children = children.add(slider.children.eq(currentIndex + i));
                            }
                        }
                    }
                }
                // if "vertical" mode, calculate the sum of the heights of the children
                if (slider.settings.mode === 'vertical') {
                    children.each(function (index) {
                        height += $(this).outerHeight();
                    });
                    // add user-supplied margins
                    if (slider.settings.slideMargin > 0) {
                        height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
                    }
                    // if not "vertical" mode, calculate the max height of the children
                } else {
                    height = Math.max.apply(Math, children.map(function () {
                        return $(this).outerHeight(false);
                    }).get());
                }

                if (slider.viewport.css('box-sizing') === 'border-box') {
                    height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
                        parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
                } else if (slider.viewport.css('box-sizing') === 'padding-box') {
                    height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
                }

                return height;
            };

            /**
             * Returns the calculated width to be used for the outer wrapper / viewport
             */
            var getViewportMaxWidth = function () {
                var width = '100%';
                if (slider.settings.slideWidth > 0) {
                    if (slider.settings.mode === 'horizontal') {
                        width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
                    } else {
                        width = slider.settings.slideWidth;
                    }
                }
                return width;
            };

            /**
             * Returns the calculated width to be applied to each slide
             */
            var getSlideWidth = function () {
                var newElWidth = slider.settings.slideWidth, // start with any user-supplied slide width
                    wrapWidth = slider.viewport.width();    // get the current viewport width
                // if slide width was not supplied, or is larger than the viewport use the viewport width
                if (slider.settings.slideWidth === 0 ||
                    (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
                    slider.settings.mode === 'vertical') {
                    newElWidth = wrapWidth;
                    // if carousel, use the thresholds to determine the width
                } else if (slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal') {
                    if (wrapWidth > slider.maxThreshold) {
                        return newElWidth;
                    } else if (wrapWidth < slider.minThreshold) {
                        newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
                    } else if (slider.settings.shrinkItems) {
                        newElWidth = Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
                    }
                }
                return newElWidth;
            };

            /**
             * Returns the number of slides currently visible in the viewport (includes partially visible slides)
             */
            var getNumberSlidesShowing = function () {
                var slidesShowing = 1,
                    childWidth = null;
                if (slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0) {
                    // if viewport is smaller than minThreshold, return minSlides
                    if (slider.viewport.width() < slider.minThreshold) {
                        slidesShowing = slider.settings.minSlides;
                        // if viewport is larger than maxThreshold, return maxSlides
                    } else if (slider.viewport.width() > slider.maxThreshold) {
                        slidesShowing = slider.settings.maxSlides;
                        // if viewport is between min / max thresholds, divide viewport width by first child width
                    } else {
                        childWidth = slider.children.first().width() + slider.settings.slideMargin;
                        slidesShowing = Math.floor((slider.viewport.width() +
                            slider.settings.slideMargin) / childWidth);
                    }
                    // if "vertical" mode, slides showing will always be minSlides
                } else if (slider.settings.mode === 'vertical') {
                    slidesShowing = slider.settings.minSlides;
                }
                return slidesShowing;
            };

            /**
             * Returns the number of pages (one full viewport of slides is one "page")
             */
            var getPagerQty = function () {
                var pagerQty = 0,
                    breakPoint = 0,
                    counter = 0;
                // if moveSlides is specified by the user
                if (slider.settings.moveSlides > 0) {
                    if (slider.settings.infiniteLoop) {
                        pagerQty = Math.ceil(slider.children.length / getMoveBy());
                    } else {
                        // when breakpoint goes above children length, counter is the number of pages
                        while (breakPoint < slider.children.length) {
                            ++pagerQty;
                            breakPoint = counter + getNumberSlidesShowing();
                            counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
                        }
                    }
                    // if moveSlides is 0 (auto) divide children length by sides showing, then round up
                } else {
                    pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
                }
                return pagerQty;
            };

            /**
             * Returns the number of individual slides by which to shift the slider
             */
            var getMoveBy = function () {
                // if moveSlides was set by the user and moveSlides is less than number of slides showing
                if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
                    return slider.settings.moveSlides;
                }
                // if moveSlides is 0 (auto)
                return getNumberSlidesShowing();
            };

            /**
             * Sets the slider's (el) left or top position
             */
            var setSlidePosition = function () {
                var position, lastChild, lastShowingIndex;
                // if last slide, not infinite loop, and number of children is larger than specified maxSlides
                if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
                    if (slider.settings.mode === 'horizontal') {
                        // get the last child's position
                        lastChild = slider.children.last();
                        position = lastChild.position();
                        // set the left position
                        setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
                    } else if (slider.settings.mode === 'vertical') {
                        // get the last showing index's position
                        lastShowingIndex = slider.children.length - slider.settings.minSlides;
                        position = slider.children.eq(lastShowingIndex).position();
                        // set the top position
                        setPositionProperty(-position.top, 'reset', 0);
                    }
                    // if not last slide
                } else {
                    // get the position of the first showing slide
                    position = slider.children.eq(slider.active.index * getMoveBy()).position();
                    // check for last slide
                    if (slider.active.index === getPagerQty() - 1) { slider.active.last = true; }
                    // set the respective position
                    if (position !== undefined) {
                        if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
                        else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
                    }
                }
            };

            /**
             * Sets the el's animating property position (which in turn will sometimes animate el).
             * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
             *
             * @param value (int)
             *  - the animating property's value
             *
             * @param type (string) 'slide', 'reset', 'ticker'
             *  - the type of instance for which the function is being
             *
             * @param duration (int)
             *  - the amount of time (in ms) the transition should occupy
             *
             * @param params (array) optional
             *  - an optional parameter containing any variables that need to be passed in
             */
            var setPositionProperty = function (value, type, duration, params) {
                var animateObj, propValue;
                // use CSS transform
                if (slider.usingCSS) {
                    // determine the translate3d value
                    propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
                    // add the CSS transition-duration
                    el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
                    if (type === 'slide') {
                        // set the property value
                        el.css(slider.animProp, propValue);
                        if (duration !== 0) {
                            // bind a callback method - executes when CSS transition completes
                            el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
                                //make sure it's the correct one
                                if (!$(e.target).is(el)) { return; }
                                // unbind the callback
                                el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                                updateAfterSlideTransition();
                            });
                        } else { //duration = 0
                            updateAfterSlideTransition();
                        }
                    } else if (type === 'reset') {
                        el.css(slider.animProp, propValue);
                    } else if (type === 'ticker') {
                        // make the transition use 'linear'
                        el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
                        el.css(slider.animProp, propValue);
                        if (duration !== 0) {
                            el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
                                //make sure it's the correct one
                                if (!$(e.target).is(el)) { return; }
                                // unbind the callback
                                el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                                // reset the position
                                setPositionProperty(params.resetValue, 'reset', 0);
                                // start the loop again
                                tickerLoop();
                            });
                        } else { //duration = 0
                            setPositionProperty(params.resetValue, 'reset', 0);
                            tickerLoop();
                        }
                    }
                    // use JS animate
                } else {
                    animateObj = {};
                    animateObj[slider.animProp] = value;
                    if (type === 'slide') {
                        el.animate(animateObj, duration, slider.settings.easing, function () {
                            updateAfterSlideTransition();
                        });
                    } else if (type === 'reset') {
                        el.css(slider.animProp, value);
                    } else if (type === 'ticker') {
                        el.animate(animateObj, duration, 'linear', function () {
                            setPositionProperty(params.resetValue, 'reset', 0);
                            // run the recursive loop after animation
                            tickerLoop();
                        });
                    }
                }
            };

            /**
             * Populates the pager with proper amount of pages
             */
            var populatePager = function () {
                var pagerHtml = '',
                    linkContent = '',
                    pagerQty = getPagerQty();
                // loop through each pager item
                for (var i = 0; i < pagerQty; i++) {
                    linkContent = '';
                    // if a buildPager function is supplied, use it to get pager link value, else use index + 1
                    if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom) {
                        linkContent = slider.settings.buildPager(i);
                        slider.pagerEl.addClass('bx-custom-pager');
                    } else {
                        linkContent = i + 1;
                        slider.pagerEl.addClass('bx-default-pager');
                    }
                    // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
                    // add the markup to the string
                    pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
                }
                // populate the pager element with pager links
                slider.pagerEl.html(pagerHtml);
            };

            /**
             * Appends the pager to the controls element
             */
            var appendPager = function () {
                if (!slider.settings.pagerCustom) {
                    // create the pager DOM element
                    slider.pagerEl = $('<div class="bx-pager" />');
                    // if a pager selector was supplied, populate it with the pager
                    if (slider.settings.pagerSelector) {
                        $(slider.settings.pagerSelector).html(slider.pagerEl);
                        // if no pager selector was supplied, add it after the wrapper
                    } else {
                        slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
                    }
                    // populate the pager
                    populatePager();
                } else {
                    slider.pagerEl = $(slider.settings.pagerCustom);
                }
                // assign the pager click binding
                slider.pagerEl.on('click touchend', 'a', clickPagerBind);
            };

            /**
             * Appends prev / next controls to the controls element
             */
            var appendControls = function () {
                slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
                slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
                // bind click actions to the controls
                slider.controls.next.bind('click touchend', clickNextBind);
                slider.controls.prev.bind('click touchend', clickPrevBind);
                // if nextSelector was supplied, populate it
                if (slider.settings.nextSelector) {
                    $(slider.settings.nextSelector).append(slider.controls.next);
                }
                // if prevSelector was supplied, populate it
                if (slider.settings.prevSelector) {
                    $(slider.settings.prevSelector).append(slider.controls.prev);
                }
                // if no custom selectors were supplied
                if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
                    // add the controls to the DOM
                    slider.controls.directionEl = $('<div class="bx-controls-direction" />');
                    // add the control elements to the directionEl
                    slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
                    // slider.viewport.append(slider.controls.directionEl);
                    slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
                }
            };

            /**
             * Appends start / stop auto controls to the controls element
             */
            var appendControlsAuto = function () {
                slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
                slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
                // add the controls to the DOM
                slider.controls.autoEl = $('<div class="bx-controls-auto" />');
                // bind click actions to the controls
                slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
                slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
                // if autoControlsCombine, insert only the "start" control
                if (slider.settings.autoControlsCombine) {
                    slider.controls.autoEl.append(slider.controls.start);
                    // if autoControlsCombine is false, insert both controls
                } else {
                    slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
                }
                // if auto controls selector was supplied, populate it with the controls
                if (slider.settings.autoControlsSelector) {
                    $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
                    // if auto controls selector was not supplied, add it after the wrapper
                } else {
                    slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
                }
                // update the auto controls
                updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
            };

            /**
             * Appends image captions to the DOM
             */
            var appendCaptions = function () {
                // cycle through each child
                slider.children.each(function (index) {
                    // get the image title attribute
                    var title = $(this).find('img:first').attr('title');
                    // append the caption
                    if (title !== undefined && ('' + title).length) {
                        $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                    }
                });
            };

            /**
             * Click next binding
             *
             * @param e (event)
             *  - DOM event object
             */
            var clickNextBind = function (e) {
                e.preventDefault();
                if (slider.controls.el.hasClass('disabled')) { return; }
                // if auto show is running, stop it
                if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
                el.goToNextSlide();
            };

            /**
             * Click prev binding
             *
             * @param e (event)
             *  - DOM event object
             */
            var clickPrevBind = function (e) {
                e.preventDefault();
                if (slider.controls.el.hasClass('disabled')) { return; }
                // if auto show is running, stop it
                if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
                el.goToPrevSlide();
            };

            /**
             * Click start binding
             *
             * @param e (event)
             *  - DOM event object
             */
            var clickStartBind = function (e) {
                el.startAuto();
                e.preventDefault();
            };

            /**
             * Click stop binding
             *
             * @param e (event)
             *  - DOM event object
             */
            var clickStopBind = function (e) {
                el.stopAuto();
                e.preventDefault();
            };

            /**
             * Click pager binding
             *
             * @param e (event)
             *  - DOM event object
             */
            var clickPagerBind = function (e) {
                var pagerLink, pagerIndex;
                e.preventDefault();
                if (slider.controls.el.hasClass('disabled')) {
                    return;
                }
                // if auto show is running, stop it
                if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
                pagerLink = $(e.currentTarget);
                if (pagerLink.attr('data-slide-index') !== undefined) {
                    pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
                    // if clicked pager link is not active, continue with the goToSlide call
                    if (pagerIndex !== slider.active.index) { el.goToSlide(pagerIndex); }
                }
            };

            /**
             * Updates the pager links with an active class
             *
             * @param slideIndex (int)
             *  - index of slide to make active
             */
            var updatePagerActive = function (slideIndex) {
                // if "short" pager type
                var len = slider.children.length; // nb of children
                if (slider.settings.pagerType === 'short') {
                    if (slider.settings.maxSlides > 1) {
                        len = Math.ceil(slider.children.length / slider.settings.maxSlides);
                    }
                    slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
                    return;
                }
                // remove all pager active classes
                slider.pagerEl.find('a').removeClass('active');
                // apply the active class for all pagers
                slider.pagerEl.each(function (i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
            };

            /**
             * Performs needed actions after a slide transition
             */
            var updateAfterSlideTransition = function () {
                // if infinite loop is true
                if (slider.settings.infiniteLoop) {
                    var position = '';
                    // first slide
                    if (slider.active.index === 0) {
                        // set the new position
                        position = slider.children.eq(0).position();
                        // carousel, last slide
                    } else if (slider.active.index === getPagerQty() - 1 && slider.carousel) {
                        position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
                        // last slide
                    } else if (slider.active.index === slider.children.length - 1) {
                        position = slider.children.eq(slider.children.length - 1).position();
                    }
                    if (position) {
                        if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
                        else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
                    }
                }
                // declare that the transition is complete
                slider.working = false;
                // onSlideAfter callback
                slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
            };

            /**
             * Updates the auto controls state (either active, or combined switch)
             *
             * @param state (string) "start", "stop"
             *  - the new state of the auto show
             */
            var updateAutoControls = function (state) {
                // if autoControlsCombine is true, replace the current control with the new state
                if (slider.settings.autoControlsCombine) {
                    slider.controls.autoEl.html(slider.controls[state]);
                    // if autoControlsCombine is false, apply the "active" class to the appropriate control
                } else {
                    slider.controls.autoEl.find('a').removeClass('active');
                    slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
                }
            };

            /**
             * Updates the direction controls (checks if either should be hidden)
             */
            var updateDirectionControls = function () {
                if (getPagerQty() === 1) {
                    slider.controls.prev.addClass('disabled');
                    slider.controls.next.addClass('disabled');
                } else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
                    // if first slide
                    if (slider.active.index === 0) {
                        slider.controls.prev.addClass('disabled');
                        slider.controls.next.removeClass('disabled');
                        // if last slide
                    } else if (slider.active.index === getPagerQty() - 1) {
                        slider.controls.next.addClass('disabled');
                        slider.controls.prev.removeClass('disabled');
                        // if any slide in the middle
                    } else {
                        slider.controls.prev.removeClass('disabled');
                        slider.controls.next.removeClass('disabled');
                    }
                }
            };

            /**
             * Initializes the auto process
             */
            var initAuto = function () {
                // if autoDelay was supplied, launch the auto show using a setTimeout() call
                if (slider.settings.autoDelay > 0) {
                    var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
                    // if autoDelay was not supplied, start the auto show normally
                } else {
                    el.startAuto();

                    //add focus and blur events to ensure its running if timeout gets paused
                    $(window).focus(function () {
                        el.startAuto();
                    }).blur(function () {
                        el.stopAuto();
                    });
                }
                // if autoHover is requested
                if (slider.settings.autoHover) {
                    // on el hover
                    el.hover(function () {
                        // if the auto show is currently playing (has an active interval)
                        if (slider.interval) {
                            // stop the auto show and pass true argument which will prevent control update
                            el.stopAuto(true);
                            // create a new autoPaused value which will be used by the relative "mouseout" event
                            slider.autoPaused = true;
                        }
                    }, function () {
                        // if the autoPaused value was created be the prior "mouseover" event
                        if (slider.autoPaused) {
                            // start the auto show and pass true argument which will prevent control update
                            el.startAuto(true);
                            // reset the autoPaused value
                            slider.autoPaused = null;
                        }
                    });
                }
            };

            /**
             * Initializes the ticker process
             */
            var initTicker = function () {
                var startPosition = 0,
                    position, transform, value, idx, ratio, property, newSpeed, totalDimens;
                // if autoDirection is "next", append a clone of the entire slider
                if (slider.settings.autoDirection === 'next') {
                    el.append(slider.children.clone().addClass('bx-clone'));
                    // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
                } else {
                    el.prepend(slider.children.clone().addClass('bx-clone'));
                    position = slider.children.first().position();
                    startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
                }
                setPositionProperty(startPosition, 'reset', 0);
                // do not allow controls in ticker mode
                slider.settings.pager = false;
                slider.settings.controls = false;
                slider.settings.autoControls = false;
                // if autoHover is requested
                if (slider.settings.tickerHover) {
                    if (slider.usingCSS) {
                        idx = slider.settings.mode === 'horizontal' ? 4 : 5;
                        slider.viewport.hover(function () {
                            transform = el.css('-' + slider.cssPrefix + '-transform');
                            value = parseFloat(transform.split(',')[idx]);
                            setPositionProperty(value, 'reset', 0);
                        }, function () {
                            totalDimens = 0;
                            slider.children.each(function (index) {
                                totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
                            });
                            // calculate the speed ratio (used to determine the new speed to finish the paused animation)
                            ratio = slider.settings.speed / totalDimens;
                            // determine which property to use
                            property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
                            // calculate the new speed
                            newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
                            tickerLoop(newSpeed);
                        });
                    } else {
                        // on el hover
                        slider.viewport.hover(function () {
                            el.stop();
                        }, function () {
                            // calculate the total width of children (used to calculate the speed ratio)
                            totalDimens = 0;
                            slider.children.each(function (index) {
                                totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
                            });
                            // calculate the speed ratio (used to determine the new speed to finish the paused animation)
                            ratio = slider.settings.speed / totalDimens;
                            // determine which property to use
                            property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
                            // calculate the new speed
                            newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
                            tickerLoop(newSpeed);
                        });
                    }
                }
                // start the ticker loop
                tickerLoop();
            };

            /**
             * Runs a continuous loop, news ticker-style
             */
            var tickerLoop = function (resumeSpeed) {
                var speed = resumeSpeed ? resumeSpeed : slider.settings.speed,
                    position = { left: 0, top: 0 },
                    reset = { left: 0, top: 0 },
                    animateProperty, resetValue, params;

                // if "next" animate left position to last child, then reset left to 0
                if (slider.settings.autoDirection === 'next') {
                    position = el.find('.bx-clone').first().position();
                    // if "prev" animate left position to 0, then reset left to first non-clone child
                } else {
                    reset = slider.children.first().position();
                }
                animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
                resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
                params = { resetValue: resetValue };
                setPositionProperty(animateProperty, 'ticker', speed, params);
            };

            /**
             * Check if el is on screen
             */
            var isOnScreen = function (el) {
                var win = $(window),
                    viewport = {
                        top: win.scrollTop(),
                        left: win.scrollLeft()
                    },
                    bounds = el.offset();

                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();
                bounds.right = bounds.left + el.outerWidth();
                bounds.bottom = bounds.top + el.outerHeight();

                return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            };

            /**
             * Initializes keyboard events
             */
            var keyPress = function (e) {
                var activeElementTag = document.activeElement.tagName.toLowerCase(),
                    tagFilters = 'input|textarea',
                    p = new RegExp(activeElementTag, ['i']),
                    result = p.exec(tagFilters);

                if (result === null && isOnScreen(el)) {
                    if (e.keyCode === 39) {
                        clickNextBind(e);
                        return false;
                    } else if (e.keyCode === 37) {
                        clickPrevBind(e);
                        return false;
                    }
                }
            };

            /**
             * Initializes touch events
             */
            var initTouch = function () {
                // initialize object to contain all touch values
                slider.touch = {
                    start: { x: 0, y: 0 },
                    end: { x: 0, y: 0 }
                };
                slider.viewport.bind('touchstart MSPointerDown pointerdown', onTouchStart);

                //for browsers that have implemented pointer events and fire a click after
                //every pointerup regardless of whether pointerup is on same screen location as pointerdown or not
                slider.viewport.on('click', '.bxslider a', function (e) {
                    if (slider.viewport.hasClass('click-disabled')) {
                        e.preventDefault();
                        slider.viewport.removeClass('click-disabled');
                    }
                });
            };

            /**
             * Event handler for "touchstart"
             *
             * @param e (event)
             *  - DOM event object
             */
            var onTouchStart = function (e) {
                //disable slider controls while user is interacting with slides to avoid slider freeze that happens on touch devices when a slide swipe happens immediately after interacting with slider controls                
                slider.controls.el.addClass('disabled');

                if (slider.working) {
                    e.preventDefault();
                    slider.controls.el.removeClass('disabled');
                } else {
                    // record the original position when touch starts
                    slider.touch.originalPos = el.position();
                    var orig = e.originalEvent,
                        touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig];
                    // record the starting touch x, y coordinates
                    slider.touch.start.x = touchPoints[0].pageX;
                    slider.touch.start.y = touchPoints[0].pageY;

                    if (slider.viewport.get(0).setPointerCapture) {
                        slider.pointerId = orig.pointerId;
                        slider.viewport.get(0).setPointerCapture(slider.pointerId);
                    }
                    // bind a "touchmove" event to the viewport
                    slider.viewport.bind('touchmove MSPointerMove pointermove', onTouchMove);
                    // bind a "touchend" event to the viewport
                    slider.viewport.bind('touchend MSPointerUp pointerup', onTouchEnd);
                    slider.viewport.bind('MSPointerCancel pointercancel', onPointerCancel);
                }
            };

            /**
             * Cancel Pointer for Windows Phone
             *
             * @param e (event)
             *  - DOM event object
             */
            var onPointerCancel = function (e) {
                /* onPointerCancel handler is needed to deal with situations when a touchend
                doesn't fire after a touchstart (this happens on windows phones only) */
                setPositionProperty(slider.touch.originalPos.left, 'reset', 0);

                //remove handlers
                slider.controls.el.removeClass('disabled');
                slider.viewport.unbind('MSPointerCancel pointercancel', onPointerCancel);
                slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
                slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
                if (slider.viewport.get(0).releasePointerCapture) {
                    slider.viewport.get(0).releasePointerCapture(slider.pointerId);
                }
            };

            /**
             * Event handler for "touchmove"
             *
             * @param e (event)
             *  - DOM event object
             */
            var onTouchMove = function (e) {
                var orig = e.originalEvent,
                    touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
                    // if scrolling on y axis, do not prevent default
                    xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x),
                    yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y),
                    value = 0,
                    change = 0;

                // x axis swipe
                if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
                    e.preventDefault();
                    // y axis swipe
                } else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
                    e.preventDefault();
                }
                if (slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch) {
                    // if horizontal, drag along x axis
                    if (slider.settings.mode === 'horizontal') {
                        change = touchPoints[0].pageX - slider.touch.start.x;
                        value = slider.touch.originalPos.left + change;
                        // if vertical, drag along y axis
                    } else {
                        change = touchPoints[0].pageY - slider.touch.start.y;
                        value = slider.touch.originalPos.top + change;
                    }
                    setPositionProperty(value, 'reset', 0);
                }
            };

            /**
             * Event handler for "touchend"
             *
             * @param e (event)
             *  - DOM event object
             */
            var onTouchEnd = function (e) {
                slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
                //enable slider controls as soon as user stops interacing with slides
                slider.controls.el.removeClass('disabled');
                var orig = e.originalEvent,
                    touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
                    value = 0,
                    distance = 0;
                // record end x, y positions
                slider.touch.end.x = touchPoints[0].pageX;
                slider.touch.end.y = touchPoints[0].pageY;
                // if fade mode, check if absolute x distance clears the threshold
                if (slider.settings.mode === 'fade') {
                    distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
                    if (distance >= slider.settings.swipeThreshold) {
                        if (slider.touch.start.x > slider.touch.end.x) {
                            el.goToNextSlide();
                        } else {
                            el.goToPrevSlide();
                        }
                        el.stopAuto();
                    }
                    // not fade mode
                } else {
                    // calculate distance and el's animate property
                    if (slider.settings.mode === 'horizontal') {
                        distance = slider.touch.end.x - slider.touch.start.x;
                        value = slider.touch.originalPos.left;
                    } else {
                        distance = slider.touch.end.y - slider.touch.start.y;
                        value = slider.touch.originalPos.top;
                    }
                    // if not infinite loop and first / last slide, do not attempt a slide transition
                    if (!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))) {
                        setPositionProperty(value, 'reset', 200);
                    } else {
                        // check if distance clears threshold
                        if (Math.abs(distance) >= slider.settings.swipeThreshold) {
                            if (distance < 0) {
                                el.goToNextSlide();
                            } else {
                                el.goToPrevSlide();
                            }
                            el.stopAuto();
                        } else {
                            // el.animate(property, 200);
                            setPositionProperty(value, 'reset', 200);
                        }
                    }
                }
                slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
                if (slider.viewport.get(0).releasePointerCapture) {
                    slider.viewport.get(0).releasePointerCapture(slider.pointerId);
                }

            };

            /**
             * Window resize event callback
             */
            var resizeWindow = function (e) {
                // don't do anything if slider isn't initialized.
                if (!slider.initialized) { return; }
                // Delay if slider working.
                if (slider.working) {
                    window.setTimeout(resizeWindow, 10);
                } else {
                    // get the new window dimens (again, thank you IE)
                    var windowWidthNew = $(window).width(),
                        windowHeightNew = $(window).height();
                    // make sure that it is a true window resize
                    // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
                    // are resized. Can you just die already?*
                    if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
                        // set the new window dimens
                        windowWidth = windowWidthNew;
                        windowHeight = windowHeightNew;
                        // update all dynamic elements
                        el.redrawSlider();
                        // Call user resize handler
                        slider.settings.onSliderResize.call(el, slider.active.index);
                    }
                }
            };

            /**
             * Adds an aria-hidden=true attribute to each element
             *
             * @param startVisibleIndex (int)
             *  - the first visible element's index
             */
            var applyAriaHiddenAttributes = function (startVisibleIndex) {
                var numberOfSlidesShowing = getNumberSlidesShowing();
                // only apply attributes if the setting is enabled and not in ticker mode
                if (slider.settings.ariaHidden && !slider.settings.ticker) {
                    // add aria-hidden=true to all elements
                    slider.children.attr('aria-hidden', 'true');
                    // get the visible elements and change to aria-hidden=false
                    slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
                }
            };

            /**
             * Returns index according to present page range
             *
             * @param slideOndex (int)
             *  - the desired slide index
             */
            var setSlideIndex = function (slideIndex) {
                if (slideIndex < 0) {
                    if (slider.settings.infiniteLoop) {
                        return getPagerQty() - 1;
                    } else {
                        //we don't go to undefined slides
                        return slider.active.index;
                    }
                    // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
                } else if (slideIndex >= getPagerQty()) {
                    if (slider.settings.infiniteLoop) {
                        return 0;
                    } else {
                        //we don't move to undefined pages
                        return slider.active.index;
                    }
                    // set active index to requested slide
                } else {
                    return slideIndex;
                }
            };

            /**
             * ===================================================================================
             * = PUBLIC FUNCTIONS
             * ===================================================================================
             */

            /**
             * Performs slide transition to the specified slide
             *
             * @param slideIndex (int)
             *  - the destination slide's index (zero-based)
             *
             * @param direction (string)
             *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
             */
            el.goToSlide = function (slideIndex, direction) {
                // onSlideBefore, onSlideNext, onSlidePrev callbacks
                // Allow transition canceling based on returned value
                var performTransition = true,
                    moveBy = 0,
                    position = { left: 0, top: 0 },
                    lastChild = null,
                    lastShowingIndex, eq, value, requestEl;
                // store the old index
                slider.oldIndex = slider.active.index;
                //set new index
                slider.active.index = setSlideIndex(slideIndex);

                // if plugin is currently in motion, ignore request
                if (slider.working || slider.active.index === slider.oldIndex) { return; }
                // declare that plugin is in motion
                slider.working = true;

                performTransition = slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);

                // If transitions canceled, reset and return
                if (typeof (performTransition) !== 'undefined' && !performTransition) {
                    slider.active.index = slider.oldIndex; // restore old index
                    slider.working = false; // is not in motion
                    return;
                }

                if (direction === 'next') {
                    // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
                    if (!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
                        performTransition = false;
                    }
                } else if (direction === 'prev') {
                    // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
                    if (!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
                        performTransition = false;
                    }
                }

                // check if last slide
                slider.active.last = slider.active.index >= getPagerQty() - 1;
                // update the pager with active class
                if (slider.settings.pager || slider.settings.pagerCustom) { updatePagerActive(slider.active.index); }
                // // check for direction control update
                if (slider.settings.controls) { updateDirectionControls(); }
                // if slider is set to mode: "fade"
                if (slider.settings.mode === 'fade') {
                    // if adaptiveHeight is true and next height is different from current height, animate to the new height
                    if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
                        slider.viewport.animate({ height: getViewportHeight() }, slider.settings.adaptiveHeightSpeed);
                    }
                    // fade out the visible child and reset its z-index value
                    slider.children.filter(':visible').fadeOut(slider.settings.speed).css({ zIndex: 0 });
                    // fade in the newly requested slide
                    slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function () {
                        $(this).css('zIndex', slider.settings.slideZIndex);
                        updateAfterSlideTransition();
                    });
                    // slider mode is not "fade"
                } else {
                    // if adaptiveHeight is true and next height is different from current height, animate to the new height
                    if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
                        slider.viewport.animate({ height: getViewportHeight() }, slider.settings.adaptiveHeightSpeed);
                    }
                    // if carousel and not infinite loop
                    if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
                        if (slider.settings.mode === 'horizontal') {
                            // get the last child position
                            lastChild = slider.children.eq(slider.children.length - 1);
                            position = lastChild.position();
                            // calculate the position of the last slide
                            moveBy = slider.viewport.width() - lastChild.outerWidth();
                        } else {
                            // get last showing index position
                            lastShowingIndex = slider.children.length - slider.settings.minSlides;
                            position = slider.children.eq(lastShowingIndex).position();
                        }
                        // horizontal carousel, going previous while on first slide (infiniteLoop mode)
                    } else if (slider.carousel && slider.active.last && direction === 'prev') {
                        // get the last child position
                        eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
                        lastChild = el.children('.bx-clone').eq(eq);
                        position = lastChild.position();
                        // if infinite loop and "Next" is clicked on the last slide
                    } else if (direction === 'next' && slider.active.index === 0) {
                        // get the last clone position
                        position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
                        slider.active.last = false;
                        // normal non-zero requests
                    } else if (slideIndex >= 0) {
                        //parseInt is applied to allow floats for slides/page
                        requestEl = slideIndex * parseInt(getMoveBy());
                        position = slider.children.eq(requestEl).position();
                    }

                    /* If the position doesn't exist
                     * (e.g. if you destroy the slider on a next click),
                     * it doesn't throw an error.
                     */
                    if (typeof (position) !== 'undefined') {
                        value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
                        // plugin values to be animated
                        setPositionProperty(value, 'slide', slider.settings.speed);
                    } else {
                        slider.working = false;
                    }
                }
                if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
            };

            /**
             * Transitions to the next slide in the show
             */
            el.goToNextSlide = function () {
                // if infiniteLoop is false and last page is showing, disregard call
                if (!slider.settings.infiniteLoop && slider.active.last) { return; }
                var pagerIndex = parseInt(slider.active.index) + 1;
                el.goToSlide(pagerIndex, 'next');
            };

            /**
             * Transitions to the prev slide in the show
             */
            el.goToPrevSlide = function () {
                // if infiniteLoop is false and last page is showing, disregard call
                if (!slider.settings.infiniteLoop && slider.active.index === 0) { return; }
                var pagerIndex = parseInt(slider.active.index) - 1;
                el.goToSlide(pagerIndex, 'prev');
            };

            /**
             * Starts the auto show
             *
             * @param preventControlUpdate (boolean)
             *  - if true, auto controls state will not be updated
             */
            el.startAuto = function (preventControlUpdate) {
                // if an interval already exists, disregard call
                if (slider.interval) { return; }
                // create an interval
                slider.interval = setInterval(function () {
                    if (slider.settings.autoDirection === 'next') {
                        el.goToNextSlide();
                    } else {
                        el.goToPrevSlide();
                    }
                }, slider.settings.pause);
                // if auto controls are displayed and preventControlUpdate is not true
                if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('stop'); }
            };

            /**
             * Stops the auto show
             *
             * @param preventControlUpdate (boolean)
             *  - if true, auto controls state will not be updated
             */
            el.stopAuto = function (preventControlUpdate) {
                // if no interval exists, disregard call
                if (!slider.interval) { return; }
                // clear the interval
                clearInterval(slider.interval);
                slider.interval = null;
                // if auto controls are displayed and preventControlUpdate is not true
                if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('start'); }
            };

            /**
             * Returns current slide index (zero-based)
             */
            el.getCurrentSlide = function () {
                return slider.active.index;
            };

            /**
             * Returns current slide element
             */
            el.getCurrentSlideElement = function () {
                return slider.children.eq(slider.active.index);
            };

            /**
             * Returns a slide element
             * @param index (int)
             *  - The index (zero-based) of the element you want returned.
             */
            el.getSlideElement = function (index) {
                return slider.children.eq(index);
            };

            /**
             * Returns number of slides in show
             */
            el.getSlideCount = function () {
                return slider.children.length;
            };

            /**
             * Return slider.working variable
             */
            el.isWorking = function () {
                return slider.working;
            };

            /**
             * Update all dynamic slider elements
             */
            el.redrawSlider = function () {
                // resize all children in ratio to new screen size
                slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
                // adjust the height
                slider.viewport.css('height', getViewportHeight());
                // update the slide position
                if (!slider.settings.ticker) { setSlidePosition(); }
                // if active.last was true before the screen resize, we want
                // to keep it last no matter what screen size we end on
                if (slider.active.last) { slider.active.index = getPagerQty() - 1; }
                // if the active index (page) no longer exists due to the resize, simply set the index as last
                if (slider.active.index >= getPagerQty()) { slider.active.last = true; }
                // if a pager is being displayed and a custom pager is not being used, update it
                if (slider.settings.pager && !slider.settings.pagerCustom) {
                    populatePager();
                    updatePagerActive(slider.active.index);
                }
                if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
            };

            /**
             * Destroy the current instance of the slider (revert everything back to original state)
             */
            el.destroySlider = function () {
                // don't do anything if slider has already been destroyed
                if (!slider.initialized) { return; }
                slider.initialized = false;
                $('.bx-clone', this).remove();
                slider.children.each(function () {
                    if ($(this).data('origStyle') !== undefined) {
                        $(this).attr('style', $(this).data('origStyle'));
                    } else {
                        $(this).removeAttr('style');
                    }
                });
                if ($(this).data('origStyle') !== undefined) {
                    this.attr('style', $(this).data('origStyle'));
                } else {
                    $(this).removeAttr('style');
                }
                $(this).unwrap().unwrap();
                if (slider.controls.el) { slider.controls.el.remove(); }
                if (slider.controls.next) { slider.controls.next.remove(); }
                if (slider.controls.prev) { slider.controls.prev.remove(); }
                if (slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom) { slider.pagerEl.remove(); }
                $('.bx-caption', this).remove();
                if (slider.controls.autoEl) { slider.controls.autoEl.remove(); }
                clearInterval(slider.interval);
                if (slider.settings.responsive) { $(window).unbind('resize', resizeWindow); }
                if (slider.settings.keyboardEnabled) { $(document).unbind('keydown', keyPress); }
                //remove self reference in data
                $(this).removeData('bxSlider');
            };

            /**
             * Reload the slider (revert all DOM changes, and re-initialize)
             */
            el.reloadSlider = function (settings) {
                if (settings !== undefined) { options = settings; }
                el.destroySlider();
                init();
                //store reference to self in order to access public functions later
                $(el).data('bxSlider', this);
            };

            init();

            $(el).data('bxSlider', this);

            // returns the current jQuery object
            return this;
        };

    })(jQuery);

    init_validation();
    var $slideHover = function () {
        $('.offer-slider-i').on({
            mouseenter: function () {
                $(this).find('.offer-slider-overlay').fadeIn(170);
                $(this).find('.offer-slider-btn').animate({ top: "50%" }, 170);
            },
            mouseleave: function () {
                $(this).find('.offer-slider-overlay').fadeOut(170);
                $(this).find('.offer-slider-btn').css('top', '-200px');
            }
        }, $(this));
    }


    var header_a = $('.header-a');
    var header_b = $('.header-b');
    var header_logo = $('.header-logo');
    var header_right = $('.header-right');


    var $headerDown = function () {
        header_a.slideUp(120);
        header_b.css('height', '59px');
        header_b.addClass('fixed');
        header_logo.css('margin-top', '10px')
        header_right.css('margin-top', '21px');
        header_logo.find('img').attr('src', 'img/logo-a.png');

    }
    var $headerUp = function () {
        header_a.slideDown(150);
        header_b.removeClass('fixed');
        header_b.css('height', '89px');
        header_logo.css('margin-top', '26px');
        header_right.css('margin-top', '37px');
        header_logo.find('img').attr('src', 'img/logo.png');
    }

    $(window).scroll(function () {
        var $scrollTop = $(window).scrollTop();
        if ($scrollTop > 140) {
            $headerDown();
        } else {
            $headerUp();
        }
    });

    $('.mobile-menu a.has-child').on('click', function () {
        if ($(this).is('.open')) {
            $(this).removeClass('open');
            $(this).closest('li').find('ul').slideUp();
        } else {
            $('.mobile-menu li ul').slideUp();
            $('.mobile-menu li a').removeClass('open');
            $(this).addClass('open');
            $(this).closest('li').find('ul').slideDown();
        }


        return false;
    });

    $('.menu-btn').on('click', function () {
        var mobile_menu = $('.mobile-menu');
        if ($(this).is('.open')) {
            $(this).removeClass('open')
            mobile_menu.slideUp();
        } else {
            $(this).addClass('open')
            mobile_menu.slideDown();
        }
        return false;

    });


    $('.header-nav ul li').on({
        mouseenter: function () {
            $(this).find('ul').show();
        },
        mouseleave: function () {
            $(this).find('ul').hide();
        }
    });



    $('.header-lang').on({
        mouseenter: function () {
            $(this).find('.langs-drop').fadeIn(300);
        },
        mouseleave: function () {
            $(this).find('.langs-drop').fadeOut(300);
        }
        // click: function () {
        //     if($('.langs-drop')[0].style.display !== "block"){
        //         $('.langs-drop').hide();                
        //     }else{
        //         $('.langs-drop').show();
        //     }            
        // },
        // mouseout: function () {
        //     $('.langs-drop').hide();
        // }
    });

    // document.onclick = function(){
    //     if($('.langs-drop')[0].style.display !== "none"){
    //         $('.langs-drop').hide();
    //     }
    // }

    $('.header-viewed').on({
        mouseenter: function () {
            $('.viewed-drop').fadeIn();
        },
        mouseleave: function () {
            $('.viewed-drop').hide();
        }
    });

    $('.header-curency').on({
        mouseenter: function () {
            $('.curency-drop').fadeIn();
        },
        mouseleave: function () {
            $('.curency-drop').hide();
        }
    });

    $('.header-account').on({
        mouseenter: function () {
            $('.account-drop').fadeIn();
        },
        mouseleave: function () {
            $('.account-drop').hide();
        }
    });

    $('.flight-line .flight-line-b b').on('click', function () {
        if ($(this).is('.open')) {
            $(this).removeClass('open');
            $(this).closest('.flight-line').find('.flight-details').slideUp();
        } else {
            $(this).addClass('open');
            $(this).closest('.flight-line').find('.flight-details').slideDown();
        }
    });
    $('.alt-flight .flight-line-b b').on('click', function () {
        if ($(this).is('.open')) {
            $(this).removeClass('open');
            $(this).closest('.alt-flight').find('.alt-details').slideUp();
        } else {
            $(this).addClass('open');
            $(this).closest('.alt-flight').find('.alt-details').slideDown();
        }
    });
    $('.hdr-srch-btn').on('click', function () {
        $('.hdr-srch-overlay').fadeIn().find('input:text').focus();
        return false;
    });
    $('.srch-close').on('click', function () {
        $('.hdr-srch-overlay').fadeOut();
        return false;
    });

    // $('.srch-lbl').on('click', function () {
    //     if ($(this).is('.open')) {
    //         $(this).closest('.search-tab-content').find('.search-asvanced').hide();
    //         $(this).text('Advanced Search options').removeClass('open');
    //     } else {

    //         $(this).closest('.search-tab-content').find('.search-asvanced').fadeIn();
    //         $(this).text('close search options').addClass('open');

    //     }
    // });

    $('.search-tab').on('click', function () {
        var $index = $(this).index();
        $('.search-tab-content').hide().eq($index).fadeIn();
        $('.search-tab').removeClass('active').eq($index).addClass('active');
        return false;
    });

    $('.header-account a').on('click', function () {
        $('.overlay').fadeIn(function () {
            $('.autorize-popup').animate({ top: '50%' }, 300).find('input:text').eq('0').focus();
        });
        return false;
    });

    $('.overlay').on('click', function () {
        $('.autorize-popup').animate({ top: '-300px' }, 300, function () {
            $('.overlay').fadeOut();
        });
    });


    $('.autorize-tab-content').eq('0').css('display', 'block');
    $('.autorize-tabs a').on('click', function () {
        if ($(this).is('.autorize-close')) {
            $('.autorize-popup').animate({ top: '-300px' }, 300, function () {
                $('.overlay').fadeOut();
            });
        }
        // else {
        // 	var $index = $(this).index();
        // 	$('.autorize-tabs a').removeClass('current').eq($index).addClass('current');
        // 	$('.autorize-tab-content').hide().eq($index).fadeIn().find('input:text').eq('0').focus();
        // }
        return false;
    });

    $('.update-form a').on('click', function () {
        $('.overlay2').fadeIn(function () {
            $('.update-form-popup').animate({ top: '50%' }, 300).find('input:text').eq('0').focus();
        });
        return false;
    });

    $('.overlay2').on('click', function () {
        $('.update-form-popup').animate({ top: '-300px' }, 300, function () {
            $('.overlay2').fadeOut();
        });
    });

    $('.update-tab-content').eq('0').css('display', 'block');
    $('.update-tabs a').on('click', function () {
        if ($(this).is('.update-close')) {
            $('.update-form-popup').animate({ top: '-300px' }, 300, function () {
                $('.overlay2').fadeOut();
            });
        }
        // else {
        // 	var $index = $(this).index();
        // 	$('.autorize-tabs a').removeClass('current').eq($index).addClass('current');
        // 	$('.autorize-tab-content').hide().eq($index).fadeIn().find('input:text').eq('0').focus();
        // }
        return false;
    });

    $('map area').on({
        mouseenter: function () {
            var $id = $(this).attr('id');
            $('.regions-holder .' + $id).css('background-position', 'left -177px');
            $('.regions-nav a.' + $id).addClass('chosen');
        },
        mouseleave: function () {
            var $id = $(this).attr('id');
            $('.regions-holder .' + $id).css('background-position', 'left 0px');
            $('.regions-nav a.' + $id).removeClass('chosen');
        }
    }, $(this));


    $('.regions-nav a').on({
        mouseenter: function () {
            var $id = $(this).attr('class');
            $('.regions-holder .' + $id).css('background-position', 'left -177px');
        },
        mouseleave: function () {
            var $id = $(this).attr('class');
            $('.regions-holder .' + $id).css('background-position', 'left 0px');
        }
    }, $(this));

    // $('.gallery-i a').on('click', function () {
    //     var $href = $(this).attr('href');
    //     var $src = $(this)[0].getElementsByTagName("img")[0].src;
    //     $('.gallery-i').removeClass('active');
    //     $(this).closest('.gallery-i').addClass('active');
    //     $('.tab-gallery-big img')[0].setAttribute('src', $src);
    //     return true;
    // });

    $('.content-tabs-head a').on('click', function () {
        var $index = $(this).closest('li').index();
        $('.content-tabs-head a').removeClass('active');
        $('.content-tabs-head li').eq($index).find('a').addClass('active');
        $('.content-tabs-i').hide().eq($index).fadeIn();
        return false;
    });
    $('.faq-item-a').on('click', function () {
        var $parent = $(this).closest('.faq-item');
        if ($parent.is('.open')) {
            $parent.find('.faq-item-p').hide();
            $('.faq-item').removeClass('open');
        } else {
            $('.faq-item').removeClass('open');
            $('.faq-item-p').hide();
            $parent.addClass('open').find('.faq-item-p').fadeIn();
        }
    });

    $('.h-tab-i a').on('click', function () {
        var $index = $(this).closest('.h-tab-i').index();
        $('.h-tab-i').removeClass('active');
        $('.h-tab-i').eq($index).addClass('active');

        if ($(this).is('.initMap')) {
            $('.tab-map').css('opacity', '0');
            $('#preloader').show();
            $('.tab-item').hide().eq($index).fadeIn(function () {
                // var mylat = '52.569334';
                // var mylong = '13.380216';
                // var mapOptions = {
                //     zoom: 13,
                //     disableDefaultUI: true,
                //     zoomControl: true,
                //     zoomControlOptions: {
                //         style: google.maps.ZoomControlStyle.LARGE,
                //         position: google.maps.ControlPosition.LEFT_CENTER
                //     },
                //     center: new google.maps.LatLng(mylat, mylong), // New York 
                // };
                // var mapElement = document.getElementById('map');
                // var map = new google.maps.Map(mapElement, mapOptions);
                // google.maps.event.addDomListener(window, 'resize', init);
                // google.maps.event.addListenerOnce(map, 'idle', function () {
                //     var place = new google.maps.LatLng(52.569334, 13.380216);
                //     var image = new google.maps.MarkerImage('img/map.png',
                //         new google.maps.Size(19, 29),
                //         new google.maps.Point(0, 0),
                //         new google.maps.Point(0, 32));
                //     var marker = new google.maps.Marker({
                //         map: map,
                //         icon: image,
                //         draggable: false,
                //         animation: google.maps.Animation.DROP,
                //         position: place
                //     });

                $('.tab-map').css('opacity', '1');
                $('#preloader').hide();
                $('.map-contacts').each(function (index) {
                    $(this).delay(141 * index).fadeIn();
                });

                // });
                // google.maps.event.trigger(map, 'resize');
            });
        } else {
            $('.tab-item').hide().eq($index).fadeIn();
        }
        return false;
    });

    $('.tabs-nav a').on('click', function () {
        var $parent = $(this).closest('.tabs-block')
        var $index = $(this).closest('li').index();
        $parent.find('.tabs-nav li a').removeClass('active');
        $parent.find('.tabs-nav li').eq($index).find('a').addClass('active');
        $parent.find('.tabs-content-i').hide().eq($index).fadeIn();
        return false;
    });

    $('.accordeon-a').on('click', function () {
        var $parent = $(this).closest('.accordeon-item');
        $('.accordeon-item').removeClass('open');
        $('.accordeon-b').hide();
        $parent.addClass('open').find('.accordeon-b').fadeIn();
    });

    $('.toggle-trigger').on('click', function () {
        var $parent = $(this).closest('.toggle-i');
        if ($parent.is('.open')) {
            $parent.removeClass('open').find('.toggle-txt').hide();
        } else {
            $parent.addClass('open').find('.toggle-txt').fadeIn();
        }
        return false;
    });

    $('.shareholder span').on('click', function () {
        if ($(this).is('.open')) {
            $('.share-popup').hide();
            $(this).removeClass('open');
        } else {
            $('.share-popup').fadeIn();
            $(this).addClass('open');
        }

        return false;
    });

    $('.payment-tabs a').on('click', function () {
        var $index = $(this).index();
        $('.payment-tab').hide().eq($index).fadeIn();
        $('.payment-tabs a').removeClass('active').eq($index).addClass('active');
        return false;
    });

    $('.solutions-i').on({
        mouseenter: function () {
            $(this).find('.solutions-over').css('background', 'rgba(0,0,0,0.7)');
            $(this).find('.solutions-over-c').hide();
            $(this).find('.solutions-over-d').fadeIn(500);
        },
        mouseleave: function () {
            $(this).find('.solutions-over').css('background', 'rgba(0,0,0,0.5)');
            $(this).find('.solutions-over-d').hide();
            $(this).find('.solutions-over-c').fadeIn(700);
        }
    }, $(this));


    //TODO fix
    $('.date-inpt').datepicker({ dateFormat: 'dd/mm/yy' }).val();
    $('.date-booking-inpt').datepicker({ dateFormat: 'yy-mm-dd', maxDate: '0' });
    $('.date-card-expired-inpt').datepicker({ dateFormat: 'yy-mm-dd', minDate: '0' });

    $('.custom-select').customSelect();

    //     $('.owl-slider').owlCarousel({
    //         items:4, 
    //         autoPlay: 3000,
    //         itemsDesktop : [1120,4], //5 items between 1000px and 901px
    //         itemsDesktopSmall : [900,2], // betweem 900px and 601px
    //         itemsTablet: [620,2], //2 items between 600 and 479
    //         itemsMobile: [479,1], //1 item between 479 and 0
    //         stopOnHover: true
    //     });


    $('#testimonials-slider').bxSlider({
        infiniteLoop: true,
        speed: 600,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        auto: false,
        slideMargin: 0
    });

    $slideHover();

    $(window).on('resize', function () {
        var $width = $(document).width();
        if ($width > 900) {
            $('.mobile-menu').hide();
            $('.menu-btn').removeClass('open');
        }
    });

    var myTopBtn = document.getElementById("scroll-top");

    myTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    var windowScroll = () => {
        if (myTopBtn) {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                myTopBtn.style.display = "block";
            } else {
                myTopBtn.style.display = "none";
            }
        }
    }

    window.onscroll = function () { windowScroll() };
}

const init_validation = (target) => {

    function validate(target) {
        var valid = true;
        $(target).find('.req').each(function () {
            if ($(this).val() === '') {
                valid = false;
                $(this).parent().addClass('errored');
            }
            else {
                $(this).parent().removeClass('errored');
            }
        });
        return valid;
    }

    $('form.w_validation').on('submit', function (e) {
        var valid = validate(this);
        if (!valid) e.preventDefault();
    });

    if (target) { return validate(target); }

    formStyler();

    // Custom Input
    (function ($) {
        $(function () {
            $('input:checkbox,input:radio,.search-engine-range-selection-container input:radio').styler();
        })
    })(jQuery);

    var slider_range = $("#slider-range");
    var ammount_from = $("#ammount-from");
    var ammount_to = $("#ammount-to");


    $(function () {
        slider_range.slider({
            range: true,
            min: 0,
            max: 1500,
            values: [0, 1500],
            slide: function (event, ui) {
                ammount_from.val(ui.values[0] + '$');
                ammount_to.val(ui.values[1] + '$');
            }
        });
        ammount_from.val(slider_range.slider("values", 0) + '$');
        ammount_to.val(slider_range.slider("values", 1) + '$');
    });


    $(".side-time").each(function () {
        var $this = $(this);
        $this.find('.time-range').slider({
            range: true,
            min: 0,
            max: 24,
            values: [3, 20],
            slide: function (event, ui) {
                $this.find(".time-from").text(ui.values[0]);
                $this.find(".time-to").text(ui.values[1]);
            }
        });
        $(this).find(".time-from").text($this.find(".time-range").slider("values", 0));
        $(this).find(".time-to").text($this.find(".time-range").slider("values", 1));
    });

    //Hotel Detail
    $('.review-ranger').each(function () {
        var $this = $(this);
        var $index = $(this).index();
        if ($index == '0') {
            var $val = '3.0'
        } else if ($index == '1') {
            var $val = '3.8'
        } else if ($index == '2') {
            var $val = '2.8'
        } else if ($index == '3') {
            var $val = '4.8'
        } else if ($index == '4') {
            var $val = '4.3'
        } else if ($index == '5') {
            var $val = '5.0'
        }
        $this.find('.slider-range-min').slider({
            range: "min",
            step: 0.1,
            value: $val,
            min: 0.1,
            max: 5.1,
            create: function (event, ui) {
                $this.find('.ui-slider-handle').append('<span class="range-holder"><i></i></span>');
            },
            slide: function (event, ui) {
                $this.find(".range-holder i").text(ui.value);
            }
        });
        $this.find(".range-holder i").text($val);
    });

    $('#reasons-slider').bxSlider({
        infiniteLoop: true,
        speed: 500,
        mode: 'fade',
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        auto: true,
        slideMargin: 0
    });

    $('#gallery').bxSlider({
        infiniteLoop: true,
        speed: 300,
        slideWidth: 108,
        minSlides: 1,
        maxSlides: 6,
        moveSlides: 1,
        auto: false,
        slideMargin: 7
    });
}

export const customCheckBoxInput = () => {
    formStyler();

    $('.checkbox input').styler({
        selectSearch: true
    });
}

export const formStyler = () => {
    //Styler
    (function ($) {

        $.fn.styler = function (_opt) {

            var opt = $.extend({
                idSuffix: '-styler',
                browseText: 'ааБаЗаОб...',
                selectVisibleOptions: 0,
                singleSelectzIndex: '100',
                selectSmartPositioning: true
            }, _opt);

            return this.each(function () {
                var el = $(this);
                var id = '',
                    cl = '',
                    title = '',
                    dataList = '';
                if (el.attr('id') !== undefined && el.attr('id') != '') id = ' id="' + el.attr('id') + opt.idSuffix + '"';
                if (el.attr('class') !== undefined && el.attr('class') != '') cl = ' ' + el.attr('class');
                if (el.attr('title') !== undefined && el.attr('title') != '') title = ' title="' + el.attr('title') + '"';
                var data = el.data();
                for (var i in data) {
                    if (data[i] != '') dataList += ' data-' + i + '="' + data[i] + '"';
                }
                id += dataList;

                // checkbox
                if (el.is(':checkbox')) {
                    el.css({ position: 'absolute', left: -9999 }).each(function () {
                        if (el.next('span.jq-checkbox').length < 1) {
                            var checkbox = $('<span' + id + ' class="jq-checkbox' + cl + '"' + title + ' style="display: inline-block"><span></span></span>');
                            el.after(checkbox);
                            if (el.is(':checked')) checkbox.addClass('checked');
                            if (el.is(':disabled')) checkbox.addClass('disabled');
                            // аКаЛаИаК аНаА аПбаЕаВаДаОбаЕаКаБаОаКб
                            checkbox.click(function () {
                                if (!checkbox.is('.disabled')) {
                                    if (el.is(':checked')) {
                                        el.prop('checked', false);
                                        checkbox.removeClass('checked');
                                        checkbox[0].parentElement.getElementsByTagName("input")[0].removeAttribute("checked");
                                    } else {
                                        el.prop('checked', true);
                                        checkbox.addClass('checked');
                                        checkbox[0].parentElement.getElementsByTagName("input")[0].setAttribute("checked", "");
                                    }
                                    el.change();
                                    return false;
                                } else {
                                    return false;
                                }
                            });
                            // аКаЛаИаК аНаА label
                            el.parent('label').add('label[for="' + el.attr('id') + '"]').click(function (e) {
                                checkbox.click();
                                e.preventDefault();
                            });
                            // аПаЕбаЕаКаЛббаЕаНаИаЕ аПаО Space аИаЛаИ Enter
                            el.change(function () {
                                if (el.is(':checked')) checkbox.addClass('checked');
                                else checkbox.removeClass('checked');
                            })
                                // ббаОаБб аПаЕбаЕаКаЛббаАаЛбб баЕаКаБаОаКб, аКаОбаОббаЙ аНаАбаОаДаИббб аВ баЕаГаЕ label
                                .keydown(function (e) {
                                    if (el.parent('label').length && (e.which === 13 || e.which === 32)) checkbox.click();
                                })
                                .focus(function () {
                                    if (!checkbox.is('.disabled')) checkbox.addClass('focused');
                                })
                                .blur(function () {
                                    checkbox.removeClass('focused');
                                });
                            // аОаБаНаОаВаЛаЕаНаИаЕ аПбаИ аДаИаНаАаМаИбаЕбаКаОаМ аИаЗаМаЕаНаЕаНаИаИ
                            el.on('refresh', function () {
                                if (el.is(':checked')) checkbox.addClass('checked');
                                else checkbox.removeClass('checked');
                                if (el.is(':disabled')) checkbox.addClass('disabled');
                                else checkbox.removeClass('disabled');
                            });
                        }
                    });

                    // radio
                } else if (el.is(':radio')) {
                    el.css({ position: 'absolute', left: -9999 }).each(function () {
                        if (el.next('span.jq-radio').length < 1) {
                            var radio = $('<span' + id + ' class="jq-radio' + cl + '"' + title + ' style="display: inline-block"><span></span></span>');
                            el.after(radio);
                            if (el.is(':checked')) radio.addClass('checked');
                            if (el.is(':disabled')) radio.addClass('disabled');
                            // аКаЛаИаК аНаА аПбаЕаВаДаОбаАаДаИаОаКаНаОаПаКаЕ
                            radio.click(function () {
                                if (!radio.is('.disabled')) {
                                    radio.closest('form').find('input[name="' + el.attr('name') + '"]').prop('checked', false).next().removeClass('checked');
                                    el.prop('checked', true).next().addClass('checked');
                                    el.change();
                                    return false;
                                } else {
                                    return false;
                                }
                            });
                            // аКаЛаИаК аНаА label
                            el.parent('label').add('label[for="' + el.attr('id') + '"]').click(function (e) {
                                radio.click();
                                e.preventDefault();
                            });
                            // аПаЕбаЕаКаЛббаЕаНаИаЕ бббаЕаЛаКаАаМаИ
                            el.change(function () {
                                $('input[name="' + el.attr('name') + '"]').next().removeClass('checked');
                                el.next().addClass('checked');
                            })
                                .focus(function () {
                                    if (!radio.is('.disabled')) radio.addClass('focused');
                                })
                                .blur(function () {
                                    radio.removeClass('focused');
                                });
                            // аОаБаНаОаВаЛаЕаНаИаЕ аПбаИ аДаИаНаАаМаИбаЕбаКаОаМ аИаЗаМаЕаНаЕаНаИаИ
                            el.on('refresh', function () {
                                if (el.is(':checked')) {
                                    $('input[name="' + el.attr('name') + '"]').next().removeClass('checked');
                                    radio.addClass('checked');
                                } else {
                                    radio.removeClass('checked');
                                }
                                if (el.is(':disabled')) radio.addClass('disabled');
                                else radio.removeClass('disabled');
                            });
                        }
                    });

                    // file
                } else if (el.is(':file')) {
                    el.css({ position: 'absolute', top: '-50%', right: '-50%', fontSize: '200px', opacity: 0 }).each(function () {
                        if (el.parent('span.jq-file').length < 1) {
                            var file = $('<span' + id + ' class="jq-file' + cl + '" style="display: inline-block; position: relative; overflow: hidden"></span>');
                            var name = $('<div class="jq-file__name" style="float: left; white-space: nowrap"></div>').appendTo(file);
                            var browse = $('<div class="jq-file__browse" style="float: left">' + opt.browseText + '</div>').appendTo(file);
                            el.after(file);
                            file.append(el);
                            if (el.is(':disabled')) file.addClass('disabled');
                            el.change(function () {
                                name.text(el.val().replace(/.+[\\\/]/, ''));
                            })
                                .focus(function () {
                                    file.addClass('focused');
                                })
                                .blur(function () {
                                    file.removeClass('focused');
                                })
                                .click(function () {
                                    file.removeClass('focused');
                                })
                                // аОаБаНаОаВаЛаЕаНаИаЕ аПбаИ аДаИаНаАаМаИбаЕбаКаОаМ аИаЗаМаЕаНаЕаНаИаИ
                                .on('refresh', function () {
                                    if (el.is(':disabled')) file.addClass('disabled');
                                    else file.removeClass('disabled');
                                })
                        }
                    });

                    // select
                } else if (el.is('select')) {
                    el.each(function () {
                        if (el.next('span.jqselect').length < 1) {

                            function selectbox() {

                                // аЗаАаПбаЕбаАаЕаМ аПбаОаКбббаКб бббаАаНаИбб аПбаИ аПбаОаКбббаКаЕ баЕаЛаЕаКбаА
                                function preventScrolling(selector) {
                                    selector.unbind('mousewheel DOMMouseScroll').bind('mousewheel DOMMouseScroll', function (e) {
                                        var scrollTo = null;
                                        if (e.type === 'mousewheel') { scrollTo = (e.originalEvent.wheelDelta * -1); }
                                        else if (e.type === 'DOMMouseScroll') { scrollTo = 40 * e.originalEvent.detail; }
                                        if (scrollTo) { e.preventDefault(); $(this).scrollTop(scrollTo + $(this).scrollTop()); }
                                    });
                                }

                                var option = $('option', el);
                                var list = '';

                                function makeList() {
                                    for (var i = 0, len = option.length; i < len; i++) {
                                        var li = '',
                                            liClass = '',
                                            optionClass = '',
                                            optgroupClass = '';
                                        var disabled = 'disabled';
                                        var selDis = 'selected sel disabled';
                                        if (option.eq(i).prop('selected')) liClass = 'selected sel';
                                        if (option.eq(i).is(':disabled')) liClass = disabled;
                                        if (option.eq(i).is(':selected:disabled')) liClass = selDis;
                                        if (option.eq(i).attr('class') !== undefined) optionClass = ' ' + option.eq(i).attr('class');
                                        li = '<li class="' + liClass + optionClass + '">' + option.eq(i).text() + '</li>';
                                        // аЕбаЛаИ аЕббб optgroup
                                        if (option.eq(i).parent().is('optgroup')) {
                                            if (option.eq(i).parent().attr('class') !== undefined) optgroupClass = ' ' + option.eq(i).parent().attr('class');
                                            li = '<li class="' + liClass + optionClass + ' option' + optgroupClass + '">' + option.eq(i).text() + '</li>';
                                            if (option.eq(i).is(':first-child')) {
                                                li = '<li class="optgroup' + optgroupClass + '">' + option.eq(i).parent().attr('label') + '</li>' + li;
                                            }
                                        }
                                        list += li;
                                    }
                                } // end makeList()

                                // аОаДаИаНаОбаНбаЙ баЕаЛаЕаКб
                                function doSelect() {
                                    var selectbox =
                                        $('<span' + id + ' class="jq-selectbox jqselect' + cl + '" style="display: inline-block; position: relative; z-index:' + opt.singleSelectzIndex + '">' +
                                            '<div class="jq-selectbox__select"' + title + '>' +
                                            '<div class="jq-selectbox__select-text"></div>' +
                                            '<div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div>' +
                                            '</div>' +
                                            '</span>');
                                    el.after(selectbox).css({ position: 'absolute', left: -9999 });
                                    var divSelect = $('div.jq-selectbox__select', selectbox);
                                    var divText = $('div.jq-selectbox__select-text', selectbox);
                                    var optionSelected = option.filter(':selected');

                                    // аБаЕбаЕаМ аОаПбаИб аПаО баМаОаЛбаАаНаИб
                                    if (optionSelected.length) {
                                        divText.text(optionSelected.text());
                                    } else {
                                        divText.text(option.first().text());
                                    }

                                    // аЕбаЛаИ баЕаЛаЕаКб аНаЕаАаКбаИаВаНбаЙ
                                    if (el.is(':disabled')) {
                                        selectbox.addClass('disabled');

                                        // аЕбаЛаИ баЕаЛаЕаКб аАаКбаИаВаНбаЙ
                                    } else {
                                        makeList();
                                        var dropdown =
                                            $('<div class="jq-selectbox__dropdown" style="position: absolute; overflow: auto; overflow-x: hidden">' +
                                                '<ul style="list-style: none">' + list + '</ul>' +
                                                '</div>');
                                        selectbox.append(dropdown);
                                        var li = $('li', dropdown);
                                        if (li.filter('.selected').length < 1) li.first().addClass('selected sel');
                                        var selectHeight = selectbox.outerHeight();
                                        if (dropdown.css('left') === 'auto') dropdown.css({ left: 0 });
                                        if (dropdown.css('top') === 'auto') dropdown.css({ top: selectHeight });
                                        var liHeight = li.outerHeight();
                                        var position = dropdown.css('top');
                                        dropdown.hide();

                                        // аПбаИ аКаЛаИаКаЕ аНаА аПбаЕаВаДаОбаЕаЛаЕаКбаЕ
                                        divSelect.click(function () {
                                            el.focus();

                                            // баМаНаОаЕ аПаОаЗаИбаИаОаНаИбаОаВаАаНаИаЕ
                                            if (opt.selectSmartPositioning) {
                                                var win = $(window);
                                                var topOffset = selectbox.offset().top;
                                                var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
                                                var visible = opt.selectVisibleOptions;
                                                var minHeight = liHeight * 6;
                                                var newHeight = liHeight * visible;
                                                if (visible > 0 && visible < 6) minHeight = newHeight;
                                                // баАбаКбббаИаЕ аВаВаЕбб
                                                if (bottomOffset < 0 || bottomOffset < minHeight) {
                                                    dropdown.height('auto').css({ top: 'auto', bottom: position });
                                                    if (dropdown.outerHeight() > topOffset - win.scrollTop() - 20) {
                                                        dropdown.height(Math.floor((topOffset - win.scrollTop() - 20) / liHeight) * liHeight);
                                                        if (visible > 0 && visible < 6) {
                                                            if (dropdown.height() > minHeight) dropdown.height(minHeight);
                                                        } else if (visible > 6) {
                                                            if (dropdown.height() > newHeight) dropdown.height(newHeight);
                                                        }
                                                    }
                                                    // баАбаКбббаИаЕ аВаНаИаЗ
                                                } else if (bottomOffset > minHeight) {
                                                    dropdown.height('auto').css({ bottom: 'auto', top: position });
                                                    if (dropdown.outerHeight() > bottomOffset - 20) {
                                                        dropdown.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
                                                        if (visible > 0 && visible < 6) {
                                                            if (dropdown.height() > minHeight) dropdown.height(minHeight);
                                                        } else if (visible > 6) {
                                                            if (dropdown.height() > newHeight) dropdown.height(newHeight);
                                                        }
                                                    }
                                                }
                                            }

                                            $('span.jqselect').css({ zIndex: (opt.singleSelectzIndex - 1) }).removeClass('focused');
                                            selectbox.css({ zIndex: opt.singleSelectzIndex });
                                            if (dropdown.is(':hidden')) {
                                                $('div.jq-selectbox__dropdown:visible').hide();
                                                dropdown.show();
                                                selectbox.addClass('opened');
                                            } else {
                                                dropdown.hide();
                                                selectbox.removeClass('opened');
                                            }

                                            // аПбаОаКбббаИаВаАаЕаМ аДаО аВбаБбаАаНаНаОаГаО аПбаНаКбаА аПбаИ аОбаКбббаИаИ баПаИбаКаА
                                            if (li.filter('.selected').length) {
                                                dropdown.scrollTop(dropdown.scrollTop() + li.filter('.selected').position().top - dropdown.innerHeight() / 2 + liHeight / 2);
                                            }

                                            preventScrolling(dropdown);
                                            return false;
                                        });

                                        // аПбаИ аНаАаВаЕаДаЕаНаИаИ аКбббаОбаА аНаА аПбаНаКб баПаИбаКаА
                                        li.hover(function () {
                                            $(this).siblings().removeClass('selected');
                                        });
                                        var selectedText = li.filter('.selected').text();

                                        // аПбаИ аКаЛаИаКаЕ аНаА аПбаНаКб баПаИбаКаА
                                        li.filter(':not(.disabled):not(.optgroup)').click(function () {
                                            var t = $(this);
                                            var liText = t.text();
                                            if (selectedText != liText) {
                                                var index = t.index();
                                                if (t.is('.option')) index -= t.prevAll('.optgroup').length;
                                                t.addClass('selected sel').siblings().removeClass('selected sel');
                                                option.prop('selected', false).eq(index).prop('selected', true);
                                                selectedText = liText;
                                                divText.text(liText);
                                                el.change();
                                            }
                                            dropdown.hide();
                                        });
                                        dropdown.mouseout(function () {
                                            $('li.sel', dropdown).addClass('selected');
                                        });

                                        // аИаЗаМаЕаНаЕаНаИаЕ баЕаЛаЕаКбаА
                                        el.change(function () {
                                            divText.text(option.filter(':selected').text());
                                            li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
                                        })
                                            .focus(function () {
                                                selectbox.addClass('focused');
                                            })
                                            .blur(function () {
                                                selectbox.removeClass('focused');
                                            })
                                            // аПбаОаКбббаКаИ баПаИбаКаА б аКаЛаАаВаИаАбббб
                                            .bind('keydown keyup', function (e) {
                                                divText.text(option.filter(':selected').text());
                                                li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
                                                // аВаВаЕбб, аВаЛаЕаВаО, PageUp
                                                if (e.which === 38 || e.which === 37 || e.which === 33) {
                                                    dropdown.scrollTop(dropdown.scrollTop() + li.filter('.selected').position().top);
                                                }
                                                // аВаНаИаЗ, аВаПбаАаВаО, PageDown
                                                if (e.which === 40 || e.which === 39 || e.which === 34) {
                                                    dropdown.scrollTop(dropdown.scrollTop() + li.filter('.selected').position().top - dropdown.innerHeight() + liHeight);
                                                }
                                                if (e.which === 13) {
                                                    dropdown.hide();
                                                }
                                            });

                                        // аПбббаЕаМ аВбаПаАаДаАббаИаЙ баПаИбаОаК аПбаИ аКаЛаИаКаЕ аЗаА аПбаЕаДаЕаЛаАаМаИ баЕаЛаЕаКбаА
                                        $(document).on('click', function (e) {
                                            // e.target.nodeName != 'OPTION' - аДаОаБаАаВаЛаЕаНаО аДаЛб аОаБбаОаДаА аБаАаГаА аВ ааПаЕбаЕ
                                            // (аПбаИ аИаЗаМаЕаНаЕаНаИаИ баЕаЛаЕаКбаА б аКаЛаАаВаИаАбббб ббаАаБаАббаВаАаЕб баОаБббаИаЕ onclick)
                                            if (!$(e.target).parents().hasClass('selectbox') && e.target.nodeName != 'OPTION') {
                                                dropdown.hide().find('li.sel').addClass('selected');
                                                selectbox.removeClass('focused opened');
                                            }
                                        });
                                    }
                                } // end doSelect()

                                // аМбаЛббаИбаЕаЛаЕаКб
                                function doMultipleSelect() {
                                    var selectbox = $('<span' + id + ' class="jq-select-multiple jqselect' + cl + '"' + title + ' style="display: inline-block"></span>');
                                    el.after(selectbox).css({ position: 'absolute', left: -9999 });
                                    makeList();
                                    selectbox.append('<ul style="position: relative">' + list + '</ul>');
                                    var ul = $('ul', selectbox);
                                    var li = $('li', selectbox).attr('unselectable', 'on').css({ '-webkit-user-select': 'none', '-moz-user-select': 'none', '-ms-user-select': 'none', '-o-user-select': 'none', 'user-select': 'none' });
                                    var size = el.attr('size');
                                    var ulHeight = ul.outerHeight();
                                    var liHeight = li.outerHeight();
                                    if (size !== undefined && size > 0) {
                                        ul.css({ 'height': liHeight * size });
                                    } else {
                                        ul.css({ 'height': liHeight * 4 });
                                    }
                                    if (ulHeight > selectbox.height()) {
                                        ul.css('overflowY', 'scroll');
                                        preventScrolling(ul);
                                        // аПбаОаКбббаИаВаАаЕаМ аДаО аВбаБбаАаНаНаОаГаО аПбаНаКбаА
                                        if (li.filter('.selected').length) {
                                            ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
                                        }
                                    }
                                    if (el.is(':disabled')) {
                                        selectbox.addClass('disabled');
                                        option.each(function () {
                                            if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
                                        });
                                    } else {

                                        // аПбаИ аКаЛаИаКаЕ аНаА аПбаНаКб баПаИбаКаА
                                        li.filter(':not(.disabled):not(.optgroup)').click(function (e) {
                                            el.focus();
                                            selectbox.removeClass('focused');
                                            var clkd = $(this);
                                            if (!e.ctrlKey) clkd.addClass('selected');
                                            if (!e.shiftKey) clkd.addClass('first');
                                            if (!e.ctrlKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

                                            // аВбаДаЕаЛаЕаНаИаЕ аПбаНаКбаОаВ аПбаИ аЗаАаЖаАбаОаМ Ctrl
                                            if (e.ctrlKey) {
                                                if (clkd.is('.selected')) clkd.removeClass('selected first');
                                                else clkd.addClass('selected first');
                                                clkd.siblings().removeClass('first');
                                            }

                                            // аВбаДаЕаЛаЕаНаИаЕ аПбаНаКбаОаВ аПбаИ аЗаАаЖаАбаОаМ Shift
                                            if (e.shiftKey) {
                                                var prev = false,
                                                    next = false;
                                                clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
                                                clkd.prevAll().each(function () {
                                                    if ($(this).is('.first')) prev = true;
                                                });
                                                clkd.nextAll().each(function () {
                                                    if ($(this).is('.first')) next = true;
                                                });
                                                if (prev) {
                                                    clkd.prevAll().each(function () {
                                                        if ($(this).is('.selected')) return false;
                                                        else $(this).not('.disabled, .optgroup').addClass('selected');
                                                    });
                                                }
                                                if (next) {
                                                    clkd.nextAll().each(function () {
                                                        if ($(this).is('.selected')) return false;
                                                        else $(this).not('.disabled, .optgroup').addClass('selected');
                                                    });
                                                }
                                                if (li.filter('.selected').length === 1) clkd.addClass('first');
                                            }

                                            // аОбаМаЕбаАаЕаМ аВбаБбаАаНаНбаЕ аМбббб
                                            option.prop('selected', false);
                                            li.filter('.selected').each(function () {
                                                var t = $(this);
                                                var index = t.index();
                                                if (t.is('.option')) index -= t.prevAll('.optgroup').length;
                                                option.eq(index).prop('selected', true);
                                            });
                                            el.change();

                                        });

                                        // аОбаМаЕбаАаЕаМ аВбаБбаАаНаНбаЕ б аКаЛаАаВаИаАбббб
                                        option.each(function (i) {
                                            $(this).data('optionIndex', i);
                                        });
                                        el.change(function () {
                                            li.removeClass('selected');
                                            var arrIndexes = [];
                                            option.filter(':selected').each(function () {
                                                arrIndexes.push($(this).data('optionIndex'));
                                            });
                                            li.not('.optgroup').filter(function (i) {
                                                return $.inArray(i, arrIndexes) > -1;
                                            }).addClass('selected');
                                        })
                                            .focus(function () {
                                                selectbox.addClass('focused');
                                            })
                                            .blur(function () {
                                                selectbox.removeClass('focused');
                                            });

                                        // аПбаОаКбббаИаВаАаЕаМ б аКаЛаАаВаИаАбббб
                                        if (ulHeight > selectbox.height()) {
                                            el.keydown(function (e) {
                                                // аВаВаЕбб, аВаЛаЕаВаО, PageUp
                                                if (e.which === 38 || e.which === 37 || e.which === 33) {
                                                    ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
                                                }
                                                // аВаНаИаЗ, аВаПбаАаВаО, PageDown
                                                if (e.which === 40 || e.which === 39 || e.which === 34) {
                                                    ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
                                                }
                                            });
                                        }

                                    }
                                } // end doMultipleSelect()
                                if (el.is('[multiple]')) doMultipleSelect(); else doSelect();
                            } // end selectbox()

                            selectbox();

                            // аОаБаНаОаВаЛаЕаНаИаЕ аПбаИ аДаИаНаАаМаИбаЕбаКаОаМ аИаЗаМаЕаНаЕаНаИаИ
                            el.on('refresh', function () {
                                el.next().remove();
                                selectbox();
                            });
                        }
                    });
                }// end select

            });

        }
    })(jQuery);
}

export const numScroller = () => {
    (function ($) {
        $.fn.scrollzipInit = function () {
            $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
        };
        $.fn.rollerInit = function () {
            var i = 0;
            $('.numscroller').each(function () {
                i++;
                $(this).attr('data-slno', i);
                $(this).addClass("roller-title-number-" + i);
            });
        };
        $.fn.scrollzip = function (options) {
            var settings = $.extend({
                showFunction: null,
                hideFunction: null,
                showShift: 0,
                wholeVisible: false,
                hideShift: 0,
            }, options);
            return this.each(function (i, obj) {
                $(this).addClass('scrollzip');
                if ($.isFunction(settings.showFunction)) {
                    if (
                        !$(this).hasClass('isShown') &&
                        ($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
                        ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
                    ) {
                        $(this).addClass('isShown');
                        settings.showFunction.call(this);
                    }
                }
                if ($.isFunction(settings.hideFunction)) {
                    if (
                        $(this).hasClass('isShown') &&
                        (($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
                            ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
                    ) {
                        $(this).removeClass('isShown');
                        settings.hideFunction.call(this);
                    }
                }
                return this;
            });
        };
        function numberRoller(slno) {
            var min = $('.roller-title-number-' + slno).attr('data-min');
            var max = $('.roller-title-number-' + slno).attr('data-max');
            var timediff = $('.roller-title-number-' + slno).attr('data-delay');
            var increment = $('.roller-title-number-' + slno).attr('data-increment');
            var numdiff = max - min;
            var timeout = (timediff * 1000) / numdiff;
            //if(numinc<10){
            //increment=Math.floor((timediff*1000)/10);
            //}//alert(increment);
            numberRoll(slno, min, max, increment, timeout);

        }
        function numberRoll(slno, min, max, increment, timeout) {//alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
            if (min <= max) {
                $('.roller-title-number-' + slno).html(min);
                min = parseInt(min) + parseInt(increment);
                setTimeout(function () { numberRoll(eval(slno), eval(min), eval(max), eval(increment), eval(timeout)) }, timeout);
            } else {
                $('.roller-title-number-' + slno).html(max);
            }
        }
        // $(window).on("load", function () {
        $(document).scrollzipInit();
        $(document).rollerInit();
        // });
        // $(window).on("load scroll resize", function () {
        $('.numscroller').scrollzip({
            showFunction: function () {
                numberRoller($(this).attr('data-slno'));
            },
            wholeVisible: false,
        });
        // });
    })(jQuery);
}

export const importAll = () => {
    customAppear();
    customSelectInput();
    customSliderInit();
    customOtherTags();
}
