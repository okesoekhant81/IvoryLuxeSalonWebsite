export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  body: string;
  avatarUrl: string | null;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ServiceCategory = {
  id: string;
  page: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ServiceItem = {
  id: string;
  categoryId: string;
  name: string;
  price: string;
  order: number;
};

export type SiteContent = {
  key: string;
  value: string;
};

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};
