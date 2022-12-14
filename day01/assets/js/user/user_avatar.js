// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)


// 为上传按钮添加点击事件
$('#btnChoose').on('click',function(){
  $('#file').click()
})


// 为选择的文件绑定一个change事件
$('#file').on('change',function(e){
  // 获取用户选择的文件
  // console.log(e)
  let filesList = e.target.files
  // console.log(filesList)
  if(filesList.length === 0) return layer.msg('请选择照片')

  // 拿到用户的照片
  let file = filesList[0]
  // 将文件转化为路径
  let imgURL = URL.createObjectURL(file)
  // 重新初始化裁剪区域
  $image
  .cropper('destroy') // 销毁旧的裁剪区域
  .attr('src', imgURL) // 重新设置图片路径
  .cropper(options) // 重新初始化裁剪区域


  // 为确定按钮，添加点击事件
  $('#btnUpLoad').on('click',function(){
    // 要拿到用户裁剪之后的头像
    let dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    // 创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 base64 格式的字符串
  

  $.ajax({
    method : 'POST',
    url : '/my/update/avatar',
    data : {
      avatar : dataURL ,
    },
    success : res => {
      if(res.status !== 0) return layer.msg('头像上传失败！')
      layer.msg('头像上传成功！')
      //  调用父窗口中的渲染页面函数 重新渲染页面
      window.parent.getUserInfo()
    }
  })
})
})
