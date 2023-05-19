<template>
  <div id="main">
    <el-card el-cardclass="box-card">
      <div slot="header" class="clearfix">
        <span>系统消息</span>
        <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
      </div>
        <div class="item l">
          <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息</p>
          </div>
        </div>
        <div class="item r">
          <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息这是消息这是消息这是消息这是消息这是消息这是消息这是消息</p>
          </div>
        </div>
        <div class="item r">
          <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息这是消息这是消息这是消息这是消息这是消息这是消息这是消息</p>
          </div>
        </div>
        <div class="item r">
          <el-avatar size="medium" :src="require('@/assets/星空.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息这是消息这是消息这是消息这是消息这是消息这是消息这是消息</p>
          </div>
        </div>
        <div class="item r">
          <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息这是消息这是消息这是消息这是消息这是消息这是消息这是消息</p>
          </div>
        </div>
        <div class="item r">
          <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息这是消息这是消息这是消息这是消息这是消息这是消息这是消息</p>
          </div>
        </div>
        <div class="item l">
          <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息这是消息这是消息这是消息这是消息这是消息这是消息</p>
          </div>
        </div>
        <div class="item r">
          <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>
          <div class="con">
            <p class="title"><span>皮卡丘</span> 2022-12-12 23:00:00</p>
            <p class="msg">这是消息</p>
          </div>
        </div>
    </el-card>
    <!-- 底部 -->
    <div class="foo">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        maxlength="200"
        show-word-limit
        clearable>
      </el-input>
      <el-button type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      input: ''
    }
  },
  mounted () {
    const card = document.querySelector('.el-card__body')
    card.scrollTop = card.scrollHeight
  }
}
</script>

<style lang="less" scoped>
#main{
  width: 100%;
  height: 100%;
}
.el-card{
  height: 92%;
  display: flex;
  flex-direction: column;
  /deep/ .el-card__body{
    overflow: auto;
    /* 整个滚动条 */
    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 4px;
      background-color: skyblue;
    }
    /* 滚动条上的滚动滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #9eabbe;
    }
    /* 滚动条轨道 */
    &::-webkit-scrollbar-track {
      background-color: #dbeffd;
      border-radius: 4px;
    }
  }
}
.item{
  overflow: hidden;
  margin-bottom: 20px;
}
.l{
  .el-avatar{
    float: left;
    margin-right: 10px;
  }
  .con{
    max-width: 360px;
    min-width: 200px;
    float: left;
  }
}
.r{
  .el-avatar{
    float: right;
    margin-left: 10px;
  }
  .con{
    max-width: 360px;
    min-width: 200px;
    float: right;
    .title{
      text-align: right;
    }
  }
}
.title{
  font-size: 12px;
  span{
    font-size: 15px;
    color: aqua;
  }
}
.msg{
  padding: 10px;
  border-radius: 10px;
  background-color: #2ecc71;
}
.foo{
  margin-top: 15px;
  .el-input{
    width: 86%;
    margin-right: 2%;
  }
  .el-button{
    width: 12%;
    height: 40px;
  }
}
</style>
