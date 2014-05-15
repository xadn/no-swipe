/**
 * Stop Swipes v0.0.1
 *  A jQuery Plugin that prevents forward/back swipe gestures.
 *
 * Intended for use with the latest jQuery
 *  http://code.jquery.com/jquery-latest.js
 *
 * Copyright 2014, Andy Niccolai
 * Licensed under the MIT license.
 *  https://github.com/xadn/jquery-stopswipes/blob/master/LICENSE
 */
(function(global, doc, namespace, $){
  'use strict';

  var MOUSEWHEEL = 'mousewheel';

  function eventWillScroll($el, dX, dY) {
    var el = $el[0];

    // Until top of DOM
    while (el.parentElement !== null) {
      if (dY !== 0) {
        // Scrolling up
        if (dY > 0) {
          if (el.scrollTop > 0) {
            var overflowY = $(el).css('overflow-y');
            if (overflowY === 'auto' || overflowY === 'scroll') {
              return true
            }
          }
        // Scrolling down
        } else {
          if (el.scrollHeight - el.clientHeight > el.scrollTop) {
            var overflowY = $(el).css('overflow-y');
            if (overflowY === 'auto' || overflowY === 'scroll') {
              return true
            }
          }
        }
      }

      if (dX !== 0) {
        // Scrolling left
        if (dX < 0) {
          if (el.scrollLeft > 0) {
            var overflowX = $(el).css('overflow-x');
            if (overflowX === 'auto' || overflowX === 'scroll') {
              return true
            }
          }
        // Scrolling right
        } else {
          if (el.scrollWidth - el.clientWidth > el.scrollLeft) {
            var overflowX = $(el).css('overflow-x');
            if (overflowX === 'auto' || overflowX === 'scroll') {
              return true
            }
          }
        }
      }

      el = el.parentElement;
    }

    return false;
  }

  function stopSwipes(e) {
    if (!eventWillScroll($(e.target), e.deltaX, e.deltaY)) {
      e.preventDefault();
    }
  };

  function detachListener(delegate) {
    if (delegate === void 0) {
      return $(this).off(MOUSEWHEEL, stopSwipes);
    } else {
      return $(this).off(MOUSEWHEEL, delegate, stopSwipes);
    }
  }

  function attachListener(delegate) {
    detachListener(delegate);
    if (delegate === void 0) {
      return $(this).on(MOUSEWHEEL, stopSwipes);
    } else {
      return $(this).on(MOUSEWHEEL, delegate, stopSwipes);
    }
  }

  // Extend jQuery's prototype to expose the plug-in.
  $.extend(namespace, {
    allowSwipes: detachListener,
    stopSwipes: attachListener
  });

})(window, document, jQuery.fn, jQuery);
