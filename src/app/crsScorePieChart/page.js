"use client"; // 确保这段代码在客户端运行

import { useEffect, useRef, useState } from 'react';
import VChart from '@visactor/vchart';

const ChartPage = () => {
    const chartContainerRef = useRef(null); // 用于图表
    const [chartData, setChartData] = useState(null); // 用于存储从JSON读取的数据

    useEffect(() => {
        // 读取/exported_data.json的数据
        fetch('/exported_data.json')
            .then(response => response.json())
            .then(data => {
                setChartData(data.values); // 假设data.values是JSON中的关键数据
            })
            .catch(error => console.error('Error fetching JSON data:', error));
    }, []);

    useEffect(() => {
        if (chartData) {
            const data = chartData;
            const createData = () => {
                return data.map(values => {
                    return {
                        data: {
                            id: 'crs',
                            values: values
                        }
                    };
                });
            };

            const specs = createData();


            const spec = {
                type: 'common',
                player: {
                    auto: true,
                    loop: true,
                    interval: 300,
                    width: 500,
                    position: 'middle',
                    type: 'continuous',
                    specs: specs
                },
                series: [
                    {
                        type: 'pie',
                        data: specs[0].data,
                        dataKey: 'crsScore',
                        outerRadius: 0.75, // 增加外半径，让饼图更大
                        innerRadius: 0.2, // 保持内半径，创建环形图
                        label: {
                            visible: true,
                            position: 'outside',
                            line: {
                                visible: true,
                                length: 25, // 增加标签线长度
                                length2: 15 // 增加标签线长度
                            },
                            style: {
                                fontSize: 13, // 稍微增加字体大小
                                fill: '#333',
                                maxWidth: 90, // 稍微增加标签最大宽度
                                wordWrap: true
                            }
                        },
                        valueField: 'population',
                        seriesField: 'crsScore'
                    }
                ],
                legends: {
                    visible: true,
                    orient: 'bottom',
                    position: 'middle',
                    item: {
                        label: {
                            style: {
                                fontSize: 13, // 稍微增加字体大小
                                fill: '#333',
                                maxWidth: 110, // 稍微增加标签最大宽度
                                wordWrap: true
                            }
                        }
                    }
                },
                customMark: [
                    {
                        type: 'text',
                        position: ['50%', '50%'],
                        content: chartData[0].drawDate,
                        style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                            fill: '#000',
                            textAlign: 'center',
                            textBaseline: 'middle',
                        }
                    }
                ]
            };

            const vchart = new VChart(spec, { dom: chartContainerRef.current });
            vchart.renderSync();

            // Cleanup chart on unmount
            return () => {
                if (chartContainerRef.current) {
                    chartContainerRef.current.innerHTML = '';
                }
            };
        }
    }, [chartData]);

    return (
        <div className="bg-gray-100 relative" style={{ width: '100%', height: '400px', minHeight: '300px' }} ref={chartContainerRef} />
    );
};

export default ChartPage;


