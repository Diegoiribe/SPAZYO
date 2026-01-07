import { Check, Dot } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { post } from '../api/http';

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    gender: '',
    birthday: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      firstName: formData.name.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      gender: formData.gender,
      password: formData.password,
      birthDate: formData.birthday // ISO (yyyy-mm-dd) con type="date"
    };

    try {
      await post('/auth/register', data);

      // auto-login (si tu backend no devuelve token en register)
      const loginRes = await post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', loginRes.token);
      setIsLoading(false);
      setStep(3);
    } catch (error) {
      setIsLoading(false);
      console.error('Error registering/logging in:', error);
    }
  };

  const handleSubscription = async (endpoint) => {
    try {
      const { url } = await post(endpoint); // 👈 tu post ya devuelve data
      window.location.replace(url);
    } catch (err) {
      console.error('Checkout error:', err);
      // opcional: mostrar toast
    }
  };

  // Función para validar campos del paso 1
  const validateStep = () => {
    // Lista de campos requeridos
    const requiredFields = [
      { name: 'name', label: 'Nombre' },
      { name: 'lastName', label: 'Apellido' },
      { name: 'gender', label: 'Género' },
      { name: 'birthday', label: 'Nacimiento' },
      { name: 'email', label: 'Email' },
      { name: 'password', label: 'Contraseña' }
    ];

    for (const field of requiredFields) {
      if (!formData[field.name]?.trim()) {
        alert(`Por favor, completa el campo: ${field.label}`);
        return false; // Detiene validación si hay un campo vacío
      }
    }

    // Si todo está bien
    return true;
  };

  return (
    <div className="min-h-screen p-8">
      {step === 1 && (
        <div className="flex items-center justify-center h-[87dvh] ">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-2xl font-semibold text-center">
              Crea tu cuenta
            </h1>
            <p className="mb-10 text-sm font-light text-center text-black/80 w-82">
              Crea tu contraseña para SPAZYO
            </p>
            <div className="relative mb-5">
              <input
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                required
                className="px-4 py-3 border rounded-full outline-none border-black/20 peer w-72 focus:border-blue-400"
              />
              <label
                htmlFor="email"
                className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm  peer-focus:text-blue-400"
              >
                Email address
              </label>
            </div>
            <div className="relative mb-5 w-72">
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                className="w-full px-4 py-3 border rounded-full outline-none pr-15 border-black/20 peer focus:border-blue-400"
              />
              <label
                htmlFor="password"
                className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm  text-sm peer-focus:text-blue-400 "
              >
                Contraseña
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute p-2 -translate-y-1/2 rounded-full cursor-pointer right-4 top-1/2 text-black/60 hover:bg-black/5"
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={1} />
                ) : (
                  <Eye size={20} strokeWidth={1} />
                )}
              </button>
            </div>
            <div className="px-5 py-3 mb-10 text-[14px] font-light  rounded-sm  w-72">
              <p className="mb-3 text-sm">Tu contraseña debe contener:</p>
              <div className="flex items-center gap-3 mb-1">
                <Check size={16} />
                <Dot />
                <p className="text-sm">Al menos 8 caracteres</p>
              </div>
            </div>
            <button
              className="px-4 py-3 text-sm text-white bg-black rounded-full cursor-pointer w-72"
              onClick={() => {
                setStep(2);
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center justify-center h-[87dvh] ">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-2xl font-semibold text-center">
              Crea tu cuenta
            </h1>
            <p className="mb-10 text-sm font-light text-center text-black/80 w-72">
              Dinos un poco sobre ti: ingresa tu información personal
            </p>
            <form onSubmit={handleSubmit} className="mb-20">
              <div className="flex items-center gap-2">
                <div className="relative mb-5">
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-32 px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-blue-500"
                  />
                  <label
                    htmlFor="name"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-500"
                  >
                    Nombre
                  </label>
                </div>
                <div className="relative mb-5">
                  <input
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    className="w-48 px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-blue-500"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-500"
                  >
                    Apellido
                  </label>
                </div>
              </div>
              <div className="relative mb-5 w-72">
                <input
                  value={formData.birthday}
                  onChange={handleChange}
                  type="date"
                  name="birthday"
                  id="birthdate"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-blue-500"
                />
                <label
                  htmlFor="birthdate"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-500 "
                >
                  Fecha de nacimiento
                </label>
              </div>
              <div className="relative mb-5 w-82">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  id="gender"
                  required
                  className="w-full px-4 py-3 pr-10 bg-white border rounded-full outline-none appearance-none peer border-black/30 focus:border-blue-500"
                >
                  <option value="" disabled>
                    {' '}
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>

                <label
                  htmlFor="gender"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1
               text-black/40 transition-all duration-200
               peer-focus:-top-[1px] peer-focus:text-sm peer-focus:text-blue-500
               peer-valid:-top-[1px] peer-valid:text-sm"
                >
                  Sexo
                </label>

                {/* Flecha del select */}
                <svg
                  className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-3 top-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.5 7.5l4.5 5 4.5-5" />
                </svg>
              </div>
              <button
                className={`px-4 py-3  text-white bg-black rounded-full cursor-pointer w-82 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
                onClick={() => {
                  if (validateStep()) {
                    setStep(3);
                  }
                }}
              >
                Continuar
              </button>
            </form>
            <div className="flex items-center justify-center gap-3">
              <p className="text-sm underline text-neutral-500">
                Terminos de Uso
              </p>
              <div className="w-[1.5px] h-4 bg-black"></div>
              <p className="text-sm underline text-neutral-500">
                Politica de privacidad
              </p>
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex items-center justify-center h-[87dvh] w-full ">
          <div className="max-w-3xl">
            <p className="mb-5 text-4xl font-bold">
              Unete a <span className="italic font-light">Plan4Me</span>
            </p>

            <div className="flex items-center gap-1 mb-10">
              <p className="px-4 py-1 font-medium text-black bg-orange-100 rounded-full cursor-pointer">
                Mensual
              </p>
              <p className="px-4 py-1 font-medium rounded-full cursor-pointer">
                Trimestral
              </p>
              <p className="px-4 py-1 font-medium rounded-full cursor-pointer">
                Anual
              </p>
            </div>
            <div className="flex gap-20 bg-orange-100 p-15 rounded-3xl">
              <div className="w-[29%]">
                <h1 className="mb-2 text-2xl font-bold text-orange-300">
                  Premium
                </h1>
                <p className="mb-10 text-sm text-black/70">
                  Plan, compras y progreso sin complicaciones
                </p>
                <p className="mb-10 text-2xl font-bold text-black">
                  <span className="text-sm font-normal text-black/70">$</span>
                  199{' '}
                  <span className="text-sm font-normal text-black/70">
                    / por mes
                  </span>
                </p>
                <div className="inline-flex flex-col w-full gap-3">
                  <button
                    className="w-full px-6 py-2 font-medium text-white bg-black rounded-full cursor-pointer"
                    onClick={() =>
                      handleSubscription('/api/payments/checkout-premium')
                    }
                  >
                    Comenzar
                  </button>
                  <button
                    className="px-6 py-2 font-medium text-black border border-black rounded-full cursor-pointer"
                    onClick={() =>
                      handleSubscription('/api/payments/checkout-trial')
                    }
                  >
                    Prueba gratis
                  </button>
                </div>
              </div>
              <div className="w-[71%] text-black">
                <p className="mb-10 text-sm text-black/70">
                  Funciones premium exclusivas{' '}
                </p>
                <div className="flex gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 lucide lucide-circle-check-icon lucide-circle-check"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <p className="mb-5 text-sm font-medium">
                    Dieta 100% personalizada: ajustada a tus metas (bajar de
                    peso, ganar masa, mantenerte).
                  </p>
                </div>
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 lucide lucide-circle-check-icon lucide-circle-check"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <p className="mb-5 text-sm font-medium">
                    Lista de compras automática: olvídate de cálculos, lleva
                    todo lo que necesitas en un solo clic.
                  </p>
                </div>
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8 lucide lucide-circle-check-icon lucide-circle-check"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <p className="mb-5 text-sm font-medium">
                    Ajuste dinámico por “pecados”: si te sales del plan, la app
                    equilibra el resto de tus comidas para mantener tu progreso.
                  </p>
                </div>
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6 lucide lucide-circle-check-icon lucide-circle-check"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <p className="text-sm font-medium">
                    Acceso multiplataforma: tu plan disponible siempre, desde
                    cualquier dispositivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
