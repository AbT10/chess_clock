
/* Image recognition */

// var img = document.getElementById("img2");

// var canvas = document.getElementById("canv");
// var canv = canvas.getContext("2d");

// canv.drawImage(img,0,0);

// var img_dat = canv.getImageData(0,0,28,28);

// console.log(img_dat);

// var dat = new Vector([4,784]);
// dat.arrange(img_dat.data);

// var fill_arr = [];

// for(var i = 0; i<784; i++){
// 	for(var j=0; j<4; j++){
//      		fill_arr.push(dat.array[j][i]);
// 	}
// }

// var img_vect = new Vector([784,4]);
// img_vect.arrange(fill_arr);
// console.log(img_vect);


/* text completion */

// var tag_name = "";
// var tag_open = false;
// (()=>{
// 	var txt = document.getElementById("text");
// 	txt.onkeypress = (e)=>{
// 		console.log("Key Pressed : " + e.key);
// 		if(e.keyCode === 60 && tag_open == false){
// 			tag_open = true;
// 			console.log("Tag is open");
// 			return;
// 		}

// 		if(tag_open == true){
// 			if(e.keyCode === 62){
// 				console.log("Tag initiation is closed");
// 				return;
// 			}
// 			else{
// 				tag_name += e.key;
// 			}
// 		}

// 		else if(tag_open === false){
// 			if(e.keyCode === 60){
// 				console.log("Tag close initiated");
// 				txt.value = (txt.value + `/${tag_name}>`);
// 				tag_open = false;
// 				tag_name = "";
// 			}
// 		}

// 	}
// })();

/* Game Play */

window.onload = ()=>{
	if(navigator.serviceWorker){
		console.log("Registering Service Worker!");
		navigator.serviceWorker.register('sw2.js')
		.then((reg)=>{
			console.log("Successfully Registered Service Worker!" + reg);
		})
		.catch((err)=>{
			console.log("An Error Occured while registering service worker.");
		});
}
}

var times = document.getElementsByClassName("choice");

var d1 = document.getElementById("clock_p1");
var d2 = document.getElementById("clock_p2");

var ad_tm = document.getElementById("adj_time");
var add = document.getElementById("add_time");
var menu = document.getElementById("Add_times");
var close = document.getElementById("close_menu");
var times = document.getElementsByClassName("time");
var form = document.getElementById("form");
var abort = document.getElementById("abort");
var submit = document.getElementById("submit_time");

submit.addEventListener("click",()=>{
	var p1 = document.getElementById("p1").value;
	var p2 = document.getElementById("p2").value;
	p1_pl.min = eval(p1);
	p2_pl.min = eval(p2);
	form.style.display = "none";
	menu.className="invi";
	disp_time();
})

abort.addEventListener("click",()=>{
	form.style.display = "none";
})

add.addEventListener("click",()=>{
	form.style.display ="flex";
})

ad_tm.addEventListener("click",()=>{
	menu.className = "flexy";
});

close.addEventListener("click",()=>{
	menu.className = "invi";
})

var p1_pl = {
	min : 0,
	sec : 0,
	min_hol : document.getElementById("p1_min"),
	sec_hol : document.getElementById("p1_sec") 
}

var p2_pl = {
	min : 0,
	sec : 0,
	min_hol : document.getElementById("p2_min"),
	sec_hol : document.getElementById("p2_sec") 	
}


var timer;

var rot_btn = document.getElementById("rotate_clock");
rot_btn.onclick = toggle;

function toggle(){
	d1.style.transform = "rotate(180deg)";
}

d1.addEventListener("click",()=>{start_timer(p2_pl)});
d2.addEventListener("click",()=>{start_timer(p1_pl)});

function start_timer(opponent){
	clearInterval(timer);
	timer = setInterval(()=>{update(opponent);},1000);
}

function update(time){
	if(time.min != 0 || time.sec != 0){
		if(time.sec === 0){
			time.sec = 59;
			time.min -= 1;
		}
		else{
			time.sec -= 1;
		}
	}
	else{
		console.log("Timer expired!!!");
		clearInterval(timer);
		}
	disp_time();
}


function disp_time(){
	if(p1_pl.min>9){
		p1_pl.min_hol.innerHTML = p1_pl.min;
	}
	else{
		p1_pl.min_hol.innerHTML = "0"+p1_pl.min;
	}
	if(p2_pl.min>9){
		p2_pl.min_hol.innerHTML = p2_pl.min;
	}
	else{
		p2_pl.min_hol.innerHTML = "0"+p2_pl.min;
	}
	if(p1_pl.sec>9){
		p1_pl.sec_hol.innerHTML = p1_pl.sec;
	}
	else{
		p1_pl.sec_hol.innerHTML = "0"+p1_pl.sec;
	}
	if(p2_pl.sec>9){
		p2_pl.sec_hol.innerHTML = p2_pl.sec;
	}
	else{
		p2_pl.sec_hol.innerHTML = "0"+p2_pl.sec;
	} 
}

function set_timer(ch){
	for(var i=0; i<times.length; i++){
		if(ch === times[i]){
			p1_pl.min = p2_pl.min = (i+1)*5;
			p1_pl.sec = p2_pl.sec = 0;
			clearInterval(timer);
			disp_time();
			menu.className = "invi";
		}
		else{
			times[i].style.border = "none";
		}
	}
}
