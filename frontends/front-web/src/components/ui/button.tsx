import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spin } from '@/components/spinner/spin';

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-white shadow hover:bg-secondary/75",
        outline:
          "border border-input border-white text-white bg-transparent shadow-sm hover:border-grey-100 hover:text-grey",
        secondary:
          "bg-grey-100 text-primary shadow-sm hover:bg-grey",
        link: "text-primary underline-offset-4 hover:underline",
        ico: "bg-accent hover:bg-accent/90 text-white shadow-sm ",
      },
      size: {
        default: "h-9 px-4 py-2 rounded",
        sm: "h-8 rounded px-3 text-xs",
        lg: "h-10 rounded px-8",
        icon: "h-9 w-9 rounded-full ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, isLoading,  ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading
          ? <>
            <Spin size={'sm'} className={size === 'icon' ? '' : 'mr-2'} variant={'secondary'}/>
            {size !== 'icon' && <>{children}</>}
          </>
          : <>
            {children}
          </>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
