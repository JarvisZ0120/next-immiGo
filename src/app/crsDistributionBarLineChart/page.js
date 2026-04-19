"use client";
import { useEffect, useRef, useState, useMemo } from 'react';
import VChart from '@visactor/vchart';
import CustomDatePicker from '../components/CustomDatePicker';
import { useObservedChartSize } from '../hooks/useObservedChartSize';

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

function buildSpec({
    width,
    height,
    chartData,
    showInvitations,
    showCRS,
}) {
    const w = Math.max(width, 280);
    const h = Math.max(height, 220);
    const isMobile = w < 768;
    const isCompact = h < 300 || w < 420;
    const isMobileLandscape = isMobile && h < 260;

    return {
        type: 'common',
        seriesField: 'color',
        width: w,
        height: h,
        padding: isMobileLandscape ? [12, 10, 22, 10] : (isMobile ? [18, 12, 42, 14] : [28, 18, 52, 22]),
        autoFit: false,
        data: [
            { id: 'id0', values: showInvitations ? chartData.id0 : [] },
            { id: 'id1', values: showCRS ? chartData.id1 : [] },
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
                        maxWidth: isMobileLandscape ? 8 : (isMobile ? 12 : 20),
                        minWidth: 2,
                    },
                },
                barWidth: isMobileLandscape ? 4 : (isMobile ? 6 : 10),
                barGap: 0.02,
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
                point: { style: { size: isCompact ? 3 : 4 } },
            },
        ],
        axes: [
            {
                orient: 'left',
                seriesIndex: [0],
                label: {
                    visible: true,
                    style: {
                        fill: '#424245',
                        fontSize: isMobileLandscape ? 10 : (isMobile ? 11 : 12),
                    },
                },
                type: 'linear',
                domainLine: { style: { stroke: '#d2d2d7' } },
                grid: { style: { lineDash: [4, 4], stroke: '#e8e8ed' } },
                title: {
                    visible: true,
                    text: 'Invitation',
                    style: {
                        fontSize: isMobileLandscape ? 11 : (isMobile ? 12 : 13),
                        fill: '#1d1d1f',
                        fontWeight: 600,
                    },
                },
            },
            {
                orient: 'right',
                seriesId: ['line'],
                grid: { visible: false },
                label: {
                    visible: true,
                    style: {
                        fill: '#424245',
                        fontSize: isMobileLandscape ? 10 : (isMobile ? 11 : 12),
                    },
                },
                domainLine: { style: { stroke: '#d2d2d7' } },
                min: (() => {
                    const lineData = chartData.id1 || [];
                    if (lineData.length === 0) return 70;
                    const values = lineData.map(item => parseInt(item.y));
                    const minValue = Math.min(...values);
                    const maxValue = Math.max(...values);
                    const range = maxValue - minValue;
                    return Math.max(70, minValue - range * 0.15);
                })(),
                max: (() => {
                    const lineData = chartData.id1 || [];
                    if (lineData.length === 0) return 1200;
                    const values = lineData.map(item => parseInt(item.y));
                    const minValue = Math.min(...values);
                    const maxValue = Math.max(...values);
                    const range = maxValue - minValue;
                    return maxValue + range * 0.15;
                })(),
                title: {
                    visible: true,
                    text: 'Score',
                    style: {
                        fontSize: isMobileLandscape ? 11 : (isMobile ? 12 : 13),
                        fill: '#1d1d1f',
                        fontWeight: 600,
                    },
                },
            },
            {
                orient: 'bottom',
                label: {
                    visible: true,
                    style: {
                        fill: '#424245',
                        fontSize: isMobileLandscape ? 9 : (isMobile ? 10 : 11),
                        angle: -45,
                        textAlign: 'end',
                    },
                    formatMethod: (text) => {
                        if (text && text.length > 10) {
                            const date = new Date(text);
                            if (!isNaN(date.getTime())) {
                                const year = date.getFullYear();
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const day = date.getDate().toString().padStart(2, '0');
                                return `${year}-${month}-${day}`;
                            }
                            return text.substring(0, 10);
                        }
                        return text;
                    },
                },
                type: 'band',
                tick: {
                    visible: true,
                    style: { stroke: '#d2d2d7', strokeWidth: 1 },
                },
                domainLine: { style: { stroke: '#d2d2d7' } },
                tickCount: isMobileLandscape ? 3 : (isMobile ? 4 : 6),
            },
        ],
        legends: {
            visible: true,
            orient: 'bottom',
            position: 'middle',
            item: {
                label: {
                    style: {
                        fill: '#1d1d1f',
                        fontSize: isMobileLandscape ? 9 : (isMobile ? 10 : 12),
                    },
                },
                shape: {
                    size: isMobileLandscape ? 6 : (isMobile ? 8 : 10),
                },
            },
            padding: isMobileLandscape ? 2 : (isMobile ? 4 : 10),
        },
    };
}

const ChartPage = ({ pageLanguage = 'en' }) => {
    const chartDomRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [chartShellRef, size] = useObservedChartSize({
        minHeight: 240,
        maxHeight: 560,
        heightRatio: 0.42,
    });

    const [chartData, setChartData] = useState({ id0: [], id1: [] });
    const [language, setLanguage] = useState(pageLanguage);
    const [timeRange, setTimeRange] = useState({
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    });
    const [showInvitations, setShowInvitations] = useState(true);
    const [showCRS, setShowCRS] = useState(true);

    useEffect(() => {
        setLanguage(pageLanguage);
    }, [pageLanguage]);

    useEffect(() => {
        const processChartData = (data) => {
            const startDate = new Date(timeRange.startDate);
            const endDate = new Date(timeRange.endDate);
            const filteredRounds = data.rounds.filter(round => {
                const roundDate = new Date(round.drawDate);
                return roundDate >= startDate && roundDate <= endDate;
            });

            const id0 = filteredRounds
                .map(round => ({
                    x: round.drawDate,
                    type: round.drawName.replace(/\(Version \d+\)/g, '').trim(),
                    y: round.drawSize.replace(',', ''),
                }))
                .sort((a, b) => new Date(a.x) - new Date(b.x));

            const id1 = filteredRounds
                .map(round => ({
                    x: round.drawDate,
                    type: round.drawName.replace(/\(Version \d+\)/g, '').trim(),
                    y: round.drawCRS.replace(',', ''),
                }))
                .sort((a, b) => new Date(a.x) - new Date(b.x));

            setChartData({ id0, id1 });
        };

        const fetchData = async () => {
            const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json');
            const data = await response.json();
            processChartData(data);
        };

        fetchData();
    }, [timeRange]);

    const spec = useMemo(
        () =>
            buildSpec({
                width: size.width || 800,
                height: size.height || 400,
                chartData,
                showInvitations,
                showCRS,
            }),
        [size.width, size.height, chartData, showInvitations, showCRS]
    );

    useEffect(() => {
        if (!chartDomRef.current || size.width < 32) return undefined;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.release();
            chartInstanceRef.current = null;
        }
        chartDomRef.current.innerHTML = '';

        const chart = new VChart(spec, { dom: chartDomRef.current });
        chart.renderSync();
        chartInstanceRef.current = chart;

        return () => {
            chartInstanceRef.current?.release();
            chartInstanceRef.current = null;
        };
    }, [spec, size.width]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setTimeRange((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (!checked && !showInvitations && !showCRS) return;
        if (name === 'invitations') setShowInvitations(checked);
        if (name === 'crsScores') setShowCRS(checked);
    };

    const t = translations[language];

    return (
        <div className="flex w-full flex-col bg-transparent px-0">
            <div className="w-full max-w-full">
                <div className="mb-6 text-center px-2 sm:px-4">
                    <div className="canada-card mx-auto inline-block w-full max-w-3xl p-4 sm:p-6">
                        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-end sm:gap-10">
                            <div className="w-full sm:flex-1">
                                <CustomDatePicker
                                    label={t.startDate}
                                    value={timeRange.startDate}
                                    onChange={(date) => handleDateChange({ target: { name: 'startDate', value: date } })}
                                    className="w-full"
                                />
                            </div>
                            <div className="hidden shrink-0 text-[#d2d2d7] sm:block sm:pb-3">→</div>
                            <div className="w-full sm:flex-1">
                                <CustomDatePicker
                                    label={t.endDate}
                                    value={timeRange.endDate}
                                    onChange={(date) => handleDateChange({ target: { name: 'endDate', value: date } })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex justify-center px-2 sm:px-4">
                    <div className="canada-card inline-flex w-full max-w-xl flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                        <label className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                            showInvitations ? 'border-[#0071e3] bg-[#f5f5f7]' : 'border-black/[0.06] bg-white hover:bg-[#fafafa]'
                        }`}>
                            <input
                                type="checkbox"
                                name="invitations"
                                checked={showInvitations}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-[#0071e3]"
                            />
                            <span className={`font-medium ${showInvitations ? 'text-[#1d1d1f]' : 'text-[#424245]'}`}>
                                {t.showInvitations}
                            </span>
                        </label>
                        <label className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                            showCRS ? 'border-[#0071e3] bg-[#f5f5f7]' : 'border-black/[0.06] bg-white hover:bg-[#fafafa]'
                        }`}>
                            <input
                                type="checkbox"
                                name="crsScores"
                                checked={showCRS}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-[#0071e3]"
                            />
                            <span className={`font-medium ${showCRS ? 'text-[#1d1d1f]' : 'text-[#424245]'}`}>
                                {t.showCRS}
                            </span>
                        </label>
                    </div>
                </div>

                <div
                    ref={chartShellRef}
                    className="apple-chart-stage canada-card mobile-landscape-container w-full overflow-hidden"
                    style={{ minHeight: size.height ? size.height : 280 }}
                >
                    <div
                        ref={chartDomRef}
                        className="mobile-landscape-chart h-full w-full"
                        style={{
                            width: '100%',
                            height: size.height || 320,
                            minHeight: 220,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartPage;
