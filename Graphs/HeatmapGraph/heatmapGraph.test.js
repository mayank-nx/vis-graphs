import React from 'react';
import { mount } from 'enzyme';

import { getHtml, getDataAndConfig, checkTicks, checkSvg } from '../testHelper';
import HeatmapGraph from '.';

describe("HeatmapGraph", () => {
    let config;
    beforeAll(async () => {
        config = await getDataAndConfig('HeatmapGraph');
    });

    describe("withBrush", () => {
        let withBrush, $;
        beforeAll(async () => {
            withBrush = mount(
                <HeatmapGraph
                    width={500}
                    height={500}
                    configuration={config.withBrush}
                    data={config.data}>
                </HeatmapGraph>
            );
            $ = getHtml(withBrush, '.heatmap');
        });

        it("SVG Dimensions", () => {
            const result = checkSvg(withBrush);
            expect(result).toBeTruthy();
        });

        it("Total Heatmap Block", () => {
            const newHtml = $('.heatmap').find('g').length;
            expect(newHtml).toBe(30)
        });

        it("Heatmap block configuration", () => {
            const newHtml = $('.heatmap').find('g rect').first();
            expect(parseInt(newHtml.attr('height'))).toBeCloseTo(214);
            expect(parseInt(newHtml.attr('width'))).toBeCloseTo(57);
        });

        it("xAxis Ticks Length", () => {
            const xAxisTicks = checkTicks(withBrush, '.graph-container', '.xAxis', 'g');
            expect(xAxisTicks).toBe(6);
        });

        it("yAxis Ticks Length", () => {
            const yAxisTicks = checkTicks(withBrush, '.graph-container', '.yAxis', 'g');
            expect(yAxisTicks).toBe(5);
        });

    });

    describe("withoutBrush", () => {
        let withoutBrush, $;
        beforeAll(async () => {
            withoutBrush = mount(
                <HeatmapGraph
                    width={500}
                    height={500}
                    configuration={config.withoutBrush}
                    data={config.data}>
                </HeatmapGraph>
            );
            $ = getHtml(withoutBrush, '.heatmap');
        });

        it("SVG Dimensions", () => {
            const result = checkSvg(withoutBrush);
            expect(result).toBeTruthy();
        });

        it("Total Heatmap Block", () => {
            const newHtml = $('.heatmap').find('g').length;
            expect(newHtml).toBe(30)
        });

        it("Heatmap block configuration", () => {
            const $ = getHtml(withoutBrush, '.heatmap');
            const newHtml = $('.heatmap').find('g rect').first();
            expect(parseInt(newHtml.attr('height'))).toBeGreaterThan(0);
            expect(parseInt(newHtml.attr('width'))).toBeGreaterThan(0);
        });

        it("xAxis Ticks Length", () => {
            const xAxisTicks = checkTicks(withoutBrush, '.graph-container', '.xAxis', 'g')
            expect(xAxisTicks).toBe(6);
        });

        it("yAxis Ticks Length", () => {
            const yAxisTicks = checkTicks(withoutBrush, '.graph-container', '.yAxis', 'g')
            expect(yAxisTicks).toBe(5);
        });

    });
});