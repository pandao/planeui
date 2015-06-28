$(function(){
    //parent.alert(1);
    
    var dialog = parent.$.dialog;
    
    var testDialog; 
    
    $("#btn1").bind($.clickOrTouch(), function(){
        testDialog = dialog({
            content : '<button class="pui-btn pui-btn-success">关闭iframe和父窗口</button>'
        });
        
        var parentDialog = testDialog.parentDialog(location.search); // testDialog.get('dialog.id');
        parentDialog.children = testDialog.id;
        testDialog.parent = parentDialog.id;
        
        testDialog.target.find('.pui-btn').bind($.clickOrTouch(), function(){ 
            parentDialog.close();
            testDialog.close();
        });
    });
});