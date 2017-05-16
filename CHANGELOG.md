1.0.1版本:

此版本只是配合framework-core进行了dependency重构。故只是修改了pom.xml里面的依赖配置

新增:

1) 多环境切换支持（利用maven profile）

删除：

1）web.xml文件中的bootstrap servlet。将其变成单独的浏览器启动组件（component-browser-starter）

2017/05/15

+ 升级为V1.0.2。配合zookeeper组件引入带来的一系列组件升级
  修改module代码生成结构。使其符合业务为主的目录结构