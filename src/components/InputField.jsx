export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  rows = 1,
  className='',
  imageSrc = "",
}) {
  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
      ) : (
        <div className="relative">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={`${name} icon`}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center w-6 h-6"
            />
          )}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`block w-full ${imageSrc ? 'pl-12 pr-4' : 'px-4'} py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      )}
    </div>
  );
}
