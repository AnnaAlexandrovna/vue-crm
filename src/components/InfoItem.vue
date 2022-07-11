<template>
  <div>
    <span class="info-title">{{ label }}</span>
    <span> {{ data }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import router from "../router";

@Options({
  props: { label: { default: "" }, data: { default: "" } },
})
export default class InfoItem extends Vue {}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
@import "../styles/constants.scss";
.info-title {
  font-weight: 600;
  padding-right: 5px;
}
</style>