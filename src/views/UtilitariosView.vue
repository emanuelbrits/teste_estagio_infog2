<script setup>
</script>

<template>
    <div class="tela">
        <div class="cabecalho">
            <div class="esquerdaCabecalho">
                <button><i class="pi pi-bars" style="font-size: 2rem"></i></button>
                <h3>Utilitários</h3>
            </div>
            <div class="direitaCabecalho">
                <h3>Manager</h3>
            </div>
        </div>
        <div class="areaUtilitarios">
            <div class="sidebar">
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
            </div>
            <div class="areaConteudoUtilitarios">
                <div class="conteudoUtilitarios">
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-cog" style="font-size: 5rem"></i>
                            <h4>Configurações</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-user" style="font-size: 5rem"></i>
                            <h4>Usuário</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-shield" style="font-size: 5rem"></i>
                            <h4>Permissões</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-file-excel" style="font-size: 5rem"></i>
                            <h4>Motivo de cancelamento</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-file-arrow-up" style="font-size: 5rem"></i>
                            <h4>Logs</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-sitemap" style="font-size: 5rem"></i>
                            <h4>Segmentos</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-align-right" style="font-size: 5rem"></i>
                            <h4>Versões</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-calendar" style="font-size: 5rem"></i>
                            <h4>Feriados</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-clipboard" style="font-size: 5rem"></i>
                            <h4>Laudos</h4>
                        </a>
                    </div>
                    <div class="conteudo">
                        <a href="">
                            <i class="pi pi-send" style="font-size: 5rem"></i>
                            <h4>Mensagens pré-definidas</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tela {
    display: flex;
    flex-direction: column;

    .cabecalho {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 6vh;
        width: 100vw;
        background-color: #007AD6;
        color: white;

        .esquerdaCabecalho {
            width: 11%;
            padding-left: 0.5rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            button {
                border: none;
                background-color: #007AD6;
                color: white;
            }

            h3 {
                margin: 0
            }
        }

        .direitaCabecalho {
            padding-right: 0.7rem;
        }
    }

    .areaUtilitarios {
        height: 94vh;
        display: flex;
        flex-direction: row;

        .sidebar {
            display: flex;
            flex-direction: column;
            width: 3%;
            background-color: #0091FF;
            justify-content: space-between;

            .cimaSidebar {
                display: flex;
                flex-direction: column;
                padding-top: 1rem;
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

        .areaConteudoUtilitarios {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            width: 97%;
            background-color: #F5F6F7;

            .conteudoUtilitarios {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: center;
                gap: 1rem;
                padding-top: 6rem;

                .conteudo {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    background-color: #007AD6;
                    width: 11%;
                    height: 10rem;
                    border-radius: 10%;

                    a {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        color: white;
                        text-decoration: none;
                        width: 100%;
                        height: 100%;
                        border-radius: 10%;
                    }

                    a:hover {
                        background-color: #0564ad;
                        transition: 0.4s;
                        border-radius: 10%;
                    }
                }
            }
        }
    }
}
</style>