jQuery(document).ready(function ($) {
  fixedHeaderOnScroll();
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('html').toggleClass('hidden');
    if ($('header').hasClass('fixed-header')) {
      $('header').toggleClass('overlay-header');
    }
  });


  // Closes overlay menu after clicking on the menu link
  $('#site-navigation3 ul li a').on("click", function (e) {
    $('#toggle').click();
  });


  //form-modal -- Request a Proposal Button
  $('.modal-trigger').click(function (e) {
    e.preventDefault();
    $('#form-modal').toggleClass('open');
    $('html').toggleClass('hidden');
  });
$('#form-modal').click(function (e) {
    if ($(e.target).is('#form-modal')) {
        $('#form-modal').removeClass('open');
        $('html').removeClass('hidden');
    }
});

  // AOS.init({
  //   startEvent: 'DOMContentLoaded',
  //   duration: 1000,
  //   easing: 'ease-in-quad',
  //   disable: 'mobile',
  //   once: true
  // });

  // AOS.refresh();

  //     AOS.init({
  //   startEvent: 'DOMContentLoaded',
  //   duration: 800,
  //   easing: 'ease-in-quad',
  //   disable: 'mobile',
  //   once: true
  // });

  // AOS.refresh();

  // window.addEventListener('pageshow', function () {
  //   setTimeout(() => {
  //     window.scrollBy(0, 1); // Nudge scroll to trigger observers
  //     window.scrollBy(0, -1);
  //     AOS.refreshHard();
  //   }, 50);
  // });

  // $(window).one('scroll', function() {
  //   AOS.refresh();
  // });

  // if ('scrollRestoration' in history) {
  //   history.scrollRestoration = 'manual';
  // }


  // //*** Smooth Scroll ***
  window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // buffer for fonts/images
      }
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, null, targetId);
      }
    });
  });


  //*** Fixed header ***
  function fixedHeaderOnScroll() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled 
      $('header').addClass('fixed-header');    // Fade in the arrow
    } else {
      $('header').removeClass('fixed-header');   // Else fade out the arrow
    }
  }

  /************************************************
  uncomment follwoing code if window.innerheight is
  included in fixedHeaderOnScroll function.  
  *************************************************/

  $(window).on('load scroll resize', function () {
    fixedHeaderOnScroll();
  });

  $(window).on('load', function () {
    fixedHeaderOnScroll();
  });

  $(window).scroll(function () {
    fixedHeaderOnScroll();
  });


  $(window).resize(function () {
    fixedHeaderOnScroll();
  });


  //*** Scroll to Top *** use with less *** use with html ***
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 600) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
  });

  $('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
      scrollTop: 0                       // Scroll to top of body
    }, 500);
  });//End Scroll to Top



  //Slick SLider
  $('.logo-slider').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    arrows: false,
    swipe: false,
    slidesToShow: 8,
    cssEase: 'linear',
    pauseOnFocus: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 7,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  });
});
