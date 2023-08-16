/**
 * @Description 封装数据中心数据统计的组件
 */
import { Statistic } from 'antd'

interface Props {
      title: string
      value: number
}

const css_style = {
      color: '#1d2129',
      fontSize: '32px',
      fontWeight: '600',
      lineHeight: '42px',
      marginBottom: '4px'
}

const StatisticEntire: React.FC<Props> = ({ title,value }) => (
      <Statistic title={title} value={value} valueStyle={css_style} />
)

export default StatisticEntire