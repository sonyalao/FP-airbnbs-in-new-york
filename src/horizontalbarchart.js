const d3 = require('d3');
var TOPLISTINGS = 5;
const colorPalette = ['#d3d3d3', '#e08984', '#bf809b', '#65c1cf', '#5374a6', '#776399'];


class HorizontalBarChart {

  constructor(propertyMap) {
    var self = this;
    var propertyMap = self.sortMapByValuesAndTopListings(propertyMap);

    console.log("keys :" + propertyMap.keys());
    console.log("values :" + propertyMap.values());

    var colors = self.generateColorArray(propertyMap.keys().length);

    var context  = $("#horizontal-bar-chart-canvas");
    var barChart = new Chart(context, {
      type: 'horizontalBar',
      data: {
        labels: propertyMap.keys(),
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: colors,
            data: propertyMap.values()
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });
    return barChart;

  }

  // Helper function to generate an array of colors for pie chart data
  generateColorArray(length) {
    var colors = [];
    while (colors.length < length) {
        do {
            var color = Math.floor((Math.random() * 1000000) + 1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    return colors;
  }  

  sortMapByValuesAndTopListings(propertyMap) {
    var arrayLabel = propertyMap.keys();
    var arrayData = propertyMap.values();

    var arrayOfObj = arrayLabel.map(function (d, i) {
      return {
        label: d,
        data: arrayData[i] || 0
      };
    });

    var sortedArrayOfObj = arrayOfObj.sort(function (a, b) {
      return b.data - a.data;
    });

    var newArrayLabel = [];
    var newArrayData = [];
    sortedArrayOfObj.forEach(function (d) {
      newArrayLabel.push(d.label);
      newArrayData.push(d.data);
    });
    var newMap = d3.map();
    for (var i = 0; i < TOPLISTINGS; i++) {
      newMap.set(newArrayLabel[i], newArrayData[i]);
    }
    return newMap;
  }


}

module.exports = HorizontalBarChart;