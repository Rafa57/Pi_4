import { useNavigate, useParams, Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import api from '../../services/api'

import './style.css'

function Info() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [doador, setDoador] = useState(null);
    const [erro, setErro] = useState(null);

    //inputs da edição
    const [nvNome, setNvNome] = useState('');
    const [nvIdade, setNvIdade] = useState('');
    const [nvEmail, setNvEmail] = useState('');
    const [nvValor, setNvValor] = useState('');

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

    const [editForm, setEditForm] = useState(false);

    function editando () {
        setNvNome(doador.name || '');
        setNvIdade(doador.idade || '');
        setNvEmail(doador.email || '');
        setEditForm(true);
    };

    function editCancel () {
        setEditForm(false);
        setNvNome('');
        setNvIdade('');
        setNvEmail('');
        setNvValor('');
    };

    const salvarEdit = async (e) => {
        e.preventDefault();

        const dadosNovos = {
            name: nvNome || doador.name,
            idade: nvIdade !== '' ? parseInt(nvIdade) : doador.idade,
            email: nvEmail || doador.email,
            valor: nvValor !== '' ? parseInt(nvValor) : doador.valor
        };

        try{
            const response = await api.patch(`doadores/${id}/`, dadosNovos);
            setDoador(response.data);
            setEditForm(false);
            alert("Dados atualizados com sucesso!")

        } catch (error) {
            console.error('Erro ao tentar atualizar os dados: ', error)
            if (error.response) {
                console.log('Resposta de erro do Django: ', error.response.data);
            }
            alert('Não foi possível salvar as alterações. Verifique os dados inseridos');
        }
        setNvNome(doador.name)
        setNvIdade(doador.idade)
        setNvEmail(doador.email)        
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
                <section id="card" className="card col-sm-6 col-xl-4">

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
                            <p> R$ {doador.valor_total} </p>
                        </div>
                    </div>
                
                    <div className="card-btn m-2">
                        <button className="btn btn-sm " onClick={editando}>Editar Cadastro</button>
                        <button className="btn btn-sm ">Adicionar doação</button>
                    </div>
                
                    <hr />
                    <div className="list-acao d-flex align-items">
                        <h2>Doações</h2>
                        <select name="List" id="" style={{border: 'none'}}></select>
                    </div>
                </section>
                {editForm && (
                    <div className="edit-form p-4">
                        <form onSubmit={salvarEdit} className="d-block align-items">
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
            </div>
                
        </div>
    )
};

export default Info