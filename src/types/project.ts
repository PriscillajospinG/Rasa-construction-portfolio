export interface Project {
  id:          string;
  title:       string;
  category:    string;
  location:    string;
  image:       string;
  /** Taller aspect ratio in masonry grid */
  tall?:       boolean;
  /** Short project caption for hover overlay */
  description?: string;
  /** Duration or year, e.g. "6 Months" or "2023" */
  duration?:   string;
  /** Services involved */
  services?:   string[];
}
