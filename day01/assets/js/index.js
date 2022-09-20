$(function(){
    getUserInfo()
})

// 声明 layui 使用layui中的弹出框
let layer = layui.layer
$('#btnLoginOut').on('click',function(){
    // 提示用户是否确认退出
    layer.confirm('确认退出登录', {icon: 3, title:'提示'},
     function(index){
        // 清空本地存储中的 token
        localStorage.removeItem('token')
        // 重新跳转到登录页面
        location.href = '/day01/login.html'
        // 关闭弹出框
        layer.close(index)
      })
})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method : 'GET',
        url :'/my/userinfo',
        // headers 就是请求头配置对象
        // headers : {
        //     Authorization : localStorage.getItem('token') || ''
        // },
        success :  res => {
            if (res.status !== 0)  {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用 rednerAvatar函数渲染头像
            renderAvatar(res.data)
            console.log(res)
        },
        // // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete : res => {
        //     // console.log('执行了')
        //     // console.log(res)
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if(res.responseJSON.status == '1' && res.responseJSON.message ==='身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = '/day01/login.html'
        //     }
        // }


    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1、 声明一个变量去接受用户名的信息
    let name = user.nickname || user.username
    $('.welcome').html(`欢迎  ${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else {
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}