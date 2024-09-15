$(document).ready(function() {
    var flame = $("#flame");
    var txt = $("h1");
    var birthdaySong = document.getElementById("birthdaySong");
    var openedGifts = 0;
    var canOpenSurprise = false;
    var colores = [
        '#FF5733', 
        '#33FF57', 
        '#3366FF', 
        '#FF33E9',
        '#33FFFF', 
        '#FF33B7', 
        '#FFD700', 
        '#A020F0'  
    ];

    $("#instructions, #rewardCounter, #collage, #rewardContainer").hide();

    flame.on({
        click: function () {
            birthdaySong.play();
            flame.removeClass("burn").addClass("puff");
            $(".smoke").each(function () {
                $(this).addClass("puff-bubble");
            });
            $("#glow").remove();
            txt.hide().html("¡Feliz Cumpleaños, Mayra 🐼!").delay(750).fadeIn(300);
            $("#candle").animate(
                {
                    opacity: ".5"
                },
                100
            );
            launchMainConfetti(); 
            
   
            setTimeout(function() {
                $("#collage, #instructions, #rewardCounter").fadeIn();
                $("#rewardContainer").fadeIn(); 
            }, 8000); 
        }
    });

    $(".gift").on("click", function() {
        var index = $(this).index();
        var isSurprise = $(this).hasClass("surprise");

        if (isSurprise) {
            if (!canOpenSurprise) {
                alert("Debes abrir los tres primeros regalos antes de abrir este.");
                return;
            }
        } else {
            if (index !== openedGifts) {
                alert("Debes abrir el regalo " + (openedGifts + 1) + " antes de abrir este.");
                return;
            }
        }

        var title = $(this).data("title");
        var message = $(this).data("message");
        var image = $(this).data("image");


        if (!isSurprise && index === openedGifts) {
            openedGifts++;
            updateRewardCounter();
        }

        $("#giftTitle").text(title);
        $("#giftMessage").text(message);
        $("#giftImage").attr("src", image);

  
        $("#collage, #instructions, #rewardCounter").fadeOut(function() {
            $("#giftDetail").fadeIn();
            launchGiftConfetti(); 

        
            if (openedGifts === 3) {
                canOpenSurprise = true;
            }
        });
    });

    $("#backToCollageButton").on("click", function() {
        $("#giftDetail").fadeOut(function() {
            $("#collage, #instructions, #rewardCounter").fadeIn(); 
        });
    });

    function updateRewardCounter() {
        if (openedGifts < 3) {
            $("#rewardCounter").text(openedGifts + "/3");
        } else {
            $("#rewardCounter").text("ABRE LA SORPRESA");
        }
    }

    function launchMainConfetti() {
        var duration = 5000; 
        var end = Date.now() + duration;
    
        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
    
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
    
    function launchGiftConfetti() {
        var duration = 1000; 
        var end = Date.now() + duration;
    
        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
    
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    $(".gift").hover(
        function() {
            var randomColor = colores[Math.floor(Math.random() * colores.length)];
            $(this).css("background-color", randomColor);
        },
        function() {
            $(this).css("background-color", "transparent");
        }
    );


});
