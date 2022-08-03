import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PessoasContext } from "../../context/PessoasContext";
import { Background, HeaderPessoas, PaginaHome, BoxPessoas, Radio } from "./CadastroEndereco.styled";
import { FaSistrix, FaBell } from "react-icons/fa";
import { Formik } from "formik";
import Aside from "../../components/Aside/Aside";
import * as Yup from 'yup';
import { API, APICEP } from "../../api";

const EnderecoSchema = Yup.object().shape({
    tipo: Yup.string()
        .required("Campo obrigatório"),
    logradouro: Yup.string()
        .min(3, "Muito curto, mínimo 3 caracteres")
        .max(100, "Muito longo, máximo 100 caracteres")
        .required("Campo obrigatório"),
    numero: Yup.number("Digite número")
        .required("Campo obrigatório"),
    cep: Yup.string()
        .min(8, "CEP inválido")
        .max(9, "CEP inválido")
        .required("Digite um CEP"),
    cidade: Yup.string()
        .min(3, 'Muito curto, mínimo 3 caracteres')
        .max(100, "Muito longo, máximo 100 caracteres")
        .required("Campo obrigatório"),
    estado: Yup.string()
        .min(3, "Muito curto, mínimo 3 caracteres")
        .max(100, "Muito longo, máximo 100 caracteres")
        .required("Campo obrigatório"),
    pais: Yup.string()
        .min(3, "Muito curto, mínimo 3 caracteres")
        .max(100, "Muito longo, máximo 100 caracteres")
        .required("Campo obrigatório"),
});


function CadastroEndereco() {
    const { idPessoa, idEndereco } = useParams();
    const [endereco, setEndereco] = useState({});
    const { getPessoaById, getEndereco, handleCreateEndereco, handleUpdateEndereco } = useContext(PessoasContext);
    const [isUpdate, setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(true);


    async function setup() {
        try {
            const { data } = await API.get(`/endereco/${idEndereco}`);
            setEndereco(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Não foi possível encontrar o endereço");
        }
    }

    useEffect(() => {
        idEndereco ? setup() : setLoading(false);
      }, []);


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
                                <h1>Endereço</h1>
                            </div>
                            <div>
                                <FaSistrix />
                                <FaBell />
                                <h3>Usuário</h3>
                            </div>
                        </HeaderPessoas>
                        <BoxPessoas>
                            <div>
                                <h3>Insira o endereço abaixo</h3>
                            </div>


                            <div>
                                {<Formik
                                    initialValues={{
                                        tipo: "",
                                        logradouro: "",
                                        numero: "",
                                        complemento: "",
                                        cep: "",
                                        cidade: "",
                                        estado: "",
                                        pais: "",

                                    }}
                                    // validationSchema={EnderecoSchema}
                                    onSubmit={(values, actions) => {

                                        const dadosBackend = {
                                            tipo: values.tipo,
                                            logradouro: values.logradouro,
                                            numero: values.numero,
                                            complemento: values.complemento,
                                            cep: values.cep.replace(/[^0-9]/gi, ""),
                                            cidade: values.cidade,
                                            estado: values.estado,
                                            pais: values.pais,
                                        }

                                        if (!isUpdate) {
                                            handleCreateEndereco(dadosBackend);
                                        } else {
                                            handleUpdateEndereco(dadosBackend, idEndereco)
                                        }
                                    }}>

                                    {props => (
                                        <form onSubmit={props.handleSubmit}>
                                            <Radio>
                                                <div>
                                                    <label htmlFor="tipo">
                                                        <input type="radio"
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.tipo}
                                                            name="tipo"
                                                        /> RESIDENCIAL
                                                    </label>
                                                </div>
                                                <div>
                                                    <label htmlFor="tipo">
                                                        <input type="radio"
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            value={props.values.tipo}
                                                            name="tipo"
                                                        /> COMERCIAL

                                                    </label>
                                                </div>
                                            </Radio>

                                            <label htmlFor="logradouro">Logradouro *</label>
                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.logradouro}
                                                name="logradouro"
                                                placeholder="Logradouro"
                                            />
                                            <label htmlFor="numero">Número *</label>
                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.numero}
                                                name="numero"
                                                placeholder="Número"
                                            />

                                            <label htmlFor="complemento">Complemento</label>
                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.complemento}
                                                name="complemento"
                                                placeholder="Complemento"
                                            />

                                            <label htmlFor="cep">CEP *</label>
                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.cep}
                                                name="cep"
                                                placeholder="CEP"
                                            />

                                            <label htmlFor="cidade">Cidade *</label>
                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.cidade}
                                                name="cidade"
                                                placeholder="Cidade"
                                            />

                                            <label htmlFor="estado">Estado *</label>
                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.estado}
                                                name="estado"
                                                placeholder="Estado"
                                            />

                                            <label htmlFor="pais">País *</label>
                                            <input type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.pais}
                                                name="pais"
                                                placeholder="País"
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
export default CadastroEndereco;