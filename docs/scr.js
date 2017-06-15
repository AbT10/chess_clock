// Service worker registration

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

// Getting DOM Elements 

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
var reset  = document.getElementById("reset");

//Handling button clicks

submit.addEventListener("click",()=>{
	var p1 = document.getElementById("p1").value;
	var p2 = document.getElementById("p2").value;
	if(eval(p1)&&eval(p2)){
		p1_pl.min = eval(p1);
		p2_pl.min = eval(p2);
		form.style.display = "none";
		menu.className="invi";
		disp_time(p1_pl);
		disp_time(p2_pl);
	}
	else{
		var ips = document.getElementsByClassName('ip');
		ips.forEach(i=>{
			i.value = '';
		});
	}
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

reset.addEventListener("click",reset_timers);

// Player Definitions

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
rot_btn.addEventListener('click',toggle);

function toggle(){
	if(d1.classList.contains('rotated')){
		d1.classList.remove('rotated');
	}
	else d1.classList.add('rotated');
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
	disp_time(time);
}


function disp_time(player){
	if(player.min>9){
		player.min_hol.innerHTML = player.min;
	}
	else{
		player.min_hol.innerHTML = "0"+player.min;
	}
	// if(p2_pl.min>9){
	// 	p2_pl.min_hol.innerHTML = p2_pl.min;
	// }
	// else{
	// 	p2_pl.min_hol.innerHTML = "0"+p2_pl.min;
	// }
	if(player.sec>9){
		player.sec_hol.innerHTML = player.sec;
	}
	else{
		player.sec_hol.innerHTML = "0"+player.sec;
	}
	// if(p2_pl.sec>9){
	// 	p2_pl.sec_hol.innerHTML = p2_pl.sec;
	// }
	// else{
	// 	p2_pl.sec_hol.innerHTML = "0"+p2_pl.sec;
	// } 
}

function set_timer(ch){
	for(var i=0; i<times.length; i++){
		if(ch === times[i]){
			p1_pl.min = p2_pl.min = (i+1)*5;
			p1_pl.sec = p2_pl.sec = 0;
			clearInterval(timer);
			disp_time(p1_pl);
			disp_time(p2_pl);
			menu.className = "invi";
		}
		else{
			times[i].style.border = "none";
		}
	}
}


function reset_timers (){
	p1_pl.min = p1_pl.sec = p2_pl.min = p2_pl.sec = 0;
	disp_time(p1_pl);
	disp_time(p2_pl);
}
