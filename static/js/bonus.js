d3.selectAll("#selDataset").on("change", optionChanged2);


function optionChanged2(){
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    
    d3.json("./samples.json").then(function(data){
        var samples_data = data.samples
        var id_list = samples_data.map(d => d.id);


        var new_index = id_list.findIndex(function(data){
            return data === String(dataset) 
        });          
        generate_gauge(new_index);
  

    });


};

function init_gauge(){
    d3.json("./samples.json").then(function(dataset){
        var paneldata = dataset.metadata[0];
        var wfreq_data = paneldata.wfreq

        var trace = {
            type: 'pie',
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
            text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            direction: 'clockwise',
            textinfo: 'text',
            textposition: 'inside',
            marker: {
              colors: ['','','','','','','','','','white'],
              labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
              hoverinfo: 'label'
            }
          }
      
          var radius = 0.2
          var x = radius * -1 * Math.cos(Math.PI * (wfreq_data/9));
          var y = radius * Math.sin(Math.PI * (wfreq_data/9));

               
          var layout = {
            shapes: [{
              type: 'line',
              x0: 0.5,
              y0: 0.5,
              x1: x+0.5,
              y1: y+0.5,
              line: {
                color: 'red',
                width: 3
              }
            }],
            title: '<b>Bellyy Button Washing Frequency</b><br>scrub per week',
            xaxis: {visible: false, range: [-1, 1]},
            yaxis: {visible: false, range: [-1, 1]}
          };
      
          var data = [trace];
      
          Plotly.plot('gauge', data, layout);

        
       
        })};


function generate_gauge(index){
    d3.json("./samples.json").then(function(dataset){
        var paneldata = dataset.metadata[index];
        var wfreq_data = paneldata.wfreq

        var trace = {
            type: 'pie',
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
            text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            direction: 'clockwise',
            textinfo: 'text',
            textposition: 'inside',
            marker: {
              colors: ['','','','','','','','','','white'],
              labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
              hoverinfo: 'label'
            }
          }
      
          var radius = 0.2
          var x = radius * Math.cos(Math.PI *(1 - wfreq_data/9));
          var y = radius * Math.sin(Math.PI * (1 - wfreq_data/9));
      
          var new_layout = {
            shapes: [{
              type: 'line',
              x0: 0.5,
              y0: 0.5,
              x1: x+0.5,
              y1: y+0.5,
              line: {
                color: 'red',
                width: 3
              }
            }],
            title: '<b>Bellyy Button Washing Frequency<b><br/>Scrubs per Week',
            xaxis: {visible: false, range: [-1, 1]},
            yaxis: {visible: false, range: [-1, 1]}
          };
      
          var data = [trace];


          Plotly.relayout('gauge', new_layout);

        
       
        })};

init_gauge();