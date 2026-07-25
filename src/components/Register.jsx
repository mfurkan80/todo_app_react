import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  Link,
} from "react-router";
import axios from "axios";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // VITE_API_URL içindeki "/api/tasks" kısmını temizleyip ana Backend adresini buluyoruz.
  // Örn: https://api.todoapp.furkansahin.me/api/tasks -> https://api.todoapp.furkansahin.me
  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api/tasks", "");

  try {
    // Artık istek doğru yere gidiyor: https://api.todoapp.furkansahin.me/register
    await axios.post(`${BASE_URL}/register`, {
      email: data.email,
      password: data.password,
    });

    // Kayıt başarılıysa kullanıcıyı giriş yapması için login'e yönlendir
    return redirect("/login");
  } catch (err) {
    return {
      error:
        err.response?.data?.message ||
        "Could not connect to the server, please try again later.",
    };
  }
};

const Register = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
          Sign Up
        </h2>

        {actionData?.error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm text-center">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              minLength="6"
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded transition-colors mt-2 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </Form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
