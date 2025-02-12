import React, { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "./components/NavBar"
import TableList from "./components/TableList"
import ModalForm from "./components/ModalForm"

export default () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [searchTerm, setSearchTerm] = useState('')
  const [clientData, setClientData] = useState(null)
  const [tableData, setTableData] = useState([])

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clients')
      setTableData(response.data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleOpen = (mode, client) => {
    setClientData(client)
    setIsOpen(true)
    setModalMode(mode)
  }

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData)
        console.log('client added:', response.data)
        setTableData((prevData) => [...prevData, response.data])
      } catch (err) {
        console.error('Error adding client:', err)
      }
      console.log('modal mode Add')
    } else {
      console.log('Updating client with ID:', clientData.id)
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData)
        console.log('client updated:', response.data)
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data : client))
        )
      } catch (err) {
        console.error('Error updating client:', err)
      }
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />

      <TableList 
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen} 
        searchTerm={searchTerm} 
      />

      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  )
}