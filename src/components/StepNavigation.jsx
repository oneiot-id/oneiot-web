export default function StepNavigation({ step, steps }) {
  return (
    <div className="flex justify-between items-center mt-4 mb-2 px-4">
      {steps.map((s) => (
        <div key={s.id} className="flex flex-col items-center">
          {/* Step Number in Circle */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              step === s.id
                ? "border-[#FFCF66] bg-[#FFCF66] text-black font-bold"
                : step > s.id
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-600 bg-white text-gray-600 font-semibold"
            }`}
          >
            {s.id}
          </div>
          {/* Step Label */}
          <span
            className={`mt-2 text-sm ${
              step === s.id ? "text-black font-bold" : "text-black"
            }`}
            // className={`mt-2 text-sm ${
            //   step === s.id || step > s.id
            //     ? "text-blue-600 font-semibold"
            //     : "text-gray-500"
            // }`}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
