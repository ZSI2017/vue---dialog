
> A Vue.js
> 三级地址联动选择对话框


-  [json-server](https://github.com/typicode/json-server) 伪造后台接口服务
-  [mock.js](http://mockjs.com/) 伪造数据
-  [Element-ui](http://element.eleme.io/#/zh-CN/component/message-box) 样式渲染

使用说明:
  - 全局安装`json-server`插件   `npm i json-server -g`
  - `cd mock` 目录，启动服务  `json-server -w mock.js`
  - `cd ..` 在 最外层目录， `npm run dev` 启动

数据类型：

  **check:  0，代表未选中   1，代表选中了寄件    2，代表选中收件    3，代表选中了寄件和收件**

  具体数据格式，见[/mock/list1.js](./mock/list1.js)

两种模式（可通过本地存储或后台接口进行关联）：

   编辑模式：
    ![编辑模式](./Edit.gif)


   查看模式：

   ![查看模式](./onlyRead.gif)


组件：
`checkboxGroup.vue` 和对应的子组件`checkbox.vue`嵌套使用;
```
   <checkbox-group>
     <checkbox>
     </checkbox>
  </checkbox-group>
```

`checkbox.vue`组件，[主要由input 组成，](/src/components/checkbox.vue)
```
 <input v-module = "model" />
 <script>
   computed: {
      model:{
        set(val) {
          this.$parent.$emit('input',val)
        },
        get(){
          return this.store
        }
      }
   }

 </script>

```
子组件checkbox中 v-module 绑定的值发生变化时，触发父组件，即checkbox-group 中的input 事件，
同时 [v-module指令只是语法糖](https://cn.vuejs.org/v2/guide/components.html#使用自定义事件的表单输入组件) 相当于：
```
<input
 v-bind:value="something"
 v-on:input="something = $event.target.value">
```
所以，触发了父组件中的input 事件,相当于修改了父组件中的v-model 对应的的值。
