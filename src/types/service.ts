export interface Service {
  id:          string;
  title:       string;
  /** Short card description — 1–2 sentences */
  description: string;
  /** Longer operational detail — surfaces in featured card */
  detail?:     string;
  /** What kind of projects this is used for */
  usedFor?:    string;
  tag:         string;
  /** Lucide icon component key */
  iconName:    string;
  /** Optional background image path */
  image?:      string;
  /** Alt text for the service image */
  alt?:        string;
}
