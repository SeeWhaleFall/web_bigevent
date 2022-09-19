$(function() {
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

// 从 layui 中 获取 form 对象
let form = layui.form
// 通过 form.verify() 来自定义函数效验规则
form.verify({
  pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
  // 检验两次密码是否一致的规则
  repwd : function(value) {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败，则 return 一个提示消息
    let psw = $('#form_reg [name=password]').val()
    if(psw !== value) return '两次密码不一致'
  }


});

const baseUrl = 'http://www.liulongbin.top:3007'
// const username = $('#form_reg [name="username"]').val()
// const password = $('#form_reg [name="password"]').val()

$('#form_reg').on('submit',function(e) {
        let username = $('#form_reg [name=username]').val()
        let password = $('#form_reg [name=password]').val()
        e.preventDefault()
        $.ajax({
            method : 'POST',
            url : `${baseUrl}/api/reguser`,
            data : {
                username ,
                password
            }, success : res => {
                if(res.status !==0) return alert(res.message)

                console.log(res.message)
            }
            
        })

    })
   
})