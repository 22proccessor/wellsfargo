/*
SiteCatalyst code version: H.24.4.
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com 
*/

/* You may give each page an identifying name, server, and channel on
the next lines. */


//analytics for welcome page/ssep
function welcomeTag(pageName, linkName, linkURL) {     
    s.linkTrackVars= 'prop19';
    s.prop19 = pageName + ":" + linkName + ":" + linkURL;
    s.tl(this, 'o', s.prop19);
}



//track clicks to top nav and left nav
function navLinkClick(linkName,cusLinkTitle,linkURL) {

	s.linkTrackVars='prop25,eVar19';
	s.linkTrackEvents='event27';
	s.prop25=linkName;
	s.eVar19=linkName;
	s.events='event27';
	s.tl(this,'o',cusLinkTitle);
	setTimeout(function() { window.location.href = linkURL;
},500)
	
}

//function used for tool interaction
function toolUsage(toolName) {
	s.linkTrackVars='prop9,eVar34';
	s.linkTrackEvents='event43';
	s.prop9=s.eVar34=toolName;
	s.events='event43';
	var cusLinkTitle = "tools:"+toolName.toLowerCase();
	s.tl(this,'o',cusLinkTitle);
	
}

//function used for 2 tasks on envision tool: submit and locator clicks
function toolUsageEnvisionTool(toolName) {
	s.linkTrackVars='prop9,eVar34';
	s.linkTrackEvents='event43';
	s.prop9=s.eVar34=toolName;
	s.events='event43';
	var cusLinkTitle = "tools:"+toolName.toLowerCase();
	s.tl(this,'o',cusLinkTitle);
		
	setTimeout(function() {
		switch(toolName) {
			case 'Envision Locator':
				window.location.href = "https://www.wellsfargo.com/locator/wellsfargoadvisors/";	
				break;
			case 'Envision Card Submit':
				$('#results').submit();
				break;	
		}
	},500)

	
}


//function used only for Flash apps
function get_s_account() {
	return s_account;
}

//function used for AB testing experiences
function setV51 (exp) {
	s.linkTrackVars='eVar51';
	s.linkTrackEvents='';
	s.eVar51=exp;
	s.tl(this,'o',"experience segment");
}


var pageNames = {
	
	/* Branch Locator pages */
	'/locator/wellsfargoadvisors/' : 'wf:public:locator:homepage',
	'/locator/wellsfargoadvisors/search' : 'wf:public:locator:search',
	'/locator/wellsfargoadvisors/address_directions' : 'wf:public:locator:address_directions',
	'/locator/wellsfargoadvisors/show_directions' : 'wf:public:locator:show_directions',
	'/locator/wellsfargoadvisors/site_records' : 'wf:public:locator:site_records',
	'/locator/wellsfargoadvisors/refine_results' : 'wf:public:locator:refine_results',	
	'/locator/wellsfargoadvisors/site_records_next' : 'wf:public:locator:site_records_next',	
	'/locator/wellsfargoadvisors/site_records_previous' : 'wf:public:locator:site_records_previous',
	
	/* Misc. homepages */
	'/faintegration/' : 'wfa:fai:homepage',
	'/faintegration/index.htm' : 'wfa:fai:homepage'
	

}


function searchPageNamesArray() {
	var p = "";
	var path = document.location.pathname;  //to search pageNames array
	
	if(pageNames[path]) {
	    p = pageNames[path];
	}

	return p;
}

function captureClick(uri,pgTitle) {
	//no logic; leaving function in until content can be updated
	return;
}


function calcPageName() {
	
	var p; //will end up being value for s.pageName
	
	var host = document.location.host; //need for FAWP
	var parts = host.split('.');  //so we can get subdomain
	
	var pNameSearchResults = searchPageNamesArray(); //search the pageNames array to see if the page name is defined there 
	
	if (typeof(pageName) != "undefined") {
		//page name is hard coded in page (offers, savings quest, AGE class action)
		p = pageName; //pageName will be hard coded in page
	} else if (pNameSearchResults){
		//if page name is defined in pageNames array (branch locator, FAI homepage)
		p = pNameSearchResults;
	} else if (parts[0].match(/home/)) {
		//FAWP
		var path = document.location.pathname;
		path=path.replace(/^\/+/,""); //Remove leading slash
		p = "wfa:fawp:" + path;
	} else {
		//documentum generated page
		p = document.location.pathname;
		
		if (p.match(/^\/faintegration/) || p.match(/^\/global/) || p.match(/^\/joinwfadvisors/)){	p = p.replace(/^\/\w+/,""); } //remove root level dir from page name due to redundancy
		
		p=p.replace(/^\/+/,"");          // No leading slashes
		p=p.replace(/\//g,":");          // Replace slashes with colons
		p=p.replace(/.\w+$/,"");		// Remove file extension
		p=p.replace(/:$/,":index");  // No page?  Default to index
		p=p.toLowerCase();               // Change to lowercase
		if((typeof(domainPrefix) != "undefined") && (typeof(siteTypePrefix) != "undefined")) {
			
			p=domainPrefix+":"+siteTypePrefix+":"+p;
		}
	}	
	
	return p;
}
var pn = calcPageName();
var pageNameParts = pn.split(":");
var chnl = pageNameParts.slice(0,3);
chnl = chnl.join(":");

var wfaOmnVars = {useForcedLinkTracking : 0}

var eventNames = {
	'event1':'Offer View',
	'event2':'Offer Submit',
	'event3':'Locator Search',
	'event5':'Locator Directions',
	'event26':'File Download',
	'event39':'Video View',
	'event43':'Tool Usage',
	'event44':'Seminar Search',
	'event45':'Customer Login'
}

if (pn.match(/locator/)) { omnPageType = "Locator"; }


//temp fix
if (pn == "wf:public:locator:search") {
	s_events = "event3";
}

//don't call trackImpression() unless we need to
if (typeof(impList) != 'undefined') {
	if (impList.length > 0) { 
		trackImpression();
	}
}


function trackImpression() {  	
	var pat = /pagename/;

	for (var i=0; i < impList.length; i++) {
		if (pat.test(impList[i])) {
			impList[i]=impList[i].replace(pat,pn);
		} else {
			impList[i]=pn+impList[i];
		}		
	}
	s.addEvent("event35");
	s.list2 = impList.join();
}
	


function clickThru(promoID,loc,linkURL,offer,cid,intcid) { 
	var listString = pn + "|" + promoID + "|" + loc;
	s.linkTrackVars='list2';
	s.linkTrackEvents='event36';
	s.list2=listString;
	s.events='event36';
	s.tl(this,'o',"CTA Click");
	setTimeout(function() { 
		if(linkURL == "offerTrafficRouter") { 
			offerTrafficRouter(offer,cid,intcid);
		} else {
			window.location.href = linkURL;
		}
			
},500)
}

s.pageName=pn;
s.server=pageNameParts[0];
s.channel=chnl;
if (typeof(errorPageType) != 'undefined') s.pageType="errorPage";
s.prop1="D=g"
s.prop2=pageTitle;
if(typeof(omnPageType) != 'undefined') { s.prop22=omnPageType; s.eVar20="D=c22"; }
if((typeof(s_events) != 'undefined') && (typeof(eventNames[s_events]) != 'undefined')) s.prop23=eventNames[s_events];
if(typeof(p23) != 'undefined') s.prop23=p23;
s.prop26="v3.5"; //js version #

/* Conversion Variables */
s.campaign=""
s.state=""
s.zip=""
if(typeof(s_events) != 'undefined') {
	if ((s_events == "event2") && (typeof(omnLeadID) != 'undefined')) {
			s_events = "event2,event51:lead" + omnLeadID;
			s.transactionID="lead_"+omnLeadID;
	}
	s.events = s_events;
}
s.products=""
s.purchaseID=""
s.eVar1=s.prop1
s.eVar2="D=c2"
if (typeof(omnLeadID) != 'undefined') s.eVar10=omnLeadID;
s.eVar12="+1";
if (typeof(formID) != 'undefined') s.eVar13=formID;
if (typeof(omnConvPage) != 'undefined') s.eVar15 = omnConvPage;
s.eVar18="D=pageName"
if (typeof(omnCity) != 'undefined') s.eVar24=omnCity;
if (typeof(omnZip) != 'undefined') s.eVar25=omnZip;
s.eVar31="+1";
if (typeof(omnState) != 'undefined') s.eVar36=omnState;
if (typeof(v51) != 'undefined') s.eVar51=v51;

if ((pn.match(/locator/)) ? sendEngScore('locator') : sendEngScore());

if (typeof(wfaOmnVars) != 'undefined')
{
  for(var key in wfaOmnVars) {
    if(wfaOmnVars.hasOwnProperty(key)) {
      s[key] = wfaOmnVars[key];
    }
  }
}


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code=s.t();if(s_code)document.write(s_code);
if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-');
document.write('<noscript><img src="https://wfainternet.d1.sc.omtrdc.net/b/ss/wswfa-alphatest/1/H.24.4--NS/0" height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->');
//End SiteCatalyst code version: H.24.4.

