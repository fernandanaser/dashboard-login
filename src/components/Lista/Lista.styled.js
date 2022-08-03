import styled from 'styled-components';

export const ContainerLista = styled.div`
    /* box-sizing: border-box; */
    width: 82vw;
    height: 100%;
    /* margin: auto; */
    padding: 24px 32px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: flex-start;
    padding: 0;
    justify-content: center;


`

export const ItensCard = styled.div`
    width: 78vw;
    display: grid;
    gap: 30px;
    margin: 0 auto;
    padding: 24px 32px;
    border-bottom: 1px solid #DFE0EB;
    :hover {
        background: #F7F8FF;
    }
    img {
        margin-left: -60px;
        margin-right: 15px;
    }

    p {
        width: 180px;
        color: #252733;
    }

`
export const Dados = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    p {
        margin-left: 20px;
    }
`

export const Botoes = styled.div`
    width: 200px;

    button {
        width: 85px !important;
        margin: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:first-child {
        background-color: #FEC400;
        border-radius: 2rem;
        padding: 5px;
        :hover{
            background-color: #a18a3b
        }
    }
    button:nth-child(2) {
        background-color: #F12B2C;
        border-radius: 2rem;
        padding: 5px;
        :hover {
            background-color: #d13535
        }
    }
    button:nth-child(3) {
        background-color: #29CC97;
        border-radius: 2rem;
        padding: 5px;
        :hover {
            background-color: #22aa7d;
        }
    }
`
export const ItensCardEndereco = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
    align-content: initial;
    flex-wrap: wrap;
    width: 78vw;
    margin: 0 auto;
    padding: 0;
    border-bottom: 1px solid #DFE0EB;
    :hover {
        background: #F7F8FF;
    }
`