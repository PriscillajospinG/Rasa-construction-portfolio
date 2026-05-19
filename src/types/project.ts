export interface Project {
  id:       string;
  title:    string;
  category: string;
  location: string;
  image:    string;
  /** Taller aspect ratio in masonry grid */
  tall?:    boolean;
}
