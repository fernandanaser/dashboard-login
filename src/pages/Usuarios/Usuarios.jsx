import { Form, Formik, Field, ErrorMessage} from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as Yup from 'yup';
import { LoginContainer, Background, Divform, Required, Fieldform } from './Usuarios.styled';
import Logo from "../../components/Logo/Logo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const SignupSchema = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'Muito curto, deve possuir no mínimo 2 caracteres.')
        .max(50, 'Muito longo, deve possuir no máximo 50 caracteres.')
        .required('Este campo é obrigatório.'),
    senha: Yup.string()
        .min(2, 'Senha muito curta, deve possuir no mínimo 2 caracteres.')
        .max(50, 'Senha muito longa, deve possuir no máximo 50 caracteres.')
        .required('Este campo é obrigatório.'),
});

const Usuarios = () => {
    const { handleSignUp } = useContext(AuthContext);

    function goLogin() {
        window.location.href = "/";
    }

    function signUp() {
        handleSignUp()
    }


    return (
        <Background>
            <LoginContainer>
                <Logo />
                <h2>Dashboard Kit</h2>
                <h1>Cadastrar novo usuário</h1>
                <small>Insira usuário e senha abaixo</small>
                <Formik
                    initialValues={{
                        login: '',
                        senha: '',
                    }}
                    validationSchema={SignupSchema}
                    // onSubmit={values => {
                        // handleSignUp(values)}}

                >
                    {({ errors, touched }) => (
                        <Form>
                            <Divform>
                                <label htmlFor="login">NOME DE USUÁRIO</label>

                                <Fieldform id="login" name="login" type="text" placeholder="Nome de suário" />
                                {errors.login && touched.login ? (
                                    <Required>{errors.login}</Required>
                                ) : null}

                                <label htmlFor="senha">SENHA</label>

                                <Fieldform id="senha" name="senha" type="password" placeholder="Senha" />
                                {errors.senha && touched.senha ? (
                                    <Required>{errors.senha}</Required>
                                ) : null}

                                <button onClick={signUp}>Cadastrar</button>
                                <button onClick={goLogin}>Voltar</button>
                            </Divform>
                        </Form>
                    )}
                </Formik>
            </LoginContainer>
        </Background>
    )
}

export default Usuarios;