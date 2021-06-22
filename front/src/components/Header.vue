<template>
  <div id="head" class="h-100 fl">
    <div class="logo h-100"></div>
    <div class="name fs-30">LPL 2021夏季赛数据可视化</div>
    <div class="time fs-20">
      最后更新时间: {{updataTime}}
    </div>
  </div>
</template>

<script>
import { getDate } from '@/api/api.js';
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const state = reactive({
      updataTime: null
    })
    const date = () => {
      getDate().then(res => {
        state.updataTime = res.data.data[0].lastUpTime
      })
    }
    onMounted(() => date())
    return { ...toRefs(state) }
  }
};
</script>

<style lang="less" scoped>
#head {
  justify-content: space-between;

  .logo {
    width: 120px;
    margin-left: 40px;
    background: url(../assets/logo.png) left top no-repeat;
    background-size: 160px;
    background-position: 30% 62%;
  }

  .name {
    line-height: 80px;
    font-weight: 500;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }

  .time {
    margin-right: 40px;
    line-height: 80px;
  }
}
</style>
