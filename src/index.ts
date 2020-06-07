import path from 'path';

import dotenv from 'dotenv';

import app from './app';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
