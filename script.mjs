#!/usr/bin/env zx

const fs = require('fs');
const path = require('path');

async function createReactApp() {
  // 获取用户输入的应用名称
  const appName = await $`read -p "请输入应用名称: " && echo $REPLY`;

  // 创建新的 React 应用
  await $`npx create-react-app ${appName}`;

  // 进入新创建的应用目录
  cd(appName);

  // 安装一些常用的依赖·
  await $`npm install axios react-router-dom styled-components`;

  // 获取同级脚本目录下的 .gitlab-ci.yml 文件的路径
  const ciConfigPath = path.join(__dirname, '.gitlab-ci.yml');

  // 读取 .gitlab-ci.yml 文件内容
  const ciConfigContent = fs.readFileSync(ciConfigPath, 'utf8');

  // 将 .gitlab-ci.yml 文件内容写入到应用根目录下的 .gitlab-ci.yml 文件中
  fs.writeFileSync('.gitlab-ci.yml', ciConfigContent);

  // 启动开发服务器
  await $`npm start`;
}

// 执行函数
createReactApp();
