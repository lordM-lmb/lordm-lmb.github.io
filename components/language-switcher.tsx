"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  onLanguageChange: (lang: string) => void
}

export function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState("es")

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
    onLanguageChange(lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Globe className="h-4 w-4" />
          <span className="uppercase">{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("es")}>Español</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

