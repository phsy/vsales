var Util = {};
Util.getPageSize = function() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else {
				if (document.body.scrollHeight > document.body.offsetHeight) {
					xScroll = document.body.scrollWidth;
					yScroll = document.body.scrollHeight;
				} else {
					xScroll = document.body.offsetWidth;
					yScroll = document.body.offsetHeight;
				}
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {
				if (document.documentElement.clientWidth) {
					windowWidth = document.documentElement.clientWidth;
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else {
				if (document.documentElement && document.documentElement.clientHeight) {
					windowWidth = document.documentElement.clientWidth;
					windowHeight = document.documentElement.clientHeight;
				} else {
					if (document.body) {
						windowWidth = document.body.clientWidth;
						windowHeight = document.body.clientHeight;
					}
				}
			}
			if (yScroll < windowHeight) {
				pageHeight = windowHeight;
			} else {
				pageHeight = yScroll;
			}
			if (xScroll < windowWidth) {
				pageWidth = xScroll;
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
			return arrayPageSize;
};
Util.getPageScroll = function() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else {
				if (document.documentElement && document.documentElement.scrollTop) {
					yScroll = document.documentElement.scrollTop;
					xScroll = document.documentElement.scrollLeft;
				} else {
					if (document.body) {
						yScroll = document.body.scrollTop;
						xScroll = document.body.scrollLeft;
					}
				}
			}
			arrayPageScroll = new Array(xScroll, yScroll);
			return arrayPageScroll;
};
Util.EncodeURI = function(unzipStr,isCusEncode){
	if(isCusEncode){
		var zipArray = new Array();
		var zipstr = "";
		var lens = new Array();
		for(var i=0;i<unzipStr.length;i++){
			var ac = unzipStr.charCodeAt(i);
			zipstr += ac;
			lens = lens.concat(ac.toString().length);
		}
		zipArray = zipArray.concat(zipstr);
		zipArray = zipArray.concat(lens.join("O"));
		return zipArray.join("N");
	}else{
		var zipstr="";
		var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
		var tt= "";
		for(var i=0;i<unzipStr.length;i++){
			var chr = unzipStr.charAt(i);
			var c=Util.StringToAscii(chr);
			tt += chr+":"+c+"n";
			if(parseInt("0x"+c) > 0x7f){
				zipstr+=encodeURI(unzipStr.substr(i,1));
			}else{
				if(chr==" ")
					zipstr+="+";
				else if(strSpecial.indexOf(chr)!=-1)
					zipstr+="%"+c.toString(16);
				else
					zipstr+=chr;
			}
		}
		return zipstr;
	}
};
Util.DecodeURI = function(zipStr,isCusEncode){
	if(isCusEncode){
		var zipArray = zipStr.split("N");
		var zipSrcStr = zipArray[0];
		var zipLens;
		if(zipArray[1]){
			zipLens = zipArray[1].split("O");
		}else{
			zipLens.length = 0;
		}
		var uzipStr = "";
		for(var j=0;j<zipLens.length;j++){
			var charLen = parseInt(zipLens[j]);
			uzipStr+= String.fromCharCode(zipSrcStr.substr(0,charLen));
			zipSrcStr = zipSrcStr.slice(charLen,zipSrcStr.length);
		}
		return uzipStr;
	}else{
		var uzipStr="";
		for(var i=0;i<zipStr.length;i++){
			var chr = zipStr.charAt(i);
			if(chr == "+"){
				uzipStr+=" ";
			}else if(chr=="%"){
				var asc = zipStr.substring(i+1,i+3);
				if(parseInt("0x"+asc)>0x7f){
					uzipStr+=decodeURI("%"+asc.toString()+zipStr.substring(i+3,i+9).toString());
					i+=8;
				}else{
					uzipStr+=Util.AsciiToString(parseInt("0x"+asc));
					i+=2;
				}
			}else{
				uzipStr+= chr;
			}
		}
		return uzipStr;
	}
};
Util.StringToAscii = function(str){
	return str.charCodeAt(0).toString(16); 
};
Util.AsciiToString = function(asccode){
	return String.fromCharCode(asccode); 
};