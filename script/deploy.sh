#!/bin/sh

# pre: 
#  - 이 파일과 docker-compose.yml 파일은 root 폴더에 저장되어있다.
#  - 서버에는 docker 와 docker-compose 가 설치되어있다.
#  - 서버에 대한 ACG 설정은 모든 IP에 대해 22번 포트를 개방해야한다. 

# 아래는 보안 이슈로 비어있다.
# 실제 서버에는 아래에 적절한 값을 입력해야한다.
# export NCP_ACCESS_KEY_ID=
# export NCP_SECRET_KEY=
 
echo "$NCP_SECRET_KEY" | docker login -u "$NCP_ACCESS_KEY_ID" dev-2019-01.kr.ncr.ntruss.com --password-stdin
docker pull dev-2019-01.kr.ncr.ntruss.com/front-end
docker pull dev-2019-01.kr.ncr.ntruss.com/back-end
docker-compose down
docker-compose up -d