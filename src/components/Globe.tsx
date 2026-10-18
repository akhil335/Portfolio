"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"
import { twMerge } from "tailwind-merge"


const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 8000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check if WebGL is supported and enabled in the browser
    const isWebGLSupported = () => {
      try {
        const testCanvas = document.createElement("canvas")
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext("webgl2") ||
            testCanvas.getContext("webgl") ||
            testCanvas.getContext("experimental-webgl"))
        )
      } catch {
        return false
      }
    }

    if (!isWebGLSupported()) {
      console.warn("WebGL not supported or hardware acceleration is disabled.")
      return
    }

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth || 400
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const initialWidth = widthRef.current || 400
    let globe: ReturnType<typeof createGlobe> | null = null

    const handleContextLost = (e: Event) => {
      e.preventDefault()
      if (globe) {
        globe.destroy()
        globe = null
      }
    }

    canvas.addEventListener("webglcontextlost", handleContextLost, { once: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (globe && typeof (globe as any).toggle === "function") {
          (globe as any).toggle(entry.isIntersecting)
        }
      },
      { rootMargin: "100px" }
    )
    observer.observe(canvas)

    try {
      globe = createGlobe(canvas, {
        ...config,
        width: initialWidth * 2,
        height: initialWidth * 2,
        onRender: (state) => {
          if (!pointerInteracting.current) phiRef.current += 0.005
          state.phi = phiRef.current + rs.get()
          const currentW = widthRef.current || initialWidth
          state.width = currentW * 2
          state.height = currentW * 2
        },
      })

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1"
        }
      }, 0)
    } catch (err) {
      console.error("Error creating Globe WebGL instance:", err)
    }

    return () => {
      if (globe) {
        globe.destroy()
      }
      observer.disconnect()
      canvas.removeEventListener("webglcontextlost", handleContextLost)
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={twMerge(
        "mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
