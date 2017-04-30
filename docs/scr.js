
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
var d1 = document.getElementById("clock_p1");
var d2 = document.getElementById("clock_p2");

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
	}
	disp_time();
}


function disp_time(){
	console.log(p1_pl.min + " " + p1_pl.sec);
	console.log(p2_pl.min + " " + p2_pl.sec);
	p1_pl.min_hol.innerHTML = p1_pl.min;
	p1_pl.sec_hol.innerHTML = p1_pl.sec;
	p2_pl.min_hol.innerHTML = p2_pl.min;
	p2_pl.sec_hol.innerHTML = p2_pl.sec; 
}

function set_up(){
	var url = location.href;

	var start_i = url.indexOf('?') + 1;
	var en = url.length + 1;
	var times = url.slice(start_i,en-1).split('&');

	p1_pl.min = eval(times[0]);
	p2_pl.min = eval(times[1]);

	disp_time();

}

window.onload = set_up;