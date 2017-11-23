$(document).ready(function() {
    chrome.tabs.executeScript(null,{file:'NewHilitor.js'});
    $('#highlight').click(function() {
        chrome.tabs.executeScript(null,{code: '(new NewHilitor(document.body.innerText)).apply();'},function() {
        });
    });
    $('#reset').click(function() {
        chrome.tabs.executeScript(null,{code: '(new NewHilitor(document.body.innerText)).remove();'},function(){
        });
    });
});