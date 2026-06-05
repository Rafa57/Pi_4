import { useState } from "react";
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
            <button className='btn btn-primary m-2 ms-0' onClick={() => navigate('/doadores')}>Lista de doadores</button>

            <form onSubmit={addDoador} method="post" className="form-control">

                <label htmlFor="nome" className="form-label">Nome: </label><br />
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <br />
                
                <label htmlFor="idade">Idade: </label><br />
                <input type="number" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} required/>
                <br />

                <label htmlFor="email">E-mail: </label><br />
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <br />

                <label htmlFor="valor">Valor da doação (R$): </label><br />
                <input type="number" step="0.01" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} required/>
                <br />

                <button type="submit">Salvar Cadastro</button>
            </form>

        </div>
    )
}

export default Cadastro