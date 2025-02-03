export default function Card({ children, className = "" }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div
      className={`bg-white p-4 w-full h-100${className}`}
    >
      {children}
    </div>
    </div>
  );
}