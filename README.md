# 주문이요 : 음식 주문 플랫폼 서비스

<b>프로젝트 자료</b>

배포: [배포사이트](https://jumuniyo.gybproject.com/)

"본 사이트는 KDT 수강생들의 열정으로 만들어진 프로젝트입니다. 프로젝트 완료 후 일정 기간 서비스를 운영했지만, 유지 비용 등의 어려움으로 인해 서비스를 중단해야 했습니다. 현재, 다시 서비스를 재개하면서 일부 기능이 변경되었을 수 있습니다. 수강생들의 노력이 담긴 프로젝트인 만큼, 많은 이해와 관심 부탁드립니다."

피그마: [(링크)](<https://www.figma.com/design/wo9ijijb6eANcrwEzBAFQA/%EC%A3%BC%EB%AC%B8%EC%9D%B4%EC%9A%94-(%EA%B0%80%EC%B9%AD)?node-id=25-2>)

캔바: [(링크)](https://www.canva.com/design/DAGOX4a8SaE/F06Qj7PFzV0Ck796fnsNLA/edit)

## 프로젝트 소개

"주문이요"는 모든 연령층이 쉽게 사용할 수 있는 편리한 음식 주문 플랫폼입니다.
쉽고 빠른 주문 경험을 제공하여 언제 어디서든 맛있는 음식을 간편하게 주문할 수 있도록 돕습니다.
또한, 음식점 사장님을 위한 사업자 서비스를 통해 매장 소개, 메뉴 등록, 주문 접수, 리뷰 관리 등 매장 관리 기능을 제공하여 매출 증대를 지원합니다.

## 핵심 기능

### 유저 서비스

- 회원가입: 간편한 회원가입 및 로그인(+소셜 로그인)
- 아이디와 비밀번호 찾기
- 주소 등록 관리
- 음식 주문: 다양한 메뉴 검색 및 주문
- 결제: 다양한 결제 수단 지원
- 리뷰: 솔직한 리뷰 작성 및 확인
- 상점 즐겨찾기
- 발급된 쿠폰 사용, 쿠폰사용내역
- 고객센터에 문의하기, 문의내역
- 이벤트 중인 상점 노출
- 리뷰 신고 기능

### 사업자 서비스

- 사업장 등록: 간편한 사업장 등록 및 정보 관리
- 메뉴 등록: 다양한 메뉴 등록 및 관리
- 주문 접수: 실시간 주문 접수 및 관리
- 리뷰 관리: 고객 리뷰 확인 및 관리
- 매장 관리: 매장 정보 및 운영 시간 관리
- 매출 통계: 일별/월별 매출 통계 확인
- 매장 쿠폰 발급

### 관리자 서비스

- 사업자 회원가입 시 승인 관리
- 사이트 메뉴 카테고리 관리
- 고객센터 문의 내용 관리
- 리뷰 신고 내용 관리
- 가입, 탈퇴 통계
- 토탈 상점 매출, 주문 수 관리

## 기술 스택

📚 Front Tech Stack 📚

- React
- React Router DOM
- Axios
- reduxjs/toolkit
- redux-persist
- emotion
- sass
- @mui
- react-datepicker
- date-fns

## 사이트 유지보수

담당자 : 곽도억
기간 : 2024.09.07 ~

- 프로젝트에 사용된 더미 데이터의 주소는 대구입니다.

### 유지보수 순서

1. 로그인 (완료)
2. 회원가입
3. 메인페이지
4. 상점 검색
5. 메뉴 주문
6. 주문 결제
7. 주문 확인 및 취소

### 유지보수 내역

1. `App.jsx`

- React.lazy와 Suspense를 사용해서 페이지별로 필요한 컴포넌트만 로드되도록 해서 초기 로딩 시간을 최적화 작업함.
- 중복 Route 요소 간소화
- 라우트 경로 구조 개선

### 서버 문제로 작동하지 않는 기능

1. 회원가입

- 이메일 인증을 사용할 수 없음
