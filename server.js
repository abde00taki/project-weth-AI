import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import formationsRoutes from './routes/formations.js';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', formationsRoutes);

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route to handle single-page application
app.get('*', (req, res) => {
  // If the request is for an API route, let it pass through
  if (req.url.startsWith('/api')) return next();
  
  // Check if the requested file exists in public
  const filePath = path.join(__dirname, 'public', req.url);
  
  // If the exact file exists, serve it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  
  // If it's a known HTML route, serve the appropriate file
  if (['/about', '/contact', '/formations'].includes(req.url)) {
    return res.sendFile(path.join(__dirname, 'public', `${req.url.substring(1)}.html`));
  }
  
  // Default to index for client-side routing
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});