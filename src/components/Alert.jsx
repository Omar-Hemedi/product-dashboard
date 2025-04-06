import { useState } from "react";
import CloseButton from "./CloseButton";

export default function Alert({type, message}){
    const [showingAlert, setShowingAlert] = useState(true);

    const handleClose = () => {
        setShowingAlert(false);
    };

    let bgColor, textColor;
    if (type === 'error') {
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
    }else if (type === 'success'){
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
    }else if (type === 'info'){
        bgColor = 'bg-primary-100';
        textColor = 'text-primary-800';
    }

    return (
        <>
            {showingAlert && (
                <div className={`flex items-center p-4 mb-4 ${textColor} rounded-lg  ${bgColor}`} role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-4 h-4">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                        {message}
                    </div>
                    <CloseButton
                        onClick={handleClose}
                        className={`ms-auto -mx-1.5 -my-1.5 ${bgColor} ${textColor} rounded-lg focus:ring-2 focus:ring-${textColor} p-1.5 hover:${bgColor} inline-flex items-center justify-center h-8 w-8`}
                    />
                </div>
            )}     
        </>
    );
}

