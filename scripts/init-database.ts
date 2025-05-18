import { initDatabase } from "../utils/database"

async function main() {
  console.log("Initializing database...")

  try {
    const success = await initDatabase()

    if (success) {
      console.log("Database initialized successfully")
      process.exit(0)
    } else {
      console.error("Failed to initialize database")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error initializing database:", error)
    process.exit(1)
  }
}

main()
