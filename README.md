
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

主要功能：
