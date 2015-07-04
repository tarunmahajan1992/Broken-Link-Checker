$(document).ready(function(){
	 chrome.tabs.executeScript(null, {file: "jquery.js"});
    $("#all").click(function(){
		 $("#url_table tr").remove();
		 		 $("#notify").remove();


		chrome.tabs.executeScript(null, 
	{code:"var mode=1;"},
	function(){	  chrome.tabs.executeScript(null, {file: "content_script.js"});
     }	
		);
		})	
		
	$("#error").click(function(){
		 $("#url_table tr").remove();
		 		 $("#notify").html("<p id=\"notify\"><strong>Wait a few moments. If nothing appears everything is fine.</strong></p>");

		chrome.tabs.executeScript(null, 
	{code:"var mode=2;"},
	function(){	  chrome.tabs.executeScript(null, {file: "content_script.js"});
     }	
		);
		})	
	


chrome.runtime.onMessage.addListener(function(request,sender) {
    /* First, validate the message's structure */
	var anchorObj={};
    if ((request.from === 'content') && (request.subject === 'showurl')) {
		anchorObj=request.anchorObj;
		 $("#1").html(JSON.stringify(anchorObj));

    }
	 if ((request.from === 'content') && (request.subject === 'url')) {
		 var url=request.url;
		if(url.length>60){
		 url=url.slice(0,100);	
		}
		 var html = "<tr ><td class=\"col-sm-9 col-md-9\" >"+
		   "<a href=\""+request.url+"\">"+url + "</a></td> <td class=\"col-sm-3 col-md-3\">" + 
		  request.status+ "</td> </tr>"; 
		    $("#url_table").append(html);   

    }
});
});