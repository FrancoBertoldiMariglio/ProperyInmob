import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Pagina no encontrada</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
