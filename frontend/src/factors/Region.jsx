// RegionChart.jsx
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const RegionChart = ({ data }) => {
  useEffect(() => {
    // Set the dimensions of the SVG container
    const width = 800;
    const height = 600;

    // Select the existing SVG element or create a new one
    const svg = d3.select('#region-chart-container svg');

    // Set up a color scale based on the intensity values
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(data, d => d.intensity)]);

    // Draw rectangles for each region
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (width / data.length))
      .attr('y', d => height - (d.intensity * 20)) // Adjust the scale as needed
      .attr('width', width / data.length)
      .attr('height', d => d.intensity * 20)
      .attr('fill', d => colorScale(d.intensity))
      .on('mouseover', (event, d) => {
        // Handle mouseover events (e.g., show tooltip with additional information)
        console.log('Mouseover event:', d.region);
      });

    // Add labels for each region
    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.region)
      .attr('x', (d, i) => i * (width / data.length) + (width / data.length) / 2)
      .attr('y', d => height - (d.intensity * 20) - 5) // Adjust the position as needed
      .attr('text-anchor', 'middle')
      .style('font-size', '10px') // Adjust the font size as needed
      .style('fill', 'black'); // Adjust the text color as needed
  }, [data]); // Include data as a dependency to update the visualization when the data changes

  return (
    <div id="region-chart-container" style={{ height: '600px', width: '800px' }}>
      {/* Container for the D3 region chart */}
      <svg width="100%" height="100%"></svg>
    </div>
  );
};

export default RegionChart;
