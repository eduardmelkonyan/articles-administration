const Image = require("../db/models/image");
const sharp = require("sharp");

class ImageController {
  async uploadImage(req, res) {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const { article_id } = req.body;
    await Image.query().insert({
      image: buffer,
      article_id,
    });
    res.send(buffer),
      (error, req, res, next) => {
        res.status(400).send({ error: error.message });
      };
  }
}

module.exports = new ImageController();
