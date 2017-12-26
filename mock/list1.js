
var provinces = [];
var  Mock =require("mockjs");


for(var i =0;i<20;i++){
  var provvinceNumber = Mock.Random.integer(1,100)*i
  var outProvvinceArr = {
    provinceName: Mock.Random.province(),
    check:0,
    noServiceCitys:[]
  }
  for(var j = 0;j<5;j++){
    var cityNumber = Mock.Random.integer(1,100)*j
    var noServiceCitysArr = {
      cityName:provvinceNumber+ "-city "+ cityNumber,
      check:0,
      noServiceDistricts:[]
    };
     for(var k = 0;k<5;k++){
       var noServiceDistrictsArr = {
          districtName:"districtName "+cityNumber,
          check:0,
       };
       noServiceCitysArr.noServiceDistricts.push(noServiceDistrictsArr);
     }
     outProvvinceArr.noServiceCitys.push(noServiceCitysArr);
  }


  // provinces.push(
  //   Mock.mock({
  //     provinceName: Mock.Random.province(),
  //     check:1,
  //     noServiceCitys: [{
  //       cityName: 'city'+Mock.Random.integer(1,100),
  //       check: 2,
  //       noServiceDistricts: [{
  //         districtName: 'districtName'+Mock.Random.integer(1,100),
  //         check:3,
  //       }]
  //     }]
  //   })
  // )

  provinces.push(outProvvinceArr)
}

var result  ={
  noProvinces:provinces,
  check:true
}


module.exports = result;
