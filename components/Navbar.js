import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
  return (
    <header>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src="/assets/image.png" alt="Logo" width={90} height={90} />
            </Link>
          </div>

          {/* Centered Text */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-black">
              AI driven Geospatial Air Quality Prediction In India 
            </h1>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar
