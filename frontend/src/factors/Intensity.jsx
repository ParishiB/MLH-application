
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const VariableColorLineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(chartRef.current).selectAll('*').remove();

    // Assuming data is an array of numerical intensity values
    const intensities = data;

    const width = 900;
    const height = 900;

    // Define a color scale based on intensity values
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(intensities)]);

    // Create an SVG element
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create a scale for the x-axis
    const xScale = d3.scaleLinear()
      .domain([0, intensities.length - 1])
      .range([0, width]);

    // Create a scale for the y-axis
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(intensities)])
      .range([height, 0]);

    // Create a line function
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));

    // Append the line path with variable color
    svg.append('path')
      .datum(intensities)
      .attr('fill', 'none')
      .attr('stroke', d => colorScale(d)) // Use color scale for stroke color
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add circles with variable color
    svg.selectAll('circle')
      .data(intensities)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => xScale(i))
      .attr('cy', d => yScale(d))
      .attr('r', 5)
      .attr('fill', d => colorScale(d));

    // Add labels
    svg.selectAll('text')
      .data(intensities)
      .enter()
      .append('text')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d) - 5)
      .text(d => d)
      .style('fill', 'black')
      .style('font-size', '12px');
  }, [data]);

  return (
    <div className="shadow-md p-[30px]">
      <h1 className="font-bold text-3xl text-center p-[30px]">Intensity color Line Chart</h1>
       <div ref={chartRef}></div>
    </div>
 )
};

export default VariableColorLineChart;
