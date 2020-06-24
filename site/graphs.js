var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [110, 440, 3520]
  },
  options: {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Niveau sonore en dB'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Frequence en Hz'
        }
      }]
    }
  }
});


// To be called when the form is updated and on start. Displays data
function update() {
  datasets = []
  Object.keys(sets).forEach((id) => {
    console.log(document.getElementById(id).checked)
    if (document.getElementById(id).checked)
      datasets.push(sets[id])
  })
  chart.data.datasets = datasets
  chart.update()
}

update(true) // Initial update
