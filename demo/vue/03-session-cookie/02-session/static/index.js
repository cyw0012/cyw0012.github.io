window.onload = () => {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:81/get_session',
    success: (res) => {
      if (res.status === 2) return (location.href = './login.html')
      $('.username').text(res.data.username)
      $('.email').text(res.data.email)
      $('.qq').text(res.data.qq)
    },
  })
  $('.loginout').click(() => {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:81/loginout',
      success: function (res) {
        if (res.status) return alert(res.message)
        location.href = './login.html'
      },
    })
  })
}
