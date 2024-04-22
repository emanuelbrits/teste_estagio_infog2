<script setup>
import { ref, onMounted } from 'vue';
import adicionaUsuarios from '@/hooks/usuariosHooks';
import popup from '@/components/popup.vue';

var usuarios = ref([]);

adicionaUsuarios(usuarios)

const showPopup = ref(false);

function openPopup() {
    showPopup.value = true;
}

function closePopup() {
    showPopup.value = false;
}

onMounted(() => {
    adicionaUsuarios();
});

</script>

<template>

    <body>
        <div class="tela">
            <div class="cabecalho">
                <div class="esquerdaCabecalho">
                    <button><i class="pi pi-bars" style="font-size: 2rem"></i></button>
                    <div class="textoNavBar">
                        <a href="/">
                            <h3>Utilitários</h3>
                        </a>
                        <h3>/ <b>Usuários</b></h3>
                    </div>
                </div>
                <div class="direitaCabecalho">
                    <h3>Manager</h3>
                </div>
            </div>
            <div class="areaUsuarios">
                <nav class="sidebar">
                    <div class="cimaSidebar">
                        <a href=""><i class="pi pi-objects-column" style="font-size: 2rem"></i></a>
                        <a href=""><i class="pi pi-users" style="font-size: 2rem"></i></a>
                        <a href=""><i class="pi pi-receipt" style="font-size: 2rem"></i></a>
                        <a href=""><i class="pi pi-phone" style="font-size: 2rem"></i></a>
                        <a href=""><i class="pi pi-clipboard" style="font-size: 2rem"></i></a>
                        <a href=""><i class="pi pi-cog" style="font-size: 2rem"></i></a>
                    </div>
                    <div class="baixoSidebar">
                        <img src="../assets/infog2_logo.png" alt="">
                    </div>
                </nav>
                <div class="areaConteudoUsuarios">
                    <div class="conteudoUsuarios">
                        <div class="cimaConteudo">
                            <form class="inline">
                                <div class="input-icons">
                                    <i class="pi pi-search" style="font-size: 2rem"></i>
                                    <input type="text" class="input-field" name="search" placeholder="Nome e CPF">
                                </div>
                            </form>
                            <button @click="openPopup"><i class="pi pi-plus" style="font-size: 1.5rem"></i></button>
                        </div>
                        <div v-if="usuarios.length <= 0" class="baixoConteudoFantasma">
                            <img src="/src/assets/fantasminha.png" alt="">
                        </div>
                        <div v-else class="baixoConteudoUsuario">
                            <div v-if="showPopup === false" class="cardUsuario" v-for="usuario in usuarios">
                                <div class="nomeSetor">
                                    <h4>{{ usuario.nome }}</h4>
                                    <h5>{{ usuario.perfil_str }}</h5>
                                </div>
                                <div class="status">
                                    <h5>{{ usuario.status }}</h5>
                                </div>
                                <div class="cpfCnpj">
                                    <i class="pi pi-shop" style="font-size: 1.5rem"></i>
                                    <h4>{{ usuario.cpf_cnpj_formatado }}</h4>
                                </div>
                                <div class="enderecoCidade">
                                    <div class="iconLocal">
                                        <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
                                    </div>
                                    <div class="dadosEnderecoCidade">
                                        <h5>{{ usuario.endereco_residencial }}</h5>
                                        <h5>{{ usuario.cidade }}</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="telaPopup" v-if="showPopup === true">
                                <popup @close="closePopup"></popup>
                                <div class="telaUsuarios" style="position: fixed; z-index: -1;">
                                    <div class="cardUsuario" v-for="usuario in usuarios">
                                        <div class="nomeSetor">
                                            <h4>{{ usuario.nome }}</h4>
                                            <h5>{{ usuario.perfil_str }}</h5>
                                        </div>
                                        <div class="status">
                                            <h5>{{ usuario.status }}</h5>
                                        </div>
                                        <div class="cpfCnpj">
                                            <i class="pi pi-shop" style="font-size: 1.5rem"></i>
                                            <h4>{{ usuario.cpf_cnpj_formatado }}</h4>
                                        </div>
                                        <div class="enderecoCidade">
                                            <div class="iconLocal">
                                                <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
                                            </div>
                                            <div class="dadosEnderecoCidade">
                                                <h5>{{ usuario.endereco_residencial }}</h5>
                                                <h5>{{ usuario.cidade }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
body {
    margin: 0 auto;
    position: absolute;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
}

.tela {
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;

    .cabecalho {
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 6vh;
        width: 100vw;
        background-color: #007AD6;
        color: white;
        position: fixed;
        z-index: 2;

        .esquerdaCabecalho {
            width: 18%;
            padding-left: 0.5rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            h3 {
                margin: 0
            }

            .textoNavBar {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                text-align: center;
                gap: 0.5rem;
            }

            button {
                border: none;
                background-color: #007AD6;
                color: white;
            }

            a {
                color: white;
            }

        }

        .direitaCabecalho {
            padding-right: 0.7rem;
            margin-right: 1rem;
        }
    }

    .areaUsuarios {
        min-height: 100vh;
        display: flex;
        flex-direction: row;

        .sidebar {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 3%;
            background-color: #0091FF;
            justify-content: space-between;
            position: fixed;
            z-index: 1;

            .cimaSidebar {
                display: flex;
                flex-direction: column;
                padding-top: 5rem;
                align-items: center;
                gap: 1rem;

                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: white;
                    height: 3rem;
                    width: 3rem;

                    i {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                    }

                    i:hover {
                        background-color: #007AD6;
                        border-radius: 50%;
                        transition: 0.2s;
                    }
                }
            }

            .baixoSidebar {
                padding-bottom: 1rem;
                display: flex;
                justify-content: center;

                img {
                    width: 90%;
                }
            }
        }

        .areaConteudoUsuarios {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 96.2vw;
            height: 100%;
            background: #F5F6F7;
            margin-top: 6vh;
            margin-left: 3vw;

            .conteudoUsuarios {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;

                .cimaConteudo {
                    display: flex;
                    flex-direction: row;
                    height: 10%;
                    width: 100%;
                    padding-left: 1rem;
                    padding-top: 2rem;



                    .inline {
                        height: 3rem;
                    }

                    .input-icons i {
                        padding-top: 0.5rem;
                        padding-left: 0.4rem;
                        position: absolute;
                        color: #A1A1A1;
                    }

                    .input-field {
                        display: flex;
                        align-items: center;
                        height: 3rem;
                        width: 30rem;
                        text-align: start;
                        padding-left: 3rem;
                        border: none;
                        border-radius: 10px;
                        color: #A1A1A1;
                        font-size: x-large;

                        input {
                            height: 100%;
                            padding: 0;
                        }
                    }

                    button {
                        margin-left: 1rem;
                        width: 3rem;
                        height: 3rem;
                        color: white;
                        background-color: #0091FF;
                        border: none;
                        border-radius: 15%;
                    }

                    button:hover {
                        background-color: #007AD6;
                        transition: 0.5s;
                    }
                }

                .baixoConteudoUsuario {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                    margin: 0;

                    .popup {
                        position: absolute;
                        z-index: 99;
                        background-color: rgba(0, 0, 0, 0.2);
                        top: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        max-width: 97%;
                    }

                    .cardUsuario {
                        display: flex;
                        flex-direction: row;
                        gap: 15rem;
                        max-width: 95%;
                        background-color: white;
                        margin-top: 1rem;
                        margin-bottom: 1rem;
                        margin-left: 1rem;
                        border-radius: 15px;

                        .nomeSetor {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: self-start;
                            min-width: 18rem;
                            max-width: 18rem;
                            margin-left: 6rem;
                        }

                        .status {
                            display: flex;
                            align-items: center;
                            min-width: 4rem;
                            justify-content: center;

                            h5 {
                                display: flex;
                                background-color: #AEF5E4;
                                text-align: center;
                                justify-content: center;
                                align-items: center;
                                width: 100%;
                                max-height: 40%;
                                color: #038868;
                                margin: 0;
                                border-radius: 7px;
                            }
                        }

                        .cpfCnpj {
                            display: flex;
                            align-items: center;
                            min-width: 15rem;
                            gap: 0.7rem;
                        }

                        .enderecoCidade {
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-items: flex-start;
                            gap: 0.7rem;

                            .iconLocal {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100%;
                            }

                            .dadosEnderecoCidade {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                                justify-content: center;
                                height: 100%;

                                h5 {
                                    margin: 0;
                                }
                            }
                        }
                    }
                }

                .baixoConteudoFantasma {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 90%;

                    img {
                        height: 50%;
                        margin-bottom: 10rem;
                    }
                }
            }
        }
    }
}
</style>