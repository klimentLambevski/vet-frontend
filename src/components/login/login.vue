<template>
    <div class="login">

      <div class="login-form">
        <dynamic-form :config="loginFormConfig"
                      :on-submit="login"
                      @form-submitted="onFormSubmitted"
        ></dynamic-form>
      </div>

    </div>
</template>

<script>

    import DynamicForm from '../dynamic-form/dynamic-form.vue';
    import {initToken, signIn} from "../../services/auth";

    export default {

      components: {
        DynamicForm,
      },
      data: () => ({
        loginFormConfig: {
          columns: {
            'email': {
              name: 'email',
              type: 'text',
              label: 'Email',
              rules: [
                (v) => !!v || 'Е-маилот е задолжителен',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Е-маилот мора да е валиден'
              ]
            },
            'password': {
              name: 'password',
              type: 'password',
              label: 'Password',
              rules: [
                (v) => !!v || 'Лозинката е задолжителна',
              ]
            },
          },
          confirmButtonName: "Логирај се",
        },
        loginData: {}
      }),
      methods: {
        login(loginData){
          return signIn(loginData);
        },
        onFormSubmitted( { serverValues } ){
          this.$store.commit('setSelf', serverValues.user);
          this.$router.push({name: 'users'});
        }
      }

    }
</script>

<style lang="scss">
    @import "login";
</style>