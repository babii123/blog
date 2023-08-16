// import Router from 'next/router';
import { NextResponse, NextRequest } from 'next/server'

const middleware = (req: NextRequest, res: NextResponse) => {
      // 在这里进行验证逻辑，例如检查用户是否已登录或具有特定权限
      // const isAuthenticated = fetch('/api/hello')
      // console.log(isAuthenticated);

      // if (!isAuthenticated) {
      //       // 如果未通过验证，则重定向到登录页面或其他指定页面
      //       // Router.push('/error/404');
      //       return;
      // }
      // Router.push(req.url)

      // 如果通过验证，则调用下一个中间件或处理程序
      // const loginUrl = new URL('/error/404', req.url)
      // if (req.nextUrl.pathname.startsWith('/creator')){
      //       // loginUrl.searchParams.set('from', req.nextUrl.pathname)
      //       return NextResponse.redirect(loginUrl)
      // }
      return;
};

export default middleware;