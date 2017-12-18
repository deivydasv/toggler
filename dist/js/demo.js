/*!
 * Toggler (https://github.com/deivydasv/toggler)
 * Version: 1.1.3
 * Last update on: 2017-12-18 14:47:10
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

    button.addEventListener('click', function () {
        return toggler.toggle();
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
} else {
    load();
}