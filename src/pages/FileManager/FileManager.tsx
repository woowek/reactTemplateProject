/**
 * 파일 관리 페이지
 */

import { useState } from 'react'
import './FileManager.css'

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: string
  modified: string
}

export const FileManager = () => {
  const [files] = useState<FileItem[]>([
    { id: '1', name: 'documents', type: 'folder', modified: '2026-01-10' },
    { id: '2', name: 'images', type: 'folder', modified: '2026-01-12' },
    { id: '3', name: 'project.zip', type: 'file', size: '15.2 MB', modified: '2026-01-15' },
    { id: '4', name: 'readme.md', type: 'file', size: '2.1 KB', modified: '2026-01-14' },
    { id: '5', name: 'package.json', type: 'file', size: '1.5 KB', modified: '2026-01-13' },
  ])

  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // 업로드 시뮬레이션
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDownload = () => {
    if (selectedFiles.length === 0) {
      alert('다운로드할 파일을 선택해주세요')
      return
    }
    alert(`${selectedFiles.length}개 파일 다운로드 시작 (Mock)`)
  }

  const handleDelete = () => {
    if (selectedFiles.length === 0) {
      alert('삭제할 파일을 선택해주세요')
      return
    }
    if (confirm(`${selectedFiles.length}개 파일을 삭제하시겠습니까?`)) {
      setSelectedFiles([])
      alert('삭제되었습니다 (Mock)')
    }
  }

  return (
    <div className="file-manager-page">
      <div className="page-header">
        <h1>📁 파일 관리</h1>
        <p>파일 업로드/다운로드 및 관리 기능 샘플</p>
      </div>

      <div className="file-actions">
        <div className="upload-area">
          <label className="btn-upload">
            📤 파일 업로드
            <input type="file" onChange={handleUpload} hidden />
          </label>
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
              </div>
              <span>{uploadProgress}%</span>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn-action" onClick={handleDownload} disabled={selectedFiles.length === 0}>
            ⬇️ 다운로드 ({selectedFiles.length})
          </button>
          <button className="btn-action btn-danger" onClick={handleDelete} disabled={selectedFiles.length === 0}>
            🗑️ 삭제
          </button>
        </div>
      </div>

      <div className="file-list-container">
        <table className="file-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input type="checkbox" />
              </th>
              <th>이름</th>
              <th style={{ width: '120px' }}>크기</th>
              <th style={{ width: '150px' }}>수정일</th>
              <th style={{ width: '100px' }}>작업</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr
                key={file.id}
                className={selectedFiles.includes(file.id) ? 'selected' : ''}
                onClick={() => handleFileSelect(file.id)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleFileSelect(file.id)}
                  />
                </td>
                <td>
                  <div className="file-name">
                    <span className="file-icon">{file.type === 'folder' ? '📁' : '📄'}</span>
                    {file.name}
                  </div>
                </td>
                <td>{file.size || '-'}</td>
                <td>{file.modified}</td>
                <td>
                  <button className="btn-small">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="file-stats">
        <span>총 {files.length}개 항목</span>
        <span>선택됨: {selectedFiles.length}개</span>
      </div>

      <div className="file-note">
        <h3>📌 향후 개선 사항</h3>
        <ul>
          <li>실제 서버 API 연동 (Multipart Upload)</li>
          <li>드래그 앤 드롭 업로드</li>
          <li>파일 미리보기 (이미지, PDF)</li>
          <li>폴더 구조 탐색</li>
          <li>청크 업로드 (대용량 파일)</li>
          <li>압축 파일 다운로드</li>
        </ul>
      </div>
    </div>
  )
}
