
var provinces = [];
var  Mock =require("mockjs");


for(var i =0;i<20;i++){
  var provvinceNumber = Mock.Random.integer(1,100)*i
  var outProvvinceArr = {
    provinceName: Mock.Random.province(),
    check:1,
    noServiceCitys:[]
  }
  for(var j = 0;j<5;j++){
    var cityNumber = Mock.Random.integer(1,100)*j
    var noServiceCitysArr = {
      cityName:provvinceNumber+ "-city "+ cityNumber,
      check:1,
      noServiceDistricts:[]
    };
     for(var k = 0;k<5;k++){
       var noServiceDistrictsArr = {
          districtName:k+" district "+cityNumber,
          check:1,
       };
       noServiceCitysArr.noServiceDistricts.push(noServiceDistrictsArr);
     }
     outProvvinceArr.noServiceCitys.push(noServiceCitysArr);
  }
  provinces.push(outProvvinceArr)
}

var result  ={
  noProvinces:provinces,
  check:true
}


module.exports = result;
