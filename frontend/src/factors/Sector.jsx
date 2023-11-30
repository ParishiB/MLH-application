import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data }) => {
  const sunburstRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(sunburstRef.current).selectAll('*').remove();

    // Extracting the "sector" data from the JSON
    const sectors = data.map(item => item.sector);

    // Counting the occurrences of each sector
    const sectorCounts = sectors.reduce((acc, sector) => {
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {});

    console.log('Sectors:', sectors);
    console.log('Sector Counts:', sectorCounts);

    // Convert sectorCounts to a hierarchical data structure
    const root = d3.hierarchy({
      children: Object.entries(sectorCounts).map(([name, value]) => ({ name, value })),
    })
      .sum(d => d.value);

    // Set up dimensions and create a sunburst partition
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    // Create an arc generator
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    // Append an SVG element to the chart div
    const svg = d3.select(sunburstRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Generate the sunburst layout
    partition(root);

    // Add the sunburst segments
    svg.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr('d', arc)
      .style('fill', (d, i) => d3.schemeCategory10[i % 10]);

    // Add labels
    svg.selectAll('text')
      .data(root.descendants())
      .enter().append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => d.data.name)
      .style('text-anchor', 'middle');

  }, [data]);

  return(
  
    <div className="shadow-md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <h1 className='text-3xl p-[20px] font-bold'>Sunburst chart for Sector</h1>
  <div ref={sunburstRef}></div>
</div>

    
  ) 
};

export default SunburstChart;

