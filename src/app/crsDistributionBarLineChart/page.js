"use client";
import { useEffect, useRef, useState } from 'react';
import VChart from '@visactor/vchart';

const translations = {
    en: {
        startDate: "Start Date",
        endDate: "End Date",
        showInvitations: "Show Invitations(Bar)",
        showCRS: "Show CRS Scores(Line)",
        language: "Choose Language for This Chart:"
    },
    zh: {
        startDate: "开始日期",
        endDate: "结束日期",
        showInvitations: "显示邀请",
        showCRS: "显示 CRS 分数",
        language: "请选择此表语言:"

    },
    fr: {
        startDate: "Date de début",
        endDate: "Date de fin",
        showInvitations: "Afficher les invitations",
        showCRS: "Afficher les scores CRS",
        language: "Choisissez la langue de ce graphique:"
    },
    hi: {
        startDate: "प्रारंभ तिथि",
        endDate: "समाप्ति तिथि",
        showInvitations: "आमंत्रण दिखाएं",
        showCRS: "CRS स्कोर दिखाएं",
        language: "इस चार्ट के लिए भाषा चुनें:"

    }
};

const ChartPage = ({ pageLanguage = 'en' }) => {
    const chartContainerRef = useRef(null); // 用于图表
    const [chartData, setChartData] = useState({ id0: [], id1: [] });
    const [language, setLanguage] = useState(pageLanguage); // 使用传入的页面语言
    const [timeRange, setTimeRange] = useState({
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0], // 默认开始日期为一年前
        endDate: new Date().toISOString().split('T')[0] // 默认结束日期为今天
    });
    const [showInvitations, setShowInvitations] = useState(true);
    const [showCRS, setShowCRS] = useState(true);

    // 监听页面语言变化
    useEffect(() => {
        setLanguage(pageLanguage);
    }, [pageLanguage]);

    useEffect(() => {
        // 定义数据处理函数
        const processChartData = (data) => {
            const startDate = new Date(timeRange.startDate);
            const endDate = new Date(timeRange.endDate);
            let filteredRounds = data.rounds.filter(round => {
                const roundDate = new Date(round.drawDate);
                return roundDate >= startDate && roundDate <= endDate;
            });

            // 保持所有数据点，不进行采样

            // 提取并反转数据顺序
            const id0 = filteredRounds.map(round => ({
                x: round.drawDate,
                type: round.drawName.replace(/\(Version \d+\)/g, '').trim(), // 移除所有版本号
                y: round.drawSize.replace(',', '')
            })).reverse(); // reverse data order for id0

            const id1 = filteredRounds.map(round => ({
                x: round.drawDate,
                type: round.drawName.replace(/\(Version \d+\)/g, '').trim(), // 移除所有版本号
                y: round.drawCRS.replace(',', '')
            })).reverse(); // reverse data order for id1

            setChartData({ id0, id1 });
        };

        // 获取JSON数据
        const fetchData = async () => {
            const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json');
            const data = await response.json();
            processChartData(data);
        };

        fetchData();
    }, [timeRange]); // 监听timeRange变化

    useEffect(() => {
        // 安全地获取窗口尺寸
        const getWindowDimensions = () => {
            if (typeof window !== 'undefined') {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }
            return { width: 768, height: 1024 }; // 默认值
        };
        
        const { width: windowWidth, height: windowHeight } = getWindowDimensions();
        const isMobile = windowWidth < 768;
        const isLandscape = windowWidth > windowHeight; // 横屏检测
        
        const spec = {
            type: 'common',
            seriesField: 'color',
            // 响应式配置，更好地利用屏幕空间
            width: isMobile ? windowWidth - 10 : windowWidth * 0.9,
            height: isMobile ? (isLandscape ? 250 : 500) : 400, // 横屏时大幅减少高度
            // 图表边距配置，减少空白区域
            padding: isMobile ? (isLandscape ? [10, 5, 20, 5] : [20, 5, 40, 5]) : [20, 10, 40, 20], // 横屏时大幅减少上下边距
            // 确保图表居中
            autoFit: true,
            data: [
                {
                    id: 'id0',
                    values: showInvitations ? chartData.id0 : [] // 控制 bar 显示
                },
                {
                    id: 'id1',
                    values: showCRS ? chartData.id1 : [] // 控制 line 显示
                }
            ],
            series: [
                {
                    type: 'bar',
                    id: 'bar',
                    dataIndex: 0,
                    seriesField: 'type',
                    xField: ['x'],
                    yField: 'y',
                    bar: {
                        style: {
                            maxWidth: isMobile ? 12 : 20, // 根据屏幕大小调整宽度
                            minWidth: 2   // 设置最小宽度
                        }
                    },
                    barWidth: isMobile ? 6 : 10, // 根据屏幕大小调整柱状图宽度
                    barGap: 0.05, // 减少柱子之间的间隙
                },
                {
                    type: 'line',
                    id: 'line',
                    dataIndex: 1,
                    seriesField: 'type',
                    xField: 'x',
                    yField: 'y',
                    stack: false,
                    beginAtZero: false,
                    point: {
                        style: {
                            size: 4 // 减小点的尺寸
                        }
                    }
                }
            ],
            axes: [
                {
                    orient: 'left',
                    seriesIndex: [0],
                    label: { style: { fill: '#000' } },
                    type: 'linear',
                    title: {
                        visible: true,
                        text: 'Invitation'
                    }
                }, // 控制 bar 图的 y 轴
                {
                    orient: 'right',
                    seriesId: ['line'],
                    grid: { visible: false },
                    label: { style: { fill: '#000' } },
                    min: 70,
                    title: {
                        visible: true,
                        text: 'Score'
                    }
                }, // 控制 line 图的 y 轴
                {
                    orient: 'bottom',
                    label: { 
                        visible: true, 
                        style: { 
                            fill: '#000',
                            fontSize: isMobile ? (isLandscape ? 8 : 9) : 9,
                            angle: -45, // 旋转标签以避免截断
                            textAlign: 'end'
                        },
                        formatMethod: (text) => {
                            // 格式化日期显示，只显示月-日
                            if (text && text.length > 10) {
                                return text.substring(5, 10); // 显示 MM-DD
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
                    // 根据屏幕大小调整标签数量
                    tickCount: isMobile ? 6 : 10
                } // x 轴
            ],
            legends: {
                visible: true,
                orient: 'bottom',
                position: 'middle',
                item: {
                    label: { 
                        style: { 
                            fill: '#000',
                            fontSize: isMobile ? (isLandscape ? 8 : 10) : 12
                        } 
                    },
                    shape: {
                        size: isMobile ? (isLandscape ? 6 : 8) : 10
                    }
                },
                // 移动端优化：减少图例间距
                padding: isMobile ? (isLandscape ? 3 : 5) : 10
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
    }, [chartData, showInvitations, showCRS]); // 监听chartData、showInvitations、showCRS变化

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setTimeRange((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (!checked && !showInvitations && !showCRS) {
            return; // 如果两个选项都取消了，则不做任何改变
        }
        if (name === 'invitations') setShowInvitations(checked);
        if (name === 'crsScores') setShowCRS(checked);
    };


    const t = translations[language]; // 选择当前语言的翻译

    return (
        <div className="flex flex-col min-h-screen bg-white px-1 sm:px-4">
            <div className="relative isolate px-1 sm:px-6 pt-14 lg:px-8 w-full max-w-full mx-auto">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>





                {/* 日期选择器 */}
                <div className="text-center mb-4 px-1 sm:px-4 w-full">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-full mx-auto">
                        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                            <label htmlFor="startDate" className="text-black text-sm sm:text-base font-medium">{t.startDate}：</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={timeRange.startDate}
                                onChange={handleDateChange}
                                className="border rounded-md px-3 py-2 text-black text-sm sm:text-base min-w-0 sm:min-w-[150px]"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                            <label htmlFor="endDate" className="text-black text-sm sm:text-base font-medium">{t.endDate}：</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={timeRange.endDate}
                                onChange={handleDateChange}
                                className="border rounded-md px-3 py-2 text-black text-sm sm:text-base min-w-0 sm:min-w-[150px]"
                            />
                        </div>
                    </div>
                </div>

                {/* 显示选项复选框 */}
                <div className="text-center mb-5 px-1 sm:px-4 w-full">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 max-w-full mx-auto">
                        <label className="text-black text-sm sm:text-base flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="invitations"
                                checked={showInvitations}
                                onChange={handleCheckboxChange}
                                className="border rounded-md w-4 h-4"
                            /> 
                            <span className="whitespace-nowrap">{t.showInvitations}</span>
                        </label>
                        <label className="text-black text-sm sm:text-base flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="crsScores"
                                checked={showCRS}
                                onChange={handleCheckboxChange}
                                className="border rounded-md w-4 h-4"
                            /> 
                            <span className="whitespace-nowrap">{t.showCRS}</span>
                        </label>
                    </div>
                </div>

                {/* 图表容器 */}
                <div className="w-full flex justify-center items-center px-0" style={{ 
                    height: typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? '40vh' : '80vh' 
                }}>
                    <div 
                        ref={chartContainerRef} 
                        className="w-full h-full"
                        style={{ 
                            minHeight: typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? '200px' : '500px',
                            maxWidth: '100%',
                            margin: '0'
                        }}
                    ></div>
                </div>
            </div>


            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
            </div>
        </div>
    );
};

export default ChartPage;
