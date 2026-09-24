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

// Close the mobile menu when a normal link is tapped
  $('#site-navigation3 ul li:not(.menu-item-96):not(.menu-item-97) a').on('click', function () {
    $('#toggle').click();
  });

  /*****************************Mobile Menu*******************************/

  const $nav = $('#site-navigation3');
  const navEl = $nav[0];
  if (!navEl) return;

  // =====================================================
  // CLEAN UP PREVIOUS BINDINGS (safe if script runs twice)
  // =====================================================
  $nav.off('.mobileMenu');

  if (navEl._menuCapture) {
    window.removeEventListener('click', navEl._menuCapture.click, true);
    ['mousedown', 'pointerdown', 'touchstart'].forEach(function (evt) {
      window.removeEventListener(evt, navEl._menuCapture.other, true);
    });
  }

  // =====================================================
  // HELPERS
  // =====================================================
  function closeAll() {
    $nav.removeClass('submenu-open');
    $nav.find('li.is-open').removeClass('is-open');
  }

  // Level 0: open the submenu overlay (same result as tapping the text)
  function openPanel($item) {
    $item.siblings('li').removeClass('is-open');
    $item.addClass('is-open');
    $nav.addClass('submenu-open');
  }

  // Level 1: expand / collapse the third level in place
  function toggleAccordion($item) {
    const wasOpen = $item.hasClass('is-open');
    $item.siblings('li').removeClass('is-open');
    $item.toggleClass('is-open', !wasOpen);
  }

  // An item has a submenu if it actually contains a <ul>.
  // We no longer depend on the "has-children" class being present,
  // because Case Studies (a parent that also has its own page) was
  // not being picked up by it.
  function hasSub($li) {
    return $li.children('ul').length > 0;
  }

  // Tap position for mouse, pointer and touch events
  function getX(e) {
    if (typeof e.clientX === 'number') return e.clientX;
    if (e.touches && e.touches[0]) return e.touches[0].clientX;
    return null;
  }

  // Returns the <li> if this event hit a chevron/arrow, else null
  function getChevronItem(e) {
    if (!e.target || !e.target.closest || !navEl.contains(e.target)) {
      return null;
    }

    // Real .chevron element
    const chev = e.target.closest('.chevron');
    if (chev) {
      const $li = $(chev).closest('li');
      if ($li.length && hasSub($li)) return $li;
    }

    // Arrow drawn as a pseudo-element: hit-test the right edge of the row
    const a = e.target.closest('ul.menu-level-0 > li > a, ul.menu-level-1 > li > a');
    if (!a) return null;

    const $li = $(a).parent();
    if (!hasSub($li)) return null;

    const x = getX(e);
    if (x === null) return null;

    // Use the LI's full width, not the link's width.
    const ZONE = 60;
    return x >= $li[0].getBoundingClientRect().right - ZONE ? $li : null;
  }

  // =====================================================
  // CREATE BACK BUTTON
  // =====================================================
  if (!$nav.find('.submenu-back').length) {
    $nav.prepend(`
            <button type="button" class="submenu-back" aria-label="Back">
                <span class="back-icon"></span>
                <span class="back-text">Back</span>
            </button>
        `);
  }

  // =====================================================
  // CHEVRON (CAPTURE PHASE, RUNS BEFORE EVERYTHING ELSE)
  // =====================================================
  function onChevronClick(e) {
    const $item = getChevronItem(e);
    if (!$item) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if ($item.parent().hasClass('menu-level-0')) {
      openPanel($item);          // Who We Are / What We Do / Case Studies
    } else {
      toggleAccordion($item);    // level-1 accordion
    }
  }

  function onChevronOther(e) {
    if (getChevronItem(e)) {
      e.stopPropagation();
    }
  }

  navEl._menuCapture = { click: onChevronClick, other: onChevronOther };

  window.addEventListener('click', onChevronClick, true);
  ['mousedown', 'pointerdown', 'touchstart'].forEach(function (evt) {
    window.addEventListener(evt, onChevronOther, true);
  });

  // =====================================================
  // FIRST LEVEL TEXT CLICK
  // Who We Are / What We Do: text opens the submenu.
  // Case Studies (menu-item-95): text is a normal link to its own page,
  // so it is left alone here and only its arrow opens the submenu.
  // =====================================================
  $nav.on('click.mobileMenu', 'ul.menu-level-0 > li:not(.menu-item-95) > a', function (e) {
    const $item = $(this).parent();
    if (!hasSub($item)) return;   // plain link, let it navigate

    e.preventDefault();
    e.stopImmediatePropagation();
    openPanel($item);
    return false;
  });

  // =====================================================
  // SECOND LEVEL LINK CLICK (text navigates normally)
  // =====================================================
  $nav.on('click.mobileMenu', 'ul.menu-level-1 > li > a', function () {
    closeAll();
  });

  // =====================================================
  // THIRD LEVEL LINKS
  // =====================================================
  $nav.on('click.mobileMenu', 'ul.menu-level-2 a', function () {
    closeAll();
  });

  // =====================================================
  // BACK BUTTON
  // =====================================================
  $nav.on('click.mobileMenu', '.submenu-back', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    closeAll();
    return false;
  });

  /***************************** Form Modal *******************************/

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
  $('#form-modal h2 svg').click(function () {
    $('#form-modal').removeClass('open');
    $('html').removeClass('hidden');
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('#form-modal').removeClass('open');
      $('html').removeClass('hidden');
    }
  });

  /***************************** AOS Animation *******************************/
  AOS.init({
    startEvent: 'DOMContentLoaded',
    duration: 800,
    easing: 'ease-in-quad',
    disable: 'mobile',
    once: true
  });

  AOS.refresh();

  window.addEventListener('pageshow', function () {
    setTimeout(() => {
      window.scrollBy(0, 1); // Nudge scroll to trigger observers
      window.scrollBy(0, -1);
      AOS.refreshHard();
    }, 50);
  });

  $(window).one('scroll', function () {
    AOS.refresh();
  });

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }


  /***************************** Smooth Scroll *******************************/
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



  /***************************** Our Credentials SLider *******************************/
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

  //testimonial SLider
  $('.main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  });
  $('.slider-nav').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.main-slider',
    dots: false,
    prevArrow: $('.prevArrow'),
    nextArrow: $('.nextArrow'),
    fade: true,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  });

  /***************************** Number Animation *******************************/

  function buildNumber($wrap) {
    var value = String($wrap.attr('data-number') || '').trim();
    if (!value || $wrap.children().length) {
      return;
    }
    $.each(value.split(''), function (index, char) {
      // NUMBER
      if (/\d/.test(char)) {
        var target = parseInt(char, 10);
        var $box = $('<div>', {
          class: 'statistics-number-box ' +
            (index % 2 === 0 ? 'upper' : 'lower')
        });
        var $track = $('<div>', {
          class: 'number-track'
        });
        // Create numbers from 0 to target
        for (var i = 0; i <= target; i++) {
          $('<div>', {
            class: 'heading-02 h2 number charcol',
            text: i
          }).appendTo($track);
        }
        $track.appendTo($box);
        $box.appendTo($wrap);
      }

      // STATIC CHARACTERS: + K /
      else {
        $('<div>', {
          class: 'heading-02 h2 number charcol static-character',
          text: char
        }).appendTo($wrap);
      }
    });
  }


  function prepareNumberBox($box) {
    var $track = $box.find('.number-track');
    if (!$track.length) {
      return;
    }
    var isLower = $box.hasClass('lower');
    $track.css({
      display: 'flex',
      flexDirection: isLower ? 'column-reverse' : 'column'
    });
    var digitHeight =
      $track.children().first().outerHeight();
    if (!digitHeight) {
      return;
    }
    $box.css({
      height: digitHeight + 'px',
      overflow: 'hidden'
    });
    var count = $track.children().length;
    var startY = isLower
      ? -(count - 1) * digitHeight
      : 0;
    var endY = isLower
      ? 0
      : -(count - 1) * digitHeight;
    // Initial position
    $track.css(
      'transform',
      'translateY(' + startY + 'px)'
    );
    // Save final position
    $track.attr('data-target-y', endY);
  }
  function animateNumber($wrap) {
    $wrap.find('.statistics-number-box').each(function (index) {
      var $box = $(this);
      var $track = $box.find('.number-track');
      if (!$track.length) {
        return;
      }
      var targetY =
        $track.attr('data-target-y');
      $track.css({
        transition:
          'transform 1.3s cubic-bezier(0.15, 1, 0.25, 1)',
        transitionDelay:
          (index * 90) + 'ms'
      });
      requestAnimationFrame(function () {
        $track.css(
          'transform',
          'translateY(' + targetY + 'px)'
        );
      });
    });
  }
  // BUILD ALL NUMBERS
  $('.statistics-number-wrap-2').each(function () {
    buildNumber($(this));
  });
  // PREPARE ALL NUMBER BOXES
  $('.statistics-number-box').each(function () {
    prepareNumberBox($(this));
  });
  // ANIMATE ON SCROLL
  if ('IntersectionObserver' in window) {
    var numberObserver = new IntersectionObserver(
      function (entries) {
        $.each(entries, function (index, entry) {
          if (entry.isIntersecting) {
            animateNumber($(entry.target));
            numberObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4
      }
    );
    $('.statistics-number-wrap-2').each(function () {
      numberObserver.observe(this);
    });
  }
  /***************************** FAQ *******************************/
function initFaqAccordion(sectionSelector, openFirst = false) {
  var $section = $(sectionSelector);

  if (!$section.length) {
    return;
  }

  var $faqButtons = $section.find('.faq-button');

  if (!$faqButtons.length) {
    return;
  }

  // Hide all answers initially
  $faqButtons
    .removeClass('is-active')
    .find('.faq-answer')
    .hide();

  // Open first item only when requested
  if (openFirst) {
    $faqButtons
      .first()
      .addClass('is-active')
      .find('.faq-answer')
      .show();
  }

  // FAQ click
  $faqButtons.on('click', function () {
    var $current = $(this);

    // Close other FAQ items
    $faqButtons
      .not($current)
      .removeClass('is-active')
      .find('.faq-answer')
      .stop(true, true)
      .slideUp();

    // Toggle current item
    $current
      .toggleClass('is-active')
      .find('.faq-answer')
      .stop(true, true)
      .slideToggle();
  });
}

initFaqAccordion('.expect-section', true);
initFaqAccordion('.faq-list', false);

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
