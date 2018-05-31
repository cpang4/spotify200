var format = d3.format(",");

var dates = ["5/28/2018", "5/27/2018", "5/26/2018", "5/25/2018", "5/24/2018", "5/23/2018", "5/22/2018", "5/21/2018", "5/20/2018", "5/19/2018", "5/18/2018", "5/17/2018", "5/16/2018", "5/15/2018", "5/14/2018", "5/13/2018", "5/12/2018", "5/11/2018", "5/10/2018", "5/9/2018", "5/8/2018", "5/7/2018", "5/6/2018", "5/5/2018", "5/4/2018", "5/3/2018", "5/2/2018", "5/1/2018", "4/30/2018", "4/29/2018", "4/28/2018", "4/27/2018", "4/26/2018", "4/25/2018", "4/24/2018", "4/23/2018", "4/22/2018", "4/21/2018", "4/20/2018", "4/19/2018", "4/18/2018", "4/17/2018", "4/16/2018", "4/15/2018", "4/14/2018", "4/13/2018", "4/12/2018", "4/11/2018", "4/10/2018", "4/9/2018", "4/8/2018", "4/7/2018", "4/6/2018", "4/5/2018", "4/4/2018", "4/3/2018", "4/2/2018", "4/1/2018", "3/31/2018", "3/30/2018", "3/29/2018", "3/28/2018", "3/27/2018", "3/26/2018", "3/25/2018", "3/24/2018", "3/23/2018", "3/22/2018", "3/21/2018", "3/20/2018", "3/19/2018", "3/18/2018", "3/17/2018", "3/16/2018", "3/15/2018", "3/14/2018", "3/13/2018", "3/12/2018", "3/11/2018", "3/10/2018", "3/9/2018", "3/8/2018", "3/7/2018", "3/6/2018", "3/5/2018", "3/4/2018", "3/3/2018", "3/2/2018", "3/1/2018", "2/28/2018", "2/27/2018", "2/26/2018", "2/25/2018", "2/24/2018", "2/23/2018", "2/22/2018", "2/21/2018", "2/20/2018", "2/19/2018", "2/18/2018", "2/17/2018", "2/16/2018", "2/15/2018", "2/14/2018", "2/13/2018", "2/12/2018", "2/11/2018", "2/10/2018", "2/9/2018", "2/8/2018", "2/7/2018", "2/6/2018", "2/5/2018", "2/4/2018", "2/3/2018", "2/2/2018", "2/1/2018", "1/31/2018", "1/30/2018", "1/29/2018", "1/28/2018", "1/27/2018", "1/26/2018", "1/25/2018", "1/24/2018", "1/23/2018", "1/22/2018", "1/21/2018", "1/20/2018", "1/19/2018", "1/18/2018", "1/17/2018", "1/16/2018", "1/15/2018", "1/14/2018", "1/13/2018", "1/12/2018", "1/11/2018", "1/10/2018", "1/9/2018", "1/8/2018", "1/7/2018", "1/6/2018", "1/5/2018", "1/4/2018", "1/3/2018", "1/2/2018", "1/1/2018"];

d3.queue()
  .defer(d3.csv, 'global-ID-daily-2018-dupremoved.csv')
  .defer(d3.csv, 'song-data-nodups.csv')
  .await(makeTable);

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

// earlier date first
function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((parseDate(second)-parseDate(first))/(1000*60*60*24));
}

function getValsDate(date){
  var daysBT = datediff("1/1/2018", date);
  return daysBT * 200;
}

function makeTable(error, data, songs){

		var selection = dates[0];

		var count = 1;
		for (var j = getValsDate(selection); j < getValsDate(selection)+200; j++){
			document.getElementById("row" + String(count)).cells[2].innerHTML = "<b>" + data[j]["Track.Name"] + "</b> by " + data[j]["Artist"];
			document.getElementById("row" + String(count)).cells[3].innerText = format(data[j]["Streams"]);

			for (var f = 0; f < songs.length; f++){
				if (songs[f]["id"] == data[j]["ID"]){
					document.getElementById("row" + String(count)).cells[1].innerHTML = "<img src=" + songs[f]["smallImg"] + " height=\"40px\"></img>"; 
					break;
				}
			}
			count++;
		}

		function getArtists(dataObj){
			var artists = "";
			if (dataObj["artist1"] != "NA"){
				artists += dataObj["artist1"];
			}
			if (dataObj["artist2"] != "NA"){
				artists += ", " + dataObj["artist2"];
			}
			if (dataObj["artist3"] != "NA"){
				artists += ", " + dataObj["artist3"];
			}
			if (dataObj["artist4"] != "NA"){
				artists += ", " + dataObj["artist4"];
			}
			if (dataObj["artist5"] != "NA"){
				artists += ", " + dataObj["artist5"];
			}
			if (dataObj["artist6"] != "NA"){
				artists += ", " + dataObj["artist6"];
			}
			return artists;
		}

		function getData(id, songObj){

        console.log(id);
		      var newData = data.filter(function(d){ return d["ID"] === id});
          console.log(newData);

		      var startDate = "1/1/2018";
		      if (parseDate("1/1/2018") < parseDate(songObj["releaseDate"])){
		        startDate = songObj["releaseDate"];
		      }

		      var startIndex = dates.length;
		      if (startDate != "1/1/2018"){
		        startIndex = dates.length-(datediff("1/1/2018",startDate))-1;
		      }

		      var ndInd = 0;
		      var completeData = [];
		      for (var date = startIndex; date >= 0; date--){
		        // no data for this date
		        if (newData[ndInd] == null || newData[ndInd]["Date"] != dates[date]){
		          completeData.push(null);
		        }
		        else{
		          completeData.push(newData[ndInd]);
		          ndInd++;
		        }
		      }
		      return completeData;
		    }

	function showViz(index){

		d3.selectAll(".svg" + String(index+1) + "stuff").remove();

        margin = {top: 40, right: 0, bottom: 40, left: 50},
        width = 850 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


      var currSong = getValsDate(selection) + index;

      var matchingID = data[currSong]["ID"];

      var newData = data.filter(function(d){ return d["ID"] === matchingID});

      var foundData;

      for (var k = 0; k < songs.length; k++){
        if (songs[k]["id"] == data[currSong]["ID"]){
          foundData = songs[k];
          break;
        }
      }

      var areaData = getData(matchingID, foundData);

     var svg = d3.select("#svg" + String(index+1))
    
    var graph = svg.append("g")
      .attr("transform", "translate(" + (margin.right+275) + "," + margin.top + ")");


      var xWidth = width - 300;

      svg.append("foreignObject")
        .attr("class", "svg" + String(index+1) + "stuff")
        .attr("width",250)
        .attr("height",300)
        .attr("x", 0)
        .attr("y", 0)
        .html("<b>Artist(s):</b> " + getArtists(foundData) + "<br><b>Release Date: </b>" + foundData["releaseDate"]);

      svg.append("svg:image")
          .attr("class", "svg" + String(index+1) + "stuff")
          .attr("x", 0)
          .attr("y", 60)
          .attr("width", 200)
          .attr("height", 200)
          .attr("xlink:href", foundData["medImg"]);


      var parseTime = d3.timeParse("%m/%d/%Y");

      var x = d3.scaleTime().range([0, xWidth]),
          y = d3.scaleLinear().range([height, 0]);

      var xAxis = d3.axisBottom()
          .scale(x)
          .tickFormat(d3.timeFormat("%m-%d"));

      var yAxis = d3.axisLeft()
          .scale(y)
          .tickFormat(d3.format(".2s"));

      var startDate = "1/1/2018";
      if (parseDate("1/1/2018") < parseDate(foundData["releaseDate"])){
        startDate = foundData["releaseDate"];
      }

        x.domain([parseTime(startDate), d3.max(newData, function(d){ return parseTime(d["Date"]);})]);

        y.domain([
          d3.min(newData, function(d) { return +d["Streams"]; }),
          d3.max(newData, function(d) { return +d["Streams"]; })
        ]);

        graph.append("g")
          .attr("class", "svg" + String(index+1) + "stuff")
          .attr("transform", "translate(0," + (height) + ")")
          .call(xAxis)
          .selectAll("text")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .style("text-anchor", "end")
          .attr("transform", "rotate(-65)");

        graph.append("g")
            .attr("class", "svg" + String(index+1) + "stuff")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -45)
            .attr("x", -(height/2)+40)
            .attr("fill", "#000")
            .style("font-family", "Chivo")
            .attr("font-size", "12px")
            .attr("font-weight", "400")
            .text("# of Streams");

        /*graph.append("text")
            .attr("x", 0)
            .attr("y", height/2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Number of Streams")
            .attr("transform", "rotate(-90)");*/

        var line = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(parseDate(d["Date"])); })
        .y(function(d) { return y(+d["Streams"]); });


        var lineChunked = d3.lineChunked()
        .x(function (d) { return x(parseDate(d["Date"])); })
        .y(function (d) { return y(+d["Streams"]); })
        .curve(d3.curveLinear)
        .defined(function (d) { return d; })
        .lineStyles({
          stroke: 'steelblue',
        });

      graph.datum(areaData)
          .attr("class", "svg" + String(index+1) + "stuff")
          .call(lineChunked);


        var area = d3.area()
        .defined(line.defined())
        .x(line.x())
        .y1(line.y())
        .y0(height);

        graph.append("path")
          .datum(areaData)
          .attr("class", "area")
          .attr("d", area);

      /*svg.append("path")
        .datum(areaData)
        .attr("transform", "translate(275,0)")
        .attr("class", "line")
        .attr("d", line);*/

    graph.selectAll(".dot")
        .data(areaData.filter(function(d) { return d; }))
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 2)
        .on("mouseover", function(d){
          graph.append("rect")
                  .attr("class", "tooltip")
                  .attr("x", x(parseTime(d["Date"]))-30)
                  .attr("y", y(+d["Streams"])-35)
                  .attr("width", 60)
                  .attr("height", 30)
                  .style("fill", "white")
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill-opacity", 0.9);

                graph.append("foreignObject")
                  .attr("class", "tooltip")
                  .attr("width", 100)
                  .attr("height", 30)
                  .attr("x", x(parseTime(d["Date"]))-50)
                  .attr("y", y(+d["Streams"])-32)
                  .style("font", "10px 'Arial'")
                  .html("<center><i>" + d["Date"] + "</i><br>" + format(d["Streams"]) + "</center>");
        })
        .on("mouseout", function(d){
          d3.selectAll(".tooltip").remove();
        });
	}

		var coll = document.getElementsByClassName("collapsible");
		for (let i = 0; i < coll.length; i++) {
		  coll[i].addEventListener("click", function() {
		    this.classList.toggle("active");
		    var content = document.getElementById("content" + String(i+1));
		    if (content.style.maxHeight){
		      content.style.maxHeight = null;
		    } else {
		      content.style.maxHeight = content.scrollHeight + "px";
		      showViz(i);
		    } 
		  });
		}


	var selector = d3.select("#drop")
    	.append("select")
    	.attr("id","dropdown")
    	.on("change", function(d){
        	selData = document.getElementById("dropdown");
        	selection = selData.options[selData.selectedIndex].value;
        	
        	var startInd = getValsDate(selection);
        	var j = startInd;
        	var count = 1;
        	for (j; j < startInd + 200; j++){
				document.getElementById("row" + String(count)).cells[2].innerHTML = "<b>" + data[j]["Track.Name"] + "</b> by " + data[j]["Artist"];
				document.getElementById("row" + String(count)).cells[3].innerText = format(data[j]["Streams"]);

				for (var f = 0; f < songs.length; f++){
					if (songs[f]["id"] == data[j]["ID"]){
						document.getElementById("row" + String(count)).cells[1].innerHTML = "<img src=" + songs[f]["smallImg"] + " height=\"40px\"></img>"; 
						break;
					}
				}
			count++;


			// close all opened ones when new date selected
			var coll = document.getElementsByClassName("collapsible");
			for (let i = 0; i < coll.length; i++) {
			      var content = document.getElementById("content" + String(i+1));
			      coll[i].classList.toggle("active", false);
			      content.style.maxHeight = null;
			  }
		}
    });
					

    selector.selectAll("option")
      .data(dates)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })
}