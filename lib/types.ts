// Shapes of the site's editable content. The same shapes are stored in the
// database (supabase/schema.sql), so the admin panel can edit them later.

// display "full": shown across the whole width, uncropped (plans, panoramas).
type MediaExtras = { display?: "full"; caption?: string };
export type Media =
  | ({ type: "image"; src: string; alt: string } & MediaExtras)
  | ({ type: "video"; src: string; poster: string; alt: string } & MediaExtras);

export type Project = {
  slug: string;
  number: string;
  kind: string;
  name: string;
  facts: { label: string; value: string }[];
  concept_note: string[]; // a paragraph starting with "## " is a small heading
  documents?: { label: string; href: string }[];
  media: Media[];
  sort_order: number;
  published: boolean;
};

export type Walkthrough = {
  project_slug: string;
  title: string;
  badge: string;
  text: string;
  video: string;
  poster: string;
  alt: string;
};

export type Site = {
  studio: {
    name: string;
    tagline: string;
    whatsapp: string;
    instagram: string;
    instagram_handle: string;
    email: string;
    phones: { name: string; number: string }[];
    address_lines: string[];
  };
  hero: {
    headline_before: string;
    headline_em: string;
    headline_after: string;
    in: { word: string; label: string; image: string; alt: string };
    out: { word: string; label: string; image: string; alt: string };
  };
  statement: {
    text: string;
    note: string;
    stat_value: string;
    stat_unit: string;
    stat_caption: string;
    image_arch: string;
    image_small: string;
  };
  philosophy: {
    title_before: string;
    title_em: string;
    intro: string;
    ideas: { lead_in: string; word: string; text: string; image: string; alt: string }[];
  };
  services: {
    title: string;
    intro: string;
    cards: { tag: string; title: string; text: string; image: string; alt: string }[];
  };
  founders: {
    names: string;
    paragraphs: string[];
    quote: string;
    photo: string;
    photo_alt: string;
    people: { name: string; role: string }[];
  };
  contact: { title: string; lead: string; project_types: string[] };
  join: {
    title: string;
    lead: string;
    trades: string[];
    steps: { title: string; text: string }[];
  };
  projects_page: { intro: string };
  walkthroughs: Walkthrough[];
};
