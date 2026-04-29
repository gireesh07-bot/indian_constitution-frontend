// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // User endpoints
  USER_LOGIN: `${API_BASE_URL}/users/login`,
  USER_REGISTER: `${API_BASE_URL}/users/register`,
  USER_GET: (id) => `${API_BASE_URL}/users/${id}`,
  USER_GET_ALL: `${API_BASE_URL}/users`,

  // Lesson endpoints
  LESSONS_GET_ALL: `${API_BASE_URL}/lessons`,
  LESSONS_GET_BY_ID: (id) => `${API_BASE_URL}/lessons/${id}`,
  LESSONS_CREATE: `${API_BASE_URL}/lessons`,
  LESSONS_UPDATE: (id) => `${API_BASE_URL}/lessons/${id}`,
  LESSONS_DELETE: (id) => `${API_BASE_URL}/lessons/${id}`,

  // Quiz endpoints
  QUIZ_GET_ALL: `${API_BASE_URL}/quiz`,
  QUIZ_GET_BY_ID: (id) => `${API_BASE_URL}/quiz/${id}`,
  QUIZ_CREATE: `${API_BASE_URL}/quiz`,
  QUIZ_UPDATE: (id) => `${API_BASE_URL}/quiz/${id}`,
  QUIZ_DELETE: (id) => `${API_BASE_URL}/quiz/${id}`,
};

// Helper function for API calls
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API Error');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// User API functions
export const userAPI = {
  login: (email, password) =>
    apiCall(API_ENDPOINTS.USER_LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password, role) =>
    apiCall(API_ENDPOINTS.USER_REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    }),

  getUser: (id) =>
    apiCall(API_ENDPOINTS.USER_GET(id), {
      method: 'GET',
    }),

  getAllUsers: () =>
    apiCall(API_ENDPOINTS.USER_GET_ALL, {
      method: 'GET',
    }),
};

// Lesson API functions
export const lessonAPI = {
  getAll: () =>
    apiCall(API_ENDPOINTS.LESSONS_GET_ALL, {
      method: 'GET',
    }),

  getById: (id) =>
    apiCall(API_ENDPOINTS.LESSONS_GET_BY_ID(id), {
      method: 'GET',
    }),

  create: (lessonData) =>
    apiCall(API_ENDPOINTS.LESSONS_CREATE, {
      method: 'POST',
      body: JSON.stringify(lessonData),
    }),

  update: (id, lessonData) =>
    apiCall(API_ENDPOINTS.LESSONS_UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(lessonData),
    }),

  delete: (id) =>
    apiCall(API_ENDPOINTS.LESSONS_DELETE(id), {
      method: 'DELETE',
    }),
};

// Quiz API functions
export const quizAPI = {
  getAll: () =>
    apiCall(API_ENDPOINTS.QUIZ_GET_ALL, {
      method: 'GET',
    }),

  getById: (id) =>
    apiCall(API_ENDPOINTS.QUIZ_GET_BY_ID(id), {
      method: 'GET',
    }),

  create: (quizData) =>
    apiCall(API_ENDPOINTS.QUIZ_CREATE, {
      method: 'POST',
      body: JSON.stringify(quizData),
    }),

  update: (id, quizData) =>
    apiCall(API_ENDPOINTS.QUIZ_UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(quizData),
    }),

  delete: (id) =>
    apiCall(API_ENDPOINTS.QUIZ_DELETE(id), {
      method: 'DELETE',
    }),
};
