document.addEventListener("DOMContentLoaded", function(){


const table = document.getElementById("historyTable");

const searchBox = document.getElementById("searchBox");

const filterMood = document.getElementById("filterMood");



let checkins =
JSON.parse(localStorage.getItem("checkins")) || [];



if(table){

    displayHistory(checkins);

}



if(searchBox){

    searchBox.addEventListener(
        "input",
        applyFilters
    );

}



if(filterMood){

    filterMood.addEventListener(
        "change",
        applyFilters
    );

}



});




// ==========================
// FILTER
// ==========================


function applyFilters(){


const search =
document.getElementById("searchBox").value.toLowerCase();


const mood =
document.getElementById("filterMood").value;



const filtered =
checkins.filter(function(item){



const date =
(item.date || "").toLowerCase();


const itemMood =
(item.mood || "").toLowerCase();



const searchMatch =
date.includes(search) ||
itemMood.includes(search);



const moodMatch =
mood === "All" ||
item.mood === mood;



return searchMatch && moodMatch;



});



displayHistory(filtered);



}





// ==========================
// BURNOUT RISK
// ==========================


function burnoutRisk(item){


let score = 0;



score += Number(item.stress || 0) * 5;



if(Number(item.sleep)<6){

score +=20;

}



score +=
(10 - Number(item.motivation || 0))*4;



if(Number(item.study)>10){

score +=10;

}



if(
item.mood.includes("😟") ||
item.mood.includes("😞")
){

score +=15;

}



if(score>100){

score=100;

}




if(score<40){


return `
<span class="badge healthy">
Healthy
</span>
`;

}


else if(score<70){


return `
<span class="badge moderate">
Moderate
</span>
`;

}


else{


return `
<span class="badge high">
High
</span>
`;

}



}





// ==========================
// DISPLAY HISTORY
// ==========================


function displayHistory(data){



const table =
document.getElementById("historyTable");



if(!table) return;



if(data.length===0){


table.innerHTML=`

<tr>

<td colspan="8">

No Records Found

</td>

</tr>

`;

return;


}




let rows="";



data.forEach(function(item){



const index =
checkins.findIndex(
record => record.id === item.id
);



rows += `


<tr>

<td>${item.date}</td>

<td>${item.mood}</td>

<td>${item.stress}/10</td>

<td>${item.sleep} hrs</td>

<td>${item.study} hrs</td>

<td>${item.motivation}/10</td>


<td>

${burnoutRisk(item)}

</td>


<td>

<button 
class="deleteBtn"
onclick="deleteRecord(${index})">

Delete

</button>


</td>


</tr>


`;



});



table.innerHTML = rows;



}






// ==========================
// DELETE RECORD
// ==========================


function deleteRecord(index){



if(confirm("Delete this record?")){


checkins.splice(index,1);



localStorage.setItem(

"checkins",

JSON.stringify(checkins)

);



displayHistory(checkins);



}



}