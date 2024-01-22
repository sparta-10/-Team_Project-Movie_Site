# 사이트명
JiYoung's To Do List


## 👩‍💻 프로젝트 소개
리액트 hook인 useState를 사용하여 todolist를 작성할 수 있는 사이트 입니다.

![image](https://github.com/sparta-10/-Team_Project-Movie_Site/assets/154482077/620aae26-8556-435a-a6d7-fc452e0281c7)


## ⏲️ 개발 기간
- 2024.01.22(월)


## 💻 개발환경
- <img alt="React" src ="https://img.shields.io/badge/React-444444.svg?&style=for-the-badge&logo=React&logoColor=react"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScriipt-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img alt="Html" src ="https://img.shields.io/badge/HTML-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="Css" src ="https://img.shields.io/badge/CSS-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>
- Github
- VScode


## 📌 주요 기능
- Todo 추가 하기
- Todo 삭제 하기
- Todo 완료 상태 변경하기 (완료 ↔ 진행중)


## ✔️ 필수 요구 사항
- 제목과 내용을 입력하고, [추가하기] 버튼을 클릭하면 Working에 새로운 Todo가 추가되고 제목 input과 내용 input은 다시 빈 값으로 바뀌도록 구성
- Todo의 isDone 상태가 true이면, 상태 버튼의 라벨을 취소, isDone이 false 이면 라벨을 완료 로 조건부 렌더링
- Todo의 상태가 Working 이면 위쪽에 위치하고, Done이면 아래쪽에 위치하도록 구현
- Layout의 최대 넓이는 1200px, 최소 넓이는 800px로 제한하고, 전체 화면의 가운데로 정렬
- 컴포넌트 분리


## 🧩 컴포넌트
- App
- component
    - Layout : Header & Footer
    -  Form : Todolist 추가
    -  List : 상태 별 Todolist 분
        - Todo : Todolist 삭제 및 상태 변경 (완료 ↔ 진행중)
     

## Create React App 만들기 시작 위한 방법
### 프로젝트 생성하기
yarn create react-app '프로젝트 명'

### 프로젝트 실행하기
#### 프로젝트 폴더로 이동하기
cd '프로젝트 명'

#### 프로젝트 실행하기
yarn start
