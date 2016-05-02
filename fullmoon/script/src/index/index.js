(function(){

	$('.sunshine1').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
        $('.sunshine2').addClass('sunshine-play');
    });

    $('.sunshine2').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
        $('.roate').addClass('roing ani');
    });

    $('.sweat').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
        $('.picture').addClass('picture-roate');
    });

})();