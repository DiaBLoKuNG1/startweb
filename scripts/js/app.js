

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

$('.index-totop').click(function(){
    $('html, body').animate({scrollTop:$('#regis-headline').offset().top}, 'slow');
});

$('#index-btn-regis-submit').click(function(){
    window.location.href = 'thanks.html';
})