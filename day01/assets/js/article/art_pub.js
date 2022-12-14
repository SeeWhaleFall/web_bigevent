$(function () {

    let layer = layui.layer
    let form = layui.form
    initCate()
    // 初始化富文本编辑器
    initEditor()


    // 定义加载文章类别的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) return layer.msg('初始化文章分类失败')

                // 调用模板引擎，渲染分类下拉菜单
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 一定要记得调用 form.render() 方法去渲染
                form.render()
            }
        })
    }



    // 1. 初始化图片裁剪器
    let $image = $('#image')

    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 为选择封面的按钮，绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change', function (e) {
        let files = e.target.files
        console.log(files)
        if (files.length === 0) return
        // 根据选择的文件，创建一个对应的 URL 地址
        let newImgURL = URL.createObjectURL(files[0])
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的图片裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 定义文章的发布状态
    let art_state = '已发布'

    // 为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })


    // 为表单绑定 submit 事件
    $('#form-pub').on('submit', function (e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault()
        // 2. 基于 form表单，快速创建一个 FormData 对象
        // console.log($(this)[0])
        let fd = new FormData($(this)[0])
        // 3. 将文章发布状态，存到 fd 中去
        fd.append('state', art_state)
        // fd.forEach((val, key) => {
            // console.log(key, val)

            // 4. 将封面裁剪过后的图片，输出为一个文件对象
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 文件的对象就是里面的形参 blob
                    fd.append('cover_img',blob)
                    // 发起 ajax 请求
                // })
                publishArticle(fd)

        })
    })

    // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method : 'POST',
            url : '/my/article/add',
            data : fd ,
            // 注意：如果向服务器提交的是 FormData 格式的数据
            contentType : false ,
            processData : false ,
            success : res => {
                if(res.status !== 0) return layer.msg('发表文章失败')
                layer.msg('发表文章成功')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/day01/article/art_list.html'
                console.log(res)
            }
        })
    }
})