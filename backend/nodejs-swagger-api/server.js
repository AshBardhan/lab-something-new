// Import necessary modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Simulate a database with an in-memory array
let items = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' }
];

// Load Swagger definition from a YAML file
const swaggerDocument = YAML.load('./swagger.yaml');

// Serve Swagger UI at the "/api-docs" endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CRUD API Routes

// Create an item (POST)
app.post('/api/v1/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = {
    id: items.length + 1,
    name,
    description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items (GET)
app.get('/api/v1/items', (req, res) => {
  res.json(items);
});

// Read a single item (GET by ID)
app.get('/api/v1/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// Update an item (PUT)
app.put('/api/v1/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  const { name, description } = req.body;
  item.name = name || item.name;
  item.description = description || item.description;
  
  res.json(item);
});

// Delete an item (DELETE)
app.delete('/api/v1/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  
  items.splice(itemIndex, 1);
  res.status(204).end();
});

// Start the server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
  console.log(`Swagger UI at http://localhost:${port}/api-docs`);
});
