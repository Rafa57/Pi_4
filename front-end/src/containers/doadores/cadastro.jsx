import { useState } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';

import './style.css'

function Cadastro() {

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');

    const addDoador = (e) => {
        e.preventDefault();

        const idadeNum = parseInt(idade)
        const verificarNome = () => {
            const temNumChar = /^[a-zA-Zà-úÀ-Ú\s]+$/;
            return temNumChar.test(nome);
        };

        if (!verificarNome) {
            alert("O nome deve conter apenas letras e espaços");
            return
        };
        if (idadeNum <= 0){
            alert("Valores negativos ou zerados não são permitidos para a idade")
            return
        };
        if (idadeNum < 18){
            alert('O doador deve ter 18 anos ou mais.')
            return
        };

        let novoDoador = {
            name: nome.toUpperCase(),
            idade: idadeNum,
            email: email
        };

        api.post('doadores/', novoDoador)
            .then(response => {
                console.log('Cadastro realizado', response.data);
                alert('Doador cadastrado com sucesso!');
                setNome('');
                setIdade('');
                setEmail('');
            })
            .catch(error => {
                console.error('Erro ao cadastrar', error);
                alert("Erro ao tentar realizar o cadastro");
            });
    };
    
    return (
        <div id="cadastro" className="p-4">
            <div className="d-flex align-items">
                <Link to={'/doadores'} className="back-link">
                    <p>{'<voltar /'}</p>
                </Link>
                <h1>Cadastrar Doador</h1>
            </div>
            
            <form onSubmit={addDoador} method="post" className="form p-4 shadow rounded">

                <label htmlFor="nome" className="form-label">Nome</label>
                <input 
                    type="text" 
                    id="nome" 
                    value={nome.toUpperCase()} 
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
                <hr/>
                <div>
                    <button type="submit" className="btn m-3 ms-0">Salvar Cadastro</button>
                </div>
            </form>

        </div>
    )
}

export default Cadastro