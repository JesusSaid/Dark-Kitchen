import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Charts = () => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const chartOptions = {
            layout: {
                textColor: 'black',
                background: { type: 'solid', color: 'white' },
            },
        };

        /** @type {import('lightweight-charts').IChartApi} */
        const chart = createChart(chartContainerRef.current, chartOptions);

        chart.applyOptions({
            rightPriceScale: {
                scaleMargins: {
                    top: 0.3, // leave some space for the legend
                    bottom: 0.25,
                },
            },
            crosshair: {
                // hide the horizontal crosshair line
                horzLine: {
                    visible: false,
                    labelVisible: false,
                },
                // hide the vertical crosshair label
                vertLine: {
                    labelVisible: false,
                },
            },
            // hide the grid lines
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
        });

        const series = chart.addAreaSeries({
            topColor: 'rgba( 38, 166, 154, 0.28)',
            bottomColor: 'rgba( 38, 166, 154, 0.05)',
            lineColor: 'rgba( 38, 166, 154, 1)',
            lineWidth: 2,
            crossHairMarkerVisible: false,
        });

        series.setData([
            { time: '2016-07-18', value: 98.66 },
            { time: '2016-07-25', value: 104.21 },
            { time: '2016-08-01', value: 107.48 },
            { time: '2016-08-08', value: 108.18 },
            { time: '2016-08-15', value: 109.36 },
            { time: '2016-08-22', value: 106.94 },
            { time: '2016-08-29', value: 107.73 },
            { time: '2016-09-05', value: 103.13 },
            { time: '2016-09-12', value: 114.92 },
            { time: '2016-09-19', value: 112.71 },
            { time: '2016-09-26', value: 113.05 },
            { time: '2016-10-03', value: 114.06 },
            { time: '2016-10-10', value: 117.63 },
            { time: '2016-10-17', value: 116.6 },
            { time: '2016-10-24', value: 113.72 },
            { time: '2016-10-31', value: 108.84 },
            { time: '2016-11-07', value: 108.43 },
            { time: '2016-11-14', value: 110.06 },
            { time: '2016-11-21', value: 111.79 },
            { time: '2016-11-28', value: 109.9 },
            { time: '2016-12-05', value: 113.95 },
            { time: '2016-12-12', value: 115.97 },
            { time: '2016-12-19', value: 116.52 },
            { time: '2016-12-26', value: 115.82 },
            { time: '2017-01-02', value: 117.91 },
            { time: '2017-01-09', value: 119.04 },
            { time: '2017-01-16', value: 120.0 },
            { time: '2017-01-23', value: 121.95 },
            { time: '2017-01-30', value: 129.08 },
            { time: '2017-02-06', value: 132.12 },
            { time: '2017-02-13', value: 135.72 },
            { time: '2017-02-20', value: 136.66 },
            { time: '2017-02-27', value: 139.78 },
            { time: '2017-03-06', value: 139.14 },
            { time: '2017-03-13', value: 139.99 },
            { time: '2017-03-20', value: 140.64 },
            { time: '2017-03-27', value: 143.66 },
            { time: '2017-04-03', value: 143.34 },
            { time: '2017-04-10', value: 141.05 },
            { time: '2017-04-17', value: 142.27 },
            { time: '2017-04-24', value: 143.65 },
            { time: '2017-05-01', value: 148.96 },
            { time: '2017-05-08', value: 156.1 },
            { time: '2017-05-15', value: 153.06 },
            { time: '2017-05-22', value: 153.61 },
            { time: '2017-05-29', value: 155.45 },
            { time: '2017-06-05', value: 148.98 },
            { time: '2017-06-12', value: 142.27 },
            { time: '2017-06-19', value: 146.28 },
            { time: '2017-06-26', value: 144.02 },
            { time: '2017-07-03', value: 144.18 },
            { time: '2017-07-10', value: 149.04 },
            { time: '2017-07-17', value: 150.27 },
            { time: '2017-07-24', value: 149.5 },
            { time: '2017-07-31', value: 156.39 },
            { time: '2017-08-07', value: 157.48 },
            { time: '2017-08-14', value: 157.5 },
            { time: '2017-08-21', value: 159.86 },
            { time: '2017-08-28', value: 164.05 },
            { time: '2017-09-04', value: 158.63 },
            { time: '2017-09-11', value: 159.88 },
            { time: '2017-09-18', value: 151.89 },
            { time: '2017-09-25', value: 154.12 },
            { time: '2017-10-02', value: 155.3 },
            { time: '2017-10-09', value: 156.99 },
            { time: '2017-10-16', value: 156.25 },
            { time: '2017-10-23', value: 163.05 },
            { time: '2017-10-30', value: 172.5 },
            { time: '2017-11-06', value: 174.67 },
            { time: '2017-11-13', value: 170.15 },
            { time: '2017-11-20', value: 174.97 },
            { time: '2017-11-27', value: 171.05 },
            { time: '2017-12-04', value: 169.37 },
            { time: '2017-12-11', value: 173.97 },
            { time: '2017-12-18', value: 175.01 },
            { time: '2017-12-25', value: 169.23 },
            { time: '2018-01-01', value: 175.0 },
            { time: '2018-01-08', value: 177.09 },
            { time: '2018-01-15', value: 178.46 },
            { time: '2018-01-22', value: 171.51 },
            { time: '2018-01-29', value: 160.5 },
            { time: '2018-02-05', value: 156.41 },
            { time: '2018-02-12', value: 172.43 },
            { time: '2018-02-19', value: 175.5 },
            { time: '2018-02-26', value: 176.21 },
            { time: '2018-03-05', value: 179.98 },
            { time: '2018-03-12', value: 178.02 },
            { time: '2018-03-19', value: 164.94 },
            { time: '2018-03-26', value: 167.78 },
            { time: '2018-04-02', value: 168.38 },
            { time: '2018-04-09', value: 174.73 },
            { time: '2018-04-16', value: 175.82 },
            { time: '2018-04-23', value: 162.32 },
            { time: '2018-04-30', value: 183.83 },
            { time: '2018-05-07', value: 188.59 },
            { time: '2018-05-14', value: 186.31 },
            { time: '2018-05-21', value: 188.58 },
            { time: '2018-05-28', value: 190.24 },
            { time: '2018-06-04', value: 191.7 },
            { time: '2018-06-11', value: 188.84 },
            { time: '2018-06-18', value: 184.92 },
            { time: '2018-06-25', value: 185.11 },
            { time: '2018-07-02', value: 187.97 },
            { time: '2018-07-09', value: 191.33 },
            { time: '2018-07-16', value: 191.44 },
            { time: '2018-07-23', value: 190.98 },
            { time: '2018-07-30', value: 207.99 },
            { time: '2018-08-06', value: 207.53 },
            { time: '2018-08-13', value: 217.58 },
            { time: '2018-08-20', value: 216.16 },
            { time: '2018-08-27', value: 227.63 },
            { time: '2018-09-03', value: 221.3 },
            { time: '2018-09-10', value: 223.84 },
            { time: '2018-09-17', value: 217.66 },
            { time: '2018-09-24', value: 225.74 },
            { time: '2018-10-01', value: 224.29 },
            { time: '2018-10-08', value: 222.11 },
            { time: '2018-10-15', value: 219.31 },
            { time: '2018-10-22', value: 216.3 },
            { time: '2018-10-29', value: 207.48 },
            { time: '2018-11-05', value: 204.47 },
            { time: '2018-11-12', value: 193.53 },
            { time: '2018-11-19', value: 172.29 },
            { time: '2018-11-26', value: 178.58 },
            { time: '2018-12-03', value: 168.49 },
            { time: '2018-12-10', value: 165.48 },
            { time: '2018-12-17', value: 156.23 },
            { time: '2018-12-24', value: 156.15 },
        ]);

        // Cleanup function to remove the chart when the component unmounts
        return () => chart.remove();
    }, []);

    return <div ref={chartContainerRef} style={{ width: '600px', height: '400px' }}></div>;
};

export default Charts;