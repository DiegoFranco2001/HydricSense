// const root = "http://localhost:3002"
const root = ""

// Available to create new process
export const availables = () => `${root}/available`

// GET METHODS
// Variable: [ph,temperature,turbidity] || id: number
export const inProcess = (variable) => `${root}/${variable}/inprocess`
export const allCollected = (variable) => `${root}/${variable}/collected`
export const idCollected = (variable, id) => `${root}/${variable}/collected/${id}`

// POST METHODS
// Variable: [ph,temperature,turbidity]
export const postNew = (variable) =>  `${root}/new/${variable}`

// DELETE METHODS
// Variable: [ph,temperature,turbidity] || id: number
export const deleteCollection = (variable, id) => `${root}/${variable}/delete/${id}`

//FIREBASE
// url and simulation: (ph/value, temp/value, turb/value)
export const ACIDITY = "ph/value"
export const TEMPERATURE = "temp/value"
export const TURBIDITY = "turb/value"