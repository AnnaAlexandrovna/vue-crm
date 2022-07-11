<template>
  <div class="nav-bar-container">
    <img src="@/assets/images/crm.svg" class="crm-logo" />
    <div class="right-section">
      <div class="user-info">
        <span>{{ userFullName }}</span>
        <img src="@/assets/images/user.svg" class="user-logo" id="userLogo" />
      </div>
      <div v-show="isDropdownOpen" class="dropdown-content">
        <button
          @click="onUserSearchClick"
          class="custom-button dropdown-button"
        >
          Поиск пользователей
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import router from "../router";

@Options({
  props: { userFullName: String },
  mounted() {
    document.addEventListener("click", this.closeDropdownOnBackgroundClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDropdownOnBackgroundClick);
  },
})
export default class NavBar extends Vue {
  isDropdownOpen: Boolean = false;
  onUserSearchClick() {
    router.push("/");
  }
  closeDropdownOnBackgroundClick(event: InputEvent) {
    if ((event.target as HTMLInputElement).id === "userLogo") {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      this.isDropdownOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
@import "../styles/constants.scss";
.nav-bar-container {
  background-color: $light-gray-color;
  display: flex;
  font-size: $font-size;
}
.crm-logo {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 50px;
}
.user-logo {
  width: 50px;
  margin-left: 5px;
  &:hover {
    background: lighten($dark-gray-color, 35%);
    border-radius: 10%;
  }
}
.right-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 95%;
  margin-right: 10px;
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.dropdown-content {
  top: 65px;
  right: 10px;
  position: absolute;
  background-color: $light-gray-color;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown-button {
  width: 100%;
}
</style>