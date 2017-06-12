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

$("#index-btn-regis-submit").on("click", function(e) {
    if ($("input[name=register_name]").val() === '') {
        alert('กรุณาใส่ชื่อเพื่อการติดต่อกลับด้วยค่ะ');
        return;
    }
    if ($("input[name=register_tel]").val() === '') {
        alert('กรุณาใส่หมายเลขโทรศัพท์เพื่อการติดต่อกลับด้วยค่ะ');
        return;
    }
    if (!validateEmail($("input[name=register_email]").val())) {
        alert('กรุณาใส่อีเมลเพื่อการติดต่อกลับด้วยค่ะ');
        return;
    }

    $.post("scripts/php/register.php", $("#register-form").serialize(), function(response) {
        $("#register-form")[0].reset();
        if (response === 'done') {
            // alert("ขอบคุณที่ทำการลงทะเบียนค่ะ");
            window.location.href = 'thanks.html';
        } else {
            alert("ไม่สามารถลงทะเบียนได้ในขณะนี้ กรุณาลงทะเบียนใหม่ในภายหลัง");
        }
    });
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}