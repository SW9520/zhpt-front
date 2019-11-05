<template>
  <div>
      <div class="tip">
        <slot></slot>
      </div>
  </div>
</template>

<script>
  export default{
    
  }

</script>

<style scoped="scoped">
  .tip {
    padding: 8px 10px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
  }

</style>
