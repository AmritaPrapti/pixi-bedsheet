const express = require('express');
const sharp = require('sharp');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to generate a displacement map
app.get('/generate-displacement', (req, res) => {
  const imagePath = 'public/assets/bedsheet-2.jpg'; // Replace with the path to your bedsheet image
  const outputMapPath = 'public/assets/displacementMap.jpg';

  sharp(imagePath)
    .greyscale()
    .sharpen()
    .toColourspace('b-w')
    .modulate({ brightness: 1.2 })
    .blur(1)
    .toFile(outputMapPath, (err) => {
      if (err) {
        console.error('Error creating displacement map', err);
        res.status(500).send('Error creating displacement map');
        return;
      }
      res.sendFile(outputMapPath, { root: __dirname });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
