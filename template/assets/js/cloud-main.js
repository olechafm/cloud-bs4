$(document).ready(function(){
    //input on focus
    $("#input-search").on("focus", function() {
        $(".btn-cloud-search").addClass("focus");
    });
    $("#input-search").on("blur", function() {
        $(".btn-cloud-search").removeClass("focus");
    });
    $("#input-search").focus();
    /** ===========================================
     Hide / show the master navigation menu
     ============================================ */
    // console.log('Window Height is: ' + $(window).height());
    // console.log('Document Height is: ' + $(document).height());
    //hide and show nav
    var previousScroll = 0;
    $(window).scroll(function(){

        var currentScroll = $(this).scrollTop();

        /*
         If the current scroll position is greater than 0 (the top) AND the current scroll position is less than the document height minus the window height (the bottom) run the navigation if/else statement.
         */
        if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()){
            /*
             If the current scroll is greater than the previous scroll (i.e we're scrolling down the page), hide the nav.
             */
            if (currentScroll > previousScroll){
                window.setTimeout(hideNav, 100);
                /*
                 Else we are scrolling up (i.e the previous scroll is greater than the current scroll), so show the nav.
                 */
            } else {
                window.setTimeout(showNav, 100);
            }
            /*
             Set the previous scroll value equal to the current scroll.
             */
            previousScroll = currentScroll;
        }

    });
    function hideNav() {
        if($("div.navbar-collapse").hasClass("in")){
            $("[data-nav-status='toggle']").removeClass("is-hidden")
        }
        else{
            $("[data-nav-status='toggle']").addClass("is-hidden")
        }
    }
    function showNav() {
        $("[data-nav-status='toggle']").removeClass("is-hidden");
    }

    var $containerWidth = $(window).width();
    if ($containerWidth <= 767) {
        $('.dropdown-menu').removeClass('submenu');
    }
    if ($containerWidth >= 768) {
        $('.dropdown-menu').addClass('submenu');
    }
    //dropdown
    var dropdown = $('ul.nav li.dropdown');
    dropdown.hover(function() {
        $(this).find('.submenu').stop(true, true).delay(200).fadeIn(300);
    }, function() {
        $(this).find('.submenu').stop(true, true).delay(200).fadeOut(300);
    });
    $(dropdown).on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });
    $(dropdown).on('hide.bs.dropdown', function(e){
        e.preventDefault();
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(400, function(){
            //On Complete, we reset all active dropdown classes and attributes
            //This fixes the visual bug associated with the open class being removed too fast
            $(dropdown).removeClass('open');
            $(dropdown).find('.dropdown-toggle').attr('aria-expanded','false');
        });
    });

    $('a.scrollto').on('click', function (event) {
        // Domyślne zachowanie po kliknięciu
        event.preventDefault();
        $('html, body').stop();
        // Store hash
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 2000, function () {
        // Dodaje (#) do URL kiedy skończy scrollować (default click behavior)
        window.location.hash = "";
        });
        $(".navbar-collapse ul li").on("click", function() {
            $('#navbar').removeClass('in');
            $(".navbar-header button.navbar-toggle").attr("aria-expanded","false");
        });
    });
    //open and close order window
    $(".btn-cloud-cart").on("click", function () {
        $(".checkout-order").toggleClass('active');
    });
    $(".checkout__close").on("click", function () {
        $(".checkout-order").removeClass('active');
    });

    $(".menu-action li:last").on("click", function(e) {
        e.preventDefault();
        $(".checkout__option").on("click", function() {
            window.open("../order_cart.html", "_self");
        });
        return false;
    });

    //Parallaxa init
    // var parallaxa = null;
    // if(parallaxa = document.getElementById('parallaxa')){
    //     var parallax = new Parallax(parallaxa, {
    //         calibrateX: 25,
    //         calibrateY: 15,
    //         invertX: true,
    //         invertY: true,
    //         limitX: false,
    //         limitY: false,
    //         scalarX: 15,
    //         scalarY: 5,
    //         frictionX: 0.2,
    //         frictionY: 0.8,
    //         originX: 0.5,
    //         originY: 1.0
    //     });
    // }

    //box counter start on screen entry
    $('.box-number').viewportChecker({
        callbackFunction: function(elem){
            $('.box-number .count').each(function () {
                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2500,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        }
    });
    //owl carousel
    $('.owl-carousel').owlCarousel({
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        smartSpeed: 650,
        responsive: {
            0: {
                items: 1,
                loop: true,
                dots: false
            },
            375: {
                items: 2,
                loop: true,
                dots: false
            },
            600: {
                items: 3,
                nav: false,
                loop: true
            },
            1000: {
                items : 7,
                loop: true
            }
        }
    });
    $('.play').on('click',function(){
        owl.trigger('autoplay.play.owl',[1000])
    });
    $('.stop').on('click',function(){
        owl.trigger('autoplay.stop.owl')
    });
    //hover change content tab
    var platformLink = $('.links li', "#technology");
    platformLink.on("mouseover",function(){
        platformLink.removeClass("active");
        $(this).addClass("active");
        $("img", "#wrapper-technology").removeClass("in active");
        var getID = $(this).find('a').attr("href");
        $("img"+getID, "#wrapper-technology").addClass("in active");
        return false;
    });
    //add class to input-wrapper
    $(".form-control").focus(function () {
        $(this).closest(".input-wrapper").addClass("active");
    }).blur(function () {
        $(this).closest(".input-wrapper").removeClass("active");
    });
    //tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            template: '<div class="tooltip text-shadow"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        })
    });
    //show and hide order summary promo code
    $(".order-summary-discount-link").on("click", function () {
        $('.order-summary-discount-content').slideToggle('fast') ;
    });
});