export const MenuKeyPath: { [key: string]: string } = {
      '/home': 'sub1',
      '/content/article/essays': '5',
      '/content/article/drafts': '5',
      '/content/column': '6',
      '/content/pins': '7',
      '/help/question': '11',
      '/data/content/article/entire': '8',
      '/data/content/article/single': '8',
      '/data/content/column/entire': '8',
      '/data/content/pin/entire': '8',
      '/data/follower/data': '9',
      '/data/follower/list': '9',
      '/tool/import/self': '10',
}

export interface Props {
      DefaultSelectedKeys: string[]
}