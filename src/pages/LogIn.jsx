import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { post } from '../api/http';

const CodeInput = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(''));

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;

    const newValues = [...values];
    newValues[index] = val[val.length - 1];
    setValues(newValues);

    if (index < length - 1) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }

    if (newValues.every((v) => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);

      if (index > 0) {
        document.getElementById(`code-${index - 1}`)?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {values.map((v, i) => (
        <input
          key={i}
          id={`code-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-8 text-center border rounded-md outline-none text-md h-9 border-black/20 focus:border-blue-400"
        />
      ))}
    </div>
  );
};

export const LogIn = () => {
  const [step, setStep] = useState(1); // 1: login, 2: verify email, 3: create store
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    // Evita el comportamiento por defecto del formulario
    e.preventDefault();
    try {
      const res = await login(formData);
      const { subdomain } = res;
      setIsLoading(false);
      if (subdomain === null) {
        setStep(2); // crear tienda
      } else {
        navigate('https://admin.spazyo.test:5173/'); // dashboard
      }
    } catch (error) {
      console.error('Error al generar plan:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      setIsLoading(false);
    }
    console.log('Form data:', formData);
  };

  const handleVerifyEmail = async (code) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await post(
        '/auth/email/verify',
        { token: code, email: formData.email.trim() },
        'core'
      );
      await login({
        email: formData.email,
        password: formData.password
      });
      setIsLoading(false);
      setStep(3);
    } catch (error) {
      setIsLoading(false);
      console.error('Error verifying email:', error);
      alert('No se pudo verificar el correo. Inténtalo de nuevo.');
    }
  };

  const handleResendEmail = async () => {
    if (!formData.email.trim()) {
      alert('Primero ingresa tu email.');
      return;
    }

    setIsLoading(true);
    try {
      await post(
        '/auth/email/resend',
        { email: formData.email.trim() },
        'core'
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error resending email:', error);
      alert('No se pudo reenviar el correo. Inténtalo más tarde.');
    }
  };

  const handleChangeStore = (e) => {
    setformDataStore({ ...formDataStore, [e.target.name]: e.target.value });
  };

  const handleSubmitStore = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataUser = {
      name: `${formData.name.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      password: formData.password
    };

    const data = {
      name: formDataStore.name.trim(),
      hasPhysicalStore: formDataStore.isLocal,
      latitude: formDataStore.latitude,
      longitude: formDataStore.longitude,
      address: formDataStore.locationPreview.trim(),
      subdomain: formDataStore.dominio,
      supportEmail: formDataStore.email.trim()
    };

    try {
      await post('/stores', data, 'core');
      localStorage.removeItem('token');
      const response = await login(dataUser);
      setIsLoading(false);
      if (response) {
        navigate('/admin');
      }

      setIsLoading(false);
      console.log('Store created and user logged in');
    } catch (error) {
      setIsLoading(false);
      console.error('Error registering/logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-10 bg-white">
      {step === 1 && (
        <div className="flex items-center justify-center ">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-2xl font-semibold text-center">
              Iniciar sesión
            </h1>
            <p className="mb-10 text-sm font-light text-center w-68 text-black/80">
              Accede a tu spazyo para descubrir y comprar productos únicos.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-5">
                <input
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  type="email"
                  id="email"
                  required
                  className="px-4 py-3 border rounded-full outline-none border-black/20 peer w-72 focus:border-blue-400"
                />
                <label
                  htmlFor="email"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                >
                  Email address
                </label>
              </div>
              <div className="relative mb-5 w-72">
                <input
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none pr-15 border-black/20 peer focus:border-blue-400"
                />
                <label
                  htmlFor="password"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute p-2 -translate-y-1/2 rounded-full cursor-pointer right-4 top-1/2 text-black/60 hover:bg-black/5"
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.5} />
                  ) : (
                    <Eye size={20} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              <button
                className={`px-4 py-3  text-white bg-black rounded-full text-sm cursor-pointer w-72 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                Continuar
              </button>
            </form>
            <div className="flex items-center justify-between gap-5 my-10">
              <div className="w-28 h-[1px] bg-black/30"></div>
              <p className="text-xs font-medium">O</p>
              <div className="w-28 h-[1px] bg-black/30"></div>
            </div>

            {/* Botón Google visible custom (overlay con el botón real de Google) */}
            <div className="relative w-72">
              {/* Tu diseño */}
              <div className="flex items-center gap-5 px-4 py-3 text-black bg-white border rounded-full w-72 border-black/20 hover:bg-black/5">
                <div
                  style={{
                    backgroundImage:
                      'url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/330px-Google_Favicon_2025.svg.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    width: '20px',
                    height: '20px',
                    display: 'inline-block'
                  }}
                />
                <p className="text-sm">Continuar con Google</p>
              </div>

              {/* Botón real de Google (invisible, captura el click) */}
              <div className="absolute inset-0 opacity-0">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const response = await post('/auth/google', {
                        idToken: credentialResponse.credential
                      });
                      localStorage.setItem('token', response.token);
                      navigate('/admin');
                    } catch (error) {
                      console.error('Error con login Google', error);
                    }
                  }}
                  onError={() => {
                    console.log('Google Login Failed');
                  }}
                  useOneTap={false}
                  width="288"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center justify-center h-[87dvh] ">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-2xl font-semibold text-center">
              Verifica tu correo
            </h1>
            <p className="mb-10 text-sm font-light text-center text-black/80 w-72">
              Ingresa el código de 6 dígitos que te enviamos a tu correo.
            </p>
            <CodeInput
              length={6}
              onComplete={(code) => {
                console.log('Código ingresado:', code);
                handleVerifyEmail(code);
              }}
            />
            <button
              type="button"
              onClick={handleResendEmail}
              className={`px-4 py-3 text-white bg-black mt-10 rounded-full cursor-pointer text-sm w-68 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              Reenviar correo
            </button>
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
              <p className="px-4 py-1 mb-5 text-xs lowercase text-neutral-400">
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
