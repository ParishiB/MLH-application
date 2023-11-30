import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HistogramChart = ({ data }) => {
  const histogramRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(histogramRef.current).selectAll('*').remove();

    // Extracting the "intensity" data from the JSON
    const intensities = data.map(item => item.intensity);

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create an SVG element
    const svg = d3.select(histogramRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create a histogram function
    const histogram = d3.histogram()
      .value(d => d)
      .domain(d3.extent(intensities))
      .thresholds(d3.range(0, 1.1, 0.1)); // Adjust the range and step as needed

    // Generate histogram data
    const bins = histogram(intensities);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height, 0]);

    // Create bars for the histogram
    svg.selectAll('rect')
      .data(bins)
      .enter().append('rect')
      .attr('x', d => xScale(d.x0))
      .attr('y', d => yScale(d.length))
      .attr('width', d => xScale(d.x1) - xScale(d.x0))
      .attr('height', d => height - yScale(d.length))
      .style('fill', '#69b3a2');

    // Create x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Create y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

  }, [data]);

  return <div ref={histogramRef}></div>;
};

export default HistogramChart;
