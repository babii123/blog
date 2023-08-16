/**
 * 同意返回的参数类型
 */

export type RootObject<T> = {
      code: number
      msg: string
      data: T
}