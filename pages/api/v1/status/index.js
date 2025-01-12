import database from "infra/database.js"
import { Client } from 'pg';

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query(
    'SHOW server_version;'
  );

  const databaseVersionValue =
    databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    'SHOW max_connections;'
  );

  const databaseMaxConnectionsValues = 
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: 'SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName]
  });

  const databaseOpenedConnectionsValues = 
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValues),
        opened_connections: parseInt(databaseOpenedConnectionsValues)
      }
    },
  });
}

export default status;