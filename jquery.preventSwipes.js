/**
 * PreventSwipes v0.0.1
 *  A jQuery Plugin that prevents forward/back swipe gestures.
 *
 * Intended for use with the latest jQuery
 *  http://code.jquery.com/jquery-latest.js
 *  
 * Copyright 2013, Andy Niccolai
 * Licensed under the MIT license.
 *  https://github.com/x-andy/jquery-prevent-swipes/blob/master/LICENSE
 *
 * Date: Tuesday, December 24th 2013
 */
(function(global, doc, namespace, $){
  'use strict';

  var MOUSEWHEEL = 'mousewheel';

  function isTopOfDom(el) {
    return el.parentElement === null;
  }

  function isWideEnoughToScroll(el) {
    return el.scrollWidth > el.clientWidth;
  }

  function isScrollableLeft($el, dX) {
    return dX < 0 && $el.scrollLeft() > 0;
  }

  function isScrollableRight($el, el, dX) {
    return dX > 0 && $el.scrollLeft() < (el.scrollWidth - el.clientWidth);
  }

  function isHighEnoughToScroll(el) {
    return el.scrollHeight > el.clientHeight;
  }

  function isScrollableUp($el, dY) {
    return dY > 0 && $el.scrollTop() > 0;
  }

  function isScrollableDown($el, el, dY) {
    return dY < 0 && $el.scrollTop() < (el.scrollHeight - el.clientHeight);
  }

  function isScrollEnabled($el, axis) {
    var prop = 'overflow-' + axis;
    return $el.css(prop) === 'auto' || $el.css(prop) === 'scroll';
  }

  // Recursively search up the DOM for an element that will scroll
  function eventWillScroll($el, dX, dY) {
    var el = $el.get(0);

    if (isTopOfDom(el)) {
      return false;
    } else {
      return(
        (isWideEnoughToScroll(el) && (isScrollableLeft($el, dX) || isScrollableRight($el, el, dX)) && isScrollEnabled($el, 'x'))
        || 
        (isHighEnoughToScroll(el) && (isScrollableUp($el, dY) || isScrollableDown($el, el, dY)) && isScrollEnabled($el, 'y'))
        ||
        eventWillScroll($el.parent(), dX, dY)
      );
    }
  }

  function preventSwipes(e) {
    if (!eventWillScroll($(e.target), e.deltaX, e.deltaY)) {
      e.preventDefault();
    }
  };

  function detachListener(delegate) {
    return $(this).each(function() {
      if (delegate === void 0) {
        $(this).off(MOUSEWHEEL, preventSwipes);
      } else {
        $(this).off(MOUSEWHEEL, delegate, preventSwipes);
      }
    });
  }

  function attachListener(delegate) {
    return $(this).each(function() {
      detachListener(delegate);
      if (delegate === void 0) {
        $(this).on(MOUSEWHEEL, preventSwipes);
      } else {
        $(this).on(MOUSEWHEEL, delegate, preventSwipes);
      }
    });
  }

  // Extend jQuery's prototype to expose the plug-in.
  $.extend(namespace, {
    allowSwipes: detachListener,
    preventSwipes: attachListener
  });

})(window, document, jQuery.fn, jQuery);
