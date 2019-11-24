$(window).on("load", function () {
    $("body").ready(function () {
        $(".chatbox_container").hide().delay(100).fadeIn(1000); // You can customize the time you want the chat window to be displayed with the 'delay' and 'fadeIn' properties
        $(".chatbox_container").removeClass("displayNoneChat"); //Removes class "displayNoneChat" and display the Chatbox container
    });
});

(function ($) {
    $(document).ready(function () {
        var $chatbox = $(".chatbox"),
            $chatboxTitle = $(".chatbox__title"),
            $chatboxTitleClose = $(".chatbox__title__close"),
            $chatboxCredentials = $(".chatbox__credentials");
        $("#instantChat").on("click", function () {
            $chatbox.removeClass("chatbox--closed");
            $chatbox.toggleClass("chatbox--tray");
        });
        $chatboxTitleClose.on("click", function (e) {
            e.stopPropagation();
            $chatbox.addClass("chatbox--closed");
        });
        $chatbox.on("transitionend", function () {
            if ($chatbox.hasClass("chatbox--closed")) $chatbox.remove();
        });
    });
})(jQuery);