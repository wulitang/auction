$(function () {
    //all.html页面js代码
    //筛选js代码
    //筛选选项卡
    $(".choose-condition .condition-item").click(function () {
        var count = $(this).attr("data-number");
        if (count == 0) {
            $(".choose-condition li").eq($(this).index()).addClass("active").siblings().removeClass('active');
            $(".choose-min-1").show();
            $(".choose-min-1 .choose-item").eq($(this).index()).show().siblings().hide();
            $(this).attr("data-number", "1").siblings().attr("data-number", "0");
        } else {
            $(this).attr("data-number", "0");
            $(".choose-condition .condition-item").eq($(this).index()).removeClass("active").siblings().removeClass('active');
            $(".choose-min-1").hide();
            //$(".choose-min-1 .choose-item").eq($(this).index()).show().siblings().hide();
        }
    });
    //全部类型选择
    $(".all-list li").on( "click", function() {
        $(this).addClass("active").siblings().removeClass('active');
    });
    $(".place-list li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    $(".one-buy li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    $(".two-buy li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    $(".three-buy li").click(function () {
        $(this).addClass("active").siblings().removeClass('active');
    });
    //法院主页js代码
    $(".choose-court li").click(function () {
        $(this).addClass("choose-active").siblings().removeClass('choose-active');
        $(".home-min .home-item").eq($(this).index()).show().siblings().hide();
        if($(this).index() == 1){
            $(".choose").hide();
            $(".choose-min-1").hide();
           // $(".choose-court li").removeClass('choose-active');
            $(".choose-condition li").removeClass('active');
            $(".choose-condition li").attr("data-number", "0");
        }else {
            $(".choose").show();
        }
    });
});
