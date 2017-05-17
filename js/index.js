$(function () {
    //筛选选项卡
    $(".choose-condition .condition-item").click(function () {
        var count = $(this).attr("data-number");
        if (count == 0) {
            $(".choose-condition .condition-item").eq($(this).index()).addClass("active").siblings().removeClass('active');
            $(".choose-min-1").show();
            $(".choose-min-1 .choose-item").eq($(this).index()).show().siblings().hide();
            $(this).attr("data-number", "1").siblings().attr("data-number", "0");
            return false;
        } else {
            $(this).attr("data-number", "0");
            $(".choose-condition .condition-item").eq($(this).index()).removeClass("active").siblings().removeClass('active');
            $(".choose-min-1").hide();
            //$(".choose-min-1 .choose-item").eq($(this).index()).show().siblings().hide();
        }
    });
    //弹窗隐藏
    function choosehide() {
        $(".choose-min-1").hide();
        $(".choose-condition li").removeClass('active');
        $(".choose-condition li").attr("data-number", "0");
    }
    //全部类型选择
    $(".all-list").on( "click","li", function() {
        $(this).addClass("active").siblings().removeClass('active');
        choosehide();
    });
    $(".place-list").on("click",".place-list-li",function () {
        $(this).addClass("active").siblings().removeClass('active');
        $(".second-menu li").removeClass('active');
    });
    //所在地区
    $(".second-menu").on( "click","li", function() {
        $(this).addClass("active").siblings().removeClass('active');
        choosehide();
    });
    //条件赛选
    $(".choose-sure").click(function () {
        choosehide();
    });
    //清除条件赛选
    $(".clear-active").click(function () {
        $(".condition-list li").removeClass('active');
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
    //搜索跳转
    $(".search").on("click","em",function () {
        var searchKey = $(".search").find("input").text();
        window.location.href = "/auction/auction/all.html?searchKey="+searchKey;
    });
    //法院列表
    $(".court-list").on( "click",".place-list-li", function() {
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
