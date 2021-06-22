<template>
  <div id="rightAside" class="h-100 fldc">
    <div
      class="mainbg pd-20 listItem"
      :class="index == 0 ? '' : 'mg-t-20'"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="title">{{ item.title }}</div>
      <ul class="list fldc">
        <li class="listTitle fl mg-t-20">
          <p v-for="(listItem, listIndex) in item.info" :key="listIndex">
            {{ listItem }}
          </p>
        </li>
        <li
          class="listInfo fl mg-t-20 rank"
          v-for="(data, dataIndex) in item.data"
          :key="dataIndex"
        >
          <p>{{ dataIndex + 1 }}</p>
          <p>{{ data.name }}</p>
          <p>{{ data.appearances }}</p>
          <p>{{ data.info }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRankList } from "@/api/api.js";
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
export default {
  name: "#rightAside",
  setup() {
    const state = reactive({
      list: []
    })
    const apiMethods = {
      getRankList: getRankList().then((res) => {
        let data = res.data.data;
        state.list = [
          {
            title: "战队胜率榜",
            info: ["排名", "战队", "出场", "胜率"],
            data: [
              {
                name: data[0][0].teamName.replaceAll("?", ""),
                appearances: data[0][0].appearancesFrequency,
                info: Number(data[0][0].averagingWin).toFixed(0) + "%",
              },
              {
                name: data[0][1].teamName.replaceAll("?", ""),
                appearances: data[0][1].appearancesFrequency,
                info: Number(data[0][1].averagingWin).toFixed(0) + "%",
              },
              {
                name: data[0][2].teamName.replaceAll("?", ""),
                appearances: data[0][2].appearancesFrequency,
                info: Number(data[0][2].averagingWin).toFixed(0) + "%",
              },
              {
                name: data[0][3].teamName.replaceAll("?", ""),
                appearances: data[0][3].appearancesFrequency,
                info: Number(data[0][3].averagingWin).toFixed(0) + "%",
              },
            ],
          },
          {
            title: "战队击杀榜",
            info: ["排名", "战队", "出场", "击杀"],
            data: [
              {
                name: data[1][0].teamName.replaceAll("?", ""),
                appearances: data[1][0].appearancesFrequency,
                info: data[1][0].tkill,
              },
              {
                name: data[1][1].teamName.replaceAll("?", ""),
                appearances: data[1][1].appearancesFrequency,
                info: data[1][1].tkill,
              },
              {
                name: data[1][2].teamName.replaceAll("?", ""),
                appearances: data[1][2].appearancesFrequency,
                info: data[1][2].tkill,
              },
              {
                name: data[1][3].teamName.replaceAll("?", ""),
                appearances: data[1][3].appearancesFrequency,
                info: data[1][3].tkill,
              },
            ],
          },
          {
            title: "个人击杀榜",
            info: ["排名", "队员", "位置", "击杀"],
            data: [
              {
                name: data[2][0].memberName,
                appearances: data[2][0].position,
                info: data[2][0].mkill,
              },
              {
                name: data[2][1].memberName,
                appearances: data[2][1].position,
                info: data[2][1].mkill,
              },
              {
                name: data[2][2].memberName,
                appearances: data[2][2].position,
                info: data[2][2].mkill,
              },
              {
                name: data[2][3].memberName,
                appearances: data[2][3].position,
                info: data[2][3].mkill,
              },
            ],
          },
          {
            title: "个人KDA榜",
            info: ["排名", "队员", "位置", "KDA"],
            data: [
              {
                name: data[3][0].memberName,
                appearances: data[3][0].position,
                info: data[3][0].KDA,
              },
              {
                name: data[3][1].memberName,
                appearances: data[3][1].position,
                info: data[3][1].KDA,
              },
              {
                name: data[3][2].memberName,
                appearances: data[3][2].position,
                info: data[3][2].KDA,
              },
              {
                name: data[3][3].memberName,
                appearances: data[3][3].position,
                info: data[3][3].KDA,
              },
            ],
          },
        ];
      }),
    };
    onMounted(() => {
      apiMethods.getRankList;
    });
    return { ...toRefs(state) };
  },
};
</script>

<style lang="less" scoped>
.listTitle {
  position: relative;
}

.listTitle,
.listInfo {
  p {
    flex: 1;
    text-align: center;
  }
}

.listTitle::after {
  content: "";
  position: absolute;
  width: 90%;
  height: 1px;
  background-color: #cbcbcb94;
  left: 5%;
  bottom: -10px;
}

.list > li:nth-child(2) > p:first-child {
  position: relative;

  &::after {
    content: "1";
    position: absolute;
    background-color: #c42c12;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.list > li:nth-child(3) > p:first-child {
  position: relative;

  &::after {
    content: "2";
    position: absolute;
    background-color: #d4b60c;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.list > li:nth-child(4) > p:first-child {
  position: relative;

  &::after {
    content: "3";
    position: absolute;
    background-color: #bb700e;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.list > li:nth-child(5) > p:first-child {
  position: relative;

  &::after {
    content: "4";
    position: absolute;
    background-color: #5f5f5f;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
