<template>
  <div id="rigth">
    <div class="btn">
      <span class="el-icon-s-tools"></span>
    </div>
    <div class="card">
      <div class="card-border-top">
      </div>
      <div class="img">
        <img :src="require('@/assets/星空.png')" alt="">
      </div>
      <span> Person</span>
      <p class="job">Job TitleJob TitleJob TitleJob TitleJob TitleJob TitleJob TitleJob TitleJob TitleJob TitleJob TitleJob</p>
      <button> Click </button>
    </div>
    <div class="card_msg">
      <div class="title">系统消息<span class="el-icon-bell"></span></div>
      <div class="con">
        <el-timeline reverse>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rigth',
  data () {
    return {
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
#rigth {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color:rgb(208, 248, 235);
}
.btn{
  display: flex;
  justify-content: right;
  span{
    &:hover{
      color: #64e1fa;
      cursor: pointer;
    }
  }
}
.card {
  // width: 220px;
  width: 95%;
  height: 280px;
  background-image: linear-gradient(144deg,#91deee, #99f0a0 60%,#deedbc);
  border: none;
  position: relative;
  margin: 10px auto;
  font-family: inherit;
  overflow: hidden;
  span {
    font-weight: 600;
    color: white;
    text-align: center;
    display: block;
    font-size: 1.3em;
  }
  .job {
    font-weight: 400;
    color: white;
    display: block;
    text-align: center;
    padding: 5px 5px 0;
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;  /*弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 3;  /*限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical;  /*设置或检索伸缩盒对象的子元素的排列方式*/
  }
  .img {
    width: 70px;
    height: 70px;
    background: #e8e8e8;
    border-radius: 100%;
    margin: auto;
    margin-top: 20px;
    overflow: hidden;
    img{
      width: 70px;
      height: 70px;
    }
  }
  button {
    padding: 8px 25px;
    display: block;
    margin: auto;
    border-radius: 8px;
    border: none;
    margin-top: 30px;
    background: #e8e8e8;
    color: #111111;
    font-weight: 600;
    &:hover {
      background: #fcf6b0;
      color: #425554;
    }
  }
}

.card_msg{
  width: 100%;
  background-color: #9ca8e5;
  .title {
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    text-align: center;
    background-color: rgb(127, 234, 255);
    letter-spacing: 3px;
  }
  .con{
    padding: 10px 10px 0;
    .el-timeline-item{
      padding-bottom: 10px;
      /deep/ .el-timeline-item__node--normal{
        left: 1px;
        width: 8px;
        height: 8px;
      }
      /deep/ .el-timeline-item__timestamp{
        color: #bfc3c9;
      }
    }
  }
}
</style>
