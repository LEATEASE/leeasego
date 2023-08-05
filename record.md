1.项目运行起来，自动打开
---package.json
    "scripts":{
        "serve":"vue-cli-service serve --open"
    }

2.eslint校验功能关闭
---lintOnSave:false

3.编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这类问题，因为vue-router底层已经处理好了
3.1通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前的错误，可以解决。（治标不治本）
this.$router.push(
        {
          name: "search",
          params: { keyword: this.keyword },
        },
        () => {},
        () => {}
      );

4.组件通信
父传子：props
子传父：自定义事件@getInfo="getInfo"
兄弟组件：全局事件总线


5.图片懒加载
vue-lazyload
