import { query } from "../db.js"

export const getClients = async () => {
    const { rows } = await query('SELECT * FROM clients_tb');
    return rows;
}

export const createClient = async (clientData) => {
    const { name, email, job, rate, isActive } = clientData
    
    const { rows } = await query(
        `INSERT INTO clients_tb (name, email, job, rate, isActive)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, job, rate, isActive]
    );

    return rows[0]
}

export const updateClient = async (clientId, clientData) => {
    const { name, email, job, rate, isActive } = clientData
    
    const { rows } = await query(
        `UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, isActive = $5
        WHERE id = $6 RETURNING *`,
        [name, email, job, rate, isActive, clientId]
    );

    return rows[0]
}

export const deleteClient = async (clientId) => {
    const { rowCont } = await query(`DELETE FROM clients_tb WHERE id = $1`, [clientId])
    return rowCont > 0
} 

export const searchClients = async (searchTerm) => {
    const { rows } = await query(
        `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
        [`%${searchTerm}%`]
    )
    return rows
}