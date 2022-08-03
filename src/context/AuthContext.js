import { createContext, useEffect, useState } from "react";
import { API } from "../api";
import Loading from "../components/Loading/Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [logado, setLogado] = useState(false);
    const [loading, setLoading] = useState(true);

    // ★★ fazer uma função geral para verificar se está logado ★★
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token existe " + token)
        if (token) {
            API.defaults.headers.common["Authorization"] = token;
            setLogado(true);
        }
        setLoading(false);
    }, []);

    // ★★ fazer handle login em context, try catch ★★
    async function handleLogin(usuario) {
        try {
            const { data } = await API.post("/auth", usuario)
            localStorage.setItem("token", data);
            API.defaults.headers.common["Authorization"] = data;
            setLogado(true);
            window.location.href = "/home";
        } catch (error) {
            toast.error("Usuário ou senha inválidos");
            console.log(error)
        }
    }

    // ★★ funcao handleLogout para deslogar para apagar o token ★★
    function handleLogout() {
        console.log("deslogando")
        localStorage.removeItem("token");
        API.defaults.headers.common["Authorization"] = undefined;
        setLogado(false);
        window.location.href = "/";
    }

    // ★★ função handleSignUp para cadastrar usuario e volta para página de login ★★
    async function handleSignUp(usuario) {
        let nomeInput = document.getElementById("login").value;
        let senhaInput = document.getElementById("senha").value;
        let inputJson = {
            login : nomeInput,
            senha : senhaInput
        }
        try {
            await API.post("/auth/create", inputJson)
            alert("Usuário cadastrado com sucesso!")
            window.location.href = "/";
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    function goCadastro() {
        window.location.href = "/usuarios";
    }

    function goHome() {
        window.location.href = "/home";
    }

    if (loading) {
        return (<Loading />)
    }

    return (
        <AuthContext.Provider value={{
            handleLogin,
            handleLogout,
            handleSignUp,
            setLoading,
            logado,
            goCadastro,
            goHome
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// exportar as duas funções juntas
export { AuthProvider, AuthContext };