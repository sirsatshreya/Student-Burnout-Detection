document.addEventListener("DOMContentLoaded", function(){


const checkinForm = document.getElementById("checkinForm");


if(!checkinForm){

    return;

}



checkinForm.addEventListener(
"submit",
saveCheckin
);




});





// ==========================
// SAVE CHECK-IN
// ==========================


function saveCheckin(event){


event.preventDefault();



const mood =
document.getElementById("mood").value;



const stress =
Number(document.getElementById("stress").value);



const sleep =
Number(document.getElementById("sleep").value);



const study =
Number(document.getElementById("study").value);



const motivation =
Number(document.getElementById("motivation").value);



const notes =
document.getElementById("notes").value.trim();





// ==========================
// VALIDATION
// ==========================


if(mood === ""){

alert("Please select your mood.");

return;

}



if(sleep <= 0){

alert("Please enter valid sleep hours.");

return;

}



if(study < 0){

alert("Study hours cannot be negative.");

return;

}





// ==========================
// CREATE CHECK-IN OBJECT
// ==========================


const checkin = {


id: Date.now(),


date:
new Date().toLocaleDateString(),


fullDate:
new Date().toISOString(),



mood:mood,


stress:stress,


sleep:sleep,


study:study,


motivation:motivation,


notes:notes


};






// ==========================
// SAVE DATA
// ==========================


let checkins = JSON.parse(

localStorage.getItem("checkins")

) || [];



checkins.push(checkin);



localStorage.setItem(

"checkins",

JSON.stringify(checkins)

);






// ==========================
// SUCCESS MESSAGE
// ==========================


const successBox =
document.getElementById("successBox");



if(successBox){


successBox.style.display="block";


setTimeout(()=>{


window.location.href="dashboard.html";


},1500);



}

else{


alert("Your daily check-in has been saved!");

window.location.href="dashboard.html";


}





}