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
    const [selecao, setSelecao] = useState(false);

    function ex_select() {
        setCheckBox(true)
        setCancel(true);
        setSelecao(true);
    }
    function mudancaCheck(e){
        setCheckBox(e.target.checked);
    }
    function selCancel() {
        setCheckBox(false)
        setCancel(false)
        setSelecao(false)
    }

    return (
        <div style={{ padding: '20px' }}>

            <header className='header' >
                <h1 style={{display:'flex', alignItems:'center'}}>
                    <Link to={`/`} style={{textDecoration: 'none', color: 'black', fontSize: '20px', margin:'6px'}}>{'<voltar /'}</Link>
                    Doadores
                </h1>
            </header>

            {erro && <p style={{color: 'white', backgroundColor: 'red', border: '2px solid darkred'}}>
                {erro} 
            </p>}

            <div className='mt-5 p-3'>

                <table className="table table-hover table-bordered">
                    <thead className="text-center sticky-top bg-white">
                        <tr>
                            <th colSpan={3} className='p-0'>
                                <nav className='m-2 d-flex gap-1 col-12'>
                                    
                                    <button onClick={() => navigate('/doadores/add')} className='btn btn-md btn-primary m-1'><img src="/btn_add.svg" alt="Adicionar" /></button>
                                
                                    <button id='delete_btn' className='btn m-1' onClick={ex_select}><img src="/btn_delete.svg" alt="Excluir doador"/></button>
                                </nav>

                                <nav className='d-inline'>
                                    {cancel && (
                                        <button className='btn btn-primary m-2'>Limpar Seleção</button>
                                    )}
                                    {selecao && (
                                        <button className='btn btn-primary btn-sm' onClick={selCancel}>
                                            <img src="/btn_cancel.svg" alt="Cancelar seleção" />
                                        </button>
                                    )}
                                </nav>
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
                            <tr key={doador.id} onClick={() => navigate(`/doadores/${doador.id}`)} style={{cursor: 'pointer'}} className='align-middle'>
                                
                                <td className='i-check'> 
                                    <tr>
                                        {checkBox && (
                                            <input 
                                                id='box' 
                                                className='form-check-input' type="checkbox" onClick={(e) => {
                                                    mudancaCheck
                                                    e.stopPropagation()
                                                }}
                                            />
                                        )}
                                    </tr>
                                    <tr>{doador.id}</tr>
                                </td>
                                
                                <td> {doador.name} </td>
                                <td> {doador.valor} </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                
            </div>
            
        </div>
    )
};

export default Doadores