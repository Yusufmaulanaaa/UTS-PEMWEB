const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://uts-backend-chi.vercel.app";

export type Category = {
  id: number;
  name: string;
};

export type Pembicara = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export type EventItem = {
  id: number;
  title: string;
  location: string;
  dateEvent: string;
  description: string;
  categoryId: number;
  pembicaraId: number;
  category?: Category;
  pembicara?: Pembicara;
};

type Entity = "category" | "pembicara" | "event";

const STORAGE_KEYS = {
  category: "local-dev-categories",
  pembicara: "local-dev-pembicara",
  event: "local-dev-events",
};

const initialCategories: Category[] = [
  { id: 1, name: "Seminar" },
  { id: 2, name: "Workshop" },
  { id: 3, name: "Talkshow" },
];

const initialPembicara: Pembicara[] = [
  {
    id: 1,
    name: "Admin INVOFEST",
    role: "Speaker",
    image: "https://placehold.co/600x400/802D43/ffffff?text=INVOFEST",
  },
  {
    id: 2,
    name: "Pemateri Web",
    role: "Mentor",
    image: "https://placehold.co/600x400/6b2437/ffffff?text=Pembicara",
  },
];

const initialEvents: EventItem[] = [
  {
    id: 1,
    title: "INVOFEST Seminar",
    location: "Auditorium",
    dateEvent: new Date().toISOString(),
    description: "Seminar teknologi INVOFEST.",
    categoryId: 1,
    pembicaraId: 1,
  },
  {
    id: 2,
    title: "Web Development Workshop",
    location: "Lab Komputer",
    dateEvent: new Date().toISOString(),
    description: "Workshop pengembangan web.",
    categoryId: 2,
    pembicaraId: 2,
  },
];

const initialData = {
  category: initialCategories,
  pembicara: initialPembicara,
  event: initialEvents,
};

const normalizeArray = <T>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];

  if (response && typeof response === "object") {
    const data = response as { data?: unknown; result?: unknown; category?: unknown; pembicara?: unknown; event?: unknown; events?: unknown };
    const candidates = [data.data, data.result, data.category, data.pembicara, data.event, data.events];
    const found = candidates.find(Array.isArray);
    return found ? (found as T[]) : [];
  }

  return [];
};

const normalizeObject = <T>(response: unknown): T => {
  if (response && typeof response === "object") {
    const data = response as { data?: unknown; category?: unknown; pembicara?: unknown; event?: unknown; result?: unknown };
    return (data.data ?? data.category ?? data.pembicara ?? data.event ?? data.result ?? response) as T;
  }

  return {} as T;
};

const readLocal = <T>(entity: Entity): T[] => {
  const key = STORAGE_KEYS[entity];
  const saved = localStorage.getItem(key);

  if (!saved) {
    const seed = initialData[entity] as T[];
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
};

const writeLocal = <T>(entity: Entity, data: T[]) => {
  localStorage.setItem(STORAGE_KEYS[entity], JSON.stringify(data));
};

const nextId = (items: Array<{ id: number }>) =>
  items.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;

const attachEventRelations = (event: EventItem): EventItem => {
  const categories = readLocal<Category>("category");
  const pembicara = readLocal<Pembicara>("pembicara");

  return {
    ...event,
    category: categories.find((item) => item.id === event.categoryId),
    pembicara: pembicara.find((item) => item.id === event.pembicaraId),
  };
};

const request = async <T>(entity: Entity, path = "", options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/${entity}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  const text = await response.text();
  const data = text.startsWith("{") || text.startsWith("[") ? JSON.parse(text) : null;

  if (!response.ok || data === null) {
    throw new Error("Backend belum siap");
  }

  return data as T;
};

export const getCategories = async () => {
  try {
    return normalizeArray<Category>(await request("category"));
  } catch {
    return readLocal<Category>("category");
  }
};

export const getCategoryById = async (id: number | string) => {
  try {
    return normalizeObject<Category>(await request("category", `/${id}`));
  } catch {
    const item = readLocal<Category>("category").find((category) => String(category.id) === String(id));
    if (!item) throw new Error("Category tidak ditemukan");
    return item;
  }
};

export const createCategory = async (data: Pick<Category, "name">) => {
  try {
    return normalizeObject<Category>(await request("category", "", { method: "POST", body: JSON.stringify(data) }));
  } catch {
    const items = readLocal<Category>("category");
    const item = { id: nextId(items), name: data.name };
    writeLocal("category", [item, ...items]);
    return item;
  }
};

export const updateCategory = async (id: number | string, data: Pick<Category, "name">) => {
  try {
    return normalizeObject<Category>(await request("category", `/${id}`, { method: "PUT", body: JSON.stringify(data) }));
  } catch {
    const items = readLocal<Category>("category");
    const updated = items.map((item) => (String(item.id) === String(id) ? { ...item, ...data } : item));
    writeLocal("category", updated);
    return updated.find((item) => String(item.id) === String(id)) ?? ({ id: Number(id), ...data } as Category);
  }
};

export const deleteCategory = async (id: number | string) => {
  try {
    return request("category", `/${id}`, { method: "DELETE" });
  } catch {
    writeLocal("category", readLocal<Category>("category").filter((item) => String(item.id) !== String(id)));
    return { message: "Category berhasil dihapus" };
  }
};

export const getPembicara = async () => {
  try {
    return normalizeArray<Pembicara>(await request("pembicara"));
  } catch {
    return readLocal<Pembicara>("pembicara");
  }
};

export const getPembicaraById = async (id: number | string) => {
  try {
    return normalizeObject<Pembicara>(await request("pembicara", `/${id}`));
  } catch {
    const item = readLocal<Pembicara>("pembicara").find((speaker) => String(speaker.id) === String(id));
    if (!item) throw new Error("Pembicara tidak ditemukan");
    return item;
  }
};

export const createPembicara = async (data: Omit<Pembicara, "id">) => {
  try {
    return normalizeObject<Pembicara>(await request("pembicara", "", { method: "POST", body: JSON.stringify(data) }));
  } catch {
    const items = readLocal<Pembicara>("pembicara");
    const item = { id: nextId(items), ...data };
    writeLocal("pembicara", [item, ...items]);
    return item;
  }
};

export const updatePembicara = async (id: number | string, data: Omit<Pembicara, "id">) => {
  try {
    return normalizeObject<Pembicara>(await request("pembicara", `/${id}`, { method: "PUT", body: JSON.stringify(data) }));
  } catch {
    const items = readLocal<Pembicara>("pembicara");
    const updated = items.map((item) => (String(item.id) === String(id) ? { ...item, ...data } : item));
    writeLocal("pembicara", updated);
    return updated.find((item) => String(item.id) === String(id)) ?? ({ id: Number(id), ...data } as Pembicara);
  }
};

export const deletePembicara = async (id: number | string) => {
  try {
    return request("pembicara", `/${id}`, { method: "DELETE" });
  } catch {
    writeLocal("pembicara", readLocal<Pembicara>("pembicara").filter((item) => String(item.id) !== String(id)));
    return { message: "Pembicara berhasil dihapus" };
  }
};

export const getEvents = async () => {
  try {
    const events = normalizeArray<EventItem>(await request("event"));
    return events.map((event) => ({
      ...event,
      categoryId: event.categoryId ?? event.category?.id ?? 0,
      pembicaraId: event.pembicaraId ?? event.pembicara?.id ?? 0,
    }));
  } catch {
    return readLocal<EventItem>("event").map(attachEventRelations);
  }
};

export const getEventById = async (id: number | string) => {
  try {
    return normalizeObject<EventItem>(await request("event", `/${id}`));
  } catch {
    const item = readLocal<EventItem>("event").find((event) => String(event.id) === String(id));
    if (!item) throw new Error("Event tidak ditemukan");
    return attachEventRelations(item);
  }
};

export const createEvent = async (data: Omit<EventItem, "id" | "category" | "pembicara">) => {
  try {
    return normalizeObject<EventItem>(await request("event", "", { method: "POST", body: JSON.stringify(data) }));
  } catch {
    const items = readLocal<EventItem>("event");
    const item = { id: nextId(items), ...data };
    writeLocal("event", [item, ...items]);
    return attachEventRelations(item);
  }
};

export const updateEvent = async (id: number | string, data: Omit<EventItem, "id" | "category" | "pembicara">) => {
  try {
    return normalizeObject<EventItem>(await request("event", `/${id}`, { method: "PUT", body: JSON.stringify(data) }));
  } catch {
    const items = readLocal<EventItem>("event");
    const updated = items.map((item) => (String(item.id) === String(id) ? { ...item, ...data } : item));
    writeLocal("event", updated);
    const item = updated.find((event) => String(event.id) === String(id)) ?? ({ id: Number(id), ...data } as EventItem);
    return attachEventRelations(item);
  }
};

export const deleteEvent = async (id: number | string) => {
  try {
    return request("event", `/${id}`, { method: "DELETE" });
  } catch {
    writeLocal("event", readLocal<EventItem>("event").filter((item) => String(item.id) !== String(id)));
    return { message: "Event berhasil dihapus" };
  }
};
