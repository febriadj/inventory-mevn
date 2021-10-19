<template>
  <div :id="$style.chartbox">
    <canvas id="chart-quantity"></canvas>
    <canvas id="chart-price"></canvas>
  </div>
</template>

<script>
export default {
  name: 'LoanChartBox',
}
</script>

<style module>
#chartbox {
  display: flex; gap: 20px;
  background: #fff;
  padding: 20px;
}
</style>
