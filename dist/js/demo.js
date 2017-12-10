/*!
 * Toggler (https://github.com/deivydasv/toggler)
 * Version: 1.1.2
 * Last update on: 2017-12-10 15:15:38
 * Author: Deivydas Vaseris
 */

'use strict';

Toggler.Init({
    CLASS_TARGET_VISIBLE: 'active'
});

var load = function load() {
    var content = document.getElementById('test-content');
    var button = document.getElementById('test-button');

    var toggler = new Toggler(content);
    toggler.show();

    button.addEventListener('click', function (_) {
        return toggler.toggle();
    });
};

document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', load) : load();