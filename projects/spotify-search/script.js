(function() {
    var nextUrl;
    var myHtml = "";
    var next = $("#next");
    var url = window.location.href;
    var newUrl;

    var isLoading = false;

    function renderHtml(response) {
        for (var i = 0; i < response.items.length; i++) {
            // handling images
            var link = response.items[i].external_urls.spotify;
            var imageUrl = "default.png";
            if (response.items[i].images[0]) {
                imageUrl = response.items[i].images[0].url;
                myHtml +=
                    "<div class='results'><a class='link' href=" +
                    link +
                    "><img src=" +
                    imageUrl +
                    ">" +
                    response.items[i].name +
                    "</a></div>";
            }
        }
        $("#results-container").html(myHtml);
    }

    function getNextUrl(response) {
        //we cant make an ajax request directly to spotify
        nextUrl =
            response.next &&
            response.next.replace(
                "https://api.spotify.com/v1/search",
                "https://elegant-croissant.glitch.me/spotify"
            );
    }

    function loadNextResults() {
        if (nextUrl === null) {
            next.css({
                visibility: "hidden"
            });
            return;
        }

        isLoading = true;

        $.ajax({
            url: nextUrl,
            method: "GET",
            success: function(response) {
                response = response.artists || response.albums;

                isLoading = false;

                renderHtml(response);

                getNextUrl(response);
            }
        });
    }

    function loadInitialResults() {
        var userInput = $("input[name=user-input]").val();
        var albumOrArtist = $("select").val();

        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response) {
                response = response.artists || response.albums;
                // console.log(response.items[0].external_urls.spotify);

                next.css({
                    visibility: "visible"
                });
                // console.log(response.items.length);
                if (response.items.length <= 0) {
                    next.css({
                        visibility: "hidden"
                    });
                    myHtml =
                        "<div class='no-results'> No results found for " +
                        userInput +
                        "</div>";
                } else {
                    myHtml =
                        "<div id='results-for'> Results for " +
                        userInput +
                        "</div>";
                }

                renderHtml(response);

                getNextUrl(response);
            }
        });
    }

    $("#submit-button").on("click", loadInitialResults);

    $("input").on("keydown", function(e) {
        if (e.keyCode === 13) {
            loadInitialResults();
        }
    });

    next.on("click", loadNextResults);

    ///version 1
    var searchingFor = "scroll=infinite";
    var isInfiniteScroll = url.indexOf(searchingFor) >= 0;

    if (isInfiniteScroll) {
        next.hide();
        setInterval(function() {
            if (!nextUrl) {
                return;
            }

            var window_plus_scrolltop =
                $(window).height() + $(document).scrollTop();

            var document_height = $(document).height();

            var reachedBottomOfPage =
                window_plus_scrolltop >= document_height - 400;

            if (reachedBottomOfPage && !isLoading) {
                loadNextResults();
            }
        }, 250);
    }

    ///version 2
    // var urlParams = new URLSearchParams(location.search);
    // var contentOfScrollParam = urlParams.get("scroll");
})();
