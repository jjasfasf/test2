<template>
    <el-table :load="state.loading"  :data="state.tableData" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
          <slot name="column"></slot>
    </el-table>
    <el-pagination backgroundlayout="prev,pager,next" :total="state.total" :page-size="state.pageSize" :current-page="state.currentPage" @current-change="changePage">

    </el-pagination>
</template>


<script setup>
  import { onMounted,reactive } from 'vue';
  import axios from '@/utils/axios'

  const props=defineProps({
    action:String
  })

  const state=reactive({
     loading:false,
     tableData:[],
     total:0,
     currentPage:1,
     pageSize:10,
     multipleSelection:[],

  })

   onMounted(()=>{
     getList()
   })

   const getList=()=>{
      state.loading=true
      axios.get(props.action,{
        params:{
            pageNumber:state.currentPage,
            pageSize:state.pageSize
        }
      }).then(res=>{
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
   }

   const handleSelectionChange=(val)=>{
      state.multipleSelection=val
   }

   const changePage=(val)=>{
     state.currentPage=val
     getList()
   }

   defineExpose({state:state,getList:getList})

</script>