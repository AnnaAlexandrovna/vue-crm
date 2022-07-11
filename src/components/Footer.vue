<template>
  <div>
    <footer class="footer">
      <span class="footer__text">
        © Copyright - Digital Spirit, akarakhanova 2022
      </span>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class FooterComponent extends Vue {}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 90%;
  padding: 10px;
  &__text {
    font-size: small;
    color: $dark-gray-color;
  }
}
</style>