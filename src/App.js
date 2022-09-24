
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])
  const [unificar, setUnificar] = useState(0);
  const [con, setCon] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/Paciente/UnificarXDniRef/25252525')
      .then(res => res.json())
      .then(resp => setData(resp))
  }, [])

  const activar = (id) => {
    console.log(id);
    if (unificar === id) {
      setUnificar(0)
      var elements = document.querySelectorAll(".unificar");
      elements.forEach(ele => {
        if (ele.value == "false") {
          ele.disabled = false;
        } else {
          ele.disabled = true;
        }
      })

      elements = document.querySelectorAll(".con");
      elements.forEach(ele => {
        ele.disabled = true;
        ele.checked = false;
        setCon([])
      })
    } else {
      setUnificar(id)
      var elements = document.querySelectorAll(".unificar");
      elements.forEach(ele => {
        ele.disabled = ele.id != id;
      })

      elements = document.querySelectorAll(".con");
      elements.forEach(ele => {
        if (ele.value == "false") {
          ele.disabled = false;
        } else {
          ele.disabled = true;
        }

        if (ele.id == id) {
          ele.disabled = true;
        }
      })
    }
  }

  const unificarCon = (id) => {
    console.log(id);
    const indexOf = con.indexOf(id);
    if (indexOf === -1) {
      setCon([...con, id])
    } else {
      setCon(con => con.filter((item) => item !== id))
    }
  }

  const btnUnificar = () => {
    console.log(unificar);
    console.log(con);

    var datos = { 'activo': unificar, 'unificar': con };
    fetch("/pacientes/UpdateUnificarXDniRef", {
      method: 'post',
      body: JSON.stringify(datos),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => console.log(res))
  }

  return (
    <div className="App">
      <div className="table-box">
        <table cellPadding={10}>
          <thead>
            <tr>
              <th>DOCUMENTO</th>
              <th>PACIENTE</th>
              <th>ACTIVAR</th>
              <th>UNIFICAR</th>
              <th>DESACTIVADO</th>
              <th>MARCAR</th>
            </tr>
          </thead>


          <tbody>
            {
              data.map((p, index) => (
                <tr key={index} style={{ backgroundColor: `${p.anulado && '#d67a7a'}` }}>
                  <td style={{ color: `${p.anulado && '#fff'}` }}>
                    {p.documento}
                  </td>

                  <td style={{ color: `${p.anulado && '#fff'}` }}>
                    {p.nombre}
                  </td>

                  <td>
                    <input className='unificar checkUni' onClick={() => activar(p.pacienteId)} value={p.anulado} disabled={p.anulado} type="checkbox" id={p.pacienteId} />
                  </td>

                  <td>
                    {/* <input className='con checkUni' onClick={btnUnificar} value={p.anulado}  disabled type="checkbox" id={p.pacienteId} /> */}
                    <button className='buttonOpenModalHC' onClick={() => unificarCon(p.pacienteId)}>
                      unificar
                    </button>
                  </td>

                  <td>
                    <input className='checkUni' onClick={btnUnificar} checked={p.anulado} disabled type="checkbox" />
                  </td>

                  <td>
                    <button className='buttonOpenModalHC' onClick={btnUnificar}>
                      HC
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
      <button onClick={btnUnificar}>
        Aceptar
      </button>
    </div>
  );
}

export default App;
