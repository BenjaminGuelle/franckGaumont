import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spin } from '@/components/spinner/spin';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[50px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary/90",
        defaultLine: "bg-primary-500 text-primary shadow hover:bg-primary-500/90",
        defaultOut: "border border-primary text-primary shadow hover:bg-primary-500/90",
        secondary: "bg-secondary text-white shadow-sm hover:bg-secondary/80",
        secondaryLine: "border border-secondary text-secondary shadow-sm hover:bg-secondary-500/80",
        secondaryOut: "bg-secondary-500 text-secondary shadow hover:bg-primary-500/90",
        link: "text-primary underline-offset-4 hover:underline",
        disable: "bg-grey-500 text-grey cursor-not-allowed"
      },
      size: {
        default: "h-[50px] px-[26px] py-[14px]",
        sm: "h-[32px] px-[24px] py-[12px] text-xs",
        lg: "h-[52px] px-[28px] py-[16px]",
        icon: "h-9 w-9",
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
  children?: React.ReactNode;
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading
          ? <>
              <Spin size={'sm'} className={size === 'icon' ? '' : 'mr-2'} variant={variant}/>
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
