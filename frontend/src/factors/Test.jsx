
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const barChartRef = useRef(null);

  // State for selected country
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Extract the list of unique countries from the data
  const countries = Array.from(new Set(data.map(item => item.country)));

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(barChartRef.current).selectAll('*').remove();

    // Filter data based on selected country
    const filteredData = data.filter(item => !selectedCountry || item.country === selectedCountry);

    // Extracting the "topic" data from the filtered JSON
    const topics = filteredData.map(item => item.topic);

    // Counting the occurrences of each topic
    const topicCounts = topics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});

    // Set up the dimensions of the bar chart
    const width = 400;
    const height = 400;

    // Create a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Append an SVG element to the chart div
    const svg = d3.select(barChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create bars for each data point
    svg.selectAll('rect')
      .data(Object.entries(topicCounts))
      .enter()
      .append('rect')
      .attr('x', d => 0)
      .attr('y', (d, i) => i * 30)
      .attr('width', d => d[1] * 10) // Adjust bar width
      .attr('height', 25)
      .attr('fill', (d, i) => color(i))
      .on('mouseover', function() {
        d3.select(this).attr('opacity', 0.7);
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 1);
      });

    // Add labels to the bars
    svg.selectAll('text')
      .data(Object.entries(topicCounts))
      .enter()
      .append('text')
      .attr('x', d => d[1] * 10 + 5) // Adjust text position
      .attr('y', (d, i) => i * 30 + 15) // Adjust text position
      .style('font-size', '12px')
      .text(d => d[0]);

  }, [data, selectedCountry]);

  return (
    <div className='shadow-md p-6 flex flex-col items-center'>
      <h1 className="font-bold text-3xl text-center mb-4">Topic Bar Chart</h1>
      {/* Dropdown filter for selecting country */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Country:</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry || ''}
        >
          <option value="">All Countries</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Bar chart container */}
      <div ref={barChartRef}></div>
    </div>
  );
};

export default BarChart;
