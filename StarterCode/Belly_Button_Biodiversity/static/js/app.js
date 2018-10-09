function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  d3.json("/metadata/"+sample).then((metadata) =>{
      console.log(metadata) 
  
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").html("")

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(metadata).forEach(([key, value]) => {
      console.log(key +" "+ value)

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
    // BONUS: Build the Gauge Chart
    buildGauge(metadata.WFREQ);
  })   
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("/samples/"+sample).then((samplesdata) =>{
    console.log(samplesdata) 
    var trace1 = {

      x: samplesdata.otu_ids.labels,
      y: samplesdata.sample_values,
      mode: 'markers',
      text: samplesdata.otu_ids,
      marker: {
        color: samplesdata.otu_ids,
        size: samplesdata.sample_values
      }
    }
    var data = [trace1];

    var layout = {
      title: 'Belly Button Biodiversity Bubble Chart',
    };
  

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bubble", data, layout);



  var trace2 = {
    
    labels: samplesdata.otu_ids.slice(0,10),
    values: samplesdata.sample_values.slice(0,10),
    type: 'pie',
    text: samplesdata.otu_ids,
    // marker: {
    //   color: samplesdata.otu_ids,
    //   size: samplesdata.sample_values
    // }
  }
  var data = [trace2];

  var layout = {
    title: 'Belly Button Biodiversity Pie Chart',
  };


// Render the plot to the div tag with id "plot"
Plotly.newPlot("pie", data, layout);




})




    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).








}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
