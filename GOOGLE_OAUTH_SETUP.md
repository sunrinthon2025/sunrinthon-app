# Google OAuth 설정 가이드

## 1. Google Cloud Console 설정

### 1.1 프로젝트 생성
1. https://console.cloud.google.com 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 이름: "우리페이-소방청"

### 1.2 OAuth 동의 화면 설정
1. "API 및 서비스" > "OAuth 동의 화면"
2. 사용자 유형: "외부"
3. 앱 이름: "우리페이"
4. 사용자 지원 이메일: 본인 이메일
5. 개발자 연락처 정보: 본인 이메일

### 1.3 OAuth 2.0 클라이언트 ID 생성
1. "API 및 서비스" > "사용자 인증 정보"
2. "사용자 인증 정보 만들기" > "OAuth 2.0 클라이언트 ID"
3. 애플리케이션 유형: "iOS"
4. 번들 ID: "com.yourcompany.sunrinthon-app" (app.json의 bundleIdentifier와 일치)

### 1.4 Google Sign-In API 활성화
1. "API 및 서비스" > "라이브러리"
2. "Google Sign-In API" 검색 후 활성화

## 2. Expo 앱 설정

### 2.1 app.json 설정
```json
{
  "expo": {
    "scheme": "sunrinthon-app",
    "ios": {
      "bundleIdentifier": "com.yourcompany.sunrinthon-app"
    },
    "android": {
      "package": "com.yourcompany.sunrinthon-app"
    }
  }
}
```

### 2.2 Google 클라이언트 ID 설정
- iOS 클라이언트 ID를 복사해서 코드에 추가

## 3. 코드 구현

### 3.1 환경 변수 설정
- .env 파일에 클라이언트 ID 저장

### 3.2 실제 OAuth 구현
- AuthSession.useAuthRequest 사용
- Google OAuth 엔드포인트 설정

## 4. OAuth 오류 해결 방법

### 4.1 테스트 사용자 추가 (중요!)
1. Google Cloud Console > "OAuth 동의 화면"
2. "테스트 사용자" 섹션으로 이동
3. "테스트 사용자 추가" 클릭
4. 본인의 Google 이메일 주소 추가
5. 저장

### 4.2 앱 검증 상태 확인
- 개발 중인 앱은 "테스트" 상태여야 함
- "프로덕션"으로 설정하면 검증이 필요함

### 4.3 스코프 설정 확인
- 필요한 스코프만 요청: 'openid', 'profile', 'email'

### 4.4 리디렉션 URI 확인
- app.json의 scheme과 일치하는지 확인
- iOS 시뮬레이터용: `sunrinthon-app://` 