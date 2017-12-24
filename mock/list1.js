var result  ={
  noProvinces:[{
    provinceName: "province1 ",
    check:true,
    noServiceCitys: [{
      cityName: 'city1',
      check: true,
      noServiceDistricts: [{
        districtName: 'districtName1',
        check:true,
      }]
    }]
  }, {
    provinceName: "province2 ",
    check:true,
    noServiceCitys: [{
      cityName: 'city2',
      check: true,
      noServiceDistricts: [{
        districtName: 'districtName2',
        check:true
      }]
    }]
  }, {
    provinceName: "province3",
    check:true,
    noServiceCitys: [{
      cityName: 'city3',
      check: true,
      noServiceDistricts: [{
        districtName: 'districtName3',
        check:true
      }]
    }]
  }
],
check:true
}

module.exports = result;
