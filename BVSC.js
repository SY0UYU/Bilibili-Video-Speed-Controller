// ==UserScript==
// @name         Bilibili Video Speed Controler
// @namespace    https://github.com/SY0UYU/Bilibili-Video-Speed-Controller
// @version      0.2.4
// @description  加入更多播放倍数选项!
// @author       SY0UYU
// @supportURL   https://github.com/SY0UYU/Bilibili-Video-Speed-Controller/issues
// @updateURL    https://raw.githubusercontent.com/SY0UYU/Bilibili-Video-Speed-Controller/main/BVSC.js
// @downloadURL  https://raw.githubusercontent.com/SY0UYU/Bilibili-Video-Speed-Controller/main/BVSC.js
// @icon         https://www.bilibili.com/favicon.ico?v=1
// @include      https://www.bilibili.com/video/*
// @grant        none
// @run-at       document-end
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    let SpeedSelected = undefined;
    const classActive = 'bpx-state-active';
    const classMenu = 'bpx-player-ctrl-playbackrate-menu';
    const classItem = 'bpx-player-ctrl-playbackrate-menu-item';
    const speedList = ['2.5', '3.0', '3.5', '4.0'];
    const rebuildMenu = (speedMenu) => {
        let elemSource = $('.' + classItem)[0];
        for (let speed in speedList) {
            const s = speedList[speed]
            const injectElem = $(elemSource).clone(true)[0];
            $(injectElem).attr('data-value', s);
            $(injectElem).removeClass(classActive);
            $(injectElem).text(s + 'x');
            $(speedMenu).prepend(injectElem);
        }
    }
    const injectHTML = (cb) => {
        const speedMenuList = $('.' + classMenu);
        if (speedMenuList.length === 0) {
            setTimeout(() => injectHTML(cb), 500);
            return;
        }
        const speedMenu = speedMenuList[0];
        rebuildMenu(speedMenu);
        $(speedMenu).children().click(() => {
            $(speedMenu).children().removeClass(classActive);
            $(this).addClass(classActive);
            SpeedSelected = this;
        });
        if (typeof cb === 'function') {
            cb();
        }
        console.log('Bilibili Video Speed Controller Inject Success! ');
    };
    const cb = () => {
        $('#bilibili-player').click(() => {
            const list = $('.' + classItem);
            if (list.length === 6) {
                injectHTML(() => {
                    if (SpeedSelected !== undefined) {
                        let index = $.inArray($(SpeedSelected).attr('data-value'), speedList);
                        if (index !== -1) {
                            $('.' + classItem + '[data-value="' + speedList[index] + '"]').addClass(classActive);
                        }
                    }
                });
            }
        });
    }
    injectHTML(cb);
})();
