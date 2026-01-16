/**
 * 통계 대시보드 페이지
 */

import { useState, useEffect } from 'react'
import './Statistics.css'

interface ChartData {
  label: string
  value: number
  color: string
}

export const Statistics = () => {
  const [salesData] = useState<ChartData[]>([
    { label: '1월', value: 65, color: '#3b82f6' },
    { label: '2월', value: 78, color: '#3b82f6' },
    { label: '3월', value: 90, color: '#3b82f6' },
    { label: '4월', value: 81, color: '#3b82f6' },
    { label: '5월', value: 95, color: '#3b82f6' },
    { label: '6월', value: 88, color: '#3b82f6' },
  ])

  const [categoryData] = useState<ChartData[]>([
    { label: '전자제품', value: 35, color: '#3b82f6' },
    { label: '의류', value: 25, color: '#10b981' },
    { label: '식품', value: 20, color: '#f59e0b' },
    { label: '도서', value: 12, color: '#ef4444' },
    { label: '기타', value: 8, color: '#8b5cf6' },
  ])

  const [animatedValues, setAnimatedValues] = useState<number[]>([])

  useEffect(() => {
    // 차트 애니메이션
    const timer = setTimeout(() => {
      setAnimatedValues(salesData.map((d) => d.value))
    }, 100)
    return () => clearTimeout(timer)
  }, [salesData])

  const maxValue = Math.max(...salesData.map((d) => d.value))

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h1>📊 통계</h1>
        <p>데이터 시각화 및 차트 샘플</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#dbeafe' }}>📈</div>
          <div className="stat-content">
            <div className="stat-label">총 매출</div>
            <div className="stat-value">₩42,580,000</div>
            <div className="stat-change positive">+12.5%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#dcfce7' }}>👥</div>
          <div className="stat-content">
            <div className="stat-label">사용자</div>
            <div className="stat-value">8,245</div>
            <div className="stat-change positive">+5.3%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef3c7' }}>🛒</div>
          <div className="stat-content">
            <div className="stat-label">주문</div>
            <div className="stat-value">1,342</div>
            <div className="stat-change negative">-2.1%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fce7f3' }}>💰</div>
          <div className="stat-content">
            <div className="stat-label">평균 주문액</div>
            <div className="stat-value">₩31,750</div>
            <div className="stat-change positive">+8.2%</div>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-container">
          <h3>월별 매출 추이</h3>
          <div className="bar-chart">
            {salesData.map((item, idx) => (
              <div key={item.label} className="bar-item">
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{
                      height: `${(animatedValues[idx] || 0) / maxValue * 100}%`,
                      backgroundColor: item.color,
                    }}
                  >
                    <span className="bar-value">{item.value}M</span>
                  </div>
                </div>
                <div className="bar-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3>카테고리별 비중</h3>
          <div className="pie-chart">
            <div className="pie-visual">
              {categoryData.map((item) => {
                const total = categoryData.reduce((sum, d) => sum + d.value, 0)
                const percentage = (item.value / total) * 100
                return (
                  <div
                    key={item.label}
                    className="pie-segment"
                    style={{
                      backgroundColor: item.color,
                      width: `${percentage}%`,
                    }}
                  />
                )
              })}
            </div>
            <div className="pie-legend">
              {categoryData.map((item) => {
                const total = categoryData.reduce((sum, d) => sum + d.value, 0)
                const percentage = ((item.value / total) * 100).toFixed(1)
                return (
                  <div key={item.label} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: item.color }} />
                    <span className="legend-label">{item.label}</span>
                    <span className="legend-value">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="stats-note">
        <h3>📌 향후 개선 사항</h3>
        <ul>
          <li>Chart.js 또는 Recharts 라이브러리 통합</li>
          <li>실시간 데이터 업데이트</li>
          <li>다양한 차트 타입 (라인, 도넛, 에리어 등)</li>
          <li>데이터 필터링 및 기간 선택</li>
          <li>차트 상호작용 (툴팁, 드릴다운)</li>
          <li>데이터 내보내기 (CSV, Excel)</li>
        </ul>
      </div>
    </div>
  )
}
