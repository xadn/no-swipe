function noSwipe(e) {
  'use strict';
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
            return;
          }
        }
      // Scrolling down
      } else {
        if (el.scrollHeight - el.clientHeight > el.scrollTop) {
          computedStyle = getComputedStyle(el);
          overflowY = computedStyle.overflowY;
          if (overflowY === 'auto' || overflowY === 'scroll') {
            return;
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
            return;
          }
        }
      // Scrolling right
      } else {
        if (el.scrollWidth - el.clientWidth > el.scrollLeft) {
          computedStyle = computedStyle || getComputedStyle(el);
          overflowX = computedStyle.overflowX;
          if (overflowX === 'auto' || overflowX === 'scroll') {
            return;
          }
        }
      }
    }

    el = el.parentElement;
  }

  e.preventDefault();
}

try {
  module.exports = noSwipe;
} catch (e) {}
