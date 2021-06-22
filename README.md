# 英雄联盟LPL数据可视化平台
🎈对英雄联盟LPL2021夏季赛的数据进行可视化处理</br>
😊会持续更新以后的赛季</br>

> 预览 https://work.littlefish.life

## 技术栈
![](https://img.shields.io/badge/Node.js-v14.16.0-afdfe4)
![](https://img.shields.io/badge/@vue/cli-v4.5.12-blueviolet)
![](https://img.shields.io/badge/Apache%20ECharts-v5.1.2-ed1941)
![](https://img.shields.io/badge/Express-v4.16.1-293047)
![](https://img.shields.io/badge/MySQL-v5.7.30-afdfe4)

## 文件描述
1. front 文件为 Vue 目录文件
2. backen 文件为 Node 目录文件

## 如何使用
1. clone 项目到本地
2. 打开终端进入 front 文件 执行 npm install 安装依赖
3. 打开终端进入 backen 文件 执行 npm install 安装依赖
4. 在本地数据库新建一个 lpl 库，新建四个表 team、member、LPLHero、hero
5. 修改 backen 文件 utils 文件里的 dbconfig.js 里的 config

```javascript
  config: {
    host: "localhost",
    port: "3306",
    user: "root", // 你的数据库用户名
    password: "123456", // 你的数据库密码
    database: "lpl",
    multipleStatements: true
  },
```
6. 终端进入 backen 文件执行 node app.js 启动 node 项目
7. 浏览器分别输入 http://localhost:3000/team 、http://localhost:3000/member 、http://localhost:3000/hero 、http://localhost:3000/herolist 读取数据至数据库
8. 终端进入 front 文件执行 npm run serve 启动 Vue 项目
9. 浏览器输入 http://localhost:8088 访问项目即可

## 谢谢🙏
