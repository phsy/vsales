var TipBoxUtil = {
	indx : 0,
	next : function(){
		return this.indx++;
	}
};
var TipBox = function(opts){
	//下标序列
	var indx = TipBoxUtil.next();
	//要使用弹出显示的目标层ID
	var targetId = opts.target||"";

	//关闭按钮ID，以便于给该按钮绑定关闭事件
	var closeBtnId = opts.closeBtn||"";

	//包装目标层的窗口层
	var frotId = "_fontDiv" + indx;
	var frotDragabled = opts.dragable||true;
	var frotzIndex = opts.fzindex||100001;

	//作为遮罩的背景层
	var bakId = "_backDiv" + indx;
	var bakAlpha = opts.balpha||50;
	var bakColor = opts.bcolor||"#000";
	var bakzIndex = opts.bzindex||100000;

	var get = function(){
		var arg = arguments;
		if(arg.length==0){
			return null;
		}else if(arg.length==1){
			return document.getElementById(arg[0]);
		}
	};

	var showBack = function(){
		var back = document.getElementById(bakId);
		var arrPageSizes = Util.getPageSize();
		if(back){
			back.style.display="block";
		}else{
			back = document.createElement('div');
			back.id = bakId;
			back.style.backgroundColor = bakColor;
			back.style.filter = "alpha(opacity=" + bakAlpha + ")";
			back.style.MozOpacity = "0.30";
			back.style.opacity = "0.30";
			back.style.position = "absolute";
			back.style.left = "0px";
			back.style.top = "0px";
			back.style.width = arrPageSizes[0] + "px";
			back.style.height = arrPageSizes[1] + "px";
			back.style.zIndex = bakzIndex;
			document.body.appendChild(back);
		}
	};

	var showBox = function(){
		var front = document.getElementById(frotId);
		var arrPageSizes = Util.getPageSize();
		var arrPageScroll = Util.getPageScroll();
		if(front){
			front.style.display="";
			front.style.left = arrPageScroll[0] + "px";
			front.style.top = (arrPageScroll[1] + (arrPageSizes[3] / 5)-100) + "px";
		}else{
			var content = get(targetId);
			if(content){
				front = document.createElement('div');
				front.id = frotId;
				front.style.width = "100%";
				front.style.position = "absolute";
				front.style.left = arrPageScroll[0] + "px";
				front.style.top = (arrPageScroll[1] + (arrPageSizes[3] / 5)-100) + "px";
				front.style.zIndex  = frotzIndex;			

				var closeBtns = new Array();
				if(closeBtnId.indexOf(",")>0)
					closeBtns=closeBtnId.split(",");
				else
					closeBtns.push(closeBtnId);
				for(var i=0;i<closeBtns.length;i++){
					var closeBtn = get(closeBtns[i]);
					if(closeBtn){
						closeBtn.onclick = closeBox;
					}
				}

				content.style.display="block";
				content.style.margin = "0 auto";
				front.appendChild(content);				
				document.body.appendChild(front);
			}
		}
		window.resize = function(){
			var arrPageSizes = Util.getPageSize();
			document.getElementById(bakId).style.width = arrPageSizes[0] + "px";
			document.getElementById(bakId).style.height = arrPageSizes[1] + "px";

			var arrPageScroll = Util.getPageScroll();
			front.style.left = arrPageScroll[0] + "px";
			front.style.top = (arrPageScroll[1] + (arrPageSizes[3] / 10)-100) + "px";
		};
		showBack();
	};

	var closeBox = function(){
		var back = get(bakId);
		back.style.display = "none";
		
		var front = get(frotId);
		front.style.display = "none";
	};

	return {
		show : showBox,
		close : closeBox
	}
};