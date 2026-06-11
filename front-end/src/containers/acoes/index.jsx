import { useState } from "react";
import { Link } from "react-router-dom";

import api from '../../services/api';
import './style.css'

function Acoes() {
    const [nomeAcao, setNomeAcao] = useState('');
    const [localAcao, setLocalAcao] = useState('');
    const [dataAcao, setDataAcao] = useState('');

    const addAcao = (e) => {
        e.preventDefault();

        const dataDigitada = new Date(dataAcao);
        const dataAtual = new Date();
        if(dataDigitada.getTime() <= dataAtual.getTime()) {
            alert('A data da ação deve estar no futuro.')
            return
        };

        let novaAcao = {
            name: nomeAcao,
            local: localAcao,
            data: dataAcao
        };

        api.post('acoes/', novaAcao)
        .then(response => {
            console.log('Acao adicionada com sucesso!', response.data);
            alert('Ação cadastrada com sucesso!')
            setNomeAcao('');
            setLocalAcao('');
            setDataAcao('');

        }).catch(error => {
            console.error('Erro ao cadastrar ação.', error)
            alert('Erro ao tentar realizar o cadastro');
        });
    };

    return (
        <div id="add-acao" className="p-4">
            <div className="d-flex align-items">
                <Link to={'/'} className="back-link">
                    <p>{'<voltar /'}</p>
                </Link>
                <h1>Nova Ação</h1>
            </div>

            <div>
                <form onSubmit={addAcao} className="form p-4 shadow rounded">

                    <label htmlFor="nome-acao" className="form-label mt-2">Nome</label>
                    <input 
                        id="nome-acao" 
                        type="text" 
                        value={nomeAcao} 
                        onChange={(e) => setNomeAcao(e.target.value)} 
                        className="form-control"
                        required
                    />

                    <label htmlFor="local-acao" className="form-label mt-3">Local</label>
                    <input 
                        id="local-acao"
                        type="text" 
                        value={localAcao}
                        onChange={(e) => setLocalAcao(e.target.value)}
                        className="form-control"
                        required
                    />

                    <label htmlFor="data-acao" className="form-label mt-3">Data</label>
                    <input 
                        id="data-acao"
                        type="datetime-local" 
                        value={dataAcao}
                        onChange={(e) => setDataAcao(e.target.value)}
                        className="form-control"
                        required
                    />
                    <hr />
                    <div className="mt-4">
                        <button type="submit" className="btn">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Acoes;