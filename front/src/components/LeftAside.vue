<template>
  <div id="leftAside" class="h-100">
    <ul class="container fldc">
      <li class="item pd-20 mainbg">
        <div class="title" style="display: flex;justify-content: space-around;">
          <p>队伍</p>
          <p>LPL 选手</p>
        </div>
        <div class="topData fs-30">
          <div>{{ teamL }}个</div>
          <div>{{ memberL }}位</div>
        </div>
      </li>
      <li class="item pd-20 mainbg">
        <div class="title">随机选手</div>
        <div id="randMember" class="middleData"></div>
      </li>
      <li class="item pd-20 mainbg">
        <div class="title">MVP 种子选手</div>
        <div id="MVP" class="bottomData"></div>
      </li>
      <li class="item pd-20 mainbg fldc copyright" style="height: 114px">
        <div class="authorInfo">
          <a class="author" href="https://littlefish.life"
            >Copyright 2021 一隻魚</a
          >
        </div>
        <div class="authorInfo">
          <a class="bei" href="https://beian.miit.gov.cn/"
            >渝ICP备2021001631号-2</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getLength, getRandMember, getMvpMember } from "@/api/api.js";
import * as echarts from "echarts";
import { onMounted, reactive, toRefs } from "vue";
export default {
  name: "#leftAside",
  setup() {
    const state = reactive({
      timer: null,
      teamL: 0,
      memberL: 0,
    });
    const add = (speed, toValue) => {
      let num = 0;
      state.timer = setInterval(() => {
        num++;
        if (speed == 6) state.memberL = num;
        else state.teamL = num;
        if (num == toValue) clearInterval(state.timer);
      }, speed);
    };
    let apiMethods = {
      getLength: getLength().then((res) => {
        add(30, res.data.data[1][0].count);
        setTimeout(() => {
          add(6, res.data.data[0][0].count);
        }, 1000);
      }),
      getRandMember: getRandMember().then((res) => {
        let data = res.data.data;
        let chartDom = document.getElementById("randMember");
        let randChart = echarts.init(chartDom);
        let option;
        option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            textStyle: {
              color: "#ffffff",
            },
            data: ["击杀", "死亡", "助攻", "出场次数"],
          },
          grid: {
            left: "0",
            right: "5%",
            bottom: "3%",
            containLabel: true,
          },
          textStyle: {
            color: "#ffffff",
          },
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            // 选手
            data: [
              data[0].memberName,
              data[1].memberName,
              data[2].memberName,
              data[3].memberName,
              data[4].memberName,
              data[5].memberName,
              data[6].memberName,
            ],
          },
          series: [
            {
              name: "击杀",
              type: "bar",
              stack: "total",
              emphasis: {
                focus: "series",
              },
              data: [
                data[0].mkill,
                data[1].mkill,
                data[2].mkill,
                data[3].mkill,
                data[4].mkill,
                data[5].mkill,
                data[6].mkill,
              ],
            },
            {
              name: "死亡",
              type: "bar",
              stack: "total",
              emphasis: {
                focus: "series",
              },
              data: [
                data[0].death,
                data[1].death,
                data[2].death,
                data[3].death,
                data[4].death,
                data[5].death,
                data[6].death,
              ],
            },
            {
              name: "助攻",
              type: "bar",
              stack: "total",
              emphasis: {
                focus: "series",
              },
              data: [
                data[0].assists,
                data[1].assists,
                data[2].assists,
                data[3].assists,
                data[4].assists,
                data[5].assists,
                data[6].assists,
              ],
            },
            {
              name: "出场次数",
              type: "bar",
              stack: "total",
              emphasis: {
                focus: "series",
              },
              data: [
                data[0].appearancesFrequency,
                data[1].appearancesFrequency,
                data[2].appearancesFrequency,
                data[3].appearancesFrequency,
                data[4].appearancesFrequency,
                data[5].appearancesFrequency,
                data[6].appearancesFrequency,
              ],
            },
          ],
        };
        option && randChart.setOption(option);
      }),
      getMvpMember: getMvpMember().then((res) => {
        let data = res.data.data;
        let chartDom = document.getElementById("MVP");
        let mvpChart = echarts.init(chartDom);
        let option;
        option = {
          legend: {
            top: "top",
            textStyle: {
              color: "#ffffff",
            },
          },
          tooltip: {
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          label: {
            color: "#ffffff",
          },
          series: [
            {
              name: "MVP",
              type: "pie",
              radius: [10, 80],
              center: ["50%", "70%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 4,
              },
              data: [
                { value: data[0].MVPFrequency, name: data[0].memberName },
                { value: data[1].MVPFrequency, name: data[1].memberName },
                { value: data[2].MVPFrequency, name: data[2].memberName },
                { value: data[3].MVPFrequency, name: data[3].memberName },
                { value: data[4].MVPFrequency, name: data[4].memberName },
                { value: data[5].MVPFrequency, name: data[5].memberName },
              ],
            },
          ],
        };
        option && mvpChart.setOption(option);
      }),
    };
    onMounted(() => {
      apiMethods.getRandMember;
      apiMethods.getLength;
    });
    return { ...toRefs(state) };
  },
};
</script>

<style lang="less" scoped>
.container {
  .item {
    margin: 0 0 20px 0;

    &:last-child {
      margin: 0;
    }

    .topData {
      display: flex;
      margin-top: 20px;
      justify-content: space-around;
    }

    .middleData {
      height: 400px;
      margin-top: 20px;
    }

    .bottomData {
      margin-top: 20px;
      height: 250px;
    }
  }
  /* c75050 */
  .copyright {
    justify-content: flex-end;
  }
  .author {
    padding: 6px;
    background: #c54242;
    padding: 6px;
    border-radius: 8px;
    text-align: center;
  }
  .bei {
    background: #3c76e0;
    padding: 6px;
    border-radius: 8px;
    text-align: center;
    margin-top: 20px;
  }
  .authorInfo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
