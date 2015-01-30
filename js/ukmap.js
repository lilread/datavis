/**
 * Created by LilRead on 30/01/2015.
 */
var width = 900;
var height = 700;

var graphics = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.mercator()
    .center([-6.4, 56.9])
    .scale(1600);

console.log(projection([0.1275, 51.5072]));


// Don't forget to change the data file name!
d3.json("data/uk.json", loadData);

function loadData(error, dataset) {
    if (error) {
        console.log(error);
    }
    else {
        drawData(dataset);
    }
}

function drawData(dataset) {
    // Draw your data
    console.log(dataset);


    var ukRegions = topojson.feature(dataset,
        dataset.objects.subunits).features;


    var path = d3.geo.path()
        .projection(projection);

    var color = d3.scale.ordinal()
        .domain(["ENG", "SCT", "WLS", "NIR"])
        .range (["#FFFF00", "#0000FF", "#FF0000", "#40FF00"]);

    graphics.selectAll("path")
        .data(ukRegions)
        .enter()
        .append("path")
        .attr("d", path);

    graphics.selectAll("subunit")
        .data(ukRegions)
        .enter()
        .append("path")
        .attr("d", path)
        .style ("opacity", "0.5")
        .style("fill", function(region){
        return color(region.id);

    });


}

function loadUserData(error, dataset) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(dataset);
        drawUserData(dataset);
    }
}

d3.json("data/usersGraph.json", function(err,dataset) {
    var nodes = dataset.nodes;
    var nodeSize = d3.scale.linear()
        .domain([1,d3.max(dataset.nodes, function(d) {return d.tweets.length})])
        .range([3, 6]);

    for (var i = 0; i< dataset.nodes.length; i++) {
        var user = dataset.nodes[i];
        var longitude = user.tweets[0].geo.coordinates[1];
        var latitude = user.tweets[0].geo.coordinates[0];
        var coordinates = [longitude, latitude];
        user.geo = coordinates;
    }

    drawUserData(dataset);
})
function drawUserData(dataset){

    graphics.selectAll(".tweet")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("class", "tweet")
        .attr("r", function(d){
            return 0.1*d.tweets.length;
        })
        .style("fill", "#FF0000")
        .style("opacity", 0.5)
        //.style("opacity", 0.5)
        .attr("transform", function(user){
            var longitude = user.tweets[0].geo.coordinates[1];
            var latitude = user.tweets[0].geo.coordinates[0];
            var coordinates = [longitude, latitude];
            console.log(projection(coordinates));
    return "translate(" + projection(coordinates) +")";
});

graphics.selectAll(".link")
    .data(dataset.links)
    .enter()
    .append("line")
    .style("stroke", "#000000")
    .style("opacity", 0.1)
    .attr("x1", function(d) {
        return projection(dataset.nodes[d.source].geo)[0];
    })
    .attr("y1", function(d) {
        return projection(dataset.nodes[d.source].geo)[1];
    })
    .attr("x2", function(d) {
        return projection(dataset.nodes[d.target].geo)[0];
    })
    .attr("y2", function(d) {
        return projection(dataset.nodes[d.target].geo)[1];
    })

}

//d3.json("data/usersGraph.json", loadUserData);