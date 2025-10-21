"use client";
import { useEffect, useRef, useState } from 'react';
import VChart from '@visactor/vchart';

const translations = {
    en: {
        startDate: "Start Date",
        endDate: "End Date",
        totalCandidates: "Total Number of Candidates Over Time",
    },
    zh: {
        startDate: "开始日期",
        endDate: "结束日期",
        totalCandidates: "候选人总数随时间变化",
    },
    fr: {
        startDate: "Date de début",
        endDate: "Date de fin",
        totalCandidates: "Nombre total de candidats au fil du temps",
    },
    hi: {
        startDate: "प्रारंभ तिथि",
        endDate: "समाप्ति तिथि",
        totalCandidates: "समय के साथ कुल उम्मीदवारों की संख्या",
    }
};

const TotalPopulationLineChart = ({ pageLanguage = 'en' }) => {
    const chartContainerRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const [language, setLanguage] = useState(pageLanguage);
    const [timeRange, setTimeRange] = useState({
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    // 监听页面语言变化
    useEffect(() => {
        setLanguage(pageLanguage);
    }, [pageLanguage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json');
                const data = await response.json();
                const rounds = data.rounds || [];

                // Filter data based on the specified date range
                const filteredData = rounds.filter((round) => {
                    const distributionDate = new Date(round.drawDistributionAsOn);
                    const startDate = new Date(timeRange.startDate);
                    const endDate = new Date(timeRange.endDate);
                    return distributionDate >= startDate && distributionDate <= endDate;
                });

                // Map the data and sort by date, showing chronological order (oldest to newest)
                const sortedData = filteredData
                    .map((round) => ({
                        date: round.drawDistributionAsOn,
                        total: parseInt(round['dd18']?.replace(',', '') || 0),
                    }))
                    .filter((item) => item.date)
                    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort dates chronologically (oldest to newest)

                // Use a Map to keep only the first occurrence of each date
                const uniqueDateMap = new Map();
                sortedData.forEach((item) => {
                    if (!uniqueDateMap.has(item.date)) {
                        uniqueDateMap.set(item.date, item.total);
                    }
                });

                // Extract the aligned dates and data, ensuring no duplicates
                const alignedDates = Array.from(uniqueDateMap.keys());
                const alignedData = Array.from(uniqueDateMap.values());

                setChartData({
                    dates: alignedDates,
                    totals: alignedData
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [timeRange]);

    useEffect(() => {
        if (chartData.dates && chartData.totals) {
            // 安全地获取窗口尺寸
            const getWindowDimensions = () => {
                if (typeof window !== 'undefined') {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                }
                return { width: 768, height: 1024 };
            };
            
            const { width: windowWidth, height: windowHeight } = getWindowDimensions();
            const isMobile = windowWidth < 768;
            const isLandscape = windowWidth > windowHeight;
            const isMobileLandscape = isMobile && isLandscape && windowHeight < 500;

            const spec = {
                type: 'common',
                width: isMobile ? (isMobileLandscape ? windowWidth - 10 : windowWidth - 20) : Math.min(windowWidth * 0.9, 1200), // 移动端优化宽度
                height: isMobileLandscape ? 200 : (isMobile ? (isLandscape ? 300 : 400) : 400), // 恢复高度
                padding: isMobileLandscape ? [10, 10, 20, 10] : (isMobile ? (isLandscape ? [15, 10, 30, 10] : [20, 10, 40, 20]) : [25, 15, 50, 25]), // 调整padding
                autoFit: true,
                data: [
                    {
                        id: 'totalCandidates',
                        values: chartData.dates.map((date, index) => ({
                            date: date,
                            total: chartData.totals[index]
                        }))
                    }
                ],
                series: [
                    {
                        type: 'line',
                        dataIndex: 0,
                        xField: 'date',
                        yField: 'total',
                        point: {
                            style: {
                                size: isMobileLandscape ? 3 : (isMobile ? 4 : 5),
                                fill: 'rgba(153, 102, 255, 1)',
                                stroke: 'rgba(153, 102, 255, 1)',
                                strokeWidth: 2
                            }
                        },
                        line: {
                            style: {
                                stroke: 'rgba(153, 102, 255, 1)',
                                strokeWidth: isMobileLandscape ? 2 : 3
                            }
                        }
                    }
                ],
                axes: [
                    {
                        orient: 'left',
                        label: { 
                            visible: true, // 确保标签可见
                            style: { 
                                fill: '#000',
                                fontSize: isMobileLandscape ? 10 : (isMobile ? 12 : 14) // 增加字体大小
                            } 
                        },
                        title: {
                            visible: true,
                            text: 'Total Number of Candidates',
                            style: {
                                fontSize: isMobileLandscape ? 12 : (isMobile ? 14 : 16), // 增加标题字体大小
                                fill: '#000'
                            }
                        },
                        // 动态调整Y轴范围，让波动更明显
                        min: (() => {
                            const dataValues = chartData.totals || [];
                            if (dataValues.length === 0) return 0;
                            const minValue = Math.min(...dataValues);
                            const maxValue = Math.max(...dataValues);
                            const range = maxValue - minValue;
                            // 设置最小值为数据最小值减去20%的范围，但不少于0，让波动更明显
                            return Math.max(0, minValue - range * 0.2);
                        })(),
                        max: (() => {
                            const dataValues = chartData.totals || [];
                            if (dataValues.length === 0) return 100000;
                            const minValue = Math.min(...dataValues);
                            const maxValue = Math.max(...dataValues);
                            const range = maxValue - minValue;
                            // 设置最大值为数据最大值加上20%的范围，让波动更明显
                            return maxValue + range * 0.2;
                        })()
                    },
                    {
                        orient: 'bottom',
                        label: { 
                            visible: true, 
                            style: { 
                                fill: '#000',
                                fontSize: isMobileLandscape ? 9 : (isMobile ? 11 : 12), // 增加字体大小
                                angle: -45,
                                textAlign: 'end'
                            },
                            formatMethod: (text) => {
                                if (text && text.length > 10) {
                                    // 更好的日期格式化，显示年-月-日
                                    const date = new Date(text);
                                    if (!isNaN(date.getTime())) {
                                        const year = date.getFullYear();
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const day = date.getDate().toString().padStart(2, '0');
                                        return `${year}-${month}-${day}`;
                                    }
                                    return text.substring(0, 10); // 备用方案，显示完整日期
                                }
                                return text;
                            }
                        },
                        type: 'band',
                        tick: {
                            visible: true,
                            style: {
                                stroke: '#ccc',
                                strokeWidth: 1
                            }
                        },
                        tickCount: isMobileLandscape ? 3 : (isMobile ? 4 : 6) // 减少标签数量以避免重叠
                    }
                ],
                legends: {
                    visible: false // 单线图不需要图例
                }
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

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setTimeRange((prev) => ({ ...prev, [name]: value }));
    };

    const t = translations[language];

    return (
        <div className="flex flex-col bg-white px-1 sm:px-4">
            <div className="relative isolate px-1 sm:px-6 pt-2 lg:px-8 w-full max-w-full mx-auto lg:ml-4">
                <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 mb-4 px-4">
                    {t.totalCandidates}
                </h2>

                {/* 日期选择器 */}
                <div className="text-center mb-4 px-2 sm:px-4 w-full mobile-landscape-controls">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 inline-block">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label htmlFor="startDate" className="text-black text-sm sm:text-base font-semibold mobile-landscape-text flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {t.startDate}
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={timeRange.startDate}
                                    onChange={handleDateChange}
                                    className="border-2 border-gray-300 rounded-lg px-3 py-2 text-black text-sm sm:text-base min-w-0 sm:min-w-[150px] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                />
                            </div>
                            <div className="hidden sm:block text-gray-400">→</div>
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label htmlFor="endDate" className="text-black text-sm sm:text-base font-semibold mobile-landscape-text flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {t.endDate}
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={timeRange.endDate}
                                    onChange={handleDateChange}
                                    className="border-2 border-gray-300 rounded-lg px-3 py-2 text-black text-sm sm:text-base min-w-0 sm:min-w-[150px] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 图表容器 */}
                <div className="w-full flex justify-center items-center px-0 mobile-landscape-container" style={{ 
                    height: typeof window !== 'undefined' && window.innerWidth > window.innerHeight && window.innerHeight < 500 ? '25vh' : 
                           (typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? '35vh' : '50vh')
                }}>
                    <div 
                        ref={chartContainerRef} 
                        className="w-full h-full mobile-landscape-chart"
                        style={{ 
                            minHeight: typeof window !== 'undefined' && window.innerWidth > window.innerHeight && window.innerHeight < 500 ? '120px' :
                                       (typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? '200px' : '300px'),
                            maxWidth: '100%',
                            margin: '0'
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default TotalPopulationLineChart;
