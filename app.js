
// Create a function to read samples
function buildMetaData(sample) {
    // Create a promise to represent potential responses
    // Use .then as a chain to pass a function to read the data
    d3.json('samples.json').then((data) => {
        // Create a container to hold all data
        var metaData = data.metadata;
        // Filter metaData for the object with the current sample number
        var array = metaData.filter(sampleObj => sampleObj.id == sample);
        var result = array[0];
        var PANEL = d3.select('#sample-metadata');
        // Use `.html("") to clear any existing metadata
        //PANEL.html("")
        Object.entries(result).forEach(([key,value]) => {
            PANEL.append("h5").text[`${key}: ${value}`];
        });
    });
}

// Create a function to build bar chart plot
function buildPlot(sample) {
    d3.json(samples.json).then((data) => {
        var bellybutton = data.samples;
        var array = bellybutton.filter(sampleObj => sampleObj.id == sample);
        var result = array[0];
        // Grab values from the response JSON to build plots
        // X value
        var otu_ids = result.otu_ids;
        // Y value
        var sample_values = result.sample_values;
        // Hover
        var otu_labels = result.otu_labels;

        var trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(), 
            type: "bar",
            orientation: "h"
        };

        var layout = {
            title: "Top Ten Bacteria Cultures Found", 
            margin: {
                l: 150, 
                t: 30,
            }
        };

         // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data, layout);
        });

// Create a function to build a bubble plot 
    // Build a Bubble Chart
    var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }]; 

    var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };

    
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
// Create a function to initialize the charts and metadata
function init() {
    // Grab a reference to drop down select element 
    var selector = d3.select('#selDataset');
    // Use the list of sample names to populate the data
    d3.json(samples.json).then((data) => {
        // Creating the options that will populate for the drop down
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                // Set text content for each sample
                .text(sample)
                // Extract the values associated with the objects
                .property("value", sample);

        });

        // Use the first sample from the list to build initial plot
        var firstSample = sameNames[0];
        buildCharts(firstSample);
        buildMetaData(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a a new sample is selected
    buildCharts(newSample);
    buildMetaData(newSample)
}

// Initialize the dashboard
init(); 





        
      
        
        