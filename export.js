

document.addEventListener("DOMContentLoaded", function(){


const csvBtn =
document.getElementById("csvBtn");


const jsonBtn =
document.getElementById("jsonBtn");



if(csvBtn){

csvBtn.addEventListener(
"click",
exportCSV
);

}



if(jsonBtn){

jsonBtn.addEventListener(
"click",
exportJSON
);

}



});




// ==========================
// GET DATA
// ==========================


function getData(){


return {


profile:

JSON.parse(
localStorage.getItem("studentProfile")
) || {},



checkins:

JSON.parse(
localStorage.getItem("checkins")
) || [],



theme:

localStorage.getItem("theme")
|| "light",



exportDate:

new Date().toLocaleString()


};


}







// ==========================
// JSON EXPORT
// ==========================


function exportJSON(){



const data =
getData();



const json =
JSON.stringify(
data,
null,
2
);



downloadFile(

json,

"Student_Wellbeing_Data.json",

"application/json"

);



}








// ==========================
// CSV EXPORT
// ==========================


function exportCSV(){



const checkins =
getData().checkins;



if(checkins.length===0){


alert(
"No check-in records available."
);


return;


}





let csv =

"Date,Mood,Stress,Sleep Hours,Study Hours,Motivation,Notes\n";





checkins.forEach(function(item){



csv += [

item.date,

item.mood,

item.stress,

item.sleep,

item.study,

item.motivation,

item.notes || ""

]

.map(value =>

`"${String(value).replace(/"/g,'""')}"`

)

.join(",");



csv += "\n";



});






downloadFile(

csv,

"Student_Checkins.csv",

"text/csv"

);



}









// ==========================
// DOWNLOAD FILE
// ==========================


function downloadFile(
content,
filename,
type
){



const blob =

new Blob(

[content],

{
type:type
}

);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");



link.href=url;


link.download=filename;



document.body.appendChild(link);



link.click();



document.body.removeChild(link);



URL.revokeObjectURL(url);



}