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
        //获取url上面的参数，有类似方法getQueryString
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

    },
});