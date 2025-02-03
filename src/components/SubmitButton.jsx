export default function SubmitButton({ children, onClick, className = "" }) {
    return (
      <button
        type="submit"
        onClick={onClick}
        className={`w-full bg-blue-600 text-white py-4 rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {children}
      </button>
    );
  }