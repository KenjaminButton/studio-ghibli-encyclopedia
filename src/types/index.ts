// Based on common Ghibli API structures - adjust fields as needed!

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string; // Rotten Tomatoes score
  image?: string; // Optional: API might provide banner/poster
  movie_banner?: string;
  people: string[]; // URLs or IDs of people
  species: string[]; // URLs or IDs
  locations: string[]; // URLs or IDs
  vehicles: string[]; // URLs or IDs
  url: string; // URL of the movie resource itself
}

export interface Person {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
  films: string[]; // URLs or IDs of films
  species: string; // URL or ID
  url: string; // URL of the person resource
  // Add image field if available from API or use a placeholder strategy
}

export interface Location {
  id: string;
  name: string;
  climate?: string;
  terrain?: string;
  surface_water?: string;
  residents: string[]; // URLs or IDs of people/species
  films: string[]; // URLs or IDs
  url: string; // URL of the location resource
}

export interface Species {
  id: string;
  name: string;
  classification?: string;
  eye_colors?: string;
  hair_colors?: string;
  people: string[]; // URLs or IDs
  films: string[]; // URLs or IDs
  url: string; // URL of the species resource
}

export interface Vehicle {
  id: string;
  name: string;
  description?: string;
  vehicle_class?: string;
  length?: string;
  pilot: string; // URL or ID
  films: string[]; // URLs or IDs
  url: string; // URL of the vehicle resource
}

// Helper type for fetching related data by URL
export interface GhibliResource {
    id: string;
    name?: string; // People, Locations, Species, Vehicles have name
    title?: string; // Movies have title
    url: string;
}