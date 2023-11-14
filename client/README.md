# React client

- Remix를 통해 배포한 Smart Contract의 ABI를 src/contarcs에 포함시킨다.

- ABI에 하단의 network 설정을 추가한다.

"networks": {
		"11155111": {
		  "events": {},
		  "links": {},
		  "address": "---Smart Contract Address---",
		  "transactionHash": "---Deploy Transaction Hash---"
		}
	},
