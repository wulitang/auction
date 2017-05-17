var page = 1;
var auctionMode,purchaseMethod,Status;
var child1 = new Vue({
    el: '#all-list-all',
    data: {
        list: [],
        type: [{id: "", name: "全部", co: ""}],
        citylist:[],
        courtlist:[],
        getCitys:[],
        choosecitys:[]
    },
    created: function () {
        this.getList();
        this.getType();
        this.getCity();
    },
    methods: {
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
                    //console.log(data.data);
                    data.data.forEach(function (item,index) {
                        _this.type.push(item);
                    });
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //获取二级城市列表
        choosecity(event){
            var _this=this;
            cityId=event.currentTarget.id;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/getCityCourt.html",
                dataType: 'jsonp',
                data: {
                    cityId:cityId,
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.choosecitys = data.data;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //获取所在地区
        getCity(){
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/city.html",
                dataType: 'jsonp',
                data: {
                    page:1,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.getCitys = data.data;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //筛选所在地新数据
        getNew(event){
            cityId = event.currentTarget.id;
            this.search();
        },
        //筛选全部类型数据
        getAll(event){
            typeId = event.currentTarget.id;
            this.search();
        },
        //获取拍卖方式
        getMode(event){
            auctionMode = event.currentTarget.id;
            console.log(auctionMode);
        },
        //购买方式
        getpurchase(event){
            purchaseMethod = event.currentTarget.id;
            console.log(purchaseMethod);
        },
        //状态
        getstatus(event){
            Status = event.currentTarget.id;
            console.log(Status);
        },
        sureDate(){
            this.search();
        },
        search(){
            var _this=this;
            $.ajax({
                url: "http://211.149.156.151:81/api/Index/search.html",
                dataType: 'jsonp',
                data: {
                    page: 1,
                    cityId:cityId,
                    typeId:typeId,
                    goodsType:goodsType,
                    searchKey:searchKey,
                    auctionMode:auctionMode,
                    purchaseMethod:purchaseMethod,
                    status:Status,
                    pageSize: "10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data);
                    _this.list = data.list;
                },
                error: function () {
                    // 若数据已全部获取完毕
                    console.log('请求错误');
                }
            });
        },
        //获取城市法院所在地
        getcourt(){
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/city.html",
                dataType: 'jsonp',
                data: {
                    page:1,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.courtlist = data.data;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //获取数据
        getList(){
            var _this = this;
            //使用ajax
            $.ajax({
                url: "http://211.149.156.151:81/api/Index/index.html",
                dataType: 'jsonp',
                data: {
                    page: page,
                    cityId:cityId,
                    typeId:typeId,
                    goodsType:goodsType,
                    searchKey:searchKey,
                    pageSize: "10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    $("#all-list").hide();
                    console.log(data.data);
                    _this.subjects = data.data.type;
                    _this.list = data.data.hot.list;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //下拉获取数据
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
                    cityId:cityId,
                    typeId:typeId,
                    goodsType:goodsType,
                    searchKey:searchKey,
                    auctionMode:auctionMode,
                    purchaseMethod:purchaseMethod,
                    status:Status,
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