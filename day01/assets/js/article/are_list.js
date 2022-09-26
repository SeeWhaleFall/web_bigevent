$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage

    // 定义美化时间的过滤去
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data)
        let y = dt.getFullYear()
        let m = (dt.getMonth() + 1 + '').padStart(2, '0')
        let d = (dt.getDate() + '').padStart(2, '0')

        let hh = (dt.getHours() + '').padStart(2, '0')
        let mm = (dt.getMinutes() + '').padStart(2, '0')
        let ss = (dt.getSeconds() + '').padStart(2, '0')
        // console.log(`${y}-${m}-${d} ${hh}:${mm}:${ss}`)
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要讲请求参数对象提交到服务器
    let q = {
        pagenum: 1,// 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示两条
        cate_id: '', // 文章分类的 Id
        state: '', // 文章的发布状态
    }

    initTable()
    initCate()

    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({ 
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: res => {
                // console.log(res)
                if (res.status !== 0) return layer.msg('获取文章列表数据失败')

                // 使用模板引擎渲染页面数据
                let htmlStr = template('tpl-table', res)
                $('#tb').html(htmlStr)

                renderPage(res.total)
            }
        })
    }


    // 初始化文章分类的方法
//     function initCate() {
//         $.ajax({
//             method: 'GET',
//             url: '/my/article/cates',
//             success: res => {
//                 // console.log(res)
//                 if (res.status !== 0) return layer.msg('获取分类数据失败')

//                 // 调用模板引擎渲染分类的可选项
//                 let htmlStr = template('tpl-cate', res)
//                 // console.log(htmlStr)
//                 $('[name=cate_id]').html(htmlStr)
//                 // 通知 layui重新渲染表单 UI 结构
//                 form.render()

//             }

//         })
//     }

//     // 为筛选表单绑定 submit 事件
//     $('#form-search').on('submit', function (e) {
//         e.preventDefault()
//         // 获取表单中的值
//         let cate_id = $('[name=cate_id]').val()
//         let state = $('[name=state]').val()
//         // 为查询参数 q 中的对应属性赋值
//         q.cate_id = cate_id
//         q.state = state
//         // console.log(q)
//         // 根据筛选条件，重新渲染表格数据
//         initTable()
//     })

// // -------------------------------
// // 自行添加

//     let indexEdit = null
//     // 通过代理的方式 为添加按钮 添加 点击事件
//     $('#tb').on('click','#btn-edit',function(){
//       indexEdit = layer.open({
//         type : 1 ,
//         area : ['500px','250px'],
//         title: '编辑文章分类',
//         content: $('#dialog-edit').html()
//       })
      
  
//       let id = $(this).attr('data-id')
//       $.ajax({
//         method : 'GET',
//         url : `/my/article/cates/${id}`,
//         success : res => {
//           form.val('form-edit',res.data)
//         }
//       })
//     })
  
  

//     // 通过代理的方式 ，为确认编辑按钮添加 提交事件
//     $('body').on('submit','#form-edit',function(e){
//       e.preventDefault()
//       $.ajax({
//         method : 'POST',
//         url : '/my/article/updatecate',
//         data : $(this).serialize(),
//         success : res => {
//           console.log(res)
//           if(res.status !== 0) return layer.msg('更新分类数据失败')
//           layer.msg('更新分类数据成功')
//           // 根据索引关闭弹出层
//           layer.close(indexEdit)
//           initArtCateList()
//         }
//       })
//     })

// --------------------------------
























    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox',  // 分页的容器
            count: total,    // 总数据的条数
            limit: q.pagesize,  // 每页显示几条数据
            curr: q.pagenum,  // 设置默认被选中的分页
            layout : [ 'count','limit','prev', 'page', 'next','skip'],
            limits : [2,3,5,10],

            // 分页切换时，触发jump回调
            // 触发jump回调的两种方式，
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render()方法，就会触发 jump 回调
            jump: function (obj,first) {
                // 可以通过first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true ，证明是方式2触发的
                // 否则就是方式1 触发的
                // console.log(!first)
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // 把最新的页码值赋值到 q 这个查询参数中
                q.pagenum = obj.curr  
                // 把最新的条目数赋值到 q 这个查询参数中
                q.pagesize = obj.limit
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                // initTable()
                if(!first) {
                    initTable()
                }
            }
        })
    }



    // 通过代理的形式，为删除按钮绑定点击事件
    $('#tb').on('click','#btn-delete',function(){
        let len = $('#btn-delete').length
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            
            $.ajax({
                method : 'GET',
                url : `/my/article/delete/${id}`,
                success : res => {
                    if (res.status !== 0 ) return layer.msg('删除失败')
                    layer.msg('删除成功')
                    console.log(len)
                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了，则让页码值 -1 之后，
                    // 再重新调用 initTable 方法
                    if (len === 1) {
                        // 如果 len 等于 1，则证明删除完成后，页面上没有任何数据了
                        // 页码值最小 是 1 
                       q.pagenum  =  q.pagenum === 1 ?  q.pagenum = 1 : q.pagenum - 1 
                    }
                    console.log(q.pagenum)
                    initTable()
                }
            })
            layer.close(index)

        })
    })





})