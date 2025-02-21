<!-- # 프로젝트 소개 -->
<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1> 1. 프로젝트 소개 </h1>
    </summary>
  </ul>
</div>


<div align="center">
  <h2>같이 달램 서비스</h2>
</div>

  https://github.com/user-attachments/assets/748b134b-b28b-4f4a-bd0b-58fc5d4329b3

<br>

같이 달램은 현대인의 바쁜 일상 속에서 부족한 휴식을 보완하고, 자신에게 맞는 휴식과 소셜 모임을 쉽게 찾고 참여할 수 있도록 돕는 플랫폼입니다.

<br>

<div align="center">

 👉 [서비스 확인하러 가기](https://together-gilt.vercel.app/)

</div>

<br/>
<br/>

<!-- # 기술 스택 및 개발 환경 -->
<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1>기술 스택 및 개발 환경 </h1>
    </summary>
  </ul>
</div>

<br>

<div align="center">

| Category | Skill-Set |
| --- | --- |
| **Frameworks** | NextJS 14+, ReactJS 18+ |
| **Programming Languages** | TypeScript 
| **State managing Libraries** | Client state: Context Api + zustand <br> Server State: react-query v5+ |
| **Styling Libraries** | CSS: TailwindCSS <br> Animation: Framer motion |
| **Deployment Tools** | Github Actions |
| **Cloud Services** | Vercel |
| **Version Control** | Git/GitHub |
| **Collaboration Tools** | Jira |

</div>

<br>
<br>

<!-- # 주요 기능 및 화면 구성 -->
<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1>주요 기능 및 화면 구성</h1>
    </summary>
  </ul>
</div>

<h3>:: 모임 찾기(메인페이지)</h3>
  가장 처음 보여지는 페이지로, 생성 되어 있는 모든 모임을 볼 수 있습니다.

  #### 1. 모임 정보 조회
  ![모임 찾기](https://github.com/user-attachments/assets/f8da26fb-da13-48b2-a634-4772c7d7e24f)
  - 필터를 통해 원하는 조건에 맞는 모임을 찾을 수 있습니다.
  - 무한 스크롤을 통해 데이터를 렌더링 합니다.

  #### 2. 모임 만들기
  ![모임 생성](https://github.com/user-attachments/assets/03dedd34-2c03-4739-9a29-40e35f33c621)
  - 로그인을 하면 '모임 만들기'버튼이 활성화 되고 모임을 생성할 수 있습니다.


<h3>:: 찜한 모임</h3>
찜한 모든 모임을 확인 가능 합니다. <br>

![찜한 모임임](https://github.com/user-attachments/assets/4ebbd1d3-fe1a-49fb-a2a0-4b46eed4cb4a)

- 하트 아이콘(찜 버튼)을 누르면 찜한 모임 페이지에서 확인 가능합니다.
- 아이콘을 한번 더 누르면 찜하기 취소가 가능합니다.
- 모임이 취소됐거나 모집 종료된 경우 '모임 보내주기'를 누르면 취소 됩니다.


<h3>:: 모든 리뷰</h3>
모든 작성된 리뷰와 평균 점수를 볼 수 있습니다.

![모든 리뷰](https://github.com/user-attachments/assets/a477b241-0206-452e-a7eb-8cf687d5fefb)
- 필터를 통해 원하는 모임의 리뷰 확인이 가능합니다. 

<h3>:: 로그인/회원가입</h3>

#### 1. 로그인 유도
![로그인 유도](https://github.com/user-attachments/assets/c794db02-d904-4faf-86dd-3c1bed660445)
- 로그인이 필요한 페이지에 접근 시 연결 됩니다.

#### 2. 로그인
![로그인](https://github.com/user-attachments/assets/10310a3e-3ab8-43cb-afbb-2761ac1828fc)
- 이메일 형식만 입력 가능합니다.

#### 3. 회원가입
![회원가입](https://github.com/user-attachments/assets/be1f142b-745e-41aa-8b11-c7b0cc8f4b1a)
- 형식에 맞는 값을 입력하도록 유도 합니다.

<h3>:: 마이페이지</h3>
로그인 한 상태에서 GNB를 통해 접근 가능 합니다.

#### 1. 마이페이지 정보 조회
![마이페이지](https://github.com/user-attachments/assets/1f34eedb-8bd9-4a34-994f-16416a879c43)
- 사용자가 참여하는 모임 / 생성한 모임 / 리뷰작성완료 혹은 작성 가능한 모임 확인이 가능합니다.

#### 2. 프로필 수정
![프로필 수정](https://github.com/user-attachments/assets/a495b6ad-19b7-4be2-acf2-131b358f258b)
- 사용자의 프로필 확인 및 수정이 가능합니다.

<br>
<br>

<!-- # 프로젝트 폴더 구조 -->
<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1>프로젝트 폴더 구조</h1>
    </summary>
  </ul>
</div>


• `gathering`, `reviews`, `user`, `common`으로 도메인 별로 구분하여 작성하였습니다. <br>
• `route` 폴더는 route-handler를 담당하는 폴더로 사용되었습니다.(기존 apis 폴더와의 혼동을 막기 위한 목적) <br>
• `queries` 부분의 common에선 query key factory pattern이 적용된 방식의 queryKey들이 관리됩니다. <br>

<br>

```
📦 Together Service
┣  📂app
┃  ┣ 📂(pages)
┃  ┃ ┣ 📂(auth)
┃  ┃ ┃ ┗  📂(guest-only)
┃  ┃ ┃   ┣ 📂login
┃  ┃ ┃   ┗ 📂signup
┃  ┃ ┣ 📂gatherings
┃  ┃ ┃ ┗ 📂[id]
┃  ┃ ┣ 📂liked
┃  ┃ ┣ 📂mypage
┃  ┃ ┗ 📂reviews
┃  ┣ 📂apis
┃  ┣ 📂components
┃  ┃ ┣ 📂GNB
┃  ┃ ┣ 📂common
┃  ┃ ┃ ┣ 📂filter
┃  ┃ ┃ ┣ 📂form
┃  ┃ ┃ ┣ 📂modal
┃  ┃ ┣ 📂gatherings
┃  ┃ ┣ 📂reviews
┃  ┃ ┗ 📂users
┃  ┣ 📂constants
┃  ┣ 📂fonts
┃  ┣ 📂hooks
┃  ┣ 📂queries
┃  ┃ ┣ 📂common
┃  ┃ ┣ 📂gathering
┃  ┃ ┣ 📂reviews
┃  ┃ ┗ 📂user
┃  ┣ 📂route
┃  ┣ 📂store
┃  ┃ ┣ 📂gathering
┃  ┃ ┣ 📂types
┃  ┣ 📂types
┃  ┃ ┣ 📂common
┃  ┃ ┣ 📂gatherings
┃  ┃ ┣ 📂users
┃  ┃ ┣ 📂reviews
┃  ┃ ┗ 📂util
┃  ┣ 📂utils
┃  ┣ 📜favicon.ico
┃  ┗ 📜globals.css
┣ 📜middleware.ts
┗ 📂middlewares

```

<br>
<br>

<!-- # git 브랜치 전략 -->
<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1>git 브랜치 전략</h1>
    </summary>
  </ul>
</div>



Jira를 도입하며 Jira의 애픽, 스토리 단위를 브랜치에 녺여내려 노력했습니다. 브랜치 관리 전략을 통해 조금이라도 편한 코드 리뷰 작성 환경을 구성하고자 했습니다.

👉 [자세한 브랜치 전략 보러가기](https://scratched-cephalopod-eb9.notion.site/Git-19ee1d6ada4f804c9e9cd9ba37847488?pvs=74)

<br>
<br>

<!-- # 시스템 아키텍쳐 -->
<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1>시스템 아키텍쳐</h1>
    </summary>
  </ul>
</div>

• 인증 관련 API의 제약사항을 극복하기 위해 BFF 형식의 아키텍처를 도입했습니다. <br>
• 모든 요청은 NextJS를 거쳐 API Server로 요청되게 됩니다. <br>
• middleware를 이용해서 인증 정보 검증과 관련된 처리를 수행합니다. <br>

<div align="center">
  <img src="./README.assets/같이 달램 아키택처.png"/>
</div>

<br>
<br>

<!-- # 회고 -->
<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1>회고</h1>
    </summary>
  </ul>
</div>

### **건희** <br>
 개발을 하면서 개발 과정의 문서화가 중요하다는 것을 배웠습니다. <br>
 또, 초기에 기술 스택과 컨벤션을 정할 때 익숙한 것을 사용 하더라도 이유를 다시 생각해 봐야 하며 최대한 자세하게 정하지 않으면 나중에 문제가 생기고 프로젝트 진행에 어려움이 생기는 것을 알게 되었습니다. 

### **우성** <br>
  개발 초기에 제대로 알아보지 않고 내린 잘못된 선택은, 나중의 바쁜 개발 일정에 있어 이를 해결하기 위한 많은 추가 업무를 만들어낸다는 걸 프로젝트의 FetchInstance를 개발하면서 느낄 수 있었습니다. <br>
  프로젝트를 통해 기술 선택에 있어서도 왜 이 기술이 나오게 됐는지, 다른 기술 스택과는 왜 잘 어울리는지, 기술을 적용한다면 왜 이런 방법, 이런 구조로 관리 및 사용해야하는지 등.. 이러한 질문들을 스스로 물어보지 못한 채 그저 기능 구현에 급급했던 자신을 돌아보며 기술 선택에 있어 "왜"를 고민하는 것이 어떤 걸 의미하는지 다시 생각해보게 되었습니다.

### **은진** <br>
  이번 프로젝트에서 쿼리스트링을 직접 다뤄봤습니다. 라이브러리를 사용하지 않고 구현하는 과정에서 많은 것을 배울 수 있었지만, 팀 프로젝트에서는 정해진 기간 내에 완성하는 것이 중요하다는 점을 깨달았습니다. 학습하며 구현하는 것도 좋지만, 적절한 라이브러리를 사용하여 개발 속도를 높이는 것도 필요하다는 것을 배우게 됐습니다.

### **새환** <br>
  이번 프로젝트를 진행하면서 팀원들과의 소통과 일정관리의 중요성의 대해 다시 한번 중요성을 느낄 수 있었습니다. <br>
  팀원들과 동일한 목표를 가지고 개발을 진행하지만, 세부적인 구현 방식이나 기대하는 결과가 다를 수 있다는 점을 경험했습니다. <br>
  특히, 기능을 개발하는 과정에서 무언가 변경되거나 새로운 이슈가 발생했을 때, 정확한 소통이 이루어지지 않으면 예상치 못한 문제들이 쌓이게 된다는 것을 배웠습니다. <br>
  단순한 대화만으로는 정보가 누락될 가능성이 크기 때문에, 논의된 내용을 문서화하고 공유하는 과정이 필수적이라는 점을 실감했습니다. <br>
  이후에는 변경 사항이나 의사결정을 Notion과 GitHub 이슈를 통해 정리하고, 팀원 간 업무 진행 상황을 주기적으로 공유하는 방식으로 개선하려고 노력했습니다. <br>
  이러한 경험을 바탕으로 앞으로도 체계적인 문서화와 적극적인 소통을 통해 더욱 원활한 협업을 만들어 나가야겠다고 느꼈습니다. <br>

<br>
<br>

<div id="user-content-toc">
  <ul style="list-style: none;">
    <summary>
      <h1>팀 소개</h1>
    </summary>
  </ul>
</div>

<br>

<div align="center">

김건희                                      |                                  이우성                                      |                                    장은진                                      |                                   한새환                                      |                                    
| :-----------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/132315752?v=4" height = 100px> | <img src="https://avatars.githubusercontent.com/u/42796944?v=4" height = 100px> | <img src="https://avatars.githubusercontent.com/u/81504945?v=4" height = 100px> | <img src="https://avatars.githubusercontent.com/u/127942524?v=4" height = 100px> |
|[@gunhee0000](https://github.com/gunhee0000)           |    [@leewooseong](https://github.com/leewooseong)                   |         [@eundin](https://github.com/eundin)         |                [@Sidan00](https://github.com/Sidan00)                |

</div>
