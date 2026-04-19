"use client";
import { useEffect, useRef, useState, useMemo } from 'react';
import VChart from '@visactor/vchart';
import CustomDatePicker from '../components/CustomDatePicker';
import { useObservedChartSize } from '../hooks/useObservedChartSize';

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
    },
};

function buildSpec({ width, height, chartData }) {
    const w = Math.max(width, 280);
    const h = Math.max(height, 220);
    const isMobile = w < 768;
    const isMobileLandscape = isMobile && h < 260;

    const dates = chartData?.dates || [];
    const totals = chartData?.totals || [];

    return {
        type: 'common',
        width: w,
        height: h,
        padding: isMobileLandscape ? [12, 10, 22, 10] : (isMobile ? [18, 12, 42, 14] : [28, 18, 52, 22]),
        autoFit: false,
        data: [
            {
                id: 'totalCandidates',
                values: dates.map((date, index) => ({
                    date,
                    total: totals[index],
                })),
            },
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
                        fill: '#0071e3',
                        stroke: '#0071e3',
                        strokeWidth: 2,
                    },
                },
                line: {
                    style: {
                        stroke: '#0071e3',
                        strokeWidth: isMobileLandscape ? 2 : 3,
                    },
                },
            },
        ],
        axes: [
            {
                orient: 'left',
                label: {
                    visible: true,
                    style: {
                        fill: '#424245',
                        fontSize: isMobileLandscape ? 10 : (isMobile ? 11 : 12),
                    },
                },
                domainLine: { style: { stroke: '#d2d2d7' } },
                grid: { style: { lineDash: [4, 4], stroke: '#e8e8ed' } },
                title: {
                    visible: true,
                    text: 'Total Number of Candidates',
                    style: {
                        fontSize: isMobileLandscape ? 11 : (isMobile ? 12 : 13),
                        fill: '#1d1d1f',
                        fontWeight: 600,
                    },
                },
                min: (() => {
                    const dataValues = totals || [];
                    if (dataValues.length === 0) return 0;
                    const minValue = Math.min(...dataValues);
                    const maxValue = Math.max(...dataValues);
                    const range = maxValue - minValue;
                    return Math.max(0, minValue - range * 0.2);
                })(),
                max: (() => {
                    const dataValues = totals || [];
                    if (dataValues.length === 0) return 100000;
                    const minValue = Math.min(...dataValues);
                    const maxValue = Math.max(...dataValues);
                    const range = maxValue - minValue;
                    return maxValue + range * 0.2;
                })(),
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
        legends: { visible: false },
    };
}

const TotalPopulationLineChart = ({ pageLanguage = 'en' }) => {
    const chartDomRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [chartShellRef, size] = useObservedChartSize({
        minHeight: 240,
        maxHeight: 560,
        heightRatio: 0.42,
    });

    const [chartData, setChartData] = useState(null);
    const [language, setLanguage] = useState(pageLanguage);
    const [timeRange, setTimeRange] = useState({
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        setLanguage(pageLanguage);
    }, [pageLanguage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json');
                const data = await response.json();
                const rounds = data.rounds || [];

                const filteredData = rounds.filter((round) => {
                    const distributionDate = new Date(round.drawDistributionAsOn);
                    const startDate = new Date(timeRange.startDate);
                    const endDate = new Date(timeRange.endDate);
                    return distributionDate >= startDate && distributionDate <= endDate;
                });

                const sortedData = filteredData
                    .map((round) => ({
                        date: round.drawDistributionAsOn,
                        total: parseInt(round['dd18']?.replace(',', '') || 0),
                    }))
                    .filter((item) => item.date)
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                const uniqueDateMap = new Map();
                sortedData.forEach((item) => {
                    if (!uniqueDateMap.has(item.date)) {
                        uniqueDateMap.set(item.date, item.total);
                    }
                });

                const alignedDates = Array.from(uniqueDateMap.keys());
                const alignedData = Array.from(uniqueDateMap.values());

                setChartData({
                    dates: alignedDates,
                    totals: alignedData,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [timeRange]);

    const spec = useMemo(
        () =>
            buildSpec({
                width: size.width || 800,
                height: size.height || 400,
                chartData: chartData || { dates: [], totals: [] },
            }),
        [size.width, size.height, chartData],
    );

    useEffect(() => {
        if (!chartDomRef.current || size.width < 32 || !chartData?.dates?.length) return undefined;

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
    }, [spec, size.width, chartData]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setTimeRange((prev) => ({ ...prev, [name]: value }));
    };

    const t = translations[language];

    return (
        <div className="flex w-full flex-col bg-transparent px-0">
            <div className="w-full max-w-full">
                <h2 className="mb-6 bg-gradient-to-r from-[#1a1523] via-[#0d9488] to-[#2563eb] bg-clip-text px-4 text-center text-xl font-bold tracking-tight text-transparent sm:text-2xl lg:text-[28px]">
                    {t.totalCandidates}
                </h2>

                <div className="relative z-40 mb-6 px-2 text-center sm:px-4">
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

                <div
                    ref={chartShellRef}
                    className="apple-chart-stage canada-card mobile-landscape-container relative z-10 w-full overflow-hidden"
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

export default TotalPopulationLineChart;
