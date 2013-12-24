/**
 * PreventSwipes v1
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

  // Recursively search for a scrollable element
  function anyElementScrollable($el, dX, dY) {
    var el = $el.get(0);

    // Base case: we got to the top of the DOM without finding anything scrollable
    if (el === doc.body) {
      return false;
    } else {
      return(
        // Can we scroll in the x-direction?
        (
          // Is the element actually wide enough to be scrolled?
          el.scrollWidth > el.clientWidth
          && (
              // Is there room to scroll left?
              (dX < 0 && $el.scrollLeft() > 0)

              // Is there room to scroll right?
            ||(dX > 0 && $el.scrollLeft() < (el.scrollWidth - el.clientWidth))
          )

          // Is scroll even enabled for this element?
          && ($el.css('overflow-x') === 'auto' || $el.css('overflow-x') === 'scroll')
        )
        || 
        // Can we scroll in the y-direction?
        (
          // Is the element actually tall enough to be scrolled?
          el.scrollHeight > el.clientHeight
          && (
              // Is there room to scroll up?
              (dY > 0 && $el.scrollTop() > 0)

              // Is there room to scroll down?
            ||(dY < 0 && $el.scrollTop() < (el.scrollHeight - el.clientHeight))
          )

          // Is scroll even enabled for this element?
          && ($el.css('overflow-y')  === 'auto' || $el.css('overflow-y') === 'scroll')
        )
        ||
        // Is the parent able to scroll?
        (
          anyElementScrollable($el.parent(), dX, dY)
        )
      );
    }
  }

  function preventSwipes(e) {
    if (!anyElementScrollable($(e.target), e.deltaX, e.deltaY)) {
      e.preventDefault();
    }
  };

  function detachListener(delegate) {
    if (delegate === void 0) {
      $(this).off(MOUSEWHEEL, preventSwipes);
    } else {
      $(this).off(MOUSEWHEEL, delegate, preventSwipes);
    }
  }

  function attachListener(delegate) {
    detachListener(delegate);
    if (delegate === void 0) {
      $(this).on(MOUSEWHEEL, preventSwipes);
    } else {
      $(this).on(MOUSEWHEEL, delegate, preventSwipes);
    }
  }

  // Extend jQuery's prototype to expose the plug-in.
  $.extend(namespace, {
    allowSwipes: detachListener,
    preventSwipes: attachListener
  });

})(window, document, jQuery.fn, jQuery);
