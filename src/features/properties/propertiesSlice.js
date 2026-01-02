import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for testing
const mockProperties = [
  {
    id: 1,
    title: "2 BHK Apartment in Hinjewadi",
    location: "Hinjewadi, Pune",
    rent: 18000,
    deposit: 90000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: "apartment",
    furnished: "semi-furnished",
    description: "Well-maintained 2 BHK apartment with modern amenities",
    isVerified: true,
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"],
    amenities: ["Parking", "Security", "Gym", "Swimming Pool"]
  },
  {
    id: 2,
    title: "3 BHK Villa in Wakad",
    location: "Wakad, Pune",
    rent: 25000,
    deposit: 125000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: "villa",
    furnished: "furnished",
    description: "Spacious villa with garden and parking",
    isVerified: true,
    images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-400"],
    amenities: ["Garden", "Parking", "Security", "Power Backup"]
  },
  {
    id: 3,
    title: "1 BHK Studio in Baner",
    location: "Baner, Pune",
    rent: 12000,
    deposit: 60000,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: "apartment",
    furnished: "unfurnished",
    description: "Compact studio apartment for singles/couples",
    isVerified: false,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"],
    amenities: ["Parking", "24x7 Water"]
  },
];

// Async thunks
export const fetchFeaturedProperties = createAsyncThunk(
  'properties/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        properties: mockProperties,
        stats: {
          totalProperties: 1250,
          verifiedOwners: 980,
          happyTenants: 3200,
          cities: 15
        }
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch properties');
    }
  }
);

export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredProperties = [...mockProperties];
      
      // Apply filters
      if (filters.location) {
        filteredProperties = filteredProperties.filter(p => 
          p.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.type) {
        filteredProperties = filteredProperties.filter(p => 
          p.type === filters.type
        );
      }
      
      if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter(p => 
          p.bedrooms.toString() === filters.bedrooms
        );
      }
      
      if (filters.furnished) {
        filteredProperties = filteredProperties.filter(p => 
          p.furnished === filters.furnished
        );
      }
      
      if (filters.minPrice || filters.maxPrice) {
        filteredProperties = filteredProperties.filter(p => 
          p.rent >= (filters.minPrice || 0) && 
          p.rent <= (filters.maxPrice || 100000)
        );
      }
      
      return filteredProperties;
    } catch (error) {
      return rejectWithValue('Failed to fetch properties');
    }
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    featuredProperties: [],
    allProperties: [],
    loading: false,
    error: null,
    stats: null,
    filters: {
      location: '',
      type: '',
      minPrice: 0,
      maxPrice: 50000,
      bedrooms: '',
      furnished: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        location: '',
        type: '',
        minPrice: 0,
        maxPrice: 50000,
        bedrooms: '',
        furnished: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Featured Properties
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProperties = action.payload.properties;
        state.stats = action.payload.stats;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch All Properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.allProperties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters } = propertiesSlice.actions;
export default propertiesSlice.reducer;