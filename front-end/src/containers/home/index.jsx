import { useNavigate } from "react-router-dom";
// import { Title } from "./styles";

function Home () {

    // <Title>Home</Title>
    const navigate = useNavigate(); //inicia o navegador do react, possibilitando a mudança de rotas

    return (
        <div style={{padding: '20px'}}>
            <h1>Lista de Doadores</h1>

            <nav>
                <button type="button" onClick={() => navigate('/doadores')}>Doadores</button>
            </nav>
            
            <section className="eventos">
                <h1>Eventos</h1>
                <div style={{
                    border:'2px solid darkgreen',
                    backgroundColor: 'lightcyan',
                    borderRadius: '10px',
                    padding: '20px',
                    }}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nostrum aspernatur molestiae, blanditiis natus, accusamus quasi iure commodi ab neque voluptatum similique provident explicabo, dolorem eum eveniet itaque expedita nihil.</p>

                </div>
            </section>
                
        </div>
    )
};

export default Home;