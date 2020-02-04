const createDatabaseConnection = require('./createConnection');

const client = createDatabaseConnection();
client.connect();

const getNow = async (req, res) => {
  const result = await client.query("SELECT current_database();");
  console.log(result.rows[0]);
  res.send(result.rows[0]);
}

const saveMarker = async (req, res) => {
  console.log("Saving marker...")
  const coordinates = req.body.geometry.coordinates.toString();
  const markerText = req.body.properties.name;

  const text = 'INSERT INTO marker (coordinates, text) VALUES ($1, $2) RETURNING *';
  const values = [coordinates, markerText];

  try {
    const insertResult = await client.query(text, values);
    res.send(insertResult.rows);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
}

const getMarkersByGroupId = async (req, res) => {
  const text = 'SELECT coordinates, text FROM marker;'

  try {
    const getMarkersByGroup = await client.query(text);
    console.log(getMarkersByGroup.rows[0]);
    res.send(getMarkersByGroup.rows);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
}

module.exports = {
  getNow,
  saveMarker,
  getMarkersByGroupId,
}