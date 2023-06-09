import * as mongoose from 'mongoose'

const connection: { isConnected: mongoose.ConnectionStates } = {
  isConnected: mongoose.ConnectionStates.uninitialized
}

export const connectDb = async () => {
  if (connection.isConnected === mongoose.ConnectionStates.connected) {
    console.log('Already connected to database!')
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === mongoose.ConnectionStates.connected) {
      console.log('Use previous connection to database!')
      return
    }
    await mongoose.disconnect()
  }
  const db = await mongoose.connect(process.env.MONGO_URL)
  console.log('New connection to database!')
  connection.isConnected = <mongoose.ConnectionStates>db.connections?.[0].readyState
}

export const disconnectDb = async () => {
  if (connection.isConnected === mongoose.ConnectionStates.connected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = mongoose.ConnectionStates.disconnected
    } else {
      console.log('Do not disconnect from database in development mode!')
    }
  }
}
