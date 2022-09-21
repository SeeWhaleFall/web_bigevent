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
  console.log(filesList)
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
})
