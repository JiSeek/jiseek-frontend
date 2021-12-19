# 💡 지 식(知食, JISEEK)

AI 이미지 감지 및 분류 기능을 활용해 사용자가 업로드한 사진 속 메뉴를 분석하여 한식 400종류의 영양 성분과 레시피를 제공하는 서비스

## 기술 스택

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React_Context_Api-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React-Table&logoColor=green"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=React-Router&logoColor=black"> <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white"> <img src="https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=yellow"> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">

## 1. 프로젝트 소개

### 서비스 대상

한국에 방문 중이거나 예정인 외국인 & 한식의 영양 정보 및 레시피에 관심이 있는 한국인

### 기획 배경

- 코로나 이전부터 이미 K-POP, 영화 등의 컨텐츠를 중심으로 전세계적으로 한국에 대한 전반적인 관심이 급증
- 코로나 종식 이후 한국 방문을 희망하는 여행객의 잠재적 수요
- 여행지에서 음식을 주문하는 경우 세부 정보를 알기 어려움
- 자신이 주문한 음식 사진을 찍어 SNS에 올리는 일은 일상화된 삶의 양식

## 2. 프로젝트 목표

음식 사진을 찍어 업로드하면 포함된 음식의 영양 성분과 관련 레시피(유튜브 영상)를 알려주는 서비스를 제공한다.

- 사용자는 400여종의 한국 음식명을 검색하여 해당 음식에 대한 영양정보와 레시피를 확인할 수 있다.
- 음식 사진을 업로드하면 해당 사진에 포함된 음식들에 대한 영양정보와 레시피를 확인할 수 있다.
- 커뮤니티 기능을 통해 다른 사람들과 좋아하는 음식 정보를 공유하며 한국 음식에 대해 더 많이 알아볼 수 있다.
- 좋아하는 음식이나 게시글에 관심을 표시하면 마이페이지에서 언제든지 해당 정보를 확인할 수 있다.

</br>

## 3. 프로젝트 기능 설명

### 메인

<img src="https://user-images.githubusercontent.com/21259498/146324059-44bddb67-b2c8-4333-9fb6-7a7df9365c68.PNG" width="700px"/>

### 회원가입 및 로그인

<img src="https://user-images.githubusercontent.com/21259498/146324116-a198c429-09e9-4abf-bcd4-3b21b9a8f7c0.gif" width="400px"/> <img src="https://user-images.githubusercontent.com/21259498/146324126-53cef88c-d61f-4548-9c84-505f196e907c.gif" width="400px"/> <img src="https://user-images.githubusercontent.com/21259498/146324130-b2b2e3ee-a259-47e8-808a-c39cc657ade5.gif" width="400px"/>

### 음식 검색(이름/사진)

<img src="https://user-images.githubusercontent.com/21259498/146324225-9c89b044-65e4-4ca1-afb3-464b8095fd05.gif" width="700px"/>
<img src="https://user-images.githubusercontent.com/21259498/146324229-224da1e9-8fba-4686-8af2-dccb52ff3346.gif" width="700px"/>

### 커뮤니티

<img src="https://user-images.githubusercontent.com/21259498/146324294-028737bd-1b16-4652-a39a-464e8a4b0687.gif" width="700px"/>
<img src="https://user-images.githubusercontent.com/21259498/146324302-32cf2dfc-d2b6-48fc-9db4-8fd70898df22.gif" width="700px"/>

### 마이페이지

<img src="https://user-images.githubusercontent.com/21259498/146324390-2002da56-78d8-409d-a197-278024cfeca7.gif" width="700px"/>
<img src="https://user-images.githubusercontent.com/21259498/146324393-98e02133-04db-46be-8598-bc12318e0bab.gif" width="700px"/>

### 다국어 지원

<img src="https://user-images.githubusercontent.com/21259498/146324476-4e843fcf-ac3c-4b96-b6d5-4b25253eca99.gif" width="700px"/>

</br>

## 4. 프로젝트 구성도

### 서비스 구조

<img src="https://user-images.githubusercontent.com/21259498/146323922-2407dadd-b3fb-49c1-9bcb-be12128ae056.png" width="700px"/>

- [와이어프레임](https://www.figma.com/file/Dhy5ArGKc89o5GWVsw4a33/JiSeek?node-id=626%3A2) / [스토리보드](https://docs.google.com/presentation/d/1mH-2jsKM6b4NwtLaVTLs6HW5SCAXKwEWsExoqCX0nkY/edit#slide=id.p)

</br>

## 5. 소스 디렉토리 구조 (Update: 21.12.15)

src  
ㅤ|-- api: API관련 기능들을 구현합니다.  
ㅤ|-- assets: 프로젝트 자원들이 위치합니다.  
ㅤㅤㅤ|-- images: 사용할 이미지들을 위치합니다.  
ㅤ|-- components: 컴포넌트들을 구현합니다.  
ㅤ|-- constants: 상수들을 정의합니다.  
ㅤ|-- contexts: 컨텍스트 API를 위한 컨텍스트들을 구현합니다.  
ㅤ|-- hooks: 커스텀 훅들을 구현합니다.  
ㅤ|-- lang: 한/영 변환을 위한 페이지 문구들을 정의합니다.  
ㅤ|-- pages: 페이지 컴포넌트들을 구현합니다.  
ㅤ|-- reducer: 컨텍스트 API에서 사용할 Reducer를 구현합니다.  
ㅤ|-- styles: 사용할 폰트들을 정의합니다.  
ㅤ|-- utils: Utility 기능들을 구현합니다.

</br>

## 6. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무                                                                                                                                                                                                                                                                                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 고예림 | 스토리보드 작성 <br> 커뮤니티 페이지 라우팅 구성 <br> 게시물 CRUD 기능 구현 <br> 댓글 CRUD 기능 구현                                                                                                                                                                                                                                                                         |
| 박지윤 | 음식 사진 프리뷰 구현 <br> 영양 분석정보(차트, 도표) 안내 구현 <br> 바운딩 박스 구현 <br> 음식명 및 페이지 문구 번역 지원                                                                                                                                                                                                                                                    |
| 이민영 | 와이어프레임 작성 <br> UI/UX 전체 디자인 <br> 사진 업로드 드래그앤드롭 구현 <br> 영양 분석정보(차트, 도표) 안내 구현 <br> 유튜브 API를 이용한 음식 레시피 제공 기능 구현                                                                                                                                                                                                     |
| 전진성 | 프론트엔드 파트장 <br> 스토리보드 작성 <br> 소스 구조, 커밋, 브랜치 규칙 정의 <br> 전체 페이지 라우팅 구현 <br> 서비스에서 사용할 API 및 유틸리티 함수 구현 <br> 음식 검색(이름, 사진) 페이지 기능 구현 <br> 로그인(아웃)/회원가입 기능 구현(자체/소셜) <br> 마이페이지 정보 수정 및 관심 목록 기능 구현 <br> 커뮤니티 페이지 기능 리펙토링 <br> 한/영 다국어 지원 기능 구현 |

</br>

## 7. 버전

- v1.0.0

</br>
