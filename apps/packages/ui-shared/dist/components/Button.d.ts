import { JSX } from 'preact';
interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'bordered' | 'gray';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    rounded?: boolean;
    className?: string;
    children: preact.ComponentChildren;
    type?: 'button' | 'submit' | 'reset';
}
export declare function Button({ variant, size, disabled, loading, rounded, className, children, type, ...props }: ButtonProps): JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map