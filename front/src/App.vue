<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script>
export default {
  setup() {
    console.log(
      "%cLPL Pro by 一隻魚 %chttps://littlefish.life",
      "color: #ffffff;background: #6b9af0;padding:4px 6px;margin-top: 14px;border-top-left-radius:8px;border-bottom-left-radius:8px",
      "color: #ffffff;border: 4px solid #6b9af0;margin-top: 14px;border-top-right-radius:8px;border-bottom-right-radius:8px"
    );
  },
};
</script>
