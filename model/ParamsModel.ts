/**
 * 发送请求的参数类型
 */

export interface LoginParams {
      nameOrEmailOrPhone: string,
      password: string,
}

export interface RegisterParam {
      id: string,
      name: string,
      img_path: null,
      introduce: null,
      registerTime: null,
      password: string,
      email: string,
      phone: string,
      recentTime: null
}