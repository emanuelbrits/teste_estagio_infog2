<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue';
import { getCidades, getCidadesUF } from '@/hooks/cidadesHook';
import getBairros from '@/hooks/bairrosHook';
import router from '@/router';
import { useAuth } from '@/stores/auth';
import axios from "axios";

var ufEndereco = ref(-1)
var cidades = ref([]);
var cidadesUF = ref([]);
var bairros = ref([]);
const estados = [
    { uf: 12, sigla: 'AC' },
    { uf: 27, sigla: 'AL' },
    { uf: 16, sigla: 'AP' },
    { uf: 13, sigla: 'AM' },
    { uf: 29, sigla: 'BA' },
    { uf: 23, sigla: 'CE' },
    { uf: 53, sigla: 'DF' },
    { uf: 32, sigla: 'ES' },
    { uf: 52, sigla: 'GO' },
    { uf: 21, sigla: 'MA' },
    { uf: 51, sigla: 'MT' },
    { uf: 50, sigla: 'MS' },
    { uf: 31, sigla: 'MG' },
    { uf: 15, sigla: 'PA' },
    { uf: 25, sigla: 'PB' },
    { uf: 41, sigla: 'PR' },
    { uf: 26, sigla: 'PE' },
    { uf: 22, sigla: 'PI' },
    { uf: 33, sigla: 'RJ' },
    { uf: 24, sigla: 'RN' },
    { uf: 43, sigla: 'RS' },
    { uf: 11, sigla: 'RO' },
    { uf: 14, sigla: 'RR' },
    { uf: 42, sigla: 'SC' },
    { uf: 35, sigla: 'SP' },
    { uf: 28, sigla: 'SE' },
    { uf: 17, sigla: 'TO' },
]

var nomeIsEmpty = ref(true)
var cpfIsEmpty = ref(true)
var dtNascIsEmpty = ref(true)
var perfilIsEmpty = ref(true)
var ufIDlIsEmpty = ref(true)
var ufCartIsEmpty = ref(true)
var ceplIsEmpty = ref(true)
var loglIsEmpty = ref(true)
var numIsEmpty = ref(true)
var cidadeIsEmpty = ref(true)
var bairroIsEmpty = ref(true)
var telIsEmpty = ref(true)
var emailIsEmpty = ref(true)

var usuario = ref(
    {
        endereco_residencial: {
            cep: 0,
            cidade: "",
            bairro: "",
            logradouro: "",
            numero: "",
            complemento: "",
            referencia: ""
        },
        estado_civil: "",
        naturalidade: "",
        nome_pai: "",
        nome_mae: "",
        numero_identidade: "",
        orgao_emissor_identidade: "",
        uf_identidade: "",
        numero_titulo_eleitor: "",
        secao_titulo_eleitor: "",
        zona_titulo_eleitor: "",
        numero_carteira_trabalho: "",
        serie_carteira_trabalho: "",
        data_emissao_carteira_trabalho: null,
        uf_carteira_trabalho: "",
        data_admissao: null,
        data_demissao: null,
        perfil: "",
        funcao: "",
        pix_key: "",
        nome: "",
        apelido: "",
        cpf_cnpj: "",
        telefone: "",
        email: "",
        data_nascimento: "",
        horario_colaborador: {
            dia_util_inicio_manha: "08:00",
            dia_util_fim_manha: "12:00",
            dia_util_inicio_tarde: "14:00",
            dia_util_fim_tarde: "18:00",
            sabado_inicio: "08:00",
            sabado_fim: "12:00"
        }
    }
)

async function adicionarUsuario() {
    console.log(usuario);

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api-manager-test.infog2.com.br.infog2.com.br/a/colaborador/',
        headers: { 'Authorization': `Token ${useAuth().token}` },
        data: usuario.value
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response));
        })
        .catch(function (error) {
            console.log(error);
        });
}

function Cancelar() {
    router.go()
}

onMounted(() => {
    getCidades(cidades);
});

watchEffect(() => {
    if (usuario.value.endereco_residencial.cidade !== -1) {
        getBairros(usuario.value.endereco_residencial.cidade, bairros);
    }

    if (ufEndereco.value !== -1) {
        getCidadesUF(ufEndereco.value, cidadesUF);
    }

    if (usuario.value.nome.length > 0) {
        nomeIsEmpty = false
    } else {
        nomeIsEmpty = true
    }

    if (usuario.value.cpf_cnpj.length > 0) {
        cpfIsEmpty = false
    } else {
        cpfIsEmpty = true
    }

    if (usuario.value.data_nascimento.length > 0) {
        dtNascIsEmpty = false
    } else {
        dtNascIsEmpty = true
    }

    if (usuario.value.perfil.length > 0) {
        perfilIsEmpty = false
    } else {
        perfilIsEmpty = true
    }

    if (isNaN(usuario.value.uf_identidade.length)) {
        ufIDlIsEmpty = false
    } else {
        ufIDlIsEmpty = true
    }

    if (isNaN(usuario.value.uf_carteira_trabalho.length)) {
        ufCartIsEmpty = false
    } else {
        ufCartIsEmpty = true
    }

    if (usuario.value.endereco_residencial.cep.length > 0) {
        ceplIsEmpty = false
    } else {
        ceplIsEmpty = true
    }

    if (usuario.value.endereco_residencial.logradouro.length > 0) {
        loglIsEmpty = false
    } else {
        loglIsEmpty = true
    }

    if (usuario.value.endereco_residencial.numero.length > 0) {
        numIsEmpty = false
    } else {
        numIsEmpty = true
    }

    if (isNaN(usuario.value.endereco_residencial.cidade.length)) {
        cidadeIsEmpty = false
    } else {
        cidadeIsEmpty = true
    }

    if (isNaN(usuario.value.endereco_residencial.bairro.length)) {
        bairroIsEmpty = false
    } else {
        bairroIsEmpty = true
    }

    if (usuario.value.telefone.length > 0) {
        telIsEmpty = false
    } else {
        telIsEmpty = true
    }

    if (usuario.value.email.length > 0) {
        emailIsEmpty = false
    } else {
        emailIsEmpty = true
    }
});

const dataNascimento = ref('');

watch(dataNascimento, (newValue) => {
    if (newValue) {
        const partes = newValue.split('-');
        const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        usuario.value.data_nascimento = dataFormatada;
    } else {
        usuario.value.data_nascimento = '';
    }
});

const dataEmissao = ref('');

watch(dataEmissao, (newValue) => {
    if (newValue) {
        const partes = newValue.split('-');
        const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        usuario.value.data_emissao_carteira_trabalho = dataFormatada;
    } else {
        usuario.value.data_emissao_carteira_trabalho = '';
    }
});
</script>

<template>
    <div class="popup">
        <div class="conteudoPopup">
            <div class="topoPopup">
                <h3>Novo usuário</h3>
                <button @click="Cancelar"><i class="pi pi-times" style="font-size: 1.5rem"></i></button>
            </div>
            <form @submit.prevent="adicionarUsuario">
                <div class="dadosBasicos">
                    <div class="titulodadosBasicos">
                        <h4>Dados Básicos</h4>
                    </div>
                    <div class="fotoNomes">
                        <div class="fotos">
                            <img src="@/assets/circulo.png" alt="" class="foto">
                            <button class="botaoAdicionarFoto"><img src="@/assets/camera.png" alt=""></button>
                        </div>
                        <div class="nomes">
                            <div class="nomeUsuario">
                                <p>Nome</p>
                                <input type="text" v-model="usuario.nome">
                                <p v-if="nomeIsEmpty === true" style="color: red">Campo obrigatório</p>
                            </div>
                            <div class="nomeMae">
                                <p>Nome da Mãe</p>
                                <input type="text" v-model="usuario.nome_mae">
                            </div>
                            <div class="nomePai">
                                <p>Nome do Pai</p>
                                <input type="text" v-model="usuario.nome_pai">
                            </div>
                        </div>
                    </div>
                    <div class="dados">
                        <div class="cpf">
                            <p>CPF</p>
                            <input type="text" v-model="usuario.cpf_cnpj">
                            <p v-if="cpfIsEmpty === true" style="color: red">Campo obrigatório</p>
                        </div>
                        <div class="estadoCivil">
                            <p>Estado Civil</p>
                            <select name="" id="" v-model="usuario.estado_civil">
                                <option value="1">Solteiro</option>
                                <option value="2">Casado</option>
                                <option value="3">Divorciado</option>
                                <option value="4">Viúvo</option>
                                <option value="5">Separado</option>
                            </select>
                        </div>
                        <div class="nascimento">
                            <p>Data de nascimento</p>
                            <input type="date" v-model="dataNascimento">
                            <p v-if="dtNascIsEmpty === true" style="color: red">Campo obrigatório</p>
                        </div>
                        <div class="apelido">
                            <p>Apelido</p>
                            <input type="text" v-model="usuario.apelido">
                        </div>
                    </div>
                </div>
                <div class="dadosComplementares">
                    <div class="titulodadosComplementares">
                        <h4>Dados Complementares</h4>
                    </div>
                    <div class="cimaDadosComplementares">
                        <div class="perfil">
                            <p>Perfil</p>
                            <select name="" id="" v-model="usuario.perfil">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <p v-if="perfilIsEmpty === true" style="color: red">Campo obrigatório</p>
                        </div>
                        <div class="funcao">
                            <p>Função</p>
                            <select name="" id="" v-model="usuario.funcao">
                                <option value="Admin">Admin</option>
                                <option value="Financeiro">Financeiro</option>
                                <option value="Gerente">Gerente</option>
                                <option value="Suporte">Suporte</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        <div class="naturalidade">
                            <p>Naturalidade</p>
                            <input type="text" v-model="usuario.naturalidade">
                        </div>
                    </div>
                    <div class="baixoDadosComplementares">
                        <div class="pix">
                            <p>Chave PIX</p>
                            <input type="text" v-model="usuario.pix_key">
                        </div>
                    </div>
                </div>
                <div class="horarioTrabalho">
                    <div class="tituloHorarioTrabalho">
                        <h4>Horário de Trabalho</h4>
                    </div>
                    <div class="dias">
                        <div class="semana">
                            <div class="tituloSemana">
                                <h5>Dias da semana</h5>
                            </div>
                            <div class="horarios">
                                <div class="inicio">
                                    <p>Inicio</p>
                                    <input type="time" v-model="usuario.horario_colaborador.dia_util_inicio_manha">
                                </div>
                                <div class="fim">
                                    <p>Fim</p>
                                    <input type="time" v-model="usuario.horario_colaborador.dia_util_fim_tarde">
                                </div>
                            </div>
                        </div>
                        <div class="sabado">
                            <div class="titulosabado">
                                <h5>Sábado</h5>
                            </div>
                            <div class="horarios">
                                <div class="inicio">
                                    <p>Inicio</p>
                                    <input type="time" v-model="usuario.horario_colaborador.sabado_inicio">
                                </div>
                                <div class="fim">
                                    <p>Fim</p>
                                    <input type="time" v-model="usuario.horario_colaborador.sabado_fim">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="documentos">
                    <div class="tituloDocumentos">
                        <h4>Documentos</h4>
                    </div>
                    <div class="dadosDocumentos">
                        <div class="nIdentidade">
                            <p>Numero identidade</p>
                            <input type="text" v-model="usuario.numero_identidade">
                        </div>
                        <div class="orgaoEmissor">
                            <p>Orgão emissor identidade</p>
                            <input type="text" v-model="usuario.orgao_emissor_identidade">
                        </div>
                        <div class="ufIdentidade">
                            <p>UF identidade</p>
                            <select name="" v-model="usuario.uf_identidade">
                                <option v-for="estado in estados" :value="estado.uf">
                                    {{ estado.sigla }}
                                </option>
                            </select>
                            <p v-if="ufIDlIsEmpty === true" style="color: red">Campo obrigatório</p>
                        </div>
                        <div class="tituloEleitor">
                            <p>Título de eleitor</p>
                            <input type="text" v-model="usuario.numero_titulo_eleitor">
                        </div>
                        <div class="secaoTitulo">
                            <p>Seção do título</p>
                            <input type="text" v-model="usuario.secao_titulo_eleitor">
                        </div>
                        <div class="zonaTitulo">
                            <p>Zona do título</p>
                            <input type="text" v-model="usuario.zona_titulo_eleitor">
                        </div>
                    </div>
                    <div class="carteira">
                        <div class="carteiraTrabalho">
                            <p>Carteira de Trabalho</p>
                            <input type="text" v-model="usuario.numero_carteira_trabalho">
                        </div>
                        <div class="serieCarteira">
                            <p>Série da carteira</p>
                            <input type="text" v-model="usuario.serie_carteira_trabalho">
                        </div>
                        <div class="dataEmissao">
                            <p>Data da emissão da carteira</p>
                            <input type="date" v-model="dataEmissao">
                        </div>
                        <div class="ufcarteira">
                            <p>UF da carteira</p>
                            <select name="" v-model="usuario.uf_carteira_trabalho">
                                <option v-for="estado in estados" :value="estado.uf">
                                    {{ estado.sigla }}
                                </option>
                            </select>
                            <p v-if="ufCartIsEmpty === true" style="color: red">Campo obrigatório</p>
                        </div>
                    </div>
                    <div class="endereco">
                        <div class="tituloEndereco">
                            <h4>Endereço</h4>
                        </div>
                        <div class="cep">
                            <div class="campoCep">
                                <p>CEP</p>
                                <div class="inputMaps">
                                    <div class="input">
                                        <input type="text" v-model="usuario.endereco_residencial.cep">
                                        <p v-if="ceplIsEmpty === true" style="color: red">Campo obrigatório</p>
                                    </div>
                                    <div class="maps">
                                        <a href="">Maps</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="logNumero">
                            <div class="logradouro">
                                <p>Logradouro</p>
                                <input type="text" v-model="usuario.endereco_residencial.logradouro">
                                <p v-if="loglIsEmpty === true" style="color: red">Campo obrigatório</p>
                            </div>
                            <div class="numero">
                                <p>Número</p>
                                <input type="text" v-model="usuario.endereco_residencial.numero">
                                <p v-if="numIsEmpty === true" style="color: red">Campo obrigatório</p>
                            </div>
                        </div>
                        <div class="estCidBai">
                            <div class="estado">
                                <p>Estado</p>
                                <select v-model="ufEndereco">
                                    <option v-for="estado in estados" :value="estado.uf">
                                        {{ estado.sigla }}
                                    </option>
                                </select>
                            </div>
                            <div class="cidade">
                                <p>Cidade</p>
                                <select v-model="usuario.endereco_residencial.cidade">
                                    <option v-for="cidade in cidadesUF" :value="cidade.id">
                                        {{ cidade.nome }}
                                    </option>
                                </select>
                                <p v-if="cidadeIsEmpty === true" style="color: red">Campo obrigatório</p>
                            </div>
                            <div class="bairro">
                                <p>Bairro</p>
                                <select v-model="usuario.endereco_residencial.bairro">
                                    <option v-for="bairro in bairros" :value="bairro.id">
                                        {{ bairro.nome }}
                                    </option>
                                </select>
                                <p v-if="bairroIsEmpty === true" style="color: red">Campo obrigatório</p>
                            </div>
                        </div>
                        <div class="refComp">
                            <div class="referencia">
                                <p>Referência</p>
                                <input type="text" v-model="usuario.endereco_residencial.referencia">
                            </div>
                            <div class="complemento">
                                <p>Complemento</p>
                                <input type="text" v-model="usuario.endereco_residencial.complemento">
                            </div>
                        </div>
                    </div>
                    <div class="contato">
                        <div class="tituloContato">
                            <h4>Contato</h4>
                        </div>
                        <div class="dadosContato">
                            <div class="telefone">
                                <p>Telefone</p>
                                <input type="text" v-model="usuario.telefone">
                                <p v-if="telIsEmpty === true" style="color: red">Campo obrigatório</p>
                            </div>
                            <div class="email">
                                <p>Email</p>
                                <input type="text" v-model="usuario.email">
                                <p v-if="emailIsEmpty === true" style="color: red">Campo obrigatório</p>
                            </div>
                        </div>
                    </div>
                    <div class="botoes">
                        <button class="botaoCancelar" @click="Cancelar">Cancelar</button>
                        <input type="submit" class="botaoSalvar" placeholder="salvar">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.conteudoPopup {
    display: flex;
    flex-direction: column;
    width: 60%;
    background-color: white;
    border-radius: 20px;

    p {
        margin-bottom: 0.2rem;
        margin-top: 0.5rem;
        color: #808080;
    }

    input,
    select {
        border: #808080 1px solid;
        border-radius: 10px;
        height: 2.5rem;
    }

    .topoPopup {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 40vw;
        background-color: #0091FF;
        color: white;
        height: 3.8rem;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;

        h3 {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            text-align: center
        }

        button {
            padding: 0;
            background-color: #0091FF;
            border: none;
            color: white;
        }
    }

    .dadosBasicos {
        display: flex;
        flex-direction: column;

        .titulodadosBasicos {
            display: flex;
            justify-content: center;

            h4 {
                width: 95%;
                margin-top: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px #CCCCCC solid;
            }
        }

        .fotoNomes {
            display: flex;
            flex-direction: row;
            padding: 0;
            justify-content: space-around;
            width: 100%;
            gap: 0;

            .fotos {
                display: flex;
                width: 35%;

                .foto {
                    max-width: 15rem;
                    max-height: 15rem;
                    margin-left: 1.5rem;
                }

                .botaoAdicionarFoto {
                    border: none;
                    background-color: white;
                    margin-right: 8rem;

                    img {
                        max-width: 4rem;
                        max-height: 4rem;
                    }
                }
            }

            .nomes {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 65%;



                input {
                    width: 96%;
                }
            }
        }

        .dados {
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            .cpf,
            .estadoCivil,
            .nascimento,
            .apelido {
                display: flex;
                flex-direction: column;
                width: 25%;
                margin-left: 1.5rem;
                margin-right: 1.5rem;



                input,
                select {
                    width: 100%;
                    height: 2.5rem;
                }
            }
        }
    }

    .dadosComplementares {
        display: flex;
        flex-direction: column;

        .titulodadosComplementares {
            display: flex;
            justify-content: center;

            h4 {
                width: 95%;
                margin-top: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px #CCCCCC solid;
            }
        }

        .cimaDadosComplementares {
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            .perfil,
            .funcao,
            .naturalidade {
                width: 33%;
                margin-left: 1.5rem;
                margin-right: 1.5rem;

                input,
                select {
                    width: 100%;
                    height: 2.5rem;
                }


            }
        }

        .baixoDadosComplementares {

            .pix {
                margin-left: 1.5rem;

                input {
                    width: 50%;
                }


            }

        }
    }

    .horarioTrabalho {
        display: flex;
        flex-direction: column;

        .tituloHorarioTrabalho {
            display: flex;
            justify-content: center;

            h4 {
                width: 95%;
                margin-top: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px #CCCCCC solid;
            }
        }

        .dias {
            display: flex;
            flex-direction: row;

            .semana,
            .sabado {
                display: flex;
                flex-direction: column;
                width: 50%;
                margin-left: 1.5rem;

                .horarios {
                    display: flex;
                    flex-direction: row;

                    .inicio,
                    .fim {
                        width: 50%;
                    }

                    input {
                        width: 60%;
                    }

                    p {
                        margin-bottom: 0.2rem;
                        margin-top: 0.5rem;
                    }
                }
            }
        }
    }

    .documentos {
        display: flex;
        flex-direction: column;

        p {
            margin-bottom: 0.2rem;
            margin-top: 0.5rem;
        }

        input,
        select {
            width: 100%;
            height: 2.5rem;
        }

        .tituloDocumentos {
            display: flex;
            justify-content: center;

            h4 {
                width: 95%;
                margin-top: 1rem;
                padding-bottom: 0.5rem;
            }
        }

        .dadosDocumentos {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .nIdentidade,
            .orgaoEmissor,
            .ufIdentidade,
            .tituloEleitor,
            .secaoTitulo,
            .zonaTitulo {
                width: 30%;
                margin-left: 1.5rem;
            }
        }

        .carteira {
            display: flex;
            flex-direction: row;
            max-width: 94.5%;
            margin-left: 1.5rem;
            gap: 1rem;

            .carteiraTrabalho,
            .serieCarteira,
            .dataEmissao,
            .ufcarteira {
                width: 25%;
            }
        }

        .endereco {
            display: flex;
            flex-direction: column;

            p {
                margin-bottom: 0.2rem;
                margin-top: 0.5rem;
            }

            .tituloEndereco {
                display: flex;
                justify-content: center;

                h4 {
                    width: 95%;
                    margin-top: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px #CCCCCC solid;
                }
            }

            .cep {
                display: flex;
                flex-direction: column;
                max-width: 25%;
                padding-left: 2.5%;
                gap: 3%;

                .inputMaps {
                    display: flex;
                    flex-direction: row;
                    gap: 3%;

                    .maps {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.6rem;

                    a {
                        text-decoration: none;
                    }
                }
                }
            }

            .logNumero {
                display: flex;
                flex-direction: row;
                gap: 1%;
                padding-left: 2.5%;
                padding-right: 2.5%;

                .logradouro {
                    width: 75%;
                }

                .numero {
                    width: 25%;
                }
            }

            .estCidBai {
                display: flex;
                flex-direction: row;
                gap: 1%;
                padding-left: 2.5%;
                padding-right: 2.5%;

                .bairro,
                .cidade {
                    width: 40%;
                }

                .estado {
                    width: 20%;
                }
            }
        }

        .refComp {
            display: flex;
            flex-direction: row;
            gap: 1%;
            padding-left: 2.5%;
            padding-right: 2.5%;

            .referencia,
            .complemento {
                width: 50%;
            }
        }
    }

    .contato {
        display: flex;
        flex-direction: column;

        .tituloContato {
            display: flex;
            justify-content: center;

            h4 {
                width: 95%;
                margin-top: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px #CCCCCC solid;
            }
        }

        .dadosContato {
            display: flex;
            flex-direction: row;
            width: 100%;
            gap: 1%;
            justify-content: center;

            .telefone,
            .email {
                width: 47.3%;
            }
        }
    }

    .botoes {
        display: flex;
        flex-direction: row;
        justify-content: end;
        padding-right: 2.5%;
        padding-top: 2%;
        gap: 1%;
        margin-bottom: 1rem;

        .botaoCancelar,
        .botaoSalvar {
            width: 12%;
            border: none;
            border-radius: 12px;
        }

        .botaoSalvar {
            background-color: #0077FF;
            color: white;
        }
    }
}
</style>