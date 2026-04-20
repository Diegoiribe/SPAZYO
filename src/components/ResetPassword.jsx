import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { post } from '../api/http';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (passwordChanged) {
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordChanged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    post('/auth/email/forgot-password', { email: email })
      .then(() => {
        setIsLoading(false);
        setEmailSent(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(
      'Reset password with token:',
      token,
      'and new password:',
      password
    );
    post('/auth/email/reset-password', { token: token, newPassword: password })
      .then(() => {
        setIsLoading(false);
        setPasswordChanged(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      {passwordChanged && (
        <div className="flex flex-col items-center text-center">
          <p className="text-2xl font-semibold mb-3">Contraseña cambiada</p>
          <p className="text-sm font-light text-black/60 w-68">
            Tu contraseña ha sido cambiada exitosamente. Serás redirigido al
            inicio en unos momentos.
          </p>
        </div>
      )}
      {emailSent && (
        <div className="flex flex-col items-center text-center">
          <p className="text-2xl font-semibold mb-3">Correo enviado</p>
          <p className="text-sm font-light text-black/60 w-68">
            Revisa tu bandeja de entrada y sigue el enlace para restablecer tu
            contraseña.
          </p>
        </div>
      )}
      {!token && !emailSent && (
        <div className="flex items-center justify-center ">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-2xl font-semibold text-center">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="mb-10 text-sm font-light text-center w-68 text-black/80">
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecer tu contraseña.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-5">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <button
                className={`px-4 py-3  text-white bg-black rounded-full text-sm cursor-pointer w-72 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                Continuar
              </button>
            </form>
          </div>
        </div>
      )}
      {token && !passwordChanged && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-2xl font-semibold text-center">
              Restablecer contraseña
            </h1>
            <p className="mb-10 text-sm font-light text-center w-68 text-black/80">
              Crea una nueva contraseña para acceder a tu cuenta.
            </p>
            <form onSubmit={handleResetPassword}>
              <div className="relative mb-5">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  className="px-4 py-3 border rounded-full outline-none border-black/20 peer w-72 focus:border-blue-400"
                />
                <label
                  htmlFor="password"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
                >
                  Nueva contraseña
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
                className={`px-4 py-3 text-white bg-black rounded-full text-sm cursor-pointer w-72 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                Cambiar contraseña
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
