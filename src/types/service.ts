export interface Service {
  id:          string;
  title:       string;
  description: string;
  tag:         string;
  /** Lucide icon component key */
  iconName:    string;
  /** Optional background image path */
  image?:      string;
}
