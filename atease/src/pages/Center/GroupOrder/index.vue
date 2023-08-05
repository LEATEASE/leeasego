<template>
  <div>
    <h1>{{ user[0].username }}</h1>
    <img :src="user[0].imgUrl" />
  </div>
</template>

<script>
// import { reqGetText } from "@/api";
export default {
  name: "GroupOrder",
  data() {
    return {
      user: [],
    };
  },
  methods: {
    async getData() {
      let result = await this.$API.reqGetText();
      if (result.code === 200) {
        this.user = result.data || [];
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="less" scoped>
</style>