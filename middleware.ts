import { NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest, res: NextResponse) => {

      const Error_404_Url = new URL('/error/404', req.url)
      const token = req.cookies.get("token")?.value

      try {
            // 判断需要验证的路径
            if (req.nextUrl.pathname.startsWith('/creator') || req.nextUrl.pathname.startsWith('/editor')) {
                  // 在这里进行验证逻辑，例如检查用户是否已登录或具有特定权限
                  const result = await fetch('http://localhost:8080/blog/checkLogin',
                        {
                              method: "GET",
                              headers: { "token": token || "" }
                        })
                  const isLogin = (await result.json()).data
                  if (isLogin) {
                        const response = NextResponse.next()
                        response.headers.set('islogin', 'true')
                        return response
                  } else {
                        req.cookies.delete("token")
                        const response = NextResponse.next()
                        response.headers.set('islogin', 'false')
                        return response
                  }
            }
            return;
      } catch (error) {
            return NextResponse.redirect(Error_404_Url)     
      }

};

export default middleware;