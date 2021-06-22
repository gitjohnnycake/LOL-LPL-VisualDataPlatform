<template>
  <div class="home">
    <div class="bg"></div>
    <header class="header">
      <Header></Header>
    </header>
    <div class="middle">
      <aside class="leftAside"><LeftAside></LeftAside></aside>
      <article class="middleContent"><MiddleContent></MiddleContent></article>
      <aside class="rightAside"><RightAside></RightAside></aside>
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import Header from "components/Header";
import LeftAside from "components/LeftAside";
import MiddleContent from "components/MiddleContent";
import RightAside from "components/RightAside";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Header,
    LeftAside,
    MiddleContent,
    RightAside,
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;

  .bg {
    background: url("../assets/bg.jpeg") no-repeat;
    background-size: 110% 110%;
    z-index: -99;
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .header {
    width: 100%;
    height: 80px;
  }

  .middle {
    display: flex;
    margin: 0 20px 20px 20px;

    .leftAside,
    .rightAside {
      flex: 1;
    }

    .middleContent {
      flex: 2;
    }
  }
}
</style>
