<script setup>

import { reactive, ref } from 'vue';
import  http from '@/services/http.js'
import { useAuth } from '@/stores/auth.js';
import router from '@/router';

const auth = useAuth()

const user = reactive({
    username: '',
    password: ''
});

async function login() {
    try {
        const {data} = await http.post('a/auth/login_colaborador/', user)
        http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        console.log(data);
        auth.setToken(data.token)
        auth.setUser(data)
        await router.push('/utilitarios')
    } catch (error) {
        console.log(error?.response?.data);
    }
}

</script>

<template>
    <div class="tela">
        <div class="areaImagem">
        </div>
        <div class="loginContainer">
            <div class="cardLogin">
                <h1><b>Login</b></h1>
                <form @submit.prevent="login">
                    <div class="emailForm">
                        <p><b>Email</b></p>
                        <input type="text" placeholder="" v-model="user.username">
                    </div>
                    <div class="senhaForm">
                        <p><b>Senha</b></p>
                        <input type="password" placeholder="" v-model="user.password">
                    </div>
                    <div class="areaBotoes">
                        <button class="botaoEsqueceu"><b>Esqueceu a senha?</b></button>
                        <button type="submit" class="botaoEntrar"><b>Entrar</b></button>
                    </div>
            </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

.tela{
    margin: 0;
    padding: 0;
    display: flex;
    flex: row;
}
.areaImagem {
    width: 55vw;
    background: url('../assets/backgroundLadoDoLogin.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.loginContainer {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: url('../assets/backgroundContainerLogin.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 45vw;
    justify-content: center;
    align-items: center;

    & .cardLogin {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
    }

    & a {
        color: black;
    }

    & form {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 36px;
        width: 100%;

        p {
            margin: 0
        }

        & .emailForm{
            padding-top: 64px;
        }

        & .emailForm, .senhaForm {
            width: 80%;
            font-size: medium;

            input {
                width: 100%;
                height: 40px;
                border: 1px solid rgb(219, 216, 216);
                border-radius: 5px;
            }
        }

        .areaBotoes {
            width: 80%;

            .botaoEsqueceu, .botaoEntrar {
                height: 60px;
                font-size:x-large;
            }

            .botaoEsqueceu{
                width: 60%;
                padding: 0;
                border: none;
                background-color: white;
                text-align: start;
            }

            .botaoEntrar{
                width: 40%;
                background-color: rgb(43, 41, 41);
                color: white;
                border-radius: 4px;
            }
        }
    }
}
</style>