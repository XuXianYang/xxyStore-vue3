<template>
  <footer class="login-footer">
    <div class="container">
      <p>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">售后服务</a>
        <a href="javascript:;">配送与验收</a>
        <a href="javascript:;">商务合作</a>
        <a href="javascript:;">搜索推荐</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; 小兔鲜儿</p>
    </div>
  </footer>
</template>
  
  <script>
export default {};
</script>
  
  <style scoped lang="less">
.login-footer {
  background-color: #fff;
  padding: 30px 0 50px;
  .container{
    p{
        text-align: center;
        padding-top: 20px;
        color: #999;
        a{
            color: #999;
            line-height: 1;
            padding: 0 10px;
            display: inline-block;
            border-right: 1px solid #ccc;
            &:last-child{
                border-right:none
            }
        }
    }
  }
}
</style>