import { useNavigate, useParams, Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import api from '../../services/api'

import './style.css'

function Info() {
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [doador, setDoador] = useState(null);
    const [erro, setErro] = useState(null);
    
    // BOTOES
    const [editForm, setEditForm] = useState(false);
    
    // SELECT DE DOAÇÕES
    const [acoes, setAcoes] = useState([]);
    const [acaoSelect, setAcaoSelect] = useState('');
    const [doacoesFiltradas, setDoacoesFiltradas] = useState([]);
    
    // INPUTS DA EDIÇÃO
    const [nvNome, setNvNome] = useState('');
    const [nvIdade, setNvIdade] = useState('');
    const [nvEmail, setNvEmail] = useState('');
    
    useEffect(() => {
        api.get(`/doadores/${id}`)
        .then(response => {
            setDoador(response.data)
        })
        .catch(error => {
            console.error('Erro ao buscar doador', error)
            setErro('Doador não encontrado')
        });
    }, [id]);
    
    useEffect(() => {
        api.get(`acoes/`)
        .then(response => {
            setAcoes(response.data);
        })
        .catch(error => {
            console.error('Erro ao buscar ações', error);
            setErro('Não foi possível acessar as ações');
        });
    }, []);

    useEffect(() => {
        api.get(`doacoes/?doador=${id}`).then(response => {
            setDoacoesFiltradas(response.data);
        }).catch(error => {
            console.error("Erro ao carregar histórico de doações", error);
        });
    }, [id]);
    
    const handleAcaoChange = (e) => {
        const acaoId = e.target.value;
        setAcaoSelect(acaoId);

        const url = acaoId ? `doacoes/?doador=${id}&acao=${acaoId}` : `doacoes/?doador=${id}`;
        
        api.get(url)
        .then(response => {
            setDoacoesFiltradas(response.data);
        })
        .catch(error => {
            console.error('Erro ao buscar doaçoes da ação', error);
        });
    };
    
    function editando () {
        setNvNome(doador.name || '');
        setNvIdade(doador.idade || '');
        setNvEmail(doador.email || '');
        setEditForm(true);
    };
    
    function editCancel () {
        const cancel = window.confirm('Cancelar edição?');
        if (cancel) {
            setEditForm(false);
            setNvNome('');
            setNvIdade('');
            setNvEmail('');
        } else {
            setEditForm(true);
        };
    };
    
    const salvarEdit = async (e) => {
        e.preventDefault();
        
        const dadosNovos = {
            name: nvNome || doador.name,
            idade: nvIdade !== '' ? parseInt(nvIdade) : doador.idade,
            email: nvEmail || doador.email,
        };
        // valor: nvValor !== '' ? parseInt(nvValor) : doador.valor
        
        try{
            if(dadosNovos['idade'] <= 0 || dadosNovos['idade'] > 150) {
                alert("Idade inválida! Deve ser entre 18 e 150 anos");
                return;
            };
           
            const response = await api.patch(`doadores/${id}/`, dadosNovos);
            setDoador(response.data);
            setEditForm(false);
            alert("Dados atualizados com sucesso!")
            
        } catch (error) {
            console.error('Erro ao tentar atualizar os dados.', error);
            alert('Não foi possível salvar as alterações. Verifique os dados inseridos');
        }
               
    };

    // FORM DOACAO
    const [formDoacao, setFormDoacao] = useState(false);
    const [valorDoacao, setValorDoacao] = useState('');
    const [doacaoSelect, setDoacaoSelect] = useState('');

    const handleDoacaoChange = (e) => {
        const acaoId = e.target.value;
        setDoacaoSelect(acaoId);
    };
    
    const addDoacao = (e) => {
        e.preventDefault();

        if (!doacaoSelect) {
            alert("Selecione uma ação para doar")
            return;
        }
        if (parseFloat(valorDoacao) <= 0 || isNaN(valorDoacao)) {
            alert('Insira uma valor válido de doação');
            return;
        }
        const novaDoacao = {
            doador: id,
            acao: doacaoSelect,
            valor: parseFloat(valorDoacao),
        };

        api.post('doacoes/', novaDoacao)
            .then(() => {
                alert('Doação registrada com sucesso');
                setValorDoacao('');
                setDoacaoSelect('');
                setFormDoacao(false);

                api.get(`/doadores/${id}`).then(response => setDoador(response.data))

                const urlAtualizada = acaoSelect ? `doacoes/?doador=${id}&acao=${acaoSelect}` : `doacoes/?doador=${id}`

                return api.get(urlAtualizada);
            })
            .then(response => {
                if(response) setDoacoesFiltradas(response.data);
            })
            .catch(error => {
                console.error('Erro ao registrar doação', error)
                alert('Erro ao tentar registrar a doação');
            });
    };
    
    const cancelDoacao = () => {
        setDoacaoSelect('');
        setValorDoacao('');
        setFormDoacao(false);
    };
    
    if(erro) {
        return (
            <div style={{padding: '20px'}}>
                <p>{erro}</p>
                <button onClick={() => navigate('/doadores')}>Voltar</button>
            </div>
        )
    };
    if(!doador){
        return (
            <div className="container mt-4" style={{padding:'20px'}}><p>Carregando...</p></div>   
        )
    };

    return (
        <div id="info" className="p-4">

            <div className="d-flex align-items">
                <Link to={'/doadores'} className="back-link">
                    <p>{'<voltar /'}</p>
                </Link>
                <h1>Ficha do doador</h1>
            </div>

            <div className="d-flex gap-5">
                <section id="card" className="card col-sm-6 col-xl-4 shadow-sm">

                    <p id="card-id" className="m-0">{doador.id}</p>
                    <h2>{doador.name}</h2>
                    <hr />
                
                    <div className="card-info">
                        <div className=" d-flex gap-5 m-3">
                            <div>
                                <h3>Idade</h3>
                                <p> {doador.idade} </p>
                            </div>
                
                            <div>
                                <h3>E-mail</h3>
                                <p> {doador.email} </p>
                            </div>
                        </div>
                
                        <div className="m-3">
                            <h3>Total Doado</h3>
                            <p> R$ {doacoesFiltradas.reduce((total, doacao) => total + parseFloat(doacao.valor), 0).toFixed(2)} </p>
                        </div>
                    </div>
                
                    <div className="card-btn m-2">
                        <button className="btn btn-sm " onClick={editando}>Editar Cadastro</button>
                        <button className="btn btn-sm " onClick={() => setFormDoacao(true)}>Adicionar doação</button>
                    </div>
                
                    <hr />
                    <div className="list-acao d-block align-items">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <h2>Doações</h2>
                            <select 
                                id="select-acao" 
                                value={acaoSelect}
                                onChange={handleAcaoChange}
                                className="form-select"
                            >
                                <option value="">--Selecione uma Ação--</option>
                                {acoes.map(acao => (
                                    <option key={acao.id} value={acao.id}>
                                        {acao.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <table className="table">
                            <thead>
                                <tr className="col">
                                    <th scope="col" >Valor</th>
                                    <th scope="col" >Ação</th>
                                    <th scope="col" >Data</th>
                                </tr>
                            </thead>

                            <tbody>
                                {doacoesFiltradas.length === 0 ? (
                                    <tr>
                                        <td colSpan={'3'} className="text-center text-muted py-3">
                                            Nenhuma doação registrada
                                        </td>
                                    </tr>
                                ) : (
                                    doacoesFiltradas.map(doacao => (
                                        <tr key={doacao.id}>
                                            <td>
                                                R$ {parseFloat(doacao.valor).toFixed(2)}
                                            </td>
                                            <td>
                                                {acoes.find(a => a.id == doacao.acao)?.name || 'Ação'}
                                            </td>
                                            <td>
                                                {new Date(doacao.data).toLocaleDateString('pt-BR')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {editForm && (
                    <div className="edit-form p-4">
                        <form onSubmit={salvarEdit} className="d-block align-items shadow rounded">
                            <h2>Editar Cadastro</h2>
                            <hr />
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label><br />
                                <input 
                                    type="text" 
                                    value={nvNome}
                                    onChange={(e) => setNvNome(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="idade" className="form-label">Idade</label><br />
                                <input 
                                    type="number" 
                                    value={nvIdade}
                                    onChange={(e) => setNvIdade(e.target.value)} 
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label><br />
                                <input 
                                    type="email" 
                                    value={nvEmail}
                                    onChange={(e) => setNvEmail(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <hr />
                                <div className="d-flex gap-3 justify-content-center">
                                    <button type='submit' className="btn btn-primary btn-sm">Salvar</button>

                                    <button type="button" className="btn btn-primary btn-sm" onClick={editCancel}>Cancelar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                {formDoacao && (
                    <div>
                        <form onSubmit={addDoacao} className="card">
                            <div className="mb-3">
                                <label htmlFor="valor-doacao" className="form-label">Valor (R$)</label>
                                <input 
                                    id="valor-doacao"
                                    type="number"
                                    step={"0.01"}
                                    min={"0.01"}
                                    placeholder="0.00"
                                    value={valorDoacao}
                                    onChange={(e) => setValorDoacao(e.target.value)}
                                    className="form-control" 
                                    required
                                />
                            </div>
                            <div>
                                <select 
                                    name="" 
                                    id=""
                                    value={doacaoSelect}
                                    onChange={handleDoacaoChange}
                                    className="form-select"
                                >
                                    <option value="">--Selecione uma Ação--</option>
                                    {acoes.map(acao => (
                                        <option key={acao.id} value={acao.id}>
                                            {acao.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-flex gap-3 mt-3">
                                <button type="submit" className="btn">Confirmar Doação</button>
                                <button type="button" onClick={cancelDoacao} className="btn">Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
                
        </div>
    )
};

export default Info;