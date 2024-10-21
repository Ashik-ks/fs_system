const fs = require('fs');
const path = require('path');

// Update the path to the uploads directory
const filePath = path.join(__dirname, '..', 'uploads', 'datas.json');

// Function to read data from the JSON file
const readData = () => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error("Error reading data:", error);
        return [];
    }
};

// Function to write data to the JSON file
const writeData = (data) => {
    // Ensure the uploads directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing data:", error);
    }
};

module.exports = {
    readData,
    writeData,
};








