(function(factory) {
    
    "use strict";
    
	if(typeof exports === "object" && typeof module === "object")
    {
		module.exports = factory();
    } 
    else if(typeof define === "function" && (define.amd || define.cmd))
    {
        define(factory);
    }
    else
    {
        window.PUI = window.PlaneUI = window.$ = factory();
    }    
    
})(function() {
    // PlaneUI
            
    return PlaneUI;
});