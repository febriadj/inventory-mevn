<template>
  <div :id="$style.chartbox">
    <div :id="$style.header">
      <h3 :class="$style.title">Chart of 4 newly updated Loan data</h3>
    </div>
    <div :id="$style.chart">
      <canvas id="chart-quantity"></canvas>
      <canvas id="chart-price"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoanChartBox',
}
</script>

<style module>
#chartbox {
  background: #fff;
  padding: 20px;
}
#header {
  padding: 0 0 20px 0;
}
#chart {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
