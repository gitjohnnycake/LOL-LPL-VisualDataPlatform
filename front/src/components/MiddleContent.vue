<template>
  <div id="middleContent" class="h-100">
    <ul class="container fldc h-100">
      <li class="item mainbg pd-20">
        <div class="title">屠龙勇士</div>
        <div id="dragon" class="dragon"></div>
      </li>
      <li class="item mainbg pd-20">
        <div class="title">淘金专家</div>
        <div id="gold" class="gold"></div>
      </li>
      <li class="item mainbg pd-20 h-100 fldc">
        <div class="title">英雄数据轮播</div>
        <div class="heroTitle fl mg-t-20">
          <p>英雄名称</p>
          <p>出场</p>
          <p>Pick</p>
          <p>Ban</p>
          <p>胜率</p>
        </div>
        <div class="heroInfoContainer mg-t-20">
          <ul class="heroBox fldc">
            <li class="heroItem fl" v-for="(item, index) in hero" :key="index">
              <p>{{ item.name }}</p>
              <p>{{ item.appearancesFrequency }}</p>
              <p>{{ (item.averagingPick * 100).toFixed(0) }}%</p>
              <p>{{ (item.averagingBan * 100).toFixed(0) }}%</p>
              <p>{{ (item.averagingWin * 100).toFixed(0) }}%</p>
            </li>
          </ul>
          <ul class="heroItemMove"></ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getGragonTeam, getGoldTeam, getHero } from "@/api/api.js";
import * as echarts from "echarts";
import { onMounted, reactive, watch, toRefs } from "vue";
export default {
  name: "#middleContent",
  setup() {
    const state = reactive({
      hero: [],
    });
    const apiMethods = {
      getGragonTeam: getGragonTeam().then((res) => {
        let data = res.data.data;
        let chartDom = document.getElementById("dragon");
        let dragonChart = echarts.init(chartDom);
        let option;
        option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          grid: [
            {
              left: "10%",
              bottom: "10%",
              right: "10%",
            },
          ],
          toolbox: {
            feature: {
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
            iconStyle: {
              color: "#ffffff",
            },
            itemGap: 20,
          },
          legend: {
            data: ["大龙", "小龙", "场均屠龙"],
            textStyle: {
              color: "#fff",
            },
          },
          xAxis: [
            {
              type: "category",
              data: [
                data[0].teamName.replaceAll("?", ""),
                data[1].teamName.replaceAll("?", ""),
                data[2].teamName.replaceAll("?", ""),
                data[3].teamName.replaceAll("?", ""),
                data[4].teamName.replaceAll("?", ""),
                data[5].teamName.replaceAll("?", ""),
                data[6].teamName.replaceAll("?", ""),
                data[7].teamName.replaceAll("?", ""),
              ],
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          textStyle: {
            color: "#fff",
          },
          yAxis: [
            {
              type: "value",
              name: "小龙",
              axisLabel: {
                formatter: "{value} 只",
              },
            },
            {
              type: "value",
              name: "场均屠龙",
              interval: 5,
              axisLabel: {
                formatter: "{value} 只",
              },
            },
          ],
          series: [
            {
              name: "大龙",
              type: "bar",
              data: [
                (
                  Number(data[0].averagingBigDragon) *
                  Number(data[0].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[1].averagingBigDragon) *
                  Number(data[1].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[2].averagingBigDragon) *
                  Number(data[2].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[3].averagingBigDragon) *
                  Number(data[3].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[4].averagingBigDragon) *
                  Number(data[4].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[5].averagingBigDragon) *
                  Number(data[5].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[6].averagingBigDragon) *
                  Number(data[6].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[7].averagingBigDragon) *
                  Number(data[7].appearancesFrequency)
                ).toFixed(2),
              ],
            },
            {
              name: "小龙",
              type: "bar",
              data: [
                (
                  Number(data[0].averagingSmallDragon) *
                  Number(data[0].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[1].averagingSmallDragon) *
                  Number(data[1].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[2].averagingSmallDragon) *
                  Number(data[2].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[3].averagingSmallDragon) *
                  Number(data[3].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[4].averagingSmallDragon) *
                  Number(data[4].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[5].averagingSmallDragon) *
                  Number(data[5].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[6].averagingSmallDragon) *
                  Number(data[6].appearancesFrequency)
                ).toFixed(2),
                (
                  Number(data[7].averagingSmallDragon) *
                  Number(data[7].appearancesFrequency)
                ).toFixed(2),
              ],
            },
            {
              name: "场均屠龙",
              type: "line",
              yAxisIndex: 1,
              data: [
                (
                  Number(data[0].averagingSmallDragon) +
                  Number(data[0].averagingBigDragon)
                ).toFixed(2),
                (
                  Number(data[1].averagingSmallDragon) +
                  Number(data[1].averagingBigDragon)
                ).toFixed(2),
                (
                  Number(data[2].averagingSmallDragon) +
                  Number(data[2].averagingBigDragon)
                ).toFixed(2),
                (
                  Number(data[3].averagingSmallDragon) +
                  Number(data[3].averagingBigDragon)
                ).toFixed(2),
                (
                  Number(data[4].averagingSmallDragon) +
                  Number(data[4].averagingBigDragon)
                ).toFixed(2),
                (
                  Number(data[5].averagingSmallDragon) +
                  Number(data[5].averagingBigDragon)
                ).toFixed(2),
                (
                  Number(data[6].averagingSmallDragon) +
                  Number(data[6].averagingBigDragon)
                ).toFixed(2),
                (
                  Number(data[7].averagingSmallDragon) +
                  Number(data[7].averagingBigDragon)
                ).toFixed(2),
              ],
            },
          ],
        };
        option && dragonChart.setOption(option);
      }),
      getGoldTeam: getGoldTeam().then((res) => {
        let data = res.data.data;
        let chartDom = document.getElementById("gold");
        let goldChart = echarts.init(chartDom);
        let option;
        option = {
          color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            data: ["ADC", "上单", "中单", "打野", "辅助"],
            textStyle: {
              color: "#fff",
            },
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
            iconStyle: {
              color: "#ffffff",
            },
            itemGap: 20,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          textStyle: {
            color: "#fff",
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [
                data[0].teamName.replaceAll("?", ""),
                data[5].teamName.replaceAll("?", ""),
                data[10].teamName.replaceAll("?", ""),
                data[15].teamName.replaceAll("?", ""),
                data[20].teamName.replaceAll("?", ""),
                data[25].teamName.replaceAll("?", ""),
                data[30].teamName.replaceAll("?", ""),
              ],
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "ADC",
              type: "line",
              stack: "总量",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(128, 255, 165)",
                  },
                  {
                    offset: 1,
                    color: "rgba(1, 191, 236)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [
                Math.floor(Number(data[0].memberGold)),
                Math.floor(Number(data[5].memberGold)),
                Math.floor(Number(data[10].memberGold)),
                Math.floor(Number(data[15].memberGold)),
                Math.floor(Number(data[20].memberGold)),
                Math.floor(Number(data[25].memberGold)),
                Math.floor(Number(data[30].memberGold)),
              ],
            },
            {
              name: "上单",
              type: "line",
              stack: "总量",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(0, 221, 255)",
                  },
                  {
                    offset: 1,
                    color: "rgba(77, 119, 255)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [
                Math.floor(Number(data[1].memberGold)),
                Math.floor(Number(data[6].memberGold)),
                Math.floor(Number(data[11].memberGold)),
                Math.floor(Number(data[16].memberGold)),
                Math.floor(Number(data[21].memberGold)),
                Math.floor(Number(data[26].memberGold)),
                Math.floor(Number(data[31].memberGold)),
              ],
            },
            {
              name: "中单",
              type: "line",
              stack: "总量",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(55, 162, 255)",
                  },
                  {
                    offset: 1,
                    color: "rgba(116, 21, 219)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [
                Math.floor(Number(data[2].memberGold)),
                Math.floor(Number(data[7].memberGold)),
                Math.floor(Number(data[12].memberGold)),
                Math.floor(Number(data[17].memberGold)),
                Math.floor(Number(data[22].memberGold)),
                Math.floor(Number(data[27].memberGold)),
                Math.floor(Number(data[32].memberGold)),
              ],
            },
            {
              name: "打野",
              type: "line",
              stack: "总量",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255, 0, 135)",
                  },
                  {
                    offset: 1,
                    color: "rgba(135, 0, 157)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [
                Math.floor(Number(data[3].memberGold)),
                Math.floor(Number(data[8].memberGold)),
                Math.floor(Number(data[13].memberGold)),
                Math.floor(Number(data[18].memberGold)),
                Math.floor(Number(data[23].memberGold)),
                Math.floor(Number(data[28].memberGold)),
                Math.floor(Number(data[33].memberGold)),
              ],
            },
            {
              name: "辅助",
              type: "line",
              stack: "总量",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              label: {
                show: true,
                position: "top",
              },
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255, 191, 0)",
                  },
                  {
                    offset: 1,
                    color: "rgba(224, 62, 76)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [
                Math.floor(Number(data[4].memberGold)),
                Math.floor(Number(data[9].memberGold)),
                Math.floor(Number(data[14].memberGold)),
                Math.floor(Number(data[19].memberGold)),
                Math.floor(Number(data[24].memberGold)),
                Math.floor(Number(data[29].memberGold)),
                Math.floor(Number(data[34].memberGold)),
              ],
            },
          ],
        };
        option && goldChart.setOption(option);
      }),
      getHero: getHero().then((res) => {
        state.hero = res.data.data;
      }),
    };
    const move = () => {
      let heroInfoContainer = document.getElementsByClassName(
        "heroInfoContainer"
      )[0];
      let heroBox = document.getElementsByClassName("heroBox")[0];
      let heroItemMove = document.getElementsByClassName("heroItemMove")[0];
      let timeId;
      heroItemMove.innerHTML = heroBox.innerHTML;
      function play() {
        if (heroInfoContainer.scrollTop >= heroBox.offsetHeight) {
          heroInfoContainer.scrollTop = 0;
        } else {
          heroInfoContainer.scrollTop++;
        }
      }
      timeId = setInterval(play, 25);
      play();
      heroInfoContainer.onmouseover = function() {
        clearInterval(timeId);
      };
      heroInfoContainer.onmouseout = function() {
        timeId = setInterval(play, 25);
      };
    };
    watch(
      () => state.hero,
      () => {
        setTimeout(() => {
          move();
        }, 1000);
      }
    );
    onMounted(() => {
      apiMethods.getGragonTeam;
      apiMethods.getGoldTeam;
    });
    return { ...toRefs(state), move };
  },
};
</script>

<style lang="less" scoped>
#middleContent {
  margin: 0 20px;

  .item {
    margin-bottom: 20px;
    &:last-child {
      margin: 0;
    }
    .gold {
      height: 230px;
      margin-top: 20px;
    }

    .dragon {
      height: 300px;
      margin-top: 20px;
    }

    .heroTitle,
    .heroItem {
      p {
        flex: 1;
        text-align: center;
      }
    }

    .heroItem {
      margin-top: 10px;
    }

    .heroInfoContainer {
      height: 294px;
      overflow: hidden;

      .heroItemMove > li {
        display: flex;
        margin-top: 10px;
      }

      .heroBox,
      .heroItemMove {
        cursor: move;
      }
    }
  }
}
</style>
