// Get json data to add the options
d3.json("../../samples.json").then(function(data){
    var options = data.names
    options.forEach(function(name){
                d3.select("select")
                .append("option")
                .text(String(name))
                .attr("value", String(name));})}); 
                

// when option is changed, call optionChanged 
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(){
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    
    d3.json("../../samples.json").then(function(data){
        var samples_data = data.samples
        var id_list = samples_data.map(d => d.id);


        var new_index = id_list.findIndex(function(data){
            return data === String(dataset) 
        });          
        bar_create(new_index);
        bubble_create(new_index);
        generate_metadata(new_index);
      

    });


};


// Function to create bar chart
 function bar_create(index) {
    d3.json("../../samples.json").then(function(dataset) {

     var id_sample =  dataset.samples[index]
     var sort_list = [];
     var x_list = [];
     var y_list = [];
     var label_list = [];


// to sort values by sample_values
    for (var j = 0; j < id_sample.sample_values.length; j++) 
        sort_list.push({'sample_values': id_sample.sample_values[j], 'otu_ids': "OTU" + String(id_sample.otu_ids[j]), 'otu_labels':String(id_sample.otu_labels[j])});
    

    sort_list.sort(function(a, b) { 
        return ((b.sample_values - a.sample_values));
        });

    if (id_sample.sample_values.length >= 10){

    for (var k = 0; k < 10; k++) {
        x_list.push(sort_list[k].sample_values);
        y_list.push(sort_list[k].otu_ids);
        label_list.push(sort_list[k].otu_lables);



     };
    };

// If the data lenght is less than 10, show not top ten but everything
     if (id_sample.sample_values.length < 10){

        for (var k = 0; k <id_sample.sample_values.length ; k++) {
            x_list.push(sort_list[k].sample_values);
            y_list.push(sort_list[k].otu_ids);
            label_list.push(sort_list[k].otu_lables);
    
         };
    };

        var x_value = x_list;
        var y_value = y_list;

        var data = [{
        type: 'bar',
        x: x_value,
        y: y_value,
        text: label_list, 
        orientation: 'h'
      }];

      var layout = {
       yaxis:{
            autorange:'reversed'
        }
    }
      
      Plotly.newPlot('bar', data, layout)})};

function bubble_create(index) {
        d3.json("../../samples.json").then(function(dataset) {
    
        var id_sample =  dataset.samples[index]
        var x_value = id_sample.otu_ids
        var y_value = id_sample.sample_values
        var marker_size = id_sample.sample_values
        var marker_color = id_sample.otu_ids
        var trace1 = {
            x: x_value,
            y: y_value,
            mode: 'markers',
            marker: {
              color: marker_color,
              size: marker_size
            }
          };
          
          var data = [trace1];

          var layout = {
          
            xaxis: {
              title: {
                text: 'OTU ID',
         
            }}};
          
          Plotly.newPlot('bubble', data, layout)})};


function generate_metadata(index){
    d3.json("../../samples.json").then(function(dataset){
       var paneldata = dataset.metadata[index];
     d3.select("#sample-metadata")
       .html(`id: ${paneldata.id}<br/>ethnicity: ${paneldata.ethnicity}<br/>gendar: ${paneldata.gendar}<br/>age: ${paneldata.age}<br/>location: ${paneldata.location}<br/>bbtype: ${paneldata.bbtype}<br/>wfreq: ${paneldata.wfreq}<br/>`)
          })};




function init(){
    bar_create(0);
    bubble_create(0);
    generate_metadata(0);
};

init();