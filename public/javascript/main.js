

// Tabs
$(document).ready(function () {
    var elements = document.querySelectorAll("audio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].volume = 0.2;
    }
    var previousActiveTabIndex = 0;

    $(".tab-switcher").on('click keypress', function (event) {
        // event.which === 13 means the "Enter" key is pressed
        event.preventDefault();
        $(".tab-switcher").removeClass("active");
        $(this).addClass("active");
        if ((event.type === "keypress" && event.which === 13) || event.type === "click") {

            var tabClicked = $(this).data("tab");

            if(tabClicked != previousActiveTabIndex) {
                $(".tab-container").each(function () {
                    if($(this).data("tab") == tabClicked) {
                        $(".tab-container").addClass("hidden");
                        $(this).removeClass("hidden");
                        previousActiveTabIndex = $(this).data("tab");
                        return;
                    }
                });
            }
        }
    });

    var isPlaying = null;

    $("#volume").on('input', function (e) {
        var elements = document.querySelectorAll("audio");
        for (var i = 0; i < elements.length; i++) {
            elements[i].volume = $(this).val();
        }
    });


    $(".music").on('click keypress', function (e) {
        var idMusic =$(this).parent().data("music");
        // var audio =$(this).parent().find('.audio').data("music");
        var audio = document.querySelector(`.audio[data-music='${idMusic}']`);
        $(".control").each(function(i){
            $(this).addClass('hidden')
        });
        $(this).parent().find('.play').toggleClass('hidden');
        if(isPlaying==idMusic){
            if(audio.paused && audio.currentTime > 0 && !audio.ended){
                audio.currentTime=0;
                audio.play();
                $(this).parent().find('.pause').addClass('hidden');
                $(this).parent().find('.play').removeClass('hidden');

            }
            else{
                audio.pause();
                $(this).parent().find('.play').addClass('hidden');
                $(this).parent().find('.pause').removeClass('hidden');
            }
        }
        else{
            isPlaying = idMusic;
            var audios = document.getElementsByTagName('audio');
                for(var i = 0, len = audios.length; i < len;i++){
                    if(audios[i] != e.target){
                        audios[i].pause();
                    }
                }
            audio.currentTime=0;
            audio.play();     
        }
         
    });




});