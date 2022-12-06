//move object on scroll
var window_width = $(window).width() - $('#object').width();

var document_height = $(document).height() - $(window).height();

$(function () {
    $(window).scroll(function () {
        var scroll_position = $(window).scrollTop();
        var object_position_right = window_width * (scroll_position / document_height);
        $('#object').css({
            'right': object_position_right
        });
    });
});