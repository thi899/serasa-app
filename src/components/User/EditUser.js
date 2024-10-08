import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
import { cpfMask } from '../../masks/cpf-mask.js'
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/userSlice.js";

const EditUser = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = "http://localhost:5000/users";


  const [errorMessageCpfCnpj, setErrorMessageCpfCnpj] = useState("");

  const [errorMessageTotalAreaFarm, setErrorMessageTotalAreaFarm] = useState("");

  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    setUser(state.user[0])
  };

  const handleSelectInput = (event) => {
    event.preventDefault();
    const { name } = event.target;

    const select = document.getElementById("culturas_plantadas");
    const options = select.options;
    let listSelectOptions = [""];
    let value = "";

    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        listSelectOptions.push(options[i].value);

        value = listSelectOptions.toString().replace(",", "");
      }
    }

    setUser({ ...user, [name]: value });
  }

  const handleTotalFarmAreaInput = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    if (+user.area_vegetacao_hectares + +user.area_agricultavel_hectares > value) {
      setErrorMessageTotalAreaFarm("A soma de área agrícultável e vegetação, não pode ser maior que a área total da fazenda");
      setDisabled(true);
    }

    else {
      setErrorMessageTotalAreaFarm("");
      setDisabled(false);
    }

    setUser({ ...user, [name]: value });
  }

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleCpfInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    const valueWithMaskCpf = cpfMask(value);

    var numberPattern = /\d+/g;

    const onlyNumbersValue = value?.match(numberPattern)?.join('');

    if (onlyNumbersValue?.length !== 11 || onlyNumbersValue?.length !== 14) {
      setErrorMessageCpfCnpj("Cpf ou Cnpj Inválido")
    }

    if (onlyNumbersValue?.length === 11 || onlyNumbersValue?.length === 14 || onlyNumbersValue === undefined) {
      setErrorMessageCpfCnpj("")
    }


    setUser({ ...user, [name]: valueWithMaskCpf });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(getUserApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        debugger
        dispatch(changeUser(data));
        setIsLoading(true);
        navigate("/show-user");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      })
  };

  return (
    <div className='user-form'>
      <div className='heading'>
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Editar Cadastro de Produtores</p>
      </div>

      <form className='row' onSubmit={handleSubmit}>
        <div className='column'>

          <div className="mb-3">
            <label for="name" className="form-label">CPF/CNPJ</label>
            <input required maxLength={18} type="text" className="form-control" id="cpf_cnpj" name="cpf_cnpj" value={user.cpf_cnpj} onChange={handleCpfInput} />
            {errorMessageCpfCnpj && <span className="error-message"> <i class="mx-1 fa fa-exclamation-circle text-danger bg-light border-0" aria-hidden="true"></i> {errorMessageCpfCnpj} </span>}
          </div>
          <div className="mb-3 mt-3">
            <label for="nome_produtor" className="form-label">Nome Produtor</label>
            <input required type="text" className="form-control" id="nome_produtor" name="nome_produtor" value={user.nome_produtor} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label for="pwd" className="form-label">Nome Fazenda</label>
            <input required type="text" className="form-control" id="nome_fazenda" name="nome_fazenda" value={user.nome_fazenda} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label for="pwd" className="form-label">Cidade</label>
            <input required type="text" className="form-control" id="cidade" name="cidade" value={user.cidade} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label for="pwd" className="form-label">Estado</label>
            <input required type="text" className="form-control" id="estado" name="estado" value={user.estado} onChange={handleInput} />
          </div>

        </div>

        <div className='column'>
          <div className="mb-3">
            <label for="pwd" className="form-label">Área agricultável em hectares</label>
            <input required type="number" className="form-control" id="area_agricultavel_hectares" name="area_agricultavel_hectares" value={user.area_agricultavel_hectares} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label for="pwd" className="form-label">Área de vegetação em hectares</label>
            <input required type="number" className="form-control" id="area_vegetacao_hectares" name="area_vegetacao_hectares" value={user.area_vegetacao_hectares} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label for="pwd" className="form-label">Área total em hectares da fazenda</label>
            <input required type="number" className="form-control" id="area_total_hectares_fazenda" name="area_total_hectares_fazenda" value={user.area_total_hectares_fazenda} onChange={handleTotalFarmAreaInput} />
            {errorMessageTotalAreaFarm && <span className="error-message"> <i class="mx-1 fa fa-exclamation-circle text-danger bg-light border-0" aria-hidden="true"></i> {errorMessageTotalAreaFarm} </span>}
          </div>

          <div className="d-flex justify-content-evenly align-items-center mb-3">
            <div class="d-flex align-items-start">
              <button type="button" class="btn-icon-info mx-2" data-toggle="tooltip" data-placement="top" title="Mantenha pressionado o botão Ctrl (Windows) ou Command (Mac) para selecionar várias opções.">
                <i class="bi bi-info-circle-fill"></i>
              </button>
              <label for="pwd" className="form-label">Culturas plantadas</label>
            </div>

            <select required onChange={handleSelectInput} name="culturas_plantadas" id="culturas_plantadas" multiple>
              <option value="soja">soja</option>
              <option value="milho">milho</option>
              <option value="Algodão">Algodão</option>
              <option value="Café">Café</option>
              <option value="Cana de Açucar">Cana de Açucar</option>
            </select>
          </div>
          <div className="container_button-submit">
            <button disabled={isDisabled ? true : false} type="submit" className="btn btn-primary submit-btn">Editar</button>
          </div>

        </div>
      </form>

    </div>
  )
}
export default EditUser;