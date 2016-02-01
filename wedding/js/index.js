/*
 * 动画流程
 */
(function(){
    var $love = $('.love');//桃心
    var $begin = $('.love-fly');//点击开始
    var $music = $('.music');//音乐开关
    var $audioa = $('#audioa');

    $begin.on('touchstart click',function(){//动画开始
        pageA();//页面A开始
    });

    $music.on('touchstart click',function(){
        $(this).toggleClass('close');
    });

    /**
     * 页面A
     * 树荫上下摆动，桂花向左飘落，点击桃心掉落，动画开始
     */
    function pageA(){
        $love.removeClass('hover').addClass('begin pages').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
            $love.hide();
            pageB();
        });
    }

    /**
     * 页面B
     * 树荫上下摆动，桃心下落停止，小鸟飞入触碰桃心，桃心掉落小鸟飞走
     */
    function pageB(){
        $('.container').addClass('hide-b');
        $('.page-a').removeClass('active');
        $('.page-b').addClass('active');
        $('.loveb').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
            $('.bird-fly').addClass('fly').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
                $('.bird-fly').removeClass('fly').addClass('bird-stop').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
                    $('.bird-fly').removeClass('bird-stop').addClass('flyup');
                    $('.loveb').addClass('go').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
                        pageC();
                    });
                });
            });
        });
    }

    /**
     * 页面C
     * 桃心掉落到窗户上弹起继续掉落，枫叶从右上飘落左下，衣架前后晃动，窗帘飘动，窗户摆动
     */
     function pageC(){
        $('.container').addClass('hide-c');
        $('.page-b').removeClass('active');
        $('.page-c').addClass('active');
        $('.lovec').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
            pageD();
        });
     }

     /**
     * 页面D
     * 下雪，桃心掉进花盆里，雪越来越大，开灯，花盆树苗生长，飘落花瓣铺满屏幕结束
     */
     function pageD(){
        $('.container').addClass('hide-d');
        $('.page-c').removeClass('active');
        $('.page-d').addClass('active');
        $('.page-a').remove();
        $('.page-b').remove();
        $('.loved').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
            $('.page-close').addClass('close');
            $('.page-c').remove();
            $('#canvas').fadeIn(6000).let_it_snow({
                  speed: 1,
                  count: 50,
                  image: "./image/ParticleSmoke.png"
                });
            $('.text').addClass('showup');
            setTimeout(function(){
                $('.txt').fadeOut('last');
                $('.text').addClass('showdown');
                $('.page-open').stop().animate({opacity: '1'},2000,function(){
                    $('#canvas').fadeOut('last');
                    $('.sapling').addClass('saplinging').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd',function(){
                        $('.sapling').addClass('saplinged');
                        $('.leaves').fadeIn('last');
                    });
                });
            },12000);
        });
     }
})();