$(document).ready(function() {
    var flame = $("#flame");
    var txt = $("h1");
    var birthdaySong = document.getElementById("birthdaySong");
    var openedGifts = 0;
    var canOpenSurprise = false;
    var colores = [
        '#FF5733', // Naranja
        '#33FF57', // Verde lima
        '#3366FF', // Azul
        '#FF33E9', // Rosa brillante
        '#33FFFF', // Cian claro
        '#FF33B7', // Magenta
        '#FFD700', // Oro
        '#A020F0'  // Violeta
    ];

    // Ocultar los elementos de regalos y el contador inicialmente
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
            launchMainConfetti(); // Lanza el confetti principal al apagar la vela
            
            // Mostrar el collage y el contador después del confetti principal
            setTimeout(function() {
                $("#collage, #instructions, #rewardCounter").fadeIn();
                $("#rewardContainer").fadeIn(); // Mostrar también el contenedor de regalos
            }, 8000); // Ajustar el tiempo según la duración del confetti principal
        }
    });

    // Manejar el clic en cada regalo
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

        // Solo incrementar el contador si es un regalo nuevo y no el regalo sorpresa
        if (!isSurprise && index === openedGifts) {
            openedGifts++;
            updateRewardCounter();
        }

        $("#giftTitle").text(title);
        $("#giftMessage").text(message);
        $("#giftImage").attr("src", image);

        // Ocultar el collage, el enunciado y el contador, mostrar el detalle del regalo
        $("#collage, #instructions, #rewardCounter").fadeOut(function() {
            $("#giftDetail").fadeIn();
            launchGiftConfetti(); // Lanza el confetti al abrir un regalo

            // Habilitar el cuarto regalo si se abrieron los tres primeros regalos
            if (openedGifts === 3) {
                canOpenSurprise = true;
            }
        });
    });

    // Manejar el clic en el botón "Regresar"
    $("#backToCollageButton").on("click", function() {
        $("#giftDetail").fadeOut(function() {
            $("#collage, #instructions, #rewardCounter").fadeIn(); // Mostrar nuevamente el enunciado y el contador junto con el collage
        });
    });

    // Actualizar el contador de regalos abiertos
    function updateRewardCounter() {
        if (openedGifts < 3) {
            $("#rewardCounter").text(openedGifts + "/3");
        } else {
            $("#rewardCounter").text("ABRE LA SORPRESA");
        }
    }

    function launchMainConfetti() {
        var duration = 5000; // Duración del confetti principal al apagar la vela (5 segundos)
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
        var duration = 1000; // Duración del confetti al abrir un regalo (2 segundos)
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
