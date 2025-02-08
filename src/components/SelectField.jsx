export default function SelectField({
    label,
    name,
    value,
    onChange,
    options = [],
    className = "",
  }) {
    return (
      <div className="mb-6">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }