export interface CountDataModel {
      label: string,
      count: number,
      color: string
}

export const CountList: { [key: string]: string } = {
      '全部': 'all',
      '已发布': 'published',
      '审核中': 'auditing',
      '未通过': 'rejected'
}