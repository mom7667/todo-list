# 데이터베이스의 구조

## Firestore 컬렉션 구조

### todos 컬렉션
- 문서 ID: 자동 생성 (uuid)
- 필드:
  - title: string (할 일 제목)
  - description: string (할 일 설명)
  - priority: number (우선순위: 1-높음, 2-중간, 3-낮음)
  - isCompleted: boolean (완료 여부)
  - category: string (카테고리: 'PERSONAL' | 'WORK' | 'SHOPPING' | 'STUDY' | 'OTHER')
  - createdAt: timestamp (생성 시간)
  - updatedAt: timestamp (수정 시간)
  - backgroundColor: string (메모 배경색)


### 2. 데이터 조회
ypescript
const todosRef = collection(db, "todos");
const q = query(todosRef, orderBy("priority"), orderBy("createdAt", "desc"));
const snapshot = await getDocs(q);
Apply
Copy


### 3. 데이터 수정
await updateDoc(doc(db, "todos", todoId), {
title: "수정된 할 일",
updatedAt: serverTimestamp()
});



### 4. 데이터 삭제
typescript
await deleteDoc(doc(db, "todos", todoId));

## Firestore 컬렉션 구조


## 룰

### 1. 보안 규칙
typescript
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /todos/{todo} {
// 읽기: 모든 사용자 허용
allow read: if true;
// 쓰기: 기본 유효성 검사
allow write: if true &&
request.resource.data.title is string &&
request.resource.data.title.size() > 0 &&
request.resource.data.title.size() <= 100 &&
request.resource.data.priority in [1, 2, 3] &&
request.resource.data.isCompleted is bool;
}
}
}


### 2. 데이터 관리 규칙
- 모든 필드는 null 값을 허용하지 않습니다.
- title은 1-100자 이내로 제한합니다.
- description은 최대 500자로 제한합니다.
- priority는 1, 2, 3 값만 허용합니다.
- category는 'PERSONAL', 'WORK', 'SHOPPING', 'STUDY', 'OTHER' 값만 허용합니다.
- timestamp는 서버 타임스탬프를 사용합니다.

### 3. 인덱싱 규칙
- priority + createdAt 복합 인덱스 생성
- isCompleted + createdAt 복합 인덱스 생성

### 4. 성능 최적화 규칙
- 한 번의 쿼리에서 최대 20개의 문서만 조회
- 실시간 리스너는 필요한 경우에만 사용
- 불필요한 필드 업데이트 지양