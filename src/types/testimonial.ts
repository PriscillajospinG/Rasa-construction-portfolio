export interface Testimonial {
  id:        string;
  name:      string;
  role:      string;
  /** Client's city/district */
  location?: string;
  rating:    number;
  text:      string;
  initials:  string;
  /** Specific project this review relates to */
  project?:  string;
}
