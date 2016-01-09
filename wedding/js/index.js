/*
 * 动画流程
 */
(function(){
    var $love = $('.love');//桃心
    var $begin = $('.love-fly');//点击开始

    $begin.click(function(){//动画开始
        pageA();//页面A开始
        $('#audio').attr('src','./music/b.mp3');//改变音乐
    });

    /**
     * 页面A
     * 树荫上下摆动，桂花向左飘落，点击桃心掉落，动画开始
     */
    function pageA(){
        $love.removeClass('hover').addClass('begin').animate({
            'top':'95%'
        },1200,function(){
            $love.hide();
            pageB();
        });
    }

    /**
     * 页面B
     * 树荫上下摆动，桃心下落停止，小鸟飞入触碰桃心，桃心掉落小鸟飞走
     */
    function pageB(){
        $('.page-a').animate({
            'top':'-100%'
        },1000);
        $('.page-b').animate({
            'top':'0'
        },1000,function(){
            $('.page-a').remove();//删页面A
            setTimeout(function(){
                $('.b-tree').addClass('tree-down');
            },700);
            $('.loveb').fadeIn().addClass('begin-b').animate({
                'top':'78%'
            },2000,function(){
                $('.bird-fly').animate({
                    'top':'74%',
                    'left':'30%'
                },3000,function(){
                    $('.bird-fly').addClass('bird-stop').animate({
                        'left':'40%'
                    },1000,function(){
                        $('.bird-fly').removeClass('bird-stop').animate({
                            'top':'30%',
                            'left':'100%'
                        },2000);
                        $('.loveb').removeClass('begin-stop').addClass('go').animate({
                            'top':'96%'
                        },1200,function(){
                            $('.loveb').fadeOut();
                            pageC();
                        });
                    });
                });
            }).on('webkitAnimationEnd',function(){
                $('.loveb').addClass('begin-stop');
            });
        });
    }

    /**
     * 页面C
     * 桃心掉落到窗户上弹起继续掉落，枫叶从右上飘落左下，衣架前后晃动，窗帘飘动，窗户摆动
     */
     function pageC(){
        $('.page-b').animate({
            'top':'-100%'
        },1000,function(){
            $('.page-b').remove();
        });
        $('.window').addClass('window-begin');
        $('.page-c').animate({
            'top':'0'
        },1000,function(){
            $('.lovec').show().addClass('lovec-begin').on('webkitAnimationEnd',function(){
                pageD();
            });
        });
     }

     /**
     * 页面D
     * 下雪，桃心掉进花盆里，雪越来越大，开灯，花盆树苗生长，飘落花瓣铺满屏幕结束
     */
     function pageD(){
        var $p = $('.text').find('p');
        function foo(){
            $p.animate({
                'opacity':'1',
                'top':'-.5rem'
            },1000);
        }
        $('.page-c').animate({
            'top':'-100%'
        },1000,function(){
            $('.page-c').remove();
        });
        $('.page-d').animate({
            'top':'0'
        },1000,function(){
            $('.loved').fadeIn().addClass('loved-begin');
            setTimeout(function(){
                $('.page-close').stop().animate({opacity: '1'},600,function(){
                    snow();
                    $('#canvas').fadeIn(3000);
                    setTimeout(function(){
                        foo();
                    },1000);
                    setTimeout(function(){
                        $('.page-open').stop().animate({opacity: '1'},2000,function(){
                        });
                        $('.text').fadeOut('last');
                        $('#canvas').fadeOut('last');
                        $('.sapling').addClass('saplinging').on('webkitAnimationEnd',function(){
                            $(this).addClass('saplinged');
                            $('.leaves').fadeIn('last');
                        });
                        setTimeout(function(){
                            $('.leaves').fadeOut();
                            $('.over').addClass('over-go').on('webkitAnimationEnd',function(){
                                window.location.reload();
                            });
                        },8000);
                    },5000);
                });
            },2000);
        });
     }
})();