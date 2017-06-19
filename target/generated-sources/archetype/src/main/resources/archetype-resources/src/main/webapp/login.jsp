<%@page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Web Auth</title>
  <link href="/dist/login.css" rel="stylesheet"></head>

<body>
  <div class="login-page">
    <div class="title">
      <h1>Web Auth</h1>
      <h4>TZG Central Authentication Platform</h4>
    </div>
    <div class="login-box">
      <div class="logo"></div>
      <form name="form" method="post" action="/auth/authc">
        <div class="form-group username">
          <input type="text" class="form-control" id="username" name="username" placeholder="请输入用户名" required>
        </div>
        <div class="form-group password">
          <input type="password" class="form-control" id="password" name="password" placeholder="请输入密码" required>
        </div>
        <button type="submit" class="btn btn-primary">登录</button>
      </form>
    </div>
  </div>
</body>
</html>