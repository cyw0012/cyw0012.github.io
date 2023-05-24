// 动态背景
let background = () => {
  let c = document.querySelector('.myc')
  let ctx = c.getContext('2d')
  c.width = window.innerWidth
  c.height = window.innerHeight
  // 画布大小随着窗口大小改变
  window.onresize = () => {
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  // 鼠标移动事件
  let mouseX
  let mouseY
  c.onmousemove = (e) => {
    mouseX = e.offsetX
    mouseY = e.offsetY
  }
  $('.box').mousemove((e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // 生成随机数
  let Random = (x, y) => {
    return Math.floor(Math.random() * (y - x + 1) + x)
  }

  // 创建小球的构造函数
  function Ball() {
    this.x = Random(3, c.width - 3)
    this.y = Random(3, c.height - 3)
    this.speedX = Random(-3, 3) * 0.2
    this.speedY = Random(-3, 3) * 0.2
    this.size = Random(2, 5)
  }
  Ball.prototype = {
    draw: function () {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
      ctx.fillStyle = '#7ec7fd'
      ctx.globalAlpha = 0.8
      ctx.fill()
    },
    move: function () {
      this.x += this.speedX
      this.y += this.speedY
      if (this.x < 3 || this.x > c.width - 3) this.speedX *= -1
      if (this.y < 3 || this.y > c.height - 3) this.speedY *= -1
    },
  }

  // 创建小球实例
  let balls = []
  for (let i = 0; i < 100; i++) {
    let ball = new Ball()
    balls.push(ball)
  }
  // 画线
  let drawLine = () => {
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw()
      balls[i].move()
      for (let j = i + 1; j < balls.length; j++) {
        if (
          Math.sqrt(
            Math.pow(balls[i].x - balls[j].x, 2) +
              Math.pow(balls[i].y - balls[j].y, 2)
          ) < 80
        ) {
          ctx.beginPath()
          ctx.moveTo(balls[i].x, balls[i].y)
          ctx.lineTo(balls[j].x, balls[j].y)
          ctx.strokeStyle = '#ecf0f1'
          ctx.globalAlpha = 0.5
          ctx.stroke()
        }
      }
    }
  }
  // 鼠标移动画线
  let mouseLine = () => {
    for (let i = 0; i < balls.length; i++) {
      if (
        Math.sqrt(
          Math.pow(balls[i].x - mouseX, 2) + Math.pow(balls[i].y - mouseY, 2)
        ) < 80
      ) {
        ctx.beginPath()
        ctx.moveTo(balls[i].x, balls[i].y)
        ctx.lineTo(mouseX, mouseY)
        ctx.strokeStyle = '#ecf0f1'
        ctx.globalAlpha = 0.8
        ctx.stroke()
      }
    }
  }
  let main = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    drawLine()
    mouseLine()
    requestAnimationFrame(main)
  }
  main()
}

// 登录
let login = () => {
  // 用户名校验
  let username_flag = false
  $('.username').blur(function () {
    let ele = $(this).siblings('.msg')
    if (this.value.trim() === '') {
      ele.text('* 用户名不能为空')
      ele.css('display', 'block')
      return
    }
    let reg = /^[\u4e00-\u9fa5]{2,6}$/
    if (!reg.test(this.value.trim())) {
      ele.text('* 用户名必须为 2-6 个汉字')
      ele.css('display', 'block')
      return
    }
    ele.css('display', 'none')
    username_flag = true
    return
  })
  // 密码校验
  let password_flag = false
  $('.password').blur(function () {
    let ele = $(this).siblings('.msg')
    if (this.value.trim() === '') {
      ele.text('* 密码不能为空')
      ele.css('display', 'block')
      return
    }
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}$/
    if (!reg.test(this.value.trim())) {
      ele.text(
        '* 密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在5-10之间'
      )
      ele.css('display', 'block')
      return
    }
    ele.css('display', 'none')
    password_flag = true
    return
  })
  // 提交
  $('.login').submit((e) => {
    e.preventDefault()
    $('.username').blur()
    $('.password').blur()
    let cookieTime
    switch ($('.time')[0].value) {
      case '1':
        cookieTime = 3000 // 确保登录进去,然后失效
        break
      case '2':
        cookieTime = 1000 * 60 * 60
        break
      case '3':
        cookieTime = 1000 * 60 * 60 * 24
        break
      case '4':
        cookieTime = 1000 * 60 * 60 * 24 * 30
        break
    }
    if (username_flag && password_flag) {
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:81/login',
        data: {
          username: $('.username')[0].value.trim(),
          password: $('.password')[0].value.trim(),
          time: cookieTime,
        },
        success: function (res) {
          if (res.status) return alert(res.message)
          location.href = './'
        },
      })
    }
  })
}

// 注册
let register = () => {
  // 用户名校验
  let uname_flag = false
  $('.uname').blur(function () {
    let ele = $(this).siblings('.msg')
    if (this.value.trim() === '') {
      ele.text('* 用户名不能为空')
      ele.css('display', 'block')
      return
    }
    let reg = /^[\u4e00-\u9fa5]{2,6}$/
    if (!reg.test(this.value.trim())) {
      ele.text('* 用户名必须为 2-6 个汉字')
      ele.css('display', 'block')
      return
    }
    ele.css('display', 'none')
    uname_flag = true
    return
  })
  // 密码校验
  let pwd_flag = false
  $('.pwd').blur(function () {
    let ele = $(this).siblings('.msg')
    if (this.value.trim() === '') {
      ele.text('* 密码不能为空')
      ele.css('display', 'block')
      return
    }
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}$/
    if (!reg.test(this.value.trim())) {
      ele.text(
        '* 密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在5-10之间'
      )
      ele.css('display', 'block')
      return
    }
    ele.css('display', 'none')
    pwd_flag = true
    return
  })
  // 确认密码校验
  let pwd2_flag = false
  $('.pwd2').blur(function () {
    let ele = $(this).siblings('.msg')
    if (this.value.trim() === '') {
      ele.text('* 确认密码不能为空')
      ele.css('display', 'block')
      return
    }
    if (this.value.trim() !== $('.pwd')[0].value) {
      ele.text('* 两次密码不同')
      ele.css('display', 'block')
      return
    }
    ele.css('display', 'none')
    pwd2_flag = true
    return
  })
  // 邮箱校验
  let email_flag = false
  $('.email').blur(function () {
    let ele = $(this).siblings('.msg')
    if (this.value.trim() === '') {
      ele.text('* 邮箱不能为空')
      ele.css('display', 'block')
      return
    }
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!reg.test(this.value.trim())) {
      ele.text('* 输入的邮箱不合法')
      ele.css('display', 'block')
      return
    }
    ele.css('display', 'none')
    email_flag = true
    return
  })
  // 邮箱校验
  let qq_flag = false
  $('.qq').blur(function () {
    let ele = $(this).siblings('.msg')
    if (this.value.trim() === '') {
      ele.text('* QQ不能为空')
      ele.css('display', 'block')
      return
    }
    let reg = /^[1-9][0-9]{4,}$/
    if (!reg.test(this.value.trim())) {
      ele.text('* 输入的QQ不合法')
      ele.css('display', 'block')
      return
    }
    ele.css('display', 'none')
    qq_flag = true
    return
  })
  // 提交
  $('.register').submit((e) => {
    e.preventDefault()
    $('.uname').blur()
    $('.pwd').blur()
    $('.pwd2').blur()
    $('.email').blur()
    $('.qq').blur()
    if (uname_flag && pwd_flag && pwd2_flag && email_flag && qq_flag) {
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:81/register',
        data: {
          username: $('.uname')[0].value.trim(),
          password: $('.pwd')[0].value.trim(),
          email: $('.email')[0].value.trim(),
          qq: $('.qq')[0].value.trim(),
        },
        success: function (res) {
          if (res.status) return alert(res.message)
          alert('注册成功,请登录')
          location.href = './login.html'
        },
      })
    }
  })
}

window.onload = () => {
  // 动态背景
  background()

  // 登录
  login()

  // 注册
  register()
}
