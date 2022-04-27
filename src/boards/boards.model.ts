// 모델을 정의하기 위해서는 Class or Interface를 이용하면 됨.
// Class: 변수의 타입 체크 및 인스턴스 생성 가능
// Interface: 변수의 타입만 체크
export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE' 
}