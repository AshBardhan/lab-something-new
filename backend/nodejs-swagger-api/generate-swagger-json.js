const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

// Load the Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Convert the YAML data to JSON format
const swaggerJson = JSON.stringify(swaggerDocument, null, 2); // The "null, 2" makes the output pretty (formatted)

// Save the JSON to a file
fs.writeFileSync(path.join(__dirname, 'swagger.json'), swaggerJson);

console.log('Swagger JSON generated successfully: swagger.json');
