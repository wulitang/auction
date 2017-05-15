var page = 1;
var hotkey,goodsType;
var child1 = new Vue({
    el: '#all-list-all',
    data: {
        list: [],
        type: [],
        searchKey: "",
    },
    created: function () {
        this.getList();
        this.getType();
    },
    methods: {
        //获取url上面的参数
        getPar: function (par) {
            //获取当前URL
            var local_url = document.location.href;
            //获取要取得的get参数位置
            var get = local_url.indexOf(par + '=');
            if (get == -1) {
                return false;
            }
            //截取字符串
            var get_par = local_url.slice(par.length + get + 1);
            //判断截取后的字符串是否还有其他get参数
            var nextPar = get_par.indexOf('&');
            if (nextPar != -1) {
                get_par = get_par.slice(0, nextPar);
            }
            return get_par;
        },
        //时间格式化
        timeForamt: function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        },
        //获取type样式
        getType(){
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/type.html",
                dataType: 'jsonp',
                data: {
                    page:1,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.type = data.data;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //获取所在地区
        getPlace(){
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/getCityGoodsNumber.html",
                dataType: 'jsonp',
                data: {
                    page:1,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.type = data.data;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        getList(){
            //$("#all-list").hide();
            var _this = this;
            //使用ajax
            $.ajax({
                url: "http://211.149.156.151:81/api/Index/index.html",
                dataType: 'jsonp',
                data: {
                    page: page,
                    pageSize: "10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    $("#all-list").hide();
                    console.log(data.data);
                    _this.subjects = data.data.type;
                    _this.list = data.data.hot.list;
                    hotkey = $(".cityId").text();
                    goodsType = $(".goodsType").text();
                    if (hotkey == !false && goodsType == !false){
                        $.ajax({
                            url: "http://211.149.156.151:81/api/Index/index.html",
                            dataType: 'jsonp',
                            data: {
                                page: page,
                                goodsType:goodsType,
                                searchKey:hotkey,
                                pageSize: "10"
                            },
                            type: "post",
                            jsonp: 'callback',
                            success: function (data) {
                                $("#all-list").show();
                                console.log(data.data);
                                _this.subjects = data.data.type;
                                _this.list = data.data.hot.list;
                                // page++;
                            },
                            error: function () {
                                console.log('请求错误');
                            }
                        });
                    }else {
                        $("#all-list").show();
                    }
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
            var _this = this;
            //使用ajax
            $.ajax({
                url: "http://211.149.156.151:81/api/Index/index.html",
                dataType: 'jsonp',
                data: {
                    page: page,
                    pageSize: "10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    var new_data = [];
                    console.log(_this.list);
                    data.data.hot.list.forEach(function (item, index) {
                        new_data = _this.list.push(item)
                    });
                    page++;
                    // 若数据已全部获取完毕
                    $(".mint-loadmore-bottom").hide();
                    $(".mint-loadmore-content").css("transform","transform: translate3d(0px, 0px, 0px);");
                },
                error: function () {
                    // 若数据已全部获取完毕
                    $(".mint-loadmore-bottom").hide();
                    $(".mint-loadmore-content").css("transform", "transform: translate3d(0px, 0px, 0px);");
                    console.log('请求错误');
                }
            });
        },
        handleBottomChange(status){
            this.bottomStatus = status;
        }

    },
});