$(document).ready(function(){
    
    $("#lnb .click").click(function(){
        $(this).next("ul").slideToggle(500);        
    })
    
    
    $(".gnb7>a").click(function(){
        $(".subWrap").slideToggle(500);
    })
}); 