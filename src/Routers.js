import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { PessoasProvider } from "./context/PessoasContext";
import CadastroContato from "./pages/Contato/CadastroContato";
import Contato from "./pages/Contato/Contato";
import CadastroEndereco from "./pages/Endereco/CadastroEndereco";
import Endereco from "./pages/Endereco/Endereco";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PessoaForm from "./pages/Login/PessoaForm";
import NaoEncontrado from "./pages/NaoEncontrado/NaoEncontrado";
import Usuarios from "./pages/Usuarios/Usuarios";

const Routers = () => {

    // const { logado } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <AuthProvider>
                <PessoasProvider>
                    <Routes>
                    {/* {!logado ? (
                        <> */}
                        <Route path="/home" element={<Home />} />
                        <Route path="/editar/:id" element={<PessoaForm />} />
                        <Route path="/cadastrar" element={<PessoaForm />} />
                        <Route path="/cadastrar-endereco/:id" element={<CadastroEndereco />} />
                        <Route path="/atualizar-endereco/:id" element={<CadastroEndereco />} />
                        <Route path="/enderecos/:id" element={<Endereco />} />
                        <Route path="/contato" element={<Contato />} />
                        <Route path="/cadastrar-contato/:id" element={<CadastroContato />} />
                        <Route path="/atualizar-contato/:id" element={<CadastroContato />} />
                        {/* </>
                        ) : (
                        <> */}
                        <Route path="/" element={<Login />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        {/* </>
                        )
                    } */}
                        <Route path="*" element={<NaoEncontrado />} />
                    </Routes>
                </PessoasProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Routers;