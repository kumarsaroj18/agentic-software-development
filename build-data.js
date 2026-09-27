// Script to parse CSV files and generate data.js
const fs = require('fs');

function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];
        
        if (inQuotes) {
            if (char === '"') {
                if (nextChar === '"') {
                    // Escaped quote
                    currentField += '"';
                    i++;
                } else {
                    // End of quoted field
                    inQuotes = false;
                }
            } else {
                currentField += char;
            }
        } else {
            if (char === '"') {
                // Start of quoted field
                inQuotes = true;
            } else if (char === ',') {
                // Field separator
                currentRow.push(currentField.trim());
                currentField = '';
            } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
                // Row separator
                currentRow.push(currentField.trim());
                if (currentRow.some(f => f)) { // Only add non-empty rows
                    rows.push(currentRow);
                }
                currentRow = [];
                currentField = '';
                if (char === '\r') i++; // Skip \n in \r\n
            } else if (char !== '\r') {
                currentField += char;
            }
        }
    }
    
    // Don't forget the last field and row
    if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        if (currentRow.some(f => f)) {
            rows.push(currentRow);
        }
    }
    
    return rows;
}

function csvToObjects(csvText) {
    const rows = parseCSV(csvText);
    if (rows.length < 2) return [];
    
    const headers = rows[0];
    const objects = [];
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        // Skip empty rows (where Column A is empty)
        if (!row[0] || row[0].trim() === '') continue;
        
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            const key = headers[j];
            const value = row[j] || '';
            if (value.trim()) {
                obj[key] = value;
            }
        }
        // Only add if we have at least the title
        if (obj[headers[0]]) {
            objects.push(obj);
        }
    }
    
    return objects;
}

// Read all CSV files from csv-data folder
const csvFolder = './csv-data';
const sheets = [
    { file: 'server-infrastructure.csv', name: 'Server & Infrastructure' },
    { file: 'web-ui.csv', name: 'Web UI' },
    { file: 'mobile-app.csv', name: 'Mobile App' },
    { file: 'ai-llm.csv', name: 'AI & LLM Applications' },
    { file: 'async-queues.csv', name: 'Async: Queues, Jobs, Events' },
    { file: 'database-schema.csv', name: 'Database & Schema Change' },
    { file: 'test-suite.csv', name: 'Test Suite Health' },
    { file: 'data-analytics.csv', name: 'Data & Analytics Pipelines' },
    { file: 'cicd-supply-chain.csv', name: 'CI/CD & Supply Chain' },
    { file: 'iac-kubernetes.csv', name: 'IaC, Kubernetes & Cloud' },
    { file: 'desktop-apps.csv', name: 'Desktop Applications' },
    { file: 'browser-extensions.csv', name: 'Browser Extensions' },
    { file: 'libraries-sdks.csv', name: 'Libraries & SDKs' },
    { file: 'integrations-payments.csv', name: 'Integrations & Payments' },
    { file: 'legacy-modernization.csv', name: 'Legacy Modernization' },
    { file: 'embedded-iot.csv', name: 'Embedded & IoT Firmware' }
];

const DATA = {};

for (const sheet of sheets) {
    const filePath = `${csvFolder}/${sheet.file}`;
    if (fs.existsSync(filePath)) {
        const csvText = fs.readFileSync(filePath, 'utf-8');
        const objects = csvToObjects(csvText);
        DATA[sheet.name] = objects;
        console.log(`${sheet.name}: ${objects.length} rows`);
    } else {
        console.log(`Missing: ${filePath}`);
    }
}

// Write data.js
const output = `// Auto-generated data for Code Issues webapp
const DATA = ${JSON.stringify(DATA, null, 2)};
`;

fs.writeFileSync('data.js', output);
console.log('\nGenerated data.js');

// Verify first entry
console.log('\nFirst entry sample:');
console.log(JSON.stringify(DATA['Server & Infrastructure'][0], null, 2));
