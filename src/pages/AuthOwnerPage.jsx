import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import MyMap from "../components/user/mypage/MyMap";
import "./AuthUserPage.scss";

// Zod schema 정의
const schema = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
    emailCode: z.string().min(6, "인증 코드를 입력해주세요."),
    username: z.string().min(8, "아이디는 8자 이상이어야 합니다."),
    password: z
      .string()
      .min(
        8,
        "비밀번호는 8자 이상이어야 하며 특수문자와 숫자를 포함해야 합니다.",
      )
      .regex(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])/,
        "비밀번호는 특수문자와 숫자를 포함해야 합니다.",
      ),
    confirmPassword: z.string().min(8, "비밀번호 확인을 입력해주세요."),
    userName: z.string().min(2, "이름을 입력해주세요."),
    userNickname: z.string().min(2, "닉네임을 입력해주세요."),
    userPhone: z
      .string()
      .regex(/^\d{3}-\d{3,4}-\d{4}$/, "유효한 전화번호를 입력해주세요."),
    storeName: z.string().min(1, "상점명을 입력하세요."),
    storeDescription: z.string().min(1, "상점 설명을 입력하세요."),
    storeMessage: z.string().min(1, "상점 메시지를 입력하세요."),
    businessNumber: z.string().min(1, "사업자 번호를 입력하세요."),
    openTime: z.string().min(1, "오픈 시간을 입력하세요."),
    closeTime: z.string().min(1, "마감 시간을 입력하세요."),
    privacy: z
      .boolean()
      .refine(val => val, "개인정보 수집 및 이용에 동의해야 합니다."),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

const OwnerSignupPage = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  // 주소 관련 State
  const [newXValue, setNewXValue] = useState("");
  const [newYValue, setNewYValue] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newAddressDetail, setNewAddressDetail] = useState("");

  useEffect(() => {
    if (allChecked) {
      setPrivacyChecked(true);
    } else {
      setPrivacyChecked(false);
    }
  }, [allChecked]);

  useEffect(() => {
    if (!privacyChecked) {
      setAllChecked(false);
    }
  }, [privacyChecked]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    setFocus,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleAllCheck = e => {
    const { checked } = e.target;
    setAllChecked(checked);
    setPrivacyChecked(checked);
  };

  const handlePrivacyCheck = e => {
    const { checked } = e.target;
    setPrivacyChecked(checked);
    if (!checked) setAllChecked(false);
  };

  const formatPhoneNumber = value => {
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 7)
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const onPhoneChange = e => {
    const { value } = e.target;
    e.target.value = formatPhoneNumber(value);
  };

  const sendEmailCode = async email => {
    try {
      const response = await axios.post("/api/mail/send", { email });
      toast.success(response.data.resultMsg);
    } catch (error) {
      console.error("이메일 인증번호 전송 오류:", error);
      toast.error("인증번호 전송에 실패했습니다.");
    }
  };

  const verifyEmailCode = async (email, authNum) => {
    try {
      const response = await axios.post("/api/mail/auth_check", {
        email,
        authNum,
      });
      toast.error(response.data.resultMsg);
    } catch (error) {
      console.error("인증 코드 확인 오류:", error);
      toast.error("인증 코드 확인에 실패했습니다.");
    }
  };

  const checkUsernameDuplicate = async username => {
    try {
      const response = await axios.get(
        `/api/is-duplicated?user_id=${username}`,
      );
      if (response.data.statusCode !== 1) {
        setError("username", {
          type: "manual",
          message: "사용할 수 없는 아이디입니다.",
        });
        setFocus("username");
      } else {
        toast.success(response.data.resultMsg);
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
      toast.error("아이디 중복 확인에 실패했습니다.");
    }
  };

  const onSubmit = async data => {
    try {
      const p = {
        user_id: data.username,
        user_pw: data.password,
        user_pw_confirm: data.confirmPassword,
        user_name: data.userName,
        user_nickname: data.userNickname,
        user_phone: data.userPhone,
        user_email: data.email,
        auth_num: data.emailCode,
      };

      const response = await axios.post("/api/sign-up", p);
      toast.success(response.data.resultMsg);
    } catch (error) {
      console.error("회원가입 오류:", error);
      toast.error("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          사업자 회원가입
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => sendEmailCode(getValues("email"))}
            >
              인증번호 전송
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="emailCode"
              className="text-sm font-medium text-gray-700"
            >
              코드 입력
            </label>
            <input
              id="emailCode"
              type="text"
              {...register("emailCode")}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.emailCode
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.emailCode && (
              <p className="text-red-500 text-sm">{errors.emailCode.message}</p>
            )}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() =>
                verifyEmailCode(getValues("email"), getValues("emailCode"))
              }
            >
              확인
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.username
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => checkUsernameDuplicate(getValues("username"))}
            >
              중복확인
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="userName"
              className="text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              id="userName"
              type="text"
              {...register("userName")}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.userName
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="userNickname"
              className="text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              id="userNickname"
              type="text"
              {...register("userNickname")}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.userNickname
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.userNickname && (
              <p className="text-red-500 text-sm">
                {errors.userNickname.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="userPhone"
              className="text-sm font-medium text-gray-700"
            >
              전화번호
            </label>
            <input
              id="userPhone"
              type="text"
              {...register("userPhone", { onChange: onPhoneChange })}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.userPhone
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />

            {errors.userPhone && (
              <p className="text-red-500 text-sm">{errors.userPhone.message}</p>
            )}
          </div>

          {/* 상점명 */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="storeName"
              className="text-sm font-medium text-gray-700"
            >
              상점명
            </label>
            <input
              id="storeName"
              type="text"
              {...register("storeName")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* 상점 설명 */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="storeDescription"
              className="text-sm font-medium text-gray-700"
            >
              상점 설명
            </label>
            <textarea
              id="storeDescription"
              {...register("storeDescription")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* 사장님 알림 */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="ownerNotification"
              className="text-sm font-medium text-gray-700"
            >
              사장님 알림
            </label>
            <input
              id="ownerNotification"
              type="text"
              {...register("ownerNotification")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* 사업자 번호 */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="businessNumber"
              className="text-sm font-medium text-gray-700"
            >
              사업자 번호
            </label>
            <input
              id="businessNumber"
              type="text"
              {...register("businessNumber")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => sendEmailCode(getValues("email"))}
            >
              사업자 번호 확인
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <MyMap
              setNewXValue={setNewXValue}
              setNewYValue={setNewYValue}
              setNewAddress={setNewAddress}
            />
          </div>

          <TextField
            fullWidth
            label="상세 주소"
            id="fullWidth"
            placeholder="상세 주소를 입력해 주세요."
            onChange={e => {
              setNewAddressDetail(e.target.value);
            }}
          />

          {/* 오픈 시간 */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="openTime"
              className="text-sm font-medium text-gray-700"
            >
              오픈 시간
            </label>
            <input
              id="openTime"
              type="time"
              {...register("openTime")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* 마감 시간 */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="closeTime"
              className="text-sm font-medium text-gray-700"
            >
              마감 시간
            </label>
            <input
              id="closeTime"
              type="time"
              {...register("closeTime")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* 기존 동의 항목과 회원가입 버튼 */}
          <div className="flex items-center space-x-4">
            <input
              id="all-terms"
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheck}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="all-terms"
              className="text-sm font-medium text-gray-700"
            >
              전체 동의
            </label>
          </div>
          <div className=" items-center space-x-4">
            <input
              id="privacy"
              type="checkbox"
              {...register("privacy")}
              checked={privacyChecked}
              onChange={handlePrivacyCheck}
              className={`h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${
                errors.privacy ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
            <label
              htmlFor="privacy"
              className="text-sm font-medium text-gray-700"
            >
              개인정보 수집 및 이용 동의 (필수)
            </label>
            {errors.privacy && (
              <p className="text-red-500 text-sm">{errors.privacy.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerSignupPage;
