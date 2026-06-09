import { useState } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';

import './style.css'

function Cadastro() {


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
                if (novoDoador['idade'] <= 0 || novoDoador['valor'] <= 0){
                    alert('Valores negativo não são permitidos')
                    return
                };
                if (novoDoador['idade'] < 18){
                    alert('O doador deve ter 18 anos ou mais.')
                    return
                };
                console.log('Cadastro realizado', response.data)
                setNome('');
                setIdade('');
                setEmail('');
                setValor('');
            })
            .catch(error => {console.error('Erro ao cadastrar', error)})
    };
    
    return (
        <div id="cadastro" className="p-4">
            <div className="d-flex align-items">
                <Link to={'/doadores'} className="back-link">
                    <p>{'<voltar /'}</p>
                </Link>
                <h1>Cadastrar Doador</h1>
            </div>
            
            <form onSubmit={addDoador} method="post" className="form p-4">

                <label htmlFor="nome" className="form-label">Nome</label>
                <input 
                    type="text" 
                    id="nome" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    required 
                    className="form-control" 
                />
                <br />
                
                <label htmlFor="idade" className="form-label">Idade</label>
                <input 
                    type="number" 
                    id="idade" 
                    value={idade} 
                    onChange={(e) => setIdade(e.target.value)} 
                    required
                    className="form-control"
                />
                <br />

                <label htmlFor="email" className="form-label">E-mail</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    className="form-control"
                />
                <br />

                <label htmlFor="valor" className="form-label">Valor da doação (R$) </label>
                <input 
                    id="valor" 
                    type="number" 
                    step="0.01" 
                    value={valor} 
                    onChange={(e) => setValor(e.target.value)} 
                    required
                    className="form-control"
                />
                <br />

                <button type="submit" className="btn m-3 ms-0">Salvar Cadastro</button>
            </form>

        </div>
    )
}

export default Cadastro