// ==========================
// BURNOUT CALCULATION SYSTEM
// ==========================


function calculateBurnoutScore(data){

    let score = 0;


    // Stress Level (Maximum 50)
    score += Number(data.stress || 0) * 5;



    // Sleep Impact
    const sleep = Number(data.sleep || 0);

    if(sleep < 6){

        score += 20;

    }
    else if(sleep < 7){

        score += 10;

    }



    // Motivation Impact
    const motivation = Number(data.motivation || 0);

    score += (10 - motivation) * 3;



    // Study Overload
    const study = Number(data.study || 0);

    if(study > 10){

        score += 10;

    }



    // Mood Impact

    const mood = data.mood || "";


    if(
        mood.includes("😟") ||
        mood.includes("😞")
    ){

        score += 15;

    }
    else if(
        mood.includes("😐")
    ){

        score += 5;

    }



    // Limit Score

    if(score < 0){

        score = 0;

    }


    if(score > 100){

        score = 100;

    }



    return Math.round(score);

}





// ==========================
// BURNOUT CATEGORY
// ==========================


function getBurnoutCategory(score){


    if(score < 40){

        return "Healthy";

    }


    if(score < 70){

        return "Moderate Risk";

    }


    return "High Risk";


}





// ==========================
// RECOMMENDATION
// ==========================


function getRecommendation(score){


    if(score < 40){

        return "Your routine looks balanced. Keep maintaining healthy sleep, study, and relaxation habits.";

    }



    if(score < 70){

        return "Moderate burnout risk detected. Try improving sleep, taking short breaks, and managing workload.";

    }



    return "High burnout risk detected. Prioritize rest, reduce pressure, and focus on self-care.";

}





// ==========================
// DATE HELPERS
// ==========================


function getCheckinDate(item){

    if(item.fullDate){

        return new Date(item.fullDate);

    }


    return new Date(item.date);

}