/**
 * 홈(대시보드) 페이지
 */

import '/src/assets/css//Home.css'

export const Home = () => {
  return (
    <div className="home-page">
      <div className="page-header">
        <h2 className="page-title">대시보드</h2>
        <p className="page-description">시스템 개요 및 주요 통계를 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">👥</div>
          <div className="stat-content">
            <h3 className="stat-value">1,234</h3>
            <p className="stat-label">총 사용자</p>
          </div>
          <div className="stat-change positive">+12.5%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">📦</div>
          <div className="stat-content">
            <h3 className="stat-value">567</h3>
            <p className="stat-label">총 상품</p>
          </div>
          <div className="stat-change positive">+8.2%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">🛒</div>
          <div className="stat-content">
            <h3 className="stat-value">89</h3>
            <p className="stat-label">진행중인 주문</p>
          </div>
          <div className="stat-change negative">-3.1%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">💰</div>
          <div className="stat-content">
            <h3 className="stat-value">₩2.4M</h3>
            <p className="stat-label">이번 달 매출</p>
          </div>
          <div className="stat-change positive">+15.3%</div>
        </div>
      </div>

      {/* 컨텐츠 섹션 */}
      <div className="content-grid">
        {/* 최근 활동 */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">최근 활동</h3>
            <button className="card-action">전체보기</button>
          </div>
          <div className="card-body">
            <ul className="activity-list">
              <li className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-content">
                  <p className="activity-text">새로운 주문이 접수되었습니다</p>
                  <span className="activity-time">5분 전</span>
                </div>
              </li>
              <li className="activity-item">
                <span className="activity-icon">👤</span>
                <div className="activity-content">
                  <p className="activity-text">새로운 사용자가 가입했습니다</p>
                  <span className="activity-time">1시간 전</span>
                </div>
              </li>
              <li className="activity-item">
                <span className="activity-icon">📦</span>
                <div className="activity-content">
                  <p className="activity-text">상품이 배송 시작되었습니다</p>
                  <span className="activity-time">2시간 전</span>
                </div>
              </li>
              <li className="activity-item">
                <span className="activity-icon">💬</span>
                <div className="activity-content">
                  <p className="activity-text">새로운 리뷰가 작성되었습니다</p>
                  <span className="activity-time">3시간 전</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 빠른 작업 */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">빠른 작업</h3>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="action-icon">➕</span>
                <span className="action-text">새 상품 추가</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">👥</span>
                <span className="action-text">사용자 관리</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">📊</span>
                <span className="action-text">보고서 생성</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">⚙️</span>
                <span className="action-text">시스템 설정</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 차트 영역 (placeholder) */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">매출 추이</h3>
          <select className="card-select">
            <option>최근 7일</option>
            <option>최근 30일</option>
            <option>최근 90일</option>
          </select>
        </div>
        <div className="card-body">
          <div className="chart-placeholder">
            <p>📈 차트 영역</p>
            <small>Chart.js 또는 Recharts 라이브러리를 사용하여 실제 차트를 구현할 수 있습니다</small>
          </div>
        </div>
      </div>
    </div>
  )
}
