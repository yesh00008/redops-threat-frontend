const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const { exec } = require('child_process');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy middleware options
const options = {
  target: 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add any headers needed
    proxyReq.setHeader('X-Forwarded-Proto', req.protocol);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
};

// Create the proxy middleware
const apiProxy = createProxyMiddleware(options);

// Use the proxy middleware for requests to /api
app.use('/api/scan', apiProxy);

// Simple encryption/decryption functions
const encrypt = (text, key) => {
  const algorithm = 'aes-256-cbc';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text, key) => {
  const algorithm = 'aes-256-cbc';
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// Add endpoint for encryption operations
app.post('/api/encrypt', (req, res) => {
  try {
    const { text, key } = req.body;
    
    if (!text || !key) {
      return res.status(400).json({ error: 'Text and key are required' });
    }
    
    const encryptedText = encrypt(text, key);
    
    res.json({
      success: true,
      encryptedText
    });
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ error: 'Encryption failed', details: error.message });
  }
});

// Add endpoint for decryption operations
app.post('/api/decrypt', (req, res) => {
  try {
    const { text, key } = req.body;
    
    if (!text || !key) {
      return res.status(400).json({ error: 'Text and key are required' });
    }
    
    const decryptedText = decrypt(text, key);
    
    res.json({
      success: true,
      decryptedText
    });
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ error: 'Decryption failed', details: error.message });
  }
});

// Hash function for various algorithms
app.post('/api/hash', (req, res) => {
  try {
    const { text, algorithm } = req.body;
    
    if (!text || !algorithm) {
      return res.status(400).json({ error: 'Text and algorithm are required' });
    }
    
    // Validate algorithm
    const validAlgorithms = ['md5', 'sha1', 'sha256', 'sha512'];
    if (!validAlgorithms.includes(algorithm)) {
      return res.status(400).json({ error: 'Invalid algorithm' });
    }
    
    const hash = crypto.createHash(algorithm).update(text).digest('hex');
    
    res.json({
      success: true,
      hash
    });
  } catch (error) {
    console.error('Hashing error:', error);
    res.status(500).json({ error: 'Hashing failed', details: error.message });
  }
});

// Base64 encoding/decoding
app.post('/api/encode', (req, res) => {
  try {
    const { text, encoding } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    let result;
    switch (encoding) {
      case 'base64':
        result = Buffer.from(text).toString('base64');
        break;
      case 'hex':
        result = Buffer.from(text).toString('hex');
        break;
      case 'binary':
        result = Buffer.from(text).toString('binary');
        break;
      case 'url':
        result = encodeURIComponent(text);
        break;
      default:
        result = Buffer.from(text).toString('base64'); // Default to base64
    }
    
    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Encoding error:', error);
    res.status(500).json({ error: 'Encoding failed', details: error.message });
  }
});

app.post('/api/decode', (req, res) => {
  try {
    const { text, encoding } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    let result;
    switch (encoding) {
      case 'base64':
        result = Buffer.from(text, 'base64').toString('utf8');
        break;
      case 'hex':
        result = Buffer.from(text, 'hex').toString('utf8');
        break;
      case 'binary':
        result = Buffer.from(text, 'binary').toString('utf8');
        break;
      case 'url':
        result = decodeURIComponent(text);
        break;
      default:
        result = Buffer.from(text, 'base64').toString('utf8'); // Default from base64
    }
    
    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Decoding error:', error);
    res.status(500).json({ error: 'Decoding failed', details: error.message });
  }
});

// Generate a random password
app.post('/api/generate-password', (req, res) => {
  try {
    const { length = 12, includeUppercase = true, includeLowercase = true, includeNumbers = true, includeSymbols = true } = req.body;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    res.json({
      success: true,
      password
    });
  } catch (error) {
    console.error('Password generation error:', error);
    res.status(500).json({ error: 'Password generation failed', details: error.message });
  }
});

// Catch-all route to serve the SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend UI: http://localhost:${PORT}`);
  console.log(`API Proxy: http://localhost:${PORT}/api`);
});
