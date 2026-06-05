import { useNavigate, useParams, Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import api from '../../services/api'

import './style.css'

function Info() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [doador, setDoador] = useState(null);
    const [erro, setErro] = useState(null);

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
            <div style={{padding:'20px'}}><p>Carregando...</p></div>   
        )
    };

    return (
        <div style={{padding: '20px'}}>

            <header className="d-flex align-items">
                <Link to={'/doadores'} style={{textDecoration: 'none', color: '#666', fontSize: '20px', margin:'6px'}}>{'<voltar /'}</Link>
                <h2>Ficha do doador</h2>
            </header>

            <section id="card" className="card p-4 col-sm-6 col-xl-4">
                <p id="card-id" className="m-0">{doador.id}</p>
                <h2>{doador.name}</h2>
                <hr />
                
                <div className="card-info">
                    <div className=" d-flex gap-5 m-3">
                        <div>
                            <h3 style={{fontSize: '1.3em'}}>Idade</h3>
                            <p> {doador.idade} </p>
                        </div>
                    
                        <div>
                            <h3>E-mail</h3>
                            <p> {doador.email} </p>
                        </div>
                    </div>
                    
                    <div className="m-3">
                        <h3>Total Doado</h3>
                        <p> R$ {doador.valor} </p>
                    </div>
                </div>
                
                <div className="card-btn m-2">
                    <button className="btn btn-sm ">Editar Cadastro</button>
                    <button className="btn btn-sm ">Adicionar doação</button>
                </div>
                
                <hr />
                <div className="list-acao d-flex align-items">
                    <h2>Ações</h2>
                    <select name="List" id="" style={{border: 'none'}}></select>
                </div>
                
            </section>
        </div>
    )
};

export default Info