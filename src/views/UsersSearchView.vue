<template>
  <div class="page-container">
    <div class="search-container">
      <input
        placeholder="Введите ФИО пользователя"
        v-model="userFullNameLike"
      />
      <button @click="onSearchClick" class="custom-button search-button">
        Поиск
      </button>
    </div>
    <div v-show="usersList.length" class="users-container">
      <div
        @click="onUserClick(user.id)"
        v-for="user in usersList"
        :key="user.id"
        class="gray-container user-container"
      >
        <div>{{ user.surname }} {{ user.name }} {{ user.patronymic }}</div>
      </div>
    </div>
    <div v-show="!usersList.length && isSearched" class="users-container">
      <div>
        <span>Не найдено ни одного клиента с ФИО: {{ userFullNameLike }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IApplicationService } from "@/services/iapplication.service";
import { Vue, Options } from "vue-class-component";
import { ApplicationService } from "../services/implementation/application.service";
import { inject } from "inversify-props";
import { Person } from "../models/person.model";
import router from "../router";

@Options({
  created() {
    this.userFullNameLike = "";
    this.isSearched = false;
  },
})
export default class UsersSearchView extends Vue {
  public userFullNameLike: string;
  public usersList: Person[] = [];
  public isSearched: boolean;
  @inject() applicationService: IApplicationService;
  getUsersByFullNameLike(userFullName: string) {
    return this.applicationService
      .getPersonsByFullNameLike(userFullName)
      .subscribe({
        next: (res) => (this.usersList = res),
      });
  }
  onUserClick(userId: string) {
    router.push(`/user/${userId}`);
  }
  onSearchClick() {
    this.getUsersByFullNameLike(this.userFullNameLike);
    this.isSearched = true;
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
@import "../styles/constants.scss";
.search-button {
  width: 8%;
  margin-left: 10px;
}
.page-container {
  margin-top: 2%;
  width: 90%;
  margin-left: 2%;
  font-size: $font-size;
}
.search-container {
  display: flex;
  flex-direction: row;
}
.users-container {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}
.user-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  cursor: pointer;
  margin-top: 8px;
  &:hover {
    background: lighten($dark-gray-color, 45%);
  }
}
</style>