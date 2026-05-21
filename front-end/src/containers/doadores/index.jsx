import { useEffect, useState } from 'react'
import api from '../../services/api'

function Doadores() {
    const [doadores, setDoadores] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        api.get('doadores/').then(response => {
            setDoadores(response.data);
        })
        .catch(error => {
            console.error('Erro ao conectar com o backend', error)
            setErro('Não foi possível conectar ao servidor.')
        })
    }, []);

    

    const addDoador = () => {
        let novoDoador = {
            name: 'Jorge',
            idade: 25,
            email: 'jorge@email.com',
            valor: 320.00
        }

        api.post('doadores/', novoDoador)
        .then(response => {console.log('Doador cadastrado com sucesso!', response.data)})
        .catch(error => {console.log('Erro ao cadastrar', error)})
    };

    return (
        <div style={{ padding: '20px' }}>

            <h1>Doadores</h1>

            <nav>
                <button onClick={addDoador}>Cadastrar Doador</button>
            </nav>

            {erro && <p style={{color: 'white', backgroundColor: 'red', border: '2px solid darkred'}}>
                {erro} 
            </p>}

            <section className='lista-doadores'>
                <ul>
                    {doadores.map(doador => (
                        <li style={{listStyleType: 'none'}}>
                            <strong>ID:</strong> {doador.id} | <strong>Nome:</strong> {doador.name} | <strong>Idade:</strong> {doador.idade} | <strong>E-mail:</strong> {doador.email} | <strong>Valor:</strong> {doador.valor}
                        </li>
                    ))}
                </ul>
            </section>
            
        </div>
    )
}

export default Doadores