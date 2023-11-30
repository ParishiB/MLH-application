
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ data }) => {
  const bubbleChartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(bubbleChartRef.current).selectAll('*').remove();

    // Extracting the "pestle" and "relevance" data from the JSON
    const pestles = data.map(item => item.pestle);
    const relevanceValues = data.map(item => item.relevance);

    // Create an array of objects with pestle and relevance properties
    const bubbleData = pestles.map((pestle, index) => ({
      pestle,
      relevance: relevanceValues[index],
    }));

    // Set up dimensions
    const width = 900;
    const height = 600;

    // Create a scale for the circle radius based on relevance values
    const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(relevanceValues)])
      .range([5, 30]); // Adjust the range based on your preference

    // Create an SVG element
    const svg = d3.select(bubbleChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create a color scale for the pestles
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create circles for each data point
    svg.selectAll('circle')
      .data(bubbleData)
      .enter().append('circle')
      .attr('cx', d => Math.random() * width) // Random x-position for demonstration
      .attr('cy', d => Math.random() * height) // Random y-position for demonstration
      .attr('r', d => radiusScale(d.relevance))
      .style('fill', d => colorScale(d.pestle));

    // Add legend
    const legend = svg.selectAll('.legend')
      .data(colorScale.domain())
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${width * 0.8},${i * 20})`);

    legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', colorScale);

    legend.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d => d);

  }, [data]);

  return (
    <div className="p-[40px] shadow-md">
      <h1 className="text-center font-bold text-3xl p-[30px]">Bubble chart for PESTLE</h1>
      <div ref={bubbleChartRef}></div>
    </div>
  )
};

export default BubbleChart;
