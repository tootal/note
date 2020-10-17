function randint(a,b){
	return parseInt(Math.random()*(b-a+1),10);
}
var pi,pj,cnt=0,cntSpan;
function countInv(arr){
	var cntInv=0;
	// console.log(arr);
	for(var i=0;i<15;i++){
		for(var j=i+1;j<16;j++){
			if(arr[i]>arr[j]){
				cntInv=cntInv+1;
			}
		}
	}
	return cntInv;
}
function genarator(){
	var arr=new Array(16);
	for(var i=0;i<16;i++){
		arr[i]=i;
	}
	do{
		shuffle(arr);
		for(var i=0;i<16;i++){
			if(arr[i]==0){
				pi=Math.floor(i/4);
				pj=i%4;
				break;
			}
		}
		// console.log(arr);
		// console.log(pi,pj,countInv(arr));
		// console.log((pi+pj+countInv(arr))&1);
	}while(((pi+pj+countInv(arr))&1)==0);
	return arr;
}
function shuffle(arr){
	for(var i=0;i<arr.length;i++){
		var pos=randint(i,arr.length-1);
		var temp=arr[i];
		arr[i]=arr[pos];
		arr[pos]=temp;
	}
}
function create(){
	var arr=genarator();
	// console.log(arr);
	var puzzle=document.getElementById('puzzle');
	var table=document.createElement('table');
	table.border="1";
	table.style.borderCollapse="collapse";
	puzzle.appendChild(table);
	for(var i=0;i<4;i++){
		row=document.createElement('tr');
		table.appendChild(row);
		for(var j=0;j<4;j++){
			cell=document.createElement('td');
			if(arr[i*4+j]!=0){
				cell.innerText=arr[i*4+j];
			}
			cell.style.textAlign="center";
			// cell.style.padding="5px";
			cell.style.width="50px";
			cell.style.height="50px";
			row.appendChild(cell);		
		}
	}
	var tip=document.createElement('p');
	cntSpan=document.createElement('span');
	cntSpan.innerText="0";
	tip.innerText="Move Count: ";
	tip.appendChild(cntSpan);
	puzzle.appendChild(tip);
}
function getCell(x,y){
	var table=document.getElementById("puzzle").firstChild;
	return table.childNodes[x].childNodes[y];
}
function move_up(){
	if(pi<3){
		getCell(pi,pj).innerText=getCell(pi+1,pj).innerText;
		getCell(pi+1,pj).innerText="";
		pi=pi+1;
		cnt=cnt+1;
		cntSpan.innerText=cnt;
	}
}
function move_down(){
	if(pi>0){
		getCell(pi,pj).innerText=getCell(pi-1,pj).innerText;
		getCell(pi-1,pj).innerText="";
		pi=pi-1;
		cnt=cnt+1;
		cntSpan.innerText=cnt;
	}
}
function move_left(){
	if(pj<3){
		getCell(pi,pj).innerText=getCell(pi,pj+1).innerText;
		getCell(pi,pj+1).innerText="";
		pj=pj+1;
		cnt=cnt+1;
		cntSpan.innerText=cnt;
	}
}
function move_right(){
	if(pj>0){
		getCell(pi,pj).innerText=getCell(pi,pj-1).innerText;
		getCell(pi,pj-1).innerText="";
		pj=pj-1;
		cnt=cnt+1;
		cntSpan.innerText=cnt;
	}
}
var startX,startY;
function listen(){
	document.onkeydown=function(e){
		var e=e?e:window.event;
		if(e.keyCode==87||e.keyCode==75||e.keyCode==38){//UP
			// console.log("up",pi,pj);
			move_up();
			return false;
		}else if(e.keyCode==83||e.keyCode==74||e.keyCode==40){//DOWN
			// console.log("down",pi,pj);
			move_down();
			return false;
		}else if(e.keyCode==65||e.keyCode==72||e.keyCode==37){//LEFT
			// console.log("left",pi,pj);
			move_left();
			return false;
		}else if(e.keyCode==68||e.keyCode==76||e.keyCode==39){//RIGHT
			// console.log("right",pi,pj);
			move_right();
			return false;
		}
		
	}
	document.getElementById("puzzle").addEventListener("touchstart",function(e){
		e.preventDefault();
		startX=e.originalEvent.changedTouches[0].pageX;
		startY=e.originalEvent.changedTouches[0].pageY;
	});
	document.getElementById("puzzle").addEventListener("touchmove",function(e){
		e.preventDefault();
		moveEndX=e.originalEvent.changedTouches[0].pageX;
		moveEndY=e.originalEvent.changedTouches[0].pageY;
		X=moveEndX-startX;
		Y=moveEndY-startY;
		if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
			move_right();
		}else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
			move_left();
		}else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
			move_down();
		}else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
			move_up();
		}else{
			// alert("just touch");
		}
	});
}
create();
listen();