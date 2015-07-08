/**
 * No Swipes v0.0.1
 *  Attach to the wheel event to prevent forward & back swipe gestures.
 *
 * Copyright 2014, Andy Niccolai
 * Licensed under the MIT license.
 *  https://github.com/xadn/no-swipe/blob/master/LICENSE
 */
(function(){
  'use strict';

  function noSwipe(e) {
    var el = e.target;
    var dX = e.deltaX;
    var dY = e.deltaY;
    var computedStyle;
    var overflowY;
    var overflowX;

    // Until top of DOM
    while (el.parentElement !== null) {
      computedStyle = null;

      if (dY !== 0) {
        // Scrolling up
        if (dY < 0) {
          if (el.scrollTop > 0) {
            computedStyle = getComputedStyle(el);
            overflowY = computedStyle.overflowY;
            if (overflowY === 'auto' || overflowY === 'scroll') {
              return true
            }
          }
        // Scrolling down
        } else {
          if (el.scrollHeight - el.clientHeight > el.scrollTop) {
            computedStyle = getComputedStyle(el);
            overflowY = computedStyle.overflowY;
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
            computedStyle = computedStyle || getComputedStyle(el);
            overflowX = computedStyle.overflowX;
            if (overflowX === 'auto' || overflowX === 'scroll') {
              return true
            }
          }
        // Scrolling right
        } else {
          if (el.scrollWidth - el.clientWidth > el.scrollLeft) {
            computedStyle = computedStyle || getComputedStyle(el);
            overflowX = computedStyle.overflowX;
            if (overflowX === 'auto' || overflowX === 'scroll') {
              return true
            }
          }
        }
      }

      el = el.parentElement;
    }

    e.preventDefault();
  }

  window.noSwipe = noSwipe;
})();
