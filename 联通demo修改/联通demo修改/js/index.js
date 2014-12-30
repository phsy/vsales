function setTab(name,cursel,n){
	
for(i=1;i<=n;i++){
	
var con=document.getElementById("con_"+name+"_"+i);

con.style.display=i==cursel?"block":"none";
 
}
}