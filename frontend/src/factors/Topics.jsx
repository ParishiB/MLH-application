
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const pieChartRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(pieChartRef.current).selectAll('*').remove();
    d3.select(legendRef.current).selectAll('*').remove();

    // Extracting the "topic" data from the JSON
    const topics = data.map(item => item.topic);

    // Counting the occurrences of each topic
    const topicCounts = topics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});

    // Set up the dimensions and radius of the pie chart
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Create a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create a pie chart function
    const pie = d3.pie().value(d => d.value);

    // Convert topicCounts to an array of objects with label and value properties
    const pieData = Object.entries(topicCounts).map(([label, value]) => ({ label, value }));

    // Append an SVG element to the chart div
    const svg = d3.select(pieChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create arcs for each data point
    const arcs = svg.selectAll('arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Draw the pie chart
    arcs.append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
      .attr('fill', d => color(d.data.label));

    // Create color legend
    const legend = d3.select(legendRef.current)
      .append('svg')
      .attr('width', 120)
      .attr('height', Object.keys(topicCounts).length * 20)
      .selectAll('legend')
      .data(Object.keys(topicCounts))
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', d => color(d));

    legend.append('text')
      .attr('x', 25)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d => d);
  }, [data]);

  return (
<div className='shadow-md p-[30px]'>
  <h1 className="font-bold text-3xl text-center">Topics Pie Chart</h1>
  <div className="grid grid-cols-[80%_auto] rounded-md">
    <div className="flex justify-center items-center">
      <div ref={pieChartRef}></div>
      <div className="ml-20"> 
        <div ref={legendRef}></div>
      </div>
    </div>
  </div>
</div>


  );
};

export default PieChart;
