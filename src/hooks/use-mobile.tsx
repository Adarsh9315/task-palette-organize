
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < MOBILE_BREAKPOINT)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize() // Check initial size
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}
