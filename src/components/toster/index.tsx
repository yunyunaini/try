/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react'
import classNames from 'classnames'
import RCNotification from 'rc-notification'
import './index.less'
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent
} from 'rc-notification/lib/Notification'

const loading = require('../../commom/image/loading.gif')
const success = require('../../commom/image/success.png')
const error = require('../../commom/image/error.png')

const localPrefixCls = 'toast'
let key = 1
const defaultDuration = 2
let defaultTop: number
let maxCount: number
let messageInstance: RCNotificationInstance | null

type NoticeType = 'success' | 'error' | 'loading'

const typeToIcon = {
  success: success,
  error: error,
  loading: loading
}

export interface ArgsProps {
  content: React.ReactNode
  type?: NoticeType
  prefixCls?: string
  duration?: number | null
  key?: string | number
  onClose?: () => void
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string): NoticeContent {
  const duration = args.duration !== undefined ? args.duration : defaultDuration
  const isIconPulse = args.type
  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-notice-iconType`]: args.type
  })
  return {
    duration,
    key: args.key,
    content: (
      <div className={messageClass}>
        {isIconPulse && <img className={`${prefixCls}-icon`} src={typeToIcon[isIconPulse]} />}
        <span>{args.content}</span>
      </div>
    ),
    onClose: args.onClose
  }
}

function getRCNotificationInstance(
  args: ArgsProps,
  callback: (info: { instance: RCNotificationInstance; prefixCls: string }) => void
) {
  const prefixCls = args.prefixCls || localPrefixCls
  if (messageInstance) {
    callback({
      prefixCls,
      instance: messageInstance
    })
    return
  }
  RCNotification.newInstance(
    {
      prefixCls,
      style: { top: defaultTop },
      maxCount
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (instance: any) => {
      if (messageInstance) {
        callback({
          prefixCls,
          instance: messageInstance
        })
        return
      }
      messageInstance = instance
      callback({
        prefixCls,
        instance
      })
    }
  )
}

function notice(args: ArgsProps) {
  const target = args.key || key++
  getRCNotificationInstance(args, ({ prefixCls, instance }) => {
    instance.notice(getRCNoticeProps({ ...args, key: target }, prefixCls))
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const api: any = {
  open: notice,
  destroy(messageKey?: React.Key) {
    if (messageInstance) {
      if (messageKey) {
        const { removeNotice } = messageInstance
        removeNotice(messageKey)
      } else {
        const { destroy } = messageInstance
        destroy()
        messageInstance = null
      }
    }
  }
}
export interface MessageApi {
  open(args: ArgsProps): void
  loading(args: ArgsProps): void
  success(args: ArgsProps): void
  error(args: ArgsProps): void
  destroy(messageKey?: React.Key): void
}

['loading', 'success', 'error'].forEach((type) => {
  api[type] = (args: ArgsProps) => {
    api.open({
      ...args,
      type
    })
  }
})

export default api as MessageApi
