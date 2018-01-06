<template type="html">
<el-dialog class="dialogNoServer" title="选择地区" custom-class="dialogNoServerWidth" :visible.sync="internalVisible" @close="dialogClose" v-loading.body.fullscreen.lock="fullscreenLoading">
  <el-row :span="24" style="border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);">
    <el-col :span="6">
      <li class="commonli-class li-title">省份</li>
      <ul class="ul-block" v-if="internalVisible">
        <li v-if='(item.check)&&onlyRead||!onlyRead' class="commonli-class" :class="[index ==li0 ?activeClass:'',commonliClass]" @click="li1Click($event,index,item)" v-for="(item,index) in sourceData.noProvinces">{{item.provinceName}}</li>
      </ul>
    </el-col>
    <el-col :span="9">
      <li class="commonli-class li-title">城市</li>
      <ul class="ul-block">
        <el-collapse-transition>
          <div v-if="showLi">
            <checkbox-group v-model="checkCity">
              <li v-if='((item.check||item.noServiceDistricts.some(function(im){ return im.check>0}))&&onlyRead)||!onlyRead' :class="[index==li1?activeClass:'', commonliClass]" @click="li1Click2($event,item,index)" v-for="(item,index) in list2" :key="index" style="position:relative">
                <span class="city-span">{{item.cityName}}</span>
                <checkbox v-if="!onlyRead" class="checkbox-common" :label="item.cityName+'收'" :key="item.cityName+'收件'" @change="handleCheckAllChange(index,item,$event,2)">收件</checkbox>
                <checkbox v-if="!onlyRead" class="checkbox-common" :label="item.cityName+'寄'" :key="item.cityName+'寄件'" @change="handleCheckAllChange(index,item,$event,1)">寄件</checkbox>
              </li>
            </checkbox-group>
          </div>
        </el-collapse-transition>
      </ul>
    </el-col>
    <el-col :span="9">
      <li class="commonli-class li-title">区县</li>
      <ul class="ul-block">
        <el-collapse-transition>
          <div v-if="showLi2">
            <checkbox-group v-model="checkedDistric" @change="handleDistricChange">
              <li v-if='(item.check&&onlyRead)||!onlyRead' class="commonli-class" :style="{'text-align':onlyRead?'center':''}" v-for="(item,index) in list3">
                <span class="distric-span" v-if="!onlyRead">{{item.districtName}}</span>
                <checkbox class="" style="padding-left:10px;" v-if="!onlyRead" :label="item.districtName+'寄'" @change="handleCheckbox(index,$event,1)" :key="item.districtName+'寄'">寄件</checkbox>
                <checkbox class="" v-if="!onlyRead" :label="item.districtName+'收'" @change="handleCheckbox(index,$event,2)" :key="item.districtName+'收'">收件</checkbox>
                <!-- <checkbox  class="checkbox-common"  v-if="!onlyRead" :label="item.districtName+'寄收件'" @change="handleCheckbox(index,$event,3)"  :key="item.districtName+'寄收件'">寄收件</checkbox> -->
                <span v-if="onlyRead" style="display:inline-block;width:110px;text-align:right;overflow:hidden;white-space: nowrap;
                  text-overflow: ellipsis;">{{item.districtName}}</span>
                <span style="display:inline-block;width:100px;text-align:left">
                  <el-tag  type="primary" v-if="onlyRead&&item.check%2===1" >寄件</el-tag>
                  <el-tag  type="primary" v-if="onlyRead&&item.check>1" >收件</el-tag>
                </span>

              </li>
            </checkbox-group>
          </div>
        </el-collapse-transition>
      </ul>
    </el-col>
  </el-row>
  <div v-if="!onlyRead" slot="footer" class="dialog-footer">
    <el-button @click="internalVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSave">保 存</el-button>
  </div>

</el-dialog>
</template>

<script type="text/javascript">
import checkbox from "./checkbox";
import checkboxGroup from "./checkboxGroup"
import Emitter from "../mixins/emitter"
export default {
  name: 'checkServer',
  mixins: [Emitter],
  components: {
    checkbox,
    checkboxGroup
  },
  data() {
    return {
      fullscreenLoading: false,
      activeClass: 'activeClass',
      commonliClass: 'commonli-class',
      li0: '-1',
      li1: '-1',
      showLi: false,
      showLi2: false,
      lists1: [],
      list2: [],
      list3: [],
      checkedDistric: [],
      checkedData: [],
      checkCity: [],
      checkAll: [],
      districChecked: false,
      isIndeterminate: [] // 表示 城市全选框的 不确定状态;
    }
  },
  props: {
    visible: Boolean,
    sourceData: Object,
    onlyRead: Boolean,
    logisMerchId: Number
  },
  created() {


  },
  computed: {
    internalVisible: {
      //getter
      get: function() {
        return this.visible
      },
      set: function(newValue) {

      }
    }
  },
  watch: {
    '$route': function(to, from) {},


    onlyRead: function(newData, oldData) {
      this.li0 = '-1';
      this.li1 = '-1';
      this.showLi = false;
      this.showLi2 = false;
    },
    sourceData: function(newData, oldData) {
      console.log(newData + "--------------" + oldData);
      this.checkedData = newData.noProvinces;
      if (!this.onlyRead) {
        this.li1Click('event', 0, newData.noProvinces[0]);
        this.li1Click2('event', newData.noProvinces[0].noServiceCitys && newData.noProvinces[0].noServiceCitys[0], 0)
      } else {
        let index1, index2;
        for (let i = 0; i < newData.noProvinces.length; i++) {
          if (newData.noProvinces[i].check) {
            index1 = i;
            break;
          }
        }
        this.li1Click('event', index1, newData.noProvinces[index1]);
        if (typeof newData.noProvinces[index1] !== "undefined") {
          for (let k = 0; k < newData.noProvinces[index1].noServiceCitys.length; k++) {
            if (newData.noProvinces[index1].noServiceCitys[k].check || newData.noProvinces[index1].noServiceCitys[k].noServiceDistricts.some(function(im) {
                return im.check > 0
              })) {
              index2 = k;
              break;
            }
          }
          this.li1Click2('event', newData.noProvinces[index1].noServiceCitys[index2], index2);
        }
      }
    }
  },
  methods: {
    /**
     *  点击城市全选，将城市noServiceCitys 数组中对应的项，改变check属性，分别有0,1,2,3 四种情况，
     *  并且改变 checkedDistric 数组中的的区县内容，相应的全部加入，活着 设置为空，
     *  @method handleCheckAllChange
     *  @param  {Number}             index     获取到点击全选的是哪一项
     *  @param  {Object}             item      保存点击城市对应的整个对象数据，通过v-for循环中获取到的 item 变量
     *  @param  {Object}             event     获取到原生的事件对象，用来判断里面的e.target.checkecd;
     *  @param  {Number}            sendOrRec  2，代表收件   1，代表寄件
     *  @return {null}                         返回未空。
     **/
    handleCheckAllChange(index, item, event, sendOrRec) {
      if (this.onlyRead) return;
      // 首先，获取到checkbox 复选框 点击之前的check 属性对应的数
      let oldChecked = this.checkedData[this.li0].noServiceCitys[index].check
      // oldChecked ： 0, 两个都没有选中   1， 选中了寄件    2， 选中了收件，   3， 选中了收件
      if (event.target.checked) {
        this.checkedData[this.li0].noServiceCitys[index].check = oldChecked + sendOrRec;
      } else {
        this.checkedData[this.li0].noServiceCitys[index].check = oldChecked - sendOrRec;
      }
      let tempArrSed = [],
        tempArrRec = [];
      for (let i = 0; i < item.noServiceDistricts.length; i++) {
        let oldDistrictsCheck = this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts[i].check;
        if (event.target.checked) {
          this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts[i].check = oldDistrictsCheck + sendOrRec;
        } else {
          this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts[i].check = oldDistrictsCheck - sendOrRec;
        }
        // tempArrSed, tempArrRec 中 填入 寄件，收件。
        tempArrSed.push(item.noServiceDistricts[i].districtName + '寄');
        tempArrRec.push(item.noServiceDistricts[i].districtName + '收');
      }
      if (this.checkedData[this.li0].noServiceCitys[index].check === 3) {
        this.checkedDistric = tempArrSed.concat(tempArrRec)
      } else if (this.checkedData[this.li0].noServiceCitys[index].check === 2) {
        if (oldChecked === 3) {
          this.checkedDistric = tempArrRec;
        } else {
          this.checkedDistric = this.checkedDistric.filter(function(item) {
            return item.indexOf('寄') > -1
          }).concat(tempArrRec);
        }
      } else if (this.checkedData[this.li0].noServiceCitys[index].check === 1) {
        if (oldChecked === 3) {
          this.checkedDistric = tempArrSed;
        } else {
          this.checkedDistric = this.checkedDistric.filter(function(item) {
            return item.indexOf('收') > -1
          }).concat(tempArrSed);
        }
      } else if (this.checkedData[this.li0].noServiceCitys[index].check === 0) {
        if (oldChecked === 2) {
          this.checkedDistric = this.checkedDistric.filter(function(item) {
            return item.indexOf('寄') > -1
          })
        } else if (oldChecked === 1) {
          this.checkedDistric = this.checkedDistric.filter(function(item) {
            return item.indexOf('收') > -1
          })
        } else if (oldChecked === 0) {
          this.checkedDistric = [];
        }
      }
      // this.checkedDistric.splice(index, 1, event.target.checked ? this.gridData[index].city : [])
      // this.isIndeterminate.splice(index, 1, false);
      // this.observeCheckAll();

      // this.checkedData=   [
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districtName:'云霄县'}]  }      ]}
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districtName:'云霄县'}]  }      ]}
      // {provinceName:" ",
      //   noServiceCitys:[ {cityName:' ',Checked:true,noServiceDistricts:[{districtName:'云霄县'}]  }      ]}
      //     [{cityName:' ',districtName:[]},{cityName:' ',districtName:[]},{cityName:' ',districtName:[]} ],
      //     [{cityName:' ',districtName:[]},{cityName:' ',districtName:[]},{cityName:' ',districtName:[]} ],
      //     [{cityName:' ',districtName:[]},{cityName:' ',districtName:[]},{cityName:' ',districtName:[]} ],
      //   ]
    },
    handleCheckbox(index, event, sendOrRec) {
      if (this.onlyRead) return;
      let oldCheck = this.checkedData[this.li0].noServiceCitys[this.li1].noServiceDistricts[index].check

      this.checkedData[this.li0].noServiceCitys[this.li1].noServiceDistricts[index].check = event.target.checked ? (oldCheck + sendOrRec) : (oldCheck - sendOrRec);
    },
    // 区县选择 多选框
    handleDistricChange() {
      if (this.onlyRead) return;
      //  记录对应的数据到指定的数据结构当中
      let tempCityName = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].cityName;
      let checkedDataDistrictNameSedLength = 0,
        checkedDataDistrictNameRecLength = 0;
      this.checkedDistric.forEach(function(value, index) {
        if (value[value.length - 1] === '寄') {
          checkedDataDistrictNameSedLength++
        };
        if (value[value.length - 1] === '收') {
          checkedDataDistrictNameRecLength++
        };
      })

      let sourceDataDistrictNameLength = this.sourceData.noProvinces[this.li0].noServiceCitys[this.li1].noServiceDistricts.length
      let oldCitysCheck = this.checkedData[this.li0].noServiceCitys[this.li1].check;
      if (checkedDataDistrictNameSedLength >= sourceDataDistrictNameLength) {
        // 代表已经把未覆盖区县中的数据手动全选了
        if (oldCitysCheck % 2 === 0) {
          this.checkedData[this.li0].noServiceCitys[this.li1].check = 1 + oldCitysCheck;
        }
        if (this.checkCity.indexOf(tempCityName + '寄') < 0) this.checkCity.push(tempCityName + '寄');

      } else {
        if (oldCitysCheck % 2 === 1) {
          this.checkedData[this.li0].noServiceCitys[this.li1].check = oldCitysCheck - 1;
        }
        if (this.checkCity.indexOf(tempCityName + '寄') >= 0) this.checkCity.splice(this.checkCity.indexOf(tempCityName + '寄'), 1);
      }
      // 手件地址
      if (checkedDataDistrictNameRecLength >= sourceDataDistrictNameLength) {
        // 代表已经把未覆盖区县中的数据手动全选了
        if (oldCitysCheck < 2) {
          this.checkedData[this.li0].noServiceCitys[this.li1].check = 2 + oldCitysCheck;
        }
        if (this.checkCity.indexOf(tempCityName + '收') < 0) this.checkCity.push(tempCityName + '收');

      } else {
        if (oldCitysCheck > 1) {
          this.checkedData[this.li0].noServiceCitys[this.li1].check = oldCitysCheck - 2;
        }
        if (this.checkCity.indexOf(tempCityName + '收') >= 0) this.checkCity.splice(this.checkCity.indexOf(tempCityName + '收'), 1);
      }
    },
    li1Click(event, index, item) {
      this.li0 = index;
      this.showLi = false;
      // console.log(this.checkedData);
      if (!this.onlyRead) {
        this.checkedData[this.li0] = this.checkedData[this.li0] ?
          this.checkedData[this.li0] : {
            provinceName: item.provinceName,
            noServiceCitys: []
          };
        var noServiceCitysArr = this.checkedData[index].noServiceCitys
        if (noServiceCitysArr.length > 0) {
          let tempArr = [];
          for (let k = 0; k < noServiceCitysArr.length; k++) {
            if (typeof noServiceCitysArr[k] === "object") {

              if (noServiceCitysArr[k].check) tempArr.push(noServiceCitysArr[k].cityName);
              if (noServiceCitysArr[k].check === 3) {
                tempArr.push(noServiceCitysArr[k].cityName + '寄');
                tempArr.push(noServiceCitysArr[k].cityName + '收');
              } else if (noServiceCitysArr[k].check === 2) {
                tempArr.push(noServiceCitysArr[k].cityName + '收');
              } else if (noServiceCitysArr[k].check === 1) {
                tempArr.push(noServiceCitysArr[k].cityName + '寄');
              }
            }
          }
          this.checkCity = tempArr;
        } else {
          this.checkCity = [];
        }
      }

      this.list2 = this.sourceData.noProvinces[index].noServiceCitys;
      this.$nextTick(function() {
        this.showLi = true;
      })
      this.showLi2 = false;
      if (!this.onlyRead) {
        this.li1Click2('event', this.sourceData.noProvinces[index].noServiceCitys && this.sourceData.noProvinces[index].noServiceCitys[0], 0)
      } else {
        let index2;
        if (typeof this.sourceData.noProvinces[index] !== "undefined") {
          for (let k = 0; k < this.sourceData.noProvinces[index].noServiceCitys.length; k++) {
            console.log(" k " + this.sourceData.noProvinces[index].noServiceCitys[k].check);
            if (this.sourceData.noProvinces[index].noServiceCitys[k].check || this.sourceData.noProvinces[index].noServiceCitys[k].noServiceDistricts.some(function(im) {
                return im.check > 0
              })) {
              index2 = k;
              break;
            }
          }
          this.li1Click2('event', this.sourceData.noProvinces[index].noServiceCitys[index2], index2);
        }
      }
    },
    li1Click2(event, item, index) {
      this.checkedDistric = [];
      this.li1 = index;
      this.showLi2 = false;
      this.list3 = item.noServiceDistricts;
      //  console.log(this.checkedData);
      if (!this.onlyRead) {
        if (Object.prototype.toString.call(this.checkedData[this.li0].noServiceCitys[index]) === "[object Object]") {
          var noServiceDistrictsArr = this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts;
          if (noServiceDistrictsArr && noServiceDistrictsArr.length > 0) {
            let tempArr = [];
            for (let i = 0; i < noServiceDistrictsArr.length; i++) {
              if (noServiceDistrictsArr[i].check === 3) {
                tempArr.push(noServiceDistrictsArr[i].districtName + "寄");
                tempArr.push(noServiceDistrictsArr[i].districtName + "收");
              } else if (noServiceDistrictsArr[i].check === 2) {
                tempArr.push(noServiceDistrictsArr[i].districtName + "收");
              } else if (noServiceDistrictsArr[i].check === 1) {
                tempArr.push(noServiceDistrictsArr[i].districtName + "寄");
              }
            }
            this.checkedDistric = tempArr;
          } else {
            this.checkedData[this.li0].noServiceCitys[index].noServiceDistricts = [];
            this.checkedDistric = [];
          }
        } else {
          this.checkedData[this.li0].noServiceCitys[index] = {};
        }
      }
      this.$nextTick(function() {
        this.showLi2 = true;
      })
    },
    dialogClose() {
      this.showLi = false;
      this.showLi2 = false;
      // this.dispatch('HelloWorld', 'listenToConfig', false);
      this.$emit("listenToConfig", false)
    },
    handleSave() {
      this.internalVisible = false;
      this.fullscreenLoading = true;
      console.log(this.checkedData);
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }, 1000)
    },
    handleCancel() {
      this.internalVisible = false;
    }
  }
}
</script>

<style lang="scss">
.dialogNoServerWidth {
    width: 800px;
}
.dialogNoServer {
    .ul-block {
        width: 100%;
        height: 330px;
        overflow-y: auto;
        background-color: white;
        padding-left: 0;
        margin: 0;
        border-right: 1px solid #d1dbe5;
        box-sizing: border-box;
    }
    .li-title {
        border-bottom: 1px solid #d1dbe5;
        font-weight: bold;
    }
    .commonli-class {
        text-align: center;
        list-style: none;
        font-size: 14px;
        padding: 8px 8px 8px 10px;
        white-space: nowrap;
        overflow: hiddne;
        text-overflow: ellipsis;
        color: #48576a;
        height: 20px;
        line-height: 1;
        cursor: pointer;
        .city-span {
            margin-right: 0;
            display: inline-block;
            margin-top: 3px;
            width: 140px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .distric-span {
            float: left;
            margin-right: 0;
            margin-top: 4px;
            // display:inline-block;
            width: 140px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .checkbox-common {
            float: right;
        }
    }
    .commonli-class:hover {
        background-color: #e4e8f1;
    }
    .activeClass {
        background-color: #58B7FF !important;
    }

    //////////////// 自定义滑块样式////////////////
    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        background-color: #58B7FF;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #58B7FF;
    }
}
</style>
