
function showHide() {
    var adressInfo = document.querySelector(".date-container");
    var followButton = document.querySelector("#follow-button");

    if (adressInfo.classList.contains("active")) {
        adressInfo.classList.remove("active");
        followButton.classList.remove("active");
    } else {
        adressInfo.classList.add("active");
        followButton.classList.add("active");

    }
}


/*
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
*/


document.getElementById("feedbackButton").addEventListener("click", function () {
    document.getElementById("feedbackModal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function () {
    document.getElementById("feedbackModal").style.display = "none";
});

document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Förhindra formulärets standardbeteende (sidomladdning)
    const feedbackMessage = document.getElementById("feedbackMessage").value;

    fetch("/Feedback/SendFeedback", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            "Accept": "application/json"
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


function rotateIcon() {
    const icon = document.querySelector('#chevron');
    icon.classList.toggle('fa-rotate-180');
}

  
