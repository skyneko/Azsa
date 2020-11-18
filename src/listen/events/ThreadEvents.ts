export default function onChangeThreadName(message: any, callback: Function) {
  const eventData = message.messageMetadata
  
  if (eventData === undefined) {
    if (message.class !== 'NoOp') {
      const base = {
        actorID: parseInt(message.actorFbId),
        threadID: parseInt(message.threadKey.threadFbId)
      }

      if (message.class === 'ReadReceipt') {
        callback({
          ...base,
          type: 'event',
          subtype: 'read_receipt',
        })
        return
      }
      if (message.class === 'DeliveryReceipt') {
        callback({
          ...base,
          type: 'event',
          subtype: 'delivery_receipt',
        })
        return
      }
      
    }
  } else {
    console.log('asdf', JSON.stringify(message))
    const base = {
      type: 'event',
      text: eventData.adminText,
      messageID: eventData.messageId,
      actorID: parseInt(eventData.actorFbId, 10),
      offlineThreadingID: eventData.offlineThreadingId,
      threadID: parseInt(eventData.cid.conversationFbid, 10),
      folder: eventData.folderId.systemFolderId,
      timestamp: parseInt(eventData.timestamp, 10)
    }
    
    if (eventData.class === 'ThreadName') {
      callback({
        ...base,
        subtype: 'change_thread_name',
        name: eventData.name,
      })
      return
    }
  
    if (eventData.class === 'ParticipantsAddedToGroupThread') {
      callback({
        ...base,
        subtype: 'added_to_group_thread',
      })
      return
    }

    if (base.text.indexOf('set the emoji to') !== -1) {
      callback({
        ...base, 
        subtype: 'change_emoji'
      })
      return
    }
  
    if (message.type === 'change_thread_theme') {
      const gradient = (message.untypedData.gradient) ? JSON.parse(message.untypedData.gradient) : null
      
      callback({
        ...base, 
        subtype: 'change_thread_theme',
        themeColor: message.untypedData.theme_color,
        label: message.untypedData.accessibility_label,
        gradient,
      })
      return
    }

  }
}
