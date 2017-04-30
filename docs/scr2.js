var times = document.getElementsByClassName("choice");

var add_btn = document.getElementById("add_time");
var play_btn = document.getElementById("play");
var form = document.getElementById("c_time");
var sub = document.getElementById("submit");

var p1 = 0,p2 = 0;

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

add_btn.onclick = display_form;
play_btn.onclick = ()=>{
	window.location = "aa.html?p1="+p1+"&p2="+p2;
}
sub.onclick = set_new_times;


function set_times(ch){
	for(var i=0; i<times.length; i++){
		if(ch === times[i]){
			p1 = p2 = (i+1)*5;
			times[i].style.border = "5px solid red";
		}
		else{
			times[i].style.border = "none";
		}
	}
}

function display_form(){
	form.className = "visible";
}

function set_new_times(){
	console.log("times added");
	for(var i of times){
		i.style.border = "none";
	}
	p1 = document.getElementById("p1_time").value;
	p2 = document.getElementById("p2_time").value;
	form.className = "invi";
}


