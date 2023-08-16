import React, { useState, useEffect } from 'react'

import ReactEChartsCore from 'echarts-for-react/lib/core';
import { getCountAllByFramerId, getCountAllByType } from '../../config/getRequest'
import { Divider } from 'antd'

import * as echarts from 'echarts/core';
import {
      ToolboxComponent,
      ToolboxComponentOption,
      TooltipComponent,
      TooltipComponentOption,
      GridComponent,
      GridComponentOption,
      LegendComponent,
      LegendComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
      ToolboxComponent,
      TooltipComponent,
      GridComponent,
      LegendComponent,
      LineChart,
      CanvasRenderer,
      UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
      | ToolboxComponentOption
      | TooltipComponentOption
      | GridComponentOption
      | LegendComponentOption
      | LineSeriesOption
>;

const MyCharts: React.FC = (props) => {
      let [data, setData] = useState({ ai: 64, android: 82, article: 54, freebie: 89, backend: 30, frontend: 131, ios: 96 })
      let [data1, setData1] = useState({ ai: 0, android: 3, article: 0, freebie: 0, backend: 0, frontend: 0, ios: 3 })
      useEffect(() => {
            // getCountAllByType().then(res => {
            //       if (res.code === 200) {
            //             setData({ ...res.data })
            //             console.log(data);
            //       } else {
            //             console.log(res);
            //       }
            // })
            // getCountAllByFramerId(localStorage.getItem("framer_id")).then(res=>{
            //       if (res.code === 200) {
            //             console.log(res.data);
            //             setData1({...data1,...res.data})
            //             console.log(data1);
            //       } else {
            //             console.log(res);
            //       }
            // })
      }, [])
      const option = {
            color: ['#9f54ff'],
            tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                        type: 'cross',
                        label: {
                              backgroundColor: '#6a7985'
                        }
                  }
            },
            toolbox: {
                  feature: {
                        saveAsImage: {
                              show: true,
                              title: '导出数据',
                        }
                  }
            },
            grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
            },
            xAxis: [
                  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  }
            ],
            yAxis: [
                  {
                        type: 'value'
                  }
            ],
            series: [
                  {
                        name: 'Line 1',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        showSymbol: false,
                        areaStyle: {
                              opacity: 0.8,
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                          offset: 0,
                                          color: 'rgb(227, 207, 255)'
                                    },
                                    {
                                          offset: 1,
                                          color: 'rgb(255, 255, 255)'
                                    }
                              ])
                        },
                        emphasis: {
                              focus: 'series'
                        },
                        data: [14, 23, 101, 26, 90, 40, 25]
                  },
            ]
      };
      const getOption = () => {
            return option;
      };
      return (
            <ReactEChartsCore
                  notMerge={true}
                  lazyUpdate={true}
                  echarts={echarts}
                  option={getOption()}
                  style={{ height: '450px', width: '100%' }}
            />
      )
}
export default MyCharts;