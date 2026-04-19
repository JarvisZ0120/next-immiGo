"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import VChart from '@visactor/vchart';
import { useObservedChartSize } from '../hooks/useObservedChartSize';

const ChartPage = () => {
    const chartDomRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [shellRef, size] = useObservedChartSize({
        minHeight: 280,
        maxHeight: 640,
        heightRatio: 0.58,
    });

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('/exported_data.json')
            .then((response) => response.json())
            .then((data) => {
                setChartData(data.values);
            })
            .catch((error) => console.error('Error fetching JSON data:', error));
    }, []);

    const spec = useMemo(() => {
        if (!chartData || !chartData.length) return null;

        const data = chartData;
        const createData = () =>
            data.map((values) => ({
                data: {
                    id: 'crs',
                    values,
                },
            }));

        const specs = createData();
        const w = Math.max(size.width || 400, 280);
        const h = Math.max(size.height || 360, 260);
        const playerW = Math.min(w - 24, 720);

        const centerLabel = chartData[0]?.[0]?.drawDate ?? '';

        return {
            type: 'common',
            width: w,
            height: h,
            autoFit: false,
            padding: [16, 16, 16, 16],
            player: {
                auto: true,
                loop: true,
                interval: 300,
                width: playerW,
                position: 'middle',
                type: 'continuous',
                specs,
            },
            series: [
                {
                    type: 'pie',
                    data: specs[0].data,
                    dataKey: 'crsScore',
                    outerRadius: 0.72,
                    innerRadius: 0.22,
                    label: {
                        visible: true,
                        position: 'outside',
                        line: {
                            visible: true,
                            length: Math.min(28, w * 0.05),
                            length2: Math.min(18, w * 0.03),
                        },
                        style: {
                            fontSize: Math.max(10, Math.min(13, w / 42)),
                            fill: '#424245',
                            maxWidth: Math.min(120, w * 0.22),
                            wordWrap: true,
                        },
                    },
                    valueField: 'population',
                    seriesField: 'crsScore',
                },
            ],
            legends: {
                visible: true,
                orient: 'bottom',
                position: 'middle',
                item: {
                    label: {
                        style: {
                            fontSize: Math.max(10, Math.min(13, w / 42)),
                            fill: '#1d1d1f',
                            maxWidth: Math.min(140, w * 0.28),
                            wordWrap: true,
                        },
                    },
                },
            },
            customMark: centerLabel
                ? [
                      {
                          type: 'text',
                          position: ['50%', '50%'],
                          content: centerLabel,
                          style: {
                              fontSize: Math.max(13, Math.min(17, w / 32)),
                              fontWeight: '600',
                              fill: '#1d1d1f',
                              textAlign: 'center',
                              textBaseline: 'middle',
                          },
                      },
                  ]
                : [],
        };
    }, [chartData, size.width, size.height]);

    useEffect(() => {
        if (!chartDomRef.current || !spec || size.width < 32) return undefined;

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

    return (
        <div
            ref={shellRef}
            className="apple-chart-stage canada-card w-full"
            style={{ minHeight: size.height ? size.height : 300 }}
        >
            <div
                ref={chartDomRef}
                className="h-full w-full"
                style={{
                    width: '100%',
                    height: size.height || 360,
                    minHeight: 260,
                }}
            />
        </div>
    );
};

export default ChartPage;
