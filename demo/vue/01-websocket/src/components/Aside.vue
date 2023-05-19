<template>
  <div id="aside">
    <div class="tab_nav">
      <a href="javascript:;" @click="active_tab=1">联系</a>
      <a href="javascript:;" @click="active_tab=2">我的</a>
      <a href="javascript:;" @click="active_tab=3">添加</a>
    </div>
    <div class="tab_con">
      <!-- 联系 -->
      <div v-show="active_tab === 1" class="item">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <el-badge slot="title" :value="200" :max="99" class="item">
              <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
              <span>公布区</span>
            </el-badge>
          </el-menu-item>
          <el-menu-item index="2">
            <el-badge slot="title" :value="11" :max="99" class="item">
              <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
              <span>皮卡丘</span>
            </el-badge>
          </el-menu-item>
          <el-menu-item index="3">
            <el-badge slot="title" :value="1" :max="99" class="item">
              <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
              <span>永远都是</span>
            </el-badge>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">永远都是</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 我的 -->
      <div v-show="active_tab === 2" class="item">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>联系人</span>
            </template>
            <el-menu-item index="1-1">
              <el-avatar size="small" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
              选项1
            </el-menu-item>
            <el-menu-item index="1-2">
              <el-avatar size="small" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
              选项2
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>群聊</span>
            </template>
            <el-menu-item index="2-1">
              <el-avatar size="small" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
              选项1
            </el-menu-item>
            <el-menu-item index="2-2">
              <el-avatar size="small" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
              选项2
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!-- 添加 -->
      <div v-show="active_tab === 3" class="item">
        <div style="margin: 15px 10px;">
          <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="选择" style="width: 80px;">
              <el-option label="个人" value="1"></el-option>
              <el-option label="群聊" value="2"></el-option>
            </el-select>
          </el-input>
        </div>
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-avatar size="medium" :src="require('@/assets/people.png')"></el-avatar>&nbsp;
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      active_tab: 1,
      select: '',
      query: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
#aside{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.tab_nav{
  width: 100%;
  height: 45px;
  background-color: rgb(70, 70, 71);
  a{
    display: inline-block;
    height: 45px;
    width: 33.33%;
    line-height: 45px;
    text-decoration: none;
    color: #fff;
    text-align: center;
    &:hover{
      background-color: rgb(156, 156, 157);
    }
  }
}
.tab_con{
  flex: 1;
  overflow: auto;
  background-color: rgb(84, 92, 100);
  /* 整个滚动条 */
  &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
  }
  /* 滚动条上的滚动滑块 */
  &::-webkit-scrollbar-thumb {
      background-color: transparent;
  }

  &:hover::-webkit-scrollbar {
      background-color: rgb(253, 254, 255);
  }
  &:hover::-webkit-scrollbar-thumb {
      background-color: skyblue;
  }
  .el-menu{
    border: 0;
    /deep/ .el-badge__content{
      top: 20px;
      right: 0;
      font-size: 12px;
      height: 14px;
      line-height: 14px;
      padding: 0 4px;
    }
  }
}
</style>
