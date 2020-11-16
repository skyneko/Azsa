export default function Typing(message: any, callback: Function) {
  callback({
    type: 'typing',
    threadID: parseInt(message.thread, 10),
    isGroup: true,
    state: message.state,
    senderID: message.sender_fbid
  })  
}