import { useState } from 'react'
import axios from 'axios'

function App() {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    lugares_disponibles: '',
    precio: '',
    ubicacion: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/eventos', form)
      alert('✅ Evento creado con éxito: ID ' + response.data.data.id)
      setForm({
        titulo: '',
        descripcion: '',
        fecha: '',
        lugares_disponibles: '',
        precio: '',
        ubicacion: ''
      })
    } catch (error) {
      console.error(error)
      alert('❌ Error al crear el evento')
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 20 }}>
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Título" name="titulo" value={form.titulo} onChange={handleChange} />
        <InputField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} />
        <InputField label="Fecha" name="fecha" type="date" value={form.fecha} onChange={handleChange} />
        <InputField label="Lugares disponibles" name="lugares_disponibles" value={form.lugares_disponibles} onChange={handleChange} />
        <InputField label="Precio" name="precio" value={form.precio} onChange={handleChange} />
        <InputField label="Ubicación" name="ubicacion" value={form.ubicacion} onChange={handleChange} />

        <button type="submit" style={{ marginTop: 20 }}>Crear Evento</button>
      </form>
    </div>
  )
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label>{label}</label><br />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  )
}

export default App
