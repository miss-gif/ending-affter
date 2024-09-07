import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("wyfmel11");
  const [password, setPassword] = useState("wyfmel!1");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/sign-in", {
        user_id: username,
        user_pw: password,
      });
      if (response.data.statusCode === 1) {
        dispatch(setUser(response.data.resultData));
        toast.success("로그인 성공");
        navigate("/");
      } else {
        toast.error("로그인 실패: " + response.data.resultMsg);
      }
    } catch (error) {
      toast.error("로그인 실패: 네트워크 오류");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            아이디
          </label>
          <input
            id="username"
            type="text"
            placeholder="아이디"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          로그인
        </button>
        <div className="mt-4 flex justify-between">
          <a href="/signup" className="text-indigo-600 hover:text-indigo-700">
            회원가입
          </a>
          <button
            onClick={() => {
              /* 아이디 및 비밀번호 찾기 */
            }}
            className="text-indigo-600 hover:text-indigo-700"
          >
            아이디/비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
