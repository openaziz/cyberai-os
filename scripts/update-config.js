// This script updates the config.json file with environment variables
// Run this script during the build process

const fs = require("fs")
const path = require("path")

// Path to the config file
const configPath = path.join(__dirname, "../public/config.json")

// Read the current config
let config = {}
try {
  const configData = fs.readFileSync(configPath, "utf8")
  config = JSON.parse(configData)
} catch (error) {
  console.log("Creating new config file")
  config = {}
}

// Update with environment variables
config.stackKey = process.env.STACK_PUBLISHABLE_CLIENT_KEY || ""
config.apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.cyberai-os.vercel.app"
config.appVersion = process.env.APP_VERSION || "1.0.0"
config.buildDate = new Date().toISOString().split("T")[0]

// Write the updated config
fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
console.log("Config file updated with environment variables")
