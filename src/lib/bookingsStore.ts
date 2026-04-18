import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export type BookingStatus = 'new' | 'confirmed' | 'cancelled' | 'completed';

export type Booking = {
  id: string;
  createdAt: string; // ISO
  status: BookingStatus;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  services: string[];
  preferredDateTime: string; // ISO
  notes?: string;
};

export type CreateBookingInput = Omit<Booking, 'id' | 'createdAt' | 'status'>;

type BookingStoreFile = {
  version: 1;
  bookings: Booking[];
};

const STORE_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(STORE_DIR, 'bookings.json');

async function ensureStoreFile(): Promise<void> {
  try {
    await fs.mkdir(STORE_DIR, { recursive: true });
    await fs.access(STORE_PATH);
  } catch {
    const initial: BookingStoreFile = { version: 1, bookings: [] };
    await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
  }
}

async function readStore(): Promise<BookingStoreFile> {
  await ensureStoreFile();
  const raw = await fs.readFile(STORE_PATH, 'utf8');
  const parsed = JSON.parse(raw) as BookingStoreFile;
  if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.bookings)) {
    return { version: 1, bookings: [] };
  }
  return parsed;
}

async function writeStore(store: BookingStoreFile): Promise<void> {
  await ensureStoreFile();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function newId(): string {
  return crypto.randomBytes(12).toString('hex');
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const store = await readStore();
  const booking: Booking = {
    id: newId(),
    createdAt: new Date().toISOString(),
    status: 'new',
    ...input,
  };
  store.bookings.unshift(booking);
  await writeStore(store);
  return booking;
}

export type BookingFilters = {
  city?: string;
  service?: string;
  from?: string; // ISO or date string
  to?: string; // ISO or date string
};

export async function listBookings(filters: BookingFilters = {}): Promise<Booking[]> {
  const store = await readStore();
  const from = filters.from ? new Date(filters.from).getTime() : undefined;
  const to = filters.to ? new Date(filters.to).getTime() : undefined;

  return store.bookings.filter((b) => {
    if (filters.city && b.city !== filters.city) return false;
    if (filters.service && !b.services.includes(filters.service)) return false;
    const t = new Date(b.preferredDateTime).getTime();
    if (from !== undefined && t < from) return false;
    if (to !== undefined && t > to) return false;
    return true;
  });
}

