import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');
    const [valor, setValor] = useState('');

    const addDoador = (e) => {
        e.preventDefault();

        let novoDoador = {
            name: nome,
            idade: parseInt(idade),
            email: email,
            valor: parseFloat(valor)
        };
        
        api.post('doadores/', novoDoador)
            .then(response => {
                console.log('Cadastro realizado', response.data)
                setNome('');
                setIdade('');
                setEmail('');
                setValor('');
            })
            .catch(error => {console.error('Erro ao cadastrar', error)})
    };
    
    return (
        <div style={{padding: '20px', maxWidth: '500px'}}>
            <button onClick={() => navigate('/doadores')}>Lista de doadores</button>

            <form onSubmit={addDoador} method="post">
                <label htmlFor="nome">
                    Nome:
                    <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </label>
                <br />

                <label htmlFor="idade">
                    Idade:
                    <input type="number" name="idade" value={idade} onChange={(e) => setIdade(e.target.value)} required/>
                </label>
                <br />

                <label htmlFor="email">
                    E-mail:
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>
                <br />

                <label htmlFor="valor">
                    Valor da doação (R$):
                    <input type="number" step="0.01" name="valor" value={valor} onChange={(e) => setValor(e.target.value)} required/>
                </label>
                <br />

                <button type="submit">Salvar Cadastro</button>
            </form>

        </div>
    )
}

export default Cadastro