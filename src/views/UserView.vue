<template>
  <div class="info-container">
    <div class="gray-container general-info-container">
      <InfoItem label="Информация о клиенте" />
      <div class="client-info-data">
        <InfoItem :data="userData.name" label="Имя:" />
        <InfoItem :data="userData.surname" label="Фамилия:" />
        <InfoItem :data="userData.patronymic" label="Отчество:" />
      </div>
    </div>
    <div class="gray-container general-info-container">
      <InfoItem label="Общая сумма на всех счетах" />
      <div class="client-info-data">
        <div v-for="balanceData in balanceInfo" :key="balanceData.currency">
          <InfoItem
            :data="formatMoney(balanceData.balance)"
            :label="getCurrencySymbol(balanceData)"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="info-container">
    <div class="gray-container wallet">
      <div
        v-for="(card, index) in cards"
        class="card"
        :key="card.id"
        :style="listCardInfoStyle(index)"
      >
        <div class="card-data" @click="onClickOnCard(card)">
          <img src="@/assets/images/chip.svg" class="chip-image" />
          <span class="card-span">{{ maskCardNumber(card.cardNumber) }}</span>
          <img
            :src="require(`@/assets/images/${card.paymentSystemType}_logo.svg`)"
            class="card-image"
          />
        </div>
      </div>
    </div>
  </div>
  <div id="cardModal" class="modal" v-show="isModalOpen">
    <div class="modal-content">
      <InfoItem
        :data="accountInfo ? accountInfo.accountNumber : ''"
        label="Номер счета:"
      />
      <InfoItem
        :data="bankInfo.correspondentAccount"
        label="Корреспондентский счёт:"
      />
      <InfoItem
        :data="`${userData.surname} ${userData.name} ${userData.patronymic}`"
        label="ФИО получателя:"
      />
      <InfoItem :data="bankInfo.name" label="Наименование банка:" />
      <InfoItem :data="bankInfo.bankIdentificationCode" label="БИК банка:" />
      <InfoItem :data="bankInfo.taxIdentificationNumber" label="ИНН банка:" />
      <button class="custom-button client-info-data" @click="closeCardModal">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { IApplicationService } from "@/services/iapplication.service";
import { inject } from "inversify-props";
import { Person } from "../models/person.model";
import { Card } from "../models/card.model";
import { IPersonService } from "@/services/iperson.service";
import { BalanceInCurrency } from "@/models/balance.in.currency.model";
import { BankDetails } from "@/models/bank.details.model";
import { IBankDetailsService } from "@/services/ibank.details.service";
import { CurrencyType, PersonAccount } from "@/models/account.model";
import InfoItem from "../components/InfoItem.vue";

@Options({
  components: { InfoItem },
  created() {
    this.userId = this.$route.params.id;
    this.getUserInfo(this.userId);
    this.getCards(this.userId);
    this.getFullBalanceInfo(this.userId);
    this.getBankInfo();
  },
  mounted() {
    document.addEventListener("click", this.closeModalOnBackgroundClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeModalOnBackgroundClick);
  },
})
export default class UserView extends Vue {
  public userId: String = "";
  public userData: Person;
  public cards: Card[] = [];
  public balanceInfo: BalanceInCurrency[] = [];
  public isModalOpen: Boolean = false;
  public selectedCard: Card;
  public bankInfo: BankDetails;
  public accountInfo: PersonAccount | null = null;
  @inject() applicationService: IApplicationService;
  @inject() personService: IPersonService;
  @inject() bankDetailsService: IBankDetailsService;

  getUserInfo(userId: string) {
    this.applicationService.getPersonsById(userId).subscribe({
      next: (res) => (this.userData = res),
    });
  }

  getCards(userId: string) {
    this.applicationService.getCardsByPersonId(userId).subscribe({
      next: (res) => (this.cards = res),
    });
  }

  maskCardNumber(cardNumber: number) {
    return `${cardNumber}`
      .substring(0, 4)
      .concat(" #### #### #")
      .concat(`${cardNumber}`.substring(13, 16));
  }

  listCardInfoStyle(index: number) {
    const style = { top: "0px" };
    const indent = 55;
    style.top = `${indent * index}px`;
    return style;
  }

  getFullBalanceInfo(userId: string) {
    this.applicationService
      .getFullBalanceFromAllAccountsByPersonId(userId)
      .subscribe({
        next: (res) => (this.balanceInfo = res),
      });
  }

  onClickOnCard(card: Card) {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.selectedCard = card;
      this.applicationService
        .getAccountByAccountId(this.selectedCard.accountId)
        .subscribe({
          next: (res) => {
            if (res) {
              this.accountInfo = res;
            }
          },
        });
    }
  }

  closeCardModal() {
    this.isModalOpen = false;
  }

  getBankInfo() {
    this.bankDetailsService.getBankDetails().subscribe({
      next: (res) => (this.bankInfo = res),
    });
  }
  getCurrencySymbol(balanceData: BalanceInCurrency) {
    let symbol;
    switch (balanceData.currency) {
      case CurrencyType.RUB:
        symbol = "₽:";
        break;
      case CurrencyType.EUR:
        symbol = "€:";
        break;
      case CurrencyType.USD:
        symbol = "$:";
        break;
      default:
        symbol = "₽";
    }
    return symbol;
  }

  closeModalOnBackgroundClick(event: InputEvent) {
    if ((event.target as HTMLInputElement).id === "cardModal") {
      this.isModalOpen = false;
    }
  }
  formatMoney(value: number) {
    const formatterUSD = new Intl.NumberFormat("ru-RU");
    return formatterUSD.format(value);
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
@import "../styles/constants.scss";
.info-container {
  display: flex;
  margin-top: 2%;
  margin-left: 5%;
  font-size: $font-size;
}
.general-info-container {
  width: 45%;
  padding: 1%;
  margin-right: 5%;
}
.client-info-data {
  margin-top: 1%;
}
.wallet {
  max-width: 500px;
  width: 45%;
  border: 1px solid $dark-gray-color;
  height: 300px;
}
.card {
  background: linear-gradient(white, lighten($red-color, 40%));
  height: 60px;
  width: 95%;
  border: 1px solid $dark-gray-color;
  border-radius: $border-radius $border-radius 0 0;
  margin-top: 10px;
  margin-left: 2%;
  cursor: pointer;
  &:hover {
    margin-top: 8px;
    height: 62px;
    box-shadow: 8px 0px 16px 0px rgba(0, 0, 0, 0.2);
  }
}
.card-data {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.card-span {
  margin-right: 2%;
}
.chip-image {
  width: 50px;
}
.card-image {
  width: 70px;
}
img {
  position: relative;
  display: inline;
}
</style>