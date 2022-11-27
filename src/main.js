import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//import ElementPlus from 'element-plus'
//import { ElButton } from 'element-plus'
//import 'element-plus/dist/index.css';

const orderStatus = {
    0: '待支付',
    1: '已支付',
    2: '配货完成',
    3: '出库成功',
    4: '交易成功',
    '-1': '手动关闭',
    '-2': '超时关闭',
    '-3': '商家关闭'
  }
  

const app=createApp(App)

for(const[Key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(Key,component)
}
app.use(router)
//app.use(ElButton)
app.mount('#app')

app.config.globalProperties.$filters={
    orderMap(status) {
        return orderStatus[status] || '未知状态'
      },
    prefix(url){
        if(url&&url.startsWith('http')){
            return url;
        }else{
            url=`http://backend-api-02.newbee.ltd${url}`
            return url
        }

    }
}

app.config.globalProperties.goTop=function(){
    const main=document.querySelector('.main')
    main.scrollTop=0

}

