$(function() {
    const layer = layui.layer;
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

// 模拟文件选择框 点击事件
$("#btnChooseImage").click(()=>{
    $("#file").click()
});
// 设置图片
// 为文件上传框绑定 change 事件
$("#file").change((e) => {
    const fileList = e.target.files.length;
    if (fileList === 0) return layer.msg("请选择文件上传！");

    // 1.获取用户上传的文件
    let file = e.target.files[0];
    // 2. 将文件，转化为路径（获取文件路径）
    var imgUrl = URL.createObjectURL(file);
    // 3. 重新初始化裁剪区域
    $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", imgUrl) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
});

// 上传图片
$("#btnUpdate").click((e)=>{
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL=$image
    .cropper("getCroppedCanvas",{
        // 创建一个Canvas画布
        width:100,
        height:100,
    })
    .toDataURL("image/png");

    // 发送上传文件的请求
    $.ajax({
        type: "POST",
        url: "/my/update/avatar",
        data:{
            avatar:dataURL,

        },
        success: (res) => {
            if (res.status !== 0) return layer.msg("更换头像失败！");
            layer.msg("更换头像成功！");
            // 调用父级的getUserInfo
            window.parent.getUserInfo();

        },
    });
});
});