import { h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

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

const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export function PopupModal({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  showCancelButton = true,
  cancelButtonText = 'Cancel',
  buttonAlignment = 'right',
  showConfirmButton = false,
  confirmButtonText = 'Confirm',
  onConfirm,
  confirmButtonVariant = 'primary',
  overlayOpacity = 60,
  width = '500px',
  position = 'center',
  animation = 'slide',
}: PopupModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Animate in
      setTimeout(() => setIsVisible(true), 20);
    } else {
      // Animate out
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!isVisible) return;
    setIsVisible(false);
    const timer = setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  // Escape key
  useEffect(() => {
    if (!shouldRender || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldRender, closeOnEscape, handleClose]);

  // Click outside modal
  useEffect(() => {
    if (!shouldRender || !closeOnOverlayClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      const modalContent = modalRef.current?.querySelector('div[role="dialog"]');
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        modalContent &&
        !modalContent.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shouldRender, closeOnOverlayClick, handleClose]);

  if (!shouldRender) return null;

  const getWidthClass = () => {
    if (
      typeof width === 'string' &&
      ![
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        'full',
      ].includes(width)
    ) {
      return '';
    }

    const widthMap: Record<string, string> = {
      sm: '28rem',
      md: '32rem',
      lg: '36rem',
      xl: '42rem',
      '2xl': '48rem',
      '3xl': '56rem',
      '4xl': '64rem',
      '5xl': '72rem',
      '6xl': '80rem',
      '7xl': '88rem',
      full: '100%',
    };

    return widthMap[width as string] || '32rem';
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'items-start pt-8';
      case 'bottom':
        return 'items-end pb-4';
      case 'center':
      default:
        return 'items-center';
    }
  };

  // Force center transform origin for popup animation
  const getTransformOrigin = () => {
    return animation === 'popup' ? 'transform-origin: center' : '';
  };

  const getAnimationClasses = () => {
    if (isVisible) {
      switch (animation) {
        case 'slide':
          return 'translate-y-0 opacity-100';
        case 'fade':
          return 'opacity-100';
        case 'popup':
          return 'opacity-100 scale-100';
        default:
          return '';
      }
    } else {
      switch (animation) {
        case 'slide':
          return '-translate-y-10 opacity-0';
        case 'fade':
          return 'opacity-0';
        case 'popup':
          return 'opacity-0 scale-95';
        default:
          return '';
      }
    }
  };

  const handleOverlayClick = useCallback((e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      handleClose();
    }
  }, [closeOnOverlayClick, handleClose]);

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 flex ${getPositionClasses()} justify-center p-4 overflow-y-auto transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
      }}
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`bg-white rounded-lg shadow-xl transform transition-all duration-500 ease-out ${getAnimationClasses()}`}
        style={{
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, opacity',
          transformOrigin: animation === 'popup' ? 'center' : 'top',
          width:
            typeof width === 'string' &&
              ![
                'sm',
                'md',
                'lg',
                'xl',
                '2xl',
                '3xl',
                '4xl',
                '5xl',
                '6xl',
                '7xl',
                'full',
              ].includes(width)
              ? width.includes('%') || width.includes('px') || width.includes('rem') || width.includes('em')
                ? width
                : `${width}px`
              : 'auto',
          maxWidth: getWidthClass() === 'max-w-full' ? 'none' : undefined,
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="text-gray-500 rounded-md p-1.5 bg-gray-100 hover:bg-gray-200 hover:text-gray-500 focus:outline-none"
                aria-label="Close modal"
              >
                <svg
                  className="h-6 w-6"
                  fill="black"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="text-gray-600">{children}</div>

          {(showCancelButton || showConfirmButton) && (
            <div
              className={`mt-6 flex space-x-3 ${buttonAlignment === 'right'
                ? 'justify-end'
                : buttonAlignment === 'center'
                  ? 'justify-center'
                  : buttonAlignment === 'space-between'
                    ? 'justify-between'
                    : 'justify-start'
                }`}
            >
              {showCancelButton && (
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {cancelButtonText}
                </button>
              )}
              {showConfirmButton && onConfirm && (
                <button
                  onClick={() => {
                    onConfirm();
                    handleClose();
                  }}
                  className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${buttonVariants[confirmButtonVariant] || buttonVariants.primary
                    }`}
                >
                  {confirmButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
