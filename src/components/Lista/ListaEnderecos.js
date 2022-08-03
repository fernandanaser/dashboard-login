import { useContext, useState } from "react";
import { PessoasContext } from "../../context/PessoasContext";
import { ContainerLista, ItensCardEndereco, Botoes } from "./Lista.styled";

const ListaEnderecos = ({ listaendereco }) => {
    console.log("parametroEndereco " + listaendereco)
    const { handleDeleteEndereco, goUpdate } = useContext(PessoasContext);

    function goUpdateEndereco() {
        const myArray = window.location.href.split("/");
        let idPessoa = myArray[myArray.length-1]
        window.location.href = `/atualizar-endereco/${idPessoa}`;
    }

    return (
        <ContainerLista>

            {listaendereco.map(item => (
                <div key={item.idPessoa}>
                    <ItensCardEndereco>
                        <div>
                            <p>{item.tipo}</p>
                        </div>
                        <div>
                            <p>{item.logradouro}</p>
                        </div>
                        <div>
                            <p>{item.numero}</p>
                        </div>
                        <div>
                            <p>{item.complemento}</p>
                        </div>
                        <div>
                            <p>{item.cep}</p>
                        </div>
                        <div>
                            <p>{item.cidade}</p>
                        </div>
                        <div>
                            <p>{item.estado}</p>
                        </div>
                        <div>
                            <p>{item.pais}</p>
                        </div>
                        <Botoes>
                            {/* <button onClick={() => goUpdate(item.idPessoa)}>Atualizar</button> */}

                            <button onClick={() => goUpdateEndereco(item.idPessoa)}>Atualizar</button>
                            <button onClick={() => handleDeleteEndereco(item.idPessoa)}>Excluir</button>
                        </Botoes>
                    </ItensCardEndereco>
                </div>
            ))}
        </ContainerLista>
    )
}
export default ListaEnderecos;