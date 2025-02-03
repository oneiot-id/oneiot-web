export default function BackButton({ onClick }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-10 h-10 bg-white rounded-full border border-gray-800 shadow-md flex items-center justify-center mb-10"
      >
        <img src="/back-button.png" className="w-6 h-6"/>
      </button>
    );
  }