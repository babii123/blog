import React, { useEffect, useState } from 'react';
import Router from 'next/router'

import styles from '../../../../styles/Creator.module.scss'
import StatisticEntire from '../../StatisticEntire';
import { CountDataModel, CountList } from './type'

const ColumnData: React.FC = () => {
      const [count_data, setCountData] = useState<Array<CountDataModel>>([
            {
                  label: '总专栏数',
                  count: 21,
                  color: '#1677ff'
            },
            {
                  label: '专栏订阅数',
                  count: 0,
                  color: '#86909c'
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
                                    <div className={styles.dataCardEntire} key={index}>
                                          <StatisticEntire value={item.count} title={item.label} />
                                          <div>较前日--</div>
                                    </div>
                              )
                        })
                  }
            </div>
      );
};

export default ColumnData;