import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CityLineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(chartRef.current).selectAll('*').remove();

    // Assuming data is an array of objects with time and value properties for each city
    const parseTime = d3.timeParse('%Y-%m-%d');
    
    // Format data to have time and value properties
    const formattedData = data.map(d => ({ time: parseTime(d.time), value: d.value }));

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create scales for x and y axes
    const xScale = d3.scaleTime()
      .domain(d3.extent(formattedData, d => d.time))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.value)])
      .range([height, 0]);

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.value));

    // Create SVG element with margins
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw the line
    svg.append('path')
      .data([formattedData])
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Time');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left)
      .attr('text-anchor', 'middle')
      .text('Value');

  }, [data]);

  return <div ref={chartRef}></div>;
};

export default CityLineChart;
