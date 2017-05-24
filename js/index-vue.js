var page=1;
var listdata=[];
var child1 = new Vue({
    el: '#app-index',
    data: {
        "subjects": [
            {
                "id":"",
                "name":"全部",
                "logo":"/auction/auction/img/all.png"
            }
        ],
        "isShow": false,
        "goodsShow":"",
        "hotSearch":[],
        "type":"",
        "list":[]
    },
    //跨域请求使用https://bird.ioliu.cn/v1?url=
    //使用ready不行使用created可以:(与vue1.0和2.0有关系1.0两个都可以用
    created : function() {
        this.getList();
    },
    methods: {
        //时间格式化
        timeForamt:function getLocalTime(nS) {
                return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            },
        getList(){
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
                    //alldata = alldata.push(data.data.type);
                    data.data.type.forEach(function (item,index) {
                        _this.subjects.push(item)
                    });
                    _this.list = data.data.hot.list
                    // page++;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        loadBottom(){
            //显示底部提示
            $(".mint-loadmore-bottom").show();
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
                    console.log(_this.list);
                    data.data.hot.list.forEach(function (item,index) {
                        _this.list.push(item);
                    });
                    page++;
                    // 若数据已全部获取完毕
                    $(".mint-loadmore-bottom").hide();
                    $(".mint-loadmore-content").css("transform","transform: translate3d(0px, 0px, 0px);")
                },
                error: function () {
                    // 若数据已全部获取完毕
                    $(".mint-loadmore-bottom").hide();
                    $(".mint-loadmore-content").css("transform","transform: translate3d(0px, 0px, 0px);")
                    console.log('请求错误');
                }
            });
        },
        //热门搜索+显示搜索框
        showSearch: function () {
            this.isShow=true;
            var _this=this;
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/city.html",
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