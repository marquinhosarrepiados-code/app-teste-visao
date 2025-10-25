// Mock Firebase para desenvolvimento local
// Substitua pelas configurações reais do Firebase quando disponível

const mockFirebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}

// Mock do Firestore para desenvolvimento
export const db = {
  // Mock collection method
  collection: (name: string) => ({
    addDoc: async (data: any) => {
      console.log(`Mock Firebase - Salvando em ${name}:`, data)
      return { id: 'mock-id-' + Date.now() }
    },
    getDocs: async () => {
      console.log(`Mock Firebase - Buscando dados de ${name}`)
      return { docs: [] }
    }
  })
}

// Mock das funções do Firestore
export const collection = (db: any, collectionName: string) => {
  console.log(`Mock Firebase - Acessando collection: ${collectionName}`)
  return {
    addDoc: async (data: any) => {
      console.log(`Mock Firebase - Salvando em ${collectionName}:`, data)
      return { id: 'mock-id-' + Date.now() }
    },
    getDocs: async () => {
      console.log(`Mock Firebase - Buscando dados de ${collectionName}`)
      return { docs: [] }
    }
  }
}

export const addDoc = async (collectionRef: any, data: any) => {
  console.log('Mock Firebase - addDoc:', data)
  return { id: 'mock-id-' + Date.now() }
}

export const updateDoc = async (docRef: any, data: any) => {
  console.log('Mock Firebase - updateDoc:', data)
  return true
}

export const doc = (db: any, collectionName: string, id: string) => {
  console.log(`Mock Firebase - Acessando documento: ${collectionName}/${id}`)
  return {
    id,
    collection: collectionName
  }
}

export const getDocs = async (query: any) => {
  console.log('Mock Firebase - getDocs')
  return { docs: [] }
}

export const query = (collection: any, ...conditions: any[]) => {
  console.log('Mock Firebase - query')
  return collection
}

export const where = (field: string, operator: string, value: any) => {
  console.log('Mock Firebase - where:', field, operator, value)
  return { field, operator, value }
}

export const auth = {
  currentUser: null
}

export default {
  db,
  auth
}