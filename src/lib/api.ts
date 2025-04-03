import { Movie, Person, Location, Species, Vehicle, GhibliResource } from '@/types';
import { notFound } from 'next/navigation';

const BASE_URL = 'https://ghibliapi.vercel.app';

async function fetchGhibli<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      if (response.status === 404) {
         // Use Next.js notFound() for specific 404s on detail pages if desired
         // For list pages, maybe return empty array or let error boundary catch
         console.warn(`Resource not found at ${endpoint}`);
         // Depending on context, you might throw or return a specific value
         // throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
      }
       throw new Error(`Failed to fetch ${endpoint}: ${response.statusText} (Status: ${response.status})`);
    }
    // Handle cases where API returns non-JSON or empty response for valid requests
    const text = await response.text();
    if (!text) {
        console.warn(`Empty response received for ${endpoint}`);
        // Return default value based on expected type T or throw
        return [] as T; // Example: return empty array for list endpoints
    }
    try {
        return JSON.parse(text) as T;
    } catch (e) {
        console.error(`Failed to parse JSON for ${endpoint}:`, e);
        throw new Error(`Invalid JSON response from ${endpoint}`);
    }
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    // Re-throw or handle error appropriately for the calling component
    throw error;
  }
}

// --- Movies ---
export async function getAllMovies(): Promise<Movie[]> {
  return fetchGhibli<Movie[]>('/films');
}

export async function getMovieById(id: string): Promise<Movie> {
    try {
      return await fetchGhibli<Movie>(`/films/${id}`);
    } catch (error: any) {
      if (error.message.includes('404')) {
        notFound(); // Trigger Next.js 404 page
      }
      throw error; // Re-throw other errors
    }
}

// --- People ---
export async function getAllPeople(): Promise<Person[]> {
  return fetchGhibli<Person[]>('/people');
}

export async function getPersonById(id: string): Promise<Person> {
    try {
        return await fetchGhibli<Person>(`/people/${id}`);
    } catch (error: any) {
         if (error.message.includes('404')) {
            notFound();
         }
         throw error;
    }
}

// --- Locations ---
export async function getAllLocations(): Promise<Location[]> {
  return fetchGhibli<Location[]>('/locations');
}

export async function getLocationById(id: string): Promise<Location> {
     try {
        return await fetchGhibli<Location>(`/locations/${id}`);
     } catch (error: any) {
         if (error.message.includes('404')) {
            notFound();
         }
         throw error;
     }
}

// --- Species ---
export async function getAllSpecies(): Promise<Species[]> {
  return fetchGhibli<Species[]>('/species');
}

export async function getSpeciesById(id: string): Promise<Species> {
    try {
        return await fetchGhibli<Species>(`/species/${id}`);
    } catch (error: any) {
         if (error.message.includes('404')) {
            notFound();
         }
         throw error;
    }
}

// --- Vehicles ---
export async function getAllVehicles(): Promise<Vehicle[]> {
  return fetchGhibli<Vehicle[]>('/vehicles');
}

export async function getVehicleById(id: string): Promise<Vehicle> {
    try {
        return await fetchGhibli<Vehicle>(`/vehicles/${id}`);
    } catch (error: any) {
         if (error.message.includes('404')) {
            notFound();
         }
         throw error;
    }
}


// --- Helper to fetch related resources by URL ---
// Note: The Ghibli API often returns full URLs for related items.
// This function fetches data from a given URL.
export async function getResourceByUrl<T>(url: string): Promise<T> {
    if (!url) throw new Error("URL is required to fetch resource.");

    // Validate if the URL is from the expected API base to prevent SSRF
    if (!url.startsWith(BASE_URL)) {
        console.warn(`Attempted to fetch resource from non-Ghibli API URL: ${url}`);
        throw new Error("Invalid resource URL");
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch resource ${url}: ${response.statusText}`);
      }
      return await response.json() as T;
    } catch (error) {
      console.error(`API call failed for ${url}:`, error);
      throw error;
    }
}

// --- Helper to fetch multiple resources concurrently ---
export async function getMultipleResources<T extends GhibliResource>(urls: string[]): Promise<T[]> {
    if (!urls || urls.length === 0) return [];
    try {
        const results = await Promise.allSettled(
             // Filter out potentially invalid/empty URLs before fetching
            urls.filter(url => url && url.startsWith(BASE_URL)).map(url => getResourceByUrl<T>(url))
        );

        // Log any failures but return successful ones
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.error(`Failed to fetch resource ${urls[index]}:`, result.reason);
            }
        });

        return results
            .filter((result): result is PromiseFulfilledResult<T> => result.status === 'fulfilled')
            .map(result => result.value);

    } catch (error) {
        console.error("Error fetching multiple resources:", error);
        return []; // Return empty array on general failure
    }
}