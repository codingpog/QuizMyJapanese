import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/articleRoute.js';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use('/api', router);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map