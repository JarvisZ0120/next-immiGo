"use client";
import { useEffect, useRef, useState } from 'react';
import VChart from '@visactor/vchart';

const translations = {
    en: {
        startDate: "Start Date",
        endDate: "End Date",
        showInvitations: "Show Invitations",
        showCRS: "Show CRS Scores"
    },
    zh: {
        startDate: "开始日期",
        endDate: "结束日期",
        showInvitations: "显示邀请",
        showCRS: "显示 CRS 分数"
    },
    fr: {
        startDate: "Date de début",
        endDate: "Date de fin",
        showInvitations: "Afficher les invitations",
        showCRS: "Afficher les scores CRS"
    },
    hi: {
        startDate: "प्रारंभ तिथि",
        endDate: "समाप्ति तिथि",
        showInvitations: "आमंत्रण दिखाएं",
        showCRS: "CRS स्कोर दिखाएं"
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
                    type: 'linear'
                }, // 控制 bar 图的 y 轴
                {
                    orient: 'right',
                    seriesId: ['line'],
                    grid: { visible: false },
                    label: { style: { fill: '#000' } },
                    min: 70
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

            {/* 语言切换器 */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <label htmlFor="language" className='text-black'>Choose Language for This Chart: </label>
                <select id="language" value={language} onChange={handleLanguageChange} className="border rounded px-2 py-1 text-black">
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
                        className="border rounded px-2 py-1 text-black"
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
                        className="border rounded px-2 py-1 text-black"
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
                    /> {t.showInvitations}
                </label>
                <label className="text-black">
                    <input
                        type="checkbox"
                        name="crsScores"
                        checked={showCRS}
                        onChange={handleCheckboxChange}
                    /> {t.showCRS}
                </label>
            </div>

            {/* 图表容器 */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%' }}>
                <div ref={chartContainerRef} style={{ width: '80%', height: '100%' }}></div>
            </div>
        </div>
    );
};

export default ChartPage;