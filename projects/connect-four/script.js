(function() {
    var currentPlayer = "player1";
    var winner = $(".winner");
    var text = $("p");
    var anotherGame = $(".another-game");
    var btnYes = $("#btnYes");
    var btnNo = $("#btnNo");
    var container = $("#container");
    var color = $(".color");
    var c = 0;
    var column = $(".column");

    color.on("mousedown", function() {
        container.on("mousemove", mouse);
        container.on("mouseup", function(e) {
            container.off("mousemove", mouse);
        });
    });

    function mouse(e) {
        color.eq(c).css({
            left: e.clientX - 30 + "px",
            top: e.clientY - 30 + "px"
        });
    }

    //////////////////////

    // console.log(
    //     $(".column")
    //         .eq(6)
    //         .position().left
    // );

    function enter(col) {
        var col = column.eq(col);
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        var slotsInRow = $(".row" + i);

        if (i === -1) {
            return;
        }

        if (diagonalVictory()) {
            anounceVictory();
        } else if (checkForVictory(slotsInCol)) {
            anounceVictory();
        } else if (checkForVictory(slotsInRow)) {
            anounceVictory();
        } else {
            //continue the game
            switchPlayer();
        }
    }

    $(document).on("keydown", function(e) {
        // console.log(e.keyCode);
        var userHitDownArrowKey = e.keyCode === 40;
        var userHitRightArrowKey = e.keyCode === 39;
        var userHitLeftArrowKey = e.keyCode === 37;
        var userHitEnterKey = e.keyCode === 13;

        if (userHitDownArrowKey) {
            if (!$(".colu").hasClass("active")) {
                $(".arrows :first-child").addClass("active");
            }
        }

        var $current = $(".active");
        var $previous = $current.prev();
        var $next = $current.next();

        if (userHitRightArrowKey) {
            if ($(".arrows :last-child").hasClass("active")) {
                $(".arrows :first-child").addClass("active");
                $(".arrows :last-child").removeClass("active");
                console.log($(".colu").eq(5));
            } else {
                $current.removeClass("active");
                $next.addClass("active");
            }
        }

        if (userHitLeftArrowKey) {
            if ($(".arrows :first-child").hasClass("active")) {
                $(".arrows :last-child").addClass("active");
                $(".arrows :first-child").removeClass("active");
                console.log($(".colu").eq(5));
            } else {
                $current.removeClass("active");
                $previous.addClass("active");
            }
        }

        if (userHitEnterKey) {
            // console.log($current.offset().left);
            var left = $current.position().left;
            if (left > -3 && left < 5) {
                enter(0);
            } else if (left > 77 && left < 85) {
                enter(1);
            } else if (left > 155 && left < 165) {
                enter(2);
            } else if (left > 235 && left < 245) {
                enter(3);
            } else if (left > 315 && left < 325) {
                enter(4);
            } else if (left > 395 && left < 405) {
                enter(5);
            } else if (left > 475 && left < 485) {
                enter(6);
            }
        }
    });

    /////////////////

    $(".column").on("click", function(e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);

                //once the condition is held for the first time, stop the loop with break
                break;
            }
        }
        if (c === 0) {
            color.eq(c).css({
                left: 450 + "px",
                top: 20 + "px"
            });
        } else {
            color.eq(c).css({
                left: 770 + "px",
                top: 20 + "px"
            });
        }

        var slotsInRow = $(".row" + i);

        if (i === -1) {
            return;
        }

        if (diagonalVictory()) {
            anounceVictory();
        } else if (checkForVictory(slotsInCol)) {
            anounceVictory();
        } else if (checkForVictory(slotsInRow)) {
            anounceVictory();
        } else {
            //continue the game
            switchPlayer();
        }
    });

    btnNo.on("click", function() {
        console.log("NO");
        anotherGame.removeClass("on");
        $("#bye").css({
            visibility: "visible"
        });
        container.addClass("another-game");
        $("#bye").addClass("grow");
    });

    function popup() {
        anotherGame.addClass("on");
        winner.css({
            visibility: "hidden"
        });
        btnYes.on("click", function() {
            location.reload();
        });
    }

    function anounceVictory() {
        if (currentPlayer === "player1") {
            winner.addClass("on-winner");
            $(".slot").addClass("slot-on");
            $(".player1").css({
                visibility: "hidden"
            });
            $(".player2").css({
                visibility: "hidden"
            });
            text.text("and the winner is RED!");
            setTimeout(popup, 3000);
        } else {
            winner.addClass("on-winner");
            $(".slot").addClass("slot-on");
            $(".player1").css({
                visibility: "hidden"
            });
            $(".player2").css({
                visibility: "hidden"
            });
            text.text("and the winner is YELLOW!");
            setTimeout(popup, 3000);
        }
    }

    var slot = $(".slot");

    var slotsInDiagonal = [
        [slot.eq(0), slot.eq(7), slot.eq(14), slot.eq(21)],
        [slot.eq(18), slot.eq(13), slot.eq(8), slot.eq(3)],
        [slot.eq(24), slot.eq(19), slot.eq(14), slot.eq(9)],
        [slot.eq(30), slot.eq(25), slot.eq(20), slot.eq(15)],
        [slot.eq(36), slot.eq(31), slot.eq(26), slot.eq(21)],
        [slot.eq(37), slot.eq(32), slot.eq(27), slot.eq(22)],
        [slot.eq(38), slot.eq(33), slot.eq(28), slot.eq(23)],
        [slot.eq(20), slot.eq(15), slot.eq(10), slot.eq(5)],
        [slot.eq(4), slot.eq(9), slot.eq(14), slot.eq(19)],
        [slot.eq(3), slot.eq(8), slot.eq(13), slot.eq(18)],
        [slot.eq(41), slot.eq(34), slot.eq(27), slot.eq(20)],
        [slot.eq(35), slot.eq(28), slot.eq(21), slot.eq(14)],
        [slot.eq(29), slot.eq(22), slot.eq(15), slot.eq(8)],
        [slot.eq(23), slot.eq(16), slot.eq(9), slot.eq(2)],
        [slot.eq(7), slot.eq(14), slot.eq(21), slot.eq(28)],
        [slot.eq(8), slot.eq(15), slot.eq(22), slot.eq(29)],
        [slot.eq(2), slot.eq(9), slot.eq(16), slot.eq(23)],
        [slot.eq(11), slot.eq(16), slot.eq(21), slot.eq(26)],
        [slot.eq(17), slot.eq(22), slot.eq(27), slot.eq(32)],
        [slot.eq(6), slot.eq(13), slot.eq(20), slot.eq(27)],
        [slot.eq(12), slot.eq(19), slot.eq(26), slot.eq(33)],
        [slot.eq(18), slot.eq(25), slot.eq(32), slot.eq(39)],
        [slot.eq(1), slot.eq(8), slot.eq(15), slot.eq(22)],
        [slot.eq(40), slot.eq(33), slot.eq(26), slot.eq(19)]
    ];

    function diagonalVictory() {
        var count = 0;
        for (var i = 0; i < slotsInDiagonal.length; i++) {
            count = 0;
            for (var j = 0; j < 4; j++) {
                if (slotsInDiagonal[i][j].hasClass(currentPlayer)) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
    }

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;

                if (count === 4) {
                    return true;
                }
            } else {
                //reset the value of counts
                count = 0;
                // console.log("count is ", count);
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
            c = 1;
            color.eq(1).addClass("border");
            color.eq(0).removeClass("border");
        } else {
            currentPlayer = "player1";
            c = 0;
            color.eq(0).addClass("border");
            color.eq(1).removeClass("border");
        }
    }
})();
