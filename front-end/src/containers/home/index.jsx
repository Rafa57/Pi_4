import { useNavigate } from "react-router-dom";
// import { Title } from "./styles";

import './style.css'

function Home () {

    // <Title>Home</Title>
    const navigate = useNavigate(); //inicia o navegador do react, possibilitando a mudança de rotas

    return (
        <div id="home">
            
            <nav className="navbar sticky-top p-3">
                <img src="./dragao.png" alt="logo" id="logo-dg" />
                <h1>Projeto Dragão</h1>
                <button type="button" className="btn btn-primary mt-3" onClick={() => navigate('/doadores')}>Doadores</button>
            </nav>
            
            <section className="container mt-5">
                <h2>Ações</h2>

                <div className="row g-4">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/acoes/igreja-matriz.webp" className="card-img-top" alt="acao.nome" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Nome da ação</h5>
                                <p className="card-text text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit totam dolorem, excepturi voluptates error nobis consequatur, quas dolore libero ducimus similique unde deserunt quia modi exercitationem vel mollitia, ratione nostrum!</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-auto">Ver Ação</a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/acoes/igreja-matriz.webp" className="card-img-top" alt="acao.nome" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Nome da ação</h5>
                                <p className="card-text text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit totam dolorem, excepturi voluptates error nobis consequatur, quas dolore libero ducimus similique unde deserunt quia modi exercitationem vel mollitia, ratione nostrum!</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-auto">Ver Ação</a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/acoes/igreja-matriz.webp" className="card-img-top" alt="acao.nome" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Nome da ação</h5>
                                <p className="card-text text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit totam dolorem, excepturi voluptates error nobis consequatur, quas dolore libero ducimus similique unde deserunt quia modi exercitationem vel mollitia, ratione nostrum!</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-auto">Ver Ação</a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/acoes/igreja-matriz.webp" className="card-img-top" alt="acao.nome" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Nome da ação</h5>
                                <p className="card-text text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit totam dolorem, excepturi voluptates error nobis consequatur, quas dolore libero ducimus similique unde deserunt quia modi exercitationem vel mollitia, ratione nostrum!</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-auto">Ver Ação</a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/acoes/igreja-matriz.webp" className="card-img-top" alt="acao.nome" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Nome da ação</h5>
                                <p className="card-text text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit totam dolorem, excepturi voluptates error nobis consequatur, quas dolore libero ducimus similique unde deserunt quia modi exercitationem vel mollitia, ratione nostrum!</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-auto">Ver Ação</a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/acoes/igreja-matriz.webp" className="card-img-top" alt="acao.nome" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Nome da ação</h5>
                                <p className="card-text text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit totam dolorem, excepturi voluptates error nobis consequatur, quas dolore libero ducimus similique unde deserunt quia modi exercitationem vel mollitia, ratione nostrum!</p>
                            </div>
                            <a href="#" className="btn btn-primary mt-auto">Ver Ação</a>
                        </div>
                    </div>
                </div>
            </section>

            <div id="rodape">
                <a id="back-top" href="#" className="btn m-3">
                    <img src="/top-page.svg" alt="" />
                </a>
            </div>
        </div>
    )
};

export default Home;