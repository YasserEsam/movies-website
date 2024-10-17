const LoginPrompt = ({ lang }) => {
    return (
      <div className="text-center mt-6">
        <p className="text-lg font-medium text-gray-800 dark:text-white">
          {lang === 'ar' ? 'ليس لديك حساب؟' : 'Don\'t have an account?'}
        </p>
      </div>
    )
  }
  
  export default LoginPrompt
  