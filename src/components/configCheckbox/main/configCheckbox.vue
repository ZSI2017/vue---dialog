<template type="html">
<el-dialog
  class="dialogNoServer"
  title="选区"
  custom-class="dialogNoServerWidth"
  :visible.sync="internalVisible"
  @close="dialogClose"
  v-loading.body.fullscreen.lock="fullscreenLoading"
>
  <el-row
    :span="24"
    class="box-content"
  >
    <el-col :span="internalLevels == 1?24:internalLevels==2?12:6">
      <li class="commonli-class li-title">
        省份
      </li>
      <ul
        class="ul-block"
        v-if="internalVisible"
      >
        <li
          v-if='(item.check)&&onlyRead||!onlyRead'
          :class="[index ==li0&&internalLevels!==1 ?'activeClass':'','commonli-class',item.class]"
          @click="handleLevel1Click($event,index,item)"
          v-for="(item,index) in sourceData.leveloneArray"
        >
          {{item.provinceName}}
          </li>
          </ul>
    </el-col>
    <el-col
      :span="internalLevels ==2?12:9"
      v-if="internalLevels>=2"
    >
      <li class="commonli-class li-title">城市</li>
      <ul class="ul-block">
        <el-collapse-transition>
          <div v-if="showLi">
            <checkbox-group v-model="checkCity">
              <li
                v-if='((item.check||item.levelthreeArray.some(function(im){ return im.check>0}))&&onlyRead)||!onlyRead'
                :class="[index==li1?activeClass:'', 'commonli-class']"
                @click="handleLevel2Click($event,item,index)"
                v-for="(item,index) in list2"
                :key="index"
                style="position:relative"
              >
                <span class="city-span">{{item.cityName}}</span>
                <checkbox
                  v-for="(itm,idx) in tips"
                  v-if="!onlyRead"
                  class="checkbox-common"
                  :label="item.cityName+itm"
                  :key="item.cityName+itm"
                  @change="handleCheckAllChange(index,item,$event,idx+1)"
                >
                  {{itm}}
                  </checkbox>

                  <checkbox
                    v-if="!onlyRead&&tips.length == 0"
                    class="checkbox-common"
                    :label="item.cityName"
                    :key="item.cityName"
                    @change="handleCheckAllChange(index,item,$event,1)"
                  >
                    </checkbox>

                    <!-- <checkbox
                    v-if="!onlyRead"
                    class="checkbox-common"
                    :label="item.cityName+'寄'"
                    :key="item.cityName+'寄件'"
                    @change="handleCheckAllChange(index,item,$event,1)"
                  >
                    {{tips[1]}}
                    </checkbox> -->
                    </li>
            </checkbox-group>
          </div>
        </el-collapse-transition>
      </ul>
      </el-col>
      <el-col
        :span="9"
        v-if="internalLevels >=3"
      >
        <li class="commonli-class li-title">区县</li>
        <ul class="ul-block">
          <el-collapse-transition>
            <div v-if="showLi2">
              <checkbox-group
                v-model="checkedDistric"
                @change="handleDistricChange"
              >
                <li
                  v-if='(item.check&&onlyRead)||!onlyRead'
                  class="commonli-class"
                  :style="{'text-align':onlyRead?'center':''}"
                  v-for="(item,index) in list3"
                >
                  <span
                    class="distric-span"
                    v-if="!onlyRead"
                  >
                    {{item.districtName}}
                    </span>
                    <!-- style="padding-left:10px;" -->
                    <checkbox
                      v-for="(itm,idx) in tips"
                      v-if="!onlyRead"
                      :label="item.districtName+itm"
                      @change="handleCheckbox(index,$event,idx+1)"
                      :key="item.districtName+itm"
                    >
                      {{itm}}
                      </checkbox>
                      <checkbox
                        v-if="!onlyRead&&tips.length === 0"
                        :label="item.districtName"
                        @change="handleCheckbox(index,$event,1)"
                        :key="item.districtName"
                      >
                        </checkbox>
                        <span
                          v-if="onlyRead"
                          class="levels3-class"
                        >{{item.districtName}}</span>
                          <span style="display:inline-block;width:100px;text-align:left">
                  <el-tag  type="primary" v-if="onlyRead&&item.check%2===1&&tips[0]" >{{tips[0]}}</el-tag>
                  <el-tag  type="primary" v-if="onlyRead&&item.check>1&&tips[1]" >{{tips[1]}}</el-tag>
                </span>

                  </li>
              </checkbox-group>
            </div>
          </el-collapse-transition>
        </ul>
        </el-col>
        </el-row>
        <div
          v-if="!onlyRead"
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="internalVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleSave"
          >保 存</el-button>
            </div>

            </el-dialog>
</template>

<script type="text/javascript">
import checkbox from "./checkbox";
import checkboxGroup from "./checkboxGroup"
// import Emitter from "../mixins/emitter"
export default {
  name: 'configCheckbox',
  // mixins: [Emitter],
  components: {
    checkbox,
    checkboxGroup
  },
  props: {
    visible: Boolean,

    sourceData: Object,

    onlyRead: {
      type: Boolean,
      default: true
    },

    levels: {
      type: Number,
      default: 3
    },

    tips: {
      type: Array,
      default: []
    }
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
  created() {},
  computed: {
    internalVisible: {
      get: function() {
        return this.visible
      },
      set: function(newValue) {}
    },
    internalLevels: {
      get: function() {
        return this.levels
      },
      set: function() {}
    }
  },
  watch: {
    onlyRead: function(newData, oldData) {
      this.li0 = '-1';
      this.li1 = '-1';
      this.showLi = false;
      this.showLi2 = false;
    },
    sourceData: function(newData, oldData) {
      this.checkedData = newData.leveloneArray;
      if (!this.onlyRead) {
        this.handleLevel1Click('event', 0, newData.leveloneArray[0]);
        this.handleLevel2Click('event', newData.leveloneArray[0].leveltwoArray && newData.leveloneArray[0].leveltwoArray[0], 0)
      } else {
        let index1, index2;
        for (let i = 0; i < newData.leveloneArray.length; i++) {
          if (newData.leveloneArray[i].check) {
            index1 = i;
            break;
          }
        }
        this.handleLevel1Click('event', index1, newData.leveloneArray[index1]);
        if (typeof newData.leveloneArray[index1] !== "undefined") {
          for (let k = 0; k < newData.leveloneArray[index1].leveltwoArray.length; k++) {
            if (newData.leveloneArray[index1].leveltwoArray[k].check || newData.leveloneArray[index1].leveltwoArray[k].levelthreeArray.some(function(im) {
                return im.check > 0
              })) {
              index2 = k;
              break;
            }
          }
          this.handleLevel2Click('event', newData.leveloneArray[index1].leveltwoArray[index2], index2);
        }
      }
    }
  },
  methods: {
    /**
     *  点击城市全选，将城市leveltwoArray 数组中对应的项，改变check属性，分别有0,1,2,3 四种情况，
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
      let oldChecked = this.checkedData[this.li0].leveltwoArray[index].check
      // oldChecked ： 0, 两个都没有选中   1， 选中了寄件    2， 选中了收件，   3， 选中了收件
      this.checkedData[this.li0].leveltwoArray[index].check = event.target.checked ?
        (oldChecked + sendOrRec) :
        (oldChecked - sendOrRec)
      if (this.levels < 3) {
        return;
      }
      let tempArrSed = [],
        tempArrRec = [],
        tempArr = [];
      for (let i = 0; i < item.levelthreeArray.length; i++) {
        let oldDistrictsCheck = this.checkedData[this.li0].leveltwoArray[index].levelthreeArray[i].check;
        if (event.target.checked) {
          if ((oldDistrictsCheck === 2 && sendOrRec === 1) || (oldDistrictsCheck === 1 && sendOrRec === 2) || oldDistrictsCheck === 0) {
            this.checkedData[this.li0].leveltwoArray[index].levelthreeArray[i].check = oldDistrictsCheck + sendOrRec;
          }
        } else {
          if (oldDistrictsCheck === 3 || (oldDistrictsCheck === 2 && sendOrRec === 2) || (oldDistrictsCheck === 1 && sendOrRec === 1)) {
            this.checkedData[this.li0].leveltwoArray[index].levelthreeArray[i].check = oldDistrictsCheck - sendOrRec;
          }
        }

        tempArrSed.push(item.levelthreeArray[i].districtName + this.tips[0]);
        tempArrRec.push(item.levelthreeArray[i].districtName + this.tips[1]);
        tempArr.push(item.levelthreeArray[i].districtName)
      }

      if (this.tips.length === 0) {
        if (this.checkedData[this.li0].leveltwoArray[index].check === 1) {
          this.checkedDistric = tempArr;
        } else {
          this.checkedDistric = [];
        }
      } else {

        if (this.checkedData[this.li0].leveltwoArray[index].check === 3) {
          this.checkedDistric = tempArrSed.concat(tempArrRec)
        } else if (this.checkedData[this.li0].leveltwoArray[index].check === 2) {
          if (oldChecked === 3) {
            this.checkedDistric = tempArrRec;
          } else {
            this.checkedDistric = this.checkedDistric.filter((item) => {
              return item.indexOf(this.tips[0]) > -1
            }).concat(tempArrRec);
          }
        } else if (this.checkedData[this.li0].leveltwoArray[index].check === 1) {
          if (oldChecked === 3) {
            this.checkedDistric = tempArrSed;
          } else {
            this.checkedDistric = this.checkedDistric.filter((item) => {
              return item.indexOf(this.tips[1]) > -1
            }).concat(tempArrSed);
          }
        } else if (this.checkedData[this.li0].leveltwoArray[index].check === 0) {
          if (oldChecked === 2) {
            this.checkedDistric = this.checkedDistric.filter((item) => {
              return item.indexOf(this.tips[0]) > -1
            })
          } else if (oldChecked === 1) {
            this.checkedDistric = this.checkedDistric.filter((item) => {
              return item.indexOf(this.tips[1]) > -1
            })
          } else if (oldChecked === 0) {
            this.checkedDistric = [];
          }
        }
      }
    },
    handleCheckbox(index, event, sendOrRec) {
      if (this.onlyRead) return;
      let oldCheck = this.checkedData[this.li0].leveltwoArray[this.li1].levelthreeArray[index].check

      this.checkedData[this.li0].leveltwoArray[this.li1].levelthreeArray[index].check = event.target.checked ? (oldCheck + sendOrRec) : (oldCheck - sendOrRec);
    },
    // 区县选择 多选框
    handleDistricChange() {
      if (this.onlyRead) return;
      //  记录对应的数据到指定的数据结构当中
      let tempCityName = this.sourceData.leveloneArray[this.li0].leveltwoArray[this.li1].cityName;
      let _self = this;
      let checkedDataDistrictNameSedLength = 0,
        checkedDataDistrictNameRecLength = 0,
        checkedDataDistrictNameLength = 0;
      this.checkedDistric.forEach(function(value, index) {
        if (value.indexOf(_self.tips[0]) > -1) {
          checkedDataDistrictNameSedLength++
        } else if (value.indexOf(_self.tips[1]) > -1) {
          checkedDataDistrictNameRecLength++
        } else {
          checkedDataDistrictNameLength++;
        }
      })

      let sourceDataDistrictNameLength = this.sourceData.leveloneArray[this.li0].leveltwoArray[this.li1].levelthreeArray.length
      let oldCitysCheck = this.checkedData[this.li0].leveltwoArray[this.li1].check;

      if (this.tips.length === 0) {
        if (checkedDataDistrictNameLength >= sourceDataDistrictNameLength) {
          this.checkedData[this.li0].leveltwoArray[this.li1].check = 1;
          if (this.checkCity.indexOf(tempCityName) < 0) this.checkCity.push(tempCityName);
        } else {
          this.checkedData[this.li0].leveltwoArray[this.li1].check = 0;
          if (this.checkCity.indexOf(tempCityName) >= 0) this.checkCity.splice(this.checkCity.indexOf(tempCityName), 1);
        }
      }
      if (checkedDataDistrictNameSedLength >= sourceDataDistrictNameLength) {
        // 代表已经把未覆盖区县中的数据手动全选了
        if (oldCitysCheck % 2 === 0) {
          this.checkedData[this.li0].leveltwoArray[this.li1].check = 1 + oldCitysCheck;
        }
        if (this.checkCity.indexOf(tempCityName + '' + this.tips[0]) < 0) this.checkCity.push(tempCityName + '' + this.tips[0]);

      } else {
        if (oldCitysCheck % 2 === 1) {
          this.checkedData[this.li0].leveltwoArray[this.li1].check = oldCitysCheck - 1;
        }
        if (this.checkCity.indexOf(tempCityName + '' + this.tips[0]) >= 0) this.checkCity.splice(this.checkCity.indexOf(tempCityName + '' + this.tips[0]), 1);
      }
      // 手件地址
      if (checkedDataDistrictNameRecLength >= sourceDataDistrictNameLength) {
        // 代表已经把未覆盖区县中的数据手动全选了
        if (oldCitysCheck < 2) {
          this.checkedData[this.li0].leveltwoArray[this.li1].check = 2 + oldCitysCheck;
        }
        if (this.checkCity.indexOf(tempCityName + '' + this.tips[1]) < 0) this.checkCity.push(tempCityName + '' + this.tips[1]);

      } else {
        if (oldCitysCheck > 1) {
          this.checkedData[this.li0].leveltwoArray[this.li1].check = oldCitysCheck - 2;
        }
        if (this.checkCity.indexOf(tempCityName + '' + this.tips[1]) >= 0) this.checkCity.splice(this.checkCity.indexOf(tempCityName + '' + this.tips[1]), 1);
      }
    },
    handleLevel1Click(event, index, item) {
      if (this.internalLevels === 1 && !this.onlyRead) {
        if (item.class) {
          this.$set(item, "class", '');
        } else {
          this.$set(item, "class", 'activeClass');
        }
        return;
      }
      this.li0 = index;
      this.showLi = false;
      // console.log(this.checkedData);
      if (!this.onlyRead) {
        this.checkedData[this.li0] = this.checkedData[this.li0] ?
          this.checkedData[this.li0] : {
            provinceName: item.provinceName,
            leveltwoArray: []
          };
        var levels2Array = this.checkedData[index].leveltwoArray
        if (levels2Array.length > 0) {
          let tempArr = [];
          for (let k = 0; k < levels2Array.length; k++) {
            if (typeof levels2Array[k] === "object") {
              let internalItem = levels2Array[k]
              if (internalItem.check > 0) {
                if (this.tips.length === 0) {
                  tempArr.push(internalItem.cityName);
                } else {
                  if (internalItem.check === 3) {
                    tempArr.push(internalItem.cityName + this.tips[0]);
                    tempArr.push(internalItem.cityName + this.tips[1]);
                  } else if (internalItem.check === 2) {
                    tempArr.push(internalItem.cityName + this.tips[1]);
                  } else if (internalItem.check === 1) {
                    tempArr.push(internalItem.cityName + this.tips[0]);
                  }
                }
              }
            }
          }
          this.checkCity = tempArr;
        } else {
          this.checkCity = [];
        }
      }

      this.list2 = this.sourceData.leveloneArray[index].leveltwoArray;
      this.$nextTick(function() {
        this.showLi = true;
      })
      this.showLi2 = false;
      if (!this.onlyRead) {
        this.handleLevel2Click('event', this.sourceData.leveloneArray[index].leveltwoArray && this.sourceData.leveloneArray[index].leveltwoArray[0], 0)
      } else {
        let index2;
        if (typeof this.sourceData.leveloneArray[index] !== "undefined") {
          for (let k = 0; k < this.sourceData.leveloneArray[index].leveltwoArray.length; k++) {
            if (this.sourceData.leveloneArray[index].leveltwoArray[k].check || this.sourceData.leveloneArray[index].leveltwoArray[k].levelthreeArray.some(function(im) {
                return im.check > 0
              })) {
              index2 = k;
              break;
            }
          }
          this.handleLevel2Click('event', this.sourceData.leveloneArray[index].leveltwoArray[index2], index2);
        }
      }
    },
    handleLevel2Click(event, item, index) {
      if (this.internalLevels === 1) {
        return
      }
      this.checkedDistric = [];
      this.li1 = index;
      this.showLi2 = false;
      this.list3 = item.levelthreeArray;
      //  console.log(this.checkedData);
      if (!this.onlyRead) {
        if (Object.prototype.toString.call(this.checkedData[this.li0].leveltwoArray[index]) === "[object Object]") {
          var levelthreeArrayArr = this.checkedData[this.li0].leveltwoArray[index].levelthreeArray;
          if (levelthreeArrayArr && levelthreeArrayArr.length > 0) {
            let tempArr = [];
            for (let i = 0; i < levelthreeArrayArr.length; i++) {
              if (levelthreeArrayArr[i].check > 0) {
                if (this.tips.length === 0) {
                  tempArr.push(levelthreeArrayArr[i].districtName);
                } else {
                  if (levelthreeArrayArr[i].check === 3) {
                    tempArr.push(levelthreeArrayArr[i].districtName + this.tips[0]);
                    tempArr.push(levelthreeArrayArr[i].districtName + this.tips[1]);
                  } else if (levelthreeArrayArr[i].check === 2) {
                    tempArr.push(levelthreeArrayArr[i].districtName + this.tips[1]);
                  } else if (levelthreeArrayArr[i].check === 1) {
                    tempArr.push(levelthreeArrayArr[i].districtName + this.tips[0]);
                  }
                }
              }
            }
            this.checkedDistric = tempArr;
          } else {
            this.checkedData[this.li0].leveltwoArray[index].levelthreeArray = [];
            this.checkedDistric = [];
          }
        } else {
          this.checkedData[this.li0].leveltwoArray[index] = {};
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
    .box-content {
        border: 1px solid #d1dbe5;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
    }
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
        .levels3-class {
            display: inline-block;
            width: 110px;
            text-align: right;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
