// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function showHide() {
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("read-more-btn");
    var infoBox = document.querySelector(".date-container");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        infoBox.style.visibility = "hidden";
        btnText.innerHTML = "Dölj";
    } else {
        moreText.style.display = "none";
        infoBox.style.visibility = "visible";
        btnText.innerHTML = "Läs mer om datumparkering";
    }
}

$(document).ready(function () {
    $("#toggleButton").on("click", function () {
        $(".date-container").hide();
        $("#restoreButton").show();
    });

    $("#restoreButton").on("click", function () {
        $(".date-container").show();
        $(this).hide();
    });
});

document.getElementById("feedbackButton").addEventListener("click", function () {
    document.getElementById("feedbackModal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function () {
    document.getElementById("feedbackModal").style.display = "none";
});

document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const feedbackMessage = document.getElementById("feedbackMessage").value;

    fetch("send_feedback.php", {
        method: "POST",
        body: JSON.stringify({ message: feedbackMessage }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            alert("Tack för din feedback!");
        } else {
            alert("Något gick fel. Försök igen senare.");
        }
        document.getElementById("feedbackModal").style.display = "none";
    });
});
