$(function(){
	$('.required').eq(0).focus();

    var submitting = 0;

	$('#register-form').submit(function (event) {
        if(submitting > 0)
            return true;

		var result = true;

	    $('.required').each(function(){
	    	if($(this).val() === ''){
	    		$(this).addClass('error');
	    		result = false;
	    	}else{
	    		$(this).removeClass('error');
	    	}
	    });

        if($('input[type="checkbox"][name="reasons[]"]').lenght > 0){
    	    if(!$('input[type="checkbox"][name="reasons[]"]').is(':checked')){
    	    	$('input[type="checkbox"][name="reasons[]"]').parents('.checkbox').addClass('error');
    	    	result = false;
    	    }
        }

	    if(!result){
	    	$('html, body').animate({
		        scrollTop: $('.error').eq(0).offset().top - 50
		    }, 500);
	    }else{
            var xhr = new XMLHttpRequest();
            var name = $('[name="full_name"]').val().trim();
            var phone = $('[name="primary_phone"]').val().trim();
            var email = $('[name="email_address"]').val().trim();
            var purpose = $('[name="purpose_code"]').val().trim();
            var budget = $('[name="budget_value"]').val().trim();
            var params = 'full_name=' + name +
                         '&primary_phone=' + phone +
                         '&email_address=' + email +
                         '&buy_purpose=' + purpose +
                         '&budget=' + budget;

            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;

                console.log(xhr.responseText);

                submitting++;

                try{
                    $('#register-form').submit();
                }
                finally{
                    submitting--;
                }
            }

            xhr.open('POST', 'https://sales.altitudedefine.com/api/v1/booking/lead/define', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(params);

            return false;
        }

	    return result;
	});

	$('.required').keyup(function(){
    	if($(this).val() !== ''){
    		$(this).removeClass('error');
    	}
    });

    $('input[type="checkbox"][name="reasons[]"]').change(function(){
    	if($('input[type="checkbox"][name="reasons[]"]').is(':checked')){
    		$('input[type="checkbox"][name="reasons[]"]').parents('.checkbox').removeClass('error');
    	}
    });

    $('input[name="purpose"]').change(function(){
    	var text = $(this).parent().text().trim();
    	$('#purpose-text').val(text);

        if($(this).val() == 1){
            $('#purpose-code').val('inv');
        }else if($(this).val() == 2){
            $('#purpose-code').val('res');
        }
    });
    $('input[name="purpose"]').eq(0).trigger('change');

    $('input[name="budget_id"]').change(function(){
    	var text = $(this).parent().text().trim();
    	$('#budget-text').val(text);

        var value = $(this).attr('data-value');
        $('#budget-value').val(value);
    });
    $('input[name="budget_id"]').eq(0).trigger('change');

    $('input[name="monthly_budget"]').change(function(){
        var text = $(this).parent().text().trim();
        $('#monthly-budget-text').val(text);
    });
    $('input[name="monthly_budget"]').eq(0).trigger('change');

    $('input[name="reasons[]"]').change(function(){
    	var text = '';
    	$('input[name="reasons[]"]:checked').each(function(){
    		if(text != ''){
    			text += ', ';
    		}

    		text += $(this).parent().text().trim();
    	});

    	$('#reason-text').val(text);
    });
});