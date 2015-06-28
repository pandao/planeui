(function ($) {

    $(function() {    

        $(document).keyup(function(event) {
            if (event.keyCode ==13) {
                $(".pui-search-submit").trigger("click");
            }
        });

        $('.pui-search-single-button').hover(function() {
            var $this = $(this); 
            var hoverWidth = $this.attr('hover-width');
            var keywordInput = $this.find('.pui-search-keywords'); 

            $this.width(hoverWidth);

            keywordInput.removeClass('pui-search-keywords-slide-reverse').addClass('pui-search-keywords-slide');             
            return false;

        }, function() {
            var $this = $(this);
            var width = $this.attr('width');
            var keywordInput = $this.find('.pui-search-keywords'); 

            $this.width(width);

            keywordInput.removeClass('pui-search-keywords-slide-reverse').addClass('pui-search-keywords-slide-reverse');                  
            return false;
        });

    });

})(PlaneUI);