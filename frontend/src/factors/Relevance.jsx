
// RelevanceLineChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RelevanceLineChart = ({ data }) => {
  const lineChartRef = useRef(null);

  useEffect(() => {
    d3.select(lineChartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(lineChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const topics = Object.keys(data[0] || {});

    const x = d3.scaleLinear().domain([2010, 2022]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    // Create a line generator
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.relevance));

    // Draw lines for each topic
    topics.forEach((topic) => {
      svg
        .append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line.x((d) => x(d.year)).y((d) => y(d[topic])));
    });

    // Draw x-axis
    svg
      .append('g')
      .call(d3.axisBottom(x))
      .attr('transform', `translate(0,${height})`)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Draw y-axis
    svg.append('g').call(d3.axisLeft(y));

    // Add x-axis label
    svg
      .append('text')
      .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
      .style('text-anchor', 'middle')
      .text('Year');

    // Add y-axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Relevance');

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 0 - margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('text-decoration', 'underline')
      .text('Topic Relevance Over Years');
  }, [data]);

  return <div ref={lineChartRef}></div>;
};

export default RelevanceLineChart;