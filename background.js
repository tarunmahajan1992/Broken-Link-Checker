/*chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
 alert("tarun kumar"+JSON.stringify(details));

},
{urls: [ "http://www.web/*"]},['requestHeaders','blocking']);*/



chrome.webRequest.onHeadersReceived.addListener(function(details) {
 /*alert(JSON.stringify(details.statusLine)+" "+JSON.stringify(details.url));*/
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, 
                          {url: details.url,
                           status:JSON.stringify(details.statusLine)}, 
                          function(response) {
                            console.log(response.farewell);
  });
});
}, {
types: ['main_frame', 'sub_frame','xmlhttprequest'],
urls: ["<all_urls>"]
}, ['blocking', 'responseHeaders']); 

/*chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
});*/