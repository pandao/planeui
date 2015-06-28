(function($) {
    
    function colorPicker(options) {
        options = options || {};

        var defaults = {
            path   : "",
            width  : "",
            height : ""
        };

        var $this    = $(this);
        var settings = $.extend(defaults, options);

        $.getJSON(settings.path + "dist/data/material.design.colors.json", function(json) {
            var colorList = [];
            var nameList  = [];
            var sheet     = "";

            for (var i in json)
            {
                for (var x in json[i])
                {
                    var name  = i + ((x == 500) ? "" : "-" + x);
                    var color = json[i][x];

                    if (color) {
                        nameList.push(name);
                        colorList.push(color);

                        sheet += '<a href="javascript:;" class="pui-bg-' + name + '" name="' + name + '" color="' + color + ' "title="' + name + '" style="z-index:' + (total--) + '"></a>';
                    }
                }
            }

            var total = nameList.length;

            $this.each(function() {
                var wrap      = '<div class="pui-color-picker"></div>';
                var textInput = $(this);

                textInput.wrap(wrap);

                var colorPicker = $(this).parent();
                
                colorPicker.append('<div class="pui-button-sheet-list" style="display:none;"></div>');
                
                var colorSheet  = colorPicker.children(".pui-button-sheet-list").eq(0);

                textInput.bind("click focus touchend", function() {
                    colorSheet.show();
                });

                colorSheet.append(sheet);
                
                var colorBtn = colorSheet.find("a");
                
                if (settings.width !== "") {
                    colorBtn.width(settings.width);
                }
                
                if (settings.height !== "") {
                    colorBtn.height(settings.height);
                }
                
                colorBtn.bind($.clickOrTouch(), function() {
                    var hex   = $(this).attr("color").replace(" ", "");
                    var $name = $(this).attr("name").replace(" ", "");

                    textInput.val(hex).css({
                        color           : ($name === "white") ? "#555" : "#fff",
                        borderColor     : ($name === "white") ? "#ddd" : hex,
                        backgroundColor : hex
                    });
                });

                colorPicker.mouseleave(function(){
                    colorSheet.hide();
                });
            });
        });
    }
    
    $.fn.puiColorPicker = $.fn.materialDesignColorPicker = colorPicker;
    
})(PlaneUI);