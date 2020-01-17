// ==UserScript==
// @name         Polly - Sort by Votes
// @namespace    DDCT
// @version      0.3
// @description  Sorts Polly by votes
// @author       Muhammed Ahmed
// @updateURL    https://raw.githubusercontent.com/ma3574/pollly-sort-tampermonkey/master/pollly-sorter.js
// @downloadURL  https://raw.githubusercontent.com/ma3574/pollly-sort-tampermonkey/master/pollly-sorter.js
// @match        https://poll.ly/
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var angularRenderBoxSelector = "body > div.main-container.ng-scope"

    elementReady(angularRenderBoxSelector).then((someWidget)=>{
        addSortButton();
    });

})();

// https://gist.github.com/jwilson8767/db379026efcbd932f64382db4b02853e
function elementReady(selector) {
    return new Promise((resolve, reject) => {
        let el = document.querySelector(selector);
        if (el) {resolve(el);}
        new MutationObserver((mutationRecords, observer) => {
            Array.from(document.querySelectorAll(selector)).forEach((element) => {
                resolve(element);
                observer.disconnect();
            });
        })
            .observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

function addSortButton() {
    var sortButton = document.createElement("button")
    sortButton.innerHTML = "Sort It";
    sortButton.style.marginTop = "10px";
    sortButton.style.color = "black";

    var headerSelector = "body > div.main-container.ng-scope > div.poll.container.ng-scope > div.poll-container > div.poll-header"
    document.querySelector(headerSelector).appendChild(sortButton)

    sortButton.addEventListener ("click", function() {
        sortPolly();
    });
}


function sortPolly() {
    var listSelector = "body > div.main-container.ng-scope > div.poll.container.ng-scope > div.poll-container > div.poll-body > ul"

    var sortedListContainer = document.createElement('span');
    sortedListContainer.setAttribute("id", "sorted");
    document.querySelector(listSelector).prepend(sortedListContainer)

    Array.from(document.querySelectorAll(listSelector + " > li:not(.add-suggestion)")).sort(function(a, b){
        let first = a.querySelector("div.suggestion-count > div > span").innerText
        let second = b.querySelector("div.suggestion-count > div > span").innerText
        return second - first;
    }).forEach(function(el){
        document.querySelectorAll("#sorted")[0].appendChild(el);
    });
}
