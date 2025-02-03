
// function Card({ children, className = "" }) {
//   return (
//     <div
//       className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function BackButton({ onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="text-gray-600 hover:text-gray-800 mb-4"
//     >
//       ← Back
//     </button>
//   );
// }

// function FormInput({
//   label,
//   type = "text",
//   value,
//   onChange,
//   placeholder = "",
//   className = "",
// }) {
//   return (
//     <div className={`mb-4 ${className}`}>
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// function SubmitButton({ children, onClick, className = "" }) {
//   return (
//     <button
//       type="submit"
//       onClick={onClick}
//       className={`w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// function Header({ title, subtitle }) {
//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-2">{title}</h1>
//       <p className="mb-6">{subtitle}</p>
//     </>
//   );
// }

// function Welcome() {
//   const navigate = useNavigate();

//   const handleToLogin = () => navigate("/login");
//   const handleToRegister = () => navigate("/register");

//   return (
//     <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
//       <Card>
//         <div className="flex justify-center">
//           <img src="/home.png" alt="Startup Logo" className="w-100 h-100" />
//         </div>
//         <div className="flex justify-center mt-4 mb-6">
//           <img src="/logo_bw.png" alt="Profile" className="h-24" />
//         </div>

//         <div className="text-center mt-4">
//           <p className="mt-4 text-gray-600">
//             OneIoT menyediakan jasa, layanan, dan produk yang berfokus di bidang
//             robotika, AI/ML, Internet of Things dan prototyping!
//           </p>
//         </div>

//         <div className="mt-8 space-y-4">
//           <SubmitButton onClick={handleToLogin}>Login</SubmitButton>
//           <div className="custom-daftar-button">
//             <SubmitButton
//               onClick={handleToRegister}
//               className="bg-white border border-gray-300 hover:border-gray-400 hover:shadow-md"
//             >
//               Daftar
//             </SubmitButton>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleBack = () => navigate("/");
//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate("/home");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <BackButton onClick={handleBack} />
//         <div className="flex justify-center mb-6">
//           <img src="/logo.png" alt="Profile" className="w-24 h-24" />
//         </div>
//         <Header title="Login" subtitle="Masuk untuk menggunakan aplikasi" />
//         <form onSubmit={handleLogin}>
//           <FormInput
//             label="Username atau Email"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <FormInput
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="flex items-center justify-between mb-6">
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
//               Lupa kata sandi?
//             </a>
//           </div>
//           <SubmitButton>Login</SubmitButton>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Belum memiliki akun?{" "}
//           <a
//             onClick={() => navigate("/register")}
//             href="#"
//             className="font-medium text-blue-600 hover:text-blue-500"
//           >
//             Daftar
//           </a>
//         </p>
//       </Card>
//     </div>
//   );
// }

// function Register() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleBack = () => navigate("/");
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!fullName || !email) {
//       alert("Nama lengkap dan email harus diisi.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/email/verification",
//         {
//           user: {
//             Id: 0,
//             full_name: fullName,
//             email: email,
//             password: "",
//             phone_number: "",
//             picture: "",
//             address: "",
//             pin_point: "",
//           },
//         }
//       );

//       const verificationCode = response.data.payload.uniqueCode;
//       localStorage.setItem("verificationCode", verificationCode);

//       console.log(response, verificationCode);

//       navigate("/verify");
//     } catch (error) {
//       console.error("Error verifying email:", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//       } else {
//         console.error("Error setting up the request:", error.message);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <BackButton onClick={handleBack} />
//         <div className="flex justify-center mb-6">
//           <img src="/logo.png" alt="Profile" className="w-24 h-24" />
//         </div>
//         <Header title="Daftar" subtitle="Daftarkan diri anda ke OneIoT" />
//         <form onSubmit={handleRegister}>
//           <FormInput
//             label="Nama Lengkap"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             required // Ensure the field is required
//           />
//           <FormInput
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required // Ensure the field is required
//           />
//           <SubmitButton>Verifikasi Email</SubmitButton>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Sudah memiliki akun?{" "}
//           <a
//             onClick={() => navigate("/login")}
//             href="#"
//             className="font-medium text-blue-600 hover:text-blue-500"
//           >
//             Login
//           </a>
//         </p>
//       </Card>
//     </div>
//   );
// }

// function VerifyPinPage() {
//   const [code, setCode] = useState("");
//   const [timer, setTimer] = useState(60);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else {
//       setIsResendDisabled(false);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleBack = () => {
//     navigate("/register");
//   };

//   const handleVerification = (e) => {
//     e.preventDefault();
//     const storedCode = localStorage.getItem("verificationCode");

//     if (code === storedCode) {
//       // Codes match, proceed to the next page
//       navigate("/biodata");
//     } else {
//       alert("Kode verifikasi tidak valid.");
//     }
//   };

//   const handleResend = () => {
//     setTimer(5);
//     setIsResendDisabled(true);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <Card>
//         <BackButton onClick={handleBack} />
//         <div className="flex justify-center mb-6">
//           <EnvelopeIcon className="h-20 w-20 text-blue-500" />
//         </div>
//         <Header
//           title="Verifikasi Email"
//           subtitle="Kode verifikasi terkirim ke abcd@gmail.com."
//         />
//         <form onSubmit={handleVerification}>
//           <div className="mb-12 flex justify-center">
//             <input
//               type="text"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               className="w-48 text-center text-2xl font-bold border-b-2 border-blue-500 focus:outline-none focus:border-blue-700"
//               maxLength={6}
//             />
//           </div>
//           <SubmitButton>Verifikasi</SubmitButton>
//         </form>
//         <p className="text-center mt-6">
//           Tidak menerima kode?{" "}
//           <button
//             onClick={handleResend}
//             disabled={isResendDisabled}
//             className={`text-blue-500 ${
//               isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Kirim ulang ({timer}s)
//           </button>
//         </p>
//       </Card>
//     </div>
//   );
// }

// function BiodataForm() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVer, setPasswordVer] = useState("");
//   const navigate = useNavigate();

//   const handleBack = () => navigate("/verify");
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/phonenumber");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <BackButton onClick={handleBack} />
//         <Header
//           title="Isi Data"
//           subtitle="Lanjutkan pengisian data untuk pendaftaran akun ke OneIoT Link"
//         />
//         <form onSubmit={handleSubmit}>
//           <FormInput
//             label="Nama Lengkap"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />
//           <FormInput
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <FormInput
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <FormInput
//             label="Konfirmasi Password"
//             type="password"
//             value={passwordVer}
//             onChange={(e) => setPasswordVer(e.target.value)}
//           />
//           <SubmitButton>Lanjutkan</SubmitButton>
//         </form>
//       </Card>
//     </div>
//   );
// }

// function PhoneNumberForm() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate("/biodata");
//   };

//   const handleSubmit = () => {
//     navigate("/numberverification");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <BackButton onClick={handleBack} />
//         <Header
//           title="Isi Data"
//           subtitle="Lanjutkan pengisian data untuk pendaftaran akun ke OneIoT Link"
//         />
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 mt-6">
//             <label className="block text-sm font-medium text-gray-700">
//               Nomor Whatsapp
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <img
//                   src="https://flagcdn.com/id.svg"
//                   alt="Indonesia Flag"
//                   className="h-5 w-5 rounded-full shadow-md"
//                 />
//                 <span className="ml-2 text-gray-700">+62</span>
//               </div>
//               <input
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="block w-full pl-20 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//           </div>
//           <SubmitButton>Lanjutkan</SubmitButton>
//         </form>
//       </Card>
//     </div>
//   );
// }

// function NumberVerificationPage() {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const [timer, setTimer] = useState(60);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else {
//       setIsResendDisabled(false);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleBack = () => {
//     navigate("/phonenumber");
//   };

//   const handleCodeChange = (index, value) => {
//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);
//     if (value && index < 5)
//       document.getElementById(`code-input-${index + 1}`).focus();
//   };

//   const handleResend = () => {
//     setTimer(60);
//     setIsResendDisabled(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/profilepicture");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <BackButton onClick={handleBack} />
//         <Header
//           title="Masukkan Kode"
//           subtitle={
//             <>
//               Kode verifikasi telah dikirimkan ke nomor WA{" "}
//               <span className="font-semibold">+62812239813</span>. Bukan nomor
//               Anda?{" "}
//               <button className="text-blue-500 hover:underline">Ubah</button>
//             </>
//           }
//         />
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex justify-center space-x-2">
//             {code.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`code-input-${index}`}
//                 type="text"
//                 value={digit}
//                 onChange={(e) => handleCodeChange(index, e.target.value)}
//                 maxLength={1}
//                 className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             ))}
//           </div>
//           <SubmitButton>Verifikasi</SubmitButton>
//         </form>
//         <p className="text-center mt-6">
//           Tidak menerima kode?{" "}
//           <button
//             onClick={handleResend}
//             disabled={isResendDisabled}
//             className={`text-blue-500 ${
//               isResendDisabled
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:underline"
//             }`}
//           >
//             Kirim ulang ({timer}s)
//           </button>
//         </p>
//       </Card>
//     </div>
//   );
// }

// function ProfilePicturePage() {
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePicture(file);
//       const imageUrl = URL.createObjectURL(file);
//       setPreview(imageUrl);
//       localStorage.setItem("profilePicture", imageUrl);
//     }
//   };

//   const handleSubmit = () => {
//     profilePicture
//       ? navigate("/address")
//       : document.getElementById("profile-picture").click();
//   };

//   const handleSkip = () => navigate("/address");

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <Header
//           title="Foto Profil"
//           subtitle="Kustomisasi foto profil. Anda dapat melewati langkah ini dan menggantinya nanti."
//         />
//         <div className="flex justify-center mb-4">
//           <label htmlFor="profile-picture" className="cursor-pointer relative">
//             <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//               {preview ? (
//                 <img
//                   src={preview}
//                   alt="Profile Preview"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="100"
//                   height="100"
//                   fill="currentColor"
//                   className="bi bi-person-circle text-gray-500"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                   <path
//                     fillRule="evenodd"
//                     d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
//                   />
//                 </svg>
//               )}
//             </div>
//             <div className="absolute bottom-0 right-0 bg-black rounded-full p-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="white"
//                 className="bi bi-pencil"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
//               </svg>
//             </div>
//           </label>
//           <input
//             id="profile-picture"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </div>
//         <SubmitButton onClick={handleSubmit}>
//           {profilePicture ? "Lanjutkan" : "Unggah Foto"}
//         </SubmitButton>
//         <button
//           onClick={handleSkip}
//           className="w-full bg-transparent text-blue-600 py-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
//         >
//           Lewati
//         </button>
//       </Card>
//     </div>
//   );
// }

// function MapComponent({ onLocationSelect }) {
//   const [position, setPosition] = useState([-6.2088, 106.8456]); // Default to Jakarta, Indonesia

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//         },
//         (err) => {
//           console.error("Error getting location:", err);
//         }
//       );
//     }
//   }, []);

//   return (
//     <MapContainer
//       center={position}
//       zoom={13}
//       className="h-64 w-full rounded-lg"
//       whenCreated={(map) => {
//         map.on("click", (e) => {
//           setPosition([e.latlng.lat, e.latlng.lng]);
//           if (onLocationSelect) {
//             onLocationSelect(e.latlng.lat, e.latlng.lng);
//           }
//         });
//       }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={position}>
//         <Popup>Drag the marker or click the map to select your location.</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// function AddressPage() {
//   const [address, setAddress] = useState("");
//   const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 });
//   const navigate = useNavigate();

//   const handleLocationSelect = (lat, lng) => setLocation({ lat, lng });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/registrationdone");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <Header
//           title="Isi Alamat Anda"
//           subtitle="Gunakan alamat Anda sekarang untuk pengiriman produk atau alat."
//         />
//         <form onSubmit={handleSubmit}>
//           <FormInput
//             label="Alamat Lengkap"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Masukkan alamat lengkap Anda"
//           />
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Pinpoint Lokasi Anda
//             </label>
//             <MapComponent onLocationSelect={handleLocationSelect} />
//           </div>
//           <SubmitButton>Lanjutkan</SubmitButton>
//         </form>
//       </Card>
//     </div>
//   );
// }

// function SuccessRegistrationPage() {
//   const navigate = useNavigate();

//   const handleFinish = () => navigate("/home");

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <Card>
//         <Header
//           title="Pengisian Data Diri Selesai"
//           subtitle="Sekarang Anda dapat menggunakan fitur secara penuh."
//         />
//         <div className="flex justify-center mb-6 animate-fade-in">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="200"
//             height="200"
//             fill="currentColor"
//             className="bi bi-check2-circle text-green-500"
//             viewBox="0 0 16 16"
//           >
//             <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
//             <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
//           </svg>
//         </div>
//         <SubmitButton onClick={handleFinish}>Selesai</SubmitButton>
//       </Card>
//     </div>
//   );
// }

// function HomeHeader({ title, className = "" }) {
//   const navigate = useNavigate();
//   const profilePicture = localStorage.getItem("profilePicture"); // Retrieve the uploaded profile picture from localStorage

//   const handleProfileClick = () => {
//     navigate("/profile"); // Navigate to the profile page
//   };

//   return (
//     <nav className="pt-4 px-2 flex justify-between items-center">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className={`text-black text-3xl font-bold ${className}`}>
//           {title}
//         </h1>
//         <button onClick={handleProfileClick} className="focus:outline-none">
//           <div className="w-12 h-12 rounded-full overflow-hidden border-">
//             {profilePicture ? (
//               <img
//                 src={profilePicture}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="40"
//                 height="40"
//                 fill="currentColor"
//                 className="bi bi-person-circle text-gray-500"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                 <path
//                   fillRule="evenodd"
//                   d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
//                 />
//               </svg>
//             )}
//           </div>
//         </button>
//       </div>
//     </nav>
//   );
// }

// function CustomPrevArrow(props) {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all"
//       onClick={onClick}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="white"
//         viewBox="0 0 24 24"
//       >
//         <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
//       </svg>
//     </div>
//   );
// }

// function CustomNextArrow(props) {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all"
//       onClick={onClick}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="white"
//         viewBox="0 0 24 24"
//       >
//         <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
//       </svg>
//     </div>
//   );
// }

// function Hero() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     swipeToSlide: true,
//     arrows: true, // Enable arrows
//     prevArrow: <CustomPrevArrow />, // Use custom previous arrow
//     nextArrow: <CustomNextArrow />, // Use custom next arrow
//     responsive: [
//       {
//         breakpoint: 1024, // Adjust settings for screens smaller than 1024px
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768, // Adjust settings for screens smaller than 768px
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const images = ["/home-hero.png", "/home-hero.png", "/home-hero.png"];

//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             {/* Image Container */}
//             <div
//               className="h-60 bg-cover bg-center relative rounded-2xl"
//               style={{ backgroundImage: `url(${image})` }}
//             >
//               {/* Overlay */}
//               <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>

//               {/* Text at Bottom Right */}
//               <div className="absolute bottom-4 left-4 z-10 text-white text-left">
//                 <h2 className="text-3xl font-bold">AI & Machine Learning</h2>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

// // function Services() {
// //   return (
// //     <div className="container mx-auto p-3 mt-4">
// //       <h2 className="text-2xl font-bold mb-4">Jasa dan Layanan</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         {/* Service 1: Internet of Things */}
// //         <div className="bg-white p-3 rounded-lg shadow-lg">
// //           <div className="flex items-center mb-2">
// //             <div className="w-6 h-8 mr-5 ">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 width="30"
// //                 height="30"
// //                 fill="currentColor"
// //                 className="bi bi-globe text-blue-600"
// //                 viewBox="0 0 16 16"
// //               >
// //                 <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
// //               </svg>
// //             </div>
// //             <h3 className="text-3xl font-semibold">Internet of Things</h3>
// //           </div>
// //           <p>Pembuatan prototype, web, dan peralatan berbasis IoT</p>
// //         </div>

// //         {/* Service 2: AI & Machine Learning */}
// //         <div className="bg-white p-3 rounded-lg shadow-lg">
// //           <div className="flex items-center mb-2">
// //             <div className="w-6 h-8 mr-5">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 width="30"
// //                 height="30"
// //                 fill="currentColor"
// //                 className="bi bi-bounding-box text-green-600"
// //                 viewBox="0 0 16 16"
// //               >
// //                 <path d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2zm6 1v2h2v6h-2v2H5v-2H3V5h2V3zm1-2h3v3h-3zm3 11v3h-3v-3zM4 15H1v-3h3zM1 4V1h3v3z" />
// //               </svg>
// //             </div>
// //             <h3 className="text-3xl font-semibold">AI & Machine Learning</h3>
// //           </div>
// //           <p>Computer vision, otomasi, dan robotik</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// function FeatureCard({ icon, title, bgColor, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex flex-col items-center bg-white pt-4 px-3 pb-2 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg focus:outline-none"
//     >
//       <div
//         className={`w-16 h-16 mb-2 flex items-center justify-center ${bgColor} rounded-full transition-colors hover:bg-opacity-80`}
//       >
//         {icon}
//       </div>
//       <h2 className="text-sm font-semibold transition-colors hover:text-blue-600">
//         {title}
//       </h2>
//     </button>
//   );
// }

// function FeatureColumns() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       title: "IoT",
//       icon: <img src="/iot2-icon.png" className="w-9 h-9" alt="IoT icon" />,
//       bgColor: "bg-[#005DD6]",
//       product: "Internet of Things",
//     },
//     {
//       title: "AI & ML",
//       icon: <img src="/ai-ml-icon.png" className="w-9 h-9" alt="AI/ML icon" />,
//       bgColor: "bg-[#553DE7]",
//       product: "AI/Machine Learning",
//     },
//     {
//       title: "Robotic",
//       icon: (
//         <img src="/robot-icon.png" className="w-10 h-10" alt="Robot icon" />
//       ),
//       bgColor: "bg-[#1BBE5B]",
//       product: "Robotic",
//     },
//     {
//       title: "Mechatronics",
//       icon: (
//         <img
//           src="/mechatronics-icon.png"
//           className="w-10 h-10"
//           alt="Mechatronics icon"
//         />
//       ),
//       bgColor: "bg-[#E51825]",
//       product: "Mechatronics",
//     },
//     {
//       title: "Web Development",
//       icon: (
//         <img
//           src="/iot-icon.png"
//           className="w-9 h-9"
//           alt="Web Development icon"
//         />
//       ),
//       bgColor: "bg-[#E93DD2]",
//       product: "Web Development",
//     },
//   ];

//   const handleFeatureClick = (product) => {
//     navigate("/order", { state: { product } });
//   };

//   return (
//     <>
//       {/* Jasa dan Layanan Section */}
//       <div className="mt-3">
//         <h1 className="text-2xl font-bold mb-1">Jasa dan Layanan</h1>
//         <div className="flex overflow-x-auto space-x-4 text-center">
//           {features.map((feature, index) => (
//             <FeatureCard
//               key={index}
//               icon={feature.icon}
//               title={feature.title}
//               bgColor={feature.bgColor}
//               onClick={() => handleFeatureClick(feature.product)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// function ProductCard({ image, title, price, rating }) {
//   return (
//     <div className="flex-1 transition-transform transform hover:scale-105 hover:shadow-lg">
//       <div className="flex mb-2">
//         <img
//           src={image}
//           alt={title}
//           className="w-48 h-40 object-cover rounded-lg transition-opacity hover:opacity-90"
//         />
//       </div>

//       <div className="transition-colors hover:text-blue-600">
//         <h2 className="text-sm font-bold">{title}</h2>
//         <p className="text-gray-600">
//           {price} ⭐ {rating}
//         </p>
//       </div>
//     </div>
//   );
// }

// function Product() {
//   const products = [
//     {
//       image: "/produk.png",
//       title: "Alat Monitoring Listrik",
//       price: "Rp. 1.300.500",
//       rating: "4.2",
//     },
//     {
//       image:
//         "https://eu-images.contentstack.com/v3/assets/blt31d6b0704ba96e9d/blt62263bd789102182/65b2794064cf57040aaf9182/Screenshot_(1243).png?width=1280&auto=webp&quality=95&format=jpg&disable=upscale",
//       title: "Robot Humanoid",
//       price: "Rp. 500.000.000",
//       rating: "4.7",
//     },
//   ];

//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-1">Produk</h1>
//       <div className="flex space-x-4 p-4">
//         {products.map((product, index) => (
//           <ProductCard
//             key={index}
//             image={product.image}
//             title={product.title}
//             price={product.price}
//             rating={product.rating}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// function BottomNav({ activeItem, onItemClick }) {
//   const navigate = useNavigate();

//   const handleItemClick = (itemId) => {
//     onItemClick(itemId); // Update active item state
//     switch (itemId) {
//       case "beranda":
//         navigate("/home"); // Navigate to the Home page
//         break;
//       case "order":
//         navigate("/order"); // Navigate to the Order page
//         break;
//       case "transaksi":
//         navigate("/transaction"); // Navigate to the Transaction page
//         break;
//       case "notifikasi":
//         navigate("/notification"); // Navigate to the Notification page
//         break;
//       default:
//         break;
//     }
//   };

//   const navItems = [
//     {
//       id: "beranda",
//       label: "Beranda",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="none"
//           stroke="currentColor"
//           className={`w-6 h-6 ${
//             activeItem === "beranda"
//               ? "text-blue-600 fill-blue-600"
//               : "text-gray-500"
//           }`}
//           viewBox="0 0 18 16"
//         >
//           <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
//         </svg>
//       ),
//     },
//     {
//       id: "order",
//       label: "Order",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="none"
//           stroke="currentColor"
//           className={`w-6 h-6 ${
//             activeItem === "order"
//               ? "text-blue-600 fill-blue-600 stroke-none"
//               : "text-gray-500"
//           }`}
//           viewBox="0 0 18 16"
//         >
//           <path
//             fillRule="evenodd"
//             d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: "transaksi",
//       label: "Transaksi",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="none"
//           stroke="currentColor"
//           className={`w-6 h-6 ${
//             activeItem === "transaksi"
//               ? "text-blue-600 fill-blue-600"
//               : "text-gray-500"
//           }`}
//           viewBox="0 0 18 16"
//         >
//           <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
//         </svg>
//       ),
//     },
//     {
//       id: "notifikasi",
//       label: "Notifikasi",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           fill="none"
//           stroke="currentColor"
//           className={`w-6 h-6 ${
//             activeItem === "notifikasi"
//               ? "text-blue-600 fill-blue-600"
//               : "text-gray-500"
//           }`}
//           viewBox="0 0 18 16"
//         >
//           <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-around items-center py-3">
//           {navItems.map((item) => (
//             <button
//               key={item.id}
//               className="flex flex-col items-center focus:outline-none"
//               onClick={() => handleItemClick(item.id)}
//             >
//               {item.icon}
//               <span
//                 className={`text-sm ${
//                   activeItem === item.id ? "text-blue-600" : "text-gray-700"
//                 }`}
//               >
//                 {item.label}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Home() {
//   const [activeItem, setActiveItem] = useState("beranda");
//   const navigate = useNavigate();

//   const handleItemClick = (itemId) => {
//     setActiveItem(itemId);
//     console.log(`${itemId} clicked`);

//     switch (itemId) {
//       case "beranda":
//         navigate("/home");
//         break;
//       case "order":
//         navigate("/order");
//         break;
//       case "transaksi":
//         navigate("/transaction");
//         break;
//       case "notifikasi":
//         navigate("/notification");
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <>
//       <HomeHeader title="Beranda" />
//       <div className="container mx-auto p-2">
//         <Hero />
//         <FeatureColumns />
//         <div className="pb-20">
//           <Product />
//           <BottomNav activeItem={activeItem} onItemClick={handleItemClick} />
//         </div>
//       </div>
//     </>
//   );
// }

// function OrderPage() {
//   const [activeItem, setActiveItem] = useState("order");
//   const [step, setStep] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [orderConfirmed, setOrderConfirmed] = useState(true);

//   // User data state
//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     additionalNotes: "",
//   });

//   // Order details state (including briefPoints)
//   const [orderDetails, setOrderDetails] = useState({
//     serviceName: "",
//     product: "",
//     deadline: "",
//     workSpeed: "",
//     briefTemplate: null,
//     additionalNotes: "",
//     briefPoints: [{ id: 1, text: "", isFocused: false }],
//   });

//   const orderSteps = [
//     { id: 1, label: "Isi Data Diri" },
//     { id: 2, label: "Pesan Order" },
//     { id: 3, label: "Review" },
//     { id: 4, label: "Konfirmasi" },
//   ];

//   // Handle step navigation
//   const handleNextStep = () => {
//     if (step < 5) setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     if (step > 0) setStep(step - 1);
//   };

//   const handleCancelOrder = () => {
//     setStep(0);
//     setOrderDetails({
//       serviceName: "",
//       product: "",
//       deadline: "",
//       workSpeed: "",
//       briefTemplate: null,
//       additionalNotes: "",
//       briefPoints: [{ id: 1, text: "", isFocused: false }],
//     });
//     setUserData({
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       address: "",
//       additionalNotes: "",
//     });
//   };
//   const location = useLocation();
//   const { product } = location.state || {};

//   useEffect(() => {
//     if (product) {
//       handleProductSelect(product);
//     }
//   }, [product]);

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//     setOrderDetails((prev) => ({ ...prev, product: product }));
//     setStep(1);
//   };

//   const handleUserDataChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhoneNumberChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "phoneNumber") {
//       let number = value;

//       if (number.startsWith("+62")) {
//         number = number.slice(3);
//       } else if (number.startsWith("0")) {
//         number = number.slice(1);
//       } else if (number.startsWith("62")) {
//         number = number.slice(2);
//       }

//       setUserData((prev) => ({ ...prev, [name]: number }));
//     } else {
//       setUserData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleOrderDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setOrderDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle adding a new brief point
//   const handleAddBriefPoint = () => {
//     const newBriefPoint = {
//       id: orderDetails.briefPoints.length + 1,
//       text: "",
//       isFocused: false,
//     };
//     setOrderDetails((prev) => ({
//       ...prev,
//       briefPoints: [...prev.briefPoints, newBriefPoint],
//     }));
//   };

//   // Handle changes in a brief point's text
//   const handleBriefPointChange = (id, text) => {
//     const updatedBriefPoints = orderDetails.briefPoints.map((point) =>
//       point.id === id ? { ...point, text } : point
//     );
//     setOrderDetails((prev) => ({ ...prev, briefPoints: updatedBriefPoints }));
//   };

//   // Handle saving a brief point
//   const handleSaveBriefPoint = (id) => {
//     const updatedBriefPoints = orderDetails.briefPoints.map((point) =>
//       point.id === id ? { ...point, isFocused: false } : point
//     );
//     setOrderDetails((prev) => ({ ...prev, briefPoints: updatedBriefPoints }));
//   };

//   // Handle deleting a brief point
//   const handleDeleteBriefPoint = (id) => {
//     const filteredBriefPoints = orderDetails.briefPoints.filter(
//       (point) => point.id !== id
//     );
//     setOrderDetails((prev) => ({ ...prev, briefPoints: filteredBriefPoints }));
//   };

//   // Handle focus on a brief point
//   const handleFocusBriefPoint = (id) => {
//     const updatedBriefPoints = orderDetails.briefPoints.map((point) =>
//       point.id === id
//         ? { ...point, isFocused: true }
//         : { ...point, isFocused: false }
//     );
//     setOrderDetails((prev) => ({ ...prev, briefPoints: updatedBriefPoints }));
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     console.log("Order submitted:", { userData, orderDetails });
//     alert("Order confirmed!");
//   };

//   return (
//     <>
//       <HomeHeader title="Pemesanan" />
//       <div className="container mx-auto p-2">
//         {step === 0 && (
//           <OrderSelection
//             onProductSelect={() => setStep(1)}
//             orderDetails={orderDetails}
//           />
//         )}
//         {step > 0 && (
//           <>
//             {/* Step Navigation */}
//             {step < 5 && <StepNavigation step={step} steps={orderSteps} />}

//             {/* Step Content */}
//             <div className="flex justify-center p-1 mb-20">
//               <div className="bg-white border border-gray-300 p-7 rounded-lg shadow-md w-full max-w-md">
//                 {step === 1 && (
//                   <OrderPersonalData
//                     userData={userData}
//                     handleUserDataChange={handleUserDataChange}
//                     handlePhoneNumberChange={handlePhoneNumberChange}
//                   />
//                 )}
//                 {step === 2 && (
//                   <OrderDetails
//                     orderDetails={orderDetails}
//                     handleOrderDetailsChange={handleOrderDetailsChange}
//                     handleAddBriefPoint={handleAddBriefPoint}
//                     handleBriefPointChange={handleBriefPointChange}
//                     handleSaveBriefPoint={handleSaveBriefPoint}
//                     handleDeleteBriefPoint={handleDeleteBriefPoint}
//                     handleFocusBriefPoint={handleFocusBriefPoint}
//                   />
//                 )}
//                 {step === 3 && (
//                   <OrderReview
//                     userData={userData}
//                     orderDetails={orderDetails}
//                   />
//                 )}
//                 {step === 4 && (
//                   <OrderConfirmation
//                     handleSubmit={handleSubmit}
//                     orderDetails={orderDetails}
//                     orderConfirmed={orderConfirmed}
//                   />
//                 )}
//                 {step === 5 && (
//                   <OrderSummary
//                     orderDetails={orderDetails}
//                     userData={userData}
//                   />
//                 )}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between mt-6">
//                   {step >= 1 && step !== 3 && (
//                     <button
//                       onClick={handlePreviousStep}
//                       className="custom-daftar-button font-bold bg-white border border-gray-300 py-2 px-4 rounded-lg hover:border-gray-400 hover:shadow-md"
//                     >
//                       {step === 1 ? "Batalkan" : "Kembali"}
//                     </button>
//                   )}
//                   {step < 3 && step !== 3 && (
//                     <button
//                       onClick={handleNextStep}
//                       className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//                     >
//                       Lanjutkan
//                     </button>
//                   )}

//                   {/* Step 3 Buttons */}
//                   {step === 3 && (
//                     <>
//                       <button
//                         onClick={() => {
//                           setStep(1); // Go back to the previous step for editing
//                         }}
//                         className="custom-daftar-button font-bold bg-white border border-gray-300 py-2 px-4 rounded-lg hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                       >
//                         Ubah
//                       </button>
//                       <button
//                         onClick={() => {
//                           handleNextStep();
//                         }}
//                         className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         Simpan & Order
//                       </button>
//                     </>
//                   )}

//                   {/* Step 4 Buttons */}
//                   {step === 4 && (
//                     <>
//                       {orderConfirmed ? (
//                         <button
//                           onClick={() => {
//                             handleNextStep();
//                           }}
//                           className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                           Lihat Transaksi
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => {
//                             handleCancelOrder();
//                           }}
//                           className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                         >
//                           Batalkan Order
//                         </button>
//                       )}
//                     </>
//                   )}
//                   {/* Step 5 Buttons */}
//                   {step === 5 && (
//                     <button
//                       onClick={() => {
//                         handleNextStep();
//                       }}
//                       className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       Lihat Transaksi
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <BottomNav activeItem={activeItem} onItemClick={setActiveItem} />
//     </>
//   );
// }

// function StepNavigation({ step, steps }) {
//   return (
//     <div className="flex justify-between items-center mt-3 mb-3 px-4">
//       {steps.map((s, index) => (
//         <div key={index} className="flex flex-col items-center">
//           {/* Step Number in Circle */}
//           <div
//             className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
//               step === s.id
//                 ? "border-[#FFCF66] bg-[#FFCF66] text-black font-bold"
//                 : step > s.id
//                 ? "border-blue-600 bg-blue-600 text-white"
//                 : "border-gray-600 bg-white text-gray-600 font-semibold"
//             }`}
//           >
//             {s.id}
//           </div>
//           {/* Step Label */}
//           <span
//             className={`mt-2 text-sm ${
//               step === s.id ? "text-black font-bold" : "text-gray-600"
//             }`}
//           >
//             {s.label}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// function OrderSelection({ onProductSelect, orderDetails }) {
//   const reviews = [
//     {
//       name: "Erlangga Satrya",
//       time: "1 bulan",
//       text: "WOII GESS 🔥🔥 ini sih bukan kaleng-kaleng, full power MAXIMUM OVERDRIVE!!! 🚀💨 Skibidi dop dop dop yes yes, AUTO S++ RANK 🏆💯!! Mata gw sampe kegeser liat keindahan ini, GGWP no debat!!! 😵✨",
//       rating: 4.5,
//     },
//     {
//       name: "Billie E.",
//       time: "3 bulan",
//       text: "Wah, pengiriman cepat banget ke Nganjuk! 😍 Sampai-sampai aku udah tua duluan nungguin. Internet di Mars aja mungkin lebih stabil daripada update tracking-nya. Tapi ya sudahlah, yang penting paketnya akhirnya sampai... dengan penuh drama dan ketegangan. 📦✨",
//       rating: 3,
//     },
//   ];

//   const productIcons = {
//     "Internet of Things": {
//       icon: <img src="/iot2-icon.png" className="w-9 h-9" alt="IoT icon" />,
//       bgColor: "bg-[#005DD6]",
//     },
//     "AI/Machine Learning": {
//       icon: <img src="/ai-ml-icon.png" className="w-9 h-9" alt="AI/ML icon" />,
//       bgColor: "bg-[#553DE7]",
//     },
//     Robotic: {
//       icon: (
//         <img src="/robot-icon.png" className="w-10 h-10" alt="Robot icon" />
//       ),
//       bgColor: "bg-[#1BBE5B]",
//     },
//     Mechatronics: {
//       icon: (
//         <img
//           src="/mechatronics-icon.png"
//           className="w-10 h-10"
//           alt="Mechatronics icon"
//         />
//       ),
//       bgColor: "bg-[#E51825]",
//     },
//     "Web Development": {
//       icon: (
//         <img
//           src="/iot-icon.png"
//           className="w-9 h-9"
//           alt="Web Development icon"
//         />
//       ),
//       bgColor: "bg-[#E93DD2]",
//     },
//   };

//   return (
//     <div className="flex flex-col p-3 pt-0 mb-20">
//       <p className="text-xl mb-4">Buat Pemesanan Baru</p>
//       <div className="flex overflow-x-auto space-x-2 text-center">
//         <button
//           onClick={onProductSelect}
//           className="flex flex-col items-center justify-center w-32 h-32 border border-gray-400 rounded-2xl shadow-md"
//         >
//           <img src="add-order.png" className="w-10 h-10" alt="Add Order" />
//           <span className="mt-2 text-sm font-bold text-black">Pesan</span>
//         </button>
//         {orderDetails.product && (
//           <div className="flex flex-col justify-center items-center bg-white w-32 h-32">
//             <div
//               className={`w-16 h-16 mb-2 flex items-center justify-center ${
//                 productIcons[orderDetails.product].bgColor
//               } rounded-full`}
//             >
//               {productIcons[orderDetails.product].icon}
//             </div>
//             <h2 className="text-sm font-bold">
//               {orderDetails.product}
//             </h2>
//           </div>
//         )}
//       </div>

//       {orderDetails.serviceName && (
//         <div className="mt-8 space-y-4">
//           <h2 className="text-xl font-bold mb-4">Pesanan Aktif</h2>
//           <div className="bg-white border border-gray-300 px-4 pt-3 pb-2 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">
//               {orderDetails.serviceName}
//               <span className="text-sm text-[#FBB214] absolute right-12 pt-3">
//                 Menunggu
//               </span>
//             </h3>
//             <p className="text-sm text-gray-600">09:58 27/01/2025</p>
//           </div>
//         </div>
//       )}

//       <h2 className="text-xl font-bold mt-8">Apa Kata Orang?</h2>
//       <div className="mt-4 space-y-4">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className="p-4 bg-white border border-gray-300 rounded-lg shadow"
//           >
//             <p className="font-semibold">
//               {review.name}{" "}
//               <span className="text-sm text-gray-500 absolute right-12">
//                 {review.time}
//               </span>
//             </p>
//             <p className="mt-2">{review.text}</p>
//             <p className="mt-2 text-yellow-500">
//               {"⭐".repeat(Math.round(review.rating))}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function OrderPersonalData({
//   userData,
//   handleUserDataChange,
//   handlePhoneNumberChange,
// }) {
//   return (
//     <>
//       <h1 className="text-2xl text-center font-bold mb-2">Isi Data Diri</h1>
//       <p className="text-gray-800">
//         Pastikan data yang tertera sesuai dengan kondisi yang sebenarnya.
//       </p>
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Nama Lengkap
//         </label>
//         <input
//           type="text"
//           name="fullName"
//           value={userData.fullName}
//           onChange={handleUserDataChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Email
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={userData.email}
//           onChange={handleUserDataChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Nomor WhatsApp
//         </label>
//         <div className="mt-1 relative rounded-md shadow-sm">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <img
//               src="https://flagcdn.com/id.svg"
//               alt="Indonesia Flag"
//               className="h-5 w-5 rounded-full shadow-md"
//             />
//             <span className="ml-2 text-gray-700">+62</span>
//           </div>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={userData.phoneNumber}
//             onChange={handlePhoneNumberChange}
//             className="block w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Alamat Lengkap
//         </label>
//         <textarea
//           name="address"
//           value={userData.address}
//           onChange={handleUserDataChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={3}
//         />
//       </div>
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Catatan Tambahan Data Diri
//         </label>
//         <textarea
//           name="additionalNotes"
//           value={userData.additionalNotes}
//           onChange={handleUserDataChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={3}
//           // placeholder="Masukkan catatan tambahan (opsional)"
//         />
//       </div>
//     </>
//   );
// }

// function OrderDetails({
//   orderDetails,
//   handleOrderDetailsChange,
//   handleAddBriefPoint,
//   handleBriefPointChange,
//   handleSaveBriefPoint,
//   handleDeleteBriefPoint,
//   handleFocusBriefPoint,
// }) {
//   return (
//     <>
//       <h1 className="text-2xl text-center font-bold mb-6">Data Order</h1>

//       {/* Nama Pemesanan Jasa/Layanan */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Nama Pemesanan Jasa/Layanan
//         </label>
//         <input
//           type="text"
//           name="serviceName"
//           value={orderDetails.serviceName}
//           onChange={handleOrderDetailsChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Pilih Produk/Layanan */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Pilih Produk/Layanan
//         </label>
//         <select
//           name="product"
//           value={orderDetails.product}
//           onChange={handleOrderDetailsChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Pilih Produk/Layanan</option>
//           <option value="Internet of Things">Internet of Things</option>
//           <option value="Robotic">Robotic</option>
//           <option value="AI/Machine Learning">AI/Machine Learning</option>
//           <option value="Mechatronics">Mechatronics</option>
//           <option value="Web Development">Web Development</option>
//         </select>
//       </div>

//       {/* Tanggal Deadline / Jatuh Tempo */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Tanggal Deadline / Jatuh Tempo
//         </label>
//         <input
//           type="date"
//           name="deadline"
//           value={orderDetails.deadline}
//           onChange={handleOrderDetailsChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Kecepatan Pengerjaan */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Kecepatan Pengerjaan
//         </label>
//         <select
//           name="workSpeed"
//           value={orderDetails.workSpeed}
//           onChange={handleOrderDetailsChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="Reguler">Reguler</option>
//           <option value="Cepat">Cepat</option>
//           <option value="Express">Express</option>
//         </select>
//       </div>

//       {/* File Upload (OneloT Brief Template) */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Brief Pengerjaan
//         </label>
//         <input
//           type="file"
//           name="briefTemplate"
//           onChange={handleOrderDetailsChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Brief Point Penting */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Brief Point Penting
//         </label>
//         {orderDetails.briefPoints.map((point, index) => (
//           <div key={point.id} className="mb-4">
//             {/* Input square with prefix number */}
//             <div className="relative">
//               {/* Prefix number */}
//               <span className="absolute left-3 top-2.5 text-gray-500 pointer-events-none">
//                 {index + 1}.
//               </span>
//               {/* Textarea */}
//               <textarea
//                 value={point.text}
//                 onChange={(e) =>
//                   handleBriefPointChange(point.id, e.target.value)
//                 }
//                 onFocus={() => handleFocusBriefPoint(point.id)}
//                 className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows={4}
//               />
//             </div>
//             {point.isFocused && (
//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={() => handleSaveBriefPoint(point.id)}
//                   className="bg-blue-600 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Simpan
//                 </button>
//                 {orderDetails.briefPoints.length > 1 && (
//                   <button
//                     onClick={() => handleDeleteBriefPoint(point.id)}
//                     className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   >
//                     Hapus
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//         <button
//           onClick={handleAddBriefPoint}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           + Tambah Brief Point
//         </button>
//       </div>

//       {/* Catatan Tambahan */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Catatan Tambahan
//         </label>
//         <textarea
//           name="additionalNotes"
//           value={orderDetails.additionalNotes}
//           onChange={handleOrderDetailsChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={4}
//         />
//       </div>
//     </>
//   );
// }

// function CheckIcon() {
//   return (
//     <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//       <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-4 w-4 text-white"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }

// function DownloadIcon() {
//   return (
//     <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="currentColor"
//         className="bi bi-download fill-blue-600"
//         viewBox="0 0 16 16"
//       >
//         <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
//         <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
//       </svg>
//     </div>
//   );
// }

// function ReviewSquare({ label, content, className = "" }) {
//   return (
//     <div className="mb-6">
//       <h2 className="text-lg font-semibold mb-2">{label}</h2>
//       <div
//         className={`bg-gray-100 pl-3 pr-7 py-3 rounded-lg relative ${className}`}
//       >
//         <p className="text-gray-700  transform translate-y-2">{content}</p>
//         {label === "Rangkuman Pemesanan" ? <DownloadIcon /> : <CheckIcon />}
//       </div>
//     </div>
//   );
// }

// function OrderReview({ userData, orderDetails }) {
//   console.log(userData.phoneNumber);

//   return (
//     <>
//       <h1 className="text-2xl text-center font-bold mb-6">Review Pemesanan</h1>
//       <p className="text-gray-600 mb-6">
//         Cek kembali data permintaan, jika belum sesuai Anda dapat mengubahnya
//         kembali
//       </p>

//       <ReviewSquare
//         label={"Rangkuman Pemesanan"}
//         content={orderDetails.serviceName}
//         className="bg-white border border-gray-300"
//       />
//       <ReviewSquare label={"Nama Lengkap"} content={userData.fullName} />
//       <ReviewSquare label={"Email"} content={userData.email} />
//       <ReviewSquare
//         label={"Nomor WhatsApp"}
//         content={userData.phoneNumber ? `+62${userData.phoneNumber}` : ""}
//       />
//       <ReviewSquare label={"Alamat Lengkap"} content={userData.address} />
//     </>
//   );
// }

// function OrderConfirmation({ handleSubmit, orderDetails, orderConfirmed }) {
//   return (
//     <>
//       <h1 className="text-2xl text-center font-bold mb-12">Pesanan Dibuat</h1>
//       <div className="flex justify-center mb-12">
//         <div
//           className={`w-32 h-32 bg-${
//             orderConfirmed ? "green-500" : "[#FFCF66]"
//           } rounded-full flex items-center justify-center`}
//         >
//           {orderConfirmed ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-24 w-24 text-white"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               className="bi bi-clock-history"
//               viewBox="0 0 16 16"
//             >
//               <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
//               <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
//               <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
//             </svg>
//           )}
//         </div>
//       </div>
//       <p className="text-xl text-center font-bold mb-6">
//         {orderConfirmed ? "Pesanan Dikonfirmasi" : "Menunggu Konfirmasi"}
//       </p>
//       <div className="p-1 rounded-lg mb-6">
//         {orderConfirmed ? (
//           <p className="text-gray-700">
//             Pesanan <strong>{orderDetails.serviceName}</strong> telah
//             dikonfirmasi, lanjutkan dengan pembayaran melalui menu{" "}
//             <strong>Transaksi</strong>.
//           </p>
//         ) : (
//           <p className="text-gray-700 ">
//             Pesanan <strong>{orderDetails.serviceName}</strong> telah dibuat,
//             tunggu konfirmasi dari pihak OneIoT, selanjutnya Anda akan dihubungi
//             melalui email atau WhatsApp yang aktif.
//           </p>
//         )}
//       </div>
//     </>
//   );
// }

// function OrderSummary({ orderDetails, userData }) {
//   return (
//     <>
//       <h1 className="text-center text-2xl font-bold mb-4">Rincian Pesanan</h1>
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           <img src="/logo.png" alt="Logo" className="w-14 h-14" />{" "}
//         </div>
//         <div className="text-right">
//           <h2 className="text-sm text-gray-500">Kode Pesanan</h2>
//           <p className="text-lg font-semibold text-black">#29120</p>
//         </div>
//       </div>
//       <SummaryRow label="Nama Pesanan" value={orderDetails.serviceName} />
//       <SummaryRow
//         label="Status"
//         value="Selesai"
//         className="text-sm text-[#2CA131] bg-[#C3FFC6] rounded-lg p-1"
//       />
//       <SummaryRow label="Waktu Dibuat" value="14:58 WIB" />
//       <SummaryRow label="Tanggal Dibuat" value="02/11/2024" />
//       <SummaryRow label="Pemesan" value={userData.fullName} />
//       <SummaryRow label="Email" value={userData.email} />
//       <SummaryRow label="WhatsApp" value={`+62${userData.phoneNumber}`} />
//       <SummaryRow label="Alamat" value={userData.address} />
//       <SummaryRow label="Total Harga" value="Rp475.000" />
//     </>
//   );
// }

// function SummaryRow({ label, value, className = "" }) {
//   return (
//     <div className="flex justify-between items-center mb-3">
//       <h2 className="text-base text-[#686868]">{label}</h2>
//       <p className={`text-base ${className}`}>{value}</p>
//     </div>
//   );
// }

// function TransactionPage() {
//   const [activeItem, setActiveItem] = useState("transaksi");
//   const [step, setStep] = useState(3);
//   const [paymentMethod, setPaymentMethod] = useState("QRIS");
//   const [paymentProof, setPaymentProof] = useState(null);

//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [ratingLabel, setRatingLabel] = useState("");

//   const ratingLabels = [
//     "Buruk",
//     "Kurang",
//     "Cukup",
//     "Memuaskan",
//     "Sangat Memuaskan",
//   ];

//   const fullName = "Erlangga Satrya";
//   const address = "UNY";
//   const shipmentStatus =
//     "Pesanan sampai di sorting center KOTABANDUNG (MH BANDUNG)";

//   const transactionSteps = [
//     { id: 1, label: "Pembayaran" },
//     { id: 2, label: "Produksi" },
//     { id: 3, label: "Pengiriman" },
//     { id: 4, label: "Review" },
//   ];

//   const orderDetails = {
//     orderId: "#69420",
//     status: "Unpaid",
//     product: "Alat Monitoring Flow Air",
//     date: "09:58 27/01/2025",
//   };

//   const paymentDetails = {
//     basePrice: "Rp 120.000",
//     serviceFee: "Rp 475.000",
//     shippingFee: "Rp 175.000",
//     tax: "Rp 84.700",
//     additionalFee: "Rp 100.000",
//     total: "Rp 954.700,00",
//     qrisId: "6942032356816166",
//     bcaAccount: "2501142524",
//   };

//   const productionStatus = {
//     date: "28/01/2025",
//     dateEstimation: "01/01/2025",
//     status: "Quality Check",
//     level: "Full Speed",
//   };

//   const shipmentDetails = {
//     dateDelivery: "01/02/2025",
//     dateArrival: "04/02/2025",
//     courier: "JNE Reguler",
//     receiptNumber: "TKP01-LK57GJV2",
//   };

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   const handleNextStep = () => {
//     if (step < 4) setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     if (step > 1) setStep(Math.round(step - 1));
//   };

//   const handlePaymentProofUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPaymentProof(file.name);
//       console.log("File uploaded:", file);
//     }
//   };

//   const handleDeleteProof = () => {
//     setPaymentProof(null);
//   };

//   if (step === 1) {
//     orderDetails.status = "Unpaid";
//   } else if (step === 1.5) {
//     orderDetails.status = "Pending";
//   } else if (step === 2) {
//     orderDetails.status = "Proses";
//   } else if (step === 3) {
//     orderDetails.status = "Dikirim";
//   } else if (step === 4 || step === 4.5) {
//     orderDetails.status = "Selesai";
//   }

//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     setStep(4.5);
//   };

//   const handleSkipReview = (e) => {
//     e.preventDefault();
//     setStep(4.5);
//     setRating(0);
//     setRatingLabel("");
//     setComment("");
//   };

//   const handleStarClick = (value) => {
//     setRating(value);
//     setRatingLabel(ratingLabels[value - 1]);
//   };

//   return (
//     <>
//       <HomeHeader title="Transaksi" />
//       <div className="container mx-auto p-2">
//         <StepNavigation
//           step={step === 4.5 ? Math.round(step) : Math.floor(step)}
//           steps={transactionSteps}
//         />
//         <div className="p-2 mb-20">
//           <TransactionOrderDetail
//             orderDetails={orderDetails}
//             className={`${step >= 4 ? "bg-[#C3FFC6]" : "bg-[#FFE085]"}`}
//           />
//           {step === 1 && (
//             <>
//               <PaymentDetails paymentDetails={paymentDetails} />
//               <PaymentMethod
//                 paymentMethod={paymentMethod}
//                 handlePaymentMethodChange={handlePaymentMethodChange}
//               />
//             </>
//           )}
//           {step === 1.5 && (
//             <>
//               <PaymentDetails paymentDetails={paymentDetails} />
//               <PaymentMethodAndProof
//                 paymentMethod={paymentMethod}
//                 paymentDetails={paymentDetails}
//                 paymentProof={paymentProof}
//                 handlePaymentProofUpload={handlePaymentProofUpload}
//                 handleDeleteProof={handleDeleteProof}
//               />
//             </>
//           )}
//           {step === 2 && (
//             <>
//               <ProductionStatus
//                 productionStatus={productionStatus}
//                 paymentMethod={paymentMethod}
//                 fullName={fullName}
//               />
//               <ProductionStatusTimeline productionStatus={productionStatus} />
//             </>
//           )}
//           {step === 3 && (
//             <>
//               <Shipment
//                 shipmentDetails={shipmentDetails}
//                 fullName={fullName}
//                 address={address}
//               />
//               <ShipmentTracking shipmentStatus={shipmentStatus} />
//             </>
//           )}
//           {(step === 4 || step === 4.5) && (
//             <>
//               <Shipment
//                 shipmentDetails={shipmentDetails}
//                 fullName={fullName}
//                 address={address}
//               />
//               <PaymentDetails paymentDetails={paymentDetails} />
//               <ProductionStatus
//                 productionStatus={productionStatus}
//                 paymentMethod={paymentMethod}
//                 fullName={fullName}
//               />
//               {step === 4 ? (
//                 <ProductReviewForm
//                   rating={rating}
//                   setRating={setRating}
//                   comment={comment}
//                   setComment={setComment}
//                   ratingLabel={ratingLabel}
//                   onStarRating={handleStarClick}
//                 />
//               ) : (
//                 <ProductReview
//                   rating={rating}
//                   comment={comment}
//                   ratingLabel={ratingLabel}
//                 />
//               )}
//             </>
//           )}
//           <div
//             className={`flex ${
//               step === 1.5 && orderDetails.status === "Pending"
//                 ? "justify-center"
//                 : "justify-between"
//             } mt-6`}
//           >
//             {step >= 1 && step !== 4 && (
//               <BackButtonNavigation handleItemClick={handlePreviousStep} />
//             )}

//             {step === 1 && (
//               <PositiveButtonNavigation
//                 handleItemClick={() => setStep(1.5)}
//                 label="Bayar"
//               />
//             )}

//             {step === 1.5 && orderDetails.status === "proses"}

//             {step === 2 && <PositiveButtonNavigation label="Hubungi" />}
//             {step === 3 && (
//               <PositiveButtonNavigation
//                 label="Pesanan Tiba"
//                 handleItemClick={handleNextStep}
//               />
//             )}
//             {step === 4 && (
//               <>
//                 <BackButtonNavigation
//                   handleItemClick={handleSkipReview}
//                   label="Tanpa Review"
//                 />
//                 <PositiveButtonNavigation
//                   label="Kirim Ulasan"
//                   handleItemClick={handleSubmitReview}
//                   isDisabled={rating ? false : true}
//                 />
//               </>
//             )}
//             {step === 4.5 && (
//               <button className="text-white border border-gray-300 py-2 px-4 rounded-lg bg-[#D01F2B] hover:bg-red-700">
//                 Ajukan Komplain
//               </button>
//             )}
//           </div>
//         </div>
//         <BottomNav activeItem={activeItem} onItemClick={setActiveItem} />
//       </div>
//     </>
//   );
// }

// function PositiveButtonNavigation({
//   handleItemClick,
//   label = "Lanjutkan",
//   className = "",
//   isDisabled = false,
// }) {
//   console.log(isDisabled);

//   return (
//     <button
//       disabled={isDisabled}
//       onClick={handleItemClick}
//       className={`px-4 py-2 rounded-lg ${
//         !isDisabled
//           ? "text-white bg-blue-600 hover:bg-blue-700"
//           : "text-gray-700 bg-gray-300 cursor-not-allowed opacity-50"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// function BackButtonNavigation({ handleItemClick, label = "Kembali" }) {
//   return (
//     <button
//       onClick={handleItemClick}
//       className="custom-daftar-button font-bold bg-white border border-gray-300 py-2 px-4 rounded-lg hover:border-gray-400 hover:shadow-md ${className}"
//     >
//       {label}
//     </button>
//   );
// }

// function TransactionOrderDetail({ orderDetails, className = "" }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-3">Detail Pesanan</h2>

//       <div className="bg-gray-200 rounded-xl">
//         <div className="flex justify-between items-center px-4 py-2">
//           <span className="font-bold text-black">#{orderDetails.orderId}</span>
//           <span
//             className={`text-sm font-semibold text-black px-3 py-1 rounded-lg ${className}`}
//           >
//             {orderDetails.status}
//           </span>
//         </div>

//         <div className="bg-white border border-gray-300 p-3 rounded-xl shadow-md w-full max-w-md relative">
//           <p className="text-base font-semibold">{orderDetails.product}</p>
//           <p className="text-sm text-gray-600 mt-1">
//             <span className="font-bold">{orderDetails.time}</span>{" "}
//             {orderDetails.date}
//           </p>
//           <a
//             href="#"
//             className="text-sm text-blue-600 font-semibold no-underline absolute right-3 top-1/2 transform -translate-y-1/2"
//           >
//             Lihat Rincian
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PaymentDetails({ paymentDetails }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Rincian Pembayaran</h2>

//       <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
//         <div className="space-y-2">
//           <PaymentRow label="Harga Pokok" value={paymentDetails.basePrice} />
//           <PaymentRow
//             label="Biaya Jasa & Layanan"
//             value={paymentDetails.serviceFee}
//           />
//           <PaymentRow
//             label="Ongkos Pengiriman"
//             value={paymentDetails.shippingFee}
//           />
//           <PaymentRow label="Pajak (PPN 11%)" value={paymentDetails.tax} />
//           <PaymentRow
//             label="Biaya Tambahan"
//             value={paymentDetails.additionalFee}
//           />
//         </div>

//         <div className="flex justify-between items-center font-bold mt-4">
//           <span className="text-gray-700">Total Pembayaran</span>
//           <span className="text-blue-600">{paymentDetails.total}</span>
//         </div>
//       </div>
//       <div className="text-right mt-2">
//         <a
//           href="#"
//           className="text-sm text-blue-600 font-semibold no-underline"
//         >
//           Lihat Invoice
//         </a>
//       </div>
//     </div>
//   );
// }

// function PaymentRow({ label, value, className = "" }) {
//   return (
//     <div className="flex justify-between">
//       <span className="text-gray-600 my-1">{label}</span>
//       <span className={`my-1 ${className}`}>{value}</span>
//     </div>
//   );
// }

// function PaymentMethod({ paymentMethod, handlePaymentMethodChange }) {
//   const paymentOptions = [
//     {
//       id: "QRIS",
//       name: "QRIS OneIoT ID",
//       account: "6942032356816166",
//       logo: "/qris-logo.png",
//     },
//     {
//       id: "BCA",
//       name: "BCA Virtual Account",
//       account: "2501142524",
//       logo: "/bca-logo.png",
//     },
//   ];

//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Opsi Pembayaran</h2>

//       <div className="space-y-3">
//         {paymentOptions.map((option) => (
//           <div
//             key={option.id}
//             onClick={() => handlePaymentMethodChange(option.id)}
//             className={`flex items-center justify-between border rounded-lg px-3 py-2 shadow-md cursor-pointer transition-all 
//               ${
//                 paymentMethod === option.id
//                   ? "border-blue-600 ring-2 ring-blue-400"
//                   : "border-gray-300 bg-white"
//               }`}
//           >
//             <div className="flex items-center space-x-8">
//               <img src={option.logo} alt={option.name} className="w-12" />
//               <div>
//                 <p className="text-base font-semibold mb-1">{option.name}</p>
//                 <p className="text-sm text-gray-600 mb-1">{option.account}</p>
//               </div>
//             </div>

//             {/* {paymentMethod === option.id && <div className="w-2 h-full bg-blue-600 rounded-r-lg"></div>} */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function PaymentMethodAndProof({
//   paymentMethod,
//   paymentDetails,
//   paymentProof,
//   handlePaymentProofUpload,
//   handleDeleteProof,
// }) {
//   return (
//     <>
//       <div className="mb-4">
//         <h2 className="text-xl font-bold mb-2">Metode Pembayaran Dipilih</h2>
//         <p className="text-gray-600 font-semibold">
//           Pembayaran diproses, tunggu konfirmasi selanjutnya, harap periksa
//           secara berkala.
//         </p>
//         <div className="flex items-center justify-between border rounded-lg px-3 py-2 shadow-md bg-white">
//           <div className="flex items-center space-x-8">
//             <img
//               src={
//                 paymentMethod === "QRIS" ? "/qris-logo.png" : "/bca-logo.png"
//               }
//               alt={paymentMethod === "QRIS" ? "QRIS" : "BCA"}
//               className="w-12"
//             />
//             <div>
//               <p className="text-base font-semibold mb-1">
//                 {paymentMethod === "QRIS"
//                   ? "QRIS OneIoT ID"
//                   : "BCA Virtual Account"}
//               </p>
//               <p className="text-sm text-gray-600 mb-1">
//                 {paymentMethod === "QRIS"
//                   ? paymentDetails.qrisId
//                   : paymentDetails.bcaAccount}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-bold mb-2">Bukti Pembayaran (Opsional)</h2>
//         <label
//           htmlFor="proof"
//           className="flex items-center space-x-2 border border-gray-300 rounded-full p-4 cursor-pointer bg-white shadow-sm transition hover:bg-gray-100"
//         >
//           <img
//             src="/album-logo.png"
//             alt="Payment Proof"
//             className="text-blue-600 h-6 w-6"
//           />
//           <span className="text-gray-600">
//             {paymentProof ? paymentProof : "Tambahkan bukti pembayaran"}
//           </span>
//           {paymentProof && (
//             <button
//               type="button"
//               onClick={handleDeleteProof}
//               className="text-red-500 hover:text-red-700 transition"
//             >
//               <img
//                 src="/trash-icon.png"
//                 alt="delete button"
//                 className="w-5 h-5"
//               />
//             </button>
//           )}
//           <input
//             type="file"
//             id="proof"
//             accept="image/jpeg, image/png"
//             className="hidden"
//             onChange={handlePaymentProofUpload}
//           />
//         </label>
//       </div>
//     </>
//   );
// }

// function ProductionStatus({ productionStatus, paymentMethod, fullName }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Status Produksi</h2>

//       <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
//         <div className="space-y-2">
//           <PaymentRow label="Tanggal Produksi" value={productionStatus.date} />
//           <PaymentRow
//             label="Estimasi Selesai"
//             value={productionStatus.dateEstimation}
//           />
//           <PaymentRow
//             label="Status Terbaru"
//             value={productionStatus.status}
//             className="font-bold"
//           />
//           <PaymentRow label="Pemesan" value={fullName} />
//           <PaymentRow
//             label="Kecepatan Pengerjaan"
//             value={productionStatus.level}
//           />
//           <PaymentRow label="Metode Pembayaran" value={paymentMethod} />
//         </div>
//       </div>
//     </div>
//   );
// }

// const ProductionStatusTimeline = ({ productionStatus }) => {
//   const [showDetails, setShowDetails] = useState(true);

//   const steps = [
//     { id: 1, label: "Transaksi diterima", time: "09:25", date: "28/01/2025" },
//     { id: 2, label: "Pembelian Komponen", time: "09:35", date: "28/01/2025" },
//     { id: 3, label: "Desain PCB", time: "10:35", date: "29/01/2025" },
//     { id: 4, label: "Assembly Elektronik", time: "12:35", date: "29/01/2025" },
//     { id: 5, label: "Testing Elektronik", time: "16:35", date: "29/01/2025" },
//     { id: 6, label: "Design 3D CAD", time: "08:35", date: "30/01/2025" },
//     { id: 7, label: "Print 3D", time: "12:35", date: "30/01/2025" },
//     { id: 8, label: "Assembly Casing", time: "15:35", date: "30/01/2025" },
//     { id: 9, label: "Programming Micro", time: "09:40", date: "31/01/2025" },
//     { id: 10, label: "Testing", time: "12:40", date: "31/01/2025" },
//     { id: 11, label: "Quality Check", time: "16:40", date: "31/01/2025" },
//   ];

//   const currentStepIndex = steps.findIndex(
//     (step) => step.label === productionStatus.status
//   );

//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Tahapan Produksi</h2>

//       <div className="bg-white p-4 pb-2 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
//         <div className="relative">
//           {steps.map((step, index) => (
//             <div
//               key={step.id}
//               className={`flex items-start space-x-3 relative ${
//                 !showDetails && index !== currentStepIndex ? "hidden" : ""
//               }`}
//             >
//               <div className="flex flex-col items-center">
//                 {index < currentStepIndex ? (
//                   <CheckCircle className="text-blue-500 h-6 w-6" />
//                 ) : (
//                   <Circle
//                     className={
//                       index === currentStepIndex
//                         ? "text-blue-500 h-6 w-6"
//                         : "text-gray-300 h-6 w-6"
//                     }
//                   />
//                 )}
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`h-7 w-0.5 ${
//                       index < currentStepIndex ? "bg-blue-500" : "bg-gray-300"
//                     }`}
//                   />
//                 )}
//               </div>
//               <div className="flex-1">
//                 <p
//                   className={
//                     index === currentStepIndex ? "font-bold" : "text-gray-700"
//                   }
//                 >
//                   {step.label}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-boldtext-gray-500 mb-0">
//                   {step.time}
//                 </p>
//                 <p className="text-xs text-gray-500">{step.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-right mt-2">
//         <button
//           onClick={() => setShowDetails(!showDetails)}
//           className="text-sm text-blue-600 font-semibold hover:text-blue-700 focus:outline-none"
//         >
//           {showDetails ? "Sembunyikan Detail" : "Tampilkan Detail"}
//         </button>
//       </div>
//     </div>
//   );
// };

// function Shipment({ shipmentDetails, fullName, address }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Rincian Pengiriman</h2>

//       <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
//         <div className="space-y-2">
//           <PaymentRow
//             label="Tanggal Pengiriman"
//             value={shipmentDetails.dateDelivery}
//           />
//           <PaymentRow
//             label="Estimasi Tiba"
//             value={shipmentDetails.dateArrival}
//           />
//           <PaymentRow label="Penerima" value={fullName} />
//           <PaymentRow label="Kurir" value={shipmentDetails.courier} />
//           <PaymentRow label="Alamat Tujuan" value={address} />
//           <PaymentRow label="No. Resi" value={shipmentDetails.receiptNumber} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ShipmentTracking({ shipmentStatus }) {
//   const [showDetails, setShowDetails] = useState(true);

//   const steps = [
//     {
//       id: 1,
//       label: "Pesanan sudah di-pickup oleh kurir BANI RAMDANI",
//       location: "Kurir JNE",
//       time: "09:25",
//       date: "28/01/2025",
//     },
//     {
//       id: 2,
//       label: "Paket telah drop off di TH PANYILEUKAN",
//       location: "Kurir JNE",
//       time: "09:25",
//       date: "28/01/2025",
//     },
//     {
//       id: 3,
//       label: "Pesanan sampai di sorting center KOTABANDUNG (MH BANDUNG)",
//       location: "Kota Bandung",
//       time: "09:25",
//       date: "28/01/2025",
//     },
//     {
//       id: 4,
//       label: "Pesanan sampai di sorting center KARAWANG (MH KARAWANG)",
//       location: "Karawang",
//       time: "09:25",
//       date: "28/01/2025",
//     },
//   ];

//   // Reverse the steps array to display the most recent update at the top
//   const reversedSteps = [...steps].reverse();

//   const currentStepIndex =
//     steps.length - 1 - steps.findIndex((step) => step.label === shipmentStatus);

//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Tracking Pengiriman</h2>

//       <div className="bg-white pt-4 pb-2 px-3 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
//         <div className="relative">
//           {reversedSteps.map((step, index) => (
//             <div
//               key={step.id}
//               className={`flex items-start space-x-3 ${
//                 !showDetails && index !== currentStepIndex ? "hidden" : ""
//               }`}
//             >
//               {showDetails && (
//                 <div className="flex flex-col items-center">
//                   {index > currentStepIndex ? (
//                     <CheckCircle className="text-blue-500 h-6 w-6" />
//                   ) : (
//                     <Circle
//                       className={
//                         index === currentStepIndex
//                           ? "text-blue-500 h-6 w-6"
//                           : "text-gray-300 h-6 w-6"
//                       }
//                     />
//                   )}
//                   {index < reversedSteps.length - 1 && (
//                     <div
//                       className={`h-24 w-0.5 ${
//                         index >= currentStepIndex
//                           ? "bg-blue-500"
//                           : "bg-gray-300"
//                       }`}
//                     />
//                   )}
//                 </div>
//               )}

//               <div className="flex justify-between items-center w-full">
//                 <div className="flex-1 text-justify leading-tight mr-10">
//                   <p
//                     className={`mb-2 ${
//                       index === currentStepIndex ? "font-bold" : "text-gray-700"
//                     }`}
//                   >
//                     {step.label}
//                   </p>
//                   {step.location && (
//                     <p className="text-sm text-gray-500">{step.location}</p>
//                   )}
//                 </div>

//                 <div className="text-right">
//                   <p className="text-sm font-bold text-gray-500 mb-0">
//                     {step.time}
//                   </p>
//                   <p className="text-xs text-gray-500">{step.date}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-right mt-2">
//         <button
//           onClick={() => setShowDetails(!showDetails)}
//           className="text-sm text-blue-600 font-semibold hover:text-blue-700 focus:outline-none"
//         >
//           {showDetails ? "Sembunyikan Detail" : "Tampilkan Detail"}
//         </button>
//       </div>
//     </div>
//   );
// }

// function ProductReviewForm({
//   rating,
//   setRating,
//   comment,
//   setComment,
//   ratingLabel,
//   onStarRating,
// }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Berikan Ulasan</h2>

//       <div className="bg-white pb-2 px-1 w-full max-w-md">
//         <p className="text-sm font-medium">Rating</p>
//         <div className="flex items-center p-2 space-x-5 border border-gray-300 rounded-xl shadow-md w-full max-w-md">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               className={`h-6 w-6 cursor-pointer ${
//                 star <= rating ? "text-[#FFB81E]" : "text-gray-300"
//               }`}
//               onClick={() => onStarRating(star)}
//               fill={star <= rating ? "#FFB81E" : "none"}
//               strokeWidth={1.5}
//             />
//           ))}
//           {rating > 0 && (
//             <span className="absolute right-7 text-sm font-semibold text-[#FFB81E]">
//               {ratingLabel}
//             </span>
//           )}
//         </div>
//         {rating ? (
//           <div className="text-right mt-2">
//             <button
//               type="button"
//               onClick={() => setRating(0)}
//               className="text-red-500 hover:text-red-700 transition"
//             >
//               <img
//                 src="/trash-icon.png"
//                 alt="delete button"
//                 className="w-6 h-6"
//               />
//             </button>
//           </div>
//         ) : null}

//         <p className="mt-3 text-sm font-medium">Tulis komentar</p>
//         <textarea
//           className="w-full py-3 px-3 border border-gray-300 rounded-lg shadow-md max-w-md text-sm"
//           rows="4"
//           placeholder="Bagikan pengalaman Anda..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// function ProductReview({ rating, comment, ratingLabel }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-xl font-bold mb-2">Ulasan Anda</h2>
//       {!rating ? (
//         <p className="font-medium">Anda tidak memberikan ulasan produk</p>
//       ) : (
//         <div className="bg-white pb-2 px-1">
//           <div className="flex flex-col p-3 space-y-2 mt-1 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
//             <div className="flex items-center space-x-3">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`h-6 w-6 cursor-pointer ${
//                     star <= rating ? "text-[#FFB81E]" : "text-gray-300"
//                   }`}
//                   fill={star <= rating ? "#FFB81E" : "none"}
//                   strokeWidth={1.5}
//                 />
//               ))}
//               {rating > 0 && (
//                 <span className="absolute right-8 text-sm font-semibold text-[#FFB81E]">
//                   {ratingLabel}
//                 </span>
//               )}
//             </div>
//             {comment && (
//               <p className="w-full pt-2 text-sm min-h-[50px]">{comment}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;