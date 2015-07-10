(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.noSwipe = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
* No Swipes v0.0.1
*  Attach to the wheel event to prevent forward & back swipe gestures.
*
* Copyright 2014, Andy Niccolai
* Licensed under the MIT license.
*  https://github.com/xadn/no-swipe/blob/master/LICENSE
*/
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

module.exports = noSwipe;

},{}]},{},[1])(1)
});
