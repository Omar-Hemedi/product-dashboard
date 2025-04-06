export default function PrimaryButton({type="", className="", children, ...props}) {
    return (
        <button 
        {...props}
        type={type}
        className={"w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
        + className}
        >
            {children}
        </button>
    );
}