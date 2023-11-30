import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const barChartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(barChartRef.current).selectAll('*').remove();

    // Extracting the "country" data from the JSON
    const countries = data.map(item => item.country);

    // Counting the occurrences of each country
    const countryCounts = countries.reduce((acc, country) => {
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    // Set up the dimensions and margin of the bar chart
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create a bar chart function
    const x = d3.scaleBand()
      .domain(Object.keys(countryCounts))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(Object.values(countryCounts))])
      .range([height, 0]);

    // Append an SVG element to the chart div
    const svg = d3.select(barChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create bars for each country
    svg.selectAll('rect')
      .data(Object.entries(countryCounts))
      .enter().append('rect')
      .style('fill', (d, i) => color(i))
      .attr('x', d => x(d[0]))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d[1]))
      .attr('height', d => height - y(d[1]));

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

  }, [data]);

  return <div ref={barChartRef}></div>;
};

export default BarChart;
