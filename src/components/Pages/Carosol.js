import React from "react";

const Carasol = () => {
  return (
    <>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="2"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={'https://agropos.com.br/wp-content/uploads/2022/08/Imagem-2023-12-20T113845.480.png'}
              alt="produtor rural"
              className="d-block"
            />
          </div>
          <div className="carousel-item">
            <img
              src={'https://img.freepik.com/fotos-gratis/campo-de-cultivo-de-maquina-agricola-trator_342744-564.jpg?t=st=1725659558~exp=1725663158~hmac=05425012ab72c96e561a9a886634df4707d6651fe279b334f905311813798ca5&w=740'}
              alt="trator"
              className="d-block"
            />
          </div>
          <div className="carousel-item">
            <img
              src={'https://www.comprerural.com/wp-content/uploads/2023/09/228644-o-novo-perfil-do-produtor-rural-esta-ligado-a-tecnologia-saiba-mais-750x430.jpg'}
              alt="produção rural"
              className="d-block"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
};

export default Carasol;
