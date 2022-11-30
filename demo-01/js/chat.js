$(function () {
  // 初始化右侧滚动条(到底部)
  // 这个方法定义在scroll.js中
  resetui()

  // 1.点击发送：进行渲染，发送请求获取聊天消息
  $("#btnSend").click(function () {
    // 渲染
    let send = $(".input_txt").val().trim();
    if (send.length <= 0) {
      $(".input_txt").val("")
      return;
    }
    $(".talk_list").append("<li class='right_word'><img src='img/pic2.png' /> <span>" + send + "</span></li>");
    $(".input_txt").val("")
    resetui()

    getMsg(send)
  })
  // 2.敲回车触发点击事件
  $(".input_txt").on("keyup", function (e) {
    if (e.keyCode === 13) {
      $("#btnSend").click()
    }
  })

  // 获取聊天机器人发送过来的消息
  function getMsg(text) {
    $.ajax({
      method: "GET",
      url: "http://www.liulongbin.top:3006/api/robot",
      data: {
        spoken: text,
      },
      success: function (res) {
        if (res.message !== 'success') {
          alert(res.message);
          return;
        }
        console.log(res);
        // 接受聊天消息,渲染
        let msg = res.data.info.text
        $(".talk_list").append("<li class='left_word'><img src='img/pic1.png' /> <span>" + msg + "</span></li>");
        resetui()

        // 文字转语音
        getVoice(msg)
      }
    })
  }

  // 文字转语音
  function getVoice(text) {
    $.ajax({
      method: "GET",
      url: "http://www.liulongbin.top:3006/api/synthesize",
      data: {
        text: text,
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 200) {
          console.log(res.message);
          return;
        }
        // 播放语音
        $("#voice").attr("src", res.voiceUrl);
      }
    })
  }
})