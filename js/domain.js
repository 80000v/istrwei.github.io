var okDomain = new Array();
var errDomain = new Array();
var smDomain = 'b|p|m|f|d|t|n|l|g|k|h|j|q|x|zh|ch|sh|r|z|c|s|y|w';
var cTypeMsg = "域名类型暂时只支持数字和声母";
var cLenMsg = "域名长度必须是数字,最多支持6";
$().ready(function(){
	$("#btnReturn").hide(0);
	$("#domainname").focus(function(){
		if($(this).val()=="please enter domain name"){
			$(this).val("");
		}
		$("#msg").html("");
	});
	$("#domainname").blur(function(){
		if($(this).val()==""){
			$(this).val("please enter domain name");
		}
	});
	$("#btnReturn").click(function(){
		$("#domainname").show();
		$("#btnCheck").show();
		$(this).hide();
		$("#result").html("");
	});
	$("#btnCheck").click(function(){
		okDomain.length = 0;
		errDomain.length = 0;
		var domain = $.trim($("#domainname").val());
		if(domain == "please enter domain name")
		{
			alert("please enter you want to check domain");
			return false;
		}
		var allDomain = domain.split('\n');
		for(var n=0;n< allDomain.length;n++){
			if(allDomain[n].indexOf('.')!=-1){
				okDomain.push(allDomain[n]);
			}else{
				errDomain.push(allDomain[n]);
			}
		}
		showDomainInfo();
		$("#domainname").val("").hide();
		$("#btnCheck").hide();
	});
	$("#btnCreate").click(function(){
		createDnBox();
	});
	$("#btnAgain").click(function(){
		btnAgain();
	});
	showAllTld();
});

function showAllTld(){
	var dnHtml="域名后缀：";
	for (var i = 0; i < whoisTld.length - 1; i++) {
		dnHtml+="<label class=\"checkbox-inline\"><input type='checkbox' name='cType' value='."+whoisTld[i]+"' />"+"."+whoisTld[i]+"</label>";
	};
	$("#tld").html(dnHtml);
}

function btnAgain(){
	var num =0;
	$("#resultDiv tr").each(function(i){
		var td = $(this).find("td");
		if(td.eq(1).html()=="---" && td.eq(4).html()==""){
			var dn = td.eq(0).html();
			checkMyDomain(dn,i);
			num++;
		}
	});
	if(num<1){
		$("#resultDiv tr").each(function(i){
			if(td.eq(1).html()=="正在发送请求..." && td.eq(4).html()==""){
				var dn = td.eq(0).html();
				checkMyDomain(dn,i);
			}
		});
	}
}

function createDnBox(){
	var cLen = $("#cLen").val();
	var cType = $("#cType").val();
	var cTld = $("#tld").val();
	if(cType!=1 && cType!=2){
		alert(cTypeMsg);
		return false;
	}
	if(parseInt(cLen)!=cLen || cLen> 6){
		alert(cLenMsg);
		return false;
	}
	var cDomain = "";
	if(cType==2){
		cDomain = createDnBoxNum(cLen);
	}else{
		cDomain = createDnBoxSm(cLen);
	}
	$("#domainname").val(cDomain);
}

function createDnBoxSm(cLen){
	var cDomain="";
	var smArr = smDomain.split("|");
	var result = choose(smArr, cLen);
	$("#tld input:checkbox:checked").each(function(){
		for(var i=0 , len = result.length;i < len; i++){
			var dnBody = "";
			for(var j=0;j<result[i].length;j++){
				dnBody+=result[i][j];
			}
			cDomain+=dnBody+$(this).val()+"\n";
	  	}
  	});
	return cDomain;
}

function choose(arr, size ){
  var allResult = [];

  (function(arr, size, result){
    var arrLen = arr.length;
    if(size > arrLen){
      return;
    }
    if(size == arrLen){
      allResult.push([].concat(result, arr))
    }else{
      for(var i =0 ; i < arrLen; i++){
        var newResult = [].concat(result);
        newResult.push(arr[i]);

        if(size == 1){
          allResult.push(newResult);
        }else{
          var newArr = [].concat(arr);
          newArr.splice(0, i +　1);
          arguments.callee(newArr, size - 1, newResult);
        }
      }
    }
  })(arr, size, []);

  return allResult;
}

function createDnBoxNum(cLen){
	var lenArrStart = new Array(0,10,100,1000,10000,100000,1000000);
	var lenArr = new Array(9,99,999,9999,99999,999999,9999999);
	var cDomain = '';
	$("#tld input:checkbox:checked").each(function(){
		for(var i=lenArrStart[cLen-1]; i<=lenArr[cLen-1];i++)
		{
			cDomain+=i+$(this).val()+"\n";
		}
	});
	return cDomain;
}

function showDomainInfo(){
	$("#btnReturn").show();
	if(errDomain.length>0){
		$("#msg").html("域名格式错误:"+errDomain.join(","));
	}
	if(okDomain.length>0){
		showCheckDiv();
		for(var j=0;j<okDomain.length;j++){
			if(okDomain[j]==""){
				continue;
			}
			var forHtml='';
			forHtml+="<tr id='d"+j+"'><td>"+okDomain[j]+"</td><td>...</td><td></td><td></td><td></td><td></td></tr>";
			$("#resultDiv").append(forHtml);
			checkMyDomain(okDomain[j],j);
		}
	}
}

function showCheckDiv(){
	var html="<div><table class='table table-striped'><thead><tr><th>域名</th><th>注册者</th><th>注册时间</th><th>过期时间</th><th>注册商</th><th>Email</th></tr></thead><tbody id='resultDiv'>";
	html+="</tbody></table></div>";
	$("#result").html(html);
}