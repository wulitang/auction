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
            $(".choose-min-1").hide();
           // $(".choose-court li").removeClass('choose-active');
            $(".choose-condition li").removeClass('active');
            $(".choose-condition li").attr("data-number", "0");
        }else {
            $(".choose").show();
        }
    });
    //$(".choose-run")
});
var page=1;
var child1 = new Vue({
    el: '#app-index',
    data: {
        "subjects": [],
        "isShow": false,
        "goodsShow":"",
        "hotSearch":[],
        "type":"",
        "list":[]
    },
    //跨域请求使用https://bird.ioliu.cn/v1?url=
    //使用ready不行使用created可以:(与vue1.0和2.0有关系1.0两个都可以用
    created : function() {
            //this指向问题
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/index.html",
                dataType: 'jsonp',
                data: {
                    page:page,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.subjects = data.data.type;
                    _this.list = data.data.hot.list
                    page++;
                },
                error: function () {
                    console.log('请求错误');
                }
            });

    },
    methods: {
        loadBottom(){
            console.log("2");
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/index.html",
                dataType: 'jsonp',
                data: {
                    page:page,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    var new_data = [];
                    console.log(_this.list);
                    console.log(data.data.hot.list);
                    new_data = _this.list.push(data.data.hot.list);
                    console.log(new_data);
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //热门搜索+显示搜索框
        showSearch: function () {
            var url;
            this.isShow=true;
            var _this=this;
            //var isSearch = e.target.getAttribute('data-num');
            this.goodsShow = isSearch;
            if(1){
                //热门搜索请求接口
                 url = 'http://211.149.156.151:81/api/Index/searchHot.html'
            }else{
                //城市列表请求接口
                url = 'http://211.149.156.151:81/api/Index/city.html'
            }
            $.ajax({
                url:url,
                dataType: 'jsonp',
                data: {},
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    _this.hotSearch = data.data;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //法院拍卖显示弹窗
        //隐藏弹窗
        hideSearch:function () {
            this.isShow=false;
        }
    },

});