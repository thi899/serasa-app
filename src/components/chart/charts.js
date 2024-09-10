import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import "./chart.css";

import axios from "axios";
import { useEffect, useState } from "react";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const ShowCharts = () => {
    const getUsersApi = "http://localhost:5000/users";

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get(getUsersApi)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

debugger
    const test = users?.reduce((acc, user) => acc + user.area_total_hectares_fazenda, 0)


    if (users?.length === 0) {
        return <h5 class="no-users">Sem Produtores cadastrados</h5>;
    }

    else
        return (
            <div className="chart">
                <div className="chart__total">
                    <Line
                        data={{
                            labels: ["Total de fazenda", "Total de hectares por fazendas"],
                            datasets: [
                                {
                                    label: "Total de fazendas",
                                    data: { total:10 },
                                    backgroundColor: "#064FF0",
                                    borderColor: "#064FF0",
                                },
                                {
                                    label: "Total de hectares por fazendas",
                                    data: users?.reduce((acc, user) => acc + user.area_total_hectares_fazenda, 0),
                                    backgroundColor: "#FF3030",
                                    borderColor: "#FF3030",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                line: {
                                    tension: 0.5,
                                },
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Total de fazendas e total de hectares",
                                    align: "center"
                                },
                            },
                        }}
                    />
                </div>

                <div className="">
                    <Doughnut
                        data={{
                            labels: [...new Set(users?.map((user) => user?.estado))],
                            datasets: [
                                {
                                    label: "Estado",
                                    data: Object.values(users?.reduce((acc, user) => {
                                        acc[user.estado] = (acc[user.estado] || 0) + 1;

                                        return acc;
                                    }, {})),
                                    backgroundColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                    borderColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Quantidade de fazendas por estado",
                                    align: "center"
                                },
                            },
                        }
                        }
                    />
                </div>


                <div className="">
                    <Doughnut
                        data={{
                            labels: users?.map((user) => user?.culturas_plantadas),
                            datasets: [
                                {
                                    label: "Quantidade de fazendas por cultura",
                                    data: users?.map((user) => user?.culturas_plantadas.length),
                                    backgroundColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                    borderColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Quantidade de culturas",
                                    align: "center"
                                },
                            },
                        }}
                    />
                </div>
                <div className="">
                    <Doughnut
                        data={{
                            labels: users.map((user) => user?.area_agricultavel_hectares),
                            datasets: [
                                {
                                    label: "Quantidade de fazendas por cultura",
                                    data: users?.map((user) => user?.area_agricultavel_hectares.length),
                                    backgroundColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                    borderColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Revenue Sources",
                                },
                            },
                        }}
                    />
                </div>
            </div>
        );
};



export default ShowCharts;