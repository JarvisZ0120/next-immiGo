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

const ChartPage = () => {
    const chartContainerRef = useRef(null); // 用于图表
    const [chartData, setChartData] = useState({ id0: [], id1: [] });
    const [language, setLanguage] = useState('en'); // 默认语言为英文
    const [timeRange, setTimeRange] = useState({
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0], // 默认开始日期为一年前
        endDate: new Date().toISOString().split('T')[0] // 默认结束日期为今天
    });
    const [showInvitations, setShowInvitations] = useState(true);
    const [showCRS, setShowCRS] = useState(true);

    useEffect(() => {
        // 定义数据处理函数
        const processChartData = (data) => {
            const startDate = new Date(timeRange.startDate);
            const endDate = new Date(timeRange.endDate);
            let filteredRounds = data.rounds.filter(round => {
                const roundDate = new Date(round.drawDate);
                return roundDate >= startDate && roundDate <= endDate;
            });

            // 提取并反转数据顺序
            const id0 = filteredRounds.map(round => ({
                x: round.drawDate,
                type: round.drawName.replace(' (Version 1)', ''), // 移除 "Version 1",
                y: round.drawSize.replace(',', '')
            })).reverse(); // reverse data order for id0

            const id1 = filteredRounds.map(round => ({
                x: round.drawDate,
                type: round.drawName.replace(' (Version 1)', ''), // 移除 "Version 1",
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
        const spec = {
            type: 'common',
            seriesField: 'color',
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
                    yField: 'y'
                },
                {
                    type: 'line',
                    id: 'line',
                    dataIndex: 1,
                    seriesField: 'type',
                    xField: 'x',
                    yField: 'y',
                    stack: false,
                    beginAtZero: false // 自动调整最小值
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
                    label: { visible: true, style: { fill: '#000' } },
                    type: 'band'
                } // x 轴
            ],
            legends: {
                visible: true,
                orient: 'bottom',
                label: { style: { fill: '#000' } } // 设置字体为黑色
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

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const t = translations[language]; // 选择当前语言的翻译

    return (
        <div className="flex flex-col min-h-screen bg-white px-4">
            <div className="relative isolate px-6 pt-14 lg:px-8">
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




                {/* 语言切换器 */}
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <label htmlFor="language" className='text-black'>{t.language} </label>
                    <select id="language" value={language} onChange={handleLanguageChange} className="border rounded-md px-2 py-1 text-black w-32">
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="fr">Français</option>
                        <option value="hi">हिंदी</option>
                    </select>
                </div>

                {/* 日期选择器 */}
                <div style={{ textAlign: 'center', marginBottom: '10px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div>
                        <label htmlFor="startDate" style={{ color: 'black' }}>{t.startDate}：</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={timeRange.startDate}
                            onChange={handleDateChange}
                            className="border rounded-md px-2 py-1 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" style={{ color: 'black', marginLeft: '10px' }}>{t.endDate}：</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={timeRange.endDate}
                            onChange={handleDateChange}
                            className="border rounded-md px-2 py-1 text-black"
                        />
                    </div>
                </div>

                {/* 显示选项复选框 */}
                <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <label className="text-black">
                        <input
                            type="checkbox"
                            name="invitations"
                            checked={showInvitations}
                            onChange={handleCheckboxChange}
                            className="border rounded-md"
                        /> {t.showInvitations}
                    </label>
                    <label className="text-black">
                        <input
                            type="checkbox"
                            name="crsScores"
                            checked={showCRS}
                            onChange={handleCheckboxChange}
                            className="border rounded-md"
                        /> {t.showCRS}
                    </label>
                </div>

                {/* 图表容器 */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%' }}>
                    <div ref={chartContainerRef} style={{ width: '80%', height: '100%' }}></div>
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
