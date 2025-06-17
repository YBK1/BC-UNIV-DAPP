# 블록체인 기반 대학생 신원 증명 DApp

 Ethereum 블록체인을 사용한 대학생 자기주도적 신원 증명 DAPP
## 📌 프로젝트 소개

전체 구조
**Ethereum 블록체인을 활용한 대학생 자기주도형 신원 증명 DApp**

 ![](https://i.imgur.com/RoywCDu.png)
- 본 프로젝트는 탈중앙화 방식을 통해, 학교의 직접적인 개입 없이 학생이 스스로 자신의 신원 정보를 안전하게 관리하고 활용 가능
- 개인정보는 암호화된 후 IPFS에 저장되며, 증명서 검증에 필요한 핵심 데이터는 블록체인에 기록되어 신뢰성과 투명성을 보장

 메인 화면
![](https://i.imgur.com/mvbAKGt.png)
---

Ethereum Account를 사용해 학생 사용자 등록
![](https://i.imgur.com/MwgSR8X.png)
## 🔄 사용자 기능 플로우

학교 사용자의 개인정보 발급
![](https://i.imgur.com/nBxMNOm.png)
![사용자 플로우](https://i.imgur.com/G7GDn9x.jpeg)

---

개인정보 복호화 및 증명서 생성
![](https://i.imgur.com/dP6bxER.png)
## 🛠️ 기능 소개

증명
![](https://i.imgur.com/mU1IVoS.png)
### 🏫 학교 측 기능: 증명서 발급
- 학생 개인정보를 기반으로 증명서를 생성하고 IPFS에 업로드  
- 생성된 증명서를 암호화하여 개인정보 보호 강화  
- 증명서의 검증 데이터를 블록체인에 저장

배포 주소 ( IPFS )
https://sparkling-cherry-1177.on.fleek.co/
### 🎓 학생 측 기능: 증명서 조회
- 암호화된 증명서를 복호화하여 열람 가능  
- 증명서를 PDF 형식으로 변환하여 다운로드 가능

### 🏢 검증 기관 기능: 증명서 검증
- 블록체인에 기록된 데이터를 조회하여 증명서의 진위 여부 확인

1. **홈 화면**  
   ![](https://i.imgur.com/mvbAKGt.png)

2. **Ethereum Account를 사용해 학생 사용자 등록**  
   ![](https://i.imgur.com/MwgSR8.png)

3. **학교 사용자의 개인정보 발급**  
   ![](https://i.imgur.com/nBxMNOm.png)

4. **개인정보 복호화 및 증명서 생성**  
   ![](https://i.imgur.com/dP6bxER.png)

5. **증명서 확인**  
   ![](https://i.imgur.com/mU1IVoS.png)

---

## 🏗️ Architecture

![시스템 아키텍처](https://i.imgur.com/RoywCDu.png)
