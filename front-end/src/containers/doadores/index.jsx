import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'

function Doadores() {
    const navigate = useNavigate();
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

    // const addDoador = () => {
    //     let novoDoador = {
    //         name: 'Jorge',
    //         idade: 25,
    //         email: 'jorge@email.com',
    //         valor: 320.00
    //     }

    //     api.post('doadores/', novoDoador)
    //     .then(response => {console.log('Doador cadastrado com sucesso!', response.data)})
    //     .catch(error => {console.error('Erro ao cadastrar', error)})
    // };

    return (
        <div style={{ padding: '20px' }}>

            <h1>Doadores</h1>
            
            <nav style={{marginBottom: '16px'}}>
                {/* <button onClick={addDoador}>Cadastrar Doador</button> */}
                <button onClick={() => navigate('/doadores/add')}>2 cadastrar doador</button>
            </nav>

            {erro && <p style={{color: 'white', backgroundColor: 'red', border: '2px solid darkred'}}>
                {erro} 
            </p>}

            <table className='lista-doadores' style={{border: '1px solid black'}}>
                <ul style={{border: '1px solid red'}}>
                    {doadores.map(doador => (
                        <a href="" style={{textDecoration: 'none', color: 'black'}}>
                            <li style={{listStyleType: 'none', padding: '6px', border: '1px solid green'}}>
                                <strong>ID:</strong> {doador.id} | <strong>Nome:</strong> {doador.name} | <strong>Idade:</strong> {doador.idade} | <strong>E-mail:</strong> {doador.email} | <strong>Valor:</strong> {doador.valor}
                            </li>
                        </a>
                    ))}
                </ul>
            </table>
            
        </div>
    )
}

export default Doadores