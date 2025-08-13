export type Media = {
  url: string;
  type?: string;
  title?: string;
};

export type Level = {
  id: string;
  name: string;
  description: string | null;
  order_num: number | null;
  media: Media[] | null;
};

export type Track = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  levels?: Level[];
};


