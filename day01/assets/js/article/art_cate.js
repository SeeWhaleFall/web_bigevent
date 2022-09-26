$(function () {

  let layer = layui.layer
  let form = layui.form
  initArtCateList()
  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: res => {
        if (res.status !== 0) return layer.msg('获取文章列表失败！')
        console.log(res)
        let htmlStr = template('tpl-table', res)
        $('#tb').html(htmlStr)
      }
    })
  }
  // 为添加类别绑定点击事件
  let indexAdd = null
  $('#btnAddCate').on('click',function(){
      indexAdd = layer.open({
          type : 1 ,
          area : ['500px','250px'],
          title: '添加文章分类',
          content: $('#dialog-add').html()
        })
  })

  // 通过代理的方式，为 form-add 添加 submit 事件
  $('body').on('submit','#form-add',function(e){
    e.preventDefault()
  $.ajax({
      method : 'POST',
      url : '/my/article/addcates',
      data : $('#form-add').serialize(),
      // data: {
      //         name: $('[name=name]').val(),
      //         ailas: $('[name=ailas]').val()
      //       },
      success : function(res) {
          console.log(res)
          // console.log($('#form-add').serialize())
          if(res.status !== 0) return layer.msg('新增文章分类失败')
          // 根据索引关闭弹出层
          layer.close(indexAdd)

          initArtCateList()
      },
  })
  })

  let indexEdit = null
  // 通过代理的方式 为添加按钮 添加 点击事件
  $('#tb').on('click','#btn-edit',function(){
    indexEdit = layer.open({
      type : 1 ,
      area : ['500px','250px'],
      title: '编辑文章分类',
      content: $('#dialog-edit').html()
    })
    

    let id = $(this).attr('data-id')
    $.ajax({
      method : 'GET',
      url : `/my/article/cates/${id}`,
      success : res => {
        form.val('form-edit',res.data)
      }
    })
  })



  // 通过代理的方式 ，为确认编辑按钮添加 提交事件
  $('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    $.ajax({
      method : 'POST',
      url : '/my/article/updatecate',
      data : $(this).serialize(),
      success : res => {
        console.log(res)
        if(res.status !== 0) return layer.msg('更新分类数据失败')
        layer.msg('更新分类数据成功')
        // 根据索引关闭弹出层
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })



  // 通过代理的方式，为删除按钮添加点击事件
  $('#tb').on('click','#btn-delete',function(){
    let id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        method : 'GET',
        url : `/my/article/deletecate/${id}`,
        success : res => {
          // console.log(res)
          if(res.status !== 0) return layer.msg('删除分类失败')
          layer.msg('删除分类成功')
          layer.close(index)

          initArtCateList()
        }
      })
      
  })
  })
























  // // 为添加类别按钮绑定点击事件
  // var indexAdd = null
  // $('#btnAddCate').on('click', function () {
  //   indexAdd = layer.open({
  //     type: 1,
  //     area: ['500px', '250px'],
  //     title: '添加文章分类',
  //     content: $('#dialog-add').html()
  //   })
  // })

  // // 通过代理的形式，为 form-add 表单绑定 submit 事件
  // $('body').on('submit', '#form-add', function (e) {
  //   e.preventDefault()
  //   $.ajax({
  //     method: 'POST',
  //     url: '/my/article/addcates',
  //     // data: $(this).serialize(),
  //     data: {
  //       name: $('[name=name]').val(),
  //       ailas: $('[name=ailas]').val()
  //     },
  //     success: function (res) {
  //       console.log(res)
  //       // if (res.status !== 0) {
  //       //   return layer.msg('新增分类失败！')
  //       // }
  //       // initArtCateList()
  //       // layer.msg('新增分类成功！')
  //       // 根据索引，关闭对应的弹出层
  //       // layer.close(indexAdd)
  //     },error: error => {
  //       console.log(error)
  //     }
      
  //   })
  // })

})