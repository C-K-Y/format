exports.printf=function(){console.log(exports.format.apply(this,arguments))};
exports.format=function(d){for(var f=1,i=[].slice.call(arguments),e=0,j=d.length,a="",b,g=!1,h,c=function(){return i[f++]},k=function(){for(var a="";d[e].match(/\d/);)a+=d[e++];return a.length>0?parseInt(a):null};e<j;++e)if(b=d[e],g)switch(g=!1,h=k(),b){case "b":a+=parseInt(c(),10).toString(2);break;case "c":b=c();a+=typeof b==="string"||b instanceof String?b:String.fromCharCode(parseInt(b,10));break;case "d":a+=parseInt(c(),10);break;case "f":a+=parseFloat(c()).toFixed(h||6);break;case "o":a+="0"+
parseInt(c(),10).toString(8);break;case "s":a+=c();break;case "x":a+="0x"+parseInt(c(),10).toString(16);break;case "X":a+="0x"+parseInt(c(),10).toString(16).toUpperCase();break;default:a+=b}else b==="%"?g=!0:a+=b;return a};exports.vsprintf=function(d,f){return exports.format.apply(this,[d].concat(f))};exports.sprintf=exports.format;
