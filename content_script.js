

$(document).ready(function(){
	//alert(mode);
	var anchorObj={};
	var main=function(){
    anchorTags=	$('a');	
	for(var i=0;i<anchorTags.length;i++){
		var href=anchorTags[i].href;
        anchorObj[href]={value:1,status:null,ignore:false};
	
		var href=anchorTags[i].href;
        var pattern1 = /http:/;
		var pattern2 = /https:/;
		var pattern3 = /%7B0%7D/;
		
        var exists = pattern1.test(href)||pattern2.test(href);
       if(pattern3.test(href)){
		    exists=false;
			anchorObj[href].ignore=true;
	   }
	   
       if(exists){
		$.ajax({
			url:anchorTags[i].href,
			type:'GET',
			beforeSend: function(jqXHR, settings) {
             jqXHR.url = settings.url;
             },
			error:function(jqXHR,error){
				var message;
				if(jqXHR.status=='404') message='404 resource not found';
				else if(jqXHR.status=='0') message='request timeout';
				else message=jqXHR.status+" "+jqXHR.statusText;
				chrome.runtime.sendMessage({
                from:    'content',
                subject: 'url',
			    url:jqXHR.url,
			    status:message
           });
			},
			success:function(data,status,jqXHR){
				if(mode==1){

				var message=jqXHR.status+" "+jqXHR.statusText;
				chrome.runtime.sendMessage({
                from:    'content',
                subject: 'url',
			    url:jqXHR.url,
			    status:message
           });
				}
			}
			})
        }
    } 
       
		     
   }();

})



	 