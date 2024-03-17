$(document).ready(function () {
  console.log("Document is ready!");

  $('.newer-tweet textarea').on('input', function () {
    var remaining = 140 - $(this).val().length;
    $(this).closest('form').find('.counter').text(remaining);

    if (remaining < 0) {
        $(this).closest('form').find('.counter').addClass('exceeded');
    } else {
        $(this).closest('form').find('.counter').removeClass('exceeded');
    }
});

});