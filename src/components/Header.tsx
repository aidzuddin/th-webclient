import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, Network, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center">
        <div className="ml-4 flex items-center gap-4">
          <img
            src="https://renewngo.compasia.my/renewngo/_nuxt/compasia-brand.CaklyQNK.png"
            alt="CompAsia Brand"
            className="w-24 h-auto"
          />
          <img
            src="https://renewngo.compasia.my/renewngo/_nuxt/ReNewNGO-horizontal-logo-1.IB7_J61G.png"
            alt="ReNewNGO Logo"
            className="w-24 h-auto"
          />
        </div>
      </header>
    </>
  )
}
