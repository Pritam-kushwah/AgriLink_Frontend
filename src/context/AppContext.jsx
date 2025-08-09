import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { MESSAGES } from '../utils/constants';

// Initial state
const initialState = {
  user: null,
  farmers: [],
  produces: [],
  marketData: [],
  loading: false,
  error: null,
  notifications: [],
  filters: {
    search: '',
    cropType: '',
    location: '',
    priceRange: '',
    status: '',
    sortBy: 'newest'
  },
  ui: {
    sidebarOpen: false,
    theme: 'light',
    language: 'en'
  }
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_FARMERS: 'SET_FARMERS',
  ADD_FARMER: 'ADD_FARMER',
  UPDATE_FARMER: 'UPDATE_FARMER',
  DELETE_FARMER: 'DELETE_FARMER',
  SET_PRODUCES: 'SET_PRODUCES',
  ADD_PRODUCE: 'ADD_PRODUCE',
  UPDATE_PRODUCE: 'UPDATE_PRODUCE',
  DELETE_PRODUCE: 'DELETE_PRODUCE',
  SET_MARKET_DATA: 'SET_MARKET_DATA',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_UI: 'SET_UI',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    case actionTypes.SET_FARMERS:
      return { ...state, farmers: action.payload };

    case actionTypes.ADD_FARMER:
      return { 
        ...state, 
        farmers: [...state.farmers, action.payload],
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: 'success', message: MESSAGES.SUCCESS.FARMER_ADDED }
        ]
      };

    case actionTypes.UPDATE_FARMER:
      return {
        ...state,
        farmers: state.farmers.map(farmer =>
          farmer.id === action.payload.id ? action.payload : farmer
        ),
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: 'success', message: MESSAGES.SUCCESS.FARMER_UPDATED }
        ]
      };

    case actionTypes.DELETE_FARMER:
      return {
        ...state,
        farmers: state.farmers.filter(farmer => farmer.id !== action.payload),
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: 'success', message: MESSAGES.SUCCESS.FARMER_DELETED }
        ]
      };

    case actionTypes.SET_PRODUCES:
      return { ...state, produces: action.payload };

    case actionTypes.ADD_PRODUCE:
      return { 
        ...state, 
        produces: [...state.produces, action.payload],
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: 'success', message: MESSAGES.SUCCESS.PRODUCE_ADDED }
        ]
      };

    case actionTypes.UPDATE_PRODUCE:
      return {
        ...state,
        produces: state.produces.map(produce =>
          produce.id === action.payload.id ? action.payload : produce
        ),
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: 'success', message: MESSAGES.SUCCESS.PRODUCE_UPDATED }
        ]
      };

    case actionTypes.DELETE_PRODUCE:
      return {
        ...state,
        produces: state.produces.filter(produce => produce.id !== action.payload)
      };

    case actionTypes.SET_MARKET_DATA:
      return { ...state, marketData: action.payload };

    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notif => notif.id !== action.payload)
      };

    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case actionTypes.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      };

    case actionTypes.SET_UI:
      return {
        ...state,
        ui: { ...state.ui, ...action.payload }
      };

    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),

    setFarmers: (farmers) => dispatch({ type: actionTypes.SET_FARMERS, payload: farmers }),
    addFarmer: (farmer) => dispatch({ type: actionTypes.ADD_FARMER, payload: farmer }),
    updateFarmer: (farmer) => dispatch({ type: actionTypes.UPDATE_FARMER, payload: farmer }),
    deleteFarmer: (id) => dispatch({ type: actionTypes.DELETE_FARMER, payload: id }),

    setProduces: (produces) => dispatch({ type: actionTypes.SET_PRODUCES, payload: produces }),
    addProduce: (produce) => dispatch({ type: actionTypes.ADD_PRODUCE, payload: produce }),
    updateProduce: (produce) => dispatch({ type: actionTypes.UPDATE_PRODUCE, payload: produce }),
    deleteProduce: (id) => dispatch({ type: actionTypes.DELETE_PRODUCE, payload: id }),

    setMarketData: (data) => dispatch({ type: actionTypes.SET_MARKET_DATA, payload: data }),

    addNotification: (notification) => {
      const notif = { ...notification, id: Date.now() };
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notif });
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: notif.id });
      }, 5000);
    },
    removeNotification: (id) => dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id }),

    setFilters: (filters) => dispatch({ type: actionTypes.SET_FILTERS, payload: filters }),
    resetFilters: () => dispatch({ type: actionTypes.RESET_FILTERS }),

    setUI: (ui) => dispatch({ type: actionTypes.SET_UI, payload: ui }),
    toggleSidebar: () => dispatch({ type: actionTypes.TOGGLE_SIDEBAR })
  };

  // Load initial data from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('agrilink-filters');
    const savedUI = localStorage.getItem('agrilink-ui');

    if (savedFilters) {
      try {
        actions.setFilters(JSON.parse(savedFilters));
      } catch (error) {
        console.error('Failed to parse saved filters:', error);
      }
    }

    if (savedUI) {
      try {
        actions.setUI(JSON.parse(savedUI));
      } catch (error) {
        console.error('Failed to parse saved UI settings:', error);
      }
    }
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem('agrilink-filters', JSON.stringify(state.filters));
  }, [state.filters]);

  // Save UI settings to localStorage
  useEffect(() => {
    localStorage.setItem('agrilink-ui', JSON.stringify(state.ui));
  }, [state.ui]);

  const value = {
    state,
    actions,
    // Computed values
    computed: {
      filteredFarmers: state.farmers.filter(farmer => {
        const matchesSearch = !state.filters.search || 
          farmer.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          farmer.email.toLowerCase().includes(state.filters.search.toLowerCase());
        const matchesLocation = !state.filters.location || farmer.location === state.filters.location;
        return matchesSearch && matchesLocation;
      }),
      availableProduces: state.produces.filter(produce => produce.status === 'AVAILABLE'),
      totalMarketValue: state.produces.reduce((sum, p) => sum + (p.quantity * p.pricePerUnit), 0),
      uniqueLocations: [...new Set(state.farmers.map(f => f.location).filter(Boolean))],
      uniqueCropTypes: [...new Set(state.produces.map(p => p.cropType).filter(Boolean))]
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;