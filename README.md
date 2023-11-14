# USSIM

DAPP사용을 위한 기본 설정

- Chrome 브라우저 사용, Metamask설치
- Sepolia Testnet 사용 => SepoliaETH의 보유가 필수
- Seoplia faucet : https://sepoliafaucet.com/

Smart Contract 배포를 위한 RemixIDE

- https://remix.ethereum.org/

Fleek를 사용한 호스팅시 세팅 기본

- Other
- Build command : npm install && npm run build
- Base directory : client
- Public directory : build

Github push 설정

- .gitignore에서 client/src/contracts 를 제거해야 해당 부분이 Github에 포함된다.