import mongoose, { Schema } from 'mongoose';

export type BookingStatus = 'new' | 'confirmed' | 'cancelled' | 'completed';

export type BookingDoc = mongoose.InferSchemaType<typeof bookingSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const bookingSchema = new Schema(
  {
    status: { type: String, enum: ['new', 'confirmed', 'cancelled', 'completed'], default: 'new' },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    address: { type: String, required: true, trim: true, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 60, index: true },
    services: [{ type: String, required: true, trim: true, maxlength: 80, index: true }],
    preferredDateTime: { type: Date, required: true, index: true },
    notes: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

