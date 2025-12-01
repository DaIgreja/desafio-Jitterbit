const axios = require('axios');

async function testAPI() {
    const baseURL = 'http://localhost:3000/order';

    try {
        // Test create order
        console.log('Testing CREATE order...');
        const createResponse = await axios.post(baseURL, {
            "numeroPedido": "v10089015vdb-01",
            "valorTotal": 10000,
            "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
            "items": [
                {
                    "idItem": "2434",
                    "quantidadeItem": 1,
                    "valorItem": 1000
                }
            ]
        });
        console.log('CREATE response:', createResponse.data);

        // Test get order by numeroPedido
        console.log('\nTesting GET order by numeroPedido...');
        const getResponse = await axios.get(`${baseURL}/v10089015vdb-01`);
        console.log('GET response:', getResponse.data);

        // Test list orders
        console.log('\nTesting LIST orders...');
        const listResponse = await axios.get(`${baseURL}/list`);
        console.log('LIST response:', listResponse.data);

        // Test update order
        console.log('\nTesting UPDATE order...');
        const updateResponse = await axios.put(`${baseURL}/v10089015vdb-01`, {
            "value": 15000
        });
        console.log('UPDATE response:', updateResponse.data);

        // Test delete order
        console.log('\nTesting DELETE order...');
        const deleteResponse = await axios.delete(`${baseURL}/v10089015vdb-01`);
        console.log('DELETE response:', deleteResponse.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testAPI();
