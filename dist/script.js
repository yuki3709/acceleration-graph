const chartCanvas = document.getElementById("chart");

const length = 100;
const type = 'line';
const labels = Array(length).fill('');
let dataList = Array(length).fill({x: 0, y: 0, z: 0, a: 0, b: 0, c: 0});
let legendsList = Array(6).fill(false);
const range = 15;
const options = {
  options: {
    onClick: function(e, legendItem) {
      alert("test");	  
      var index = legendItem.datasetIndex;
      legendsList[0] = true;	
      legendsList[index] = !legendsList[index];
      var ci = this.chart;
      var meta = ci.getDatasetMeta(index);

      // controller.isDatasetVisibleのコメントを参照して下さい。
      meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;

      // データセットを非表示にしました。チャートを再表示してください。
      ci.update();
    }	
  },
  scales: {
    yAxes: [{
      ticks: {
        max: range,
        min: -range,
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  },
  animation: false
};

const colors = {
    x: "rgba(255,0,0,1)", y: "rgba(0,255,0,1)", z: "rgba(0,0,255,1)",
    a: "rgba(255,255,0,1)", b: "rgba(0,255,255,1)", c: "rgba(255,0,255,1)"
};

const app = new Vue({
  el: '#app',
  data: {
    x: 0,
    y: 0,
    z: 0,
    a: 0,
    b: 0,
    c: 0
  }
});
const updateView = props => Object.entries(props).forEach(([key, value]) => app[key] = value);
const createDatasets = dataList => ['x', 'y', 'z', 'a', 'b', 'c'].map(label => ({
  label,
  data: dataList.map(data => data[label]).slice(-length),
  borderColor: colors[label],
  pointRadius: 0
}));
const chart = new Chart(chartCanvas, {type, data: {labels, datasets: createDatasets(dataList)}, options});
const updateChart = () => {
　chart.data.datasets = createDatasets(dataList);
  for(var i=0;i<6;i++){
    chart.getDatasetMeta(i).hidden = legendsList[i];
  }
  chart.update();
};
