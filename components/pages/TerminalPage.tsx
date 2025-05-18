"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TerminalPage() {
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState<string[]>([
    "CyberAI OS Terminal v1.0.0",
    "Type 'help' to see available commands",
    "-----------------------------------",
  ])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()

    if (!command.trim()) return

    // Add command to output
    setOutput((prev) => [...prev, `> ${command}`])

    // Process command
    const processedCommand = processCommand(command)
    setOutput((prev) => [...prev, ...processedCommand])

    // Clear command input
    setCommand("")
  }

  const processCommand = (cmd: string): string[] => {
    const lowerCmd = cmd.toLowerCase().trim()

    if (lowerCmd === "help") {
      return [
        "Available commands:",
        "  help     - Show this help message",
        "  clear    - Clear the terminal",
        "  version  - Show system version",
        "  date     - Show current date and time",
        "  echo     - Echo a message",
      ]
    } else if (lowerCmd === "clear") {
      setTimeout(() => {
        setOutput([
          "CyberAI OS Terminal v1.0.0",
          "Type 'help' to see available commands",
          "-----------------------------------",
        ])
      }, 0)
      return []
    } else if (lowerCmd === "version") {
      return ["CyberAI OS v1.0.0"]
    } else if (lowerCmd === "date") {
      return [new Date().toString()]
    } else if (lowerCmd.startsWith("echo ")) {
      return [lowerCmd.substring(5)]
    } else {
      return [`Command not found: ${cmd}. Type 'help' for available commands.`]
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Terminal</h1>
      <div className="flex-1 bg-black text-green-400 p-4 rounded-lg font-mono text-sm mb-4 border border-gray-700">
        <ScrollArea className="h-full">
          {output.map((line, i) => (
            <div key={i} className="mb-1">
              {line}
            </div>
          ))}
        </ScrollArea>
      </div>
      <form onSubmit={handleCommand} className="flex gap-2">
        <Input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command..."
          className="font-mono bg-black text-green-400 border-gray-700"
          autoComplete="off"
        />
        <Button type="submit">Run</Button>
      </form>
    </div>
  )
}
