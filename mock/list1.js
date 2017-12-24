
var provinces = [];
var  Mock =require("mockjs");
for(var i =0;i<20;i++){
  provinces.push(
    Mock.mock({
      provinceName: Mock.Random.province(),
      check:Mock.Random.boolean(),
      noServiceCitys: [{
        cityName: 'city'+Mock.Random.integer(),
        check: Mock.Random.boolean(),
        noServiceDistricts: [{
          districtName: 'districtName'+Mock.Random.integer(),
          check:Mock.Random.boolean(),
        }]
      }]
    })
  )

}

var result  ={
  noProvinces:provinces,
  check:true
}


module.exports = result;
