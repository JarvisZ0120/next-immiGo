'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Link from 'next/link';
import Header from '/src/app/components/Header'; // 导入 Header 组件
import Footer from '/src/app/components/Footer'; // 导入 Footer 组件
import PieChart from '/src/app/crsScorePieChart/page'; // 导入 Pie chart 组件
import BarLineChart from '/src/app/crsDistributionBarLineChart/page'; // 导入 Bar line chart 组件

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    BarController,
    LineController,
    TimeScale,
    Legend,
    Title,
    Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    BarController,
    LineController,
    TimeScale,
    Legend,
    Title,
    Tooltip
);

const roundTypeColors = {
    'Provincial Nominee Program': 'rgba(54, 162, 235, 0.6)', // Blue
    'Canadian Experience Class': 'rgba(255, 99, 132, 0.8)', // Red
    'Federal Skilled Worker': 'rgba(75, 192, 192, 0.6)', // Green
    'Federal Skilled Trades': 'rgba(153, 102, 255, 0.6)', // Purple
    'No Program Specified': 'rgba(255, 159, 64, 0.6)', // Orange
    'French language proficiency': 'rgba(255, 205, 86, 0.6)', // Yellow
    'STEM occupations': 'rgba(201, 203, 207, 0.6)', // Grey
    'Healthcare occupations': 'rgba(90, 173, 97, 0.6)', // Dark Green
    'Agriculture and agri-food occupations': 'rgba(255, 105, 180, 0.6)', // Pink
    'Transport occupations': 'rgba(60, 179, 113, 0.6)', // Medium Sea Green
    'Trade occupations': 'rgba(106, 90, 205, 0.6)', // Slate Blue
};

// 语言翻译对象
const translations = {
    en: {
        dashboard: "Dashboard",
        crsOverTime: "CRS Score Distribution of Candidates Over Time",
        totalCandidates: "Total Number of Candidates Over Time",
        showInvitations: "Show Invitations",
        startDate: "Start Date",
        endDate: "End Date",
    },
    fr: {
        dashboard: "Tableau de bord",
        crsOverTime: "Distribution du score CRS des candidats au fil du temps",
        totalCandidates: "Nombre total de candidats au fil du temps",
        showInvitations: "Afficher les invitations",
        startDate: "Date de début",
        endDate: "Date de fin",
    },
    zh: {
        dashboard: "数据板",
        crsOverTime: "时间内候选人CRS分数分布",
        totalCandidates: "候选人总数随时间变化",
        showInvitations: "显示邀请",
        startDate: "开始日期",
        endDate: "结束日期",
    },
    hi: {
        dashboard: "डैशबोर्ड",
        crsOverTime: "उम्मीदवारों के समय के साथ CRS स्कोर वितरण",
        totalCandidates: "समय के साथ कुल उम्मीदवारों की संख्या",
        showInvitations: "आमंत्रण दिखाएँ",
        startDate: "शुरुआत की तारीख",
        endDate: "अंतिम तिथि",
    },
};

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [crsDistributionData, setCrsDistributionData] = useState({});
    const [totalCandidatesData, setTotalCandidatesData] = useState({});
    const [showInvitations, setShowInvitations] = useState(true);
    const [showCrsScores, setShowCrsScores] = useState(true);
    const [startDate, setStartDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    });
    const [endDate, setEndDate] = useState(new Date());
    const [crsStartDate, setCrsStartDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    });
    const [crsEndDate, setCrsEndDate] = useState(new Date());
    const [totalStartDate, setTotalStartDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    });
    const [totalEndDate, setTotalEndDate] = useState(new Date());
    const [crsDates, setCrsDates] = useState([]);
    const [currentCrsIndex, setCurrentCrsIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);
    const [language, setLanguage] = useState('en'); // 默认语言

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json'
                );
                const rounds = response.data.rounds || [];

                // Filter data for the first chart based on the specified date range
                const filteredData = rounds.filter((round) => {
                    const drawDate = new Date(round.drawDateFull);
                    return drawDate >= startDate && drawDate <= endDate;
                });

                // Group data by round type
                const groupedData = {};
                filteredData.forEach((round) => {
                    const type = (round.drawName || 'No Program Specified').replace(/\(Version \d+\)/g, '').trim();
                    if (!groupedData[type]) {
                        groupedData[type] = { invitations: [], crsScores: [], dates: [] };
                    }
                    groupedData[type].dates.push(round.drawDateFull);
                    groupedData[type].invitations.push(parseInt(round.drawSize.replace(',', '')));
                    groupedData[type].crsScores.push(parseInt(round.drawCRS));
                });

                // Sort dates with recent on the left (reverse order)
                Object.keys(groupedData).forEach((type) => {
                    const combined = groupedData[type].dates.map((date, index) => ({
                        date,
                        invitations: groupedData[type].invitations[index],
                        crsScores: groupedData[type].crsScores[index],
                    })).sort((a, b) => new Date(b.date) - new Date(a.date));

                    groupedData[type].dates = combined.map(item => item.date);
                    groupedData[type].invitations = combined.map(item => item.invitations);
                    groupedData[type].crsScores = combined.map(item => item.crsScores);
                });

                // Collect all unique dates from all types, merge them, and sort with recent on the left
                const allDates = [...new Set(Object.values(groupedData).flatMap(group => group.dates))]
                    .sort((a, b) => new Date(b) - new Date(a));

                // Function to align data with allDates, filling gaps with null to maintain line continuity
                const alignDataWithDates = (dates, data, allDates) => {
                    const dateDataMap = new Map(dates.map((date, index) => [date, data[index]]));
                    return allDates.map(date => dateDataMap.get(date) || null); // Use null to maintain continuity
                };

                // 准备对齐数据集以用于图表
                const alignedDatasets = Object.keys(groupedData).flatMap((type) => {
                    // 对齐邀请和CRS分数与所有日期
                    const alignedInvitations = alignDataWithDates(groupedData[type].dates, groupedData[type].invitations, allDates);
                    const alignedCRSScores = alignDataWithDates(groupedData[type].dates, groupedData[type].crsScores, allDates);

                    // 过滤掉为0的数据
                    const filteredInvitations = alignedInvitations.map((value, index) => value > 0 ? value : null);
                    const filteredCRSScores = alignedCRSScores.map((value, index) => value > 0 ? value : null);

                    return [
                        showInvitations && {
                            type: 'bar',
                            label: `${type}`,
                            data: filteredInvitations,
                            backgroundColor: roundTypeColors[type] || 'rgba(0, 0, 0, 0.5)',
                            yAxisID: 'y-invites',
                            barThickness: 'flex',  // 自动调整柱状图厚度
                            maxBarThickness: 200,  // 增加最大柱状图厚度
                            minBarLength: 10,      // 保证最小的柱状图长度
                            categoryPercentage: 0.7, // 稍微增加分类区域宽度，让柱子整体向右移动
                            barPercentage: 2.2,    // 保持柱子的宽度比例
                            offset: true,          // 在分类区内启用偏移，使柱子向右对齐居中
                        },
                        showCrsScores && {
                            type: 'line',
                            label: `CRS Scores (${type})`,
                            data: filteredCRSScores,
                            borderColor: roundTypeColors[type] || 'rgba(0, 0, 0, 0.5)',
                            borderWidth: 2,
                            pointRadius: 3,
                            spanGaps: true,
                            tension: 0.4,
                            yAxisID: 'y-scores',
                            datalabels: {
                                display: function(context) {
                                    return context.dataset.data[context.dataIndex] !== null; // bar和点的null不显示
                                }
                            }
                        },
                    ].filter(Boolean); // 当未选中时，移除未定义的数据集
                });

                // Set the chart data with aligned dates and datasets
                setData({
                    labels: allDates,
                    datasets: alignedDatasets,
                });

                // Filter data for the second chart based on the specified date range
                const crsFilteredData = rounds.filter((round) => {
                    const distributionDate = new Date(round.drawDistributionAsOn);
                    return distributionDate >= crsStartDate && distributionDate <= crsEndDate;
                });

                // Extract CRS Score Distribution Data for the dynamic chart
                const crsScoreRanges = ['601-1200', '501-600', '451-500', '491-500', '481-490', '471-480', '461-470',
                    '451-460', '401-450', '441-450', '431-440', '421-430', '411-420', '401-410',
                    '351-400', '301-350', '0-300'];

                const crsDistributionPerDate = crsFilteredData.map((round) => ({
                    date: round.drawDistributionAsOn,
                    values: crsScoreRanges.map((range, index) => {
                        // Only map values when index + 1 is 3 or 9, otherwise skip (return undefined)
                        if (index + 1 === 3 || index + 1 === 9) {
                            return undefined;
                        }
                        return parseInt(round[`dd${index + 1}`]?.replace(',', '') || 0); // Skip other indices
                    }).filter(value => value !== undefined), // Remove undefined values
                })).sort((a, b) => new Date(a.date) - new Date(b.date)); // Old dates on the left

                const filterCrsScoreRanges = ['601-1200', '501-600', '491-500', '481-490', '471-480', '461-470',
                    '451-460', '441-450', '431-440', '421-430', '411-420', '401-410',
                    '351-400', '301-350', '0-300'];

                setCrsDistributionData({
                    labels: filterCrsScoreRanges,
                    datasets: crsDistributionPerDate.map((distribution) => ({
                        label: distribution.date,
                        data: distribution.values,
                        backgroundColor: '#007bff',
                        borderColor: '#0056b3',
                        borderWidth: 1,
                        barPercentage: 0.8,
                    })),
                });

                setCrsDates(crsDistributionPerDate.map(distribution => distribution.date));

                // Prepare data for the third chart (Total number of candidates)
                const totalFilteredData = rounds.filter((round) => {
                    const totalDate = new Date(round.drawDistributionAsOn);
                    return totalDate >= totalStartDate && totalDate <= totalEndDate;
                });

                // Map the data and sort by date, showing the most recent on the left
                const sortedTotalCandidatesData = totalFilteredData
                    .map((round) => ({
                        date: round.drawDistributionAsOn,
                        total: parseInt(round['dd18']?.replace(',', '') || 0),
                    }))
                    .filter((item) => item.date)
                    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort dates with recent on the left (reverse order)

                // Use a Map to keep only the first occurrence of each date
                const uniqueDateMap = new Map();
                sortedTotalCandidatesData.forEach((item) => {
                    if (!uniqueDateMap.has(item.date)) {
                        uniqueDateMap.set(item.date, item.total);
                    }
                });

                // Extract the aligned dates and data, ensuring no duplicates
                const alignedTotalDates = Array.from(uniqueDateMap.keys());
                const alignedTotalData = Array.from(uniqueDateMap.values());

                // Set the state for the third chart using its own date selection
                setTotalCandidatesData({
                    labels: alignedTotalDates,
                    datasets: [
                        {
                            type: 'line',
                            label: 'Total Number of Candidates',
                            data: alignedTotalData,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [startDate, endDate, crsStartDate, crsEndDate, totalStartDate, totalEndDate, showInvitations, showCrsScores]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentCrsIndex((prevIndex) => (prevIndex + 1) % crsDates.length);
            }, 500);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, crsDates.length]);

    const handleSliderChange = (event) => {
        setCurrentCrsIndex(Number(event.target.value));
    };

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleLeftArrowClick = () => {
        if (!isPlaying && currentCrsIndex > 0) {
            setCurrentCrsIndex(prev => prev - 1);
        }
    };

    const handleRightArrowClick = () => {
        if (!isPlaying && currentCrsIndex < crsDates.length - 1) {
            setCurrentCrsIndex(prev => prev + 1);
        }
    };

    const currentTranslations = translations[language]; // 根据当前语言获取翻译

    return (
        <div className="bg-white min-h-screen flex flex-col ">
            <Header setLanguage={setLanguage} language={language} /> {/* 传递 setLanguage 和 language */}

            <main className="flex-grow min-h-full relative">
            

            <div className="relative isolate flex-grow px-6 pt-14 lg:px-14 ">
            
                <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 mt-20 sm:mt-32 lg:mt-40 mb-8 px-4">{currentTranslations.crsOverTime}</h2>

                {/* Bar&Line chart on the right */}
                <div>
                    <BarLineChart pageLanguage={language} />
                </div>


                <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 mb-6 px-4">{currentTranslations.totalCandidates}</h2>
                <div className="mt-10 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 justify-center mx-auto px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                            <span className="text-sm sm:text-base text-black font-medium">{currentTranslations.startDate}:</span>
                            <input
                                type="date"
                                value={totalStartDate.toISOString().slice(0, 10)}
                                onChange={(e) => setTotalStartDate(new Date(e.target.value))}
                                className="border rounded-md px-3 py-2 text-black text-sm sm:text-base min-w-0 sm:min-w-[150px]"
                            />
                        </label>
                        <label className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                            <span className="text-sm sm:text-base text-black font-medium">{currentTranslations.endDate}:</span>
                            <input
                                type="date"
                                value={totalEndDate.toISOString().slice(0, 10)}
                                onChange={(e) => setTotalEndDate(new Date(e.target.value))}
                                className="border rounded-md px-3 py-2 text-black text-sm sm:text-base min-w-0 sm:min-w-[150px]"
                            />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-start mb-12 mt-12 gap-8">
                    {/* Line chart on the left */}
                    <div className="w-full lg:w-1/2" style={{ transform: 'scale(1.0)' }}>
                        {totalCandidatesData.datasets && (
                            <Line
                                data={totalCandidatesData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { 
                                        legend: { 
                                            position: 'top',
                                            labels: {
                                                boxWidth: 12,
                                                fontSize: 12
                                            }
                                        } 
                                    },
                                    scales: {
                                        x: {
                                            reverse: true,
                                            title: {
                                                display: true,
                                                text: 'Date',
                                                font: {
                                                    size: 12
                                                }
                                            },
                                            ticks: {
                                                maxRotation: 45,
                                                minRotation: 45,
                                                fontSize: 10
                                            }
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: 'Total Number of Candidates',
                                                font: {
                                                    size: 12
                                                }
                                            },
                                            beginAtZero: false,
                                            ticks: {
                                                fontSize: 10
                                            }
                                        },
                                    },
                                }}
                                height={300}
                            />
                        )}
                    </div>

                    {/* Pie chart on the right */}
                    <div className="w-full lg:w-1/2">
                        <PieChart />
                    </div>

                </div>
                

                <div className="mt-8 text-center mb-8 mx-auto px-4" >
                    <a
                        href="https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 text-sm sm:text-base inline-block"
                    >
                        Calculate Your CRS Score
                    </a>
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

            </main>
            <div className="my-16 mt-10"></div>
            <Footer language={language} /> {/* 传递当前语言 */}
        </div>
    );
}