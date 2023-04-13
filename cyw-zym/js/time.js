let time = document.querySelector('.time')
time.innerHTML = Math.floor((new Date().getTime() - new Date('2023-02-20').getTime()) /(24 * 60 * 60 * 1000))
