var slider = $("#slider");
var container = $("#container");
var topImage = $("#top-image");

slider.mousedown(function() {
    container.mousemove(function(e) {
        var x = e.clientX;
        var left = container.offset().left;
        if (x < container.width() + left + slider.width()) {
            slider.css({
                left: x - 15 + "px"
            });
            topImage.css({
                width: x
            });
        }
    });
});
