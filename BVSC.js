// ==UserScript==
// @name         Bilibili Video Speed Controler
// @namespace    https://github.com/SY0UYU/Bilibili-Video-Speed-Controller
// @version      0.1
// @description  加入更多播放倍数选项!
// @author       SY0UYU
// @supportURL   https://github.com/SY0UYU/Bilibili-Video-Speed-Controller/issues
// @updateURL    https://github.com/SY0UYU/Bilibili-Video-Speed-Controller/raw/master/BVSC.js
// @downloadURL  https://github.com/SY0UYU/Bilibili-Video-Speed-Controller/raw/master/BVSC.js
// @icon         https://www.bilibili.com/favicon.ico?v=1
// @include      https://www.bilibili.com/video/*
// @grant        none
// @run-at       document-end
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const speedList = ['2.5', '3.0', '3.5', '4.0'];
    const rebuildMenu = function (speedMenu) {
        const elemSource = $('.bilibili-player-video-btn-speed-menu-list')[0];
        for(let speed in speedList){
            let s = speedList[speed]
            let injectElem = $(elemSource).clone(true)[0];
            $(injectElem).attr('data-value',s);
            $(injectElem).text(s+'x');
            $(speedMenu).prepend(injectElem);
        }
    }
    const injectHTML = function () {
        const speedMenuList = document.getElementsByClassName('bilibili-player-video-btn-speed-menu');
        if (speedMenuList.length == 0) {
            setTimeout(function () { injectHTML(); }, 500);
            return;
        }
        const speedMenu = speedMenuList[0];
        rebuildMenu(speedMenu);
        $(speedMenu).children().click(function () {
            $(speedMenu).children().removeClass('bilibili-player-active');
            $(this).addClass('bilibili-player-active');
        });
        console.log('Bilibili Video Speed Controler Inject Success! ');
    };
    injectHTML();
})();
