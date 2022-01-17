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


const y = d3.scaleLinear().range([HEIGHT,0]).domain([0,90])
console.log("4")
console.log(y)

const area = d3.scaleLinear().range([25*Math.PI, 1500*Math.PI]).domain([2000,1400000000])
console.log("5")
console.log(area)
 
const continentColor =d3.scaleOrdinal(d3.schemePastel1) // schemePastel1 = returns 9 colours (hexadecimal)
console.log("6")
console.log(continentColor)

// Labels

const xLable = g.append("text")
	.attr("y",HEIGHT+50)
	.attr("x",WIDTH/2)
	.attr("font-size","20px")
	.attr("text-anchor","middle")
	.attr("GDP Per Capita($)")
console.log("7")
console.log(xLable)

const yLabel = g.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -40)
	.attr("x", -170)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Life Expectancy (Years)")
console.log("8")
console.log(yLabel)


const timeLabel = g.append("text")
	.attr("y", HEIGHT - 10)
	.attr("x", WIDTH - 40)
	.attr("font-size", "40px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "middle")
	.text("1800")
console.log("9")
console.log(timeLabel)

//X Axis
const xAxisCall =d3.axisBottom(x)
	.tickValues([400,4000,40000])
	.tickFormat(d3.format("$"));
console.log("10")
console.log(xAxisCall)
g.append("g").attr("class","x axis").attr("transform",`translate(0, ${HEIGHT})`).call(xAxisCall)
console.log("10")
console.log(g)

//Y Axis
const yAxisCall = d3.axisLeft(y)
console.log("11")
console.log(yAxisCall)
g.append("g")
	.attr("class", "y axis")
	.call(yAxisCall)
console.log("12")
console.log(yAxisCall)


// pulling data
d3.json("data/data.json").then(function(data){
	// cleaning the data like empty rows or columns
	const formattedData= data.map(year=>{
		return year["countries"].filter(country => {
			const dataExists = (country.income && country.life_exp)
			//console.log("13")
			//console.log(dataExists)
			return dataExists
		}).map(country => {
			country.income = Number(country.income)
			country.life_exp = Number(country.life_exp)
			//console.log("14")
			//console.log(country)
			return country
			
		})
	})
	console.log("15")
	console.log(formattedData)

	//run the code every 0/1 second
	d3.interval(function(){
		//at the end of our data, loop back
		time = (time<214) ? time+1 : 0 //if true returns left of ":" else returns right of ":" i.e 0
		update(formattedData[time])
	}, 100)
	//first run of the visualization
	update(formattedData[0])
})


function update(data){
	// standard transition time for visualization
	const t = d3.transition().duration(350)

	//join new data with old elements.
	const circles = g.selectAll("circle").data(data,d => d.country)

	// exit old elements not present in new data
	circles.exit().remove()

	//enter new elements present in new data
	circles.enter().append('circle')
		.attr("fill",d => continentColor(d.continent))
		.merge(circles)
		.transition(t)
			.attr("cy",d =>y(d.life_exp))
			.attr("cx",d => x(d.income))
			.attr("r",d=>Math.sqrt(area(d.population)/Math.PI))

	//update the time label
	timeLabel.text(String(time+1800))
}
