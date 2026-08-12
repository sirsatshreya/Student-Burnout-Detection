document.addEventListener("DOMContentLoaded", function () {

    const checkins = JSON.parse(localStorage.getItem("checkins")) || [];

    const achievements = {
        streak: false,
        sleep: false,
        stress: false,
        study: false,
        mood: false,
        wellness: false
    };


    // ==========================
    // CHECK CONDITIONS
    // ==========================

    if (checkins.length > 0) {


        // 7 DAY STREAK
        if (calculateCurrentStreak(checkins) >= 7) {
            achievements.streak = true;
        }



        // HEALTHY SLEEPER
        if (
            checkins.filter(item =>
                Number(item.sleep) >= 7
            ).length >= 5
        ) {
            achievements.sleep = true;
        }



        // STRESS MASTER
        if (
            checkins.filter(item =>
                Number(item.stress) <= 4
            ).length >= 10
        ) {
            achievements.stress = true;
        }



        // STUDY CHAMPION
        if (
            checkins.filter(item =>
                Number(item.study) >= 4
            ).length >= 7
        ) {
            achievements.study = true;
        }



        // POSITIVE MIND
        if (
            checkins.filter(item =>
                item.mood === "😊" ||
                item.mood === "🙂"
            ).length >= 7
        ) {
            achievements.mood = true;
        }



        // WELLNESS HERO
        if (checkins.length >= 30) {
            achievements.wellness = true;
        }

    }



    updateCards(achievements);

});





// ==========================
// UPDATE CARDS
// ==========================

function updateCards(data) {


    updateCard(
        "streakAchievement",
        data.streak
    );


    updateCard(
        "sleepAchievement",
        data.sleep
    );


    updateCard(
        "stressAchievement",
        data.stress
    );


    updateCard(
        "studyAchievement",
        data.study
    );


    updateCard(
        "moodAchievement",
        data.mood
    );


    updateCard(
        "wellnessAchievement",
        data.wellness
    );



    const earned =
    Object.values(data).filter(Boolean).length;


    const total = 6;


    const percentage =
    Math.round((earned / total) * 100);



    setText(
        "progressText",
        `${earned} / ${total} Achievements`
    );


    setText(
        "earnedCount",
        earned
    );


    setText(
        "lockedCount",
        total - earned
    );


    setText(
        "percentage",
        percentage + "%"
    );


    const bar =
    document.getElementById("progressFill");


    if(bar){
        bar.style.width = percentage + "%";
    }

}







function updateCard(id, unlocked) {


    const card =
    document.getElementById(id);


    if(!card) return;



    const badge =
    card.querySelector(".badge-status");



    if(unlocked){

        card.classList.add("unlocked");
        card.classList.remove("locked");

        if(badge){
            badge.innerHTML = "Earned";
        }

    }
    else{

        card.classList.add("locked");
        card.classList.remove("unlocked");

        if(badge){
            badge.innerHTML = "Locked";
        }

    }

}







function calculateCurrentStreak(data) {


    if(data.length === 0)
        return 0;



    let dates = data.map(item =>
        new Date(item.fullDate || item.date)
    );


    dates.sort((a,b)=>a-b);



    let streak = 1;



    for(
        let i = dates.length - 1;
        i > 0;
        i--
    ){

        let diff =
        (dates[i] - dates[i-1]) /
        (1000*60*60*24);



        if(diff <= 1){
            streak++;
        }
        else{
            break;
        }

    }


    return streak;

}






function setText(id,value){


    const element =
    document.getElementById(id);


    if(element){
        element.textContent=value;
    }

}