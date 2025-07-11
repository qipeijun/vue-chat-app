import { ref, watch } from 'vue'
import { useXAgent, useXChat } from 'ant-design-x-vue'

/**
 * 聊天功能管理
 * 提供聊天相关的状态管理和操作函数
 */
export function useChat() {
  // 模拟网络延迟
  const sleep = () => new Promise(resolve => setTimeout(resolve, 500))
  
  // 初始化AI代理
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onError }) => {
      try {
        await sleep()
        onSuccess(`Mock success return. You said: ${message}`)
      } catch (error) {
        onError?.(error)
      }
    },
  })

  // 初始化聊天状态
  const { onRequest, messages, setMessages } = useXChat({
    agent: agent.value,
  })

  // 响应式状态
  const content = ref('')
  const agentRequestLoading = ref(false)

  /**
   * 提交消息
   * @param {string} nextContent - 要发送的消息内容
   */
  function onSubmit(nextContent) {
    if (!nextContent?.trim()) return
    
    try {
      onRequest(nextContent)
    } catch (error) {
      console.error('发送消息失败:', error)
    }
  }

  /**
   * 清空消息列表
   */
  function clearMessages() {
    setMessages([])
  }

  /**
   * 更新输入内容
   * @param {string} value - 新的输入内容
   */
  function updateContent(value) {
    content.value = value
  }

  return {
    // 状态
    content,
    messages,
    agentRequestLoading,
    
    // 方法
    onSubmit,
    setMessages,
    clearMessages,
    updateContent
  }
} 