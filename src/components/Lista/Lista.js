import { useContext } from "react";
import { PessoasContext } from "../../context/PessoasContext";
import { ContainerLista, ItensCard, Botoes } from "./Lista.styled";
import usuario from "./usuario.png"

const Lista = ({ listaPessoas }) => {
    const { handleDeletePessoa, goUpdate } = useContext(PessoasContext);

    function goEndereco(idPessoa) {
        window.location.href = `/enderecos/${idPessoa}`;
    }

    function goCadastrarEndereco(idPessoa) {
        window.location.href = `/cadastrar-endereco/${idPessoa}`;
    }

    function goContato() {
        window.location.href = `/contatos`;
    }

    return (
        <ContainerLista>

            {listaPessoas.map(item => (
                <div key={item.idPessoa}>
                    <ItensCard>
                        <div>
                            <img width="44px" src={usuario} alt="Usuário" />
                            <p>{item.nome}</p>
                        </div>
                        <div>
                            <p>{item.dataNascimento}</p>
                        </div>
                        <div>
                            <p>{item.cpf}</p>
                        </div>
                        <div>
                            <p>{item.email}</p>
                        </div>
                        <Botoes>
                            <button onClick={() => goUpdate(item.idPessoa)}>Atualizar</button>
                            <button onClick={() => handleDeletePessoa(item.idPessoa)}>Excluir</button>
                            <button onClick={() => goEndereco(item.idPessoa)}>Endereços</button>
                            <button onClick={() => goContato}>Contato</button>
                        </Botoes>
                    </ItensCard>
                </div>
            ))}
        </ContainerLista>
    )
}
export default Lista;