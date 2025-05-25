import "./Popup.css"
import React from 'react'

interface PopupProps {
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
    errorText: string
}

const Popup: React.FC<PopupProps> = ({ isVisible, setIsVisible, errorText }) => {
    if (!isVisible) return null

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button
                    className="popup-close-button"
                    onClick={() => setIsVisible(false)}
                    aria-label="Close"
                >
                    &times
                </button>
                <div className="popup-content">
                    {errorText}
                </div>
            </div>
        </div>
    )
}

export { Popup }
