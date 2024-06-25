function submitApplication() {
    var form = document.getElementById('jobApplicationForm');
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var position = form.position.value;
    var startDate = form.startDate.value;
    var coverLetter = form.coverLetter.value.trim();
    var resume = form.resume.files[0];

    if (name === "" || email === "" || phone === "" || position === "" || startDate === "" || coverLetter === "" || !resume) {
        alert("All fields are required.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    alert("Application submitted successfully!");

    // Here you would normally send the form data to the server
    // Example: using Fetch API or XMLHttpRequest
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    var re = /^\d{10}$/; // Simple validation for 10 digit phone number
    return re.test(phone);
}