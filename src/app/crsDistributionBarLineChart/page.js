"use client";
import { useEffect, useRef, useState } from 'react';
import VChart from '@visactor/vchart';
import CustomDatePicker from '../components/CustomDatePicker';

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

            // 提取数据并按时间顺序排列（从旧到新）
            const id0 = filteredRounds
                .map(round => ({
                    x: round.drawDate,
                    type: round.drawName.replace(/\(Version \d+\)/g, '').trim(), // 移除所有版本号
                    y: round.drawSize.replace(',', '')
                }))
                .sort((a, b) => new Date(a.x) - new Date(b.x)); // 按时间顺序排序

            const id1 = filteredRounds
                .map(round => ({
                    x: round.drawDate,
                    type: round.drawName.replace(/\(Version \d+\)/g, '').trim(), // 移除所有版本号
                    y: round.drawCRS.replace(',', '')
                }))
                .sort((a, b) => new Date(a.x) - new Date(b.x)); // 按时间顺序排序

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
        const isMobileLandscape = isMobile && isLandscape && windowHeight < 500; // 移动端横屏且高度小于500px
        
            const spec = {
                type: 'common',
                seriesField: 'color',
                // 响应式配置，更好地利用屏幕空间
                width: isMobile ? (isMobileLandscape ? windowWidth - 10 : windowWidth - 20) : Math.min(windowWidth * 0.9, 1200), // 移动端优化宽度
                height: isMobileLandscape ? 200 : (isMobile ? (isLandscape ? 300 : 400) : 400), // 恢复高度
                // 图表边距配置，增加空白区域以显示完整文字
                padding: isMobileLandscape ? [10, 10, 20, 10] : (isMobile ? (isLandscape ? [15, 10, 30, 10] : [20, 10, 40, 20]) : [25, 15, 50, 25]), // 调整padding
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
                            maxWidth: isMobileLandscape ? 8 : (isMobile ? 12 : 20), // 移动端横屏时进一步减少宽度
                            minWidth: 2   // 设置最小宽度
                        }
                    },
                    barWidth: isMobileLandscape ? 4 : (isMobile ? 6 : 10), // 移动端横屏时进一步减少柱状图宽度
                    barGap: 0.02, // 进一步减少柱子之间的间隙
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
                    label: { 
                        visible: true, // 确保标签可见
                        style: { 
                            fill: '#000',
                            fontSize: isMobileLandscape ? 10 : (isMobile ? 12 : 14) // 增加字体大小
                        } 
                    },
                    type: 'linear',
                    title: {
                        visible: true,
                        text: 'Invitation',
                        style: {
                            fontSize: isMobileLandscape ? 12 : (isMobile ? 14 : 16), // 增加标题字体大小
                            fill: '#000'
                        }
                    }
                }, // 控制 bar 图的 y 轴
                {
                    orient: 'right',
                    seriesId: ['line'],
                    grid: { visible: false },
                    label: { 
                        visible: true, // 确保标签可见
                        style: { 
                            fill: '#000',
                            fontSize: isMobileLandscape ? 10 : (isMobile ? 12 : 14) // 增加字体大小
                        } 
                    },
                    // 动态调整Y轴范围，让CRS分数波动更明显
                    min: (() => {
                        const lineData = chartData.id1 || [];
                        if (lineData.length === 0) return 70;
                        const values = lineData.map(item => parseInt(item.y));
                        const minValue = Math.min(...values);
                        const maxValue = Math.max(...values);
                        const range = maxValue - minValue;
                        // 设置最小值为数据最小值减去15%的范围，但不少于70，让波动更明显
                        return Math.max(70, minValue - range * 0.15);
                    })(),
                    max: (() => {
                        const lineData = chartData.id1 || [];
                        if (lineData.length === 0) return 1200;
                        const values = lineData.map(item => parseInt(item.y));
                        const minValue = Math.min(...values);
                        const maxValue = Math.max(...values);
                        const range = maxValue - minValue;
                        // 设置最大值为数据最大值加上15%的范围，让波动更明显
                        return maxValue + range * 0.15;
                    })(),
                    title: {
                        visible: true,
                        text: 'Score',
                        style: {
                            fontSize: isMobileLandscape ? 12 : (isMobile ? 14 : 16), // 增加标题字体大小
                            fill: '#000'
                        }
                    }
                }, // 控制 line 图的 y 轴
                {
                    orient: 'bottom',
                    label: { 
                        visible: true, 
                        style: { 
                            fill: '#000',
                            fontSize: isMobileLandscape ? 9 : (isMobile ? (isLandscape ? 10 : 11) : 12), // 增加字体大小
                            angle: -45, // 旋转标签以避免截断
                            textAlign: 'end'
                        },
                        formatMethod: (text) => {
                            // 格式化日期显示，显示年-月-日
                            if (text && text.length > 10) {
                                const date = new Date(text);
                                if (!isNaN(date.getTime())) {
                                    const year = date.getFullYear();
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    const day = date.getDate().toString().padStart(2, '0');
                                    return `${year}-${month}-${day}`;
                                }
                                return text.substring(0, 10); // 备用方案
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
                    tickCount: isMobileLandscape ? 3 : (isMobile ? 4 : 6) // 减少标签数量以避免重叠
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
                            fontSize: isMobileLandscape ? 9 : (isMobile ? (isLandscape ? 10 : 12) : 14) // 增加字体大小
                        } 
                    },
                    shape: {
                        size: isMobileLandscape ? 6 : (isMobile ? (isLandscape ? 8 : 10) : 12) // 增加形状大小
                    }
                },
                // 移动端优化：减少图例间距
                padding: isMobileLandscape ? 2 : (isMobile ? (isLandscape ? 3 : 5) : 10) // 移动端横屏时最小间距
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
            <div className="relative isolate px-1 sm:px-6 pt-2 lg:px-8 w-full max-w-full mx-auto lg:ml-4">
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
                <div className="text-center mb-3 sm:mb-6 lg:mb-8 px-2 sm:px-4 w-full mobile-landscape-controls">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-5 lg:p-6 inline-block w-full max-w-3xl">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 lg:gap-12">
                            <div className="w-full sm:w-auto">
                                <CustomDatePicker
                                    label={t.startDate}
                                    value={timeRange.startDate}
                                    onChange={(date) => handleDateChange({ target: { name: 'startDate', value: date } })}
                                    className="w-full sm:min-w-[200px] lg:min-w-[220px]"
                                />
                            </div>
                            <div className="hidden sm:block text-gray-400 text-lg lg:text-xl">→</div>
                            <div className="w-full sm:w-auto">
                                <CustomDatePicker
                                    label={t.endDate}
                                    value={timeRange.endDate}
                                    onChange={(date) => handleDateChange({ target: { name: 'endDate', value: date } })}
                                    className="w-full sm:min-w-[200px] lg:min-w-[220px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 显示选项复选框 */}
                <div className="text-center mb-4 px-2 sm:px-4 w-full mobile-landscape-controls">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 inline-block">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
                            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                showInvitations 
                                    ? 'bg-blue-100 border-2 border-blue-300' 
                                    : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                            }`}>
                                <input
                                    type="checkbox"
                                    name="invitations"
                                    checked={showInvitations}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                /> 
                                <span className={`text-sm sm:text-base font-medium whitespace-nowrap ${
                                    showInvitations ? 'text-blue-900' : 'text-gray-700'
                                }`}>
                                    {t.showInvitations}
                                </span>
                            </label>
                            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                showCRS 
                                    ? 'bg-purple-100 border-2 border-purple-300' 
                                    : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                            }`}>
                                <input
                                    type="checkbox"
                                    name="crsScores"
                                    checked={showCRS}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                                /> 
                                <span className={`text-sm sm:text-base font-medium whitespace-nowrap ${
                                    showCRS ? 'text-purple-900' : 'text-gray-700'
                                }`}>
                                    {t.showCRS}
                                </span>
                            </label>
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
