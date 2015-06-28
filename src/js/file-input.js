(function($) {
    
    $.fn.fileInput = function(onchange) {

        $(this.selector ? this.selector : ".pui-file-input").each(function() {
            var $this     = $(this);
            var fileInput = $this.find("input[type=\"file\"]");
            var btn       = $this.find(".pui-file-input-btn");

            fileInput.bind("change", function() {
                $.proxy(onchange || function() {}, this)();
            });

            btn.bind("click", function() {
                fileInput.trigger("click");
            });
        });
    };

})(PlaneUI);