import React, { useEffect, useState } from 'react';
import Router from 'next/router'

import styles from '../../../../styles/creator.module.scss'
import StatisticEntire from '../../StatisticEntire';
import { CountDataModel, CountList } from './type'

const PinData: React.FC = () => {
      const [count_data, setCountData] = useState<Array<CountDataModel>>([
            {
                  label: '总沸点数',
                  count: 21,
                  color: '#1677ff'
            },
            {
                  label: '沸点赞数',
                  count: 21,
                  color: '#1677ff'
            },
            {
                  label: '沸点评论数',
                  count: 21,
                  color: '#1677ff'
            },
      ]);

      useEffect(() => {
            const status = Router.query.status as string
            console.log(status);

            const dataArray = count_data.map((item, i) => {
                  if (CountList[item.label] === status) return { ...item, color: '#1677ff' }
                  else return { ...item, color: '#86909c' }
            })
            setCountData(dataArray)
      }, [])

      return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {
                        count_data.map((item, index) => {
                              return (
                                    <div className={index !== 2 ? styles.dataCardEntire : styles.dataCardEntire2} key={index} >
                                          <StatisticEntire value={item.count} title={item.label} />
                                          <div>较前日--{index !== 2 ? '1' : '2'}</div>
                                    </div>
                              )
                        })
                  }
            </div>
      );
};

export default PinData;