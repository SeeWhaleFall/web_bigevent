// 注意：每次调用 $.get或 $.post 或者 $.ajax的时候会
// 先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    // options.url = `http://www.liulongbin.top:3007${options.url}`
    options.url = `http://big-event-api-t.itheima.net${options.url}`
    // console.log(options.url)

    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    // 不论成功还是失败，最终都会调用 complete 回调函数
    options.complete = res => {
        // consolegit.log('执行了')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status == '1' && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/day01/login.html'
        }
    }

})