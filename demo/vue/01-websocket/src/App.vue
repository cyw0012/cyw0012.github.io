<template>
  <div id="app">
    <el-container v-if="!dialogFormVisible">
      <el-aside><Aside></Aside></el-aside>
      <el-main><Main></Main></el-main>
      <el-aside class="rigth"><Rigth></Rigth></el-aside>
    </el-container>
    <!-- 信息填写 -->
    <el-dialog title="填写个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="聊天内容保存路径" :label-width="formLabelWidth">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <div class="img">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :canScale="option.canScale"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :canMoveBox="option.canMoveBox"
              :canMove="option.canMove"
              :centerBox="option.centerBox"
              :info="option.info"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
            ></vueCropper>
          </div>
          <input ref="filebtn" type="file" accept="image/png,image/jpeg" style="display: none" @change="uploadPic" />
          <el-button type="primary" @click="$refs.filebtn.click()"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Main from '@/components/Main.vue'
import Rigth from '@/components/Rigth.vue'
import { comCompress, getBaseSize } from '@/utils/compress'
export default {
  name: 'App',
  components: {
    Aside,
    Main,
    Rigth
  },
  data () {
    return {
      dialogFormVisible: true,
      form: {
        name: '',
        introduce: '',
        path: ''
      },
      formLabelWidth: '150px',
      option: {
        img: require('@/assets/星空.png'), // 裁剪图片地址
        outputSize: 1, // 裁剪生成图片质量
        outputType: 'jepg', // 裁剪生成图片格式
        canScale: true, // 图片是否允许滚轮播放
        autoCrop: true, // 是否默认生成截图框
        info: true, // 是否展示截图框信息
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1],
        autoCropWidth: 150, // 生成截图框的宽度
        autoCropHeight: 150, // 生成截图框的高度
        canMoveBox: true, // 截图框是否可以拖动
        fixedBox: false, // 固定截图框的大小
        canMove: false, // 上传图片是否可拖动
        centerBox: true, // 截图框限制在图片里面
        aspectRatio: 1
      },
      resImg: null // 截图后图片
    }
  },
  methods: {
    uploadPic (e) {
      const filelist = e.target.files
      if (filelist.length === 0) this.$meesage.error('请上传图片')
      const imgURL = URL.createObjectURL(filelist[0])
      this.option.img = imgURL
    },
    realTime (data) {},
    async submit () {
      this.dialogFormVisible = false
      this.$refs.cropper.getCropData(async (data) => {
        this.resImg = await comCompress(data, 200, 0.5)
        if (getBaseSize(this.resImg) > 10) return this.$message.error('图片大小不能超过 10 kb')
        // console.log(this.resImg)
      })
    }
  },
  created () {
    this.$ws.onopen = () => {
      console.log('连接服务器成功')
      this.$ws.send(JSON.stringify({ type: 1, msg: '你好' }))
      // 监听服务端发送过来的消息
      this.$ws.onmessage = (e) => {
        console.log(JSON.parse(e.data))
      }
      // 监听到与服务端的连接关闭
      this.$ws.onclose = () => {
        console.log('连接关闭')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#app{
  width: 100%;
}
.el-container{
  width: 75%;
  height: 650px;
  margin: 100px auto;
  .el-aside{
    width: 20%!important;
  }
  .el-main{
    background-color: rgb(234, 247, 247);
  }
}
@media (max-width:1000px){
  .rigth{
    display: none;
  }
}
.img{
  width: 300px;
  height: 300px;
}
/deep/ .el-dialog{
  margin-top: 10vh!important;
}
</style>
