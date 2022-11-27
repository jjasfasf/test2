
<template>
    <el-card class="index-container">
      
         <template #header>
            <div class="header">
               <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">增加</el-button>
            </div>
            <el-popconfirm title="确定删除吗？" confirmButtonText="确定" cancelButtonText="取消" @confirm="handleDelete">
              <template #reference>
                  <el-button type="danger" size="small" icon="ec-icon-delete" >批量删除</el-button>
              </template>

            </el-popconfirm>
         </template>

        <el-table :load="state.loading" :data="state.tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection"  width="55">

           </el-table-column>
            <el-table-column prop="configName" label="商品名称">

           </el-table-column>
           <el-table-column label="跳转链接">
             <template #default="scope">
                 <a target="_blank" :href="scope.row.redirectUrl">{{scope.row.redirectUrl}}</a>
             </template>
           </el-table-column>
           <el-table-column prop="configRank" label="排序值" width="120">

           </el-table-column>
           <el-table-column prop="goodsId" label="商品编号" width="200">

           </el-table-column>
           <el-table-column prop="createTime" label="添加时间" width="200">

           </el-table-column>
           <el-table-column label="操作" width="100">
               <template #default="scope">
                   <a style="cursor:pointer;margin-right:10px" @click="handleEdit(scope.row.configId)">修改</a>
                   <el-popconfirm title="确定删除吗?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDeleteOne(scope.row.configId)">
                    <template #reference>
                         <a style="cursor:pointer">删除</a>
                    </template>
                </el-popconfirm>
               </template>
           </el-table-column> 
        </el-table>
        <el-pagination backgroundlayout="prev,pager,next" :total="state.total" :page-size="state.pageSize" :current-page="state.currentPage" @current-change="changePage"></el-pagination>
    
    </el-card>
    <DialogAddGoods ref="addGood" :reload="getIndexConfig" :type="state.type" :configType="state.configType"></DialogAddGoods>
</template>

<script setup>
 import DialogAddGoods from '@/components/DialogAddGoods.vue'
 import { onUnmounted,onMounted,reactive,ref } from 'vue';
  import { useRouter,useRoute } from 'vue-router'
  import axios from '@/utils/axios'
import { ElMessage } from 'element-plus';
  const configTypeMap={
    hot:3,
    new:4,
    recommend:5
  }

  
  const addGood=ref(null)
  const router=useRouter()
  const route=useRoute()
  const state=reactive({
    loading:false,
    tableData:[],
    total:0,
    currentPage:1,
    pageSize:10,
    type:'add',
    configType:3,
    multipleSelection:[]
  })

  const handleAdd=()=>{
    state.type='add'
    addGood.value.open()
  }

  const handleEdit=(id)=>{
    state.type='edit'
    addGood.value.open(id)
  }

  const handleSelectionChange=(val)=>{
    state.multipleSelection=val
  }

  router.beforeEach((to)=>{
    if(['hot','new','recommend'].includes(to.name)){
        state.configType=configTypeMap[to.name]
        state.currentPage=1
        getIndexConfig()
    }
  })   

  const handleDelete=()=>{
       if(!state.multipleSelection.length){
        ElMessage.error('请选择项目')
        return
       }
       axios.post('/indexConfigs/delete',{
        ids:state.multipleSelection.map(i=>i.configId)
       }).then(()=>{
        ElMessage.success('删除成功')
        getIndexConfig()
       })
  }


  const handleDeleteOne=(id)=>{
      axios.post('/indexConfigs/delete',{
        ids:[id]
      }).then(()=>{
        ElMessage.success('删除成功')
        getIndexConfig()
       }) 
  }

  onMounted(()=>{
     state.configType=configTypeMap[route.name]
     getIndexConfig()
  })

  const getIndexConfig=()=>{
    state.loading=true
    axios.get('/indexConfigs',{
        params:{
            pageNumber:state.currentPage,
            pageSize:state.pageSize,
            configType:state.configType
        }
    }).then(res=>{
        state.tableData=res.list,
        state.total=res.totalCount,
        state.currentPage=res.currPage
        state.loading=false
    })
  }

  const changePage=(val)=>{
    state.currentPage=val
    getIndexConfig()
  }
</script>
