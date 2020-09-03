export default function onClientPayload(message: any, callback: Function) {
  const data = Buffer.from(message.payload).toString()
  const jsonData = JSON.parse(data)
  
  jsonData.deltas.forEach((deltaMessage: any) => {
    if (deltaMessage.deltaMessageReaction !== undefined) {
      const reactionData = deltaMessage.deltaMessageReaction

      let threadId = (reactionData.threadKey.threadFbId) ? reactionData.threadKey.threadFbId : reactionData.threadKey.otherUserFbId

      callback({
        type: 'reaction',
        threadId,
        targetMessageId: reactionData.messageId,
        targetUserId: reactionData.userId,
        action: reactionData.action,
        reaction: reactionData.reaction,
        senderId: reactionData.senderId,
        offlineThreadingId: reactionData.offlineThreadingId,
      })
    }
  })
}
