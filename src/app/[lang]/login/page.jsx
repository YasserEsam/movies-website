import LoginForm from "@/components/LoginForm";
import { getDictionary } from "../dictionaries";

export const metadata = {
  title: 'Login - Movies App',
  description: 'Login page',
};

export default async function LoginPage({ params: { lang } }) {

  const dict = await getDictionary(lang);
  const loginDict = dict.login;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <LoginForm lang={lang} dict={loginDict} />
    </div>
  );
}
