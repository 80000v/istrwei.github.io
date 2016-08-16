function formatCn(whoisInfo,ulIndex){
	var userName =whoisInfo.match(/Registrant: (\S+)/i);
	var regTime =whoisInfo.match(/Registration Time: (\S+)/i);
	var expTime =whoisInfo.match(/Expiration Time: (\S+)/i);
	var registrar =whoisInfo.match(/Sponsoring Registrar: (\S+)/i);
	var email =whoisInfo.match(/Registrant Contact Email: (\S+)/i);
	insertHtml(ulIndex,userName,regTime,expTime,registrar,email);
}

function formatInfo(whoisInfo,ulIndex) {
	var userName =whoisInfo.match(/Registrant Name:(.*)/i);
	var regTime =whoisInfo.match(/Creation Date:(.*)/i);
	var expTime =whoisInfo.match(/Registry Expiry Date:(.*)/i);
	var registrar =whoisInfo.match(/Sponsoring Registrar:(.*)/i);
	var email =whoisInfo.match(/Registrant Email:(.*)/i);
	insertHtml(ulIndex,userName,regTime,expTime,registrar,email);
}

function formatMe(whoisInfo,ulIndex) {
	var userName =whoisInfo.match(/Registrant Name:(.*)/i);
	var regTime =whoisInfo.match(/Domain Create Date:(.*)/i);
	var expTime =whoisInfo.match(/Domain Expiration Date:(.*)/i);
	var registrar =whoisInfo.match(/Sponsoring Registrar:(.*)/i);
	var email =whoisInfo.match(/Registrant E-mail:(.*)/i);
	insertHtml(ulIndex,userName,regTime,expTime,registrar,email);
}

function formatOrg(whoisInfo,ulIndex) {
	var userName =whoisInfo.match(/Registrant Name:(.*)/i);
	var regTime =whoisInfo.match(/Creation Date:(.*)/i);
	var expTime =whoisInfo.match(/Registry Expiry Date:(.*)/i);
	var registrar =whoisInfo.match(/Sponsoring Registrar:(.*)/i);
	var email =whoisInfo.match(/Registrant Email:(.*)/i);
	insertHtml(ulIndex,userName,regTime,expTime,registrar,email);
}

function formatAsia(whoisInfo,ulIndex) {
	var userName =whoisInfo.match(/Registrant Name:(.*)/i);
	var regTime =whoisInfo.match(/Domain Create Date:(.*)/i);
	var expTime =whoisInfo.match(/Domain Expiration Date:(.*)/i);
	var registrar =whoisInfo.match(/Sponsoring Registrar:(.*)/i);
	var email =whoisInfo.match(/Registrant E-mail:(.*)/i);
	insertHtml(ulIndex,userName,regTime,expTime,registrar,email);
}

function formatIn(whoisInfo,ulIndex) {
	var userName =whoisInfo.match(/Registrant Name:(.*)/i);
	var regTime =whoisInfo.match(/Created On:(.*)/i);
	var expTime =whoisInfo.match(/Expiration Date:(.*)/i);
	var registrar =whoisInfo.match(/Sponsoring Registrar:(.*)/i);
	var email =whoisInfo.match(/Registrant Email:(.*)/i);
	insertHtml(ulIndex,userName,regTime,expTime,registrar,email);
}

function formatTw(whoisInfo,ulIndex) {
	var userName =whoisInfo.match(/Registrant:\s+(\S+)/i);
	var regTime =whoisInfo.match(/Record created on\s+(\d+-\d+-\d+)/i);
	var expTime =whoisInfo.match(/Record expires on\s+(\d+-\d+-\d+)/i);
	var registrar = new Array("","---");
	var email =whoisInfo.match(/Registrant:\s+.*\s+.*?(\S+@.*)/i);
	insertHtml(ulIndex,userName,regTime,expTime,registrar,email);
}

function formatError(whois){
	if(whois==""){
		return "---";
	}
	if(whois.match(/(domain you requested is prohibited)/i)!=null){
		return "禁止注册的域名";
	}
	if(whois.match(/(No matching record|No match for|NOT FOUND)/i)!=null){
		return "未注册";
	}
	return true;
}

function insertHtml(ulIndex,userName,regTime,expTime,registrar,email) {
	var td =$("#d"+ulIndex).find("td");
	console.log(userName);
	if(userName[0]==false){
		td.eq(1).html(userName[1]);
	}else if(userName==null || regTime==null){
		td.eq(1).html("---");
	}else{
		expIndex = expTime.length
		if(expIndex < 1){
			td.eq(1).html('规则匹配失败');
			return false;
		}
		td.eq(1).html(userName[1]);
		td.eq(2).html(regTime[1]);
		td.eq(3).html(expTime[expIndex-1]);
		td.eq(4).html(registrar[1]);
		td.eq(5).html(email[1]);	
	}	
}

function formatWhois(whoisInfo,tld,ulIndex,domain,second){
	result = formatError(whoisInfo)
	if(result!=true && second=="first"){
		insertHtml(ulIndex,new Array(false,result),'','','','');
		return true;
	}
	switch(tld){
		case 'cn':
			formatCn(whoisInfo,ulIndex);
			break;
		case 'info':
			formatInfo(whoisInfo,ulIndex);
			break;
		case 'me':
			formatMe(whoisInfo,ulIndex);
			break;
		case 'org':
			formatOrg(whoisInfo,ulIndex);
			break;
		case 'asia':
			formatAsia(whoisInfo,ulIndex);
			break;
		case 'in':
			formatIn(whoisInfo,ulIndex);
			break;
		case 'tw':
			formatTw(whoisInfo,ulIndex);
			break;
		case 'com':
		case 'net':
		case 'cc':
		case 'tv':
			if(second=="first"){
				formatCom(whoisInfo,ulIndex,tld,domain);
			}else{
				formatThirdWhois(whoisInfo,ulIndex);
			}
			break;
	}
}

function formatCom(whois,ulIndex,tld,domain) {
	domain = domain.replace("=","");
	var userName = new Array("---","...");
	var search = "Domain Name: "+domain;
	var info = whois.substring(whois.toLowerCase().indexOf(search.toLowerCase()));
	var server =info.match(/Whois Server: (\S+)/i);
	var regTime =info.match(/Creation Date: (\S+)/i);
	var expTime =info.match(/(Expiration Date: |Registry Expiry Date: )(\S+)/i);
	var registrar =info.match(/Registrar: (.*)/i);
	if(whois==null){
		userName[1] = "---";
	}
	insertHtml(ulIndex,userName,regTime,expTime,registrar,new Array("",""));
	var more = $("#moreinfo").is(":checked");
	if(whois && more==true){
		checkSocket(server[1].toLowerCase(),domain,tld,ulIndex,'formatThirdWhois');
	}
}

function formatThirdWhois(whoisInfo,ulIndex) {
	var userName =whoisInfo.match(/Registrant Name:(.*)/i);
	var email =whoisInfo.match(/Registrant Email:(.*)/i);
	var ul =$("#d"+ulIndex);
	var td = ul.find("td");
	if(userName==null || userName.length < 2){
		td.eq(1).html("---");
		td.eq(5).html("");
	}else{
		td.eq(5).html((email==null || email=="") ?"-@-": email[1]);
		td.eq(1).html(userName[1]);
	}
}