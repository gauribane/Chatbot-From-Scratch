export default function scrollToBottom(element) {
    let msg=document.getElementsByClassName(element)
    console.log("msg",msg)
    msg[0].scrollTop = msg[0].scrollHeight;
  }