// Let's draw something
var body =d3.select("body");
var graphics = body.append("svg");

var width = 1000;
var height = 1000;
graphics.attr("width", width);
graphics.attr("height", height);

graphics.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("height", 600)
    .attr("width", 800)
    .style("fill", "#FFFFFF")
    .style("opacity", "1")
    .style("stroke", "#8A0868")
    .style("stroke-width","20px" )
    .attr("stroke-opacity", "1")

graphics.append("rect")
    .attr("x", 250)
    .attr("y", 250)
    .attr("height", 300)
    .attr("width", 100)
    .style("fill", "#FF0080")
    .style("stroke", "#8A0868")
    .style("stroke-width","3px" )
    .style("opacity", "0.3")

graphics.append("circle")
    .attr("r", 50)
    .attr("cx", 250)
    .attr("cy", 250)
    .style("fill", "#2E2EFE")
    .style("stroke", "#0B0B61")
    .style("stroke-width","3px" )
    .style("opacity", "1")


graphics.append("circle")
    .attr("r", 50)
    .attr("cx", 350)
    .attr("cy", 250)
    .style("fill", "#2E2EFE")
    .style("stroke", "#0B0B61")
    .style("stroke-width","3px" )
    .style("opacity", "1")

var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(60)
    .startAngle(Math.PI/2)
    .endAngle(3*Math.PI/2)

graphics.append("path")
    .attr("d", arc)
    .attr("transform", "translate(300,550)")
    .style("fill", "#DF01D7")
    .style("stroke", "#8A0868")
    .style("stroke-width","3px" )
    .style("opacity", "1")



graphics.append("text")
    .text("#willy")
    .attr ("x", 550)
    .attr ("y", 300)
    .attr ("text-anchor", "start")
    .attr("transform", "rotate(-25,550,300)")
    .style("font-size", "100")
    .style("fill", "#FF0000")

graphics.append("text")
    .text("#blueballs")
    .attr ("textanchor", "start")
    .attr("transform", "rotate(25, 550, 450)")
    .attr ("x", 350)
    .attr ("y", 450)
    .style("font-size", "100")
    .style("fill", "#2E2EFE")

function CalculateStarPoints(centerX, centerY, arms, outerRadius, innerRadius)
{
    var results = "";
    var angle = Math.PI / arms;
    for (var i = 0; i < 2 * arms; i++)
    {
        // Use outer or inner radius depending on what iteration we are in.
        var r = (i & 1) == 0 ? outerRadius : innerRadius;
        var currX = centerX + Math.cos(i * angle) * r;
        var currY = centerY + Math.sin(i * angle) * r;
        // Our first time we simply append the coordinates, subsequet times
        // we append a ", " to distinguish each coordinate pair.
        if (i == 0)
        {
            results = currX + "," + currY;
        }
        else
        {
            results += ", " + currX + "," + currY;
        }
    }

    return results;
}

d3.select("#star_svg")
    graphics.append("svg:polygon")
    .attr("id", "star_1")
    .attr("visibility", "visible")
    .attr("points", CalculateStarPoints(300, 610, 5, 20, 10))
    .style("fill", "#FFFF00")
        .style("stroke","#FE9A2E")
        .style("stroke-width", "3px")

graphics.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("height", 600)
    .attr("width", 800)
    .style("fill", "#000000")
    .style("opacity", "0.05")
    .style("stroke", "#8A0868")
    .style("stroke-width","20px" )
    .attr("stroke-opacity", "1")
