import log from '../../commons/log'
import { isLogMessage } from '../../const'

let lastMessageId = new Array(100).fill('')

export default async function onNewMessage(message: any, callback: Function) {
  let { messageId } = message.messageMetadata

  // sticker 
  if (message.stickerId !== undefined && lastMessageId.includes(messageId) === false) {

    /** log message */
    if (isLogMessage) {
      log('receive', `${message.messageMetadata.actorFbId} > sticker.`)
    }

    let threadID = (message.messageMetadata.threadKey.threadFbId) ? message.messageMetadata.threadKey.threadFbId : message.messageMetadata.threadKey.otherUserFbId

    callback({
      type: 'sticker',
      pack: message.attachments[0].mercury.sticker_attachment.pack.id,
      label: message.attachments[0].mercury.sticker_attachment.label,
      frameCount: message.attachments[0].mercury.sticker_attachment.frame_count,
      image: {
        spriteImage: message.attachments[0].mercury.sticker_attachment.sprite_image,
        url: message.attachments[0].mercury.sticker_attachment.url,
        width: message.attachments[0].mercury.sticker_attachment.width,
        height: message.attachments[0].mercury.sticker_attachment.height,
      },
      stickerId: parseInt(message.stickerId, 10),
      threadID: parseInt(threadID, 10),
      isGroup: message.messageMetadata.threadKey.threadFbId !== undefined,
      senderId: message.messageMetadata.actorFbId,
      messageId,
    })

    lastMessageId.push(messageId)
    lastMessageId.shift()
  }

  // attachments
  if (message.attachments.length > 0 && lastMessageId.includes(messageId) === false && message.stickerId === undefined) {

    /** log message */
    if (isLogMessage) {
      log('receive', `${message.messageMetadata.actorFbId} > attachment.`)
    }

    let threadID = (message.messageMetadata.threadKey.threadFbId) ? message.messageMetadata.threadKey.threadFbId : message.messageMetadata.threadKey.otherUserFbId

    let attachments = message.attachments.map((attachment: any) => {
      if (attachment.mimeType === 'image/jpeg' || attachment.mimeType === 'image/png') {
        return {
          type: 'image',
          id: attachment.id,
          filename: attachment.filename,
          filesize: attachment.fileSize,
          width: attachment.imageMetadata.width,
          height: attachment.imageMetadata.height,
          preview: {
            preview: attachment.mercury.blob_attachment.preview.uri,
            large_preview: attachment.mercury.blob_attachment.large_preview.uri,
            thumbnail: attachment.mercury.blob_attachment.thumbnail.uri,
          },
          extension: attachment.mercury.blob_attachment.original_extension,
          renderAsSticker: attachment.mercury.blob_attachment.render_as_sticker,
        }
      }

      if (attachment.mimeType === 'application/octet-stream') {
        //
      }
      return undefined
    })

    callback({
      type: 'attachments',
      attachments,
      threadID: parseInt(threadID, 10),
      isGroup: message.messageMetadata.threadKey.threadFbId !== undefined,
      senderId: message.messageMetadata.actorFbId,
      messageId,
    })

    lastMessageId.push(messageId)
    lastMessageId.shift()

  }

  // text msg 
  if (message.body !== undefined && lastMessageId.includes(messageId) === false) {

    /** log message */
    if (isLogMessage) {
      log('receive', `${message.messageMetadata.actorFbId} > ${message.body}`)
    }

    let threadID = (message.messageMetadata.threadKey.threadFbId) ? message.messageMetadata.threadKey.threadFbId : message.messageMetadata.threadKey.otherUserFbId

    callback({
      type: 'text',
      threadID: parseInt(threadID, 10),
      isGroup: message.messageMetadata.threadKey.threadFbId !== undefined,
      senderId: message.messageMetadata.actorFbId,
      text: message.body,
      messageId,
    })

    lastMessageId.push(messageId)
    lastMessageId.shift()
  }
}
