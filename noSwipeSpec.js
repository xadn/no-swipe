describe('#noSwipe', function() {
  var container;

  beforeEach(function() {
    jasmine.addMatchers(getCustomMatchers());
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  describe('no scrollable elements', function() {
    beforeEach(function() {
      renderIntoContainer('\
        <div class="layer1" style="height:400px;width:800px;overflow-x:scroll;"></div>\
      ');
    });

    it('prevents scrolling left', function() {
      expect(triggerWheelEvent('.layer1', {deltaX:  -1})).toBePrevented();
    });

    it('prevents scrolling right', function() {
      expect(triggerWheelEvent('.layer1', {deltaX:  1})).toBePrevented();
    });

    it('prevents scrolling up', function() {
      expect(triggerWheelEvent('.layer1', {deltaY: -1})).toBePrevented();
    });

    it('prevents scrolling down', function() {
      expect(triggerWheelEvent('.layer1', {deltaY: 1})).toBePrevented();
    });
  });

  describe('a horizontally scrollable element', function() {
    beforeEach(function() {
      renderIntoContainer('\
        <div class="layer1" style="height:400px;width:800px;overflow-x:scroll;">\
          <div class="layer2" style="height:300px;width:1000px;"></div>\
        </div>\
      ');
    });

    describe('already scrolled to the left', function() {
      beforeEach(function() {
        container.querySelector('.layer1').scrollLeft = 0;
      });

      it('prevents scrolling left', function() {
        expect(triggerWheelEvent('.layer2', {deltaX:  -1})).toBePrevented();
      });

      it('allows scrolling right', function() {
        expect(triggerWheelEvent('.layer2', {deltaX:  1})).not.toBePrevented();
      });

      it('prevents scrolling up', function() {
        expect(triggerWheelEvent('.layer2', {deltaY: -1})).toBePrevented();
      });

      it('prevents scrolling down', function() {
        expect(triggerWheelEvent('.layer2', {deltaY: 1})).toBePrevented();
      });
    });

    describe('scrolled to the right', function() {
      beforeEach(function() {
        container.querySelector('.layer1').scrollLeft = 9999;
      });

      it('allows scrolling left', function() {
        expect(triggerWheelEvent('.layer2', {deltaX:  -1})).not.toBePrevented();
      });

      it('prevents scrolling right', function() {
        expect(triggerWheelEvent('.layer2', {deltaX:  1})).toBePrevented();
      });

      it('prevents scrolling up', function() {
        expect(triggerWheelEvent('.layer2', {deltaY: -1})).toBePrevented();
      });

      it('prevents scrolling down', function() {
        expect(triggerWheelEvent('.layer2', {deltaY: 1})).toBePrevented();
      });
    });
  });

  describe('when there is a vertically scrollable element', function() {
    beforeEach(function() {
      renderIntoContainer('\
        <div class="panel" style="width:200px;height:400px;float:left;margin-left:5px;overflow-y:scroll;">\
          <div class="content" style="width:100px;height:800px;"></div>\
        </div>\
      ');
    });

    describe('scrolled to the top', function() {
      beforeEach(function() {
        container.querySelector('.panel').scrollTop = 0;
      });

      it('prevents scrolling left', function() {
        expect(triggerWheelEvent('.content', {deltaX:  -1})).toBePrevented();
      });

      it('prevents scrolling right', function() {
        expect(triggerWheelEvent('.content', {deltaX:  1})).toBePrevented();
      });

      it('prevents scrolling up', function() {
        expect(triggerWheelEvent('.content', {deltaY: -1})).toBePrevented();
      });

      it('allows scrolling down', function() {
        expect(triggerWheelEvent('.content', {deltaY: 1})).not.toBePrevented();
      });
    });

    describe('scrolled to the bottom', function() {
      beforeEach(function() {
        container.querySelector('.panel').scrollTop = 9999;
      });

      it('prevents scrolling left', function() {
        expect(triggerWheelEvent('.content', {deltaX:  -1})).toBePrevented();
      });

      it('prevents scrolling right', function() {
        expect(triggerWheelEvent('.content', {deltaX:  1})).toBePrevented();
      });

      it('allows scrolling up', function() {
        expect(triggerWheelEvent('.content', {deltaY: -1})).not.toBePrevented();
      });

      it('prevents scrolling down', function() {
        expect(triggerWheelEvent('.content', {deltaY: 1})).toBePrevented();
      });
    });
  });

  function triggerWheelEvent(selector, eventOptions) {
    var event = {
      target: container.querySelector(selector),
      deltaX: eventOptions.deltaX || 0,
      deltaY: eventOptions.deltaY || 0,
      preventDefault: jasmine.createSpy('event#preventDefault')
    };
    noSwipe(event);
    return event;
  }

  function renderIntoContainer(html) {
    container.innerHTML = html;
  }

  function getCustomMatchers() {
    return {
      toBePrevented: function() {
        return {
          compare: function(event) {
            return jasmine.matchers.toHaveBeenCalled().compare(event.preventDefault);
          }
        }
      }
    };
  }
});
