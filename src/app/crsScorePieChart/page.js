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
                        dataKey: 'crsScore',  // 假设JSON中的键名
                        outerRadius: 0.81,
                        // innerRadius: 0.5,
                        label: {
                            visible: true,
                            position: 'outside',
                            line: {
                                visible: true
                            }
                        },
                        valueField: 'population',  // 假设每个对象中有"value"键
                        seriesField: 'crsScore' // 假设每个对象中有"browserName"键
                    }
                ],
                customMark: [
                    {
                        type: 'text',
                        position: ['50%', '50%'], // 定位到饼图的中心
                        content: chartData[0].drawDate, // 假设第一个数据有日期
                        style: {
                            fontSize: 24,
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
        <div className="bg-gray-100" style={{ width: '100%', height: '400px' }} ref={chartContainerRef} />
    );
};

export default ChartPage;


