import { useEffect, useState } from "react";
import MypageModal from "../components/common/mypage/MypageModal";
import Mypage from "../components/join/Mypage";
import jwtAxios from "../api/user/jwtUtil";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MyPageAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [newXValue, setNewXValue] = useState(0);
  const [newYValue, setNewYValue] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newAddressDetail, setNewAddressDetail] = useState("");
  const [addressPk, setAddressPk] = useState("");
  const [isFirstUser, setIsFirstUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setIsLogin(false);
      setAddress("로그인 후 이용해주세요");
      setAddressDetail("로그인 후 이용해주세요");
      setIsLoading(false);
      return;
    } else {
      setIsLogin(true);
    }

    const getUserAddress = async () => {
      try {
        const res = await jwtAxios.get("/api/address/main-address");
        if (res.data.resultData) {
          const { addrPk, addr1, addr2, addrCoorX, addrCoorY } =
            res.data.resultData;
          setAddressPk(addrPk);
          setAddress(addr1);
          setAddressDetail(addr2);
          setXValue(addrCoorX);
          setYValue(addrCoorY);
          setIsFirstUser(false);
        } else {
          setIsFirstUser(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserAddress();
  }, []);

  const handleAddressSubmit = async () => {
    try {
      const data = {
        addr_name: "우리집",
        addr1: newAddress,
        addr2: newAddressDetail,
        addr_coor_x: newXValue,
        addr_coor_y: newYValue,
      };
      if (isFirstUser) {
        await jwtAxios.post("/api/address", data);
      } else {
        data.addr_pk = addressPk;
        await jwtAxios.patch("/api/address", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onModify = () => {
    setIsModalOpen(true);
  };

  const onModifyYes = () => {
    setAddress(newAddress);
    setAddressDetail(newAddressDetail);
    setXValue(newXValue);
    setYValue(newYValue);
    handleAddressSubmit();
    setIsModalOpen(false);
  };

  const onModifyNo = () => {
    setIsModalOpen(false);
  };

  if (!isLogin) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <NotLogin />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="mypage-title">
          <div className="mypage-title-box">주소</div>
          <div>{address}</div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">상세 주소</div>
          <div>{addressDetail}</div>
        </div>

        <div className="mypage-button-box">
          <button type="button" className="btn" onClick={onModify}>
            {isFirstUser ? "등록" : "수정"}
          </button>
        </div>
        {isModalOpen && (
          <MypageModal
            onModifyYes={onModifyYes}
            onModifyNo={onModifyNo}
            setAddress={setAddress}
            setNewAddress={setNewAddress}
            setNewAddressDetail={setNewAddressDetail}
            setNewXValue={setNewXValue}
            setNewYValue={setNewYValue}
            isFirstUser={isFirstUser}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageAddress;
