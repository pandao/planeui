(function ($) {

    $(function(){

        $("pui-radio").each(function(i) {
            var $this = $(this);
            var radio = $('<input type="radio" />'); 
            radio.attr("name", $this.attr('name'));
            radio.val($this.attr('value'));

            if($this.hasClass('checked')) {
                radio.attr("checked", "checked");
            }

            if($this.attr('disabled') == "disabled") {
                radio.attr("disabled", "disabled");
            }

            $this.append(radio); 

            $this.bind($.clickOrTouch(), function() {
                if($(this).attr('disabled') == "disabled") return ;

                var input = $(this).find('input');   

                if(input.attr('checked') == "checked") return ;

                var name = $(this).attr('name'); 
                $('input[name="'+name+'"]').removeAttr('checked');

                $(this).addClass('checked').siblings().removeClass('checked'); 
                input[0].checked = true; 
            });
        });

    });

})(PlaneUI);