// YearChart.jsx
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const YearChart = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    // Filter data based on the selected year
    const filteredData = selectedYear
      ? data.filter(entry => entry.start_year === selectedYear)
      : data;

    // Set the dimensions of the SVG container
    const width = 800;
    const height = 400;

    // Create an SVG element and append it to the DOM
    const svg = d3.select('#year-chart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Set up scales and axes
    const xScale = d3.scaleBand()
      .domain(filteredData.map(d => d.start_year))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.intensity)])
      .range([height, 0]);

    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    // Draw bars for each entry
    svg.selectAll('rect')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.start_year))
      .attr('y', d => yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.intensity))
      .attr('fill', 'steelblue');

    // Draw x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    // Draw y-axis
    svg.append('g')
      .call(yAxis);

    // Cleanup: Remove previous SVG when the component is re-rendered
    return () => {
      svg.remove();
    };
  }, [data, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <div id="year-chart-container" style={{ height: '400px', width: '800px' }}>
        {/* Container for the D3 year chart */}
      </div>
      <div>
        <label>Select Year:</label>
        <select onChange={handleYearChange}>
          <option value="">All</option>
          {[...new Set(data.map(entry => entry.start_year))].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearChart;
