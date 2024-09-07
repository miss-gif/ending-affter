const SignupChoice = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            회원가입 유형 선택
          </h2>
          <p className="text-center text-gray-600">
            음식주문 플랫폼에 가입하여 서비스를 이용하세요. <br />
            아래에서 회원가입 유형을 선택해 주세요.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              사용자 회원가입
            </h3>
            <p className="text-gray-600 mb-4">
              배달 음식을 주문하고 다양한 혜택을 받아보세요.
            </p>
            <a
              className="block text-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              href="/signup/user"
            >
              사용자 회원가입
            </a>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              사업자 회원가입
            </h3>
            <p className="text-gray-600 mb-4">
              당신의 가게를 등록하고 배달 주문을 받아보세요.
            </p>
            <a
              className="block text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              href="/signup/owner"
            >
              사업자 회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupChoice;
