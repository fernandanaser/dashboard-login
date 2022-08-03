import Lista from "../../components/Lista/Lista";
import { FaSistrix, FaBell, FaSortAmountUp, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Aside from "../../components/Aside/Aside";
import { Background, HeaderPessoas, PaginaHome, DivImg, BoxPessoas, Toptitulo, ContainerLista, ItensCard, Botoes } from "./Endereco.styled";
import usuario from "./usuario.png"
import { useContext, useEffect } from "react";
import { PessoasContext } from "../../context/PessoasContext";
import ListaEnderecos from "../../components/Lista/ListaEnderecos";



function Endereco() {
    const { getEndereco, endereco } = useContext(PessoasContext)

    // ★★ funcao para ir para cadastrar ★★
    function goCadastrarEndereco() {
        const myArray = window.location.href.split("/");
        console.log(myArray)
        let idPessoa = myArray[myArray.length-1]
        window.location.href = `/cadastrar-endereco/${idPessoa}`;
    }
    
    // Listar
    async function setup() {
        getEndereco();
    }
    useEffect(() => {
        console.log("setupEndereco")
        setup();
    }, []);

    return (
        <>
            <PaginaHome>
                <Aside />
                <Background>
                    <HeaderPessoas>
                        <div>
                            <h1>Endereços</h1>
                        </div>
                        <div>
                            {/* <FaSistrix />
                            <FaBell /> */}
                            <h3>Usuário</h3>
                            <DivImg>
                                <img width="48px" src={usuario} alt="Usuário" />
                            </DivImg>
                        </div>
                    </HeaderPessoas>
                    <BoxPessoas>
                        <div>
                            <h3>Pessoa</h3>
                            {/* <div>
                                <FaSortAmountUp />
                                <small>Sort</small>
                                <FaFilter />
                                <small>Filter</small>
                            </div> */}
                        </div>
                        <Toptitulo>
                            <p>Tipo</p>
                            <p>Logradouro</p>
                            <p>Numero</p>
                            <p>Complemento</p>
                            <p>Cep</p>
                            <p>Cidade</p>
                            <p>Estado</p>
                            <p>País</p>
                            <p>Ação</p>
                        </Toptitulo>

                        {/* Aqui vai a listagem de endereço */}

                        <ListaEnderecos listaendereco={endereco} />


                    </BoxPessoas>
                    <button onClick={() => goCadastrarEndereco()}>Cadastrar endereço</button>
                </Background>
            </PaginaHome>
        </>
    )
}
export default Endereco;