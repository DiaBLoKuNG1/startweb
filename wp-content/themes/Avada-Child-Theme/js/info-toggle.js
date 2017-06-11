jQuery('document').ready(function(){
  
  jQuery('.account-info-container .act-item').each(function(){
      var _this = jQuery(this);
      jQuery(this).find('.toggle-bt').click(function(){
        _this.toggleClass('is-collapse');
        _this.find('.content').toggle(300);
      });
  });
});
