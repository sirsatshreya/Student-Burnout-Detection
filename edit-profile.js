document.addEventListener("DOMContentLoaded", function () {

    const profile = JSON.parse(localStorage.getItem("studentProfile"));

    if (!profile) {

        alert("No profile found.");

        window.location.href = "index.html";
        return;
    }

    document.getElementById("name").value = profile.name || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("course").value = profile.course || "";
    document.getElementById("level").value = profile.level || "";

    document.getElementById("editForm").addEventListener("submit", function (e) {

        e.preventDefault();

        profile.name = document.getElementById("name").value.trim();
        profile.email = document.getElementById("email").value.trim();
        profile.course = document.getElementById("course").value.trim();
        profile.level = document.getElementById("level").value;

        localStorage.setItem("studentProfile", JSON.stringify(profile));

        alert("Profile updated successfully!");

        window.location.href = "dashboard.html";
    });

});

function goBack() {
    window.location.href = "dashboard.html";
}