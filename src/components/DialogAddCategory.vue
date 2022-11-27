<template>
   <el-dialog :title="type=='add'?'新增分类':'修改分类'" v-model="state.visible" width="400px">
      <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" label-width="100px" class="good-form">
        <el-form-item label="商品名称" prop="name">
            <el-input type="text" v-model="state.ruleForm.name"></el-input>

        </el-form-item>
        <el-form-item label="排序值" prop="rank">
            <el-input type="number" v-model="state.ruleForm.rank"></el-input>
        </el-form-item>

      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.visible=false">取消</el-button>
            <el-button type="primary" @click="submitForm">确认</el-button>
          </span>
      </template>

   </el-dialog>
</template>

<script setup>
   import{ reactive,ref} from 'vue'
   import { useRoute } from 'vue-router'
   import axios from'@/utils/axios'
   import { ElMessage } from 'element-plus'

   const props=defineProps({
    type:String,
    reload:Function
   })

   const formRef=ref(null)
   const route=useRoute()
   const state=reactive({
    visible:false,
    categoryLevel:1,
    parentId:0,
    ruleForm:{
        name:'',
        rank:''
    },
    rules:{
        name:[
            {required:true,message:'名称不能为空',trigger:['change'] }
        ],
        rank: [
            { required: true, message: '编号不能为空', trigger: ['change'] }
         ]
    },
    id:''
   })

   const getDetail=(id)=>{
       axios.get(`/categories/${id}`).then(res=>{
          state.ruleForm={
            name:res.categoryName,
            rank:res.categoryRank
          }
          state.parentId=res.parentId
          state.categoryLevel=res.categoryLevel
       })
   }


   const open=(id)=>{
       state.visible=true
       if(id){
        state.id=id
        getDetail(id)
       }else{
          const {level=1,parent_id=0}=route.query
          state.ruleForm={
            name:'',
            rank:''
          }
          state.parentId=parent_id
          state.categoryLevel=level
       }
   }

   const close=()=>{
      state.visible=false
   }

   const submitForm=()=>{
     formRef.value.validate((valid)=>{
         if(valid){
             if(props.type=='add'){
                 axios.post('/categories',{
                    categoryLevel:state.categoryLevel,
                    parentId:state.parentId,
                    categoryName:state.ruleForm.name,
                    categoryRank:state.ruleForm.rank
                 }).then(()=>{
                    ElMessage.success('添加成功')
                    state.visible=false
                    if(props.reload)props.reload
                 })
             }else{
                 axios.put('categories',{
                    categoryId: state.id,
                    categoryLevel: state.categoryLevel,
                   parentId: state.categoryLevel,
                   categoryName: state.ruleForm.name,
                    categoryRank: state.ruleForm.rank
                 }).then(()=>{
                    ElMessage.success('修改成功')
                    state.visible=false
                    if(props.reload)props.reload
                 })
             }
         }
     })
   }

   defineExpose({open,close})
</script>