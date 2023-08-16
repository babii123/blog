/**
 * @Description 数据中心 - 内容数据 - 文章数据
 */

import React, { useEffect, useState } from 'react';
import Router from 'next/router'

import styles from '../../../../styles/creator.module.css'
import StatisticEntire from '../../StatisticEntire';
import MyCharts from '../../MyCharts';
import { CountDataModel, CountList } from './type'


const ArticleData: React.FC = () => {
      const [count_data, setCountData] = useState<Array<CountDataModel>>([
            {
                  label: '总文章数',
                  count: 21,
                  color: '#1677ff'
            },
            {
                  label: '文章展现数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章阅读数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章点赞数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章评论数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章收藏数',
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
            <>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className={styles.dataCardEntire}>
                              <StatisticEntire value={21} title="总文章数" />
                              <div>较前日--</div>
                        </div>
                        <div className={styles.dataCardEntire}>
                              <StatisticEntire title="文章展现数" value={3563} />
                              <div>较前日--</div>
                        </div>
                        <div className={styles.dataCardEntire} style={{ marginRight: '0' }}>
                              <StatisticEntire title="文章阅读数" value={956} />
                              <div>较前日--</div>
                        </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className={styles.dataCardEntire} style={{ marginBottom: '0' }}>
                              <StatisticEntire title="文章点赞数" value={16} />
                              <div>较前日--</div>
                        </div>
                        <div className={styles.dataCardEntire} style={{ marginBottom: '0' }}>
                              <StatisticEntire title="文章评论数" value={1} />
                              <div>较前日--</div>
                        </div>
                        <div className={styles.dataCardEntire} style={{ marginBottom: '0', marginRight: '0' }}>
                              <StatisticEntire title="文章收藏数" value={2} />
                              <div>较前日--</div>
                        </div>
                  </div>
            </>
      );
};

export default ArticleData;