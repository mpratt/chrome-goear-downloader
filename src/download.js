/*
* Copyright (c) 2014 Michael Pratt <pratt@hablarmierda.net>
*
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
 * Prepends a new list element into a given list
 *
 * @param element ul
 * @return string
 */
function gd_addElementToList(ul) {
    var list = document.createElement('li');
    var a = gd_createLink();

    list.appendChild(a);
    ul.insertBefore(list, ul.firstChild);
}

/**
 * Creates an anchor (link) element
 *
 * @return element
 */
function gd_createLink() {
    var a = document.createElement('a');
    var text = "Descargar";

    a.appendChild(document.createTextNode(text));
    a.title = text;
    a.className = "radius_3"
    //a.href = "http://www.goear.com/plimiter.php?f=" + gd_getSongId();
    a.href = "http://www.goear.com/action/sound/get/" + gd_getSongId();
    a.setAttribute("style", "background-position:0px -12px;");

    return a;
}

/**
 * Returns the song id. It uses the current Url
 * to get it.
 *
 * @return string
 */
function gd_getSongId() {
  var url = document.URL;
  var match = url.match(/\/listen\/(.*)\//);
  return match[1];
}

/**
 * Spin that wheel!
 */
var actionUl = document.getElementById('actions');
if (actionUl != null && actionUl.value != '') {
    gd_addElementToList(actionUl)
}
