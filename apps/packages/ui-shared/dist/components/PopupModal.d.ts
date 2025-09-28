import { h } from 'preact';
export type ButtonAlignment = 'left' | 'center' | 'right' | 'space-between' | string;
export type ModalPosition = 'top' | 'center' | 'bottom';
export type ModalAnimation = 'slide' | 'fade' | 'popup' | 'none';
interface PopupModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: any;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    overlayOpacity?: number;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    buttonAlignment?: ButtonAlignment;
    showConfirmButton?: boolean;
    confirmButtonText?: string;
    onConfirm?: () => void;
    confirmButtonVariant?: 'primary' | 'secondary' | 'danger';
    width?: string | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
    position?: ModalPosition;
    animation?: ModalAnimation;
}
export declare function PopupModal({ isOpen, onClose, title, children, closeOnOverlayClick, closeOnEscape, showCloseButton, showCancelButton, cancelButtonText, buttonAlignment, showConfirmButton, confirmButtonText, onConfirm, confirmButtonVariant, overlayOpacity, width, position, animation, }: PopupModalProps): h.JSX.Element | null;
export {};
//# sourceMappingURL=PopupModal.d.ts.map