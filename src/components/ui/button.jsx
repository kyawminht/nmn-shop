import { cn } from "../../lib/utils"

export function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-9 px-3",
        size === "lg" && "h-11 px-8",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}