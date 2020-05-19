// 1. root endpoint / base url
//https://api.github.com
//2. endpoint / path
// /users/:username/repos

/// 'https://api.github.com/users/:username/repos'
/// 'https://api.github.com/users/tj/repos'

//but we have to change the ":username" to whomever we are searching

//its imporstnat to see acknolendge the double dot and delete it and replace what comes afterwards (username) it with a variable
(function() {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    var username;
    var password;
    var userToSearch;
    var results = {};
    var messages = {};
    var repo;

    $("#go").on("click", function(e) {
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();
        userToSearch = $('input[name="user-to-search"]').val();

        var baseUrl = "https://api.github.com";
        var endpoint = "/users/" + userToSearch + "/repos";
        $.ajax({
            url: baseUrl + endpoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(response) {
                results = { resultsData: response };
                console.log(results);
                // console.log(results.resultsData[0].owner.avatar_url);
                $(".searchedUser").html(Handlebars.templates.users(results));
                var repos = $(".repos");
                // var reposArray = [];
                // for (var i = 0; i < results.resultsData.length; i++) {
                //     reposArray.push(results.resultsData[i].full_name);
                // }

                repos.on("click", function(e) {
                    repo = $(event.target).text();

                    var commitsUrl = "/repos/" + repo + "/commits";
                    $.ajax({
                        url: baseUrl + commitsUrl,
                        headers: {
                            Authorization:
                                "Basic " + btoa(username + ":" + password)
                        },
                        success: function(response) {
                            messages = { messagesData: response };
                            console.log(response);

                            var messagesArray = [];

                            for (var i = 0; i < 10; i++) {
                                messagesArray.push(response[i].commit.message);
                            }
                            var messagesObject = { messagesArray };
                            console.log(messagesArray);
                            $(".commits").html(
                                Handlebars.templates.comments({ messagesArray })
                            );
                        }
                    });
                });
            }
        });
    });
})();
