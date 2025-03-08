const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// Ganti dengan connection string MongoDB Anda
const uri = 'mongodb+srv://admin:TokoSinarUtamaJAYAJAYAJAYA@tokosinarutama.yypt0.mongodb.net/?retryWrites=true&w=majority&appName=TokoSinarUtama';

const app = express();
const client = new MongoClient(uri);

app.use(cors({ origin: '*' }));  // Allow all origins for CORS
app.use(express.json());  // Untuk membaca JSON dari request body

// Route untuk menangani GET request di root ("/")
app.get('/', (req, res) => {
    res.send('Server Express sedang berjalan!');
});

// Endpoint untuk menambahkan user
app.post('/api/users', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        await client.connect();
        const db = client.db('Company');
        const collection = db.collection('Akun');

        // Simpan data user ke database
        const result = await collection.insertOne({
            username,
            password,
            role
        });

        res.status(201).json({ message: 'User berhasil ditambahkan!', userId: result.insertedId });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Gagal menambahkan user.' });
    } finally {
        await client.close();
    }
});

// Tentukan port secara dinamis untuk lingkungan produksi (Vercel)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
