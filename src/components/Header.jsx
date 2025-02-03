export default function Header({ title, subtitle }) {
    return (
      <>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="mb-6">{subtitle}</p>
      </>
    );
  }