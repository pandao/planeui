$(function(){
    
    var defaultDialog = defaultDialog2 = null;
    
    $('#test-default').bind($.clickOrTouch(), function(){
        
        if(defaultDialog == null)
        {
            defaultDialog = $.dialog({
                cache : true,
                fixed : false,
                content : "默认窗口",
                onclose : function(){
                    alert("关闭"+this.id);
                },
                maskClickClosed : false
            });
        } else {
            defaultDialog.show();
        }
    });
    
    $('#test-default2').bind($.clickOrTouch(), function(){
        
        if(defaultDialog2 == null)
        {
            defaultDialog2 = $.dialog({
                cache : true,
                radius : false,
                animated : false,
                content : "无圆角窗口，且无动画",
                padding: 30,
                onclose : function() {
                    alert("关闭"+this.id);
                }
            });
        } else {
            defaultDialog2.show();
        }
    });
    
    $('#test-default-nomask').bind($.clickOrTouch(), function(){
        
        $.dialog({
            mask : false, 
            content : "无透明遮罩背景"
        });
    });
    
    $('#test-default-unclosed').bind($.clickOrTouch(), function() {        
        $.dialog({
            toolbar : false,
            content : "没有关闭按钮"
        });
    });
    
    $('#test-default-transparent-mask').bind($.clickOrTouch(), function(){
        
        $.dialog({
            maskOpacity : 0,
            content : "全透明的遮罩背景<br/>全透明的遮罩背景"
        });
    });
    
    $('#test-default-white-mask').bind($.clickOrTouch(), function(){
        
        $.dialog({
            maskColor: "#fff",
            content : "白色的透明遮罩背景"
        });
    });
    
    $('#test-default-from-id').bind($.clickOrTouch(), function(){
        
        $.dialog({
            from : "#test-form",
            padding: 10,
            content : "从某个ID获取内容"
        });
    });
    
    $('#test-alert').bind($.clickOrTouch(), function(){
        
        $.dialog({
            type:"alert",
            content : "Alert",
            yes : function(){ 
                $.dialog({
                    type:"alert",
                    content : "YES:"+this.id,
                    yes : function(){
                        alert("YES:"+this.id);
                    }
                });
            }
        });
    });
    
    $('#test-alert-app-style').bind($.clickOrTouch(), function(){
        
        $.dialog({
            type:"alert-app",
            content : "Alert",
            buttons : {
                style : {
                    //yes : "color:red;"
                },
                "class" : {
                    //yes : "pui-btn-warning"
                }
            },
            yes : function(){ 
                $.dialog({
                    type:"alert",
                    content : "YES:"+this.id,
                    yes : function(){
                        alert("YES:"+this.id);
                    }
                });
            }
        });
    });
    
    $('#test-confirm').bind($.clickOrTouch(), function(){
        
        $.dialog({
            type : "confirm",
            content : "确定要删除吗？",
            buttons : {
                values : {
                    yes : "嗯，确定",
                    cancel : "我再想想"
                }
            },
            yes : function(){ 
                console.log("confirm yes: "+this.id);
            },
            cancel : function(){ 
                console.log("confirm cancel: "+this.id);
            }
        });
    });
    
    $('#test-confirm-app-style').bind($.clickOrTouch(), function(){
        
        $.dialog({
            type : "confirm-app",
            content : "确定要删除吗？",
            yes : function(){ 
                console.log("confirm yes: "+this.id);
            },
            cancel : function(){ 
                console.log("confirm cancel: "+this.id);
            }
        }, function(){
                console.log("confirm yes####: "+this.id);
        }, function(){
                console.log("confirm cancel####: "+this.id);
        });
    });
    
    $('#test-prompt').bind($.clickOrTouch(), function(){
        
        $.dialog({
            type : "prompt",
            title : "标题XXX",
            content : "prompt文本",
            yes : function(){ 
                var value = this.target.find('[pui-dialog-prompt-input]').val();
                console.log("confirm yes: "+this.id, value);
                
                if(value != "") this.close();
                else {                    
                    $.dialog({
                        animated : false,
                        type:"alert",
                        content : "不能为空"
                    });
                }
            },
            cancel : function(){ 
                console.log("confirm cancel: "+this.id);
            }
        });
    });
    
    $('#test-prompt-app-style').bind($.clickOrTouch(), function(){
        
        $.dialog({
            type : "prompt-app",
            title : "标题XXX",
            content : "prompt文本",
            yes : function(){ 
                var value = this.target.find('[pui-dialog-prompt-input]').val();
                console.log("confirm yes: "+this.id, value);
                
                if(value != "") this.close();
                else {                    
                    $.dialog({
                        //animated : false,
                        type:"alert",
                        content : "不能为空"
                    });
                }
            },
            cancel : function(){ 
                console.log("confirm cancel: "+this.id);
            }
        });
    });
    
    /* 注：图片在动画显示时定位有问题。2014-12-22 00:40 */
    
    $('#test-image').bind($.clickOrTouch(), function() {
        $.dialog({
            type: "image",
            animated: false,
            //top : "bottom",
            padding: 20,
            content : "images/22.jpg"
        });
    });
    
    $('#test-image-list').bind($.clickOrTouch(), function() {
        $.dialog({
            type: "image",
            animated: false,
            padding: 20,
            content : ["images/21.jpg", "images/22.jpg"]
        });
    });
    
    $('#test-loading').bind($.clickOrTouch(), function() {
        $.dialog({
            type: "loading",
            toolbar: false
        });
    });
    
    $('#test-loading-reset').bind($.clickOrTouch(), function() {
        $.dialog({
            type: "loading",
            toolbar: false,
            style : {
                background : "rgba(0,0,0,0.8)",
                color : "#fff"
            },
            content : '<div class="pui-loading pui-loading-ring"></div><p style="margin-top:10px;">正在加载中，请稍后....</p>'
        });
    });
    
    $('#test-table').bind($.clickOrTouch(), function() {
        $.dialog({
            type: "table",
            width: "60%",
            height: "54%",
            content : "http://localhost/ 内容总是上下左右居中"
        });
    });
    
    $('#test-window').bind($.clickOrTouch(), function(){
        $.dialog({
            title : "测试标题",
            type: "window",
            width: "60%",
            height: "48%",
            style: {
                //border: "10px solid #ccc"
            },
            //cache: true,
            //timeout : 1000,
            timeout : function(){console.log("timeout: "+this.id);},  //3秒后自动关闭
            //timeout : [1000, function(){console.log("timeout: "+this.id);}],
            //header : false,
            header : { 
                subTitle : '<small style="color:#fff;">副标题</small>',
                icon     : '<i class="fa fa-image"></i>',
                titleStyle : "color:#fff;",
                style    : "background:red;",
                className : "pui-bg-blue pui-unbordered"
            },
            //toolbar : false,
            content : '测试内容文本<a href="#s">链接</a><header>3秒后自动关闭</header><footer>aaa</footer>',
            padding : 20
        });
    });
    
    $('#test-window-toolbar').bind($.clickOrTouch(), function() {
        $.dialog({
            title : "测试标题",
            type: "window",
            width: "60%",
            height: "48%",
            style: {
                //border: "10px solid #ccc"
            },
            header : { 
                subTitle : '<small style="color:#fff;">副标题</small>',
                icon     : '<i class="fa fa-image"></i>',
                titleStyle : "color:#fff;",
                style    : "background:red;",
                className : "pui-bg-blue pui-unbordered"
            },
            //toolbar : false,
            content : '测试内容文本<a href="#s">链接</a><header>fadsfasdf</header><footer>aaa</footer>',
            padding : 20
        }).toolbar({
            max : function(){
                console.log(this.id);
            },
            close : function(){
                console.log(this.id);
            },
            refresh : true,
            blank : true
        });
    });
    
    $('#test-window-footer').bind($.clickOrTouch(), function() {
        $.dialog({
            title : "测试标题",
            type: "window",
            width: "60%",
            height: "48%",
            style: {
                //border: "10px solid #ccc"
            },
            header : { 
                subTitle : '<small style="color:#fff;">副标题</small>',
                icon     : '<i class="fa fa-image"></i>',
                titleStyle : "color:#fff;",
                style    : "background:red;",
                className : "pui-bg-blue pui-unbordered"
            },
            //toolbar : false,
            content : '测试内容文本<a href="#s">链接</a><header>fadsfasdf</header><footer>aaa</footer>',
            padding : 20,
            //footer : '<small>底栏</small>'
            
        }).footer('<small>底栏</small>');
    });
    
    $('#test-iframe').bind($.clickOrTouch(), function() {
        $.dialog({
            title : "测试标题",
            type: "iframe",
            width: "60%",
            height: "48%",
            url : "./dialog-iframe.html",
            header : { 
                subTitle : '<small style="color:#fff;">副标题</small>',
                icon     : '<i class="fa fa-image"></i>',
                titleStyle : "color:#fff;",
                style    : "background:red;",
                className : "pui-bg-blue pui-unbordered"
            }
        }).toolbar({
            close : function(){
                console.log(this.id);
            }
        });
    });
    
    $('#test-iframe2').bind($.clickOrTouch(), function() {
        $.dialog({
            title : "测试标题",
            type: "iframe",
            width: "60%",
            height: "54%",
            url : "./dialog-iframe2.html",
            header : { 
                subTitle : '<small style="color:#fff;">副标题</small>',
                icon     : '<i class="fa fa-image"></i>',
                titleStyle : "color:#fff;",
                style    : "background:red;",
                className : "pui-bg-blue pui-unbordered"
            }
        }).toolbar({
            close : function(){
                console.log(this.id);
            }
        });
    });
    
    $('#test-iframe-toolbar').bind($.clickOrTouch(), function() {
        $.dialog({
            title : "测试标题",
            type: "iframe",
            width: "60%",
            height: "54%",
            url : "http://www.baidu.com/",
            header : { 
                subTitle : '<small style="color:#fff;">副标题</small>',
                icon     : '<i class="fa fa-image"></i>',
                titleStyle : "color:#fff;",
                style    : "background:red;",
                className : "pui-bg-blue pui-unbordered"
            }
        }).toolbar({
            close : function(){
                console.log(this.id);
            },
            refresh : true,
            blank : true
        });
    });
    
    /*var testWindow = $.dialog({
        title : "测试标题",
        type: "iframe",
        width: "60%",
        height: "48%",
        url : "http://127.0.0.1:11458/tests/dialog-iframe2.html?daadf=dd&ff=1",
        //from : "#test-form",
        style: {
            //border: "10px solid #ccc"
        },
        //cache: true,
        //timeout : 1000,
        //timeout : function(){console.log("timeout: "+this.id);},
        //timeout : [1000, function(){console.log("timeout: "+this.id);}],
        //header : false,
        /*header : { 
            subTitle : '<small style="color:#fff;">副标题</small>',
            icon     : '<i class="fa fa-image"></i>',
            titleStyle : "color:#fff;",
            style    : "background:red;",
            className : "pui-bg-blue pui-unbordered"
        },
        //toolbar : false,
        footer : "<small>底栏</small>",
        onbeforeload : function(){
            console.log('正在加载中...');
        },
        onload : function(){
            console.log('加载完毕。');            
        }
        //content : '测试内容文本<a href="#s">链接</a><header>fadsfasdf</header><footer>aaa</footer>',
        //padding : 20
    }).header({
        //title : "ddd",
        titleStyle : "color:yellow;",
        icon     : '<i class="fa fa-cog"></i>',
        style    : "background:green;",
        className : "pui-unbordered",
        subTitle : '<small style="color:#fff;">副标题xxx</small>'        
    }).resize(640, 480);//.close().show();//.toolbar({max:false});//.footer("").footer(false).header(false);
    */
    /*testWindow.content('新内容').content({
        content : '新内容xxxx',
        padding: 30
    });
    
    testWindow.toolbar({
        max : function(){
            console.log(this.id);
        },
        close : function(){
            console.log(this.id);
        },
        refresh : true,
        blank : true
    });
    
    */
    
    //testWindow.content("http://www.baidu.com/");
    //testWindow.content({url : "http://www.baidu.com/"});
    //testWindow.timeout(false);
    //testWindow.timeout(true);
    //testWindow.timeout(1000);
    /*testWindow.timeout(function(){
        console.log("timeout: "+this.id);
    });
    testWindow.timeout([1000, function(){
        console.log("timeout: "+this.id);
    }]);*/
        
    /*var testAlert = $.dialog({
        title : "测试标题",
        type: "alert",
        content : '测试内容文本<a href="#s">链接</a>',
        padding : 20,
        buttons : {
            values : {
                yes : "是",
                cancel : "否"
            },
            yes : function() {
                alert("yes");
            },
            cancel : function() {
                alert("cancel");
            }
        },
        yes : function() {
            console.log("yes1=>"+ this.settings.id);
        },
        onclose : function() {
            console.log("onclose=>", this.settings.id);
        }
    }, function(){
        console.log("yes2=>"+this.settings.id);
    }, function(){
        console.log("cancel=>"+this.settings.id);
    }).close(function(){
        console.log("close.onclose2=>", this.settings.id);     
        this.yes();
        this.cancel();
    });*/
});        