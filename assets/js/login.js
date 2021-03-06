$(function () {
    // 点击切换效果
    // 点击去注册账号让登录框隐藏，注册框显示
    $("#link_reg").click(() => {
        $(".login-box").hide();//登录
        $(".reg-box").show();//注册
    });
    // 点击去登录让注册框隐藏，登录框显示
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 获取form
    const form = layui.form;
    // 定义表单验证规格
    form.verify({
        // 定义校验密码的规则，数组的方式
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 定义确认密码规则，函数的方式
        repwd: (val) => {
            const pwd = $(".reg-box [name=password]").val();
            if (val !== pwd) return "两次密码不一致！";
        },
    });

    // 
    // const baseUrl = "http://www.liulongbin.top:3007";

    // 导入layui的弹窗组件 layer
    const layer = layui.layer;

    // 监听注册表单提交，发送注册请求

    $("#form_reg").on("submit", function (e) {
        // 阻止form默认提交行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg("注册失败！");
                layer.msg("注册成功！");
                $("#link_login").click();
            },
        });
    });
    // 监听登录表单，发送登录请求
$("#form_login").submit((e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url:  "/api/login",
        data: $("#form_login").serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg("登录成功！");
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem("token", res.token);
            // 跳转到主页
            location.href = "/index.html";
        },
    });
});
});


