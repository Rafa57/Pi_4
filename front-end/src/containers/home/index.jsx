import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import api from '../../services/api'
// import { Title } from "./styles";

import '/src/assets/styles/global.css';
import './style.css';

function Home () {

    const navigate = useNavigate(); //inicia o navegador do react, possibilitando a mudança de rotas

    const [acoes, setAcoes] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        api.get('acoes/')
        .then(response => {setAcoes(response.data)})
        .catch(error => {
            console.error('Erro ao carregar os dados de ações.', error)
            setErro('Não foi possível conectar ao servidor.')
        })
    }, []);

    const dataFormatada = (dataISO) => {
        return new Date(dataISO).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
    };

    return (
        <div id="home">
            
            <header className="sticky-top"> 
                <div className="d-flex align-items-center gap-4">
                    <img src="./dragao.png" alt="logo" id="logo-dg" />
                    <h1>Projeto Dragão</h1>
                </div>
                <nav className="navbar">
                    <div className="d-flex gap-3">
                        <button type="button" className="btn mt-3" onClick={() => navigate('/doadores')}>Doadores</button>
                        <button type="button" className="btn mt-3" onClick={() => navigate('/addacao')}>Nova Ação</button>
                    </div>
                </nav>
            </header>
            
            <section className="container mt-5">
                <h2>Ações</h2>

                {erro && <p className="alert alert-danger">
                    {erro}    
                </p>}
                    
                <div className="row g-4">
                    {acoes.map(acao => (
                        
                        <div key={acao.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 card-acao shadow-sm">
                                <img 
                                    src={acao.imagem ? acao.imagem : "/acoes/imagem-padrao.png"} 
                                    alt={acao.name} 
                                    className="card-img-top"
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title acao-title">{acao.name}</h5>
                                    <p className="card-text">
                                        {dataFormatada(acao.data)}
                                    </p>
                                </div>
                                <button onClick={() => navigate(`/addacao/${acao.id}`)} className="btn">
                                    Detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer id="rodape" className="mb-0">
                <a href="#" className="back-top btn m-4">
                    <img src="/top-page.svg" alt="" />
                </a>
            </footer>
        </div>
    )
};

export default Home;