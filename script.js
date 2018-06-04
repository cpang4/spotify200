// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var format = d3.format(",");

var dates = ["5/28/2018", "5/27/2018", "5/26/2018", "5/25/2018", "5/24/2018", "5/23/2018", "5/22/2018", "5/21/2018", "5/20/2018", "5/19/2018", "5/18/2018", "5/17/2018", "5/16/2018", "5/15/2018", "5/14/2018", "5/13/2018", "5/12/2018", "5/11/2018", "5/10/2018", "5/9/2018", "5/8/2018", "5/7/2018", "5/6/2018", "5/5/2018", "5/4/2018", "5/3/2018", "5/2/2018", "5/1/2018", "4/30/2018", "4/29/2018", "4/28/2018", "4/27/2018", "4/26/2018", "4/25/2018", "4/24/2018", "4/23/2018", "4/22/2018", "4/21/2018", "4/20/2018", "4/19/2018", "4/18/2018", "4/17/2018", "4/16/2018", "4/15/2018", "4/14/2018", "4/13/2018", "4/12/2018", "4/11/2018", "4/10/2018", "4/9/2018", "4/8/2018", "4/7/2018", "4/6/2018", "4/5/2018", "4/4/2018", "4/3/2018", "4/2/2018", "4/1/2018", "3/31/2018", "3/30/2018", "3/29/2018", "3/28/2018", "3/27/2018", "3/26/2018", "3/25/2018", "3/24/2018", "3/23/2018", "3/22/2018", "3/21/2018", "3/20/2018", "3/19/2018", "3/18/2018", "3/17/2018", "3/16/2018", "3/15/2018", "3/14/2018", "3/13/2018", "3/12/2018", "3/11/2018", "3/10/2018", "3/9/2018", "3/8/2018", "3/7/2018", "3/6/2018", "3/5/2018", "3/4/2018", "3/3/2018", "3/2/2018", "3/1/2018", "2/28/2018", "2/27/2018", "2/26/2018", "2/25/2018", "2/24/2018", "2/23/2018", "2/22/2018", "2/21/2018", "2/20/2018", "2/19/2018", "2/18/2018", "2/17/2018", "2/16/2018", "2/15/2018", "2/14/2018", "2/13/2018", "2/12/2018", "2/11/2018", "2/10/2018", "2/9/2018", "2/8/2018", "2/7/2018", "2/6/2018", "2/5/2018", "2/4/2018", "2/3/2018", "2/2/2018", "2/1/2018", "1/31/2018", "1/30/2018", "1/29/2018", "1/28/2018", "1/27/2018", "1/26/2018", "1/25/2018", "1/24/2018", "1/23/2018", "1/22/2018", "1/21/2018", "1/20/2018", "1/19/2018", "1/18/2018", "1/17/2018", "1/16/2018", "1/15/2018", "1/14/2018", "1/13/2018", "1/12/2018", "1/11/2018", "1/10/2018", "1/9/2018", "1/8/2018", "1/7/2018", "1/6/2018", "1/5/2018", "1/4/2018", "1/3/2018", "1/2/2018", "1/1/2018"];
var songData = [];
var chartData = [];
var selection = dates[0];
var searchData = [];
var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var consecutive = {};

d3.queue()
  .defer(d3.csv, 'global-ID-daily-2018-dupremoved.csv')
  .defer(d3.csv, 'song-data-nodups.csv')
  .await(saveData);

// nice date display for tooltips, i.e. 1/1/2018 will be sent as Jan 1
function getDateString(date){
  var mdy = date.split('/');
  return monthNames[mdy[0]-1] + " " + mdy[1];
}

function saveData(error, data, songs){
  for (var i = 0; i < data.length; i++){
    chartData.push(data[i]);
  }
  for (var k = 0; k < songs.length; k++){
    songData.push(songs[k]);
  }
  makeChart("5/28/2018");
}

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

function makeChart(date){

    var i = 1;
    for (var index = getValsDate(date); index < getValsDate(date)+200; index++){
      d3.select("body")
      .append("table")
      .attr("class", "centeredDiv")
      .attr("id", "table" + String(i))
      .append("tr")
      .attr("id", "row" + String(i));

      d3.select("#row" + String(i)).append("td")
      .attr("class", "rank")
      .text(String(i));
      d3.select("#row" + String(i)).append("td");
      d3.select("#row" + String(i)).append("td")
      .attr("class", "collapsible");
      d3.select("#row" + String(i)).append("td")
      .attr("class", "streams");
      d3.select("body").append("div")
        .attr("class", "content")
        .attr("id", "content" + String(i));
      d3.select("#content" + String(i)).append("nav")
        .attr("id", "nav" + String(i))
        .attr("class", "nav");
      d3.select("#nav" + String(i)).append('ul')
            .selectAll('li')
            .data(["Streams", "Rankings"])
            .enter()
            .append('li')
            .attr("id", "li" + String(i))
            .style("opacity", function(d){
              if (d === "Streams") return 1;
                else return 0.4;
            })
            .on('click', function (d){
              var graphSelection = d;
              var category = "Streams";
              if (graphSelection === "Rankings"){
                category = "Position";
              }
              // get position by extracting id
              var thisID = String(d3.select(this)["_groups"][0][0].id);
              var position = thisID.substring(2,thisID.length);
              var filterSelect = d3.select("#nav" + position);

              filterSelect.selectAll("li").style("opacity", function(d){
                if (d === graphSelection) return 1;
                else return 0.4;
              })

              showViz(position, category);
            })
            .text(function (d) { return d; });
      d3.select("#content" + String(i)).append("svg")
        .attr("id", "svg" + String(i))
        .attr("width", 850)
        .attr("height", 300);

      
      document.getElementById("row" + String(i)).cells[2].innerHTML = "<b>" + chartData[index]["Track.Name"] + "</b> by " + chartData[index]["Artist"];
      document.getElementById("row" + String(i)).cells[3].innerText = format(chartData[index]["Streams"]);

      for (var f = 0; f < songData.length; f++){
        if (songData[f]["id"] == chartData[index]["ID"]){
          document.getElementById("row" + String(i)).cells[1].innerHTML = "<img src=" + songData[f]["smallImg"] + " height=\"40px\"></img>"; 
          break;
        }
      }
      i++;
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
          showViz(i+1, "Streams");
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
        document.getElementById("row" + String(count)).cells[2].innerHTML = "<b>" + chartData[j]["Track.Name"] + "</b> by " + chartData[j]["Artist"];
        document.getElementById("row" + String(count)).cells[3].innerText = format(chartData[j]["Streams"]);

        for (var f = 0; f < songData.length; f++){
          if (songData[f]["id"] == chartData[j]["ID"]){
            document.getElementById("row" + String(count)).cells[1].innerHTML = "<img src=" + songData[f]["smallImg"] + " height=\"40px\"></img>"; 
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
  } // end make chart

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

    var newData = chartData.filter(function(d){ return d["ID"] === id});

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
    var count = 0;
    var highest = 0;
    for (var date = startIndex; date >= 0; date--){
        // no data for this date
        if (newData[ndInd] == null || newData[ndInd]["Date"] != dates[date]){
            completeData.push(null);
            count = 0;
        }
        else{
            completeData.push(newData[ndInd]);
            ndInd++;
            count++;
            if (count > highest){
              highest = count;
            }
        }
    }
    consecutive[id] = highest;
    return completeData;
  }

  // show viz when displaying by day
  function showViz(index, category){

        margin = {top: 30, right: 25, bottom: 40, left: 50},
        width = 850 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


      var currSong = getValsDate(selection) + (index-1);

      var matchingID = chartData[currSong]["ID"];

      var newData = chartData.filter(function(d){ return d["ID"] === matchingID});

      var foundData;

      for (var k = 0; k < songData.length; k++){
        if (songData[k]["id"] == chartData[currSong]["ID"]){
          foundData = songData[k];
          break;
        }
      }

      var areaData = getData(matchingID, foundData);

      d3.selectAll(".svg" + String(index) + "stuff").remove();

     var svg = d3.select("#svg" + String(index))
      .attr("transform", "translate(" + margin.right + ",0)");
    
    var graph = svg.append("g")
      .attr("transform", "translate(" + (margin.right+275) + "," + margin.top + ")");

      var xWidth = width - 300;

      svg.append("foreignObject")
        .attr("class", "svg" + String(index) + "stuff")
        .attr("width",250)
        .attr("height",300)
        .attr("x", 0)
        .attr("y", 0)
        .style("font", "11px 'Fira Sans Condensed'")
        .html("<b>Artist(s):</b> " + getArtists(foundData) + "<br><b>Release Date: </b>" + foundData["releaseDate"]
          +"<br><b>Days in the Top 200: </b>" + newData.length
          +"<br><b>Highest consecutive days: </b>" + consecutive[matchingID]);
          

      svg.append("svg:image")
          .attr("class", "svg" + String(index) + "stuff")
          .attr("x", 0)
          .attr("y", 75)
          .attr("width", 200)
          .attr("height", 200)
          .attr("xlink:href", foundData["medImg"]);


      var parseTime = d3.timeParse("%m/%d/%Y");

      var x = d3.scaleTime().range([0, xWidth]);

      if (category === "Streams"){
        y = d3.scaleLinear().range([height, 0]);
      }
      else{
        y = d3.scaleLinear().range([0, height]);
      }

      var xAxis = d3.axisBottom()
          .scale(x)
          .tickFormat(d3.timeFormat("%m-%d"));

      if (category === "Streams"){
        var yAxis = d3.axisLeft()
          .scale(y)
          .tickFormat(d3.format(".2s"));
      }
      else{
        var yAxis = d3.axisLeft()
          .scale(y);
      }
      

      var startDate = "1/1/2018";
      if (parseDate("1/1/2018") < parseDate(foundData["releaseDate"])){
        startDate = foundData["releaseDate"];
      }

        x.domain([parseTime(startDate), d3.max(newData, function(d){ return parseTime(d["Date"]);})]);

        y.domain([
          d3.min(newData, function(d) { return +d[category]; }),
          d3.max(newData, function(d) { return +d[category]; })
        ]);

        graph.append("g")
          .attr("class", "svg" + String(index) + "stuff")
          .attr("transform", "translate(0," + (height) + ")")
          .call(xAxis)
          .selectAll("text")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .style("text-anchor", "end")
          .attr("transform", "rotate(-65)");

        var title = "Streams"
        if (category === "Position"){
          title = "Ranking";
        }

        graph.append("g")
            .attr("class", "svg" + String(index) + "stuff")
            .call(yAxis)
            .append("text")
            .attr("id", "title" + String(index))
            .attr("transform", "rotate(-90)")
            .attr("y", -45)
            .attr("x", -(height/2)+40)
            .attr("fill", "#000")
            .style("font-family", "Fira Sans Condensed")
            .attr("font-size", "12px")
            .attr("font-weight", "400")
            .text(title);

        var line = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(parseDate(d["Date"])); })
        .y(function(d) { return y(+d[category]); });


        var lineChunked = d3.lineChunked()
        .x(function (d) { return x(parseDate(d["Date"])); })
        .y(function (d) { return y(+d[category]); })
        .curve(d3.curveLinear)
        .defined(function (d) { return d; })
        .lineStyles({
          stroke: 'steelblue',
        });

      graph.datum(areaData)
          .attr("class", "svg" + String(index) + "stuff")
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

    graph.selectAll(".dot")
        .data(areaData.filter(function(d) { return d; }))
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 2)
        .on("mouseover", function(d){
          var xpos = d3.select(this).attr("cx") - 30;
          var ypos = d3.select(this).attr("cy") - 35;

          graph.append("rect")
                  .attr("class", "tooltip")
                  .attr("x", xpos)
                  .attr("y", ypos)
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
                  .attr("x", xpos - 20)
                  .attr("y", ypos + 3)
                  .style("font", "10px 'Fira Sans Condensed'")
                  .html("<center>" + getDateString(d["Date"]) + "<br>" + format(d[category]) + "</center>");
        })
        .on("mouseout", function(d){
          d3.selectAll(".tooltip").remove();
        });
  }

  // to handle the searches by song
  function searchSong(){

      
      var input = document.getElementById("songSearch").value;
      input = input.trim();
      input = input.toLowerCase();
      var currentSong;
      var matchingSongs = [];
        for (var i = 0; i < songData.length; i++){
          currentSong = songData[i]["name"].toLowerCase();
          if (currentSong.includes(input)){
            matchingSongs.push(songData[i]);
          }
        }

      document.getElementById("artistForm").reset();
      document.getElementById("songForm").reset();

      d3.selectAll("#dropdown").remove();
      d3.selectAll(".centeredDiv").remove();
      d3.selectAll(".content").remove();
      searchData = matchingSongs;
      makeArtistChart(input);
    }

    // to handle the searches by artist
    function searchArtist(){

      d3.select("#artistSearch")
        .attr("placeholder", "Enter artist");
      d3.select("#songSearch")
        .attr("placeholder", "Enter song");

      var input = document.getElementById("artistSearch").value;
      var cleanInput = input.trim();
      cleanInput = cleanInput.toLowerCase();
      var currentSong;
      var matchingSongs = [];
      for (var f = 0; f < songData.length; f++){
            if (songData[f]["artist1"].toLowerCase().includes(cleanInput)){
              matchingSongs.push(songData[f]);
            }
            if (songData[f]["artist2"].toLowerCase().includes(cleanInput)){
              matchingSongs.push(songData[f]);
            }
            if (songData[f]["artist3"].toLowerCase().includes(cleanInput)){
              matchingSongs.push(songData[f]);
            }
            if (songData[f]["artist4"].toLowerCase().includes(cleanInput)){
              matchingSongs.push(songData[f]);
            }
            if (songData[f]["artist5"].toLowerCase().includes(cleanInput)){
              matchingSongs.push(songData[f]);
            }
            if (songData[f]["artist6"].toLowerCase().includes(cleanInput)){
              matchingSongs.push(songData[f]);
            }
      }

      document.getElementById("artistForm").reset();
      document.getElementById("songForm").reset();

      
      d3.selectAll("#dropdown").remove();
      d3.selectAll(".centeredDiv").remove();
      d3.selectAll(".content").remove();
      searchData = matchingSongs;
      makeArtistChart(input);
    }

  function resetChart(){
    // when reset is clicked

    d3.selectAll(".centeredDiv").remove();
    d3.selectAll(".content").remove();

    selection = dates[0];
    d3.select("body")
      .append("table")
      .attr("class", "centeredDiv")
      .append("tr")
      .attr("id", "rowtop");
      d3.select("#rowtop").append("td")
      .attr("class", "rank")
      d3.select("#rowtop").append("td")
      .attr("class", "image");
      d3.select("#rowtop").append("td")
      .attr("class", "collapsible-empty");
      d3.select("#rowtop").append("td")
      .attr("class", "streams");
      document.getElementById("rowtop").cells[3].innerHTML = "<b>Streams</b>";
     makeChart(selection);
  }


  // make table without ranking
  function makeArtistChart(input){

      d3.select("body")
      .append("table")
      .attr("class", "centeredDiv")
      .append("tr")
      .attr("id", "rowtop");
      d3.select("#rowtop").append("td")
      .attr("class", "rank")
      d3.select("#rowtop").append("td")
      .attr("class", "image");
      d3.select("#rowtop").append("td")
      .attr("class", "collapsible-empty");
      var form = d3.select("#rowtop").append("td")
      .attr("class", "streams")
      .append("form");
      document.getElementById("rowtop").cells[2].innerHTML = "<b>Showing search results for: </b>" + input;

          
      form.append("input")
          .attr("type", "button")
          .attr("name", "reset")
          .attr("value", "Reset")
          .attr("onclick", "resetChart()"); 

    var index = 0;
    for (var i = 1; i <= searchData.length; i++){
      d3.select("body")
      .append("table")
      .attr("class", "centeredDiv")
      .attr("id", "table" + String(i))
      .append("tr")
      .attr("id", "row" + String(i));

      d3.select("#row" + String(i)).append("td")
      .attr("class", "rank")
      d3.select("#row" + String(i)).append("td");
      d3.select("#row" + String(i)).append("td")
      .attr("class", "collapsible");
      d3.select("#row" + String(i)).append("td")
      .attr("class", "streams");
      d3.select("body").append("div")
        .attr("class", "content")
        .attr("id", "content" + String(i));
      d3.select("#content" + String(i)).append("nav")
        .attr("id", "nav" + String(i))
        .attr("class", "nav");
      d3.select("#nav" + String(i)).append('ul')
            .selectAll('li')
            .data(["Streams", "Rankings"])
            .enter()
            .append('li')
            .attr("id", "li" + String(i))
            .style("opacity", function(d){
              if (d === "Streams") return 1;
                else return 0.4;
            })
            .on('click', function (d){
              var graphSelection = d;
              var category = "Streams";
              if (graphSelection === "Rankings"){
                category = "Position";
              }
              var thisID = String(d3.select(this)["_groups"][0][0].id);
              var position = thisID.substring(2,thisID.length);
              var filterSelect = d3.select("#nav" + position);

              filterSelect.selectAll("li").style("opacity", function(d){
                if (d === graphSelection) return 1;
                else return 0.4;
              })

              showSearchViz(position, category);
            })
            .text(function (d) { return d; });
      d3.select("#content" + String(i)).append("svg")
        .attr("id", "svg" + String(i))
        .attr("width", 850)
        .attr("height", 300);

      document.getElementById("row" + String(i)).cells[2].innerHTML = "<b>" + searchData[index]["name"];
      document.getElementById("row" + String(i)).cells[1].innerHTML = "<img src=" + searchData[index]["smallImg"] + " height=\"40px\"></img>";
      index++;
    }

    // add viz when opened
      var coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = document.getElementById("content" + String(i+1));
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          showSearchViz(i+1, "Streams");
        } 
      });

    }
  }

  // to be used when a search is done
  function showSearchViz(index, category){

      margin = {top: 30, right: 25, bottom: 40, left: 50},
      width = 850 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

      var matchingID = searchData[index-1]["id"];

      var newData = chartData.filter(function(d){ return d["ID"] === matchingID});

      var areaData = getData(matchingID, searchData[index-1]);

      d3.selectAll(".svg" + String(index) + "stuff").remove();

     var svg = d3.select("#svg" + String(index))
      .attr("transform", "translate(" + margin.right + ",0)");
    
    var graph = svg.append("g")
      .attr("transform", "translate(" + (margin.right+275) + "," + margin.top + ")");

      var xWidth = width - 300;

      svg.append("foreignObject")
        .attr("class", "svg" + String(index) + "stuff")
        .attr("width",250)
        .attr("height",300)
        .attr("x", 0)
        .attr("y", 0)
        .style("font", "11px 'Fira Sans Condensed'")
        .html("<b>Artist(s):</b> " + getArtists(searchData[index-1]) + "<br><b>Release Date: </b>" + searchData[index-1]["releaseDate"]
          +"<br><b>Days in the Top 200: </b>" + newData.length 
          +"<br><b>Highest consecutive days: </b>" + consecutive[matchingID]);

      svg.append("svg:image")
          .attr("class", "svg" + String(index) + "stuff")
          .attr("x", 0)
          .attr("y", 75)
          .attr("width", 200)
          .attr("height", 200)
          .attr("xlink:href", searchData[index-1]["medImg"]);


      var parseTime = d3.timeParse("%m/%d/%Y");

      var x = d3.scaleTime().range([0, xWidth]);

      if (category === "Streams"){
        y = d3.scaleLinear().range([height, 0]);
      }
      else{
        y = d3.scaleLinear().range([0, height]);
      }

      var xAxis = d3.axisBottom()
          .scale(x)
          .tickFormat(d3.timeFormat("%m-%d"));

      if (category === "Streams"){
        var yAxis = d3.axisLeft()
          .scale(y)
          .tickFormat(d3.format(".2s"));
      }
      else{
        var yAxis = d3.axisLeft()
          .scale(y);
      }
      

      var startDate = "1/1/2018";
      if (parseDate("1/1/2018") < parseDate(searchData[index-1]["releaseDate"])){
        startDate = searchData[index-1]["releaseDate"];
      }

        x.domain([parseTime(startDate), d3.max(newData, function(d){ return parseTime(d["Date"]);})]);

        y.domain([
          d3.min(newData, function(d) { return +d[category]; }),
          d3.max(newData, function(d) { return +d[category]; })
        ]);

        graph.append("g")
          .attr("class", "svg" + String(index) + "stuff")
          .attr("transform", "translate(0," + (height) + ")")
          .call(xAxis)
          .selectAll("text")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .style("text-anchor", "end")
          .attr("transform", "rotate(-65)");

        var title = "Streams"
        if (category === "Position"){
          title = "Ranking";
        }

        graph.append("g")
            .attr("class", "svg" + String(index) + "stuff")
            .call(yAxis)
            .append("text")
            .attr("id", "title" + String(index))
            .attr("transform", "rotate(-90)")
            .attr("y", -45)
            .attr("x", -(height/2)+40)
            .attr("fill", "#000")
            .style("font-family", "Fira Sans Condensed")
            .attr("font-size", "12px")
            .attr("font-weight", "400")
            .text(title);

        var line = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(parseDate(d["Date"])); })
        .y(function(d) { return y(+d[category]); });


        var lineChunked = d3.lineChunked()
        .x(function (d) { return x(parseDate(d["Date"])); })
        .y(function (d) { return y(+d[category]); })
        .curve(d3.curveLinear)
        .defined(function (d) { return d; })
        .lineStyles({
          stroke: 'steelblue',
        });

      graph.datum(areaData)
          .attr("class", "svg" + String(index) + "stuff")
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

    graph.selectAll(".dot")
        .data(areaData.filter(function(d) { return d; }))
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 2)
        .on("mouseover", function(d){
          var xpos = d3.select(this).attr("cx") - 30;
          var ypos = d3.select(this).attr("cy") - 35;
          graph.append("rect")
                  .attr("class", "tooltip")
                  .attr("x", xpos)
                  .attr("y", ypos)
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
                  .attr("x", xpos - 20)
                  .attr("y", ypos + 3)
                  .style("font", "10px 'Fira Sans Condensed'")
                  .html("<center>" + getDateString(d["Date"]) + "<br>" + format(d[category]) + "</center>");
        })
        .on("mouseout", function(d){
          d3.selectAll(".tooltip").remove();
        });
  }