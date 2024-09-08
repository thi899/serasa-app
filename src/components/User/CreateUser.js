import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './User.css';
import {cpfMask} from '../../masks/cpf-mask.js'
const CreateUser = () => {
    const navigate = useNavigate();
    const createUserApi = "http://localhost:3000/show-user"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        cpf_cnpj: "",
        nome_produtor: "",
        nome_fazenda: "",
        cidade: "",
        estado: "",
        area_total_hectares_fazenda: "",
        area_agricultavel_hectares: "",
        area_vegetacao_hectares: "",
        culturas_plantadas: ""
    });

    const [errorMessage, setErrorMessage] = React.useState("");

    const handleInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setUser({ ...user, [name]: value });
    }

    const handleCpfInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        const valueWithMaskCpf = cpfMask(value);
        console.log(name);
        console.log(value);
        var numberPattern = /\d+/g;

        const onlyNumbersValue = value?.match(numberPattern)?.join('');

        console.log("onlyNumbersValue", onlyNumbersValue)

        if(onlyNumbersValue?.length !== 11 || onlyNumbersValue?.length !== 14) {
            setErrorMessage("Cpf ou Cnpj Inválido")
        }

                        if(onlyNumbersValue?.length === 11 ||  onlyNumbersValue?.length === 14 || onlyNumbersValue === undefined) {
                        setErrorMessage("")
                }


        setUser({ ...user, [name]: valueWithMaskCpf });
    }

    const handleSubmit = async (event) => {
    event.preventDefault();
        console.log(user)
        try {
            setIsLoading(true);
            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({        
                    cpf_cnpj: "",
                    nome_produtor: "",
                    nome_fazenda: "",
                    cidade: "",
                    estado: "",
                    area_total_hectares_fazenda: "",
                    area_agricultavel_hectares: "",
                    area_vegetacao_hectares: "",
                    culturas_plantadas: ""})
                navigate('/show-user');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>Cadastro de Produtores</p>
            </div>
            <form className='row' onSubmit={handleSubmit}>
                <div className='column'>

                <div className="col-smmb-3">
                    <label for="name" className="form-label">CPF/CNPJ</label>
                    <input maxLength={18} type="text" className="form-control" id="cpf_cnpj" name="cpf_cnpj" value={user.cpf_cnpj} onChange={handleCpfInput} />
                    {errorMessage && <div className="error-message"> {errorMessage} </div>}
                </div>
                <div className="mb-3 mt-3">
                    <label for="nome_produtor" className="form-label">Nome Produtor</label>
                    <input type="nome_produtor" className="form-control" id="nome_produtor" name="user.nome_produtor" value={user.email} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Nome Fazenda</label>
                    <input type="text" className="form-control" id="nome_fazenda" name="nome_fazenda" value={user.nome_fazenda} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Cidade</label>
                    <input type="text" className="form-control" id="cidade" name="cidade" value={user.cidade} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Estado</label>
                    <input type="text" className="form-control" id="estado" name="estado" value={user.estado} onChange={handleInput} />
                </div>

                </div>

                <div className='column'>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Área total em hectares da fazenda</label>
                    <input type="text" className="form-control" id="area_total_hectares_fazenda" name="area_total_hectares_fazenda" value={user.area_total_hectares_fazenda} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Área agricultável em hectares</label>
                    <input type="text" className="form-control" id="area_agricultavel_hectares" name="area_agricultavel_hectares" value={user.area_agricultavel_hectares} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Área de vegetação em hectares</label>
                    <input type="text" className="form-control" id="area_vegetacao_hectares" name="area_vegetacao_hectares" value={user.area_vegetacao_hectares} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Culturas plantadas</label>
                    <button type="button" class="btn-icon-info mx-2" data-toggle="tooltip" data-placement="top" title="Soja, Milho, Algodão, Café, Cana de Açucar">
                    <i class="bi bi-info-circle-fill"></i>
                    </button>
                    <input type="text" className="form-control" id="culturas_plantadas" name="culturas_plantadas" value={user.culturas_plantadas} onChange={handleInput} />
                </div>
                <div className="container_button-submit">
                <button type="submit" className="btn btn-primary submit-btn">Adicionar</button>
                </div>

                </div>
            </form>

        </div>
    )
}

export default CreateUser