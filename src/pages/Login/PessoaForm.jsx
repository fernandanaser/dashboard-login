import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PessoasContext } from "../../context/PessoasContext";
import { Background, HeaderPessoas, PaginaHome, DivImg, BoxPessoas, Toptitulo } from "./PessoaForm.styled";
import { FaSistrix, FaBell } from "react-icons/fa";

import { Formik } from "formik";
import moment from "moment";
import { mascaraCPF, mascaraData } from "../../mascaras";
import Aside from "../../components/Aside/Aside";

function PessoaForm() {
    const { id } = useParams();
    const { pessoa, getPessoaById, handleCreatePessoa, handleUpdatePessoa } = useContext(PessoasContext);
    const [isUpdate, setIsUpdate] = useState(false);

    async function setup() {
        if (id) {
          setIsUpdate(true);
          getPessoaById(id);
        }
      }
    
      useEffect(() => {
        setup();
      }, []);

      const user = pessoa && pessoa[0];

      if (!user && isUpdate) {
        return;
      }


    function goHome() {
        window.location.href = "/home";
      }

    return (
        <>
            <>
                <PaginaHome>
                    <Aside />
                    <Background>
                        <HeaderPessoas>
                            <div>
                                <h1>Pessoa</h1>
                            </div>
                            <div>
                                <FaSistrix />
                                <FaBell />
                                <h3>Usuário</h3>
                            </div>
                        </HeaderPessoas>
                        <BoxPessoas>
                            <div>
                                <h3>Insira os dados abaixo</h3>
                            </div>
                            <Toptitulo>
                                <p>Nome</p>
                                <p>Data de Nascimento</p>
                                <p>CPF</p>
                                <p>E-mail</p>
                                <p> Ação</p>
                            </Toptitulo>


                            <div>
                                {<Formik
                                    initialValues={{
                                        nome: user ? user.nome : "",
                                        dataNascimento: user ? moment(user.dataNascimento, "YYYY-MM-DD").format("DD/MM/YYYY") : "",
                                        cpf: user ? user.cpf : "",
                                        email: user ? user.email : "",
                                    }}
                                    onSubmit={(values, actions) => {

                                        const dadosBackend = {
                                            nome: values.nome,
                                            cpf: values.cpf.replace(/[^0-9]/gi, ""),
                                            dataNascimento: moment(values.dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD"),
                                            email: values.email
                                        }

                                        if (!isUpdate) {
                                            handleCreatePessoa(dadosBackend);
                                        } else {
                                            handleUpdatePessoa(dadosBackend, id)
                                        }
                                    }}>

                                    {props => (
                                        <form onSubmit={props.handleSubmit}>

                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.nome}
                                                name="nome"
                                                placeholder="Nome"
                                            />

                                            <input type="text"
                                                mask={mascaraData}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.dataNascimento}
                                                name="dataNascimento"
                                                placeholder="Data de nascimento"
                                            />

                                            <input type="text"
                                                mask={mascaraCPF}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.cpf}
                                                name="cpf"
                                                placeholder="CPF"
                                            />

                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.email}
                                                name="email"
                                                placeholder="E-mail"
                                            />

                                            {props.errors.name &&
                                                <div id="feedback">{props.errors.name}</div>}

                                            <div>
                                                <button type="submit">{isUpdate ? "Atualizar" : "Cadastrar"}</button>
                                                <button onClick={goHome}>Cancelar</button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>}
                            </div>

                        </BoxPessoas>
                    </Background>
                </PaginaHome>
            </>





        </>
    )
}
export default PessoaForm;