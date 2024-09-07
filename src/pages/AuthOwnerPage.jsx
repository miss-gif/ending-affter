import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// 유효성 검사 스키마 정의
const schema = z
  .object({
    username: z.string().min(8, "아이디는 8자 이상이어야 합니다."),
    email: z.string().email("유효한 이메일을 입력하세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(
        /(?=.*\d)(?=.*[@$!%*?&])/,
        "비밀번호에는 숫자와 특수문자가 포함되어야 합니다.",
      ),
    confirmPassword: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    name: z.string().min(1, "이름을 입력하세요."),
    nickname: z.string().min(1, "닉네임을 입력하세요."),
    phoneNumber: z.string().min(1, "전화번호를 입력하세요."),
    storeName: z.string().min(1, "상점명을 입력하세요."),
    storeDescription: z.string().min(1, "상점 설명을 입력하세요."),
    storeMessage: z.string().min(1, "상점 메시지를 입력하세요."),
    businessNumber: z.string().min(1, "사업자 번호를 입력하세요."),
    openTime: z.string().min(1, "오픈 시간을 입력하세요."),
    closeTime: z.string().min(1, "마감 시간을 입력하세요."),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

const AuthOwnerPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
      phoneNumber: "",
      storeName: "",
      storeDescription: "",
      storeMessage: "",
      businessNumber: "",
      openTime: "",
      closeTime: "",
    },
  });

  const onSubmit = data => {
    console.log(data);
    // 회원가입 로직 처리
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto"
    >
      {/* 제목 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">사업자 회원가입</h1>

      {/* 아이디 및 중복 확인 버튼 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">아이디</label>
        <div className="flex items-center space-x-3">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            )}
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            중복확인
          </button>
        </div>
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* 이메일 및 인증 버튼 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">이메일</label>
        <div className="flex items-center space-x-3">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            )}
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            인증번호 전송
          </button>
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* 비밀번호 및 재입력 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          비밀번호
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          비밀번호 재입력
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* 이름, 닉네임, 전화번호 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">이름</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">닉네임</label>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.nickname && (
          <p className="text-red-500 text-xs mt-1">{errors.nickname.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          전화번호
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* 상점 관련 정보 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">상점명</label>
        <Controller
          name="storeName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.storeName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.storeName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          상점 설명
        </label>
        <Controller
          name="storeDescription"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.storeDescription && (
          <p className="text-red-500 text-xs mt-1">
            {errors.storeDescription.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          상점 메시지
        </label>
        <Controller
          name="storeMessage"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.storeMessage && (
          <p className="text-red-500 text-xs mt-1">
            {errors.storeMessage.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          사업자 번호
        </label>
        <Controller
          name="businessNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mt-2"
        >
          사업자 확인
        </button>
        {errors.businessNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.businessNumber.message}
          </p>
        )}
      </div>

      {/* 오픈 시간 및 마감 시간 */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          오픈 시간
        </label>
        <Controller
          name="openTime"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.openTime && (
          <p className="text-red-500 text-xs mt-1">{errors.openTime.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          마감 시간
        </label>
        <Controller
          name="closeTime"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          )}
        />
        {errors.closeTime && (
          <p className="text-red-500 text-xs mt-1">
            {errors.closeTime.message}
          </p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        회원가입
      </button>
    </form>
  );
};
export default AuthOwnerPage;
