import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";


class Formulario extends React.Component {
  state = {
    list: [],
    carnet: '',
    horario: 'Lunes 9-11',
    tarde: false,
    hora: new Date().toLocaleString()
  };

  handleInputChange = event => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value
    });
  };

  handleChange = event => {
    this.setState({horario: event.target.value});
  }

  handleCheckboxChange = event => {
    this.setState({ tarde: event.target.checked })
  }

  handleSubmit = event => {
    let carnet_regex= new RegExp('^[0-9]{8}$')
    const { list, carnet, horario, hora, tarde } = this.state;
    if (carnet_regex.test(carnet)) {
      const id = list.length + 1;
      this.setState({
        list: [...list, { id, carnet, horario, hora, tarde }],
        carnet: '',
        horario: 'Lunes 9-11',
        tarde: false,
        hora: new Date().toLocaleString()
      });
    } else {
      alert('Llene todos los campos')

    }
    event.preventDefault();
  };

  borrar(id){
    var aux = this.state.list.filter((ele) => ele.id !== id);
    this.setState({
        list : aux
      });
  }

  render() {
    const { carnet, horario, tarde, list } = this.state;
    return (
        <div className="container">
          <div  className="jumbotron">
            <h1>
                Registro de laboratorio.
            </h1>
            <div className="form-group">
              <label htmlFor="carnet"  className="col-sm-2 col-form-label">
              Ingrese el carnet:
              </label>
              <input
                  type="text"
                  className="form-control"
                  id="carnet_field"
                  name="carnet"
                  value={carnet}
                  onChange={this.handleInputChange}
                />
            </div>

            <div className="form-group">
              <label htmlFor="schedule">
                Seleccione el horario: 
              </label>
              <select
                className="form-control"
                id="schedule_field"
                name="schedule"
                value={horario}
                onChange={this.handleChange}>
                <option value="Lunes 9-11">Lunes de 9:00 a 11.00</option>
                <option value="Martes 13:30-15:30">Martes de 13:30 a 15:30</option>
                <option value="Miercoles 9-11">Miércoles de 9:00 a 11.00</option>
                <option value="Jueves 13:30-15:30">Jueves de 13:30 a 15:30</option>
                <option value="Viernes 9-11">Viernes de 9:00 a 11.00</option>
                <option value="Viernes 15:30-17:30">Viernes de 15:30 a 17:30</option>
              </select>
            </div>
            <div className="form-group">
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="late_switch"
                        checked={tarde}
                        onChange={this.handleCheckboxChange}
                        />
                    <label htmlFor="late_switch" className="custom-control-label">
                        Llego tarde?
                    </label>
                </div>
            </div>

            <div className="form-group">
              <button type="button" className="btn btn-danger" id="submit_btn" onClick={this.handleSubmit} disabled={!this.state.carnet}>
                Ingresar
              </button>
            </div>
          </div>
        <section>
          <table className="table table-hover">
            <thead>
              <tr className="table-dark">
                <th scope="col">Carnet</th>
                <th scope="col">Horario de laboratorio</th>
                <th scope="col">Hora de ingreso</th>
                <th scope="col">Tarde?</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr key={item.id}>
                  <td>{item.carnet}</td>
                  <td>{item.horario}</td>
                  <td>{item.hora}</td>
                  <td>{item.tarde ? "Si" : "No"}</td>
                  <td>
                      <button className = "btn btn-danger" onClick ={()=>this.borrar(item.id)}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Formulario />, document.getElementById("root"))