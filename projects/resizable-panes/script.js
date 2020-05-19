var slider = $("#slider");
console.log(slider);
var container = $("#container");
var topImage = $("#top-image");
var bottomImage = $("#bottom-image");

slider.mousedown(function() {
    container.mousemove(function(e) {
        var x = e.clientX;
        var left = container.offset().left;
        if (x < container.width() + left + slider.width()) {
            slider.css({
                left: x - 10 + "px"
            });
            topImage.css({
                width: x
            });
        }
    });
});

//     var x = e.clientX;
//     var left = $(e.currentTarget).offset().left;
//     console.log(x);
//     slider.css({
//         left: left
//     });
// });
