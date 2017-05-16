1.0.1版本:

此版本只是配合framework-core进行了dependency重构。故只是修改了pom.xml里面的依赖配置

新增:

1) 多环境切换支持（利用maven profile）

删除：

1）web.xml文件中的bootstrap servlet。将其变成单独的浏览器启动组件（component-browser-starter）

2017/05/16

修改java目录结构。 去掉bean, controller, mapper, service等分类