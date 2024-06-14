const express = require('express');
const csv = require('csvtojson');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

let bankData = [];

//fetching csv data using axios
const fetchData = async () => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/Amanskywalker/indian_banks/main/bank_branches.csv');
        bankData = await csv().fromString(response.data);
        console.log('converted csv to json');
    } catch (error) {
        console.error('Error in fetching:', error);
    }
};
fetchData();

app.get('/banks', (req, res) => {
    const bankList = [];
    bankData.forEach(bank => {
        if (!bankList.includes(bank.bank_name)) {
            bankList.push(bank.bank_name);
        }
    });
    res.json(bankList);
});

app.get('/branches/:branch', (req, res) => {
    const branchName = req.params.branch;
    const branches = bankData.filter(bank => bank.branch === branchName);
    res.json(branches);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
