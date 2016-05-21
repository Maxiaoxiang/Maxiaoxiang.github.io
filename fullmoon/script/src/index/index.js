(function(){

    $('.sweat').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
        $('.picture').addClass('picture-roate');
    });

})();