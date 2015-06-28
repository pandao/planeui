(function ($) {

    $(function() {

        $("pui-checkbox").each(function(i) {  

            var $this    = $(this);
            var checkbox = $('<input type="checkbox"/>'); 

            checkbox.attr("name", $this.attr('name'));            
            checkbox.val($this.attr('value'));

            if($this.hasClass('checked')) 
            {
                checkbox.attr("checked", "checked");
            }

            if($this.attr('disabled') == "disabled") 
            {
                checkbox.attr("disabled", "disabled");
            }

            $this.append(checkbox);

            $this.bind($.clickOrTouch(), function() {

                if($(this).attr('disabled') == "disabled") return ;

                $(this).toggleClass('checked');

                var input = $(this).find('input'); 

                if(input.attr('checked') == 'checked') 
                {
                    input.removeAttr('checked');
                }
                else 
                {
                    input.attr('checked', 'checked'); 
                }

            });

        });

        $("[checkbox-checked-all]").bind($.clickOrTouch(), function() {
            var name = $(this).attr("checkbox-checked-all");

            $("[name='"+name+"']").each(function() {

                if($(this).attr('disabled') != "disabled") {
                    $(this).addClass("checked");

                    var input = $(this).find('input'); 
                    input.attr('checked', 'checked'); 
                }
            });
        });

        $("[checkbox-cancel]").bind($.clickOrTouch(), function() {
            var name = $(this).attr("checkbox-cancel");

            $("[name='"+name+"']").each(function() {

                if($(this).attr('disabled') != "disabled") {
                    $(this).removeClass("checked");

                    var input = $(this).find('input'); 
                    input.removeAttr('checked'); 
                }
            });
        });

        $("[checkbox-inverse]").bind($.clickOrTouch(), function() {
            var name = $(this).attr("checkbox-inverse");

            $("[name='"+name+"']").each(function() { 

                if($(this).attr('disabled') != "disabled") {

                    var input = $(this).find('input'); 

                    if($(this).attr("class") == "checked") {
                        $(this).removeClass("checked");
                        input.removeAttr('checked'); 
                    } else {
                        $(this).addClass("checked");
                        input.attr('checked', 'checked'); 
                    }
                } 
            });
        });

    });

})(PlaneUI);