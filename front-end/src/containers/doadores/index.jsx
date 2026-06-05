import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


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

    function menuSelect() {
        setCheckBox(true)
        setCancel(true);
        setSelecao(true);
    }
    
    function selCancel() {
        setCheckBox(false);
        setCancel(false);
        setSelecao(false);
        setListaSel([]);
    }

    const [listaSel, setListaSel] = useState([]);

    const selecionados = (id, checado) => {
        if(checado) {
            setListaSel([...listaSel, id]);
        } else {
            setListaSel(listaSel.filter(item => item != id));
        }
    };

    const delSelect = async () => {
        if(listaSel.length === 0) {
            alert('Selecione um doador para deletar')
            return;
        }

        const confirmDel = window.confirm(`Tem certeza que deseja excluir ${listaSel.length} doadores?:`);

        if(confirmDel) {
            try {
                await Promise.all(
                    listaSel.map(id => api.delete(`doadores/${id}/`))
                );
                alert('Doadores excluidos com sucesso!');
                setListaSel([]);
                selCancel();
                window.location.reload();
            } catch (erro) {
                console.error('Erro ao excluir doador(es):', erro);
                alert('Houve um erro ao tentar excluir alguns registros.');
            }
        }
    };

    const cliqueNaLinha = (doadorId) => {
        if(checkBox) {
            const jaSelecionado = listaSel.includes(doadorId);
            selecionados(doadorId, !jaSelecionado);
        } else {
            navigate(`/doadores/${doadorId}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>

            <header className='header d-flex align-items' >
                <h1 style={{display:'flex', alignItems:'center'}}>
                    <Link to={`/`} style={{textDecoration: 'none', color: '#666', fontSize: '20px', margin:'6px'}}>{'<voltar /'}</Link>
                    Doadores
                </h1>
            </header>

            {erro && <p className='alert alert-danger'>
                {erro} 
            </p>}

            <div className='mt-2 p-3 col-xl-6'>

                <table className="table table-hover table-bordered">
                    <thead className="text-center sticky-top bg-white">
                        <tr>
                            <th colSpan={3} className='p-0'>
                                <nav className='m-2 mb-0 d-flex gap-1 col-12'>
                                    
                                    <button onClick={() => navigate('/doadores/add')} className='btn btn-md btn-primary m-1'><img src="/btn_add.svg" alt="Adicionar" /></button>
                                
                                    <button id='delete_btn' className='btn m-1' onClick={menuSelect}><img src="/btn_delete.svg" alt="Excluir doador"/></button>
                                </nav>

                                <nav className='d-flex gap-1 align-items-left ms-2 mb-2'>
                                    {selecao && (
                                        <button id='btn-cancel' className='btn btn-primary btn-sm m-1' onClick={selCancel}>
                                            <img src="/btn_cancel.svg" alt="Cancelar seleção" />
                                        </button>
                                    )}
                                    {cancel && (
                                        <button className='btn btn-primary m-1' onClick={delSelect} style={{ opacity: selecionados.length > 0 ? 1 : 0.5 }}>Excluir selecionado(s)</button>
                                    )}

                                    {listaSel.length > 0 && <span id='qtd-sel' className='text-muted m-1'>{listaSel.length}</span>}
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
                            <tr 
                                key={doador.id} 
                                onClick={() => cliqueNaLinha(doador.id)} 
                                style={{cursor: 'pointer'}} 
                                className='align-middle'
                            >
                                
                                <td className='i-check'>
                                    <div>
                                        {checkBox && (
                                            <input
                                                type="checkbox"
                                                id='box'
                                                className='form-check-input'
                                                checked={listaSel.includes(doador.id)}
                                                onChange={(e) => selecionados(doador.id, e.target.checked)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        )}

                                        <span>{doador.id}</span>
                                    </div>
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