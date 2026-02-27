'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { Product } from '@/types'
import { toast } from '@/hooks/use-toast'

interface WishlistContextType {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: number) => boolean
  getWishlistCount: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, isHydrated])

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist: Product[]) => {
      const exists = prevWishlist.find((item: Product) => item.id === product.id)
      if (exists) {
        return prevWishlist
      }
      return [...prevWishlist, product]
    })
    toast({
      title: 'Added to wishlist',
      description: product.title,
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist: Product[]) => prevWishlist.filter((item: Product) => item.id !== productId))
    toast({
      title: 'Removed from wishlist',
      description: 'Item removed from wishlist',
    })
  }

  const toggleWishlist = (product: Product) => {
    // determine current membership so we can show an appropriate toast
    const currentlyInWishlist = wishlist.some((item) => item.id === product.id)
    setWishlist((prevWishlist: Product[]) => {
      const exists = prevWishlist.find((item: Product) => item.id === product.id)
      if (exists) {
        return prevWishlist.filter((item: Product) => item.id !== product.id)
      }
      return [...prevWishlist, product]
    })

    if (currentlyInWishlist) {
      toast({ title: 'Removed from wishlist', description: product.title, variant: 'destructive' })
    } else {
      toast({ title: 'Added to wishlist', description: product.title })
    }
  }

  const isInWishlist = (productId: number) => {
    return wishlist.some((item: Product) => item.id === productId)
  }

  const getWishlistCount = () => {
    return wishlist.length
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
