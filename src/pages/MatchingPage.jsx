import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';  // Firebase 설정에 맞게 수정 필요

const PageContainer = styled.div`
  padding: 10px;
  font-family: Arial, sans-serif;
`;

const StyledTable = styled.table`
  width: 110%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableHeader = styled.th`
  padding: 10px 5px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  font-weight: bold;
  font-size: 18px;
`;

const TableData = styled.td`
  padding: 18px 15px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Status = styled.td`
  padding: 18px 15px;
  border: 1px solid #ddd;
  color: ${(props) => {
    if (props.status === 'complete') return '#008000';
    if (props.status === 'pending') return '#FFA500';
    if (props.status === 'rejected') return '#FF0000';
    return '#000';
  }};
  font-weight: bold;
`;

export default function MatchingPage() {
  const [matchingRecords, setMatchingRecords] = useState([]);
  const [user, setUser] = useState(null);  // 사용자 정보 상태

  const auth = getAuth();  // Firebase 인증 인스턴스 가져오기

  // Firebase 인증 상태를 추적하는 useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // 로그인된 사용자 정보 설정
      } else {
        setUser(null);  // 로그아웃 상태
      }
    });
    return () => unsubscribe();  // 컴포넌트가 언마운트되면 리스너 정리
  }, [auth]);

  // 로그인된 사용자 정보로 매칭 기록을 가져오는 useEffect
  useEffect(() => {
    if (user) {
      const userApplicationsRef = ref(db, `users/${user.uid}/applications`);
      onValue(userApplicationsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const recordsArray = Object.values(data);  // 객체를 배열로 변환
          setMatchingRecords(recordsArray);
        } else {
          setMatchingRecords([]);  // 매칭 기록이 없을 때 빈 배열 설정
        }
      });
    }
  }, [user]);

  return (
    <PageContainer>
      <h1>매칭 기록</h1>

      {matchingRecords.length === 0 ? (
        <p>현재 매칭 기록이 없습니다.</p>
      ) : (
        <StyledTable>
          <thead>
            <TableRow>
              <TableHeader>로컬 크리에이터</TableHeader>
              <TableHeader>신청날짜</TableHeader>
              <TableHeader>신청시간</TableHeader>
              <TableHeader>신청현황</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {matchingRecords.map((record, index) => (
              <TableRow key={index}>
                <TableData>{record.creatorName}</TableData>
                <TableData>{record.date}</TableData>
                <TableData>{record.time}</TableData>
                <Status status={record.status}>
                  {record.status === 'complete' ? '완료' :
                   record.status === 'pending' ? '접수 대기' : '거절'}
                </Status>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </PageContainer>
  );
}
