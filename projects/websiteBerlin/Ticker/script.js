(function() {
    var headlines = $("#headlines");
    var left = headlines.offset().left;
    var animId;

    console.log("hi");

    $.ajax({
        url: "./server-example/data.json",
        method: "GET",
        success: function(response) {
            //JQuery automatically parse the JSON to a JS so 'response' will already be a JS object:

            for (var i = 0; i < response.length; i++) {
                var title = response[i].title;
                var link = response[i].url;
                var a = "<a href=" + link + ">" + title + "</a>";
                headlines.append(a);
            }
            moveHeadlines();
            mouseOverOut();

            //
            // links.eq(0).html(response[0]);
            // $container.html(response.sprites.front_default);
        },
        error: function() {
            console.log("something is wrong");
        }
    });

    // for (var i = 0; i < links.length; i++) {

    // }

    function mouseOverOut() {
        $("a").on("mouseover", function(e) {
            cancelAnimationFrame(animId);
            console.log(animId);
            $(e.target).css({
                color: "green"
            });
        });
        $("a").on("mouseout", function(e) {
            moveHeadlines();
            $(e.target).css({
                color: "red"
            });
        });
    }

    function moveHeadlines() {
        left--;
        if (
            left <=
            -$("a")
                .eq(0)
                .outerWidth()
        ) {
            left =
                left +
                $("a")
                    .eq(0)
                    .outerWidth();
            headlines.append($("a").eq(0));
            //this doesnt work properally
            // console.log(links);
            console.log("left: ", left);
        }

        headlines.css({
            left: left + "px"
        });
        animId = requestAnimationFrame(moveHeadlines);
    }
})();

// C:\Users\Inbal>cd Desktop/allspice-code/3week/Monday/jQuery/Ticker#
// The system cannot find the path specified.
//
// C:\Users\Inbal>cd Desktop/allspice-code/3week/Monday/jQuery/Ticker
//
// C:\Users\Inbal\Desktop\allspice-code\3week\Monday\jQuery\Ticker>http-server .
// Starting up http-server, serving .
// Available on:
//   http://10.65.30.30:8080
//   http://127.0.0.1:8080
