import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import api from '../../services/api';
import './style.css';

function InfoAcao() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [acao, setAcao] = useState(null);
    const [erro, setErro] = useState(null);
    const [editForm, setEditForm] = useState(false);

    // inputs da edição
    const [nvNome, setNvNome] = useState('');
    const [nvLocal, setNvLocal] = useState('');
    const [nvData, setNvData] = useState('');
    const [nvImagem, setNvImagem] = useState(null);
    const [nvDescricao, setNvDescricao] = useState('');

    useEffect(() => {
        api.get(`/acoes/${id}`)
        .then(response => {
            setAcao(response.data);
        }).catch(error => {
            console.error('Erro ao buscar ação', error)
            setErro('Ação não encontrada')
        })
    }, [id]);

    const editando = () => {
        setEditForm(true);
    };

    const cancelForm = () => {
        setEditForm(false);
        setNvNome('');
        setNvLocal('');
        setNvData('');
        setNvImagem('');
        setNvDescricao('');
    };

    // const salvarEdit = () => {

    // }
    
    const dataFormatada = (dataISO) => {
        return new Date(dataISO).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    };

    if(erro) {
        return (
            <div style={{padding: '20px'}}>
                <p>{erro}</p>
                <button onClick={() => navigate('/doadores')}>Voltar</button>
            </div>
        )
    };
    if(!acao) {
        return (
            <div className="container mt-4" style={{padding:'20px'}}><p>Carregando...</p></div>   
        )
    };

    return (
        <div id="info-acao" className="p-4">
            <div className="d-flex align-items">
                <Link to={`/`} className="back-link">{'<voltar /'}</Link>
                <h1>Detalhes da Ação</h1>
            </div>
            
            <div className="card shadow">
                <section>
                    <div className="d-flex align-items-center">
                        <img 
                            src={acao.imagem ? acao.imagem : "/acoes/imagem-padrao.png"} 
                            alt={acao.name}
                        />
                        <div>
                            <p className="mb-0"> <strong><i>ID:</i></strong> <i>{acao.id}</i></p>
                            <h2>{acao.name}</h2>
                        </div>
                    </div>
                    
                    <div className="ms-3 mt-4">
                        <p className="card-text">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque perferendis fugit aliquid quia quaerat earum, quo, sequi quod vitae consequatur dolorem tempora, unde illo similique dicta aspernatur tempore sit accusantium.
                            {acao.descricao}
                        </p>
                    </div>
                    <hr />
                    <div className="ms-3">
                        <div className="d-flex gap-5 mb-4">
                            <div>
                                <h3>Local</h3>
                                <p>{acao.local}</p>
                            </div>
                            <div>
                                <h3>Data</h3>
                                <p>{dataFormatada(acao.data)}</p>
                            </div>
                        </div>
                        <div>
                            <h3>Total Arrecadado</h3>
                            <p>R$ {acao.total_arrecadado || 0.0}</p>
                        </div>
                        <div>
                            <button onClick={editando} className="btn">Editar Ação</button>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex ms-3">
                        <h2>Doações</h2>
                        <select 
                            name="doacoes" 
                            id=""
                            style={{border: 'none'}}
                        ></select>
                    </div>
                </section>

            </div>
            {editForm && (
                <div>
                    <form>
                        <div>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                            />
                            <label htmlFor="nome">Local</label>
                            <input
                                type="text"
                            />
                            <label htmlFor="nome">Data</label>
                            <input
                                type="datetime-local"
                            />
                            <label htmlFor="nome">Imagem</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNvImagem(e.target.files[0])}
                                value={nvImagem}
                            />
                            <label htmlFor="nome">Descrição</label>
                            <textarea
                                id="descricao"
                                value={nvDescricao}
                                onChange={(e) => setNvDescricao(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <button>Salvar</button>
                            <button onClick={() => cancelForm}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
export default InfoAcao;