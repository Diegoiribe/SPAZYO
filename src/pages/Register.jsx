import { Check, Dot } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { post } from '../api/http';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formDataUser, setformDataUser] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    state: '',
    country: ''
  });

  const [formDataStore, setformDataStore] = useState({
    isLocal: false,
    latitude: null,
    longitude: null,
    locationPreview: '',
    name: '',
    dominio: '',
    email: ''
  });

  const handleChange = (e) => {
    setformDataUser({ ...formDataUser, [e.target.name]: e.target.value });
  };

  const handleChangeStore = (e) => {
    setformDataStore({ ...formDataStore, [e.target.name]: e.target.value });
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      firstName: formDataUser.name.trim(),
      lastName: formDataUser.lastName.trim(),
      email: formDataUser.email.trim(),
      state: formDataUser.state,
      password: formDataUser.password,
      country: formDataUser.country // ISO (yyyy-mm-dd) con type="date"
    };

    try {
      await post('/auth/register', data, 'core');

      // auto-login (si tu backend no devuelve token en register)
      const loginRes = await post('/auth/login', {
        email: formDataUser.email,
        password: formDataUser.password
      });
      localStorage.setItem('token', loginRes.token);
      setIsLoading(false);
      setStep(3);
    } catch (error) {
      setIsLoading(false);
      console.error('Error registering/logging in:', error);
    }
  };

  const handleSubmitStore = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name: formDataStore.name.trim(),
      isLocal: formDataStore.isLocal,
      latitude: formDataStore.latitude,
      longitude: formDataStore.longitude,
      locationPreview: formDataStore.locationPreview.trim(),
      dominio: formDataStore.dominio,
      email: formDataStore.email.trim()
    };

    try {
      await post('/store', data, 'core');

      // auto-login (si tu backend no devuelve token en register)
      const loginRes = await post('/auth/login', {
        email: formDataUser.email,
        password: formDataUser.password
      });
      localStorage.setItem('token', loginRes.token);
      setIsLoading(false);
      navigate('/admin');
    } catch (error) {
      setIsLoading(false);
      console.error('Error registering/logging in:', error);
    }
  };

  // Función para validar campos del paso 1
  const validateStep = () => {
    // Lista de campos requeridos
    const requiredFields = [
      { name: 'name', label: 'Nombre' },
      { name: 'lastName', label: 'Apellido' },
      { name: 'state', label: 'Estado' },
      { name: 'country', label: 'Pais' },
      { name: 'email', label: 'Email' },
      { name: 'password', label: 'Contraseña' }
    ];

    for (const field of requiredFields) {
      if (!formDataUser[field.name]?.trim()) {
        alert(`Por favor, completa el campo: ${field.label}`);
        return false; // Detiene validación si hay un campo vacío
      }
    }

    // Si todo está bien
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 ">
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
                value={formDataUser.email}
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
                value={formDataUser.password}
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
        <div className="flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-5 text-2xl font-semibold text-center">
              Crea tu cuenta
            </h1>
            <p className="mb-10 text-sm font-light text-center text-black/80 w-72">
              Dinos un poco sobre ti, ingresa tu información personal
            </p>
            <form onSubmit={handleSubmitUser} className="">
              <div className="grid grid-cols-2 gap-2 w-72">
                <div className="relative mb-5">
                  <input
                    value={formDataUser.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-4 py-3 border rounded-full outline-none border-black/20 peer focus:border-blue-400"
                  />
                  <label
                    htmlFor="name"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                  >
                    Nombre
                  </label>
                </div>
                <div className="relative mb-5">
                  <input
                    value={formDataUser.lastName}
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 border rounded-full outline-none border-black/20 peer focus:border-blue-400"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                  >
                    Apellido
                  </label>
                </div>
              </div>
              <div className="relative mb-5 w-72">
                <input
                  value={formDataUser.country}
                  onChange={handleChange}
                  type="text"
                  name="country"
                  id="country"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/20 peer focus:border-blue-400"
                />
                <label
                  htmlFor="country"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                >
                  Pais
                </label>
              </div>
              <div className="relative mb-5 w-72">
                <input
                  value={formDataUser.state}
                  onChange={handleChange}
                  type="text"
                  name="state"
                  id="state"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/20 peer focus:border-blue-400"
                />
                <label
                  htmlFor="state"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400 "
                >
                  Estado
                </label>
              </div>
              <button
                className={`px-4 py-3  text-white bg-black rounded-full cursor-pointer text-sm w-72 ${
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
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-10 text-2xl font-semibold text-center">
              Crea tu tienda
            </h1>
            <form onSubmit={handleSubmitStore} className="">
              <div className="relative mb-5 w-72">
                <input
                  value={formDataStore.name}
                  onChange={handleChangeStore}
                  type="text"
                  name="name"
                  id="nameTienda"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/20 peer focus:border-blue-400"
                />
                <label
                  htmlFor="nameTienda"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                >
                  Nombre
                </label>
              </div>
              <div className="relative w-72">
                <input
                  value={formDataStore.dominio}
                  onChange={handleChangeStore}
                  type="text"
                  name="dominio"
                  id="dominio"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/20 peer focus:border-blue-400"
                />
                <label
                  htmlFor="dominio"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                >
                  Dominio
                </label>
              </div>
              <p className="px-4 py-1 mb-5 text-xs text-neutral-400">
                {formDataStore.dominio === ''
                  ? 'https://tudominio.spazyo.com'
                  : `https://www.${formDataStore.dominio}.spazyo.com`}
              </p>

              <div className="relative mb-5 w-72">
                <input
                  value={formDataStore.email}
                  onChange={handleChangeStore}
                  type="email"
                  name="email"
                  id="emailTienda"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/20 peer focus:border-blue-400"
                />
                <label
                  htmlFor="emailTienda"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400 "
                >
                  Correo de soporte
                </label>
              </div>
              <div className="px-1 mb-5 w-72">
                <div className="flex justify-between mb-5">
                  <p className="text-sm ">Tienda local</p>
                  <input
                    type="checkbox"
                    checked={formDataStore.isLocal}
                    onChange={(e) =>
                      setformDataStore({
                        ...formDataStore,
                        isLocal: e.target.checked
                      })
                    }
                    className="
    w-4 h-4
    appearance-none
    rounded
    border border-neutral-400
    relative
    checked:bg-black
    checked:border-black

    checked:after:content-['✓']
    checked:after:absolute
    checked:after:inset-0
    checked:after:flex
    checked:after:items-center
    checked:after:justify-center
    checked:after:text-white
    checked:after:text-[10px]
  "
                  />
                </div>
                <p className="text-xs font-light">
                  Haz que tus clientes puedan recoger sus pedidos en tu negocio
                </p>
              </div>
              {formDataStore.isLocal && (
                <>
                  {/* Ubicación del negocio */}
                  <div className="mb-6 w-72">
                    <button
                      type="button"
                      className="px-4 py-3 text-sm font-light border rounded-full cursor-pointer border-black/20 w-72"
                      onClick={() => {
                        if (!navigator.geolocation) {
                          alert('Tu navegador no soporta geolocalización');
                          return;
                        }

                        navigator.geolocation.getCurrentPosition(
                          async (position) => {
                            const lat = position.coords.latitude;
                            const lng = position.coords.longitude;

                            try {
                              const res = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                              );
                              const data = await res.json();

                              setformDataStore({
                                ...formDataStore,
                                latitude: lat,
                                longitude: lng,
                                locationPreview:
                                  data.display_name || 'Ubicación detectada'
                              });
                            } catch {
                              setformDataStore({
                                ...formDataStore,
                                latitude: lat,
                                longitude: lng,
                                locationPreview: 'Ubicación detectada'
                              });
                            }
                          },
                          () => {
                            alert('No se pudo obtener tu ubicación');
                          }
                        );
                      }}
                    >
                      Usar mi ubicación actual
                    </button>

                    {formDataStore.locationPreview && (
                      <div className="px-1 mt-5 ">
                        <p className="text-xs font-light ">
                          {formDataStore.locationPreview}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-end w-72">
                <button
                  className={`px-3 py-3  text-white bg-black rounded-full cursor-pointer text-sm  ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                  onClick={() => {
                    if (validateStep()) {
                      setStep(4);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right-icon lucide-arrow-right"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
