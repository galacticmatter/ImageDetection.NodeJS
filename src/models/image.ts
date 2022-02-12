import mongoose from "mongoose";

class ImageSchema extends mongoose.Schema{
  constructor() {
    super({
      name: {
        type: String,
        required: true
      },
      label: {
          type: String,
          required: false
      },
      description: {
          type: String,
          required: false
      },
      data: {
          type: Buffer,
          required: true
      },
      contentType: {
          type: String,
          required: true
      },
      tags: {
          type: Array,
          required: false
      }
    });
  }
}

export default mongoose.model("Image", new ImageSchema);
