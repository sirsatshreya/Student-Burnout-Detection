document.addEventListener("DOMContentLoaded", function(){


const checkins =
JSON.parse(localStorage.getItem("checkins")) || [];



const total =
document.getElementById("totalCheckins");


if(total){

total.textContent = checkins.length;

}



if(checkins.length === 0){


setText("avgStress","0 / 10");

setText("currentStreak","0 Days");

setText("longestStreak","0 Days");


return;


}



calculateStatistics();

loadCharts();



});




// ============================
// SAFE TEXT
// ============================


function setText(id,value){


const element =
document.getElementById(id);


if(element){

element.textContent=value;

}


}





// ============================
// STATISTICS
// ============================


function calculateStatistics(){



let totalStress = 0;



checkins.forEach(item=>{


totalStress += Number(item.stress || 0);


});



const averageStress =
(totalStress/checkins.length).toFixed(1);



setText(
"avgStress",
averageStress+" / 10"
);



setText(
"currentStreak",
calculateCurrentStreak()+" Days"
);



setText(
"longestStreak",
calculateLongestStreak()+" Days"
);



}





// ============================
// CURRENT STREAK
// ============================


function calculateCurrentStreak(){



if(checkins.length===0){

return 0;

}



let streak = 1;



let sorted =
[...checkins].sort(
(a,b)=>new Date(a.date)-new Date(b.date)
);



for(
let i=sorted.length-1;
i>0;
i--
){


let today =
new Date(sorted[i].date);


let previous =
new Date(sorted[i-1].date);



let diff =
(today-previous)
/
(1000*60*60*24);



if(diff<=1){

streak++;

}

else{

break;

}



}



return streak;



}







// ============================
// LONGEST STREAK
// ============================


function calculateLongestStreak(){



if(checkins.length===0){

return 0;

}



let sorted =
[...checkins].sort(
(a,b)=>new Date(a.date)-new Date(b.date)
);



let longest=1;

let current=1;



for(let i=1;i<sorted.length;i++){



let previous =
new Date(sorted[i-1].date);



let today =
new Date(sorted[i].date);



let diff =
(today-previous)
/
(1000*60*60*24);



if(diff<=1){

current++;

}

else{

current=1;

}



if(current>longest){

longest=current;

}



}



return longest;



}







// ============================
// CHARTS
// ============================


function loadCharts(){



const labels =
checkins.map(item=>item.date);



const stress =
checkins.map(item=>Number(item.stress));



const sleep =
checkins.map(item=>Number(item.sleep));



const study =
checkins.map(item=>Number(item.study));



const motivation =
checkins.map(item=>Number(item.motivation));





createChart(
"stressChart",
"line",
"Stress Level",
labels,
stress
);



createChart(
"sleepChart",
"line",
"Sleep Hours",
labels,
sleep
);



createChart(
"studyChart",
"bar",
"Study Hours",
labels,
study
);



createChart(
"motivationChart",
"line",
"Motivation Level",
labels,
motivation
);



}







function createChart(
id,
type,
label,
labels,
data
){



const canvas =
document.getElementById(id);



if(!canvas){

return;

}



new Chart(canvas,{

type:type,


data:{


labels:labels,


datasets:[{


label:label,


data:data,


fill:true,


tension:.4,


borderWidth:2


}]


},


options:{


responsive:true,


maintainAspectRatio:false


}


});



}