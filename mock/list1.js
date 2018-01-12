
var provinces = [];
var  Mock =require("mockjs");


for(var i =0;i<20;i++){
  var provvinceNumber = Mock.Random.integer(1,100)*i
  var outProvvinceArr = {
    provinceName: Mock.Random.province(),
    check:1,
    leveltwoArray:[]
  }
  for(var j = 0;j<5;j++){
    var cityNumber = Mock.Random.integer(1,100)*j
    var levels2Arr = {
      cityName:provvinceNumber+ "-city "+ cityNumber,
      check:1,
      levelthreeArray:[]
    };
     for(var k = 0;k<5;k++){
       var levelthreeArrayArr = {
          districtName:k+" district "+cityNumber,
          check:1,
       };
       levels2Arr.levelthreeArray.push(levelthreeArrayArr);
     }
     outProvvinceArr.leveltwoArray.push(levels2Arr);
  }
  provinces.push(outProvvinceArr)
}

var result  ={
  leveloneArray:provinces,
  check:true
}


module.exports = result;
