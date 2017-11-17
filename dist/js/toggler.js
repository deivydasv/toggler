/*!
 * Toggler (https://github.com/deivydasv/toggler)
 * Version: 1.0.0
 * Last update on: 2017-11-17 01:40:38
 * Author: Deivydas Vaseris
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toggler = function () {
    _createClass(Toggler, null, [{
        key: 'getPlugin',
        value: function getPlugin(element) {
            return element.Toggler || new Toggler(element);
        }
    }, {
        key: 'TransitionEnd',
        get: function get() {
            return 'transition' in document.documentElement.style ? 'transitionend' : 'WebkitTransition' in document.documentElement.style ? 'webkitTransitionEnd' : null;
        }
    }]);

    function Toggler() {
        _classCallCheck(this, Toggler);

        if (arguments.length) {
            var element = arguments[0];
            if (typeof element == 'string') {
                element = document.body.querySelector(element);
            }
            if (element instanceof HTMLElement) {
                if (element.Toggler) return element.Toggler;

                element.Toggler = this;
                this.element = element;
                this.element.classList.add(Toggler.Config.CLASS_BASE);
            }
        }
    }

    _createClass(Toggler, [{
        key: 'show',
        value: function show() {
            var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var _this = this;

            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var force_siblings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var el = this.element;
            var others = [];

            if (this.isVisible() || this.isTransitioning()) {
                return;
            }

            collection: if (collection) {
                collection = typeof collection == 'string' ? document.body.querySelector(collection) : collection;
                if (!collection) break collection;

                //find siblings in given collection
                others = collection.querySelectorAll('.' + Toggler.Config.CLASS_BASE);
                if (!others) break collection;
                others = Array.from(others).filter(function (e) {
                    return !e.isSameNode(el);
                });

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = others[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var e = _step.value;

                        var toggler = Toggler.getPlugin(e);
                        //stop if any of siblings are transitioning
                        if (toggler.isTransitioning()) return;

                        //or close if visible
                        if (toggler.isVisible()) toggler.hide(null, force || force_siblings);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            if (force) {
                el.classList.add(Toggler.Config.CLASS_VISIBLE);
                this._triggerCheck();
                this._dispatchEvent('show');
                return;
            }

            var afterTransition = function afterTransition(e) {
                el.classList.add(Toggler.Config.CLASS_VISIBLE);

                if (_this.isFadeAnimation() || _this.isSlideFadeAnimation()) {
                    el.style.opacity = null;
                }
                if (!_this.isFadeAnimation()) {
                    el.style.height = null;
                }

                _this._removeTransitionEndListener(afterTransition);
                el.classList.remove(Toggler.Config.CLASS_TRANSITIONING);

                _this._triggerCheck();
                _this._dispatchEvent('show');
            };

            if (this.isFadeAnimation() || this.isSlideFadeAnimation()) {
                el.style.opacity = 0;
            }
            if (!this.isFadeAnimation()) {
                el.style.height = 0;
            }

            el.classList.add(Toggler.Config.CLASS_TRANSITIONING);
            this._repaint();
            this._addTransitionEndListener(afterTransition);

            if (this.isFadeAnimation() || this.isSlideFadeAnimation()) {
                el.style.opacity = 1;
            }
            if (!this.isFadeAnimation()) {
                el.style.height = el.scrollHeight + 'px';
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _this2 = this;

            var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var el = this.element;
            var others = [];

            if (this.isHidden() || this.isTransitioning()) {
                return;
            }

            if (force) {
                this.element.classList.remove(Toggler.Config.CLASS_VISIBLE);
                this._triggerCheck();
                this._dispatchEvent('hide');
                return;
            }

            var afterTransition = function afterTransition() {
                if (_this2.isFadeAnimation() || _this2.isSlideFadeAnimation()) {
                    el.style.opacity = null;
                }
                if (!_this2.isFadeAnimation()) {
                    el.style.height = null;
                }
                _this2._removeTransitionEndListener(afterTransition);
                el.classList.remove(Toggler.Config.CLASS_TRANSITIONING);

                _this2._triggerCheck();
                _this2._dispatchEvent('hide');
            };

            el.classList.add(Toggler.Config.CLASS_TRANSITIONING);
            el.classList.remove(Toggler.Config.CLASS_VISIBLE);

            if (this.isFadeAnimation() || this.isSlideFadeAnimation()) {
                el.style.opacity = 1;
            }
            if (!this.isFadeAnimation()) {
                el.style.height = el.offsetHeight + 'px';
            }

            this._repaint();

            this._addTransitionEndListener(afterTransition);

            if (this.isFadeAnimation() || this.isSlideFadeAnimation()) {
                el.style.opacity = 0;
            }
            if (!this.isFadeAnimation()) {
                el.style.height = 0;
            }
        }
    }, {
        key: 'tab',
        value: function tab() {
            var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.show(collection, force, true);
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this.isHidden()) {
                this.show(collection, force);
            } else {
                this.hide(null, force);
            }
        }
    }, {
        key: 'isTransitioning',
        value: function isTransitioning() {
            return this.element.classList.contains(Toggler.Config.CLASS_TRANSITIONING);
        }
    }, {
        key: 'isVisible',
        value: function isVisible() {
            return this.element.classList.contains(Toggler.Config.CLASS_VISIBLE);
        }
    }, {
        key: 'isHidden',
        value: function isHidden() {
            return !this.isVisible();
        }
    }, {
        key: 'isFadeAnimation',
        value: function isFadeAnimation() {
            return this.element.classList.contains(Toggler.Config.CLASS_FADE);
        }
    }, {
        key: 'isSlideFadeAnimation',
        value: function isSlideFadeAnimation() {
            return this.element.classList.contains(Toggler.Config.CLASS_SLIDEFADE);
        }
    }, {
        key: 'isSlideAnimation',
        value: function isSlideAnimation() {
            return !this.element.classList.contains(Toggler.Config.CLASS_FADE) && !this.element.classList.contains(Toggler.Config.CLASS_SLIDEFADE);
        }

        // check trigger (add/remove class CLASS_TARGET_VISIBLE)

    }, {
        key: '_triggerCheck',
        value: function _triggerCheck() {
            var _this3 = this;

            document.body.querySelectorAll('[data-toggler]').forEach(function (trigger) {
                var datatarget = void 0;
                if (trigger.dataset.togglerTarget) {
                    datatarget = trigger.dataset.togglerTarget;
                } else if (trigger.hasAttribute('href')) {
                    datatarget = trigger.getAttribute('href');
                }

                if (!datatarget) return;

                var targets = document.body.querySelectorAll(datatarget);
                targets.forEach(function (target) {
                    if (target.isSameNode(_this3.element)) {
                        if (Toggler.getPlugin(target).isVisible()) trigger.classList.add(Toggler.Config.CLASS_TARGET_VISIBLE);else {
                            trigger.classList.remove(Toggler.Config.CLASS_TARGET_VISIBLE);
                        }
                    }
                });
            });
        }
    }, {
        key: '_repaint',
        value: function _repaint() {
            getComputedStyle(this.element).height;
        }
    }, {
        key: '_dispatchEvent',
        value: function _dispatchEvent(name) {
            this.element.dispatchEvent(new Event('toggler.' + name));
        }
    }, {
        key: '_addTransitionEndListener',
        value: function _addTransitionEndListener(callback) {
            // no transition support
            if (!Toggler.TransitionEnd) {
                callback();
                return;
            }

            this.element.addEventListener(Toggler.TransitionEnd, callback);
        }
    }, {
        key: '_removeTransitionEndListener',
        value: function _removeTransitionEndListener(callback) {
            // no transition support
            if (!Toggler.TransitionEnd) {
                return;
            }

            this.element.removeEventListener(Toggler.TransitionEnd, callback);
        }
    }], [{
        key: 'Init',
        value: function Init(config) {

            // config
            Toggler.Config = Object.assign({
                CLASS_BASE: 'js-toggler',
                CLASS_VISIBLE: 'is-visible',
                CLASS_TARGET_VISIBLE: 'is-target-visible',
                CLASS_TRANSITIONING: 'is-transitioning',
                CLASS_FADE: 'is-fade',
                CLASS_SLIDEFADE: 'is-slidefade'
            }, config || {});

            var init = function init() {

                //add click events for triggers
                document.body.addEventListener('click', function (event) {
                    var trigger = void 0;
                    for (var element = event.target; element != document.body; element = element.parentElement) {
                        if (element.matches('[data-toggler]')) {
                            trigger = element;
                            break;
                        }
                    }
                    if (!trigger) return;

                    event.preventDefault();

                    var datatarget = void 0;
                    if (trigger.dataset.togglerTarget) {
                        datatarget = trigger.dataset.togglerTarget;
                    } else if (trigger.hasAttribute('href')) {
                        datatarget = trigger.getAttribute('href');
                    }

                    if (!datatarget) return;

                    var targets = document.body.querySelectorAll(datatarget);
                    var action = (trigger.dataset.toggler.match(/(show|hide|tab)/gi) || ['toggle'])[0].toLowerCase();
                    var force = trigger.dataset.togglerForce ? true : false;
                    var collection = document.body.querySelector(trigger.dataset.togglerCollection);

                    targets.forEach(function (target) {
                        Toggler.getPlugin(target)[action](collection, force);
                    });
                });

                //check all triggers (to add CLASS_TARGET_VISIBLE class on trigger / init Toggler on target)
                document.body.querySelectorAll('[data-toggler]').forEach(function (trigger) {
                    var datatarget = void 0;
                    if (trigger.dataset.togglerTarget) {
                        datatarget = trigger.dataset.togglerTarget;
                    } else if (trigger.hasAttribute('href')) {
                        datatarget = trigger.getAttribute('href');
                    }

                    if (!datatarget) return;

                    var targets = document.body.querySelectorAll(datatarget);
                    targets.forEach(function (target) {
                        if (Toggler.getPlugin(target).isVisible()) trigger.classList.add(Toggler.Config.CLASS_TARGET_VISIBLE);else {
                            trigger.classList.remove(Toggler.Config.CLASS_TARGET_VISIBLE);
                        }
                    });
                });
            };

            document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
            Toggler.Init = null;
        }
    }]);

    return Toggler;
}();