import { usePage } from '@inertiajs/react';
import { CheckCircle, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Flash {
    success?: string | null;
    error?: string | null;
}

interface PageProps {
    flash: Flash;
}

export default function FlashMessage() {
    // Access the flash messages from the Inertia page props
    const { flash } = usePage<PageProps>().props;
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'success' | 'error' | null>(null);
    const [visible, setVisible] = useState(false);
    // Effect to handle flash messages when they change
    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');

            // Small delay so the enter animation works
            requestAnimationFrame(() => {
                setVisible(true);
            });
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');

            requestAnimationFrame(() => {
                setVisible(true);
            });
        } else {
            setVisible(false);
        }
    }, [flash.success, flash.error]);
    // Effect to automatically hide the flash message after 3 seconds
    useEffect(() => {
        if (!message) {
            return;
        }

        const timer = setTimeout(() => {
            setVisible(false);

            // Wait for exit animation before removing
            setTimeout(() => {
                setMessage(null);
                setType(null);
            }, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);
    // Function to manually close the flash message
    const closeMessage = () => {
        setVisible(false);

        setTimeout(() => {
            setMessage(null);
            setType(null);
        }, 300);
    };
    // If there's no message or type, don't render anything
    if (!message || !type) {
        return null;
    }
    // Determine if the message is a success or error type for styling
    const isSuccess = type === 'success';
    // Render the flash message with appropriate styling and animations
    return (
        <div
            className={`
                transform transition-all duration-300 ease-out
                ${
                    visible
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-3 opacity-0'
                }
            `}
        >
            <div
                className={`
                    relative flex items-center gap-3 rounded-md border px-4 py-3
                    text-sm shadow-sm
                    ${
                        isSuccess
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                    }
                `}
            >
                {/* Icon */}
                <div
                    className={`
                        transition-transform duration-300
                        ${visible ? 'scale-100' : 'scale-75'}
                    `}
                >
                    {isSuccess ? (
                        <CheckCircle className="h-5 w-5 shrink-0" />
                    ) : (
                        <XCircle className="h-5 w-5 shrink-0" />
                    )}
                </div>

                {/* Message */}
                <span className="flex-1">{message}</span>

                {/* Close */}
                <button
                    type="button"
                    onClick={closeMessage}
                    className="rounded-md p-1 transition-colors hover:bg-black/5"
                    aria-label="Close message"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}