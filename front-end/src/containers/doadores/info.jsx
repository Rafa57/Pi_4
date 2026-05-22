import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import api from '../../services/api'

function Info() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [doador, setDoador] = useState(null);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        api.get(`/doadores/${id}`)
            .then(response => {
                setDoador(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar doador', error)
                setErro('Doador não encontrado')
            });

    }, [id]);

    if(erro) {
        return (
            <div style={{padding: '20px'}}>
                <p>{erro}</p>
                <button onClick={() => navigate('/doadores')}>Voltar</button>
            </div>
        )
    };
    if(!doador){
     return (
            <div style={{padding:'20px'}}><p>Carregando...</p></div>   
        )
    };

    return (
        <div>
            <button onClick={() => navigate('/doadores')}>Voltar</button>
            <h2>Ficha do doador</h2>

            <nav>
                <button>teste</button>
            </nav>
            <section id="ficha" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginTop: '15px'}}>
                <h3>ID</h3>
                <p>{doador.id}</p>

                <h3>Nome</h3>
                <p> {doador.name} </p>
                
                <h3>Idade</h3>
                <p> {doador.idade} </p>
                
                <h3>E-mail</h3>
                <p> {doador.email} </p>
                
                <h3>Valor Doado</h3>
                <p> {doador.valor} </p>
                
            </section>
        </div>
    )
};

export default Info