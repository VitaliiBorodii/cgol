import db from './db';

const generateHtml = (data) => {
  return `<!DOCTYPE html>
    <style>
    html,body,svg { height:100%; width:100%;}
    </style>
<svg width="100%" height="100%"></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script>
var data = [${data}]
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x = d3.scaleLinear()
    .rangeRound([0, width]);
var y = d3.scaleLinear()
    .rangeRound([height, 0]);
var area = d3.area()
    .x(function(d, i) { return x(i); })
    .y1(function(d) { return y(d); });
  x.domain(d3.extent(data, function(d, i) { return i; }));
  y.domain([0, d3.max(data, function(d) { return d; })]);
  area.y0(y(0));
  g.append("path")
      .datum(data)
      .attr("fill", "steelblue")
      .attr("d", area);
  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
       .attr("fill", "#000")
 //      .attr("transform", "rotate(-90)")
       .attr("x", width - 10)
       .attr("y", 15)
       .attr("dX", "0.7em")
       .attr("text-anchor", "end")
       .text("Cycles");
      ;
  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Alive cells");
</script>`;
};

export const drawChart = () => {
  const win = window.open();
  if (win) {
    db.getAll()
      .then(result => {
        const steps = result
          .map(cycle => cycle.size);
        const html = generateHtml(steps);
        win.document.write(html);
      });
  }
};