var cityTwo;
var child1 = new Vue({
    el: '#court',
    data: {
        Citytype: [],
        cityTwo:[]
    },
    created: function () {
        this.getPlace();
    },
    methods: {
        //获取所在地区
        getPlace(){
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/getCityGoodsNumber.html",
                dataType: 'jsonp',
                data: {
                    page:1,
                    cityId:cityId,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.Citytype = data.data;
                     cityTwo =data.data[0].id;
                     console.log(cityTwo);
                        $.ajax({
                            url:"http://211.149.156.151:81/api/Index/court.html",
                            dataType: 'jsonp',
                            data: {
                                page:1,
                                cityId:cityTwo,
                                pageSize:"10"
                            },
                            type: "post",
                            jsonp: 'callback',
                            success: function (data) {
                                console.log(data.data);
                                _this.cityTwo = data.data;
                            },
                            error: function () {
                                console.log('请求错误');
                            }
                        });
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },
        //获取法院列表
        getNext(event){
             cityTwo = event.currentTarget.id;
            console.log(cityTwo);
            var _this=this;
            //使用ajax
            $.ajax({
                url:"http://211.149.156.151:81/api/Index/court.html",
                dataType: 'jsonp',
                data: {
                    page:1,
                    cityId:cityTwo,
                    pageSize:"10"
                },
                type: "post",
                jsonp: 'callback',
                success: function (data) {
                    console.log(data.data);
                    _this.cityTwo = data.data;
                },
                error: function () {
                    console.log('请求错误');
                }
            });
        },

    },
});