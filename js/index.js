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
    $(".all-list li").click(function () {
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
        }else {
            $(".choose").show();
        }
    });
    //$(".choose-run")
});
// var child1 = new Vue({
//     el: '#app1',
//     data: {
//         "subjects": []
//     },
//     //跨域请求使用https://bird.ioliu.cn/v1?url=
//     //使用ready不行使用created可以:(与vue1.0和2.0有关系1.0两个都可以用
//     created : function() {
//         //this指向问题
//         var _this=this;
//         //使用ajax
//         $.ajax({
//             url:"https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/in_theaters",
//             data: {},
//             type: "get",
//             success: function (data) {
//               //  console.log(data.subjects);
//                 _this.subjects = data.subjects;
//             },
//             error: function () {
//                 console.log('请求错误');
//             }
//         });
//     }
// });