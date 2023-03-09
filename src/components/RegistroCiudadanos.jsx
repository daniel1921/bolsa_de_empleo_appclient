import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import axios from "axios";

export const RegistroCiudadanos = () => {
  const [tipoDocumentos, setTipoDocumentos] = useState(null)

  const [ciudadano, setCiudadano] = useState({
    Tipo_documento: "CEDULA",
    Id: "",
    Nombres: "",
    Apellidos: "",
    Fecha_nacimiento: "",
    Profesion: "",
    Aspiracion_salarial: 0,
    Email: "",
  });

  const {
    Tipo_documento,
    Id,
    Nombres,
    Apellidos,
    Fecha_nacimiento,
    Profesion,
    Aspiracion_salarial,
    Email,
  } = ciudadano;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    // console.log(value);

    setCiudadano({
      ...ciudadano,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get("https://localhost:44377/api/Tipo_documentos").then((response) => {
      setTipoDocumentos(response.data);
      console.log(response.data)
    });
  
  }, [])
  

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if ([Id, Nombres, Apellidos, Profesion, Email].includes("")) {
      return alert("Existen campos sin rellenar");
    }

    

    try {
      await axios.post("https://localhost:44377/api/Ciudadanos", JSON.stringify(ciudadano), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
       if (!error.response) {
         // network error
         alert("Error: Network Error");
       } else {
         alert(error.response.data.message);
       }
    }

    alert(" Registro completado exitosamente!");

    setCiudadano({
      Tipo_documento: "CEDULA",
      Id: "",
      Nombres: "",
      Apellidos: "",
      Fecha_nacimiento: "",
      Profesion: "",
      Aspiracion_salarial: 0,
      Email: "",
    })
    // vaciar campos
    //navegar a la tabla de registros
  };



  if(!tipoDocumentos) return <div>Cargando información...</div>

  return (
    <div className="container-fluid">
      <h3>Bolsa de Empleo APP</h3>
      <hr />
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <h4>Crear nuevo ciudadano</h4>
          <hr />
          <form onSubmit={onFormSubmit}>
            <div className="mb-3">
              <label htmlFor="Tipo_documento" className="form-label">
                Tipo De Documento
              </label>
              <select
                className="form-select"
                name="Tipo_documento"
                value={Tipo_documento}
                onChange={onInputChange}
                aria-label="Default select example"
              >
                {tipoDocumentos.map((value,key) => {
                  return <option value={value.id}>{value.id}</option>
                })}
                
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Id" className="form-label">
                Cédula
              </label>
              <input
                type="text"
                name="Id"
                id="Id"
                value={Id}
                onChange={onInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Nombres" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                value={Nombres}
                onChange={onInputChange}
                className="form-control"
                name="Nombres"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Apellidos" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                value={Apellidos}
                onChange={onInputChange}
                className="form-control"
                name="Apellidos"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Fecha_nacimiento" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                name="Fecha_nacimiento"
                value={Fecha_nacimiento}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Profesion" className="form-label">
                Profesión
              </label>
              <input
                type="text"
                value={Profesion}
                onChange={onInputChange}
                className="form-control"
                name="Profesion"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Aspiracion_salarial" className="form-label">
                Aspiración salarial
              </label>
              <input
                type="number"
                className="form-control"
                name="Aspiracion_salarial"
                value={Aspiracion_salarial}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={Email}
                onChange={onInputChange}
                className="form-control"
                name="Email"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
