import { JSX } from 'preact'
import { clsx } from 'clsx'
import { h, Fragment } from 'preact'

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'bordered' | 'gray'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    rounded?: boolean
    className?: string
    children: preact.ComponentChildren
    type?: 'button' | 'submit' | 'reset'
}

export function Button({
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    rounded = true,
    className,
    children,
    type = 'button',
    ...props
}: ButtonProps) {
    const baseClasses =
        'inline-flex items-center justify-center font-medium transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
        primary: 'bg-[#1e73ff] text-white hover:bg-[#1e73ff]/80',
        secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 ',
        gray: 'bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300 ',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
        bordered: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 ',
    }

    const sizes = {
        sm: 'px-3 h-8 text-[13px]',
        md: 'px-4 h-10 text-sm',
        lg: 'px-6 h-12 text-base',
    }

    const radiusClass = rounded ? 'rounded-md' : 'rounded-none'

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={clsx(
                baseClasses,
                variants[variant],
                sizes[size],
                radiusClass,
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
