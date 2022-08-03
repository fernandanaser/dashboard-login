import { createContext, useState } from "react";
import { API } from "../api";


const PessoasContext = createContext();

function PessoasProvider({ children }) {

    const [pessoas, setPessoas] = useState([]);
    const [pessoa, setPessoa] = useState();
    const [endereco, setEndereco] = useState([]);


    // ★★★ NAVEGAÇÃO ★★★
    function goUpdate(idPessoa) {
        window.location.href = `/editar/${idPessoa}`;
    }

    // ⮞⮞⮞ CRUD PESSOAS ⮜⮜⮜

    // ★★★ POST: create ★★★
    async function handleCreatePessoa(usuario) {
        try {
            const { data } = await API.post(`/pessoa`, usuario);
            console.log(data)
            alert("Usuário Cadastrado com sucesso!")
            window.location.href = "/home";
        } catch (error) {
            alert(error)
        }
    }

    // ★★★ GET: read ★★★
    async function getPessoas() { // lista completa de pessoas
        try {
            console.log("entrou get pessoas")
            const { data } = await API.get("/pessoa?pagina=0&tamanhoDasPaginas=20", {
                headers: {
                    Authorization: localStorage.getItem("token") //the token is a variable which holds the token
                }
            })
            setPessoas(data.content);
        } catch (error) {
            alert(error);
        }
    };

    async function getPessoaById(id) { // uma pessoa por id
        try {
            const { data } = await API.get(`/pessoa/lista-completa?idPessoa=${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token") //the token is a variable which holds the token
                }
            })
            setPessoa(data);
        } catch (error) {
            alert(error);
        }
    }

    // ★★★ PUT: update ★★★
    async function handleUpdatePessoa(usuario, id) {
        console.log("entrou handleUpdatePessoa")
        try {
            await API.put(`/pessoa/${id}`, usuario, {
                headers: {
                    Authorization: localStorage.getItem("token") //the token is a variable which holds the token
                }
            })
            window.location.href = "/home"
        } catch (error) {
            alert(error)
        }
    }

    // ★★★ DELETE: delete ★★★
    async function handleDeletePessoa(idPessoa) {
        try {
            await API.delete(`/pessoa/${idPessoa}`);
            // window.location.href = "/pessoa";
            getPessoas();
        } catch (error) {
            alert(error);
        }
    };

    // ⮞⮞⮞ CRUD ENDEREÇO ⮜⮜⮜

    // ★★★ POST: create ★★★
    async function handleCreateEndereco(endereco) {
        //TODO como pegar o idPessoa da pag anterior via parametro?
        const myArray = window.location.href.split("/");
        console.log(myArray)
        let idPessoa = myArray[myArray.length-1]
        
        
        //TODO pegar do radioButton
        endereco.tipo = "COMERCIAL";
        
        //let idPessoa = 663;
        console.log(idPessoa)
        try {
            const { data } = await API.post(`/endereco/{idPessoa}?idPessoa=${idPessoa}`, endereco, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
            });
            alert("Endereço cadastrado com sucesso!");
            window.location.href = `/endereco${idPessoa}`
            console.log(data)
        } catch (error) {
            alert(error)
        }
    }

    // ★★★ GET: read ★★★    
    async function getEndereco(idPessoa) {
        try {
            //TODO como pegar o idPessoa da pag anterior via parametro?
            const myArray = window.location.href.split("/");
            console.log(myArray)
            idPessoa = myArray[myArray.length-1]
            const { data } = await API.get(`/endereco/retorna-por-id-pessoa?idPessoa=${idPessoa}`, {
                headers: {
                      Authorization: localStorage.getItem("token")
                    }
                })
                setEndereco(data);
            } catch (error) {
                alert(error);
            }
        }
    

        // ★★★ PUT: update ★★★
        async function handleUpdateEndereco(usuario, id) {
            const myArray = window.location.href.split("/");
            console.log(myArray)
            let idPessoa = myArray[myArray.length-1]

            console.log("entrou handleUpdateEndereco")
            try {
                await API.put(`/endereco/${idPessoa}`, usuario, {
                    headers: {
                      Authorization: localStorage.getItem("token")
                    }
                })
                window.location.href = `/endereco${idPessoa}`
            } catch (error) {
                alert(error)
            }
        }

    // ★★★ DELETE: delete ★★★
    async function handleDeleteEndereco(idEndereco) {
        try {
            await API.delete(`/endereco/${idEndereco}`);
            window.location.href = "/endereco";
        } catch (error) {
            alert(error);
        }
    };



    return (
        <PessoasContext.Provider value={{
            handleCreatePessoa,
            getPessoas,
            getPessoaById,
            handleUpdatePessoa,
            handleDeletePessoa,
            goUpdate,
            pessoas,
            pessoa,
            endereco,
            handleCreateEndereco,
            getEndereco,
            handleUpdateEndereco,
            handleDeleteEndereco
        }}>
            {children}
        </PessoasContext.Provider>
    )
}

export { PessoasProvider, PessoasContext };