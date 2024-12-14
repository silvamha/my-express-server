import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Server is up and running! 🎉');
});

// News Route
app.get('/news', async(req, res) =>{
    try{
        const response = await axios.get('https://api.thenewsapi.com/v1/news/top', {
            params:{
                api_token:process.env.NEWS_API_KEY,
                locale:'us',
            }
        })
        const articles = response.data.data
        res.render('news', { articles })
    }catch (error){
        console.error('Error fetching news', error)
        res.status(500).send('Unable to fetch news at the moment.')
    }
})

// Set the Port
const PORT = process.env.PORT || 3000;

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
