<!--Footer.vue-->
<template>
    <div class="footer">
      <div class="left">Copyright © 2019-2022 陈永红. All rights reserved.</div>
      <div class="right">
        <a target="_blank" href="https://www.4399.com/">爽一哈</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
    .footer {
      height: 50px;
      border-top: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
  </style>