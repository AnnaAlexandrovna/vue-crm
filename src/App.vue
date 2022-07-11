<template>
  <div id="app">
    <nav-bar :userFullName="userFullName" />
    <footer-component />
    <router-view />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import NavBar from "./components/NavBar.vue";
import FooterComponent from "./components/Footer.vue";
import { inject } from "inversify-props";
import { container } from "inversify-props";
import { PersonService } from "./services/implementation/person.service";
import { CardService } from "./services/implementation/card.service";
import { AccountService } from "./services/implementation/account.service";
import { ApplicationService } from "./services/implementation/application.service";
import { BalanceService } from "./services/implementation/balance.service";
import { IBalanceService } from "./services/ibalance.service";
import { ExchangeRateService } from "./services/implementation/exchange.rate.service";
import { Balance, instanceOfBalance } from "./models/balance.model";
import { BankDetailsService } from "./services/implementation/bank.details.service";

container.addSingleton(PersonService);
container.addSingleton(CardService);
container.addSingleton(AccountService);
container.addSingleton(ApplicationService);
container.addSingleton(BalanceService);
container.addSingleton(ExchangeRateService);
container.addSingleton(BankDetailsService);

@Options({
  components: { NavBar, FooterComponent },
  created() {
    this.userFullName = "Test User";
  },
})
export default class App extends Vue {
  public userFullName: String = "";
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
