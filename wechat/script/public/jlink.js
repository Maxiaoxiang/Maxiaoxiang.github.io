/**
 * 移动端块链接
 */

(function(){
	var $document = $(document);
    var holder = 0;
    var isSelect = false;
    $document.find('.container').on('touchend click', '.J_link', function(e) {
        if (isSelect) {
            var $target = $(e.target);
            var $btn = $target.closest('.btn');
            if ($btn.length) {
                $btn.addClass('btn-active');
                e.stopPropagation();
            } else {
                var $this = $(this);
                $this.addClass('J_link_active');
                var $a = $this.find('a[href!="javascript:;"]');
                var url = $a.attr('href');
                if($a.length){
                    location.href = url;
                }
            }
            isSelect = false;
        }
    });
    $document.on('touchstart', function(e) {
        var $target = $(e.target);
        var $J_link = $target.closest('.J_link');
        $('.J_link').removeClass('J_link_active');
        clearTimeout(holder);
        if ($J_link.length && !$('.J_link').hasClass('disabled')) {
            isSelect = true;
            var $btn = $target.closest('.btn');
            if ($btn.length) {
                $btn.addClass('btn-active');
                e.stopPropagation();
            } else {
                holder = setTimeout(function() {
                    $J_link.addClass('J_link_active');
                }, 75);
            }
        }
    });
    $document.find('ul').has('.J_link').parent().on('scroll',function(){
        isSelect = false;
        clearTimeout(holder);
        $('.J_link').removeClass('J_link_active').find('.btn').removeClass('btn-active');
    });
    $document.on('touchmove scroll',function() {
        isSelect = false;
        clearTimeout(holder);
        $('.J_link').removeClass('J_link_active').find('.btn').removeClass('btn-active');
    });
})();