import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { contarChavesValores, somarAreas } from "../utils/utils.js"

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
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };




    if (users?.length === 0) {
        return <h5 class="no-users">Sem Produtores cadastrados</h5>;
    }

    else
        return (
            <div className="chart">
                <div className="chart__total">
                    <Line
                        data={{
                            labels: ["Total de fazendas"],
                            datasets: [
                                {
                                    label: "Total de fazendas",
                                    data: { "fazendas": users?.length },
                                    backgroundColor: "#064FF0",
                                    borderColor: "#064FF0",
                                },
                                {
                                    label: "Total de fazendas em hectares",
                                    data: {
                                        "Total de hectares": users?.reduce((acc, farm) => {

                                            return acc + Number(farm.area_total_hectares_fazenda);
                                        }, 0)
                                    },
                                    backgroundColor: "#2F4F4F",
                                    borderColor: "#2F4F4F",
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
                                    text: "Total de fazendas",
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
                            labels: [...new Set(users?.map(item => item.culturas_plantadas).join(',').split(','))],
                            datasets: [
                                {
                                    label: "Quantidade de fazendas por cultura",
                                    data: contarChavesValores(users, 'culturas_plantadas'),
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
                            labels: ['Área agricultável', 'Vegetação'],
                            datasets: [
                                {
                                    label: "Total (Área agricultável e vegetação)",
                                    data: somarAreas(users),
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
                                    text: "Quantidade por uso de solo(Área agricultável e vegetação)",
                                    align: "center"
                                },
                            },
                        }}
                    />
                </div>
            </div>
        );
};



export default ShowCharts;