import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/userSlice.js";

const ShowUser = () => {
  const getUsersApi = "http://localhost:5000/users";

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
    
  }, []);

  const getUsers = () => {
    axios
      .get(getUsersApi)
      .then((res) => {
        debugger
        dispatch(changeUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const state = useSelector((state) => state?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setIsLoading(true);

    try {
      const response = await fetch(getUsersApi.concat("/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const users = state?.user?.filter((item) => item.id !== id);
      dispatch(changeUser(users));

    } catch (error) {
      setError(state.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!state?.user[0]?.id) {
    return <h5 class="no-users">Sem Produtores cadastrados</h5>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cpf Cnpj</th>
              <th>Nome Produtor</th>
              <th>Nome Fazenda</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Área total em hectares da fazenda</th>
              <th>Área agricultável em hectares</th>
              <th>Área de vegetação em hectares</th>
              <th>Culturas Plantadas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {state?.user?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{item?.id}</td>
                  <td>{item?.cpf_cnpj}</td>
                  <td>{item?.nome_produtor}</td>
                  <td>{item?.nome_fazenda}</td>
                  <td>{item?.cidade}</td>
                  <td>{item?.estado}</td>
                  <td>{item?.area_total_hectares_fazenda}</td>
                  <td>{item?.area_agricultavel_hectares}</td>
                  <td>{item?.area_vegetacao_hectares}</td>
                  <td>{item?.culturas_plantadas}</td>
                  <td className="d-flex justify-content-between">
                    <Link to={`/edit-user/${item?.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handleDelete(item?.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowUser;
