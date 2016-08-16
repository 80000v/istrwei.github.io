var net = require('net');
function checkSocket(server,domain,tld,ulIndex,second){
var client = net.connect({host:server,port: 43},function() { //'connect' listener
    //console.log('connected to server!');
    client.write(domain+'\n');
});

var receiveWhois="";
 client.on('data', function(data) {
    receiveWhois += data.toString();
    });
client.on('end', function() {
    formatWhois(receiveWhois,tld,ulIndex,domain,second);
    // console.log('disconnected from server-'+ulIndex);
});
client.on('error',function(){
    formatWhois('',tld,ulIndex,domain,second);
});
}

function checkMyDomain(domain,ulIndex) {
    var domainArr = domain.split(".");
    var tld = domainArr[domainArr.length -1];
    tld = tld.toLowerCase();
    var index = whoisTld.indexOf(tld);
    if(index == -1){
        $("#d"+ulIndex+" td").eq("1").html("不支持的后缀");
    }else{
        var server = whoisIp[index];
        if(server!=""){
             $("#d"+ulIndex+" td").eq("1").html("正在发送请求...");
             if(whoisCont.indexOf(tld) !=-1){
                 domain="="+domain;
             }
             checkSocket(server,domain,tld,ulIndex,"first");
        }else{
            $("#d"+ulIndex+" td").eq("1").html("未配置whois server");
        }
    }
}