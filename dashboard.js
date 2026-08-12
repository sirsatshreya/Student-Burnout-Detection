document.addEventListener("DOMContentLoaded", function(){

    loadProfile();
    loadCheckinData();
    loadTheme();

});



// =========================
// LOAD PROFILE
// =========================

function loadProfile(){

    const profileData = localStorage.getItem("studentProfile");


    if(!profileData){

        window.location.href="index.html";
        return;

    }


    const profile = JSON.parse(profileData);



    setText(
        "welcomeName",
        "Welcome, " + (profile.name || "Student") + " 👋"
    );


    setText(
        "studentInfo",
        (profile.course || "") + " • " + (profile.level || "")
    );



    setText("profileName", profile.name || "-");
    setText("profileEmail", profile.email || "-");
    setText("profileCourse", profile.course || "-");
    setText("profileLevel", profile.level || "-");


    setText(
        "createdDate",
        profile.createdAt || new Date().toLocaleDateString()
    );


}




// =========================
// LOAD CHECK-IN DATA
// =========================


function loadCheckinData(){


    const checkins =
    JSON.parse(localStorage.getItem("checkins")) || [];



    if(checkins.length === 0){


        setText("mood","No Data");
        setText("stress","0 / 10");
        setText("sleep","0 Hours");
        setText("study","0 Hours");
        setText("burnout","0%");


        setText(
            "recommendation",
            "Complete your first daily check-in."
        );


        setDefaultSummary();

        return;

    }




    const latest =
    checkins[checkins.length - 1];




    setText(
        "mood",
        latest.mood || "-"
    );


    setText(
        "stress",
        (latest.stress || 0) + " / 10"
    );


    setText(
        "sleep",
        (latest.sleep || 0) + " Hours"
    );


    setText(
        "study",
        (latest.study || 0) + " Hours"
    );



    const score =
    calculateBurnoutScore(latest);



    setText(
        "burnout",
        score + "%"
    );



    setText(
        "recommendation",
        getRecommendation(score)
    );



    createSummary(checkins);



}





// =========================
// SUMMARY
// =========================


function createSummary(checkins){


    let totalStress = 0;
    let totalSleep = 0;
    let totalStudy = 0;



    checkins.forEach(item=>{


        totalStress += Number(item.stress || 0);

        totalSleep += Number(item.sleep || 0);

        totalStudy += Number(item.study || 0);


    });




    let avgStress =
    (totalStress / checkins.length).toFixed(1);



    let avgSleep =
    (totalSleep / checkins.length).toFixed(1);



    let avgStudy =
    (totalStudy / checkins.length).toFixed(1);





    setHTML(
        "weeklySummary",

`
<b>Average Stress:</b> ${avgStress}/10
<br><br>

<b>Average Sleep:</b> ${avgSleep} hrs
<br><br>

<b>Average Study:</b> ${avgStudy} hrs
`
    );





    setHTML(
        "monthlySummary",

`
<b>Total Check-ins:</b> ${checkins.length}
<br><br>

<b>Average Stress:</b> ${avgStress}/10
<br><br>

<b>Average Sleep:</b> ${avgSleep} hrs
`
    );





    let tip;



    if(avgSleep < 6){

        tip =
        "😴 Improve your sleep routine. Try getting 7-8 hours.";

    }

    else if(avgStress >= 7){

        tip =
        "⚠️ High stress detected. Take breaks and relax.";

    }

    else if(avgStudy < 2){

        tip =
        "📚 Try increasing your daily study consistency.";

    }

    else{

        tip =
        "❤️ Your routine looks balanced. Keep going.";

    }




    setText(
        "healthTip",
        tip
    );


}





// =========================
// HELPERS
// =========================


function setText(id,value){

    const element =
    document.getElementById(id);


    if(element){

        element.textContent=value;

    }

}




function setHTML(id,value){

    const element =
    document.getElementById(id);


    if(element){

        element.innerHTML=value;

    }

}





function setDefaultSummary(){


    setText(
        "weeklySummary",
        "No check-in data available."
    );


    setText(
        "monthlySummary",
        "No check-in data available."
    );


    setText(
        "healthTip",
        "Complete your first daily check-in to receive recommendations."
    );


}






// =========================
// DARK MODE
// =========================


function loadTheme(){


    const themeBtn =
    document.getElementById("themeBtn");



    if(!themeBtn){

        return;

    }




    if(localStorage.getItem("theme") === "dark"){


        document.body.classList.add("dark-mode");

        themeBtn.innerHTML="☀️ Light Mode";


    }





    themeBtn.addEventListener("click",function(){



        document.body.classList.toggle("dark-mode");



        if(document.body.classList.contains("dark-mode")){


            localStorage.setItem(
                "theme",
                "dark"
            );


            themeBtn.innerHTML="☀️ Light Mode";


        }

        else{


            localStorage.setItem(
                "theme",
                "light"
            );


            themeBtn.innerHTML="🌙 Dark Mode";


        }



    });



}