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
                    
                    {/* <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/acoes/igreja-matriz.webp" className="card-img-top" alt="acao.nome" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Nome da ação</h5>
                                <p className="card-text text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit totam dolorem, excepturi voluptates error nobis consequatur, quas dolore libero ducimus similique unde deserunt quia modi exercitationem vel mollitia, ratione nostrum!</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-auto">Ver Ação</a>
                        </div>
                    </div> */}

                    {acoes.map(acao => (
                        <div className="col-12 col-md col-lg-4">
                            <div className="card h-100 shadow-sm">
                                <img src="/acoes/igreja-matriz.webp" alt='foto da ação' className="card-img-top" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{acao.name}</h5>
                                    <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro voluptatem quam hic, cum magni molestiae ut molestias? Est quaerat quisquam cupiditate. Sequi excepturi quaerat rem, a natus magnam ad ullam?</p>
                                </div>
                                <a href="#" className="btn">Ver Ação</a>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </section>

            <div id="rodape">
                <a href="#" className="back-top btn m-3">
                    <img src="/top-page.svg" alt="" />
                </a>
            </div>
        </div>
    )
};

export default Home;