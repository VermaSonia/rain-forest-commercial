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
/****************************************** 
***********stacking cards slider***********
*******************************************/
var StackCards = function (element) {
  this.element = element;
  this.items = this.element.getElementsByClassName('js-stack-cards__item');
  this.scrollingListener = false;
  this.scrolling = false;
  initStackCardsEffect(this);
};

function initStackCardsEffect(element) { // use Intersection Observer to trigger animation
  var observer = new IntersectionObserver(stackCardsCallback.bind(element));
  observer.observe(element.element);
};

function stackCardsCallback(entries) { // Intersection Observer callback
  if (entries[0].isIntersecting) { // cards inside viewport - add scroll listener
    if (this.scrollingListener) return; // listener for scroll event already added
    stackCardsInitEvent(this);
  } else { // cards not inside viewport - remove scroll listener
    if (!this.scrollingListener) return; // listener for scroll event already removed
    window.removeEventListener('scroll', this.scrollingListener);
    this.scrollingListener = false;
  }
};

function stackCardsInitEvent(element) {
  element.scrollingListener = stackCardsScrolling.bind(element);
  window.addEventListener('scroll', element.scrollingListener);
};

function stackCardsScrolling() {
  if (this.scrolling) return;
  this.scrolling = true;
  window.requestAnimationFrame(animateStackCards.bind(this));
};

function animateStackCards() {
  var top = this.element.getBoundingClientRect().top;

  for (var i = 0; i < this.items.length; i++) {
    // cardTop/cardHeight/marginY are the css values for the card top position/height/Y offset
    var scrolling = this.cardTop - top - i * (this.cardHeight + this.marginY);
    if (scrolling > 0) { // card is fixed - we can scale it down
      this.items[i].setAttribute('style', 'transform: translateY(' + this.marginY * i + 'px) scale(' + (this.cardHeight - scrolling * 0.05) / this.cardHeight + ');');
    }
  }

  this.scrolling = false;
};
function osHasReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

var stackCards = document.getElementsByClassName('js-stack-cards'),
  intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
  reducedMotion = osHasReducedMotion();

if (stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) {
  for (var i = 0; i < stackCards.length; i++) {
    new StackCards(stackCards[i]);
  }
}