/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

d3.json("data/data.json").then(function(data){
	console.log(data);
})
// writing code here:
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg").attr("width",  WIDTH+MARGIN.LEFT + MARGIN.RIGHT).attr("height",HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
console.log("1")
console.log(g)


let time = 0
console.log("2")
console.log(time) // should be o


// scales:
const x = d3.scaleLog().base(10).range([0,WIDTH]).domain([142,150000])
console.log("3")
console.log(x)


