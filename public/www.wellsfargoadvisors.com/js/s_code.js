/*
AppMeasurement for JavaScript version: 2.21.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/


s_getLoadTime();

//Engagement scores
if (typeof(engScore) == 'undefined') { var engScore = 0; }
var engScores = {
	'paid search' : '+3',
	'display ad' : '+3',
	'seo branded' : '+5',
	'seo unbranded' : '+5',
	'affiliated sites' : '+8',
	'social networks' : '+8',
	'page view' : '+1',
	'bonus contact us' : '+7',
	'bonus services' : '+20',
	'bonus envision' : '+20',
	'bonus fawp' : '+12',
	'download' : '+5',
	'video view' : '+5',
	'form view' : '+3',
	'thank you' : '+8',
	'rac thank you' : '+47',
	'locator search' : '+13'
	
}


function sendEngScore(siteSection) {
		
	if (siteSection === undefined) siteSection = '';
	if(typeof(pgLevelEngScore) != 'undefined') { engScore = engScore + parseInt(pgLevelEngScore); }
	s.eVar29="+" + engScore;
	if (siteSection !='locator') engScoreCookie(engScore); 
		
}


function engScoreCookie(inc) {
	var engScrCookie = s.Util.cookieRead("engScore");
	var myDate = new Date();
	myDate.setYear(myDate.getFullYear()+5);

	if (engScrCookie != null) {
		var newScr = parseInt(engScrCookie) + parseInt(inc);
		s.Util.cookieWrite('engScore',newScr,'',myDate,'/','wellsfargoadvisors.com','');
	} else { 
		s.Util.cookieWrite('engScore',inc,'',myDate,'/','wellsfargoadvisors.com','');
	}
}

var d = new Date();
year = (d.getFullYear());
var changeStart;
var changeEnd;
getDstStartEnd();

function getDstStartEnd() {
     
	var firstChange = 0;
	var secondChange = 0;
	var lastOffset = 99;

	//Loop through every month of the current year
	for (i = 1; i <= 12; i++) {
		//Get the timezone value for the month
		var newDate = new Date(Date.UTC(year, i, 0, 0, 0, 0, 0));
		var tz = -1 * newDate.getTimezoneOffset() / 60;
			
		//Get month timezone changes occur
		if (tz > lastOffset) 
			firstChange = i-1; 
		else if (tz < lastOffset) 
			secondChange = i-1;
			
		lastOffset = tz;
			
	}
		
	// Go figure out what days the DST adjustment occurs
	changeStart = getChangeDate(year, firstChange);
	changeEnd = getChangeDate(year, secondChange);
		
	if ((changeStart == null) && (changeEnd == null)) {
		//country does not have DST, so set to default
		changeStart = "01/01/2009";  
		changeEnd = "01/01/2009";
	}
		
}

function getChangeDate(year, month) {
	// Set the starting date
	var baseDate = new Date(Date.UTC(year, month, 0, 0, 0, 0, 0));
	
	var baseOffset = -1 * baseDate.getTimezoneOffset() / 60;
	var dstDate;

	// Loop to find the exact day a timezone adjust occurs
	for (day = 0; day < 50; day++) {

		var tmpDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
		var tmpOffset = -1 * tmpDate.getTimezoneOffset() / 60;
			
		// Check if the timezone changed from one day to the next
		if (tmpOffset != baseOffset) {
			tmpDate = new Date(Date.UTC(year, month, day));

			var month = tmpDate.getMonth() + 1;  // Add a month since JavaScript counts months from 0 to 11
			var day = tmpDate.getDate(); 
			if (day < 10) day = "0" + day; // Pad the day as needed
			if (month < 10) month = "0" + month; // Pad the month as needed

			dstDate = month + '/' + day + '/' + year;

			return dstDate;
		}
	}
}

var prodDomains = [ "www.wellsfargoadvisors.com",
			"www.wellsfargo.com",  
			"www.wfafinet.com",
			"info.wellsfargoadvisors.com",
			"www.wellsfargoadvisorsinfo.com",
			"finetinfo.wellsfargoadvisors.com",
			"finet.wellsfargoadvisorsinfo.com",
			"wellsfargoadvisors.mworld.com",
			"www.agedwardsclassactionsettlement.com",
			"www.mysavingsquest.com",
			"www.firstclearingllc.com",
			"wfa.mworld.com",
			"fdc.mworld.com",
			"survey.foreseeresults.com"];
										
function isProdDomain(url) {
    var result = false; 
    for (var i = 0; !result && (i < prodDomains.length); i++) 
    {
        result = (prodDomains[i] == url);
    }
    return result;
}
                           
var url = window.location.host.toLowerCase();

if (isProdDomain(url)) {
      s_account = "wspublic-prod"; 
} else {
      s_account = "wspublic-test"; 
}

var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="ISO-8859-1"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,wachoviasecurities.com,wachoviasec.com,mworld.com,wellsfargoadvisors.com,agedwardsclassactionsettlement.com,wfadvisors.com,mysavingsquest.com,wellsfargoadvisorsinfo.com,rsvpcomm.com,wfafinet.com,wellsfargo.com/locator/wellsfargoadvisors"
s.linkLeaveQueryString=false
s.linkTrackVars=""
s.linkTrackEvents=""
/* Time Parting Config */
s.dstStart=changeStart;
s.dstEnd=changeEnd;
s.currentYear=year;
s.evar49="Foresee Respondent ID";
s.evar57="Library Code Version (v57)";

s.usePlugins=true




function s_doPlugins(s) {

	/*External Campaign Tracking*/       
	s.campaign=s.getQueryParam('excid');
	s.campaign = s.getValOnce(s.campaign,'s_campaign',0);
	s.eVar40=s.eVar41=s.eVar42="D=v0";
				
               
	/*Internal Campaign Tracking*/ 
	s.eVar9=s.getQueryParam('intcid');
	s.eVar9=s.getValOnce(s.eVar9,'evar9',0);
        
	/*Fulfillment code*/
	s.eVar8=s.getQueryParam('cid');
	s.eVar8=s.getValOnce(s.eVar8,'evar8',0);

	/*Envision Tool Cardlist*/
	s.eVar44=s.getQueryParam('cardlist');
	s.eVar44=s.getValOnce(s.eVar44,'evar44',0);
    

	/*Campaign Stacking*/
	//eVar21 is for marketing Channel Stacking
	/*
	A list of s.getQueryParam('excid') values will be returned. New s.getQueryParam('excid') values will be appended to the list. The list will be stored in a cookie named "s_ev21". Each s.getQueryParam('excid') value will be stored for 30 days and a maximum of 10 values will be stored in the campaigns list. No event is set to cleare the list, and sequential duplicate values are allowed.
	*/
	if(s._channel){
		s.prop24=s.pageName+"|"+s._channel;
	}
	//eVar22 is for Internal Campaign Stacking
	/*
	A list of s.getQueryParam('intcid') values will be returned. New s.getQueryParam('intcid') values will be appended to the list. The list will be stored in a cookie named "s_ev22". Each s.getQueryParam('intcid') value will be stored for 30 days and a maximum of 10 values will be stored in the campaigns list. No event is set to cleare the list, and sequential duplicate values are allowed.
	*/
	if(s.getQueryParam('intcid')){
	}
	
	/*Previous Page*/
	if (typeof(omnPrevPage) != 'undefined') {
		s.eVar16=omnPrevPage;
		var t=new Date;
		t.setTime(t.getTime() + 1800000);
		s.c_w('gpv_pn',s.pageName,t);
	} else {
		s.eVar16=s.getPreviousValue(s.pageName,'gpv_pn','');
	}

	/*Visit Number*/
	s.eVar30=s.getVisitNum();

	/*Page Load Time*/
	s.eVar37=s.prop37=s_getLoadTime();


}
s.doPlugins=s_doPlugins

/* Adobe Consulting Plugin: getQueryParam v3.3 (Requires pt plug-in) */
s.getQueryParam=function(qsp,de,url){var g=this,e="",k=function(b,de){de=de.split("?").join("&");de=de.split("#").join("&");var d=de.indexOf("&"),url="";b&&(-1<d||de.indexOf("=")>d)&&(d=de.substring(d+1),url=g.pt(d,"&","gpval",b));return url};qsp=qsp.split(",");var l=qsp.length;g.gpval=function(de,b){if(de){var d=de.split("="),url=d[0];d=d[1]?d[1]:!0;if(b.toLowerCase() ==url.toLowerCase())return"boolean"===typeof d?d:this.unescape(d)}return""};de=de?de:"";url=(url?url:g.pageURL?g.pageURL: location.href)+"";if((4<de.length||-1<de.indexOf("="))&&url&&4>url.length){var b=de;de=url;url=b}for(var h=0;h<l;h++)b=k(qsp[h],url) ,"string"===typeof b?(b=-1<b.indexOf("#")?b.substring(0,b.indexOf("#")):b,e+=e?de+b:b):e=""===e?b:e+(de+b);return e};

/* Adobe Consulting Plugin: pt v2.01 */ 
s.pt=function(l,de,cf,fa){if(l&&this[cf]){l=l.split(de||",");de=l.length;for(var e,c=0;c<de;c++)if(e=this[cf](l[c],fa))return e}};

/* Adobe Consulting Plugin: getValOnce v2.01 */
s.getValOnce=function(vtc,cn,et,ep){if(vtc&&(cn=cn||"s_gvo",et=et||0,ep="m"===ep?6E4:864E5,vtc!==this.c_r(cn))){var e=new Date;e.setTime(e.getTime()+et*ep);this.c_w(cn,vtc,0===et?0:e);return vtc}return""};

/* Adobe Consulting Plugin: getPreviousValue v2.0 */
s.getPreviousValue=function(v,c){var s=this,d;c=c||"s_gpv";var b=new Date;b.setTime(b.getTime()+18E5);s.c_r(c)&&(d=s.c_r(c)); v?s.c_w(c,v,b):s.c_w(c,d,b);return d};

/* Adobe Consulting Plugin: getVisitNum v4.11 (	Requires endOfDatePeriod plug-in) */
s.getVisitNum=function(rp,erp){var s=this,c=function(rp){return isNaN(rp)?!1:(parseFloat(rp)|0)===parseFloat(rp)};rp=rp?rp:365;erp= "undefined"!==typeof erp?!!erp:c(rp)?!0:!1;var e=(new Date).getTime(),b=endOfDatePeriod(rp);if(s.c_r("s_vnc"+rp))var g=s.c_r("s_vnc"+rp).split("&vn="),d=g[1];if(s.c_r("s_ivc"))return d?(b.setTime(e+18E5),s.c_w("s_ivc",!0,b),d):"unknown visit number";if("undefined"!==typeof d)return d++,c=erp&&c(rp)?e+864E5*rp:g[0],b.setTime(c),s.c_w("s_vnc"+rp,c+"&vn="+d,b),b.setTime(e+ 18E5),s.c_w("s_ivc",!0,b),d;c=c(rp)?e+864E5*rp:endOfDatePeriod(rp).getTime();s.c_w("s_vnc"+rp,c+"&vn=1",b);b.setTime(e+18E5); s.c_w("s_ivc",!0,b);return"1"};

/* Adobe Consulting Plugin: endOfDatePeriod v1.1 */
var endOfDatePeriod=function(dp){var a=new Date,b=isNaN(dp)?0:Math.floor(dp);a.setHours(23);a.setMinutes(59);a.setSeconds(59); "w"===dp&&(b=6-a.getDay());if("m"===dp){b=a.getMonth()+1;var d=a.getFullYear();b=(new Date(d?d:1970,b?b:1,0)).getDate()-a.getDate()}a.setDate(a.getDate()+b);"y"===dp&&(a.setMonth(11),a.setDate(31));return a};


/*
 * Gloucas WFA_channelManager (built on v2.55 + tweaked & refactored) -
 * param: pass in the campaign identifier.
 */
s.WFA_channelManager = function(a) {
	var s = this,
		A, B, g, l, m, p, q, P, h, k, u, S, i, O, T, j, r, t, D, E, F, G, H, N, U, v = 0,
		X, Y, W, n = new Date,p1,p2,p3,p4,rVal,b,c,d,e,f, _referrer = 'unknown';
	n.setTime(n.getTime() + 1800000);
	
	var purReferrer = (s.referrer) ? s.referrer : document.referrer;
	g = purReferrer;
	g = g.toLowerCase();
	if (!g) {
		h = 1;
	}
	i = g.indexOf('?') > -1 ? g.indexOf('?') : g.length;
	j = g.substring(0, i);
	k = s.linkInternalFilters.toLowerCase();
	k = s.split(k, ',');
	for (m = 0; m < k.length; m++) {
		B = j.indexOf(k[m]) == -1 ? '' : g;
		if (B) {
			O = B;
			return "";
		}
	}
	if (!O && !h) {
		p = g;
		U = g.indexOf('//');
		q = U > -1 ? U + 2 : 0;
		Y = g.indexOf('/', q);
		r = Y > -1 ? Y : i;
		u = t = g.substring(q, r).toLowerCase();
		P = 'Other Natural Referrers';
		S = s.seList + '>' + s._extraSearchEngines;
		if (d == 1) {
			j = s.repl(j, 'oogle', '%');
			j = s.repl(j, 'ahoo', '^');
			g = s.repl(g, 'as_q', '*');
		}
		A = s.split(S, '>');
		for (i = 0; i < A.length; i++) {
			D = A[i];
			D = s.split(D, '|');
			E = s.split(D[0], ',');
			for (G = 0; G < E.length; G++) {
				H = j.indexOf(E[G]);
				if (H > -1) {
					if (D[2]) N = u = D[2];
					else N = t;
					if (d == 1) {
						N = s.repl(N, '#', ' - ');
						g = s.repl(g, '*', 'as_q');
						N = s.repl(N, '^', 'ahoo');
						N = s.repl(N, '%', 'oogle');
					}
					i = s.split(D[1], ',');
					for (k = 0; k < i.length; k++) {
						l = s.getQueryParam(i[k], '', g).toLowerCase();
						if (l) break;
					}
				}
			}
		}
	}
	if (!O) {
		O = s.getQueryParam(a, b);
		var chnMch;
		if (O) {
			u = O.toLowerCase();
			
			var cpgn_pMch = { // excid campaign match patterns -
				'Paid Search' : [(/^sg/),(/^sy\d+/),(/^sm/),(/^sn/),(/^fco/)],
				'Display':[(/^ob/),(/^mc/),(/^dn/)],
				'Traditional Media':[(/^dm/),(/^np/),(/^pa/),(/^ce/),(/^fr/),(/^bj/),(/^si/),(/^qr/),(/^fcp/),(/^fw/),(/^fm/)],
				'Paid Mobile':[(/^sbm/),(/^sym/),(/^omn/)],
				'Social Intention':[(/^fb/),(/^li/),(/^tw/),(/^gp/),(/^yt/)]
			}
			
			/*get channel value*/
			chnMch = s.WFA_matchVal(cpgn_pMch, u);
			
			//Other Paid Campaigns
		}
		
		/*Keyword*/
		l = (l)?l.toLowerCase():'';
		
		var kword_pMch =  { // keyword match patterns -
				'SEO Branded' : [(/wells fargo advisors/),(/wells fargo/),(/wells fargo financial advisors/),(/wells/),(/wfa/),(/fargo advisors/),(/wf/),(/wellsfargoadvisors/),(/wachovia/),(/agedwards/),(/ag edwards/),(/savingsquest/),(/savings quest/)]
			}
			
		chnMch = (chnMch)?chnMch:(s.WFA_matchVal(kword_pMch, l));
		
		/*Referr Domain*/
		t = (t)?t.toLowerCase():'';
		
		var refDomn_pMch =  { // referr domain match patterns -
				'Social Networks' : [(/facebook\.com/),(/linkedin\.com/),(/twitter\.com/),(/plus\.google\.com/),(/pinterest\.com/),(/orkut\.com/),(/friendster\.com/),(/livejournal\.com/),(/blogspot\.com/),(/wordpress\.com/),(/friendfeed\.com/),(/myspace\.com/),(/digg\.com/),(/reddit\.com/),(/stumbleupon\.com/),(/twine\.com/),(/yelp\.com/),(/mixx\.com/),(/delicious\.com/),(/tumblr\.com/),(/disqus\.com/),(/intensedebate\.com/),(/plurk\.com/),(/slideshare\.net/),(/backtype\.com/),(/netvibes\.com/),(/mister-wong\.com/),(/diigo\.com/),(/flixster\.com/),(/youtube\.com/),(/vimeo\.com/),(/12seconds\.tv/),(/zooomr\.com/),(/identi\.ca/),(/jaiku\.com/),(/flickr\.com/),(/imeem\.com/),(/dailymotion\.com/),(/photobucket\.com/),(/fotolog\.com/),(/smugmug\.com/),(/classmates\.com/),(/myyearbook\.com/),(/mylife\.com/),(/tagged\.com/),(/brightkite\.com/),(/ning\.com/),(/bebo\.com/),(/hi5\.com/),(/yuku\.com/),(/cafemom\.com/),(/xanga\.com/)],
				'Affiliated Sites':[(/wellsfargo\.com/),(/wachovia\.com/),(/wachoviasecurities\.com/),(/mworld\.com/),(/advisor-connection\.com/)],
				'Display':[(/dividingpointe\.com/)],
				'Email Domain':[(/mail/),(/webmail/)]
			}
			
		chnMch = (chnMch)?chnMch:(s.WFA_matchVal(refDomn_pMch, t));
		
		/*set channel value*/
		switch(chnMch){
			case 'Paid Search':
				p1 = 'sem';
				s.events=s.apl(s.events,"event28");
				engScore = engScore + parseInt(engScores['paid search']);
				break;
			case 'Display':
				p1 = 'display';
				s.events=s.apl(s.events,"event32");
				engScore = engScore + parseInt(engScores['display ad']);
				break;
			case 'Traditional Media':
				p1 = 'traditional_media';
				break;
			case 'Paid Mobile':
				p1 = 'mobile';
				break;
			case 'SEO Branded':
				p1 = 'seo_branded';
				s.events=s.apl(s.events,"event29");
				engScore = engScore + parseInt(engScores['seo branded']);
				break;
			case 'Social Intention':
				p1 = 'social_intention';
				break;
			case 'Social Networks':
				p1 = 'social';
				s.events=s.apl(s.events,"event30");
				engScore = engScore + parseInt(engScores['social networks']);
				break;
			case 'Affiliated Sites':
				p1 = 'affiliated';
				s.events=s.apl(s.events,"event31");
				engScore = engScore + parseInt(engScores['affiliated sites']);
				break;
			case 'Email':
				p1 = 'email_domain';
				break;
			default:
			//NONE
			break;
		}
		
		if(O && !N && !p1){
			p1 = 'other_paid';
		}else if (!p1 && N) {
			P = 'Natural Search';
			p1 = 'seo_unbranded';
			s.events=s.apl(s.events,"event29");
			engScore = engScore + parseInt(engScores['seo unbranded']);
		}else if(O && !p1){
			p1 = 'other_traffic';
		}
		
		if(!N){
			N = purReferrer;
			if(!N){ 
				N = (p1 === 'sem' || p1 === 'other_paid')?'other paid referrer':'other natural referrer'; 
				if(N === 'other natural referrer' && !p1){ p1 = 'typed_bookmarked' }
			}else{
				N = s.WFA_getPureDomain(N);
				_referrer = 'non_partner';
			}
		}
	}
	
	X = (P +""+ l + t);
	c = c ? c : 'c_m';
	
	s._referrer = p ? p : 'n/a';
	s._referringDomain = t ? t : 'n/a';
	s._partner = N ? N : 'n/a';
	s._campaignID = O ? O : 'n/a';
	s._campaign = u ? u : 'n/a';
	s._keywords = l ? l : N ? 'keyword unknown' : 'keyword unknown';
	
	if(!p1){p1 = 'other_traffic';}
		
	/*set retrun value*/
	if(p1 === 'display' || p1 === 'other_paid'){
		var refD = s.WFA_getPureDomain(t);
		p2 = (!refD)?((p1 === 'other_paid')?'other paid referrer':N):refD;
		p3 = u;
		rVal = (p1 +":"+ p2 +":"+ p3);
	}else if(p1 === 'directmail' || p1 === 'mobile' || p1 === 'traditional_media' || p1 === 'social_intention'){
		p2 = u;
		rVal = (p1 +":"+ p2);
	}else if (p1 === 'social' || p1 === 'affiliated' || p1 === 'email_domain'){
		p2 = s.WFA_getPureDomain(t, 1);
		rVal = (p1 +":"+ p2);
	}else if(p1 === 'seo_unbranded'){
		p2 = (N)?N:s.WFA_getPureDomain(t);
		p2 = p2.toLowerCase();
		p3 = s._keywords.toLowerCase();
		rVal = (p1 +":"+ p2 +":"+ p3);
	}else if(p1 === 'other_traffic'){
		p2 = s.WFA_getPureDomain(t);
		rVal = (p1 +":"+ p2);
	}else{
		p2 = (N)?N:'other natural referrer';
		p2 = p2.toLowerCase();
		p3 = s._keywords.toLowerCase();
		p4 = u;
		rVal = (p1 +":"+ p2 +":"+ p3 +":"+ p4);
	}
	
	if(!purReferrer){
		if(p1 !== 'sem' && p1 !== 'other_paid'){
			if(p1 === 'display'){
			var refD = s.WFA_getPureDomain(t);
			p2 = (!refD)?N:refD;
			p3 = u;
			rVal = (p1 +":"+ p2 +":"+ p3);
			}else if(p1 !== 'directmail' && p1 !== 'mobile' && p1 !== 'traditional_media' && p1 !== 'social_intention'){
			
			var spn = (s.pageName)?s.pageName.toLowerCase():'';
			p2 = spn;
			if(spn.indexOf('signon')!= -1){
				p1 = 'direct_customer';
			}
			rVal = (p1 + ":" + p2);
			}
		}
	}
	
	s._channel = p1 ? p1 : null;
	
	return rVal;
};


/*
 * Gloucas link handler plugin vr1v4
 */
 
s.WFA_handleDownloadClick = function(_evt) {
	var elem = (_evt.currentTarget) ? _evt.currentTarget : _evt.srcElement;
	var type = elem.tagName+"";
	var id, hrefv, onclick, target;
    hrefv = (elem.href)?elem.href:'';
    onclick = (elem.onclick)?elem.onclick:'';
    target = (elem.target)?elem.target:'';

	if(type.toLowerCase() !== 'a' && onclick==''){
     	elem = elem.parentNode;
	}

	hrefv = (elem.href)?elem.href:'';
    onclick = (elem.onclick)?elem.onclick:'';

	if(hrefv=='' && onclick==''){
		return false;
	}
    

    id = (elem.id)?elem.id:"";
    if(id.indexOf('lisDynamic')!=-1){
    	id = id.replace(/lisDynamic/gi, "");
    	elem.id = id;
    	return false;
    }

	var n = '',file = '';
	if(hrefv.indexOf('#')==-1){
		n = hrefv.lastIndexOf('/');
		file  = hrefv.substr(n+1);
		n = (file.indexOf('\')')!= -1)?file.indexOf('\')'):file.indexOf('\")');
		if(n&&n!=-1){ file = file.substr(0,n); }
	}else{
		var cr = onclick+'';
		n = cr.lastIndexOf('/');
		cr  = cr.substr(n+1);
		file  = cr;
		n = cr.lastIndexOf('.');
		if(n&&n!=-1){ file = file.substr(0,n+4); }
	}
	for (var i = 0; i < 100; i++) {
        s['prop' + i] = '';
        s['eVar' + i] = '';
    }
    s.products = '';
    s.events = '';
    s.pageName = '';
    s.pageType = '';
    s.campaign = '';
	s.channel = '';
	s.eVar7 = '';
	s.eVar21 = '';
	s.linkTrackEvents = '';
	s.linkTrackVars = '';
    	eStr = "event26,event37=" + parseInt(engScores['download']);
  	s.t({events:eStr, eVar29:engScores['download'], eVar38:file, pageName:('download:'+file), prop23:'File Download'});
	engScoreCookie(parseInt(engScores['download']));	

    var isIE8 = false;

	if (navigator.appVersion.indexOf("MSIE") != -1){
		var version = parseFloat(navigator.appVersion.split("MSIE")[1]);
		if (version <= 8) {
			isIE8 = true;
			elem.href = hrefv;
			elem.setAttribute('href', hrefv);
		}
	}

	if(!isIE8){
		if(_evt.preventDefault){ 
			_evt.preventDefault();
		}else{
		 	_evt.returnValue = false;
		}

		setTimeout(function(){
		elem.setAttribute('id',('lisDynamic')+id);
		elem.id=('lisDynamic')+id;
		if(document.dispatchEvent) {   // W3C
		var oEvent = document.createEvent("MouseEvents");
		oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, elem);
		elem.dispatchEvent(oEvent);
		}
		else if(document.fireEvent) {   // IE
		elem.click();
		}
		},1000);
	}
};


s.WFA_downloadLinkHandler = (function(){
	var alength = document.getElementsByTagName("a").length;
	var fileTypes = (s.linkDownloadFileTypes)?s.linkDownloadFileTypes:'exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls';
	s.linkDownloadFileTypes = '';
	s.trackExternalLinks = false;
	var downloadFileType = fileTypes.split(',');
	for(var i = 0; i<alength; i++){
		var hrefVal = document.getElementsByTagName("a")[i].href;
		var dotIndx = hrefVal.lastIndexOf(".");
		for(var j = 0; j<downloadFileType.length; j++){
			var subString1 = hrefVal.substr(dotIndx);
			var subString2 = document.getElementsByTagName("a")[i].onclick+'';
			if(subString1.indexOf(downloadFileType[j])!= -1 || subString2.indexOf('.'+downloadFileType[j])!=-1){
				var elem = document.getElementsByTagName("a")[i];
				if(elem.addEventListener){
					elem.addEventListener('click', s.WFA_handleDownloadClick, false);
				} else if(elem.attachEvent) {
      				elem.attachEvent('onclick', s.WFA_handleDownloadClick);
				}
			}
		}
	}
	return true;
})();



/*
 * Plugin: getLoadTime
 */
function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT}

/* Adobe Consulting Plugin: apl (appendToList) v3.2 (Requires inList v2.0 or higher) */
s.apl=function(lv,vta,d1,d2,cc){if(!lv||"string"===typeof lv){if("undefined"===typeof this.inList||"string"!==typeof vta||""===vta)return lv;d1=d1||",";d2=d2||d1;1==d2&&(d2=d1,cc||(cc=1));2==d2&&1!=cc&&(d2=d1);vta=vta.split(",");for(var g=vta.length,e=0;e<g;e++)this.inList(lv,vta[e],d1,cc)||(lv=lv?lv+d2+vta[e]:vta[e])}return lv};

/* Adobe Consulting Plugin: inList v2.1 */
s.inList=function(lv,vtc,d,cc){if("string"!==typeof vtc)return!1;if("string"===typeof lv)lv=lv.split(d||",");else if("object"!== typeof lv)return!1;d=0;for(var e=lv.length;d<e;d++)if(1==cc&&vtc===lv[d]||vtc.toLowerCase()===lv[d].toLowerCase())return!0;return!1};

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="wfainternet"
s.trackingServer="wfainternet.d1.sc.omtrdc.net"

/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(h){function p(){var a=f.pageYOffset+(f.innerHeight||0);a&&a>+g&&(g=a)}function q(){if(e.scrollReachSelector){var a=h.d.querySelector&&h.d.querySelector(e.scrollReachSelector);a?(g=a.scrollTop||0,a.addEventListener("scroll",function(){var d;(d=a&&a.scrollTop+a.clientHeight||0)>g&&(g=d)})):0<v--&&setTimeout(q,1E3)}}function l(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;return a}function r(a,
d,b,c,e){var f,k;if(a.dataset&&(k=a.dataset[d]))f=k;else if(a.getAttribute)if(k=a.getAttribute("data-"+b))f=k;else if(k=a.getAttribute(b))f=k;if(!f&&h.useForcedLinkTracking&&e){var g;a=a.onclick?""+a.onclick:"";varValue="";if(c&&a&&(d=a.indexOf(c),0<=d)){for(d+=c.length;d<a.length;)if(b=a.charAt(d++),0<="'\"".indexOf(b)){g=b;break}for(k=!1;d<a.length&&g;){b=a.charAt(d);if(!k&&b===g)break;"\\"===b?k=!0:(varValue+=b,k=!1);d++}}(g=varValue)&&(h.w[c]=g)}return f||e&&h.w[c]}function s(a,d,b){var c;return(c=
e[d](a,b))&&l(m(c),e[d+"Exclusions"])}function t(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&w[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)t(c[a],d,b)}function m(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=h;var f=window;f.s_c_in||(f.s_c_il=[],f.s_c_in=0);e._il=f.s_c_il;e._in=f.s_c_in;e._il[e._in]=e;f.s_c_in++;e._c="s_m";var g=0,u,v=60;e.c={};var w={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=h.contextData,
e=h.linkObject;(a=h.pageName||h.pageURL)&&(d=s(e,"link",h.linkName))&&(b=s(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,0<g&&(c["a.activitymap.xy"]=10*Math.floor(g/10)),c["a.activitymap.pageIDType"]=h.pageName?1:0)};e._d=function(){e.trackScrollReach&&!u&&(e.scrollReachSelector?q():(p(),f.addEventListener&&f.addEventListener("scroll",p,!1)),u=!0)};e.link=function(a,d){var b;
if(d)b=l(m(d),e.linkExclusions);else if((b=a)&&!(b=r(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=l(m(a.innerText||a.textContent),e.linkExclusions))||(t(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=l(m(c.join(""))))||(f=l(m(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=l(m(a.value)):"IMAGE"==c&&a.src&&(f=l(m(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=
r(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.21.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.21.0";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;a._c="s_c";var q=h.AppMeasurement.hc;q||(q=null);var p=h,m,s;try{for(m=p.parent,s=p.location;m&&m.location&&s&&""+m.location!==""+s&&p.location&&""+m.location!==""+p.location&&m.location.host===s.host;)p=m,m=p.parent}catch(u){}a.C=function(a){try{console.log(a)}catch(b){}};a.Qa=function(a){return""+parseInt(a)==""+a};a.replace=function(a,
b,d){return!a||0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.Mb=function(){var c=h.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);
if(c&&!a.Ja&&!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ja=0<d?c.substring(d):c}return a.Ja};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.Mb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=
e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1===d&&(d=new Date,g=d.getYear(),d.setYear(g+2+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":"")+(a.writeSecureCookies?" secure;":""),a.cookieRead(c)==b):0};a.Jb=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.wb(a,function(){}))};a.xa=function(){var a=
navigator.userAgent;return"Microsoft Internet Explorer"===navigator.appName||0<=a.indexOf("MSIE ")||0<=a.indexOf("Trident/")&&0<=a.indexOf("Windows NT 6")?!0:!1};a.wb=function(a,b){for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&"function"===typeof a[d]&&(a[d]=b)};a.K=[];a.ea=function(c,b,d){if(a.Ka)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,k=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==
g){if(!a.fa)for(a.fa=1,d=0;d<k.length;d++)a.d.addEventListener(k[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.fa=0,a.delayReady())});f=1;e=0}else d||a.u("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.fa||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.u("_d")?b=1:a.za();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ka=1;a[d.m].apply(a,
d.a);a.Ka=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ea("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,k="";e=f="";if(a.lightProfileID)d=a.O,(k=a.lightTrackVars)&&(k=","+k+","+a.ka.join(",")+",");else{d=a.g;if(a.pe||a.linkType)k=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,
1).toUpperCase()+a.pe.substring(1),a[e]&&(k=a[e].cc,f=a[e].bc));k&&(k=","+k+","+a.F.join(",")+",");f&&k&&(k+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!k||0<=k.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.o=function(c,b,d,f,e){var g="",k,l,h,n,m=0;"contextData"==c&&(c="c");if(b){for(k in b)if(!(Object.prototype[k]||e&&k.substring(0,e.length)!=e)&&b[k]&&(!d||0<=d.indexOf(","+(f?f+".":"")+k+","))){h=!1;if(m)for(l=0;l<m.length;l++)if(k.substring(0,m[l].length)==
m[l]){h=!0;break}if(!h&&(""==g&&(g+="&"+c+"."),l=b[k],e&&(k=k.substring(e.length)),0<k.length))if(h=k.indexOf("."),0<h)l=k.substring(0,h),h=(e?e:"")+l+".",m||(m=[]),m.push(h),g+=a.o(l,b,d,f,h);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(h=k.substring(0,4),n=k.substring(4),k){case "transactionID":k="xact";break;case "channel":k="ch";break;case "campaign":k="v0";break;default:a.Qa(n)&&("prop"==h?k="c"+n:"eVar"==h?k="v"+n:"list"==
h?k="l"+n:"hier"==h&&(k="h"+n,l=l.substring(0,255)))}g+="&"+a.escape(k)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Pb=function(){var c="",b,d,f,e,g,k,l,h,n="",m="",p=e="",r=a.T();if(a.lightProfileID)b=a.O,(n=a.lightTrackVars)&&(n=","+n+","+a.ka.join(",")+",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].cc,m=a[e].bc));n&&(n=","+n+","+a.F.join(",")+",");m&&(m=","+m+",",n&&(n+=",events,"));
a.events2&&(p+=(""!=p?",":"")+a.events2)}if(r&&r.getCustomerIDs){e=q;if(g=r.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.o("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.o("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);k=e.substring(4);g||("events"==e&&p?(g=p,p=""):"marketingCloudOrgID"==e&&r&&a.V("ECID")&&
(g=r.marketingCloudOrgID));if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";
break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e=
"cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e=
"hp";break;case "events":p&&(g+=(""!=g?",":"")+p);if(m)for(k=g.split(","),g="",f=0;f<k.length;f++)l=k[f],h=l.indexOf("="),0<=h&&(l=l.substring(0,h)),h=l.indexOf(":"),0<=h&&(l=l.substring(0,h)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+k[f]);break;case "events2":g="";break;case "contextData":c+=a.o("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e=
"mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.o("mts",a[e],n,e));g="";break;default:a.Qa(k)&&("prop"==f?e="c"+k:"eVar"==f?e="v"+k:"list"==f?e="l"+k:"hier"==f&&(e="h"+k,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.ja&&(c+="&lrt="+a.ja,a.ja=null);return c};a.B=function(a){var b=a.tagName;if("undefined"!=""+a.kc||"undefined"!=""+a.Yb&&"HTML"!=(""+a.Yb).toUpperCase())return"";
b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ma=function(a){var b=h.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,
0>f?0:f)+"/":"")+d);return d};a.L=function(c){var b=a.B(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ma(c),e)?{id:e.substring(0,100),type:g}:0};a.ic=function(c){for(var b=a.B(c),d=a.L(c);c&&
!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.B(c),d=a.L(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Xb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,k;a.la=1;d||(a.la=0,d=a.clickObject);if(d){c=a.B(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.B(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||
0<=l.indexOf(".trackLink("))d=0}}else a.la=1;!e&&d&&(e=a.Ma(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,n=0,p;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),k=l.indexOf("#"),0<=g?0<=k&&k<g&&(g=k):g=k,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),k=0;k<g.length;k++)(p=g[k])&&l.substring(l.length-(p.length+1))=="."+p&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Pa(l)&&
(a.linkInternalFilters||(a.linkInternalFilters=h.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(k=0;k<g.length;k++)p=g[k],0<=l.indexOf(p)&&(n=1);n?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),h.s_objectID&&(b.id=h.s_objectID,d=b.type=1),f&&b&&
b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Qb=function(){var c=a.la,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.Tb()){var b={},d=0,e=a.qb(),g=e?e.split("&"):0,k,l,h,e=0;if(g)for(k=0;k<g.length;k++)l=g[k].split("="),
f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");k={};for(h in a.contextData)h&&!Object.prototype[h]&&"a.activitymap."==h.substring(0,14)&&(k[h]=a.contextData[h],a.contextData[h]="");a.e=a.o("c",k)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(h=0;h<f.length;h++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),k=0;k<b[l].length;k++)g=b[l][k],g==f[h]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":
"")+l+"&u=0"),b[l].splice(k,1),d=1);c||(d=1);if(d){e="";k=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),k=1);for(l in b)!Object.prototype[l]&&0<k&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),k--);a.yb(e)}}}return c};a.qb=function(){if(a.useLinkTrackSessionStorage){if(a.Da())return h.sessionStorage.getItem(a.P)}else return a.cookieRead(a.P)};a.Da=function(){return h.sessionStorage?!0:!1};a.yb=function(c){a.useLinkTrackSessionStorage?a.Da()&&h.sessionStorage.setItem(a.P,
c):a.cookieWrite(a.P,c)};a.Rb=function(){if(!a.ac){var c=new Date,b=p.location,d,f,e=f=d="",g="",k="",l="1.2",h=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",q="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;
g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;k=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.jc(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),q=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=h;a.browserWidth=g;a.browserHeight=k;a.connectionType=q;a.homepage=m;a.ac=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=h["AppMeasurement_Module_"+
c]?new h["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.jb=function(){return d.tb};d.zb=function(b){if(d.tb=b)a[c+"_onLoad"]=b,a.ea(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.jb,set:d.zb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ea(c+"_onLoad",[a,d],1)||b(a,d))};a.u=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Tb=function(){return a.ActivityMap&&
a.ActivityMap._c?!0:!1};a.Ub=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.S=function(c,b){var d,f,e,g,k,h,m;m={};for(d=0;2>d;d++)for(f=0<d?a.Fa:a.g,e=0;e<f.length;e++)if(g=f[e],(k=c[g])||c["!"+g]){if(k&&!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(h in a[g])k[h]||
(k[h]=a[g][h]);a[g]||(m["!"+g]=1);m[g]=a[g];a[g]=k}return m};a.gc=function(c){var b,d,f,e;for(b=0;2>b;b++)for(d=0<b?a.Fa:a.g,f=0;f<d.length;f++)e=d[f],c[e]=a[e],c[e]||"prop"!==e.substring(0,4)&&"eVar"!==e.substring(0,4)&&"hier"!==e.substring(0,4)&&"list"!==e.substring(0,4)&&"channel"!==e&&"events"!==e&&"eventList"!==e&&"products"!==e&&"productList"!==e&&"purchaseID"!==e&&"transactionID"!==e&&"state"!==e&&"zip"!==e&&"campaign"!==e&&"events2"!==e&&"latitude"!==e&&"longitude"!==e&&"ms_a"!==e&&"contextData"!==
e&&"supplementalDataID"!==e&&"tnt"!==e&&"timestamp"!==e&&"abort"!==e&&"useBeacon"!==e&&"linkObject"!==e&&"clickObject"!==e&&"linkType"!==e&&"linkName"!==e&&"linkURL"!==e&&"bodyClickTarget"!==e&&"bodyClickFunction"!==e||(c["!"+e]=1)};a.Lb=function(a){var b,d,f,e,g,k=0,h,m="",n="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(h=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,
d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")?k=",p,ei,":0<=e.indexOf("baidu.")&&(k=",wd,word,"),k&&h)))){if((a=h.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?m+=(m?"&":"")+e:n+=(n?"&":"")+e;m&&n?h=m+"&"+n:n=""}d=253-(h.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+h}return a};a.cb=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange",
"visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ba=!1;a.H=!1;a.Bb=function(){a.H=!0;a.p()};a.I=!1;a.Cb=function(c){a.marketingCloudVisitorID=c.MCMID;a.visitorOptedOut=c.MCOPTOUT;a.analyticsVisitorID=c.MCAID;a.audienceManagerLocationHint=c.MCAAMLH;a.audienceManagerBlob=c.MCAAMB;a.I=!1;a.p()};a.bb=function(c){a.maxDelay||
(a.maxDelay=250);return a.u("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.Z=!1;a.G=!1;a.za=function(){a.G=!0;a.p()};a.isReadyToTrack=function(){var c=!0;if(!a.nb()||!a.lb())return!1;a.pb()||(c=!1);a.sb()||(c=!1);return c};a.nb=function(){a.ba||a.H||(a.cb(a.Bb)?a.H=!0:a.ba=!0);return a.ba&&!a.H?!1:!0};a.lb=function(){var c=a.va();if(c)if(a.ra||a.aa)if(a.ra){if(!c.isApproved(c.Categories.ANALYTICS))return!1}else return!1;else return c.fetchPermissions(a.ub,!0),a.aa=!0,!1;return!0};a.V=
function(c){var b=a.va();return b&&!b.isApproved(b.Categories[c])?!1:!0};a.va=function(){return h.adobe&&h.adobe.optIn?h.adobe.optIn:null};a.Y=!0;a.pb=function(){var c=a.T();if(!c||!c.getVisitorValues)return!0;a.Y&&(a.Y=!1,a.I||(a.I=!0,c.getVisitorValues(a.Cb)));return!a.I};a.T=function(){var c=a.visitor;c&&!c.isAllowed()&&(c=null);return c};a.sb=function(){a.Z||a.G||(a.bb(a.za)?a.G=!0:a.Z=!0);return a.Z&&!a.G?!1:!0};a.aa=!1;a.ub=function(){a.aa=!1;a.ra=!0};a.j=q;a.q=0;a.callbackWhenReadyToTrack=
function(c,b,d){var f;f={};f.Gb=c;f.Fb=b;f.Db=d;a.j==q&&(a.j=[]);a.j.push(f);0==a.q&&(a.q=setInterval(a.p,100))};a.p=function(){var c;if(a.isReadyToTrack()&&(a.Ab(),a.j!=q))for(;0<a.j.length;)c=a.j.shift(),c.Fb.apply(c.Gb,c.Db)};a.Ab=function(){a.q&&(clearInterval(a.q),a.q=0)};a.ta=function(c){var b,d={};a.gc(d);if(c!=q)for(b in c)d[b]=c[b];a.callbackWhenReadyToTrack(a,a.Ea,[d]);a.Ca()};a.Nb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=
Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.Ea=function(c){var b=new Date,d="s"+Math.floor(b.getTime()/108E5)%10+Math.floor(1E13*Math.random()),f=b.getYear(),f="t="+a.escape(b.getDate()+"/"+b.getMonth()+"/"+(1900>f?f+1900:f)+" "+b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()+" "+b.getDay()+" "+b.getTimezoneOffset()),e=a.T(),g;c&&(g=a.S(c,1));
a.Ub()&&!a.visitorOptedOut&&(a.wa()||(a.fid=a.Nb()),a.Xb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(b.getTime()/1E3)),c=h.location,a.pageURL||(a.pageURL=c.href?c.href:c),a.referrer||a.Za||(c=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=c||void 0===c?void 0===c?"":c:p.document.referrer),a.Za=1,a.referrer=a.Lb(a.referrer),a.u("_g")),a.Qb()&&!a.abort&&(e&&a.V("TARGET")&&!a.supplementalDataID&&e.getSupplementalDataID&&
(a.supplementalDataID=e.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.V("AAM")||(a.contextData["cm.ssf"]=1),a.Rb(),a.vb(),f+=a.Pb(),a.rb(d,f),a.u("_t"),a.referrer="")));a.Ca();g&&a.S(g,1)};a.t=a.track=function(c,b){b&&a.S(b);a.Y=!0;a.isReadyToTrack()?null!=a.j&&0<a.j.length?(a.ta(c),a.p()):a.Ea(c):a.ta(c)};a.vb=function(){a.writeSecureCookies&&!a.ssl&&a.$a()};a.$a=function(){a.contextData.excCodes=a.contextData.excCodes?a.contextData.excCodes:[];a.contextData.excCodes.push(1)};
a.Ca=function(){a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=h.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=a.useBeacon=a.referrer=0;a.contextData&&a.contextData.excCodes&&(a.contextData.excCodes=0)};a.Ba=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Ba.push([c,b]):a.debugTracking&&a.C("DEBUG: Non function type passed to registerPreTrackCallback")};
a.gb=function(c){a.ua(a.Ba,c)};a.Aa=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Aa.push([c,b]):a.debugTracking&&a.C("DEBUG: Non function type passed to registerPostTrackCallback")};a.fb=function(c){a.ua(a.Aa,c)};a.ua=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1].slice();e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.C(g.message)}}};a.tl=
a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.bodyClickTarget=c,a.bodyClickFunction=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||
"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.rb=function(c,b){var d=a.hb()+"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.ya()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.gb(d);a.eb(d);a.U()};a.hb=function(){var c=a.ib();return"http"+(a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(a.ya()?"10":"1")+"/JS-"+a.version+(a.$b?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")};a.ya=function(){return a.AudienceManagement&&
a.AudienceManagement.isReady()||0!=a.usePostbacks};a.ib=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.kb()+"."+c+".2o7.net");return b};a.kb=function(){var c=a.visitorNamespace;c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,""));return c};a.Ya=/{(%?)(.*?)(%?)}/;a.fc=RegExp(a.Ya.source,"g");a.Kb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=
c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.fc),e=0;e<f.length;++e){var g=f[e],k=g.match(a.Ya),h="";"%"==k[1]&&"timezone_offset"==k[2]?h=(new Date).getTimezoneOffset():"%"==k[1]&&"timestampz"==k[2]&&(h=a.Ob());d.c=d.c.replace(g,a.escape(h))}}};a.Ob=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+
(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.pa={};a.doPostbacks=function(c){if("object"==typeof c)if(a.Kb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=
c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.pa[d.id]=new Image,a.pa[d.id].alt="",a.pa[d.id].src=d.c)}};a.eb=function(c){a.i||a.Sb();a.i.push(c);a.ia=a.A();a.Xa()};a.Sb=function(){a.i=a.Vb();a.i||(a.i=[])};a.Vb=function(){var c,b;if(a.oa()){try{(b=h.localStorage.getItem(a.ma()))&&(c=h.JSON.parse(b))}catch(d){}return c}};a.oa=function(){var c=!0;a.trackOffline&&a.offlineFilename&&h.localStorage&&h.JSON||(c=!1);return c};a.Na=function(){var c=
0;a.i&&(c=a.i.length);a.l&&c++;return c};a.U=function(){if(a.l&&(a.v&&a.v.complete&&a.v.D&&a.v.R(),a.l))return;a.Oa=q;if(a.na)a.ia>a.N&&a.Va(a.i),a.qa(500);else{var c=a.Eb();if(0<c)a.qa(c);else if(c=a.La())a.l=1,a.Wb(c),a.Zb(c)}};a.qa=function(c){a.Oa||(c||(c=0),a.Oa=setTimeout(a.U,c))};a.Eb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.A()-a.Ta;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.La=function(){if(0<a.i.length)return a.i.shift()};a.Wb=function(c){if(a.debugTracking){var b=
"AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.C(b)}};a.wa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.X=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(v){t=null}t&&"y"==t.x?(a.X=!0,a.W=function(a){return JSON.parse(a)}):h.$&&h.$.parseJSON?(a.W=function(a){return h.$.parseJSON(a)},a.X=!0):a.W=function(){return null};a.Zb=function(c){var b,d,f;a.mb(c)&&(d=1,b={send:function(c){a.useBeacon=!1;navigator.sendBeacon(c)?b.R():b.ga()}});
!b&&a.wa()&&2047<c.length&&(a.ab()&&(d=2,b=new XMLHttpRequest),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.X?b.Ga=!0:b=0));!b&&a.ec&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||
"undefined"===typeof h.InstallTrigger||(b.abort=function(){b.src=q}));b.Ua=Date.now();b.Ia=function(){try{b.D&&(clearTimeout(b.D),b.D=0)}catch(a){}};b.onload=b.R=function(){b.Ua&&(a.ja=Date.now()-b.Ua);a.fb(c);b.Ia();a.Ib();a.ca();a.l=0;a.U();if(b.Ga){b.Ga=!1;try{a.doPostbacks(a.W(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.ga=function(){b.Ia();(a.trackOffline||a.na)&&a.l&&a.i.unshift(a.Hb);a.l=0;a.ia>a.N&&a.Va(a.i);a.ca();a.qa(500)};b.onreadystatechange=function(){4==b.readyState&&(200==
b.status?b.R():b.ga())};a.Ta=a.A();if(1===d)b.send(c);else if(2===d)f=c.indexOf("?"),d=c.substring(0,f),f=c.substring(f+1),f=f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,""),b.open("POST",d,!0),b.withCredentials=!0,b.send(f);else if(b.src=c,3===d){if(a.Ra)try{f.removeChild(a.Ra)}catch(e){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ra=a.v}b.D=setTimeout(function(){b.D&&(b.complete?b.R():(a.trackOffline&&b.abort&&b.abort(),b.ga()))},5E3);a.Hb=c;a.v=h["s_i_"+a.replace(a.account,",","_")]=
b;if(a.useForcedLinkTracking&&a.J||a.bodyClickFunction)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.da=setTimeout(a.ca,a.forcedLinkTrackingTimeout)};a.mb=function(c){var b=!1;navigator.sendBeacon&&(a.ob(c)?b=!0:a.useBeacon&&(b=!0));a.xb(c)&&(b=!1);return b};a.ob=function(a){return a&&0<a.indexOf("pe=lnk_e")?!0:!1};a.xb=function(a){return 64E3<=a.length};a.ab=function(){return"undefined"!==typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?!0:!1};a.Ib=function(){if(a.oa()&&
!(a.Sa>a.N))try{h.localStorage.removeItem(a.ma()),a.Sa=a.A()}catch(c){}};a.Va=function(c){if(a.oa()){a.Xa();try{h.localStorage.setItem(a.ma(),h.JSON.stringify(c)),a.N=a.A()}catch(b){}}};a.Xa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.La()}};a.forceOffline=function(){a.na=!0};a.forceOnline=function(){a.na=!1};a.ma=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.A=function(){return(new Date).getTime()};
a.Pa=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.$b=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.S(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=
0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:h.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+
c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){return document.documentMode?document.documentMode:a.xa()?7:null}};a.F="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.F.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ka="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.ka.slice(0);a.Fa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout writeSecureCookies useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.O.push("prop"+m)),a.g.push("eVar"+m),a.O.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");a.g=a.g.concat(m);a.F=a.F.concat(m);a.ssl=0<=h.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.writeSecureCookies=
!1;a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";a.P="s_sq";a.Ta=0;a.ia=0;a.N=0;a.Sa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=h;a.d=h.document;a.ca=function(){a.da&&(h.clearTimeout(a.da),a.da=q);a.bodyClickTarget&&a.J&&a.bodyClickTarget.dispatchEvent(a.J);a.bodyClickFunction&&("function"==typeof a.bodyClickFunction?a.bodyClickFunction():a.bodyClickTarget&&a.bodyClickTarget.href&&(a.d.location=a.bodyClickTarget.href));a.bodyClickTarget=
a.J=a.bodyClickFunction=0};a.Wa=function(){a.b=a.d.body;a.b?(a.r=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ha)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.r,!1);else{a.b.removeEventListener("click",a.r,!0);a.Ha=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
0;else{var k=a.M=a.clickObject;a.ha&&(clearTimeout(a.ha),a.ha=0);a.ha=setTimeout(function(){a.M==k&&(a.M=0)},1E4);f=a.Na();a.track();if(f<a.Na()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Pa(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||h.name&&d==h.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=new h.MouseEvent}if(b){try{b.initMouseEvent("click",
c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.bodyClickTarget=c.target,a.J=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.r):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||
0<=navigator.userAgent.indexOf("Firefox/2")&&h.MouseEvent)&&(a.Ha=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.r,!0)),a.b.addEventListener("click",a.r,!1))):setTimeout(a.Wa,30)};a.ec=a.xa();a.Jb();a.lc||(r?a.setAccount(r):a.C("Error, missing Report Suite ID in AppMeasurement initialization"),a.Wa(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,h=window.s_c_il,q,p,m=r.split(","),s,u,t=0;if(h)for(q=0;!t&&q<h.length;){a=h[q];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(p=a.account?a.account:a.oun,p=a.allAccounts?a.allAccounts:p.split(","),s=0;s<m.length;s++)for(u=0;u<p.length;u++)m[s]==p[u]&&(t=1);q++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,h,q,p;if(a)for(h=0;h<a.length;h++)q=a[h],p=s_gi(q.oun),p.setAccount(q.un),p.setTagContainer(q.tagContainerName);r.s_giq=0}s_pgicq();
