import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HorizontalBarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(chartRef.current).selectAll('*').remove();

    // Assuming data is an object with likelihood counts, for example: { 'High': 5, 'Medium': 10, 'Low': 3 }
    const labels = Object.keys(data);
    const counts = Object.values(data);

    const width = 400;
    const height = 200;

    // Create an SVG element
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create a scale for the x-axis
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(counts)])
      .range([0, width]);

    // Create horizontal bars
    svg.selectAll('rect')
      .data(counts)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 30)
      .attr('width', d => xScale(d))
      .attr('height', 20)
      .attr('fill', 'steelblue');

    // Add labels
    svg.selectAll('text')
      .data(labels)
      .enter()
      .append('text')
      .attr('x', 5) // Adjust the positioning as needed
      .attr('y', (d, i) => i * 30 + 15)
      .text(d => d)
      .style('fill', 'white')
      .style('font-size', '12px');
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default HorizontalBarChart;
