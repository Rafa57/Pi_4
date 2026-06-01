import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './style.css';

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

    const [checkBox, setCheckBox] = useState(false);
    const [cancel, setCancel] = useState(false);
    function ex_select() {
        setCheckBox(true);
        setCancel(true);

    }

    return (
        <div style={{ padding: '20px' }}>

            <header className='header' >
                <h1 style={{display:'flex', alignItems:'center'}}>
                    <Link to={`/`} style={{textDecoration: 'none', color: 'black', fontSize: '20px'}}>{'<voltar/'}</Link>
                    Doadores
                </h1>
                {/* <nav className='nav'>
                    <button onClick={() => navigate('/')}>Home</button>
                </nav> */}
            </header>

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

            <div className='mt-5 p-3'>
                {/* <nav className='mb-2 d-flex gap-2 sticky-top'>
                    <button onClick={() => navigate('/doadores/add')} className='btn btn-md btn-primary'>Cadastrar Doador</button>
                    
                    <button id='delete_btn' className='btn' onClick={ex_select}><img src="../../public/btn_delete.svg" alt="Excluir doador"/></button>
                </nav> */}

                <table className="table table-hover table-bordered">
                    <thead className="text-center sticky-top bg-white">
                        <tr>
                            <th colSpan={3} className='p-0 border-0'>
                                <nav className='m-2 d-flex gap-2 col-12'>
                                    
                                    <button onClick={() => navigate('/doadores/add')} className='btn btn-md btn-primary'><img src="../../public/btn_add.svg" alt="" /></button>
                                
                                    <button id='delete_btn' className='btn' onClick={ex_select}><img src="../../public/btn_delete.svg" alt="Excluir doador"/></button>
                                </nav>
                                {cancel && (
                                    <button className='btn btn-primary btn-sm'>Cancelar seleção</button>
                                )}
                            </th>
                        </tr>
                        
                        <tr className='col'>
                            <th scope="col" style={{width: '30%'}}>ID</th>
                            <th scope="col" style={{width: '45%'}}>Nome</th>
                            <th scope="col" style={{width: '25%'}}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doadores.map(doador => (
                            <tr key={doador.id} onClick={() => navigate(`/doadores/${doador.id}`)} style={{cursor: 'pointer'}} className='table-hover-custom'>
                                <td> {doador.id} </td>
                                <td> {doador.name} </td>
                                <td> R$ {doador.valor} </td>
                            </tr>
                        ))}
                        {doadores.map(doador => (
                            <tr key={doador.id} onClick={() => navigate(`/doadores/${doador.id}`)} style={{cursor: 'pointer'}} className='table-hover-custom'>
                                <td> 
                                    {checkBox && (
                                        <input className='i-check' type="checkbox"/>
                                    )}
                                    {doador.id} 
                                </td>
                                <td> {doador.name} </td>
                                <td> {doador.valor} </td>
                            </tr>
                        ))}
                        
                        {/* {doadores.map(doador => (
                            <tr key={doador.id}>
                                <td> {doador.id} </td>
                                <td> {doador.name} </td>
                                <td> {doador.valor} </td>
                                <td className='d-flex justify-content-center gap-2'>
                                    <button onClick={() => navigate(`/doadores/${doador.id}`)} type='button' className='btn btn-outline-info btn-sm'>Detalhes</button>
                                    <button type='button' className='btn btn-outline-danger btn-sm'>Deletar</button>
                                </td>
                            </tr>
                        ))}  */}

                    </tbody>
                </table>
                
            </div>
            
        </div>
    )
};

export default Doadores