const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", saveProfile);

function saveProfile(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();
    const level = document.getElementById("level").value;

    if (name === "" || email === "" || course === "" || level === "") {
        alert("Please fill in all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const studentProfile = {
        id: Date.now(),
        name: name,
        email: email,
        course: course,
        level: level,
        createdAt: new Date().toLocaleString()
    };

    localStorage.setItem("studentProfile", JSON.stringify(studentProfile));

    alert("Profile created successfully!");

    profileForm.reset();

    window.location.href = "dashboard.html";
}
