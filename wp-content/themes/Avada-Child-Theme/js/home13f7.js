jQuery(document).ready(function(){

  jQuery('.home #wrapper #main #home-news-hilight .fusion-image-size-fixed img[sizes="(max-width: 320px) 100vw, 320px"]')
	.attr('sizes',"(max-width: 320px) 100vw, 640px");

adr_objs = jQuery('.webinar-item .content .act-box');

for(i = 0; i < adr_objs.length; i++) {
	if(jQuery(adr_objs[i]).find('a.thumb-box').attr('href') == "http://thac.or.th/events/adr-week/" || jQuery(adr_objs[i]).find('a.thumb-box').attr('href') == "http://thac.or.th/en/events/adr-week/") {
		jQuery(adr_objs[i]).find('a.thumb-box').attr("href", "http://thac.or.th/adrweek/");
	}

	if(jQuery(adr_objs[i]).find('h4.title a').text() == "ADR WEEK" && 
		( jQuery(adr_objs[i]).find('h4.title a').attr('href') == "http://thac.or.th/events/adr-week/" ||
		  jQuery(adr_objs[i]).find('h4.title a').attr('href') == "http://thac.or.th/en/events/adr-week/" 					   
		)) {
		jQuery(adr_objs[i]).find('h4.title a').attr("href", "http://thac.or.th/adrweek/");
	}
}
							   
							   
  if(jQuery('#home-news-hilight .fusion-posts-container').length){
    jQuery('#home-news-hilight .fusion-posts-container').slick({
      prevArrow: '<div prev-bt><i class="fa fa-caret-left"></i> </div>',
      nextArrow: '<div next-bt><i class="fa fa-caret-right"></i> </div>',
      cssEase: 'cubic-bezier(0.23, 1, 0.32, 1)'
    });
  }

  if(jQuery('#home-news-latest .fusion-posts-container').length){
    jQuery('#home-news-latest .fusion-posts-container').slick({
      prevArrow: '<div prev-bt><i class="fa fa-caret-left"></i> </div>',
      nextArrow: '<div next-bt><i class="fa fa-caret-right"></i> </div>',
      slidesToShow: 4,
      cssEase: 'cubic-bezier(0.23, 1, 0.32, 1)',
      speed: 400,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }
  
  if (typeof newsletter_check !== "function") {
	window.newsletter_check = function (f) {
    var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-]{1,})+\.)+([a-zA-Z0-9]{2,})+$/;
    if (!re.test(f.elements["ne"].value)) {
        alert("The email is not correct");
        return false;
    }
    for (var i=1; i<20; i++) {
    if (f.elements["np" + i] && f.elements["np" + i].required && f.elements["np" + i].value == "") {
        alert("");
        return false;
    }
    }
    if (f.elements["ny"] && !f.elements["ny"].checked) {
        alert("You must accept the privacy statement");
        return false;
    }
    return true;
}
}
});
