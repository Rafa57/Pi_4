import { useEffect, useState } from "react";
import api from '../../services/api'
// import { Title } from "./styles";

function Home () {

    // <Title>Home</Title>

    const [doadores, setDoadores] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        api.get('doadores/').then(response => {
            setDoadores(response.data);
        }).catch(error => {
            console.error('Erro ao conectar com o backend', error);
            setErro('Não foi possível carregar os dados do servidor.');
        });
    }, []);

    const addDoador = () => {
        const novoDoador = {
            name: 'Glauber',
            idade: '25',
            email: 'glauber@email.com',
            valor: '250.00'
        };

        api.post('doadores/', novoDoador)
            .then(response => {console.log('Doador cadastrado com sucesso!', response.data)})
            .catch(error => {console.log('Erro ao cadastrar', error)});
    };

    return (
        <div style={{padding: '20px'}}>
            <h1>Lista de Doadores</h1>

            <nav>
                <button onClick={addDoador}>Cadastrar Doador</button>
            </nav>
            
            {erro && <p style={{color: 'darkred'}}> {erro} </p>}

            <ul>
                {doadores.map(doador => (
                    <li>
                        <strong>ID:</strong> {doador.id} | <strong>Nome:</strong> {doador.name} | <strong>Idade:</strong> {doador.idade} | <strong>email:</strong> {doador.email} | <strong>Valor:</strong> {doador.valor}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Home;