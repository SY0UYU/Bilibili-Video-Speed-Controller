// ==UserScript==
// @name         Bilibili Video Speed Controler
// @namespace    https://github.com/SY0UYU/Bilibili-Video-Speed-Controller
// @version      0.2.3
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

(function() {
    'use strict';

    // Your code here...
    var SpeedSelected = undefined;
    const classActive = 'bilibili-player-active';
    const classMenu = 'bilibili-player-video-btn-speed-menu';
    const classItem = 'bilibili-player-video-btn-speed-menu-list';
    const speedList = ['2.5', '3.0', '3.5', '4.0'];
    const rebuildMenu = function (speedMenu) {
        let elemSource = $('.'+classItem)[0];
        for(let speed in speedList){
            let s = speedList[speed]
            let injectElem = $(elemSource).clone(true)[0];
            $(injectElem).attr('data-value',s);
            $(injectElem).removeClass(classActive);
            $(injectElem).text(s+'x');
            $(speedMenu).prepend(injectElem);
        }
    }
    const injectHTML = function (callback) {
        let speedMenuList = document.getElementsByClassName(classMenu);
        if (speedMenuList.length == 0) {
            setTimeout(function () { injectHTML(callback); }, 500);
            return;
        }
        let speedMenu = speedMenuList[0];
        rebuildMenu(speedMenu);
        $(speedMenu).children().click(function () {
            $(speedMenu).children().removeClass(classActive);
            $(this).addClass(classActive);
            SpeedSelected = this;
        });
        if (typeof callback == 'function') {
            callback();
        }
        console.log('Bilibili Video Speed Controller Inject Success! ');
    };
    const myCallback = function () {
        $('#bilibili-player').click(function () {
            let list = document.getElementsByClassName(classItem);
            if (list.length == 6) {
                injectHTML(function () {
                    if (SpeedSelected != undefined) {
                        let index = $.inArray($(SpeedSelected).attr('data-value'), speedList);
                        if(index != -1){
                            $('.'+classItem+'[data-value="'+ speedList[index] +'"]').addClass(classActive);
                        }
                    }
                });
            }
        });
    }
    injectHTML(myCallback);
})();
