/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react'
import Dialog from 'rmc-dialog'
import 'rmc-dialog/assets/index.css'
import './index.less'

export interface ModalProps {
  /** 是否展示关闭按钮 */
  closable?: boolean
  children?: React.ReactNode
  /** 是否展示页脚 */
  footer?: boolean
  width?: number
  /** 弹窗标题 */
  title?: string
  /** 取消文字 */
  cancelText?: string
  /** 确定文字 */
  okText?: string
  visible?: boolean
  onOk?: (e: React.MouseEvent<HTMLElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void
  onClose?: () => void
}
export interface ModalLocale {
  cancelText: string
  okText: string
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    closable = false,
    cancelText,
    okText,
    onClose,
    onOk,
    onCancel,
    width,
    footer,
    title,
    visible
  } = props
  const Dialogwidth = width || '80%'
  const style = { width: Dialogwidth, margin: '0 auto' }
  const close = () => {
    if (onClose) {
      onClose()
    }
  }
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    const { onCancel } = props
    if (onCancel) {
      onCancel(e)
    }
  }
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props
    if (onOk) {
      onOk(e)
    }
  }
  const renderFooter = (locale: ModalLocale) => {
    const { cancelText, okText } = props
    return (
      <div className="dialog-footer">
        <div className="dialog-cancel" onClick={() => handleCancel}>
          {cancelText || locale.cancelText}
        </div>
        <div className="dialog-ok" onClick={() => handleOk}>
          {okText || locale.okText}
        </div>
      </div>
    )
  }
  const defaultFooter = renderFooter({ cancelText: '取消', okText: '确定' })
  return (
    <div className="center">
      <Dialog
        footer={footer ? defaultFooter : ''}
        title={title}
        wrapClassName="center"
        closable={closable}
        style={style}
        onClose={close}
        animation="zoom"
        maskAnimation="fade"
        visible={visible}
      >
        {children}
      </Dialog>
    </div>
  )
}
export default Modal
