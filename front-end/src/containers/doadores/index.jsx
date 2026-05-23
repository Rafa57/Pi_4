import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    return (
        <div style={{ padding: '20px' }}>

            <h1>Doadores</h1>
            <button onClick={() => navigate('/')}>Home</button>

            <nav style={{marginBottom: '16px'}}>
                <button onClick={() => navigate('/doadores/add')}>Cadastrar Doador</button>
            </nav>

            {erro && <p style={{color: 'white', backgroundColor: 'red', border: '2px solid darkred'}}>
                {erro} 
            </p>}

            {/* <ul style={{ listStyle: 'none'}}>
                {doadores.map(doador => (
                    <li key={doador.id} className='d-inline p-2'>
                        
                        <Link to={`/doadores/${doador.id}`} style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '6px' }}>
                            <strong>Nome:</strong> {doador.name} | <strong>Valor:</strong> {doador.valor}
                        </Link> <button onClick={() => navigate(`/doadores/${doador.id}`)}>Detalhes</button>
                        
                    </li>
                ))}
            </ul> */}

            <table className="table w-auto">
                <thead className="bg-secondary">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Valor</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {doadores.map(doador => (
                        <tr key={doador.id}>
                            <td> {doador.id} </td>
                            <td> {doador.name} </td>
                            <td> {doador.valor} </td>
                            <td><button onClick={() => navigate(`/doadores/${doador.id}`)} type='button' className='btn btn-outline-info'>Detalhes</button>  <button type='button' className='btn btn-outline-danger'>Deletar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Doadores