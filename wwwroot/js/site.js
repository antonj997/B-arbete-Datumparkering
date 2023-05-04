
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




function rotateIcon() {
    const icon = document.querySelector('#chevron');
    icon.classList.toggle('fa-rotate-180');
}


    
