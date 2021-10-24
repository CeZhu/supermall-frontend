<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  height: 49px;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;

  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.1);
}

</style>
