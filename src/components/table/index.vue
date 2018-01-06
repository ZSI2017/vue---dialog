<template type="html">
  <div>
  <p>I am from </p>
    <my-table :tableData ="tableData">
      <template scope="scope">
         <div>{{scope.row.name}}</div>
      </template>

    </my-table>


  </div>
</template>

<script>
   import MyTable from "./MyTable"
   export default {
     name:"index",
     components:{
       MyTable

     },

    data(){
         return {
           tableData: [{
             date: '2016-05-02',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }, {
             date: '2016-05-04',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1517 弄'
           }, {
             date: '2016-05-01',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1519 弄'
           }, {
             date: '2016-05-03',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1516 弄'
           }]

         }
       },

    mounted(){

    }
   }
</script>

<style>
</style>
