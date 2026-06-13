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

    const delAcao = async () => {
        const confirmDel = window.confirm(`Tem certeza que quer deletar a ação: ${acao.name}`);

        if (confirmDel) {
            try{
                api.delete(`acoes/${id}/`);
                alert("Ação excluída com sucesso! Voltando para a pagina inicial...");
                navigate(`/`);
            } catch (error) {
                console.error("Erro ao tentar excluir", error);
                alert('Erro ao tentar excluir ação');
            };
        };
    };

    const editando = () => {
        setEditForm(true);
        setNvNome(acao.name || '');
        setNvLocal(acao.local || '');
        setNvData(acao.data ? acao.data.substring(0, 16) : '');
        setNvDescricao(acao.descricao || '');
        setNvImagem(null);
    };

    const cancelForm = () => {
        setEditForm(false);
        setNvNome('');
        setNvLocal('');
        setNvData('');
        setNvImagem(null);
        setNvDescricao('');
    };
    
    const dataFormatada = (dataISO) => {
        if(!dataISO) return "Não informada";
        return new Date(dataISO).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    };

    const salvarEdit = async (e) => {
        e.preventDefault();

        if(nvData) {
            const dataInvalida = new Date(nvData)
            const dataAtual = new Date()
            if (dataInvalida <= dataAtual) {
                alert('A data deve estar no futuro');
                return;
            }
        }
        
        const formData = new FormData();
        formData.append('name', nvNome.toUpperCase());
        formData.append('local', nvLocal);
        formData.append('descricao', nvDescricao);

        if (nvImagem instanceof File) {
            formData.append('imagem', nvImagem);
        }

        try {
            const response = await api.patch(`acoes/${id}/`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            setAcao(response.data);
            setEditForm(false);
            alert('Dados atualizados com sucesso!');
            setNvImagem(null);
        } catch (error) {
            console.error('Erro ao tentar salvar', error);
            alert('Não foi possivel salvar as alterações. Verifique os dados inseridos.');
        }
    };

    if(erro) {
        return (
            <div style={{padding: '20px'}}>
                <p className="alert alert-danger">{erro}</p>
                <button onClick={() => navigate('/')} className="btn">Voltar</button>
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
            <div className="d-flex gap-5">
                
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
                            <h5>Descrição</h5>
                            <p className="card-text">
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
                            <div className="card-buttons d-flex gap-3 ms-0">
                                <button onClick={editando} className="btn">Editar Ação</button>
                                <button onClick={delAcao} className="btn">Apagar Ação</button>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h2>Histórico de Doações</h2>
                            {acao.doacoes_acao && acao.doacoes_acao.length > 0 ? (
                                <div className="table-responsive col-xl-8">
                                    <table className="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID Doação</th>
                                                <th>Doador</th>
                                                <th>Data/Hora</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {acao.doacoes_acao.map(doacao => (
                                                <tr key={doacao.id} className="align-middle">
                                                    <td>{doacao.id}</td>
                                                    <td>{doacao.doador_detalhes?.name || `Doador ID: ${doacao.doador}`}</td>
                                                    <td>{dataFormatada(doacao.data)}</td>
                                                    <td className="text-success fw-bold">R$ {parseFloat(doacao.valor).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-muted">Nenhuma doação foi registrada para esta ação até o momento.</p>
                            )}
                        </div>
                    </section>
                </div>
                {editForm && (
                    <div>
                        <form className="card" onSubmit={salvarEdit}>
                            <div>
                                <label className="form-label" htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    value={nvNome}
                                    onChange={(e) => setNvNome(e.target.value)}
                                    className="form-control"
                                />
                                <label className="form-label" htmlFor="nome">Local</label>
                                <input
                                    type="text"
                                    value={nvLocal}
                                    onChange={(e) => setNvLocal(e.target.value)}
                                    className="form-control"
                                />
                                <label className="form-label" htmlFor="nome">Data</label>
                                <input
                                    type="datetime-local"
                                    value={nvData}
                                    onChange={(e) => setNvData(e.target.value)}
                                    className="form-control"
                                />
                                <label className="form-label" htmlFor="nome">Imagem</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNvImagem(e.target.files[0])}
                                    className="form-control"
                                />
                                <label
                                    className="form-label" htmlFor="nome">Descrição</label>
                                <textarea
                                    id="descricao"
                                    rows={3}
                                    value={nvDescricao}
                                    onChange={(e) => setNvDescricao(e.target.value)}
                                    className="form-control"
                                ></textarea>
                            </div>
                            <div className="d-flex gap-3 mt-3 mb-0">
                                <button type="submit" className="btn">Salvar</button>
                                <button type="button" onClick={cancelForm} className="btn">Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
export default InfoAcao;