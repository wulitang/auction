var page=1;
var listdata=[];
var child1 = new Vue({
    el: '#search',
    data: {
        "hotSearch":[]
    },
    //跨域请求使用https://bird.ioliu.cn/v1?url=
    //使用ready不行使用created可以:(与vue1.0和2.0有关系1.0两个都可以用
    created : function() {
        this.showSearch();
    },
    methods: {
        //热门搜索+显示搜索框
        showSearch: function () {
            var _this =this;
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/searchHot.html",
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
    },

});