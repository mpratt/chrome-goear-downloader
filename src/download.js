/*
 * Copyright (c) 2015 Michael Pratt <pratt@hablarmierda.net>
 *
 * @url https://github.com/mpratt/chrome-goear-downloader
 * @license MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Prepends the download button into the given list.
 *
 * @param element ul
 * @param string songId
 * @return void
 */
function gd_addElementToList(ul, songId) {
    var list = document.createElement('li');
    var a = gd_createLink(songId);

    list.appendChild(a);
    ul.insertBefore(list, ul.firstChild);
}

/**
 * Adds a download button into a result page
 *
 * @param element ul
 * @param string songId
 * @return void
 */
function gd_addElementToResultList(ul, songId) {
    var titleList = ul.getElementsByClassName('title');
    var a = gd_createLink(songId);
    a.className = 'btn clear square';
    a.setAttribute('style', 'font-size:10px;padding:5px;margin-left:5px;line-height:10px;background-image:none;');
    for (var i = 0; i < titleList.length; i++) {
        var heading = titleList[i].getElementsByTagName('h4');
        for (var j = 0; j < heading.length; j++) {
            heading[j].appendChild(a);
        }
    }
}

/**
 * Creates an anchor (link) element with the
 * location of the mp3 file
 *
 * Other possible urls could be:
 *     - 'http://www.goear.com/plimiter.php?f=' + songId;
 *     - 'http://www.goear.com/action/sound/get/' + songId;
 *
 * @param string songId
 * @param string text
 * @param string className
 * @return element
 */
function gd_createLink(songId) {
    var a = document.createElement('a');
    var text = chrome.i18n.getMessage('goear_downloader_anchor_text');
    a.appendChild(document.createTextNode(text));
    a.title = text;
    a.className = 'btn clear pict';
    a.href = 'http://www.goear.com/action/sound/get/' + songId;
    a.setAttribute('style', 'background-position:8px -16px;');

    return a;
}

/**
 * Returns the song id from a string
 *
 * @param string string
 * @return mixed The song Id or false when none was found
 */
function gd_getSongIdFromString(string) {
    var match = string.match(/\/listen\/(.*)\//);
    if (match) {
        return match[1];
    }

    return false;
}

/**
 * Spin that wheel!
 * Lets contextualize a little. If the actionUl exists we're talking about
 * a single page.
 *
 * resultsUl on the contrary exists on a tipical result page.
 */
var actionUl = document.getElementsByClassName('actions');
var resultUl = document.getElementsByClassName('group board_content');
var idFromUrl = gd_getSongIdFromString(document.URL);

if (actionUl.length > 0 && idFromUrl) {
    for (var i = 0; i < actionUl.length; i++) {
        gd_addElementToList(actionUl[i], idFromUrl);
    }
} else if (resultUl.length > 0) {
    for (var i = 0; i < resultUl.length; i++) {
        var list = resultUl[i];
        var songUrl = list.getAttribute('redir');
        var idFromString = gd_getSongIdFromString(songUrl);
        if (idFromString) {
            gd_addElementToResultList(resultUl[i], idFromString);
        }
    }
}
