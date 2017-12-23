var result  ={
  noProvinces:[{
    provinceName: "p1 ",
    check:false,
    noServiceCitys: [{
      cityName: 'city1',
      check: true,
      noServiceDistricts: [{
        districtName: '云霄县',
        check:true,
      }]
    }]
  }, {
    provinceName: "p 2 ",
    check:false,
    noServiceCitys: [{
      cityName: ' ',
      check: true,
      noServiceDistricts: [{
        districtName: '云霄县',
        check:true
      }]
    }]
  }, {
    provinceName: "p 3",
    check:false,
    noServiceCitys: [{
      cityName: ' ',
      check: true,
      noServiceDistricts: [{
        districtName: '云霄县',
        check:true
      }]
    }]
  }
],
check:false
}

module.exports = result;
