import mongoose, { Schema, model, models, InferSchemaType } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const; //we are doing this to fix the values of video dimension because phele wale cosnt se values override hoskti hai

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    id: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    controls: {
      type: Boolean,
    },
    transformations: {
      width: { type: Number, default: VIDEO_DIMENSIONS.height },
      height: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, required: false, min: 1, max: 100 },
      required: true,
    },
  },
  { timestamps: true }
);

export type videoType = InferSchemaType<typeof videoSchema>;

const Video = models?.Video || model<videoType>("Video", videoSchema);

export default Video;
